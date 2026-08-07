"use client";

import { useState } from "react";
import posthog from "posthog-js";
import PromotableHeroWaitlist from "@/components/PromotableHeroWaitlist";
import PromotableStickyCTA from "@/components/PromotableStickyCTA";
import { getAttributionForApi } from "@/lib/analytics/attribution";
import { trackAlreadyWaitlisted } from "@/lib/analytics/waitlist";
import { getWaitlistReferenceFromResponse, writeStoDiagnosticContext } from "@/lib/diagnosticContext";
import { getWaitlistVisitorId } from "@/lib/waitlistVisitor";
import env from "@/utils/env";

type UserData = {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  fullPhone?: string;
  source: string;
  referenceId?: string;
  waitlistId?: string;
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

export default function PromotionStoryAccessFlow() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<UserData>({ name: "", email: "", phone: "", countryCode: "+91", source: "promotion_story_sticky_cta" });

  const handleRequestAccess = async (userData: UserData) => {
    writeStoDiagnosticContext(userData);
    setModalData(userData);
    setIsModalOpen(true);

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
      const enriched = { ...userData, referenceId, waitlistId: referenceId };
      writeStoDiagnosticContext(enriched);
      setModalData(enriched);

      if (waitlistData?.updated === true) {
        trackAlreadyWaitlisted(userData.source, { context: "promotion_story_request_access", payment_started: false });
      }
      posthog.capture("waitlist_submitted", { source: userData.source, payment_started: false });
    } catch (error) {
      posthog.capture("waitlist_submit_failed", { source: userData.source, error: error instanceof Error ? error.message : "unknown_error" });
    }
  };

  return <>
    <PromotableStickyCTA onRequestAccess={handleRequestAccess} />
    <PromotableHeroWaitlist
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
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
