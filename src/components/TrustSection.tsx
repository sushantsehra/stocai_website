import Image from "next/image";
import { Crown } from "lucide-react";

const TrustSection = () => {
  const stats: Stat[] = [
    { label: 'PROMOTION CYCLES OBSERVED', value: 125 },
    { label: 'PROMOTIONS INFLUENCED', value: 25 },
    { label: 'PITCHES REVIEWED', value: 200 },
    { label: 'BOSSES SERVED', value: 61 }
  ];

    const companies = [
    { name: "NVIDIA", logo: "/logos/nvidia.png" },
    { name: "Accenture", logo: "/logos/accenture.png" },
    { name: "Citi", logo: "/logos/citi.png" },
    { name: "IMT", logo: "/logos/imt.png" },
    { name: "Edelweiss", logo: "/logos/edelweiss.png" },
    { name: "IIMC", logo: "/logos/iimc.png" },
    { name: "Texas", logo: "/logos/texas.png" },
    { name: "Kings", logo: "/logos/kings.png" },
  ];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold text-[#0F1729] mb-4">
              Who are we and <span className="text-[#0B64F4]">why should you trust us?</span>
            </h2>
            <p className="text-sm sm:text-base md:text-[18px] text-black font-normal mb-4">
              We're not motivational speakers or LinkedIn influencers peddling platitudes. And we're not here to sell you empty confidence.
            </p>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#000000] mb-4">
              We've been overlooked. We've figured out why.
            </h3>
            <p className="text-sm sm:text-base text-black font-normal mb-6">
              And we've learned how to unblock career growth, without becoming someone we're not. Now, we help capable professionals like you stop second-guessing themselves and start moving forward with intent.
            </p>
            <p className="text-sm sm:text-base text-black font-normal mb-2">
              Our team brings together expertise in <span className="text-[#0B64F4] font-bold">psychology, neuroscience, marketing, HR, business strategy, coaching, behavioural science, and more</span>.
            </p>
            <p className="text-lg sm:text-xl font-bold text-black mt-6">We're rooting for you. 💪</p>
          </div>

          <div className="rounded-3xl shadow-2xl p-8 sm:p-10 max-w-md mx-auto transform rotate-[5deg] hover:rotate-0 transition-transform duration-500">
            <div className="relative bg-white text-white max-h-[100px]">
            {/* Profile Section */}
             <div className="flex flex-col items-center">
                <div className="relative">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-[5px] border-blue-500 shadow-lg">
                    <Image
                    src="/founder.jpg" 
                    alt="Sushant Sehra"
                    width={128}
                    height={128}
                    className="object-cover"
                    />
                </div>
                {/* Crown Badge */}
                <div className="absolute -bottom-1 -right-1 bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-md">
                    <Crown className="w-4 h-4 text-white" />
                </div>
                </div>
                <div className="mt-4 text-center">
                <h3 className="text-lg sm:text-xl font-bold tracking-wide">
                    SUSHANT SEHRA
                </h3>
                <p className="text-sm sm:text-base text-blue-200 font-medium">
                    FOUNDER
                </p>
                </div>
            </div>

            <div className="text-white rounded-3xl shadow-2xl p-8 sm:p-10 max-w-md mx-auto transform rotate-[5deg] hover:rotate-0 transition-transform duration-500">
            {/* Stats Section */}
            <div className="space-y-3 mb-8">
                {stats.map((stat, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center border-b border-slate-800 pb-2"
                >
                    <span className="text-xs sm:text-sm text-slate-400 tracking-wide">
                    {stat.label}
                    </span>
                    <span className="text-lg sm:text-xl font-bold">{stat.value}</span>
                </div>
                ))}
            </div>

            {/* Divider */}
            <div className="border-t border-slate-800 my-6" />

            {/* Tagline */}
            <div className="text-center mb-8">
                <p className="text-xs sm:text-sm text-slate-300">
                Built by Top B-School graduates and{" "}
                <span className="font-semibold text-blue-400">
                    Corporate Leaders
                </span>
                </p>
            </div>

            {/* Company Logos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 justify-items-center">
                {companies.map((company, i) => (
                <div
                    key={i}
                    className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                >
                    <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={30}
                    className="object-contain max-h-7"
                    />
                </div>
                ))}
            </div>
            </div>
          </div>
          </div>

            <div className="relative bg-gradient-to-b from-slate-900 to-black text-white rounded-3xl shadow-2xl p-8 sm:p-10 max-w-md mx-auto transform rotate-[5deg] hover:rotate-0 transition-transform duration-500">
            {/* Profile Section */}
            <div className="relative flex flex-col items-center mb-8">
                <div className="relative">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-[5px] border-blue-500 shadow-lg">
                    <Image
                    src="/founder.jpg" // replace with your image path
                    alt="Sushant Sehra"
                    width={128}
                    height={128}
                    className="object-cover"
                    />
                </div>
                {/* Crown Badge */}
                <div className="absolute -bottom-1 -right-1 bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-md">
                    <Crown className="w-4 h-4 text-white" />
                </div>
                </div>
                <div className="mt-4 text-center">
                <h3 className="text-lg sm:text-xl font-bold tracking-wide">
                    SUSHANT SEHRA
                </h3>
                <p className="text-sm sm:text-base text-blue-200 font-medium">
                    FOUNDER
                </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="space-y-3 mb-8">
                {stats.map((stat, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center border-b border-slate-800 pb-2"
                >
                    <span className="text-xs sm:text-sm text-slate-400 tracking-wide">
                    {stat.label}
                    </span>
                    <span className="text-lg sm:text-xl font-bold">{stat.value}</span>
                </div>
                ))}
            </div>

            {/* Divider */}
            <div className="border-t border-slate-800 my-6" />

            {/* Tagline */}
            <div className="text-center mb-8">
                <p className="text-xs sm:text-sm text-slate-300">
                Built by Top B-School graduates and{" "}
                <span className="font-semibold text-blue-400">
                    Corporate Leaders
                </span>
                </p>
            </div>

            {/* Company Logos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 justify-items-center">
                {companies.map((company, i) => (
                <div
                    key={i}
                    className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                >
                    <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={30}
                    className="object-contain max-h-7"
                    />
                </div>
                ))}
            </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default TrustSection;