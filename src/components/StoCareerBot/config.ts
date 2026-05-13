import diagnosticHardWorkWide from "@/assets/diagnostic-hard-work.webp";
import diagnosticManagerInvisibleWide from "@/assets/diagnostic-manager-invisible-wide.webp";
import diagnosticMissedOpportunityWide from "@/assets/diagnostic-missed-opportunity-wide.webp";
import diagnosticSelfDoubtWide from "@/assets/diagnostic-self-doubt-wide.webp";
import type { Q1OptionId } from "@/data/stoConversation";
import type { BotStep } from "./types";

export const whatsappNumber = "918860403799";

export const stepMeta: Record<BotStep, { label: string; progress: number }> = {
  intro: { label: "Introduction", progress: 6 },
  q1: { label: "Your situation", progress: 14 },
  empathy: { label: "Your situation", progress: 22 },
  context: { label: "Context", progress: 32 },
  diagnostic: { label: "Diagnosis", progress: 42 },
  not_considered_formula: { label: "Diagnosis", progress: 54 },
  desire: { label: "Diagnosis", progress: 60 },
  visibility_desire: { label: "Diagnosis", progress: 64 },
  desire_blocker: { label: "Diagnosis", progress: 72 },
  importance: { label: "Diagnosis", progress: 68 },
  personal_seen: { label: "Diagnosis", progress: 80 },
  considered_formula: { label: "Diagnosis", progress: 54 },
  sponsor_power: { label: "Diagnosis", progress: 60 },
  sponsor_willing: { label: "Diagnosis", progress: 70 },
  next_level: { label: "Diagnosis", progress: 80 },
  door: { label: "What's really going on", progress: 90 },
  result: { label: "Your full picture", progress: 100 },
};

export const booleanAnswerLabel = (value: boolean | null, labels: { yes: string; no: string }) => {
  if (value === true) return labels.yes;
  if (value === false) return labels.no;
  return null;
};

export const getDoorCtas = () => {
  return {
    primary: { label: "I'd like to be more promotable", kind: "payment" as const },
  };
};

export const q1ShortLabels: Record<Q1OptionId, string> = {
  hard_work: "My hard work feels like waste",
  invisible: "My manager doesn't really see my work",
  missed_opportunity: "Someone else got the opportunity",
  self_doubt: "I'm starting to doubt myself",
};

export const situationImages: Record<Q1OptionId, typeof diagnosticHardWorkWide> = {
  hard_work: diagnosticHardWorkWide,
  invisible: diagnosticManagerInvisibleWide,
  missed_opportunity: diagnosticMissedOpportunityWide,
  self_doubt: diagnosticSelfDoubtWide,
};

export const situationCardImages: Record<Q1OptionId, string> = {
  hard_work: "/diagnostic-cards/hard-work.png",
  invisible: "/diagnostic-cards/manager-invisible.png",
  missed_opportunity: "/diagnostic-cards/missed-opportunity.png",
  self_doubt: "/diagnostic-cards/self-doubt.png",
};
