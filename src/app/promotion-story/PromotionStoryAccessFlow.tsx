"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";
import PromotableHeroWaitlist from "@/components/PromotableHeroWaitlist";
import PromotableStickyCTA from "@/components/PromotableStickyCTA";
import { getAttributionForApi } from "@/lib/analytics/attribution";
import { trackAlreadyWaitlisted } from "@/lib/analytics/waitlist";
import { getWaitlistReferenceFromResponse, readStoDiagnosticContext, writeStoDiagnosticContext } from "@/lib/diagnosticContext";
import { getWaitlistVisitorId } from "@/lib/waitlistVisitor";
import env from "@/utils/env";
import { pushToDataLayer, trackCtaClick, trackLead, trackPromotionJourneyEvent } from "@/lib/analytics/events";

type UserData = {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  fullPhone?: string;
  source: string;
  referenceId?: string;
  waitlistId?: string;
  promotionFlowSessionId?: string;
  promotionFlowToken?: string;
};

const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 10000) => {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    window.clearTimeout(timer);
  }
};

export default function PromotionStoryAccessFlow({
  anchorId = "promotion-story-access",
  redirectAfterRequestAccess,
  modalTriggerAnchorId,
  showSticky = true,
}: {
  anchorId?: string;
  redirectAfterRequestAccess?: string;
  modalTriggerAnchorId?: string;
  showSticky?: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<UserData>({ name: "", email: "", phone: "", countryCode: "+91", source: "promotion_story_sticky_cta" });

  useEffect(() => {
    if (!modalTriggerAnchorId) return;

    setModalData((current) => ({ ...current, ...readStoDiagnosticContext() }));
    const openModal = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>(`a[href="#${modalTriggerAnchorId}"]`);
      if (!link) return;
      event.preventDefault();
      trackCtaClick({
        location: link.dataset.ctaLocation || "promotion_flow",
        label: link.textContent || "Get Access",
        source: readStoDiagnosticContext().source || "promotion_flow",
      });
      setModalData((current) => ({ ...current, ...readStoDiagnosticContext() }));
      setIsModalOpen(true);
    };

    document.addEventListener("click", openModal);
    return () => document.removeEventListener("click", openModal);
  }, [modalTriggerAnchorId]);

  const handleRequestAccess = async (userData: UserData) => {
    writeStoDiagnosticContext(userData);
    setModalData(userData);
    if (!redirectAfterRequestAccess) setIsModalOpen(true);

    posthog.capture("waitlist_submit_attempt", { source: userData.source });
    pushToDataLayer({
      event: "waitlist_submit_attempt",
      source: userData.source,
    });
    trackPromotionJourneyEvent("promotion_story_access_submit_attempt", {
      source: userData.source,
      entry_page: typeof window !== "undefined" ? window.location.pathname : "",
      redirect_after_request_access: redirectAfterRequestAccess,
    });

    try {
      const response = await fetchWithTimeout(`${env.apiUrl}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: userData.name,
          phone: userData.fullPhone || `${userData.countryCode}${userData.phone}`,
          email: userData.email,
          source: userData.source,
          visitorId: getWaitlistVisitorId(),
          attribution: getAttributionForApi(),
        }),
      });
      const waitlistData = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(waitlistData?.error || "Unable to join the waitlist.");

      const referenceId = getWaitlistReferenceFromResponse(waitlistData);
      const enriched = {
        ...userData,
        referenceId,
        waitlistId: referenceId,
        promotionFlowSessionId: waitlistData?.promotion_flow_session_id,
        promotionFlowToken: waitlistData?.promotion_flow_token,
      };
      writeStoDiagnosticContext(enriched);
      setModalData(enriched);

      if (waitlistData?.updated === true) {
        trackAlreadyWaitlisted(userData.source, { context: "promotion_story_request_access", payment_started: false });
      }
      trackPromotionJourneyEvent("promotion_story_access_submitted", {
        source: userData.source,
        waitlist_reference_id: referenceId,
        promotion_flow_session_id: waitlistData?.promotion_flow_session_id,
        payment_started: false,
        updated: waitlistData?.updated === true,
      });
      posthog.capture("waitlist_submitted", { source: userData.source, payment_started: false });
      pushToDataLayer({
        event: "waitlist_submitted",
        source: userData.source,
        payment_started: false,
        event_id: referenceId ? `waitlist_submitted:${referenceId}` : undefined,
      });
      if (waitlistData?.updated === false && referenceId) {
        trackLead({ leadId: referenceId, source: userData.source });
      }
      if (redirectAfterRequestAccess) window.location.assign(redirectAfterRequestAccess);
    } catch (error) {
      posthog.capture("waitlist_submit_failed", { source: userData.source, error: error instanceof Error ? error.message : "unknown_error" });
    }
  };

  const handleClose = (reason?: "x_button" | "escape") => {
    if (reason) {
      posthog.capture("waitlist_modal_closed", {
        source: modalData.source,
        close_reason: reason,
        has_prefill_email: Boolean(modalData.email),
      });
      pushToDataLayer({
        event: "waitlist_modal_closed",
        source: modalData.source,
        close_reason: reason,
        has_prefill_email: Boolean(modalData.email),
      });
      trackPromotionJourneyEvent("checkout_modal_closed", {
        source: modalData.source,
        close_reason: reason,
        has_prefill_email: Boolean(modalData.email),
        has_reference_id: Boolean(modalData.referenceId || modalData.waitlistId),
      });
    }
    setIsModalOpen(false);
  };

  return <>
    {showSticky && <PromotableStickyCTA
      anchorId={anchorId}
      useIsoCountryLabels
      variant="promotion"
      source="promotion_story_sticky_cta"
      onRequestAccess={handleRequestAccess}
    />}
    <PromotableHeroWaitlist
      isOpen={isModalOpen}
      onClose={handleClose}
      initialEmail={modalData.email}
      initialName={modalData.name}
      initialPhone={modalData.phone}
      initialCountryCode={modalData.countryCode}
      initialReferenceId={modalData.referenceId}
      initialWaitlistId={modalData.waitlistId}
      source={modalData.source}
    />
  </>;
}
