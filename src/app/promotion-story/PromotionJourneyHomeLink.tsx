import Image from "next/image";
import Link from "next/link";

export const PROMOTION_JOURNEY_HOME_PATH = "/promotion-story";

export default function PromotionJourneyHomeLink({ className }: { className: string }) {
  return (
    <Link href={PROMOTION_JOURNEY_HOME_PATH} className={className} aria-label="Better Corporate Life home">
      <Image src="/bcl-logo.png" alt="Better Corporate Life" width={210} height={105} priority />
    </Link>
  );
}
