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

// Type Definitions
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Slide {
  title: string;
  points: string[];
}

interface Tab {
  id: string;
  label: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface Comparison {
  old: string;
  new: string;
}

interface CountdownUnit {
  value: number;
  label: string;
}

interface Stat {
  label: string;
  value: number;
}

// Main App Component
const BMPLandingComponents = () => {
  return (
    <div className="min-h-screen bg-white">
      <PromotionBanner />
      <Header />
      <KeyInsight />
      <Framework />
      <LearningExperience />
      <Testimonial />
      <FAQ />
      {/* <CountdownTimer /> */}
      <TrustSection />
      <Footer />
    </div>
  );
};

export default BMPLandingComponents;