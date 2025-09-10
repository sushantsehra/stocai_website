import React from 'react';
import Image from 'next/image';
import alumnus from "@/assets/alumnus.png";

const GrowthTestimonial = () => {
  return (
    <div className="w-full bg-white lg:py-1 px-4 sm:px-6 lg:px-2">
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Content - Hidden on mobile, shown on large screens */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 max-w-[500px]">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold leading-tight font-gotham">
                <span className="text-[#54B0AF]">&ldquo;I never knew</span><br />
                <span className="text-[#54B0AF]">growth could be</span><br />
                <span className="text-[#54B0AF]">this simple.&rdquo;</span>
              </h1>
              
              <p className="text-[#323232] text-sm sm:text-base leading-relaxed font-gotham font-normal">
                He was struggling with self-esteem issues since years. Within weeks, he saw himself in a new, positive light.
              </p>
            </div>
            
            {/* Profile Card */}
            <div className="bg-white">
              <div className="flex items-center space-x-3 font-gotham">
                <div>
                  <h3 className="font-bold text-[#54B0AF] text-base leading-[1.2]">Harish S (IIM-B alumnus)</h3>
                  <p className="text-[#323232] text-base font-normal">AVP at a Fintech</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout - Relative container with absolute positioned content */}
          <div className="block lg:hidden relative w-full">
            {/* Center Image for Mobile */}
            <div className="relative w-[180px] h-[180px] mt-7 mx-auto">
              <Image 
                src={alumnus} 
                alt="Professional testimonial - Harish S, IIM-B alumnus and AVP at a Fintech company" 
                fill
                className="object-cover object-center rounded-lg"
                sizes="280px"
                priority
              />
            </div>

            {/* Left Content - Positioned absolutely on mobile */}
            <div className="absolute top-0 left-0 w-[90px] space-y-3">
              <div className="space-y-2">
                <h1 className="text-xs font-bold leading-[1.2] font-gotham">
                  <span className="text-[#54B0AF]">&ldquo;I never knew growth could be this simple.&rdquo;</span>
                </h1>
                
                <p className="text-[#323232] text-[9px] leading-[1.2] font-gotham font-normal">
                  He was struggling with self-esteem issues since years. Within weeks, he saw himself in a new, positive light.
                </p>
              </div>
              
              {/* Profile Card */}
              <div className="">
                <div className="font-gotham">
                  <h3 className="text-[#54B0AF] text-[10px] font-bold leading-[1.2]">Harish S (IIM-B alumnus)</h3>
                  <p className="text-[#323232] text-[10px] font-normal leading-[1.2]">AVP at a Fintech</p>
                </div>
              </div>
            </div>

            {/* Right Content - Positioned absolutely on mobile */}
            <div className="absolute top-0 right-0 w-[80px] space-y-3 mt-10">
              <div className="space-y-2">
                <p className="text-[#323232] font-gotham font-normal text-[9px] leading-[1.2]">
                  Her work took her from Kolkata to Bengaluru after her promotion. After 4 sessions, she aligned with the transition.
                </p>
              </div>
              
              {/* Aparna Profile Card */}
              <div className="">
                <div className="font-gotham">
                  <h3 className="text-[#54B0AF] text-[10px] font-bold leading-[1.2]">Aparna T (XLRI alumnus)</h3>
                  <p className="text-[#323232] text-[10px] font-normal leading-[1.2]">Associate Director of HR</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Images - Only for large screens */}
          <div className="hidden lg:flex lg:col-span-6 justify-center items-center relative">
            <div className="relative w-full max-w-full">
              {/* Main Person Image Container */}
              <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[550px] mx-auto mb-4 lg:mb-0 z-10">
                <Image 
                  src={alumnus} 
                  alt="Professional testimonial - Harish S, IIM-B alumnus and AVP at a Fintech company" 
                  fill
                  className="object-cover object-center rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>

              {/* Left side low-opacity div */}
              {/* <div className="absolute top-0 left-0 w-20 md:w-20 h-full bg-gradient-to-r from-teal-400 to-transparent opacity-40 blur-3xl z-0"></div> */}

              {/* Right side low-opacity div */}
              {/* <div className="absolute top-0 right-0 w-20 md:w-20 h-full bg-gradient-to-l from-teal-400 to-transparent opacity-40 blur-3xl z-0"></div> */}
            </div>
          </div>

          {/* Right Content - Hidden on mobile, shown on large screens */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 max-w-[500px]">
            <div className="space-y-4">
              <p className="text-[#323232] font-gotham font-normal text-sm sm:text-base leading-relaxed">
                Her work took her from Kolkata to Bengaluru after her promotion. After 4 sessions, she aligned with the transition.
              </p>
            </div>
            
            {/* Aparna Profile Card */}
            <div className="bg-white">
              <div className="flex items-center space-x-3">
                <div>
                  <h3 className="text-[#54B0AF] font-gotham font-bold text-base">Aparna T (XLRI alumnus)</h3>
                  <p className="text-[#323232] text-base font-gotham font-normal">Associate Director of HR</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Statistics Section */}
        <section className="w-full bg-[#54B0AF] py-4 md:py-10 md:mt-0">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-white gap-4 sm:gap-32">
            
            {/* Left Stat */}
            <div className="text-center sm:text-left flex gap-4 font-gotham">
              <div>
                <p className="text-7xl font-bold leading-none">82%</p>
              </div>
              <div>
                <p className="text-sm sm:text-base mt-5 font-gotham font-medium text-white/90 leading-light">
                  users gain clarity in <br /> their first session
                </p>
              </div>
            </div>

           {/* Right Stat */}
            <div className="text-center sm:text-left flex flex-row font-gotham gap-4 sm:gap-6 items-center sm:items-start">
              <div className="flex items-baseline mt-1">
                <p className="text-7xl font-bold leading-none ml-2 sm:ml-0">
                  13
                </p>
                <span className="font-bold text-2xl sm:text-3xl lg:text-4xl ml-2 mb-1">
                  min
                </span>
              </div>
              <div className="flex items-center">
                <p className="text-sm sm:text-base font-gotham font-medium text-white/90 mt-0 sm:mt-5 md:mt-6 leading-light">
                  Needed to get clarity. <br />
                  Shorter than a sitcom episode.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GrowthTestimonial;

