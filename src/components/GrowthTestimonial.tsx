import React from 'react';
import Image from 'next/image';
import alumnus from "@/assets/alumnus.png";

const GrowthTestimonial = () => {
  return (
    <div className="w-full bg-white py-8 px-4 sm:px-6 lg:px-2">
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-3 space-y-6 max-w-[500px]">
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
                  <h3 className="font-semibold text-[#54B0AF] text-base font-bold">Harish S (IIM-B alumnus)</h3>
                  <p className="text-[#323232] text-base font-normal">AVP at a Fintech</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Images */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-full">
              {/* Main Person Image Container */}
              <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[550px] mx-auto mb-4 lg:mb-0 overflow-hidden">
                <Image 
                  src={alumnus} 
                  alt="Professional testimonial - Harish S, IIM-B alumnus and AVP at a Fintech company" 
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3 space-y-6 max-w-[500px]">
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
                  <p className="text-gray-500 text-base font-gotham font-normal">Associate Director of HR</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Statistics Section */}
        <section className="w-full bg-[#54B0AF] py-10">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-white gap-12 sm:gap-32">
            
            {/* Left Stat */}
            <div className="text-center sm:text-left flex gap-4 font-gotham">
              <div>
                <p className="text-7xl font-bold">82%</p>
              </div>
              <div>
                <p className="text-sm sm:text-base mt-5">
                  users gain clarity in <br /> their first session
                </p>
              </div>
            </div>

            {/* Right Stat */}
            <div className="text-center sm:text-left flex font-gotham gap-4">
              <div>
                <p className="text-7xl font-bold">
                  13 <span className="font-normal text-3xl align-bottom">min</span>
                </p>
              </div>
              <div>
                <p className="text-sm sm:text-base mt-5">
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
//     <div className="w-full bg-white py-8 px-4 sm:px-6 lg:px-2">
//       <div className="max-w-full mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
//           {/* Left Content */}
//           <div className="lg:col-span-3 space-y-6 max-w-[500px]">
//             <div className="space-y-4">
//               <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold leading-tight font-gotham">
//                 <span className="text-[#54B0AF]">"I never knew</span><br />
//                 <span className="text-[#54B0AF]">growth could be</span><br />
//                 <span className="text-[#54B0AF]">this simple."</span>
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
//           <div className="lg:col-span-6 flex justify-center items-center">
//             <div className="relative w-full max-w-full">
//               {/* Main Person Image Container */}
//               <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[550px] mx-auto mb-4 lg:mb-0 overflow-hidden ">
//                 <Image 
//                   src={alumnus} 
//                   alt="alumnus" 
//                   fill
//                   className="object-cover object-center"
//                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 />
//               </div>
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
//           <section className="w-full bg-[#54B0AF] py-10">
//       <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-white gap-12 sm:gap-32">
        
//         {/* Left Stat */}
//         <div className="text-center sm:text-left flex gap-4 font-gotham">
//          <div>
//            <p className="text-7xl font-bold">82%</p>
//            </div>
//          <div>
//           <p className="text-sm sm:text-base mt-5">
//             users gain clarity in <br /> their first session
//           </p>
//            </div>

//         </div>

//         {/* Right Stat */}
//         <div className="text-center sm:text-left flex font-gotham gap-4">
//           <div>
//           <p className="text-7xl font-bold">
//             13 <span className="font-normal text-3xl align-bottom">min</span>
//           </p>
//           </div>
//              <div>
//           <p className="text-sm sm:text-base mt-5">
//             Needed to get clarity. <br />
//             Shorter than a sitcom episode.
//           </p>
//           </div>
//         </div>

//       </div>
//     </section>
//       </div>
//     </div>
//   );
// };

// export default GrowthTestimonial;

// // import React from 'react';
// // import Image from 'next/image';
// // import alumnus from "@/assets/alumnus.png";

// // const GrowthTestimonial = () => {
// //   return (
// //     <div className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-7xl mx-auto">
// //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
// //           {/* Left Content */}
// //           <div className="lg:col-span-4 space-y-6">
// //             <div className="space-y-4">
// //               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight font-gotham">
// //                 <span className="text-[#54B0AF]">"I never knew</span><br />
// //                 <span className="text-[#54B0AF]">growth could be</span><br />
// //                 <span className="text-[#54B0AF]">this simple."</span>
// //               </h1>
              
// //               <p className="text-[#323232] text-sm sm:text-base leading-relaxed font-gotham font-normal">
// //                 He was struggling with self-esteem issues since years. Within weeks, he saw himself in a new, positive light.
// //               </p>
// //             </div>
            
// //             {/* Harish Profile Card */}
// //             <div className="bg-white">
// //               <div className="flex items-center space-x-3 font-gotham">
// //                 <div>
// //                   <h3 className="font-semibold text-[#54B0AF] text-base font-bold">Harish S (IIM-B alumnus)</h3>
// //                   <p className="text-[#323232] text-base font-normal">AVP at a Fintech</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Center Images */}
// //           <div className="lg:col-span-4 flex justify-center items-center">
// //             <div className="relative w-full max-w-md">
// //               {/* Main Person (Man) */}
// //               <div className="relative w-48 h-auto mx-auto mb-4 lg:mb-0">
// //                 <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center">
// //               <Image src={alumnus} alt="alumnus" />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Content */}
// //           <div className="lg:col-span-4 space-y-6">
// //             <div className="space-y-4">
// //               <p className="text-[#323232] font-gotham font-normal text-sm sm:text-base leading-relaxed">
// //                 Her work took her from Kolkata to Bengaluru after her promotion. After 4 sessions, she aligned with the transition.
// //               </p>
// //             </div>
            
// //             {/* Aparna Profile Card */}
// //             <div className="bg-white">
// //               <div className="flex items-center space-x-3">
// //                 <div>
// //                   <h3 className="text-[#54B0AF] font-gotham font-bold text-base">Aparna T (XLRI alumnus)</h3>
// //                   <p className="text-gray-500 text-base font-gotham font-normal">Associate Director of HR</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
          
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default GrowthTestimonial;