import diagnosticHardWorkWide from "@/assets/diagnostic-hard-work.webp";
import diagnosticManagerInvisible from "@/assets/diagnostic-manager-invisible.webp";
import diagnosticMissedOpportunity from "@/assets/diagnostic-missed-opportunity.webp";
import diagnosticSelfDoubt from "@/assets/diagnostic-self-doubt.webp";
import type { DiagnosticDoorId, Q1OptionId } from "@/data/stoConversation";
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

export const getDoorCtas = (door: DiagnosticDoorId) => {
  if (door === "values_misalignment" || door === "complex_situation") {
    return {
      primary: { label: "Yes, let's talk", kind: "call" as const },
    };
  }

  if (door === "sponsor_network" || door === "communication_framework") {
    return {
      primary: { label: "Yes, I want this", kind: "payment" as const },
    };
  }

  return {
    primary: { label: "Take me there", kind: "payment" as const },
    secondary: { label: "I'd like a call instead", kind: "call" as const },
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
  invisible: diagnosticManagerInvisible,
  missed_opportunity: diagnosticMissedOpportunity,
  self_doubt: diagnosticSelfDoubt,
};
