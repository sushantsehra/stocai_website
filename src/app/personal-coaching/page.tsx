import type { Metadata } from "next";
import PersonalCoachingLanding from "./PersonalCoachingLanding";

export const metadata: Metadata = {
  title: "1:1 Personal Coaching | Better Corporate Life",
  description: "Build your promotion strategy with a dedicated Personal Corporate Strategist.",
};

export default function PersonalCoachingPage() {
  return <PersonalCoachingLanding />;
}