// import React from 'react';
// import Image from 'next/image';
// import alumnus from "@/assets/alumnus.png";

// const GrowthTestimonial = () => {
//   return (
//     <div className="w-full bg-white py-8 lg:py-1 px-4 sm:px-6 lg:px-2">
//       <div className="max-w-full mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
//           {/* Left Content */}
//           <div className="lg:col-span-3 space-y-6 max-w-[500px]">
//             <div className="space-y-4">
//               <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold leading-tight font-gotham">
//                 <span className="text-[#54B0AF]">&ldquo;I never knew</span><br />
//                 <span className="text-[#54B0AF]">growth could be</span><br />
//                 <span className="text-[#54B0AF]">this simple.&rdquo;</span>
//               </h1>
              
//               <p className="text-[#323232] text-sm sm:text-base leading-relaxed font-gotham font-normal">
//                 He was struggling with self-esteem issues since years. Within weeks, he saw himself in a new, positive light.
//               </p>
//             </div>
            
//             {/* Profile Card */}
//             <div className="bg-white">
//               <div className="flex items-center space-x-3 font-gotham">
//                 <div>
//                   <h3 className="font-semibold text-[#54B0AF] text-base font-bold">Harish S (IIM-B alumnus)</h3>
//                   <p className="text-[#323232] text-base font-normal">AVP at a Fintech</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Center Images */}
//           <div className="lg:col-span-6 flex justify-center items-center relative">
//             <div className="relative w-full max-w-full">
//               {/* Main Person Image Container */}
//               <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[550px] mx-auto mb-4 lg:mb-0 z-10">
//                 <Image 
//                   src={alumnus} 
//                   alt="Professional testimonial - Harish S, IIM-B alumnus and AVP at a Fintech company" 
//                   fill
//                   className="object-cover object-center rounded-lg"
//                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                   priority
//                 />
//               </div>

//               {/* Left side low-opacity div */}
//               {/* <div className="absolute top-0 left-0 w-20 md:w-20 h-full bg-gradient-to-r from-teal-400 to-transparent opacity-40 blur-3xl z-0"></div> */}

//               {/* Right side low-opacity div */}
//               {/* <div className="absolute top-0 right-0 w-20 md:w-20 h-full bg-gradient-to-l from-teal-400 to-transparent opacity-40 blur-3xl z-0"></div> */}
//             </div>
//           </div>


//           {/* Right Content */}
//           <div className="lg:col-span-3 space-y-6 max-w-[500px]">
//             <div className="space-y-4">
//               <p className="text-[#323232] font-gotham font-normal text-sm sm:text-base leading-relaxed">
//                 Her work took her from Kolkata to Bengaluru after her promotion. After 4 sessions, she aligned with the transition.
//               </p>
//             </div>
            
//             {/* Aparna Profile Card */}
//             <div className="bg-white">
//               <div className="flex items-center space-x-3">
//                 <div>
//                   <h3 className="text-[#54B0AF] font-gotham font-bold text-base">Aparna T (XLRI alumnus)</h3>
//                   <p className="text-gray-500 text-base font-gotham font-normal">Associate Director of HR</p>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//         </div>
        
//         {/* Statistics Section */}
//         <section className="w-full bg-[#54B0AF] py-10 mt-8 md:mt-0">
//           <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-white gap-12 sm:gap-32">
            
//             {/* Left Stat */}
//             <div className="text-center sm:text-left flex gap-4 font-gotham">
//               <div>
//                 <p className="text-7xl font-bold leading-none">82%</p>
//               </div>
//               <div>
//                 <p className="text-sm sm:text-base mt-5 font-gotham font-medium text-white/90 leading-light">
//                   users gain clarity in <br /> their first session
//                 </p>
//               </div>
//             </div>

//            {/* Right Stat */}
//             <div className="text-center sm:text-left flex flex-row font-gotham gap-4 sm:gap-6 items-center sm:items-start">
//               <div className="flex items-baseline mt-1">
//                 <p className="text-7xl font-bold leading-none ml-2 sm:ml-0">
//                   13
//                 </p>
//                 <span className="font-bold text-2xl sm:text-3xl lg:text-4xl ml-2 mb-1">
//                   min
//                 </span>
//               </div>
//               <div className="flex items-center">
//                 <p className="text-sm sm:text-base font-gotham font-medium text-white/90 mt-0 sm:mt-5 md:mt-6 leading-light">
//                   Needed to get clarity. <br />
//                   Shorter than a sitcom episode.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default GrowthTestimonial;