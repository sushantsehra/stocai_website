"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
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
  "w-full rounded-[9px] border border-[#d0cbc3] bg-white px-3.5 py-3.5 text-left text-[15px] font-medium leading-6 text-[#0f0f0f] opacity-100 transition hover:border-[#0f0f0f] hover:bg-[#f8f7f5] disabled:cursor-not-allowed disabled:opacity-60";

const BotMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-[14px] rounded-bl-[4px] border border-[#e8e4de] bg-[#f8f7f5] px-[15px] py-[14px] text-[15px] leading-[1.58] text-[#0f0f0f]">
    {children}
  </div>
);

const UserChoice = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-[9px] border border-[#0f0f0f] bg-[#0f0f0f] px-3.5 py-3 text-[15px] font-medium leading-6 text-white">
    {children}
  </div>
);

const FormulaCard = ({ title, formula, note }: { title: string; formula: string; note: string }) => (
  <div className="rounded-[9px] border border-[#e8e4de] bg-[#f8f7f5] px-4 py-[18px] text-center">
    <p className="mx-auto mb-[14px] inline-flex rounded-full border border-[#e8e4de] bg-white px-[9px] py-[7px] text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-[#6b6760]">
      {title}
    </p>
    <p className="font-serif text-[22px] font-bold leading-[1.28] text-[#0f0f0f]">
      {formula}
    </p>
    <p className="mt-[10px] text-base leading-[1.55] text-[#6b6760]">{note}</p>
  </div>
);

const PandaHeader = () => (
  <div className="mb-2 flex items-center gap-3">
    <div className="h-[38px] w-[38px] overflow-hidden rounded-[9px] bg-[#f0ede8]">
      <Image src={stoAvatar} alt="BCL Panda" width={38} height={38} className="h-full w-full object-cover" />
    </div>
    <div>
      <p className="text-sm font-semibold text-[#0f0f0f]">BCL Panda</p>
      <p className="text-xs text-[#a09c96]">Your guide</p>
    </div>
  </div>
);

