import type { ContextAnswers, DiagnosticDoorId, Q1OptionId } from "@/data/stoConversation";

export type BotStep =
  | "intro"
  | "q1"
  | "empathy"
  | "context"
  | "diagnostic"
  | "not_considered_formula"
  | "desire"
  | "visibility_desire"
  | "desire_blocker"
  | "importance"
  | "personal_seen"
  | "considered_formula"
  | "sponsor_power"
  | "sponsor_willing"
  | "next_level"
  | "door"
  | "result";

export type StoCareerBotProps = {
  variant?: "floating" | "embedded";
  waitlistId?: string;
  waitlistReferenceId?: string;
  source?: string;
  paymentName?: string;
  paymentEmail?: string;
  paymentPhone?: string;
  paymentCountryCode?: string;
};

export type BotSessionResponse = {
  id: string;
  waitlist_id: string;
  flow_version: string;
  status: string;
  current_step?: string | null;
  answers_json?: Record<string, unknown>;
  result_json?: Record<string, unknown>;
  started_at?: string | null;
  completed_at?: string | null;
  created_at: string;
  updated_at: string;
};

export type BotAnswersState = {
  q1: Q1OptionId | null;
  context: ContextAnswers;
  skippedContext: boolean;
  diagnosticPath: "not_considered" | "considered" | null;
  desireAskedEarly: boolean | null;
  desireBlocker: string;
  importanceVisible: boolean | null;
  personallySeen: boolean | null;
  sponsorHasPower: boolean | null;
  sponsorWillSpendCapital: boolean | null;
  nextLevelEvidence: boolean | null;
  door: DiagnosticDoorId | null;
};
