import type { Metadata } from "next";
import PromotionFlow from "./PromotionFlow";

export const metadata: Metadata = {
  title: "Promotion Pathfinder | BCL",
  description: "Find the career barrier holding you back and discover your next step.",
};

export default async function PromotionFlowPage({
  searchParams,
}: {
  searchParams: Promise<{ barrier?: string; stage?: string; choice?: string }>;
}) {
  const { barrier, stage, choice } = await searchParams;
  return <PromotionFlow initialBarrierId={barrier} initialStage={stage} initialChoice={choice} />;
}