const TypingIndicator = () => (
  <div className="flex h-11 w-fit items-center gap-1 rounded-[14px] rounded-bl-[4px] border border-[#e8e4de] bg-[#f8f7f5] px-4">
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#6b6760]" />
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#6b6760] [animation-delay:120ms]" />
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#6b6760] [animation-delay:240ms]" />
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

export default function StoCareerBot({
  variant = "floating",
  waitlistId,
  waitlistReferenceId,
  source = "bot",
}: StoCareerBotProps) {
  const isEmbedded = variant === "embedded";
  const [isOpen, setIsOpen] = useState(isEmbedded);
  const [step, setStep] = useState<BotStep>("intro");
  const [visibleMessageCount, setVisibleMessageCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState<BotStep[]>([]);
  const [q1, setQ1] = useState<Q1OptionId | null>(null);
  const [context, setContext] = useState<ContextAnswers>({
    notExpected: "",
    knownFor: "",
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
        notExpected: context.notExpected,
        knownFor: context.knownFor,
        targetRole: context.targetRole,
        skipped: skippedContext,
        skippedLabel: skippedContext ? "Skip - I'd rather not share this" : null,
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
          yes: "Yes, I asked early",
          no: "No, I didn't",
        }),
        importanceVisible,
        importanceVisibleLabel: booleanAnswerLabel(importanceVisible, {
          yes: "Yes, leadership cares about this work",
          no: "No, it is not visible enough to leadership",
        }),
        personallySeen,
        personallySeenLabel: booleanAnswerLabel(personallySeen, {
          yes: "Yes, people know it's me",
          no: "No, the work is seen but I am not",
        }),
        sponsorHasPower,
        sponsorHasPowerLabel: booleanAnswerLabel(sponsorHasPower, {
          yes: "Yes, they are in the decision room",
          no: "No, they do not have enough power",
        }),
        sponsorWillSpendCapital,
        sponsorWillSpendCapitalLabel: booleanAnswerLabel(sponsorWillSpendCapital, {
          yes: "Yes, they would put reputation on the line",
          no: "No, they would not go that far",
        }),
        nextLevelEvidence,
        nextLevelEvidenceLabel: booleanAnswerLabel(nextLevelEvidence, {
          yes: "Yes, I have next-level evidence",
          no: "No, most evidence is from my current role",
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

  const screenItems = useMemo<React.ReactNode[]>(() => {
    if (step === "q1") {
      return [
        <PandaHeader key="panda" />,
        <BotMessage key="privacy">Before we start - nothing you say here goes anywhere. Just be honest with me.</BotMessage>,
        <BotMessage key="q1">So tell me - what&apos;s actually bothering you at work right now?</BotMessage>,
      ];
    }

    if (step === "intro") {
      return [
        <div key="intro" className="flex min-h-[440px] flex-col justify-center gap-4 pb-2">
          <Image src={stoAvatar} alt="BCL Panda" width={68} height={68} className="h-[68px] w-[68px] rounded-[9px] object-cover" />
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#6b6760]">Better Corporate Life</p>
          <h3 className="max-w-[11ch] font-serif text-[28px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#0f0f0f]">
            The Corporate <em className="font-bold">Life</em> Conversation
          </h3>
          <div className="h-0.5 w-9 rounded-full bg-[#d0cbc3]" />
          <p className="max-w-[320px] text-[15px] leading-[1.58] text-[#6b6760]">
            Before we show you anything - let&apos;s understand where you actually are right now.
          </p>
        </div>,
      ];
    }

    if (step === "empathy" && selectedQ1 && q1) {
      return [
        <PandaHeader key="panda" />,
        <UserChoice key="q1-choice">{selectedQ1.label}</UserChoice>,
        <BotMessage key="q1-empathy">{getQ1Empathy(q1)}</BotMessage>,
        <BotMessage key="context-bridge">
          I want to show you something specific to your situation. Help me understand a little more first.
        </BotMessage>,
      ];
    }

    if (step === "context") {
      return [
        <PandaHeader key="panda" />,
        <BotMessage key="context-intro">No right or wrong answers. Just what&apos;s true for you right now.</BotMessage>,
      ];
    }

    if (step === "diagnostic") {
      return [
        <PandaHeader key="panda" />,
        <BotMessage key="diagnostic-ready">
          Got it. Now let&apos;s find what is actually happening underneath the frustration.
        </BotMessage>,
        <BotMessage key="diagnostic-question">What is currently happening at work?</BotMessage>,
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
          note="If either one is zero, the result is zero. Your performance is clearly not the issue, so let's look at visibility."
        />,
      ];
    }

    if (step === "desire") {
      return [
        <PandaHeader key="panda" />,
        <BotMessage key="visibility-formula">
          Visibility has two parts: whether the right people knew you wanted this, and whether your work is seen as
          important.
        </BotMessage>,
        <FormulaCard
          key="visibility-card"
          title="Visibility"
          formula="Desire x Importance"
          note="Most people wait for the right moment to ask. By then, someone else may already have asked."
        />,
        <BotMessage key="desire-question">
          Did you ask for the promotion early - early enough that it was clear almost from the start?
        </BotMessage>,
      ];
    }

    if (step === "desire_blocker") {
      return [
        <PandaHeader key="panda" />,
        <UserChoice key="desire-no">No, I didn&apos;t</UserChoice>,
        <BotMessage key="desire-blocker">What stopped you from asking early?</BotMessage>,
      ];
    }

    if (step === "importance") {
      return [
        <PandaHeader key="panda" />,
        <UserChoice key="desire-yes">Yes, I asked early</UserChoice>,
        <BotMessage key="importance-context">
          You can do great work and still be invisible if leadership does not connect the work to what they care about.
        </BotMessage>,
        <BotMessage key="importance-question">
          Is your project or work important to leadership - do they care about what you work on?
        </BotMessage>,
      ];
    }

    if (step === "personal_seen") {
      return [
        <PandaHeader key="panda" />,
        <UserChoice key="importance-yes">Yes, leadership cares about this work</UserChoice>,
        <BotMessage key="personal-seen-context">
          Good. Now the question is whether the work is connected to you personally.
        </BotMessage>,
        <BotMessage key="personal-seen-question">
          Are your contributions personally seen - do people know it&apos;s specifically you doing this work?
        </BotMessage>,
      ];
    }

    if (step === "considered_formula") {
      return [
        <PandaHeader key="panda" />,
        <UserChoice key="considered">I was considered but someone else got chosen</UserChoice>,
        <BotMessage key="considered-intro">
          You were in the picture. That means your performance and visibility were good enough. Something else happened
          at the decision moment.
        </BotMessage>,
        <FormulaCard
          key="considered-formula"
          title="To be picked"
          formula="Sponsor Strength x Next Level Signal"
          note="Sponsor Strength is who goes to bat for you. Next Level Signal is whether people already see you operating one level up."
        />,
      ];
    }

    if (step === "sponsor_power") {
      return [
        <PandaHeader key="panda" />,
        <BotMessage key="sponsor-power-context">
          First, let&apos;s check whether the person backing you had real power.
        </BotMessage>,
        <BotMessage key="sponsor-power-question">Does your sponsor have real power in the decision room?</BotMessage>,
      ];
    }

    if (step === "sponsor_willing") {
      return [
        <PandaHeader key="panda" />,
        <UserChoice key="sponsor-power-yes">Yes, they are in the decision room</UserChoice>,
        <BotMessage key="sponsor-willing-question">
          Would your sponsor spend political currency on you - put their own reputation on the line?
        </BotMessage>,
      ];
    }

    if (step === "next_level") {
      return [
        <PandaHeader key="panda" />,
        <UserChoice key="sponsor-willing-yes">Yes, they would put reputation on the line</UserChoice>,
        <BotMessage key="next-level-question">
          Does your work show evidence that your output impacts next-level KPIs, not just your current role?
        </BotMessage>,
      ];
    }

    if (step === "result" && resultCopy && door) {
      return [
        <div key="result-card" className="space-y-0">
          <section className="border-b border-[#e8e4de] pb-6">
            <p className="mb-3 text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-[#6b6760]">
              Where you are
            </p>
            <p className="text-[15px] leading-[1.58] text-[#6b6760]">{resultCopy.summary}</p>
          </section>
          <section className="border-b border-[#e8e4de] py-6">
            <p className="mb-3 text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-[#6b6760]">
              What&apos;s actually hurting
            </p>
            <p className="text-[15px] leading-[1.58] text-[#6b6760]">{resultCopy.pain}</p>
          </section>
          <section className="border-b border-[#e8e4de] py-6">
            <p className="mb-[14px] inline-flex rounded-full bg-[#0f0f0f] px-[9px] py-[7px] text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-white">
              {resultCopy.title}
            </p>
            <h3 className="mb-2.5 font-serif text-[21px] font-bold leading-[1.2] text-[#0f0f0f]">
              Why this is happening
            </h3>
            <p className="text-[15px] leading-[1.58] text-[#6b6760]">{resultCopy.concept}</p>
          </section>
          <section className="py-6">
            <p className="mb-3 text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-[#6b6760]">
              What changes this
            </p>
            <p className="text-[15px] leading-[1.58] text-[#6b6760]">{resultCopy.program}</p>
          </section>
          {doorDetails[door].special ? (
            <p className="rounded-[9px] bg-[#eef7f2] p-3 text-sm font-semibold text-[#1a6b3c]">
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
        <div key="door-card" className="rounded-[9px] border border-[#e8e4de] bg-[#f8f7f5] px-4 py-[18px] text-left">
          <p className="mb-[14px] inline-flex rounded-full bg-[#eef7f2] px-[9px] py-[7px] text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-[#1a6b3c]">
            What&apos;s really going on
          </p>
          <h2 className="mb-2.5 font-serif text-[28px] font-bold leading-[1.12] text-[#0f0f0f]">
            {doorDetails[door].name}
          </h2>
          <p className="text-[15px] leading-[1.58] text-[#6b6760]">{doorDetails[door].summary}</p>
        </div>,
      ];
    }

    return [<BotMessage key="fallback">Let&apos;s continue.</BotMessage>];
  }, [door, q1, resultCopy, selectedQ1, step]);

  const controlsReady = visibleMessageCount >= screenItems.length && !isTyping;

  useEffect(() => {
    if (!isOpen) return;

    setVisibleMessageCount(0);
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
          setIsTyping(false);
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
    setContext({ notExpected: "", knownFor: "", targetRole: "" });
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

  useEffect(() => {
    if (!isEmbedded) return;
    trackBotEvent("sto_chat_opened", {
      placement: "waitlist_modal",
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
          className="w-full rounded-[9px] border border-[#0f0f0f] bg-[#0f0f0f] px-4 py-[15px] text-[15px] font-semibold text-white transition hover:opacity-90"
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
        <div className="space-y-2.5">
          {q1Options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`${optionClass} ${q1 === option.id ? "border-[#0f0f0f] bg-[#0f0f0f] text-white" : ""}`}
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
            className="mt-4 w-full rounded-[9px] border border-[#0f0f0f] bg-[#0f0f0f] px-4 py-[15px] text-[15px] font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
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
          className="w-full rounded-[9px] border border-[#0f0f0f] bg-[#0f0f0f] px-4 py-[15px] text-[15px] font-semibold text-white transition hover:opacity-90"
          onClick={() => goTo("context")}
        >
          Tell you more
        </button>
      );
    }

    if (step === "context") {
      const canProceed =
        context.notExpected.trim() && context.knownFor.trim() && context.targetRole.trim();

      return (
        <div className="space-y-[18px]">
          <label className="block text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.12em] text-[#6b6760]">
            What&apos;s not going the way you expected
            <textarea
              value={context.notExpected}
              onChange={(event) => setContext((current) => ({ ...current, notExpected: event.target.value }))}
              placeholder="e.g. Been in the same role 3 years, keep delivering, but nothing moves forward"
              className="mt-2 min-h-[110px] w-full resize-y rounded-[9px] border border-[#d0cbc3] bg-white px-3.5 py-3.5 text-[15px] normal-case leading-[1.55] tracking-[0] text-[#0f0f0f] outline-none transition focus:border-[#0f0f0f]"
            />
          </label>
          <label className="block text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.12em] text-[#6b6760]">
            What you are known for at work
            <textarea
              value={context.knownFor}
              onChange={(event) => setContext((current) => ({ ...current, knownFor: event.target.value }))}
              placeholder="e.g. The person who gets things done. Reliable. Never misses a deadline"
              className="mt-2 min-h-[110px] w-full resize-y rounded-[9px] border border-[#d0cbc3] bg-white px-3.5 py-3.5 text-[15px] normal-case leading-[1.55] tracking-[0] text-[#0f0f0f] outline-none transition focus:border-[#0f0f0f]"
            />
          </label>
          <label className="block text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.12em] text-[#6b6760]">
            The role or position you are working towards
            <textarea
              value={context.targetRole}
              onChange={(event) => setContext((current) => ({ ...current, targetRole: event.target.value }))}
              placeholder="e.g. Senior Manager - or just want to feel like my work actually matters"
              className="mt-2 min-h-[110px] w-full resize-y rounded-[9px] border border-[#d0cbc3] bg-white px-3.5 py-3.5 text-[15px] normal-case leading-[1.55] tracking-[0] text-[#0f0f0f] outline-none transition focus:border-[#0f0f0f]"
            />
          </label>
          <button
            type="button"
            disabled={!canProceed}
            className="w-full rounded-[9px] border border-[#0f0f0f] bg-[#0f0f0f] px-4 py-[15px] text-[15px] font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => {
              setSkippedContext(false);
              trackBotEvent("sto_screen2_completed", { q1 });
              goTo("diagnostic");
            }}
          >
            I&apos;m ready
          </button>
          <button
            type="button"
            className="w-full rounded-[9px] border border-[#d0cbc3] bg-white px-4 py-[15px] text-[15px] font-semibold text-[#6b6760] transition hover:border-[#0f0f0f]"
            onClick={() => {
              setSkippedContext(true);
              trackBotEvent("sto_screen2_skipped", { q1 });
              goTo("diagnostic");
            }}
          >
            Skip - I&apos;d rather not share this
          </button>
        </div>
      );
    }

    if (step === "diagnostic") {
      return (
        <div className="space-y-2">
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
        <button type="button" className={optionClass} onClick={() => goTo("desire")}>
          Let&apos;s look at visibility
        </button>
      );
    }

    if (step === "desire") {
      return (
        <div className="space-y-2">
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setDesireAskedEarly(true);
              goTo("importance");
            }}
          >
            Yes, I asked early
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
        <div className="space-y-2">
          {[
            "I didn't feel ready yet",
            "I was waiting for a big win first",
            "I was worried about how it would look",
            "I just assumed it would happen naturally",
          ].map((answer) => (
            <button
              key={answer}
              type="button"
              className={optionClass}
              onClick={() => {
                setDesireBlocker(answer);
                revealDoor("imposter_syndrome");
              }}
            >
              {answer}
            </button>
          ))}
        </div>
      );
    }

    if (step === "importance") {
      return (
        <div className="space-y-2">
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setImportanceVisible(true);
              goTo("personal_seen");
            }}
          >
            Yes, leadership cares about this work
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
        <div className="space-y-2">
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setPersonallySeen(true);
              revealDoor("values_misalignment");
            }}
          >
            Yes, people know it&apos;s me
          </button>
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setPersonallySeen(false);
              revealDoor("story_of_contribution");
            }}
          >
            No, the work is seen but I am not
          </button>
        </div>
      );
    }

    if (step === "considered_formula") {
      return (
        <button type="button" className={optionClass} onClick={() => goTo("sponsor_power")}>
          Check my sponsor strength
        </button>
      );
    }

    if (step === "sponsor_power") {
      return (
        <div className="space-y-2">
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setSponsorHasPower(true);
              goTo("sponsor_willing");
            }}
          >
            Yes, they are in the decision room
          </button>
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setSponsorHasPower(false);
              revealDoor("sponsor_network");
            }}
          >
            No, they do not have enough power
          </button>
        </div>
      );
    }

    if (step === "sponsor_willing") {
      return (
        <div className="space-y-2">
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setSponsorWillSpendCapital(true);
              goTo("next_level");
            }}
          >
            Yes, they would put reputation on the line
          </button>
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setSponsorWillSpendCapital(false);
              revealDoor("communication_framework");
            }}
          >
            No, they would not go that far
          </button>
        </div>
      );
    }

    if (step === "next_level") {
      return (
        <div className="space-y-2">
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setNextLevelEvidence(true);
              revealDoor("complex_situation");
            }}
          >
            Yes, I have next-level evidence
          </button>
          <button
            type="button"
            className={optionClass}
            onClick={() => {
              setNextLevelEvidence(false);
              revealDoor("brilliance_image_trap");
            }}
          >
            No, most evidence is from my current role
          </button>
        </div>
      );
    }

    if (step === "door") {
      return (
        <button
          type="button"
          className="w-full rounded-[9px] border border-[#0f0f0f] bg-[#0f0f0f] px-4 py-[15px] text-[15px] font-semibold text-white transition hover:opacity-90"
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
    ? "flex h-[640px] flex-col rounded-[18px] border border-[#e8e4de] bg-white shadow-[0_18px_50px_rgba(15,15,15,0.12)]"
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
      <header className="border-b border-[#e8e4de]/75 bg-white/95 backdrop-blur">
        <div className="flex h-[58px] items-center justify-between px-[18px]">
          <div className="min-w-0 truncate font-serif text-xl leading-none tracking-[-0.01em] text-[#6b6760]">
            <strong className="font-extrabold text-[#0f0f0f]">Better</strong> Corporate Life
          </div>
          <div className="ml-4 flex items-center gap-3">
            <div className="whitespace-nowrap text-[11px] uppercase leading-none tracking-[0.08em] text-[#a09c96]">
              {stepMeta[step].label}
            </div>
            {!isEmbedded ? (
              <button
                type="button"
                onClick={closeBot}
                className="rounded-[9px] px-2 py-1 text-xs font-semibold text-[#6b6760] hover:bg-[#f8f7f5]"
                aria-label="Close Sto chat"
              >
                Close
              </button>
            ) : null}
          </div>
        </div>
        <div className="h-0.5 w-full overflow-hidden bg-transparent">
          <div
            className="h-full bg-[#0f0f0f] transition-[width] duration-300"
            style={{ width: `${stepMeta[step].progress}%` }}
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-white px-[18px] py-6">
        {renderConversation()}
      </div>

      <footer className="bg-gradient-to-t from-white from-[62%] to-white/0 px-[18px] pb-[calc(10px+env(safe-area-inset-bottom))] pt-[22px]">
        {controlsReady && step === "result" && resultCopy && door ? (
          <div className="space-y-3">
            <div className={`grid gap-2 ${isEmbedded ? "" : "md:grid-cols-2"}`}>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackBotEvent("sto_call_clicked", { door, q1, placement: isEmbedded ? "waitlist_modal" : "floating_bot" })}
                className="rounded-[9px] border border-[#0f0f0f] bg-white px-3 py-[15px] text-center text-[15px] font-semibold text-[#0f0f0f] transition hover:bg-[#f8f7f5]"
              >
                Book a call on WhatsApp
              </a>
              {isEmbedded ? (
                <p className="rounded-[9px] border border-[#e8e4de] bg-[#f8f7f5] px-3 py-[15px] text-center text-sm font-medium leading-6 text-[#6b6760]">
                  Ready to move? Use the invest button below this diagnostic to continue to checkout.
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    trackBotEvent("sto_buy_clicked", { door, q1 });
                  }}
                  className="rounded-[9px] border border-[#0f0f0f] bg-[#0f0f0f] px-3 py-[15px] text-[15px] font-semibold text-white transition hover:opacity-90"
                >
                  I&apos;ll invest in my career
                </button>
              )}
            </div>
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
            className="rounded-[9px] px-3 py-1.5 text-xs font-semibold text-[#6b6760] hover:bg-[#f8f7f5] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-[9px] px-3 py-1.5 text-xs font-semibold text-[#6b6760] hover:bg-[#f8f7f5]"
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
        className="fixed bottom-[104px] right-4 z-[9998] flex h-[74px] min-w-[170px] items-center gap-2 rounded-[9px] border border-[#e8e4de] bg-white px-3 shadow-[0_12px_30px_rgba(15,15,15,0.18)] transition hover:-translate-y-0.5 md:bottom-[104px] md:right-7"
        aria-label="Chat with Sto"
      >
        <Image src={stoAvatar} alt="" width={58} height={58} className="h-[58px] w-[58px] rounded-[8px] object-cover" />
        <span className="text-left font-jakarta text-sm font-bold leading-4 text-[#0f0f0f]">
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
