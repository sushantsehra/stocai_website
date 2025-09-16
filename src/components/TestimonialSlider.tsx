"use client";

import React, { useState } from "react";
import Image from "next/image";
import LoginPopup from '@/components/LoginPopup';
import stocai_img1 from "@/assets/1.png";
import stocai_img2 from "@/assets/2.png";
import stocai_img3 from "@/assets/3.png";
import stocai_img4 from "@/assets/4.png";
import stocai_img5 from "@/assets/5.png";
import stocai_img6 from "@/assets/6.png";
import posthog from "posthog-js";

const TestimonialSlider = () => {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const handleStartFreeSession = () => {
    posthog.capture("testimonial_section", {
      button: "start_free_session",
      location: "about_page",
    });

    setIsLoginPopupOpen(true);
  };

  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };

  const testimonials = [
    {
      id: 1,
      quote:
        "Not exactly therapy, but exactly what I needed to gain clarity and stop wasting time stuck in my head.",
      image: stocai_img1,
    },
    {
      id: 2,
      quote:
        "After months of overthinking, one session helped me see a simple next step to move forward.",
      image: stocai_img2,
    },
    {
      id: 3,
      quote:
        "The questions made me realize it wasn't the stress of the decision, it was my fear that was holding me back.",
      image: stocai_img3,
    },
    {
      id: 4,
      quote:
        "I was overwhelmed with anxiety, but Stocai helped me break it down and take action quickly.",
      image: stocai_img4,
    },
    {
      id: 5,
      quote:
        "I've been journaling since years, but this is better. The clear prompts helped me focus and move ahead.",
      image: stocai_img5,
    },
    {
      id: 6,
      quote:
        "It gave me the confidence to have difficult conversations at work without spiraling into doubt.",
      image: stocai_img6,
    },
  ];

  // Duplicate testimonials for seamless loop
  const extendedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <>
      <div className="w-full bg-white py-16 overflow-hidden">
        <div className="relative">
          {/* Animated testimonial cards */}
          <div className="flex animate-scroll">
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-80 mx-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {/* Profile Image */}
                <div className="relative w-full h-96 rounded-xl overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt="testimonial"
                    fill
                    className="object-cover "
                  />

                   {/* Testimonial Quote */}
                <div className="text-center absolute bottom-4 px-4 sm:px-3">
                  <p className="text-white font-medium font-gotham text-sm leading-relaxed">
                    {testimonial.quote}
                  </p>
                </div>
                </div>

               
              </div>
            ))}
          </div>

        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleStartFreeSession}
           className="bg-[#54B0AF] font-gotham hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
            Start Free Session
          </button>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }

          .animate-scroll {
            animation: scroll 5s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .animate-scroll {
              animation: scroll 5s linear infinite;
            }
          }

          @media (max-width: 480px) {
            .animate-scroll {
              animation: scroll 3s linear infinite; 
            }
          }
        `}</style>

      </div>

      {/* Login Popup Modal */}
      <LoginPopup isOpen={isLoginPopupOpen} onClose={handleCloseLoginPopup} />
    </>
  );
};

export default TestimonialSlider;

// "use client";

// import Image from "next/image";
// import stocai_img1 from "@/assets/1.png";
// import stocai_img2 from "@/assets/2.png";
// import stocai_img3 from "@/assets/3.png";
// import stocai_img4 from "@/assets/4.png";
// import stocai_img5 from "@/assets/5.png";
// import stocai_img6 from "@/assets/6.png";
// import posthog from "posthog-js";

// const TestimonialSlider = () => {
//   const testimonials = [
//     {
//       id: 1,
//       quote:
//         "“Not exactly therapy, but exactly what I needed to gain clarity and stop wasting time stuck in my head.”",
//       image: stocai_img1,
//     },
//     {
//       id: 2,
//       quote:
//         "“After months of overthinking, one session helped me see a simple next step to move forward.”",
//       image: stocai_img2,
//     },
//     {
//       id: 3,
//       quote:
//         "“The questions made me realize it wasn’t the stress of the decision, it was my fear that was holding me back.”",
//       image: stocai_img3,
//     },
//     {
//       id: 4,
//       quote:
//         "“I was overwhelmed with anxiety, but Stocai helped me break it down and take action quickly.”",
//       image: stocai_img4,
//     },
//     {
//       id: 5,
//       quote:
//         "“I’ve been journaling since years, but this is better. The clear prompts helped me focus and move ahead.”",
//       image: stocai_img5,
//     },
//     {
//       id: 6,
//       quote:
//         "“It gave me the confidence to have difficult conversations at work without spiraling into doubt.”",
//       image: stocai_img6,
//     },
//   ];

//   // Duplicate testimonials for seamless loop
//   const extendedTestimonials = [
//     ...testimonials,
//     ...testimonials,
//     ...testimonials,
//   ];

//   return (
//     <div className="w-full bg-white py-16 overflow-hidden">
//       <div className="relative">
//         {/* Animated testimonial cards */}
//         <div className="flex animate-scroll">
//           {extendedTestimonials.map((testimonial, index) => (
//             <div
//               key={`${testimonial.id}-${index}`}
//               className="flex-shrink-0 w-80 mx-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
//             >
//               {/* Profile Image */}
//               <div className="relative w-full h-96 rounded-xl overflow-hidden relative">
//                 <Image
//                   src={testimonial.image}
//                   alt="testimonial"
//                   fill
//                   className="object-cover "
//                 />

//                  {/* Testimonial Quote */}
//               <div className="text-center absolute bottom-4 px-4 sm:px-3">
//                 <p className="text-white font-medium font-gotham text-sm leading-relaxed">
//                   {testimonial.quote}
//                 </p>
//               </div>
//               </div>

             
//             </div>
//           ))}
//         </div>

//       </div>

//       {/* CTA Button */}
//       <div className="text-center mt-12">
//         <button
//           onClick={() => {
//           posthog.capture("testimonial_section", {
//             button: "start_free_session",
//             location: "about_page",
//           });

//           setTimeout(() => {
//             window.location.href = "https://clarity.mystocai.com";
//           }, 300);
//         }}

//          className="bg-[#54B0AF] font-gotham hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
//           Start Free Session
//         </button>
//       </div>

//       <style jsx>{`
//         @keyframes scroll {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-33.333%);
//           }
//         }

//         .animate-scroll {
//           animation: scroll 5s linear infinite; 

//         .animate-scroll:hover {
//           animation-play-state: paused;
//         }

//         /* Responsive adjustments */
//         @media (max-width: 768px) {
//           .animate-scroll {
//             animation: scroll 5s linear infinite;
//           }
//         }

//         @media (max-width: 480px) {
//           .animate-scroll {
//             animation: scroll 3s linear infinite; 
//           }
//         }
//       `}</style>

//     </div>
//   );
// };

// export default TestimonialSlider;