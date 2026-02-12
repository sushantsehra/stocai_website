"use client";

import React, { useState } from 'react';
import KeyInsight from './KeyInsight';
import Framework from './Framework';
import LearningExperience from './LearningExperience';
import Testimonial from './Testimonial';
import FAQ from './FAQ';
import TrustSection from './TrustSection';
import Header from './LandingHeader';
import CareerStalledSection from './CareerStalledSection';
import BePromotableFirstFold from './BePromotableFirstFold';
import SectionViewTracker from '@/app/_components/SectionViewTracker';
import PromotableStickyCTA from './PromotableStickyCTA';
import StickyCTA from './StickyCTA';
import PromotableWaitListSection from './PromotableWaitListSection';
import PromotableHeroWaitlist from './PromotableHeroWaitlist';
import env from "@/utils/env";
import { getAttributionForApi } from "@/lib/analytics/attribution";
import posthog from "posthog-js";

// ✅ Define interface for full modal data
interface UserData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  source: string;
}

// ✅ Define type for waitlist submission (matches modal onSubmit)
interface WaitlistSubmitData {
  name: string;
  phone: string;
  email: string;
}

// ✅ Fetch with timeout helper
const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

// Main Component
const BMPPromotableComponents: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    source: ""
  });

  // ✅ NEW: Save to database with timeout and better error handling
  const handleRequestAccess = async (userData: UserData) => {
    console.log("Request Access Data:", userData);
    
    // Store user data for modal
    setModalInitialData(userData);
    
    // Open modal immediately (don't wait for DB save)
    setIsModalOpen(true);
    
    // Save to database in background
    try {
      const fullPhone = `${userData.countryCode}${userData.phone}`;
      
      posthog.capture("waitlist_submit_attempt", {
        source: userData.source,
      });

      console.log("Attempting to save to database...");
      console.log("API URL:", `${env.apiUrl}/waitlist`);

      const response = await fetchWithTimeout(
        `${env.apiUrl}/waitlist`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            name: userData.name,
            phone: fullPhone,
            email: userData.email,
            source: userData.source,
            attribution: getAttributionForApi(),
          }),
        },
        10000 // 10 second timeout
      );

      const waitlistData = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        throw new Error(waitlistData?.error || "Unable to join the waitlist.");
      }

      posthog.capture("waitlist_submitted", {
        source: userData.source,
        payment_started: false,
      });

      console.log("✅ Data saved to database successfully:", waitlistData);
      
    } catch (error) {
      console.error("❌ Error saving to database:", error);
      
      posthog.capture("waitlist_submit_failed", {
        source: userData.source,
        error: error instanceof Error ? error.message : "unknown_error",
      });
      
      // Show error but don't prevent modal from staying open
      if (error instanceof Error && error.name === 'AbortError') {
        console.error("Request timed out after 10 seconds");
      }
    }
  };

  // ✅ Handle modal close
  const handleCloseModal = (reason?: string) => {
    console.log("Modal closed:", reason);
    setIsModalOpen(false);
  };

  // ✅ Handle successful modal form submit (for payment flow)
  const handleWaitlistSubmit = (data: WaitlistSubmitData) => {
    console.log("Waitlist submitted successfully from modal:", data);
    // This is now just for the payment flow after modal submission
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <StickyCTA />
      <PromotableStickyCTA onRequestAccess={handleRequestAccess} />
      <SectionViewTracker />
      
      <section data-analytics-section="bmp_be_promotable" data-analytics-section-label="Be Promotable" data-analytics-section-order="1">
        <BePromotableFirstFold />
      </section>

      <section data-analytics-section="bmp_career_stalled" data-analytics-section-label="Career Stalled" data-analytics-section-order="2">
        <CareerStalledSection />
      </section>

      <section data-analytics-section="bmp_key_insight" data-analytics-section-label="Key Insight" data-analytics-section-order="3">
        <KeyInsight />
      </section>

      <section data-analytics-section="bmp_framework" data-analytics-section-label="Framework" data-analytics-section-order="4">
        <Framework />
      </section>

      <section data-analytics-section="bmp_learning_experience" data-analytics-section-label="Learning Experience" data-analytics-section-order="5">
        <LearningExperience />
      </section>

      <section data-analytics-section="bmp_testimonial" data-analytics-section-label="Testimonial" data-analytics-section-order="6">
        <Testimonial />
      </section>

      <section data-analytics-section="bmp_trust" data-analytics-section-label="Trust" data-analytics-section-order="7">
        <TrustSection />
      </section>

      <section data-analytics-section="bmp_waitlist" data-analytics-section-label="Waitlist" data-analytics-section-order="8">
        <PromotableWaitListSection onRequestAccess={handleRequestAccess} />
      </section>

      <section data-analytics-section="bmp_faq" data-analytics-section-label="FAQ" data-analytics-section-order="9">
        <FAQ />
      </section>

      {/* ✅ Hero Waitlist Modal */}
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

export default BMPPromotableComponents;