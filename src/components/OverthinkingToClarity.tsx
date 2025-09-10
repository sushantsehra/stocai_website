"use client"

// import Image from 'next/image';
import posthog from "posthog-js";
const OverthinkingToClarity = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
          
          {/* Content Section */}
          <div className="space-y-6 lg:space-y-8 px-4">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#54B0AF] font-gotham leading-tight">
                From Overthinking to Clarity - in just minutes
              </h1>
              
              <p className="text-lg md:text-xl text-[#323232] font-gotham leading-relaxed max-w-lg">
                Guided self-coaching that turns mental spirals into clear next steps. Free during beta.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button  onClick={() => {
                posthog.capture("overthinking_to_clarity_section", {
                  button: "start_free_session",
                  location: "about_page",
                });

                setTimeout(() => {
                  window.location.href = "https://clarity.mystocai.com";
                }, 300);
              }}

               className="bg-[#54B0AF] font-gotham hover:bg-teal-600 text-white font-bold px-8 py-4 rounded-full transition-colors duration-200 text-lg shadow-lg hover:shadow-xl">
                Start Free Session
              </button>
              
              <button className="border-2 border-[#54B0AF] hover:border-[#54B0AF] text-[#54B0AF] hover:text-[#54B0AF] font-bold font-gotham px-8 py-4 rounded-full transition-colors duration-200 text-lg bg-white hover:bg-gray-50">
                Know more
              </button>
            </div>

            {/* Stats */}
            <div className="pt-4">
              <p className="text-sm md:text-base text-[#54B0AF] font-gotham font-medium leading-relaxed">
                <span className="font-medium">1,000+ sessions completed</span>
                <span className="mx-2">•</span>
                <span className="font-medium">82% report clarity after first session</span>
                <span className="mx-2">•</span>
                <span className="font-medium">6-minute median session</span>
              </p>
            </div>
          </div>

          {/* Illustration Section */}
          <div className="order-first lg:order-last">
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[550px] rounded-2xl overflow-hidden">
              {/* Illustration Placeholder - Replace with your actual illustration */}
              <div className="w-full h-full bg-gray-200 relative">
               {/* 
              <Image
                src="/your-illustration-path.svg"
                alt="Peaceful landscape illustration"
                fill
                className="object-cover"
                priority
              />
              */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverthinkingToClarity;