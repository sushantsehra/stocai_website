"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import posthog from "posthog-js";
import stoAvatar from "@/assets/panda_main.png";
import env from "@/utils/env";
import {
  buildResultCopy,
  ContextAnswers,
  DiagnosticDoorId,
  doorDetails,
  getQ1Empathy,
  q1Options,
  Q1OptionId,
} from "@/data/stoConversation";

type BotStep =
  | "intro"
  | "q1"
  | "empathy"
  | "context"
  | "diagnostic"
  | "not_considered_formula"
  | "desire"
  | "desire_blocker"
  | "importance"
  | "personal_seen"
  | "considered_formula"
  | "sponsor_power"
  | "sponsor_willing"
  | "next_level"
  | "door"
  | "result";

type StoCareerBotProps = {
  variant?: "floating" | "embedded";
  waitlistId?: string;
  waitlistReferenceId?: string;
  source?: string;
  paymentName?: string;
  paymentEmail?: string;
  paymentPhone?: string;
  paymentCountryCode?: string;
};

type BotSessionResponse = {
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

const whatsappNumber = "918860403799";

const pushToDataLayer = (payload: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  const dataLayerWindow = window as unknown as Window & { dataLayer?: unknown[] };
  if (!dataLayerWindow.dataLayer) {
    dataLayerWindow.dataLayer = [];
  }
  dataLayerWindow.dataLayer.push(payload);
};

const trackBotEvent = (event: string, payload: Record<string, unknown> = {}) => {
  const properties = { source: "bot", ...payload };
  posthog.capture(event, properties);
  pushToDataLayer({ event, ...properties });
};

const optionClass =
  "w-full cursor-pointer rounded-[18px] border border-[#d8e4f6] bg-white px-5 py-4 text-left font-gotham text-[15px] font-medium leading-7 text-[#111111] shadow-[0_8px_24px_rgba(1,75,170,0.05)] transition hover:border-[#0A57C6] hover:bg-[#f8fbff] disabled:cursor-not-allowed disabled:opacity-60 md:px-6 md:py-5 md:text-[16px]";

const selectedOptionClass =
  "!border-[#0A57C6] !bg-[#014BAA] !text-white shadow-[0_18px_34px_rgba(1,75,170,0.16)] hover:!bg-[#014BAA] hover:!text-white";

const BotMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-[20px] rounded-bl-[6px] border border-[#e3ebf7] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] px-5 py-4 font-gotham text-[15px] leading-7 text-[#1f2937] shadow-[0_10px_28px_rgba(1,75,170,0.05)] md:px-6 md:py-5 md:text-[16px]">
    {children}
  </div>
);

const UserChoice = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-end">
    <div className="w-fit max-w-[88%] rounded-[18px] border border-[#0A57C6] bg-[#014BAA] px-5 py-4 text-left font-gotham text-[15px] font-semibold leading-7 text-white shadow-[0_14px_30px_rgba(1,75,170,0.18)] md:max-w-[760px] md:px-6 md:py-5 md:text-[16px]">
      {children}
    </div>
  </div>
);

const FormulaCard = ({ title, formula, note }: { title: string; formula: string; note: string }) => (
  <div className="rounded-[24px] border border-[#dce8f8] bg-[linear-gradient(180deg,#ffffff_0%,#edf5ff_100%)] px-5 py-6 text-center shadow-[0_18px_40px_rgba(1,75,170,0.08)] md:px-7">
    <p className="mx-auto mb-4 inline-flex rounded-full border border-[#dce8f8] bg-white px-3 py-2 font-gotham text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-[#0A57C6]">
      {title}
    </p>
    <p className="font-gotham text-[22px] font-bold leading-[1.15] tracking-[-0.02em] text-[#111111] md:text-[28px]">
      {formula}
    </p>
    <p className="mt-4 font-gotham text-[15px] leading-7 text-[#4b5563] md:text-[16px]">{note}</p>
  </div>
);

const PandaHeader = () => (
  <div className="mb-4 flex items-center gap-4">
    <div className="h-[78px] w-[78px] overflow-visible">
      <Image src={stoAvatar} alt="Sto" width={78} height={78} className="h-full w-full object-contain" />
    </div>
    <div>
      <p className="font-gotham text-[17px] font-bold text-[#111111]">Sto</p>
      <p className="font-gotham text-[13px] text-[#6b7280]">Your guide</p>
    </div>
  </div>
);

const TypingIndicator = () => (
  <div className="flex h-12 w-fit items-center gap-1.5 rounded-[18px] rounded-bl-[6px] border border-[#e3ebf7] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] px-5">
    <span className="h-2 w-2 animate-bounce rounded-full bg-[#0A57C6]" />
    <span className="h-2 w-2 animate-bounce rounded-full bg-[#0A57C6] [animation-delay:120ms]" />
    <span className="h-2 w-2 animate-bounce rounded-full bg-[#0A57C6] [animation-delay:240ms]" />
  </div>
);

