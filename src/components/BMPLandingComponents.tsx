"use client";

import React, { useState } from "react";
// import Testimonial from "./Testimonial";
import FAQ from "./FAQ";
import Header from "./LandingHeader";
import WaitlistSection from "./WaitlistSection";
import SectionViewTracker from "@/app/_components/SectionViewTracker";
import StickyCTA from "./StickyCTA";
import BePromotableFirstFold from "./BePromotableFirstFoldNew";
import TestimonialFeatures from "./TestimonialFeatures";
import TrustedByProfessionals from "./TrustedByProfessionals";
import SuccessStories from "./SuccessStoriesNew";
import WorkThroughSection from "./WorkThroughSection";
import HearFromSection from "./HearFromSection";
import WhoIsThisFor from "./WhoIsThisFor";
import ReviewedByProfessionals from "./ReviewedByProfessionals";
import EightWeekArc from "./EightWeekArc";
import ScrollingFeatures from "./ScrollingFeatures";
import OutcomeContract from "./OutcomeContractNew";
import FoundersBonus from "./FoundersBonus";
import FromCommunity from "./FromCommunity";
import CareerTrajectorySection from "./CareerTrajectorySection";
import LearningExperienceNew from "./LearningExperienceNew";
import AdditionalBenefitsNew from "./AdditionalBenefitsNew";
import TrustSectionNew from "./TrustSectionNew";
import PromotableHeroWaitlist from "./PromotableHeroWaitlist";
import posthog from "posthog-js";
import env from "@/utils/env";
import { getAttributionForApi } from "@/lib/analytics/attribution";
// import FounderSection from "./FounderSection";
import FounderNoteSection from "./FounderNoteSection";

interface UserData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  fullPhone?: string;
  source: string;
}

interface WaitlistSubmitData {
  name: string;
  phone: string;
  email: string;
}

const pushToDataLayer = (payload: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  const dataLayerWindow = window as unknown as Window & { dataLayer?: unknown[] };
  if (!dataLayerWindow.dataLayer) {
    dataLayerWindow.dataLayer = [];
  }
  dataLayerWindow.dataLayer.push(payload);
};

const BMPLandingComponents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    source: "",
  });

  // Called by both StickyCTA and WaitlistSection when user clicks "Request Access"
  const handleRequestAccess = async (userData: UserData) => {
    // ── Call waitlist API immediately 
    try {
      const fullPhone =
        userData.fullPhone || `${userData.countryCode}${userData.phone}`;

      posthog.capture("waitlist_submit_attempt", {
        source: userData.source,
        path: typeof window !== "undefined" ? window.location.pathname : "",
      });
      pushToDataLayer({
        event: "waitlist_submit_attempt",
        source: userData.source,
      });

      const response = await fetch(`${env.apiUrl}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userData.name.trim(),
          email: userData.email.trim(),
          phone: fullPhone,
          source: userData.source,
          attribution: getAttributionForApi(),
        }),
      });

      const waitlistData = await response.json().catch(() => ({}));

      if (response.ok) {
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
      // Log but do not block — still open the modal for payment
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
    // ─────────────────────────────────────────────────────────────────────

    // Store data to pre-fill modal, then open it
    setModalInitialData(userData);
    setIsModalOpen(true);
  };

  const handleCloseModal = (reason?: string) => {
    if (reason === "x_button" || reason === "escape") {
      posthog.capture("waitlist_modal_closed", {
        source: modalInitialData.source || "waitlist_modal",
        close_reason: reason,
        has_prefill_email: Boolean(modalInitialData.email?.trim()),
      });
      pushToDataLayer({
        event: "waitlist_modal_closed",
        source: modalInitialData.source || "waitlist_modal",
        close_reason: reason,
        has_prefill_email: Boolean(modalInitialData.email?.trim()),
      });
    }
    setIsModalOpen(false);
  };

  const handleWaitlistSubmit = (data: WaitlistSubmitData) => {
    console.log("Modal form submitted:", data);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Single StickyCTA — accepts onRequestAccess to open modal */}
      <StickyCTA onRequestAccess={handleRequestAccess} />

      <SectionViewTracker />

      <section
        data-analytics-section="bmp_be_promotable"
        data-analytics-section-label="Be Promotable"
        data-analytics-section-order="1"
      >
        <BePromotableFirstFold />
        <TrustedByProfessionals />
        <TestimonialFeatures />
        <SuccessStories />
        <WorkThroughSection />
        <HearFromSection />
        {/* <WhoIsThisFor /> */}
        <ReviewedByProfessionals />
        <CareerTrajectorySection />
        <LearningExperienceNew />
        <ScrollingFeatures />
        <OutcomeContract />
        <EightWeekArc />
        <AdditionalBenefitsNew />
        <FounderNoteSection />
        <TrustSectionNew />
        {/* <FounderSection /> */}
        <FoundersBonus />
        <FromCommunity />
      </section>

      {/* <section
        data-analytics-section="bmp_testimonial"
        data-analytics-section-label="Testimonial"
        data-analytics-section-order="7"
      >
        <Testimonial />
      </section> */}

      {/* WaitlistSection — accepts onRequestAccess to open modal */}
      <section
        data-analytics-section="bmp_waitlist"
        data-analytics-section-label="Waitlist"
        data-analytics-section-order="9"
      >
        <WaitlistSection onRequestAccess={handleRequestAccess} />
      </section>

      <section
        data-analytics-section="bmp_faq"
        data-analytics-section-label="FAQ"
        data-analytics-section-order="10"
      >
        <FAQ />
      </section>

      {/* Modal — opens when either StickyCTA or WaitlistSection fires handleRequestAccess */}
      <PromotableHeroWaitlist
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialEmail={modalInitialData.email}
        initialName={modalInitialData.name}
        initialPhone={modalInitialData.phone}
        initialCountryCode={modalInitialData.countryCode}
        source={modalInitialData.source}
        onSubmit={handleWaitlistSubmit}
      />
    </div>
  );
};

export default BMPLandingComponents;