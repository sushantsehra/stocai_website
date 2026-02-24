import React from 'react';
import KeyInsight from './KeyInsight';
import Framework from './Framework';
import LearningExperience from './LearningExperience';
import Testimonial from './Testimonial';
import FAQ from './FAQ';
// import Footer from './FooterSection';
import TrustSection from './TrustSection';
import Header from './LandingHeader';
// import PromotionBanner from './PromotionBanner';
import WaitlistSection from './WaitlistSection';
import CareerStalledSection from './CareerStalledSection';
// import BePromotableSection from './BePromotableSection';
import SectionViewTracker from '@/app/_components/SectionViewTracker';
import StickyCTA from './StickyCTA';
import AdditionalBenefits from './AdditionalBenefits';
import BePromotableFirstFold from './BePromotableFirstFoldNew';
import TestimonialFeatures from './TestimonialFeatures';
import TrustedByProfessionals from './TrustedByProfessionals';
import SuccessStories from './SuccessStoriesNew';
import WorkThroughSection from './WorkThroughSection';
import HearFromSection from './HearFromSection';
import WhoIsThisFor from './WhoIsThisFor';

interface FAQ {
  question: string;
  answer: string;
}

// Main App Component
const BMPLandingComponents = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* <PromotionBanner /> */}
      <Header />
      <StickyCTA />
      <SectionViewTracker />
      <section data-analytics-section="bmp_be_promotable" data-analytics-section-label="Be Promotable" data-analytics-section-order="1">
        {/* <BePromotableSection /> */}
        <BePromotableFirstFold />
        <TrustedByProfessionals />
        <TestimonialFeatures />
        <SuccessStories />
        <WorkThroughSection />
        <HearFromSection />
        <WhoIsThisFor />
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
      <section data-analytics-section="bmp_additional_benefits" data-analytics-section-label="Additional Benefits" data-analytics-section-order="6">
        <AdditionalBenefits />
      </section>
      <section data-analytics-section="bmp_testimonial" data-analytics-section-label="Testimonial" data-analytics-section-order="7">
        <Testimonial />
      </section>
      <section data-analytics-section="bmp_trust" data-analytics-section-label="Trust" data-analytics-section-order="8">
        <TrustSection />
      </section>
      <section data-analytics-section="bmp_waitlist" data-analytics-section-label="Waitlist" data-analytics-section-order="9">
        <WaitlistSection />
      </section>
      <section data-analytics-section="bmp_faq" data-analytics-section-label="FAQ" data-analytics-section-order="10">
        <FAQ />
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default BMPLandingComponents;

// import React from 'react';
// import KeyInsight from './KeyInsight';
// import Framework from './Framework';
// import LearningExperience from './LearningExperience';
// import Testimonial from './Testimonial';
// import FAQ from './FAQ';
// // import Footer from './FooterSection';
// import TrustSection from './TrustSection';
// import Header from './LandingHeader';
// // import PromotionBanner from './PromotionBanner';
// import WaitlistSection from './WaitlistSection';
// import CareerStalledSection from './CareerStalledSection';
// import BePromotableSection from './BePromotableSection';
// import SectionViewTracker from '@/app/_components/SectionViewTracker';
// import StickyCTA from './StickyCTA';
// import AdditionalBenefits from './AdditionalBenefits';

// interface FAQ {
//   question: string;
//   answer: string;
// }

// // Main App Component
// const BMPLandingComponents = () => {
//   return (
//     <div className="min-h-screen bg-white">
//       {/* <PromotionBanner /> */}
//       <Header />
//       <StickyCTA />
//       <SectionViewTracker />
//       <section data-analytics-section="bmp_be_promotable" data-analytics-section-label="Be Promotable" data-analytics-section-order="1">
//         <BePromotableSection />
//       </section>
//       <section data-analytics-section="bmp_career_stalled" data-analytics-section-label="Career Stalled" data-analytics-section-order="2">
//         <CareerStalledSection />
//       </section>
//       <section data-analytics-section="bmp_key_insight" data-analytics-section-label="Key Insight" data-analytics-section-order="3">
//         <KeyInsight />
//       </section>
//       <section data-analytics-section="bmp_framework" data-analytics-section-label="Framework" data-analytics-section-order="4">
//         <Framework />
//       </section>
//       <section data-analytics-section="bmp_learning_experience" data-analytics-section-label="Learning Experience" data-analytics-section-order="5">
//         <LearningExperience />
//       </section>
//       {/* <section data-analytics-section="additional_benefits" data-analytics-section-label="Additional Benefits" data-analytics-section-order="5"> */}
//       {/* <AdditionalBenefits /> */}
//       {/* </section> */}
//       <section data-analytics-section="bmp_additional_benefits" data-analytics-section-label="Additional Benefits" data-analytics-section-order="6">
//         <AdditionalBenefits />
//       </section>
//       <section data-analytics-section="bmp_testimonial" data-analytics-section-label="Testimonial" data-analytics-section-order="6">
//         <Testimonial />
//       </section>
//       <section data-analytics-section="bmp_trust" data-analytics-section-label="Trust" data-analytics-section-order="7">
//         <TrustSection />
//       </section>
//       <section data-analytics-section="bmp_waitlist" data-analytics-section-label="Waitlist" data-analytics-section-order="8">
//         <WaitlistSection />
//       </section>
//       <section data-analytics-section="bmp_faq" data-analytics-section-label="FAQ" data-analytics-section-order="9">
//         <FAQ />
//       </section>
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default BMPLandingComponents;