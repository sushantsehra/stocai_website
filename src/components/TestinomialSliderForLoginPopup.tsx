"use client";

import Image from "next/image";
import stocai_img1 from "@/assets/1.png";
import stocai_img2 from "@/assets/2.png";
import stocai_img3 from "@/assets/3.png";
import stocai_img4 from "@/assets/4.png";
import stocai_img5 from "@/assets/5.png";
import stocai_img6 from "@/assets/6.png";

const TestinomialSliderForLoginPopup = () => {
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

  // Triple the testimonials for seamless infinite loop
  const extendedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <div className="mt-8">
      {/* Slider Container */}
      <div className="overflow-hidden rounded-lg">
        <div className="popup-slider-track">
          {extendedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="popup-testimonial-card"
            >
              {/* Profile Image */}
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt="testimonial"
                  fill
                  className="object-cover"
                />
                
                {/* Testimonial Quote Overlay */}
                <div className="absolute inset-0 bg-opacity-40 flex items-end">
                  <div className="text-center p-3 w-full">
                    <p className="text-white font-medium font-gotham text-xs leading-relaxed">
                      {/* "{testimonial.quote}" */}
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .popup-slider-track {
          display: flex;
          animation: popupSlide 6s linear infinite;
          will-change: transform;
        }

        .popup-slider-track:hover {
          animation-play-state: paused;
        }

        .popup-testimonial-card {
          flex: 0 0 200px;
          margin-right: 12px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
        }

        .popup-testimonial-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        @keyframes popupSlide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        /* Mobile optimizations for popup */
        @media (max-width: 480px) {
          .popup-slider-track {
            animation: popupSlide 5s linear infinite;
          }
          
          .popup-testimonial-card {
            flex: 0 0 180px;
            margin-right: 10px;
          }
        }

        /* Ensure smooth performance */
        .popup-slider-track * {
          backface-visibility: hidden;
          perspective: 1000;
        }
      `}</style>
    </div>
  );
};

export default TestinomialSliderForLoginPopup;