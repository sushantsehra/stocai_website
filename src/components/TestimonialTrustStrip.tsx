import Image, { StaticImageData } from "next/image";

import Aarohi from "@/assets/AarohiMehtaImg.jpg";
import Amit from "@/assets/AmitS.jpg";
import Anika from "@/assets/AnikaSharma.jpg";
import Diksha from "@/assets/diksha.jpg";
import Eleena from "@/assets/eleena.png";
import Kavita from "@/assets/KavitaG.jpg";
import Manav from "@/assets/manav.jpg";
import Nikhil from "@/assets/NikhilS.jpg";
import Utkarsh from "@/assets/utkarshJha.jpg";
import Venkatraman from "@/assets/venkatraman.png";

const people: { image: StaticImageData; name: string }[] = [
  { image: Aarohi, name: "Aarohi" },
  { image: Amit, name: "Amit" },
  { image: Anika, name: "Anika" },
  { image: Diksha, name: "Diksha" },
  { image: Eleena, name: "Eleena" },
  { image: Kavita, name: "Kavita" },
  { image: Manav, name: "Manav" },
  { image: Nikhil, name: "Nikhil" },
  { image: Utkarsh, name: "Utkarsh" },
  { image: Venkatraman, name: "Venkatraman" },
];

export default function TestimonialTrustStrip() {
  return (
    <aside
      aria-label="Community trust"
      className="w-full bg-transparent px-4 py-5 sm:px-6 sm:py-6"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 sm:flex-row sm:gap-7">
        <div className="flex -space-x-2.5" aria-label="Members of the Better Corporate Life community">
          {people.map(({ image, name }) => (
            <div
              key={name}
              className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-white bg-neutral-300 sm:h-11 sm:w-11"
              title={name}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 border-[#b8c9dd] sm:border-l sm:pl-7">
          <div className="flex gap-0.5 text-[19px] leading-none text-[#ffdb1f]" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} aria-hidden="true">★</span>
            ))}
          </div>
          <p className="max-w-[150px] text-left font-jakarta text-[11px] font-bold uppercase leading-[1.05] text-[#24364b] sm:text-[13px]">
            Trusted by 100,000+ professionals
          </p>
        </div>
      </div>
    </aside>
  );
}
