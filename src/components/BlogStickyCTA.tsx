"use client";

import React, { useState } from "react";
import posthog from "posthog-js";
import env from "@/utils/env";
import { getAttributionForApi } from "@/lib/analytics/attribution";
import { trackAlreadyWaitlisted } from "@/lib/analytics/waitlist";
import { getWaitlistVisitorId } from "@/lib/waitlistVisitor";
import PromotableHeroWaitlist from "./PromotableHeroWaitlist";
import StickyCTA from "./StickyCTA";

interface UserData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  fullPhone?: string;
  source: string;
  referenceId?: string;
}

const pushToDataLayer = (payload: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  const dataLayerWindow = window as unknown as Window & { dataLayer?: unknown[] };
  if (!dataLayerWindow.dataLayer) {
    dataLayerWindow.dataLayer = [];
  }
  dataLayerWindow.dataLayer.push(payload);
};

const BlogStickyCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    source: "",
  });

  const handleRequestAccess = async (userData: UserData) => {
    try {
      const fullPhone = userData.fullPhone || `${userData.countryCode}${userData.phone}`;

      posthog.capture("waitlist_submit_attempt", {
        source: userData.source,
        path: typeof window !== "undefined" ? window.location.pathname : "",
      });
      pushToDataLayer({
        event: "waitlist_submit_attempt",
        source: userData.source,
      });

      const visitorId = getWaitlistVisitorId();
      const response = await fetch(`${env.apiUrl}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userData.name.trim(),
          email: userData.email.trim(),
          phone: fullPhone,
          source: userData.source,
          visitorId,
          attribution: getAttributionForApi(),
        }),
      });

      const waitlistData = await response.json().catch(() => ({}));

      if (response.ok) {
        userData.referenceId = waitlistData?.reference_id;
        if (waitlistData?.updated === true) {
          trackAlreadyWaitlisted(userData.source, {
            context: "blog_request_access",
            payment_started: true,
          });
        }
        posthog.capture("waitlist_submitted", {
          source: userData.source,
          payment_started: true,
        });
        pushToDataLayer({
          event: "waitlist_submitted",
          source: userData.source,
          payment_started: true,
        });
      } else {
        posthog.capture("waitlist_submit_failed", {
          source: userData.source,
          error: waitlistData?.error || "unknown_error",
        });
        pushToDataLayer({
          event: "waitlist_submit_failed",
          source: userData.source,
          error: waitlistData?.error || "unknown_error",
        });
      }
    } catch (err) {
      posthog.capture("waitlist_submit_failed", {
        source: userData.source,
        error: err instanceof Error ? err.message : "unknown_error",
      });
      pushToDataLayer({
        event: "waitlist_submit_failed",
        source: userData.source,
        error: err instanceof Error ? err.message : "unknown_error",
      });
    }

    setModalInitialData(userData);
    setIsModalOpen(true);
  };

  const handleCloseModal = (reason?: "x_button" | "escape") => {
    if (reason) {
      posthog.capture("waitlist_modal_closed", {
        source: modalInitialData.source || "blog_sticky_cta",
        close_reason: reason,
        has_prefill_email: Boolean(modalInitialData.email?.trim()),
      });
      pushToDataLayer({
        event: "waitlist_modal_closed",
        source: modalInitialData.source || "blog_sticky_cta",
        close_reason: reason,
        has_prefill_email: Boolean(modalInitialData.email?.trim()),
      });
    }
    setIsModalOpen(false);
  };

  const handleWaitlistSubmit = () => {};

  return (
    <>
      <StickyCTA
        onRequestAccess={(data) =>
          handleRequestAccess({
            ...data,
            source: "blog_sticky_cta",
          })
        }
      />
      <PromotableHeroWaitlist
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialEmail={modalInitialData.email}
        initialName={modalInitialData.name}
        initialPhone={modalInitialData.phone}
        initialCountryCode={modalInitialData.countryCode}
        initialReferenceId={modalInitialData.referenceId}
        source={modalInitialData.source || "blog_sticky_cta"}
        onSubmit={handleWaitlistSubmit}
      />
    </>
  );
};

export default BlogStickyCTA;