const stepMeta: Record<BotStep, { label: string; progress: number }> = {
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

const booleanAnswerLabel = (value: boolean | null, labels: { yes: string; no: string }) => {
  if (value === true) return labels.yes;
  if (value === false) return labels.no;
  return null;
};

const getDoorCtas = (door: DiagnosticDoorId) => {
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

export default function StoCareerBot({
  variant = "floating",
  waitlistId,
  waitlistReferenceId,
  source = "bot",
  paymentName = "",
  paymentEmail = "",
  paymentPhone = "",
  paymentCountryCode = "+91",
}: StoCareerBotProps) {
  const isEmbedded = variant === "embedded";
  const [isOpen, setIsOpen] = useState(isEmbedded);
  const [step, setStep] = useState<BotStep>("intro");
  const [visibleMessageCount, setVisibleMessageCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [history, setHistory] = useState<BotStep[]>([]);
  const [q1, setQ1] = useState<Q1OptionId | null>(null);
  const [context, setContext] = useState<ContextAnswers>({
    targetRole: "",
  });
  const [skippedContext, setSkippedContext] = useState(false);
  const [diagnosticPath, setDiagnosticPath] = useState<"not_considered" | "considered" | null>(null);
  const [desireAskedEarly, setDesireAskedEarly] = useState<boolean | null>(null);
  const [desireBlocker, setDesireBlocker] = useState("");
  const [importanceVisible, setImportanceVisible] = useState<boolean | null>(null);
  const [personallySeen, setPersonallySeen] = useState<boolean | null>(null);
  const [sponsorHasPower, setSponsorHasPower] = useState<boolean | null>(null);
  const [sponsorWillSpendCapital, setSponsorWillSpendCapital] = useState<boolean | null>(null);
  const [nextLevelEvidence, setNextLevelEvidence] = useState<boolean | null>(null);
  const [door, setDoor] = useState<DiagnosticDoorId | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionStartedAt, setSessionStartedAt] = useState<string | null>(null);
  const [sessionActivated, setSessionActivated] = useState(false);
  const [debouncedAnswersPayload, setDebouncedAnswersPayload] = useState<Record<string, unknown>>({});
  const [debouncedResultPayload, setDebouncedResultPayload] = useState<Record<string, unknown>>({});
  const [actionState, setActionState] = useState<"idle" | "loading" | "error">("idle");
  const [actionMessage, setActionMessage] = useState("");

  const selectedQ1 = q1Options.find((option) => option.id === q1);

  const resultCopy = useMemo(() => {
    if (!q1 || !door) return null;
    return buildResultCopy({ q1, door, context, skippedContext, desireBlocker });
  }, [context, desireBlocker, door, q1, skippedContext]);

  const answersPayload = useMemo<Record<string, unknown>>(
    () => ({
      q1,
      q1Label: selectedQ1?.label ?? null,
      context: {
        targetRole: context.targetRole,
        skipped: skippedContext,
        skippedLabel: skippedContext ? "Let's skip this for now" : null,
      },
      diagnosticPath,
      diagnosticPathLabel:
        diagnosticPath === "not_considered"
          ? "I was not even considered for the promotion or opportunity"
          : diagnosticPath === "considered"
            ? "I was considered but someone else got chosen"
            : null,
      decisions: {
        desireAskedEarly,
        desireAskedEarlyLabel: booleanAnswerLabel(desireAskedEarly, {
          yes: "Yes, I did",
          no: "No, I didn't",
        }),
        importanceVisible,
        importanceVisibleLabel: booleanAnswerLabel(importanceVisible, {
          yes: "Yes, it's clearly important to them",
          no: "No. I'm not sure they see the value",
        }),
        personallySeen,
        personallySeenLabel: booleanAnswerLabel(personallySeen, {
          yes: "Yes, they do",
          no: "No, they don't",
        }),
        sponsorHasPower,
        sponsorHasPowerLabel: booleanAnswerLabel(sponsorHasPower, {
          yes: "Yes, they do",
          no: "No, they don't",
        }),
        sponsorWillSpendCapital,
        sponsorWillSpendCapitalLabel: booleanAnswerLabel(sponsorWillSpendCapital, {
          yes: "Yes, they would",
          no: "No, I don't think so",
        }),
        nextLevelEvidence,
        nextLevelEvidenceLabel: booleanAnswerLabel(nextLevelEvidence, {
          yes: "Yes, it does",
          no: "No, it doesn't",
        }),
      },
      desireBlocker,
      desireBlockerLabel: desireBlocker || null,
      door,
      doorLabel: door ? doorDetails[door].name : null,
      waitlistReferenceId,
    }),
    [
      context,
      desireAskedEarly,
      desireBlocker,
      diagnosticPath,
      door,
      importanceVisible,
      nextLevelEvidence,
      personallySeen,
      q1,
      skippedContext,
      sponsorHasPower,
      sponsorWillSpendCapital,
      selectedQ1,
      waitlistReferenceId,
    ],
  );

  const resultPayload = useMemo<Record<string, unknown>>(
    () =>
      resultCopy && door
        ? {
            door,
            title: resultCopy.title,
            summary: resultCopy.summary,
            pain: resultCopy.pain,
            concept: resultCopy.concept,
            program: resultCopy.program,
          }
        : {},
    [door, resultCopy],
  );

  const sessionStatus = door && step === "result" ? "completed" : "in_progress";
  const answersForPersistence = step === "context" ? debouncedAnswersPayload : answersPayload;
  const resultForPersistence = step === "context" ? debouncedResultPayload : resultPayload;
  const activeDoorCtas = door ? getDoorCtas(door) : null;

  const screenItems = useMemo<React.ReactNode[]>(() => {
    if (step === "q1") {
      return [
        <PandaHeader key="panda" />,
        <BotMessage key="q1">So tell me - what&apos;s actually bothering you at work right now?</BotMessage>,
        <BotMessage key="privacy">This is a private conversation between us. Be frank so we can get to real insights.</BotMessage>,
      ];
    }

    if (step === "intro") {
      return [
        <div key="intro" className="relative min-h-[440px] overflow-hidden rounded-[28px] border border-[#dce8f8] bg-[linear-gradient(135deg,#ffffff_0%,#f7fbff_58%,#eef5ff_100%)] px-6 py-7 shadow-[0_22px_46px_rgba(1,75,170,0.08)] md:min-h-[500px] md:px-8 md:py-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(1,75,170,0.12)_0%,rgba(1,75,170,0.04)_28%,rgba(255,255,255,0)_62%)]" />
          <div className="absolute right-[-30px] top-[-10px] h-[250px] w-[250px] rounded-full bg-[#dfeeff]/60 blur-3xl md:right-[72px] md:top-[-6px] md:h-[420px] md:w-[420px]" />

          <motion.div
            initial={{ x: 134, y: 124, scale: 4.2, opacity: 0.98 }}
            animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            transition={{ delay: 1.95, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-6 top-7 z-10 md:left-[42px] md:top-[38px]"
          >
            <motion.div
              initial={{ x: 320, y: 76, scale: 4.9, rotate: -5, opacity: 1 }}
              animate={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
              transition={{ delay: 1.95, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 1, scale: 3.15 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.95, duration: 1.05, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(1,75,170,0.22)_0%,rgba(1,75,170,0.06)_48%,rgba(255,255,255,0)_74%)] blur-xl md:h-[280px] md:w-[280px]"
              />
              <Image src={stoAvatar} alt="Sto" width={78} height={78} className="relative h-[78px] w-[78px] rounded-[16px] object-cover" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.75, duration: 0.55, ease: "easeOut" }}
            className="relative z-20 flex min-h-[370px] flex-col justify-end gap-5 md:min-h-[430px] md:max-w-[58%]"
          >
            <p className="font-gotham text-[11px] font-bold uppercase tracking-[0.18em] text-[#0A57C6]">Better Corporate Life</p>
            <h3 className="max-w-[12ch] font-quattrocento text-[32px] font-bold leading-[1.02] tracking-[-0.03em] text-[#111111] md:text-[44px]">
              The Corporate <span className="text-[#014BAA]">Life</span> Conversation
            </h3>
            <div className="h-[3px] w-12 rounded-full bg-[#014BAA]" />
            <p className="max-w-[38ch] font-gotham text-[16px] leading-8 text-[#4b5563]">
              Hi I am Sto. To get unstuck, we start by seeing where we stand right now.
            </p>
          </motion.div>
        </div>,
      ];
    }

    if (step === "empathy" && selectedQ1 && q1) {
      return [
        <PandaHeader key="panda" />,
        <UserChoice key="q1-choice">{selectedQ1.label}</UserChoice>,
        <BotMessage key="q1-empathy">{getQ1Empathy(q1)}</BotMessage>,
        <BotMessage key="context-bridge">
          Help me understand this better; can you answer a couple more questions?
        </BotMessage>,
      ];
    }

    if (step === "context") {
      return [
        <PandaHeader key="panda" />,
        <BotMessage key="context-intro">What role or career milestone are you currently working towards?</BotMessage>,
      ];
    }

    if (step === "diagnostic") {
      return [
        <PandaHeader key="panda" />,
        <BotMessage key="diagnostic-ready">
          Ok. Tell me what&apos;s currently happening at work.
        </BotMessage>,
      ];
    }

    if (step === "not_considered_formula") {
      return [
        <PandaHeader key="panda" />,
        <UserChoice key="not-considered">I was not even considered for the promotion or opportunity</UserChoice>,
        <BotMessage key="not-considered-intro">There&apos;s a simple reason why promotions happen - or don&apos;t.</BotMessage>,
        <FormulaCard
          key="not-considered-formula"
          title="To be considered"
          formula="Performance x Visibility"
          note="If either is missing, the result is zero. Your performance isn't the issue. So let's look at visibility."
        />,
      ];
    }

    if (step === "desire") {
      return [
        <PandaHeader key="panda" />,
        <BotMessage key="desire-question">
          Did you ask for the promotion early enough? Did you ensure your manager knew you were looking for one?
        </BotMessage>,
      ];
    }

    if (step === "desire_blocker") {
      return [
        <PandaHeader key="panda" />,
        <UserChoice key="desire-no">No, I didn&apos;t</UserChoice>,
        <BotMessage key="desire-blocker-1">Alright, so you didn&apos;t ask. I think I see what&apos;s happening here.</BotMessage>,
        <BotMessage key="desire-blocker-2">
          You didn&apos;t ask for a promotion. Not because you don&apos;t want it, but because somewhere deep inside you is the fear that you aren&apos;t ready for it.
        </BotMessage>,
        <BotMessage key="desire-blocker-3">
          This happens more often than you&apos;d think. And it&apos;s fixable. In fact, it&apos;s one of the things we cover in our Be More Promotable program.
        </BotMessage>,
      ];
    }

    if (step === "importance") {
      return [
        <PandaHeader key="panda" />,
        <UserChoice key="desire-yes">Yes, I did</UserChoice>,
        <BotMessage key="importance-intro-1">It&apos;s great that you asked. Not many make that effort.</BotMessage>,
        <BotMessage key="importance-intro-2">Clearly, you have the desire for visibility.</BotMessage>,
        <FormulaCard
          key="visibility-card"
          title="Visibility"
          formula="Desire x Importance"
          note="You can do great work and still be invisible if the right people don't connect you to that work."
        />,
        <BotMessage key="desire-question">
          Is the project you&apos;re working on seen as important by leadership? Do they care about the outcomes?
        </BotMessage>,
      ];
    }

    if (step === "personal_seen") {
      return [
        <PandaHeader key="panda" />,
        <UserChoice key="importance-yes">Yes, it&apos;s clearly important to them</UserChoice>,
        <BotMessage key="personal-seen-question">
          So the project is seen as important. But are you? Do people know it&apos;s you doing all this work?
        </BotMessage>,
      ];
    }

    if (step === "considered_formula") {
      return [
        <PandaHeader key="panda" />,
        <UserChoice key="considered">I was considered but someone else got chosen</UserChoice>,
        <BotMessage key="considered-intro">
          You were considered. This means your performance and visibility levels are high enough. But that&apos;s not all a promotion requires.
        </BotMessage>,
        <FormulaCard
          key="considered-formula"
          title="To be picked"
          formula="Sponsor Strength x Next Level Signal"
          note="Sponsor strength is about who goes to bat for you, and with what impact. Next level signals help people see you in the new role."
        />,
      ];
    }

    if (step === "sponsor_power") {
      return [
        <PandaHeader key="panda" />,
        <BotMessage key="sponsor-power-question">Does your sponsor have real power in the decision room?</BotMessage>,
      ];
    }

    if (step === "sponsor_willing") {
      return [
        <PandaHeader key="panda" />,
        <UserChoice key="sponsor-power-yes">Yes, they do</UserChoice>,
        <BotMessage key="sponsor-willing-question">
          Would your sponsor spend their political currency on you? Put their own reputation on the line for you?
        </BotMessage>,
      ];
    }

    if (step === "next_level") {
      return [
        <PandaHeader key="panda" />,
        <UserChoice key="sponsor-willing-yes">Yes, they would</UserChoice>,
        <BotMessage key="next-level-question">
          Does your work output in the current role show others you&apos;re ready for the next level?
        </BotMessage>,
      ];
    }

    if (step === "result" && resultCopy && door) {
      return [
        <div key="result-card" className="grid gap-4 md:grid-cols-2">
          <section className="rounded-[22px] border border-[#dce8f8] bg-white px-5 py-5 shadow-[0_14px_34px_rgba(1,75,170,0.06)] md:col-span-2 md:px-6 md:py-6">
            <p className="mb-3 font-gotham text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-[#0A57C6]">
              Where you are
            </p>
            <p className="font-gotham text-[15px] leading-7 text-[#4b5563] md:text-[16px]">{resultCopy.summary}</p>
          </section>
          <section className="rounded-[22px] border border-[#dce8f8] bg-white px-5 py-5 shadow-[0_14px_34px_rgba(1,75,170,0.06)] md:px-6 md:py-6">
            <p className="mb-3 font-gotham text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-[#0A57C6]">
              What&apos;s actually hurting
            </p>
            <p className="font-gotham text-[15px] leading-7 text-[#4b5563] md:text-[16px]">{resultCopy.pain}</p>
          </section>
          <section className="rounded-[22px] border border-[#dce8f8] bg-white px-5 py-5 shadow-[0_14px_34px_rgba(1,75,170,0.06)] md:px-6 md:py-6">
            <p className="mb-4 inline-flex rounded-full bg-[#014BAA] px-3 py-2 font-gotham text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-white">
              {resultCopy.title}
            </p>
            <h3 className="mb-3 font-quattrocento text-[22px] font-bold leading-[1.08] tracking-[-0.02em] text-[#111111]">
              Why this is happening
            </h3>
            <p className="font-gotham text-[15px] leading-7 text-[#4b5563] md:text-[16px]">{resultCopy.concept}</p>
          </section>
          <section className="rounded-[22px] border border-[#dce8f8] bg-[linear-gradient(180deg,#ffffff_0%,#edf5ff_100%)] px-5 py-5 shadow-[0_14px_34px_rgba(1,75,170,0.08)] md:px-6 md:py-6">
            <p className="mb-3 font-gotham text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-[#0A57C6]">
              What changes this
            </p>
            <p className="font-gotham text-[15px] leading-7 text-[#374151] md:text-[16px]">{resultCopy.program}</p>
          </section>
          {doorDetails[door].special ? (
            <p className="rounded-[18px] border border-[#dce8f8] bg-[#f8fbff] p-4 font-gotham text-sm font-semibold text-[#0A57C6] md:col-span-2">
              This is a better fit for a direct conversation than a quick checkout.
            </p>
          ) : null}
        </div>,
      ];
    }

    if (door && step === "door") {
      return [
        <PandaHeader key="panda" />,
        <BotMessage key="door-intro">Here&apos;s what I think is really going on.</BotMessage>,
        <div key="door-card" className="rounded-[24px] border border-[#dce8f8] bg-[linear-gradient(180deg,#ffffff_0%,#edf5ff_100%)] px-5 py-6 text-left shadow-[0_18px_40px_rgba(1,75,170,0.08)] md:px-7">
          <p className="mb-4 inline-flex rounded-full bg-[#014BAA] px-3 py-2 font-gotham text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-white">
            What&apos;s really going on
          </p>
          <h2 className="mb-3 font-quattrocento text-[30px] font-bold leading-[1.02] tracking-[-0.03em] text-[#111111] md:text-[36px]">
            {doorDetails[door].name}
          </h2>
          <p className="max-w-[58ch] font-gotham text-[15px] leading-7 text-[#4b5563] md:text-[17px]">{doorDetails[door].summary}</p>
        </div>,
      ];
    }

    return [<BotMessage key="fallback">Let&apos;s continue.</BotMessage>];
  }, [door, q1, resultCopy, selectedQ1, step]);

  const controlsReady = visibleMessageCount >= screenItems.length && !isTyping && controlsVisible;

  useEffect(() => {
    if (!isOpen) return;

    setVisibleMessageCount(0);
    setControlsVisible(false);
    setIsTyping(true);

    let nextIndex = 0;
    const timers: number[] = [];

    const revealNext = () => {
      setIsTyping(true);
      const delay = nextIndex === 0 ? 550 : 850;
      const timer = window.setTimeout(() => {
        nextIndex += 1;
        setVisibleMessageCount(nextIndex);

        if (nextIndex < screenItems.length) {
          timers.push(window.setTimeout(revealNext, 280));
        } else {
          const controlsDelay = step === "q1" ? 1130 : 0;
          const controlsTimer = window.setTimeout(() => {
            setIsTyping(false);
            setControlsVisible(true);
          }, controlsDelay);
          timers.push(controlsTimer);
        }
      }, delay);
      timers.push(timer);
    };

    revealNext();

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [isOpen, screenItems.length, step]);

  const goTo = (nextStep: BotStep) => {
    setHistory((current) => [...current, step]);
    setStep(nextStep);
  };

  const goBack = () => {
    setHistory((current) => {
      const previous = current[current.length - 1];
      if (!previous) return current;
      setStep(previous);
      setDoor(null);
      return current.slice(0, -1);
    });
  };

  const reset = () => {
    setStep("intro");
    setHistory([]);
    setQ1(null);
    setContext({ targetRole: "" });
    setSkippedContext(false);
    setDiagnosticPath(null);
    setDesireAskedEarly(null);
    setDesireBlocker("");
    setImportanceVisible(null);
    setPersonallySeen(null);
    setSponsorHasPower(null);
    setSponsorWillSpendCapital(null);
    setNextLevelEvidence(null);
    setDoor(null);
    setSessionId(null);
    setSessionStartedAt(null);
    setSessionActivated(false);
    setActionState("idle");
    setActionMessage("");
    trackBotEvent("sto_chat_restarted");
  };

  const revealDoor = (nextDoor: DiagnosticDoorId) => {
    setDoor(nextDoor);
    trackBotEvent("sto_result_revealed", {
      door: nextDoor,
      q1,
      diagnostic_path: diagnosticPath,
    });
    goTo("door");
  };

  const openBot = () => {
    if (isEmbedded) return;
    setIsOpen(true);
    trackBotEvent("sto_chat_opened");
  };

  const closeBot = () => {
    if (isEmbedded) return;
    setIsOpen(false);
    trackBotEvent("sto_chat_closed", {
      step,
      door,
    });
  };

  const whatsappHref = useMemo(() => {
    const doorName = door ? doorDetails[door].name : "my result";
    const message = encodeURIComponent(
      `Hi, I completed the Sto career diagnostic and got "${doorName}". I have a few questions before joining corporatelife.`,
    );
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  }, [door]);

  const createPaymentLink = async () => {
    const trimmedPhone = paymentPhone.trim();
    const fullPhone = trimmedPhone.startsWith("+") ? trimmedPhone : `${paymentCountryCode}${trimmedPhone}`;

    const response = await fetch(`${env.apiUrl}/payments/razorpay/link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: paymentName || undefined,
        email: paymentEmail || undefined,
        phone: fullPhone,
        reference_id: waitlistReferenceId || `waitlist_${Date.now()}`,
        amount: 197000,
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error((data as { error?: string })?.error || "Unable to start payment.");
    }

    const shortUrl = (data as { short_url?: string; shortUrl?: string })?.short_url || (data as { short_url?: string; shortUrl?: string })?.shortUrl;
    if (!shortUrl) {
      throw new Error("Payment link was not returned.");
    }

    return shortUrl;
  };

  const handlePaymentRedirect = async () => {
    if (!waitlistReferenceId) {
      throw new Error("Waitlist record not found. Please restart from the waitlist form.");
    }

    if (!paymentPhone.trim()) {
      throw new Error("Phone number is missing. Please restart from the waitlist form.");
    }

    posthog.capture("waitlist_submit_attempt", {
      source,
    });
    pushToDataLayer({
      event: "waitlist_submit_attempt",
      source,
    });

    posthog.capture("waitlist_submitted", {
      source,
      payment_started: true,
    });
    pushToDataLayer({
      event: "waitlist_submitted",
      source,
      payment_started: true,
    });

    const shortUrl = await createPaymentLink();

    posthog.capture("payment_redirected", {
      source,
      amount: 197000,
    });
    pushToDataLayer({
      event: "payment_redirected",
      source,
      amount: 197000,
    });

    window.location.href = shortUrl;
  };

  const handlePrimaryCta = async () => {
    if (!door || !activeDoorCtas) return;

    if (activeDoorCtas.primary.kind === "call") {
      trackBotEvent("sto_call_clicked", {
        door,
        q1,
        placement: isEmbedded ? "diagnostic_route" : "floating_bot",
      });
      window.open(whatsappHref, "_blank", "noopener,noreferrer");
      return;
    }

    setActionState("loading");
    setActionMessage("");

    try {
      trackBotEvent("sto_buy_clicked", { door, q1, placement: isEmbedded ? "diagnostic_route" : "floating_bot" });
      await handlePaymentRedirect();
    } catch (error) {
      setActionState("error");
      setActionMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  useEffect(() => {
    if (!isEmbedded) return;
    trackBotEvent("sto_chat_opened", {
      placement: "diagnostic_route",
      modal_source: source,
      waitlist_id: waitlistId,
      waitlist_reference_id: waitlistReferenceId,
    });
  }, [isEmbedded, source, waitlistId, waitlistReferenceId]);

  useEffect(() => {
    const shouldDebounce = step === "context";

    if (!shouldDebounce) {
      setDebouncedAnswersPayload(answersPayload);
      setDebouncedResultPayload(resultPayload);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setDebouncedAnswersPayload(answersPayload);
      setDebouncedResultPayload(resultPayload);
    }, 600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [answersPayload, resultPayload, step]);

  useEffect(() => {
    if (!isEmbedded || !waitlistId || !sessionActivated || sessionId || !sessionStartedAt) return;

    let isCancelled = false;

    const createSession = async () => {
      try {
        const response = await fetch(`${env.apiUrl}/waitlist-bot-sessions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            waitlist_id: waitlistId,
            flow_version: "v1",
            status: "in_progress",
            current_step: step,
            answers_json: answersForPersistence,
            result_json: resultForPersistence,
            started_at: sessionStartedAt,
            completed_at: null,
          }),
        });

        const data = (await response.json().catch(() => ({}))) as Partial<BotSessionResponse> & {
          error?: string;
        };

        if (!response.ok || !data?.id) {
          throw new Error(data?.error || "Unable to create bot session.");
        }

        if (!isCancelled) {
          setSessionId(data.id);
        }
      } catch (error) {
        console.error("Failed to create waitlist bot session", error);
      }
    };

    void createSession();

    return () => {
      isCancelled = true;
    };
  }, [
    answersForPersistence,
    isEmbedded,
    sessionActivated,
    sessionId,
    sessionStartedAt,
    step,
    waitlistId,
    resultForPersistence,
  ]);

  useEffect(() => {
    if (!sessionId || !sessionActivated) return;

    let isCancelled = false;

    const updateSession = async () => {
      try {
        const response = await fetch(`${env.apiUrl}/waitlist-bot-sessions/${sessionId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            status: sessionStatus,
            current_step: step,
            answers_json: answersForPersistence,
            result_json: resultForPersistence,
            completed_at: sessionStatus === "completed" ? new Date().toISOString() : null,
          }),
        });

        if (!response.ok && !isCancelled) {
          const data = (await response.json().catch(() => ({}))) as { error?: string };
          throw new Error(data?.error || "Unable to update bot session.");
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Failed to update waitlist bot session", error);
        }
      }
    };

    void updateSession();

    return () => {
      isCancelled = true;
    };
  }, [answersForPersistence, resultForPersistence, sessionActivated, sessionId, sessionStatus, step]);

  const renderControls = () => {
    if (step === "intro") {
      return (
        <button
          type="button"
          className="w-full cursor-pointer rounded-[18px] border border-[#014BAA] bg-[#014BAA] px-5 py-4 font-gotham text-[15px] font-bold text-white transition hover:bg-[#0A57C6] md:py-5"
          onClick={() => {
            if (!sessionActivated) {
              setSessionActivated(true);
              setSessionStartedAt(new Date().toISOString());
            }
            goTo("q1");
          }}
        >
          Let&apos;s begin
        </button>
      );
    }

    if (step === "q1") {
      return (
        <div className="space-y-3">
          {q1Options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`${optionClass} ${q1 === option.id ? selectedOptionClass : ""}`}
              onClick={() => {
                setQ1(option.id);
                trackBotEvent("sto_q1_selected", { q1: option.id });
              }}
            >
              {option.label}
            </button>
          ))}
          <button
            type="button"
            disabled={!q1}
            className="mt-5 w-full cursor-pointer rounded-[18px] border border-[#014BAA] bg-[#014BAA] px-5 py-4 font-gotham text-[15px] font-bold text-white transition hover:bg-[#0A57C6] disabled:cursor-not-allowed disabled:border-[#c6d4ea] disabled:bg-[#d1d5db] disabled:opacity-100 md:py-5"
            onClick={() => goTo("empathy")}
          >
            Continue
          </button>
        </div>
      );
    }

    if (step === "empathy") {
      return (
        <button
          type="button"
          className="w-full cursor-pointer rounded-[18px] border border-[#014BAA] bg-[#014BAA] px-5 py-4 font-gotham text-[15px] font-bold text-white transition hover:bg-[#0A57C6] md:py-5"
          onClick={() => goTo("context")}
        >
          Tell you more
        </button>
      );
    }

    if (step === "context") {
      const canProceed = context.targetRole.trim();

      return (
        <div className="space-y-5">
          <label className="block font-gotham text-[11px] font-bold uppercase leading-[1.4] tracking-[0.18em] text-[#0A57C6]">
            Role or career milestone
            <textarea
              value={context.targetRole}
              onChange={(event) => setContext((current) => ({ ...current, targetRole: event.target.value }))}
              placeholder="E.g. Senior Manager. Or just want to feel more appreciated at work."
              className="mt-3 min-h-[138px] w-full resize-y rounded-[20px] border border-[#d8e4f6] bg-white px-5 py-4 font-gotham text-[15px] normal-case leading-7 tracking-[0] text-[#111111] outline-none shadow-[0_10px_26px_rgba(1,75,170,0.05)] transition placeholder:text-[#9aa4b2] focus:border-[#0A57C6]"
            />
          </label>
          <button
            type="button"
            disabled={!canProceed}
            className="w-full cursor-pointer rounded-[18px] border border-[#014BAA] bg-[#014BAA] px-5 py-4 font-gotham text-[15px] font-bold text-white transition hover:bg-[#0A57C6] disabled:cursor-not-allowed disabled:border-[#c6d4ea] disabled:bg-[#d1d5db] disabled:opacity-100 md:py-5"
            onClick={() => {
              setSkippedContext(false);
              trackBotEvent("sto_screen2_completed", { q1 });
              goTo("diagnostic");
            }}
          >
            I&apos;m ready to explore further
          </button>
          <button
            type="button"
            className="w-full cursor-pointer rounded-[18px] border border-[#d8e4f6] bg-white px-5 py-4 font-gotham text-[15px] font-bold text-[#0A57C6] transition hover:border-[#0A57C6] hover:bg-[#f8fbff] md:py-5"
            onClick={() => {
              setSkippedContext(true);
              trackBotEvent("sto_screen2_skipped", { q1 });
              goTo("diagnostic");
            }}
          >
            Let&apos;s skip this for now
          </button>
        </div>
      );
    }

    if (step === "diagnostic") {
      return (
        <div className="space-y-3">
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setDiagnosticPath("not_considered");
              trackBotEvent("sto_diagnostic_answered", { answer: "not_considered", q1 });
              goTo("not_considered_formula");
            }}
          >
            I was not even considered for the promotion or opportunity
          </button>
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setDiagnosticPath("considered");
              trackBotEvent("sto_diagnostic_answered", { answer: "considered", q1 });
              goTo("considered_formula");
            }}
          >
            I was considered but someone else got chosen
          </button>
        </div>
      );
    }

    if (step === "not_considered_formula") {
      return (
        <button type="button" className="w-full cursor-pointer rounded-[18px] border border-[#014BAA] bg-[#014BAA] px-5 py-4 font-gotham text-[15px] font-bold text-white transition hover:bg-[#0A57C6] md:py-5" onClick={() => goTo("desire")}>
          Let&apos;s look at visibility
        </button>
      );
    }

    if (step === "desire") {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setDesireAskedEarly(true);
              goTo("importance");
            }}
          >
            Yes, I did
          </button>
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setDesireAskedEarly(false);
              goTo("desire_blocker");
            }}
          >
            No, I didn&apos;t
          </button>
        </div>
      );
    }

    if (step === "desire_blocker") {
      return (
        <button
          type="button"
          className="w-full cursor-pointer rounded-[18px] border border-[#014BAA] bg-[#014BAA] px-5 py-4 font-gotham text-[15px] font-bold text-white transition hover:bg-[#0A57C6] md:py-5"
          onClick={() => {
            setDesireBlocker("I didn't ask early enough.");
            revealDoor("imposter_syndrome");
          }}
        >
          Tell me more
        </button>
      );
    }

    if (step === "importance") {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setImportanceVisible(true);
              goTo("personal_seen");
            }}
          >
            Yes, it&apos;s clearly important to them
          </button>
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setImportanceVisible(false);
              revealDoor("story_of_work");
            }}
          >
            No, it is not visible enough to leadership
          </button>
        </div>
      );
    }

    if (step === "personal_seen") {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setPersonallySeen(true);
              revealDoor("values_misalignment");
            }}
          >
            Yes, they do
          </button>
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setPersonallySeen(false);
              revealDoor("story_of_contribution");
            }}
          >
            No, they don&apos;t
          </button>
        </div>
      );
    }

    if (step === "considered_formula") {
      return (
        <button type="button" className="w-full cursor-pointer rounded-[18px] border border-[#014BAA] bg-[#014BAA] px-5 py-4 font-gotham text-[15px] font-bold text-white transition hover:bg-[#0A57C6] md:py-5" onClick={() => goTo("sponsor_power")}>
          Next
        </button>
      );
    }

    if (step === "sponsor_power") {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setSponsorHasPower(true);
              goTo("sponsor_willing");
            }}
          >
            Yes, they do
          </button>
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setSponsorHasPower(false);
              revealDoor("sponsor_network");
            }}
          >
            No, they don&apos;t
          </button>
        </div>
      );
    }

    if (step === "sponsor_willing") {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setSponsorWillSpendCapital(true);
              goTo("next_level");
            }}
          >
            Yes, they would
          </button>
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setSponsorWillSpendCapital(false);
              revealDoor("communication_framework");
            }}
          >
            No, I don&apos;t think so
          </button>
        </div>
      );
    }

    if (step === "next_level") {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setNextLevelEvidence(true);
              revealDoor("complex_situation");
            }}
          >
            Yes, it does
          </button>
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setNextLevelEvidence(false);
              revealDoor("brilliance_image_trap");
            }}
          >
            No, it doesn&apos;t
          </button>
        </div>
      );
    }

    if (step === "door") {
      return (
        <button
          type="button"
          className="w-full cursor-pointer rounded-[18px] border border-[#014BAA] bg-[#014BAA] px-5 py-4 font-gotham text-[15px] font-bold text-white transition hover:bg-[#0A57C6] md:py-5"
          onClick={() => goTo("result")}
        >
          Show my full picture
        </button>
      );
    }

    return null;
  };

  const renderConversation = () => (
    <div className="space-y-3">
      {screenItems.slice(0, visibleMessageCount).map((item) => item)}
      {isTyping ? <TypingIndicator /> : null}
    </div>
  );

  const shellClassName = isEmbedded
    ? "flex min-h-[72svh] w-full flex-col overflow-hidden rounded-[28px] border border-[#d6e5fb] bg-white font-gotham shadow-[0_28px_80px_rgba(1,75,170,0.12)] sm:min-h-[760px] md:min-h-[860px] md:rounded-[36px]"
    : "pointer-events-auto fixed inset-x-0 bottom-0 flex h-[100svh] flex-col border border-[#e8e4de] bg-white shadow-[0_-18px_40px_rgba(15,15,15,0.18)] md:inset-auto md:bottom-24 md:right-7 md:h-[720px] md:w-[440px] md:rounded-[9px] md:shadow-[0_18px_50px_rgba(15,15,15,0.18)]";

  const botShell = (
    <section
      role="dialog"
      aria-modal={isEmbedded ? undefined : true}
      aria-label="Sto career diagnostic"
      data-sto-bot
      data-waitlist-id={waitlistId}
      data-waitlist-reference-id={waitlistReferenceId}
      className={shellClassName}
    >
      <header className="border-b border-[#dce8f8] bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)] backdrop-blur">
        <div className="flex h-[72px] items-center justify-between px-5 md:h-[88px] md:px-8">
          <div className="min-w-0 truncate font-quattrocento text-[26px] font-bold leading-none tracking-[-0.03em] text-[#111111]">
            Better <span className="text-[#014BAA]">Corporate Life</span>
          </div>
          <div className="ml-4 flex items-center gap-3">
            <div className="whitespace-nowrap font-gotham text-[11px] font-bold uppercase leading-none tracking-[0.18em] text-[#90a4c3]">
              {stepMeta[step].label}
            </div>
            {!isEmbedded ? (
              <button
                type="button"
                onClick={closeBot}
                className="cursor-pointer rounded-[9px] px-2 py-1 text-xs font-semibold text-[#6b6760] hover:bg-[#f8f7f5]"
                aria-label="Close Sto chat"
              >
                Close
              </button>
            ) : null}
          </div>
        </div>
        <div className="h-1 w-full overflow-hidden bg-[#edf4ff]">
          <div
            className="h-full bg-[#014BAA] transition-[width] duration-300"
            style={{ width: `${stepMeta[step].progress}%` }}
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] px-5 py-6 md:px-8 md:py-8">
        {renderConversation()}
      </div>

      <footer className="bg-gradient-to-t from-white from-[62%] to-white/0 px-5 pb-[calc(16px+env(safe-area-inset-bottom))] pt-6 md:px-8">
        {controlsReady && step === "result" && resultCopy && door ? (
          <div className="space-y-3">
            <div className={`grid gap-2 ${activeDoorCtas?.secondary ? (isEmbedded ? "" : "md:grid-cols-2") : ""}`}>
              <button
                type="button"
                onClick={handlePrimaryCta}
                disabled={actionState === "loading"}
                className="cursor-pointer rounded-[18px] border border-[#014BAA] bg-[#014BAA] px-5 py-4 font-gotham text-[15px] font-bold text-white transition hover:bg-[#0A57C6] disabled:cursor-not-allowed disabled:border-[#c6d4ea] disabled:bg-[#d1d5db] disabled:opacity-100 md:py-5"
              >
                {actionState === "loading" ? "Processing..." : activeDoorCtas?.primary.label}
              </button>
              {activeDoorCtas?.secondary ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackBotEvent("sto_call_clicked", {
                      door,
                      q1,
                      placement: isEmbedded ? "diagnostic_route" : "floating_bot",
                    })
                  }
                  className="cursor-pointer rounded-[18px] border border-[#d8e4f6] bg-white px-5 py-4 text-center font-gotham text-[15px] font-bold text-[#014BAA] transition hover:border-[#0A57C6] hover:bg-[#f8fbff] md:py-5"
                >
                  {activeDoorCtas.secondary.label}
                </a>
              ) : null}
            </div>
            {actionMessage ? (
              <p className="rounded-[18px] border border-[#f1d7d7] bg-[#fff4f4] px-4 py-3 font-gotham text-sm font-medium text-[#9f2d2d]">
                {actionMessage}
              </p>
            ) : null}
          </div>
        ) : controlsReady ? (
          renderControls()
        ) : (
          <div className="min-h-[44px]" />
        )}

        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={!history.length}
            className="cursor-pointer rounded-[12px] px-3 py-2 font-gotham text-xs font-bold text-[#7b8aa3] hover:bg-[#f3f8ff] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="button"
            onClick={reset}
            className="cursor-pointer rounded-[12px] px-3 py-2 font-gotham text-xs font-bold text-[#7b8aa3] hover:bg-[#f3f8ff]"
          >
            Restart
          </button>
        </div>
      </footer>
    </section>
  );

  if (isEmbedded) {
    return botShell;
  }

  return (
    <>
      <button
        type="button"
        onClick={openBot}
        className="fixed bottom-[104px] right-4 z-[9998] flex h-[74px] min-w-[170px] cursor-pointer items-center gap-2 rounded-[9px] border border-[#e8e4de] bg-white px-3 shadow-[0_12px_30px_rgba(15,15,15,0.18)] transition hover:-translate-y-0.5 md:bottom-[104px] md:right-7"
        aria-label="Chat with Sto"
      >
        <Image src={stoAvatar} alt="" width={58} height={58} className="h-[58px] w-[58px] rounded-[8px] object-cover" />
        <span className="text-left font-gotham text-sm font-bold leading-4 text-[#0f0f0f]">
          Talk to Sto
          <span className="block text-xs font-semibold text-[#6b6760]">Career diagnostic</span>
        </span>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[10000] md:pointer-events-none">
          <div className="absolute inset-0 bg-black/35 md:hidden" onClick={closeBot} />
          {botShell}
        </div>
      ) : null}
    </>
  );
}
