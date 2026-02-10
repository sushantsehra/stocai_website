"use client";

import React, { useState } from 'react';
import KeyInsight from './KeyInsight';
import Framework from './Framework';
import LearningExperience from './LearningExperience';
import Testimonial from './Testimonial';
import FAQ from './FAQ';
import TrustSection from './TrustSection';
import Header from './LandingHeader';
import WaitlistSection from './WaitlistSection';
import CareerStalledSection from './CareerStalledSection';
import BePromotableFirstFold from './BePromotableFirstFold';
import SectionViewTracker from '@/app/_components/SectionViewTracker';
import PromotableStickyCTA from './PromotableStickyCTA';
import StickyCTA from './StickyCTA';
import HeroWaitlist from './HeroWaitlist';
import PromotableWaitListSection from './PromotableWaitListSection';
import PromotableHeroWaitlist from './PromotableHeroWaitlist';

// Main App Component
const BMPPromotableComponents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    source: ""
  });

  // Handle request access from either sticky CTA or waitlist section
  const handleRequestAccess = (userData) => {
    console.log("Request Access Data:", userData);
    
    // Set the initial data for the modal
    setModalInitialData({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      countryCode: userData.countryCode,
      source: userData.source
    });
    
    // Open the modal
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = (reason) => {
    console.log("Modal closed:", reason);
    setIsModalOpen(false);
  };

  // Handle successful waitlist submission
  const handleWaitlistSubmit = (data) => {
    console.log("Waitlist submitted successfully:", data);
    // Additional logic after successful submission if needed
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

      {/* HeroWaitlist Modal */}
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