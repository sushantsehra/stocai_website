import Image from 'next/image';
import see_the_diff from "@/assets/see_the_diff.png";
import { FaCheckCircle } from "react-icons/fa";

const SeeTheDifference = () => {
  const benefits = [
    { title: "Think clearer", description: "untangle messy thoughts" },
    { title: "Decide faster", description: "stop overthinking" },
    { title: "Feel lighter", description: "ease stress and anxiety" },
    { title: "Be more confident", description: "trust your own judgment" },
    { title: "Break patterns", description: "spot blind spots holding you back" },
    { title: "Focus better", description: "sharpen your performance" },
    { title: "Grow steadily", description: "build reflection into a habit" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Grid with image left and content right on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-full mx-auto">
          
          {/* Image Section - only for md/lg */}
          <div className="hidden lg:block order-1">
            <div className="relative w-full h-[400px] lg:h-[700px] rounded-2xl overflow-hidden">
              <Image 
                src={see_the_diff} 
                alt="see_the_diff" 
                width={650} 
                height={650} 
                className="rounded-2xl w-full h-auto" 
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="order-2 space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#54B0AF] font-gotham font-bold leading-tight">
                See the Difference in your{' '}
                <span className="text-[#54B0AF] font-gotham font-bold">Everyday Life</span>
              </h1>
              
              <p className="text-lg md:text-xl text-[#323232] font-gotham font-normal leading-light">
                With Stocai, you’ll think clearer, act faster, and feel more in control - no matter what life throws at you.
              </p>

              {/* Image only for small devices */}
              <div className="block lg:hidden">
                <Image 
                  src={see_the_diff} 
                  alt="see_the_diff" 
                  width={650} 
                  height={650} 
                  className="rounded-2xl w-full h-auto"
                />
              </div>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <FaCheckCircle className="w-6 h-6 text-[#54B0AF] mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="font-bold text-[#54B0AF] font-gotham">
                      {benefit.title}
                    </span>
                    <span className="text-[#323223] font-medium font-gotham ml-2">
                      - {benefit.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeTheDifference;



// import Image from 'next/image';
// import see_the_diff from "@/assets/see_the_diff.png";
// import { FaCheckCircle } from "react-icons/fa";

// const SeeTheDifference = () => {
//   const benefits = [
//     {
//       title: "Think clearer",
//       description: "untangle messy thoughts"
//     },
//     {
//       title: "Decide faster", 
//       description: "stop overthinking"
//     },
//     {
//       title: "Feel lighter",
//       description: "ease stress and anxiety"
//     },
//     {
//       title: "Be more confident",
//       description: "trust your own judgment"
//     },
//     {
//       title: "Break patterns",
//       description: "spot blind spots holding you back"
//     },
//     {
//       title: "Focus better",
//       description: "sharpen your performance"
//     },
//     {
//       title: "Grow steadily",
//       description: "build reflection into a habit"
//     }
//   ];

//   return (
//     <div className="bg-white min-h-screen">
//       <div className="container mx-auto px-4 py-8 lg:py-16">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-full mx-auto">
          
//           {/* Image Section */}
//           <div className="order-1 lg:order-1">
//             <div className="relative w-full h-[400px] lg:h-[700px] rounded-2xl overflow-hidden">
//               {/* Image Placeholder - Replace with your actual image */}
//               <div className="w-full h-full flex items-center justify-center rounded-2xl">
//                <Image src={see_the_diff} alt="see_the_diff" width={650} height={650} className="rounded-2xl" />
//               </div>
//             </div>
//           </div>

//           {/* Content Section */}
//           <div className="order-1 lg:order-2 space-y-6 lg:space-y-8">
//             <div className="space-y-4">
//               <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#54B0AF] font-gotham font-bold leading-tight">
//                 See the Difference in your{' '}
//                 <span className="text-[#54B0AF] font-gotham font-bold">Everyday Life</span>
//               </h1>
              
//               <p className="text-lg md:text-xl text-[#323232] font-gotham font-normal leading-light">
//                 With Stocai, you’ll think clearer, act faster, and feel more in control - no matter what life throws at you.
//               </p>
//             </div>

//             {/* Benefits List */}
//             <div className="space-y-4">
//               {benefits.map((benefit, index) => (
//                 <div key={index} className="flex items-start space-x-3">
//                   <FaCheckCircle className="w-6 h-6 text-[#54B0AF] mt-0.5 flex-shrink-0" />
//                   <div className="flex-1">
//                     <span className="font-bold text-[#54B0AF] font-gotham">
//                       {benefit.title}
//                     </span>
//                     <span className="text-[#323223] font-medium font-gotham ml-2">
//                       - {benefit.description}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeeTheDifference;