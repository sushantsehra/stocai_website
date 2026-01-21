import React from 'react';
import KeyInsight from './KeyInsight';
import Framework from './Framework';
import LearningExperience from './LearningExperience';
import Testimonial from './Testimonial';
import FAQ from './FAQ';
import Footer from './FooterSection';
import TrustSection from './TrustSection';
import Header from './LandingHeader';
import PromotionBanner from './PromotionBanner';
import WaitlistSection from './WaitlistSection';
import CareerStalledSection from './CareerStalledSection';
import BePromotableSection from './BePromotableSection';

interface FAQ {
  question: string;
  answer: string;
}

// Main App Component
const BMPLandingComponents = () => {
  return (
    <div className="min-h-screen bg-white">
      <PromotionBanner />
      <Header />
      <BePromotableSection />
      <CareerStalledSection />
      <KeyInsight />
      <Framework />
      <LearningExperience />
      <Testimonial />
      {/* <CountdownTimer /> */}
      <TrustSection />
      <WaitlistSection />
      <FAQ />
      <Footer />
    </div>
  );
};

export default BMPLandingComponents;