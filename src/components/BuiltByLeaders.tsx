import Image from 'next/image';
import accenture from "@/assets/accenture.png";
import citi from "@/assets/citi.png";
import edelweiss from "@/assets/edelweiss.png";
import iimc from "@/assets/iimc.png";
import kingscollege from "@/assets/kingscollege.png";
import nvidia from "@/assets/nvidia.png";
import texas from "@/assets/Texas.png";
import imtgd from "@/assets/IMTGD.jpeg";

const BuiltByLeaders = () => {
  const logos = [
    {
      name: 'University of Texas',
      url: texas,
      alt: 'University of Texas logo'
    },
    {
      name: "King's College London",
      url: kingscollege,
      alt: "King's College London logo"
    },
    {
      name: 'IIM Calcutta',
      url: iimc,
      alt: 'IIM Calcutta logo'
    },
    {
      name: 'IMT Ghaziabad',
      url: imtgd,
      alt: 'IMT Ghaziabad logo'
    },
    {
      name: 'Citi',
      url: citi,
      alt: 'Citi logo'
    },
    {
      name: 'NVIDIA',
      url: nvidia,
      alt: 'NVIDIA logo'
    },
    {
      name: 'Accenture',
      url: accenture,
      alt: 'Accenture logo'
    },
    {
      name: 'Edelweiss',
      url: edelweiss,
      alt: 'Edelweiss logo'
    }
  ];

  return (
    <section className="w-full py-12 px-4 bg-white">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="text-left mb-6 ml-4">
          <h2 className="text-2xl md:text-[24px] font-bold text-[#1D1D1D] font-gotham mb-4">
            Built by Top B-School graduates and Corporate Leaders
             <span className="relative inline-block">
            </span>
          </h2>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-6 lg:gap-1 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="group relative flex items-center justify-center hover:shadow-md transition-all duration-300 hover:scale-105 w-full h-14 sm:h-20 md:h-24 lg:h-16"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={logo.url}
                  alt={logo.alt}
                  width={["Citi", "King's College London"].includes(logo.name) ? 60 : 320}
                  height={["Citi", "King's College London"].includes(logo.name) ? 15 : 26}
                  className={`object-contain filter group-hover:grayscale-0 transition-all duration-300 p-1 sm:p-2 
                      ${["Citi", "King's College London"].includes(logo.name) ? "scale-90 lg:scale-50" : "lg:scale-75"} 
                      sm:w-auto sm:h-auto`}
                  sizes="(max-width: 640px) 25vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 12.5vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuiltByLeaders;