"use client";

/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Check,
  Clock3,
  Compass,
  Eye,
  Lightbulb,
  Loader2,
  RefreshCw,
  Shield,
  Signal,
  Target,
  UserRound,
  WifiOff,
} from "lucide-react";
import stoHeadshot from "@/assets/sto-headshot.png";
import stoComplete from "@/assets/panda_main.png";
import diagnosticMountainPeakWide from "@/assets/diagnostic-mountain-peak-wide.webp";
import {
  buildResultCopy,
  ContextAnswers,
  DiagnosticDoorId,
  doorDetails,
  getQ1Empathy,
  q1Options,
  Q1OptionId,
} from "@/data/stoConversation";
import { trackBotEvent } from "./StoCareerBot/analytics";
import { booleanAnswerLabel, getDoorCtas, q1ShortLabels, situationImages, stepMeta, whatsappNumber } from "./StoCareerBot/config";
import { useBotSessionPersistence, useStoPayment } from "./StoCareerBot/hooks";
import type { BotStep, StoCareerBotProps } from "./StoCareerBot/types";
import {
  AnswerChoiceCard,
  BotMessage,
  DiagnosticBranchLines,
  DiagnosticMapBackground,
  DiagnosticQuestionCard,
  FormulaCard,
  FormulaVisual,
  PandaHeader,
  OutcomeChoiceCard,
  QuestionPanel,
  QuestProgress,
  SituationArt,
  StoNote,
  TypingIndicator,
  UserChoice,
} from "./StoCareerBot/ui";
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
  const { resetSession } = useBotSessionPersistence({
    isEmbedded,
    waitlistId,
    sessionActivated,
    sessionStartedAt,
    step,
    status: sessionStatus,
    answers: answersForPersistence,
    result: resultForPersistence,
  });

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
              <Image src={stoHeadshot} alt="Sto headshot" width={78} height={78} className="relative h-[78px] w-[78px] rounded-full border border-[#d8e4f6] object-cover" />
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
          What happened with the promotion or opportunity?
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
    resetSession();
    setSessionStartedAt(null);
    setSessionActivated(false);
    resetPaymentState();
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

  const { actionState, actionMessage, handlePrimaryCta, resetPaymentState } = useStoPayment({
    activeDoorCtas,
    door,
    q1,
    isEmbedded,
    source,
    whatsappHref,
    waitlistReferenceId,
    paymentName,
    paymentEmail,
    paymentPhone,
    paymentCountryCode,
  });

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
      return null;
    }

    if (step === "empathy") {
      return (
        <button
          type="button"
          className="w-full cursor-pointer rounded-[12px] border border-[#014BAA] bg-[#014BAA] px-5 py-4 font-gotham text-[15px] font-bold text-white shadow-[0_12px_26px_rgba(1,75,170,0.18)] transition hover:bg-[#0A57C6] md:py-5"
          onClick={() => goTo("context")}
        >
          Continue
        </button>
      );
    }

    if (step === "context") {
      return null;
    }

    if (step === "diagnostic") {
      return null;
    }

    if (step === "not_considered_formula") {
      return (
        <button type="button" className="w-full cursor-pointer rounded-[18px] border border-[#014BAA] bg-[#014BAA] px-5 py-4 font-gotham text-[15px] font-bold text-white transition hover:bg-[#0A57C6] md:py-5" onClick={() => goTo("desire")}>
          See what&apos;s happening with visibility
        </button>
      );
    }

    if (step === "desire") {
      return (
        <div className="mx-auto max-w-[980px] space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <AnswerChoiceCard
              tone="yes"
              title="Yes, I had made it clear early."
              description="I had made it clear early."
              onClick={() => {
                setDesireAskedEarly(true);
                goTo("importance");
              }}
            />
            <AnswerChoiceCard
              tone="no"
              title="No, I mentioned it late or assumed they knew."
              description="I mentioned it late or assumed they knew."
              onClick={() => {
                setDesireAskedEarly(false);
                goTo("desire_blocker");
              }}
            />
          </div>
          <StoNote>Performance shows what you did. Intent shows what you want next.</StoNote>
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
          <AnswerChoiceCard
            tone="yes"
            title="Yes, it is clearly important to them."
            description="Leadership cares about the outcomes."
            onClick={() => {
              setImportanceVisible(true);
              goTo("personal_seen");
            }}
          />
          <AnswerChoiceCard
            tone="no"
            title="No, it is not visible enough to leadership."
            description="The work may not be linked to a priority they track."
            onClick={() => {
              setImportanceVisible(false);
              revealDoor("story_of_work");
            }}
          />
        </div>
      );
    }

    if (step === "personal_seen") {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <AnswerChoiceCard
            tone="yes"
            title="Yes, they do."
            description="People connect the work directly to me."
            onClick={() => {
              setPersonallySeen(true);
              revealDoor("values_misalignment");
            }}
          />
          <AnswerChoiceCard
            tone="no"
            title="No, they do not."
            description="The work is visible, but my contribution is not."
            onClick={() => {
              setPersonallySeen(false);
              revealDoor("story_of_contribution");
            }}
          />
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
          <AnswerChoiceCard
            tone="yes"
            title="Yes, they do."
            description="They can influence what happens in the room."
            onClick={() => {
              setSponsorHasPower(true);
              goTo("sponsor_willing");
            }}
          />
          <AnswerChoiceCard
            tone="no"
            title="No, they do not."
            description="They support me, but may not carry enough weight."
            onClick={() => {
              setSponsorHasPower(false);
              revealDoor("sponsor_network");
            }}
          />
        </div>
      );
    }

    if (step === "sponsor_willing") {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <AnswerChoiceCard
            tone="yes"
            title="Yes, they would."
            description="They would actively advocate for me."
            onClick={() => {
              setSponsorWillSpendCapital(true);
              goTo("next_level");
            }}
          />
          <AnswerChoiceCard
            tone="no"
            title="No, I do not think so."
            description="They may like my work, but not enough to spend capital."
            onClick={() => {
              setSponsorWillSpendCapital(false);
              revealDoor("communication_framework");
            }}
          />
        </div>
      );
    }

    if (step === "next_level") {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <AnswerChoiceCard
            tone="yes"
            title="Yes, it does."
            description="My current output already signals next-level readiness."
            onClick={() => {
              setNextLevelEvidence(true);
              revealDoor("complex_situation");
            }}
          />
          <AnswerChoiceCard
            tone="no"
            title="No, it does not."
            description="My excellence may still read as current-role excellence."
            onClick={() => {
              setNextLevelEvidence(false);
              revealDoor("brilliance_image_trap");
            }}
          />
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

  const renderVisualScreen = () => {
    if (!isEmbedded) {
      return (
        <div className="space-y-3">
          {screenItems.slice(0, visibleMessageCount).map((item) => item)}
          {isTyping ? <TypingIndicator /> : null}
        </div>
      );
    }

    if (step !== "intro" && (isTyping || visibleMessageCount < screenItems.length)) {
      return (
        <div className="flex min-h-[420px] items-center justify-center">
          <TypingIndicator />
        </div>
      );
    }

    if (step === "intro") {
      return (
        <div className="mx-auto grid h-full w-full max-w-[1224px] items-center gap-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <section className="relative min-h-[360px] overflow-hidden rounded-[16px] border border-[#d8e4f6] bg-[linear-gradient(135deg,#eef6ff_0%,#ffffff_58%,#f6fbff_100%)] px-5 py-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] md:min-h-[460px] md:px-8 md:py-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_24%,rgba(10,87,198,0.10)_0%,rgba(10,87,198,0.03)_24%,transparent_55%)]" />
            <div className="relative z-10 flex h-full items-end justify-center">
              <Image src={stoComplete} alt="Sto headshot" width={360} height={360} priority className="h-[300px] w-[300px] rounded-full object-cover drop-shadow-[0_22px_34px_rgba(15,23,42,0.14)] md:h-[390px] md:w-[390px]" />
              <div className="absolute right-3 top-[22%] md:right-8">
                <span className="mb-2 inline-flex rounded-full bg-[#e8f2ff] px-3 py-1 font-gotham text-[10px] font-bold uppercase tracking-[0.16em] text-[#0A57C6]">
                  Meet Sto
                </span>
                <div className="rounded-[14px] border border-[#d8e4f6] bg-white px-4 py-3 font-quattrocento text-[18px] font-bold text-[#050817] shadow-[0_14px_30px_rgba(15,23,42,0.10)]">
                  Hi, I&apos;m Sto.
                </div>
              </div>
            </div>
          </section>

          <section className="flex min-h-0 flex-col justify-center rounded-[16px] border border-[#d8e4f6] bg-white px-6 py-7 shadow-[0_12px_30px_rgba(15,23,42,0.05)] md:px-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0A57C6] text-white shadow-[0_12px_28px_rgba(10,87,198,0.28)]">
              <Compass className="h-7 w-7" />
            </div>
            <h1 className="mt-4 max-w-[20ch] font-quattrocento text-[34px] font-bold leading-[1.05] text-[#050817] md:text-[44px]">
              You&apos;re not stuck because you&apos;re bad at your job.
            </h1>
            <h2 className="mt-3 max-w-[21ch] font-quattrocento text-[31px] font-bold leading-[1.05] text-[#050817] md:text-[40px]">
              You&apos;re stuck because <span className="text-[#014BAA]">promotions work differently</span> from performance.
            </h2>
            <div className="mt-4 h-[3px] w-14 rounded-full bg-[#014BAA]" />
            <p className="mt-4 max-w-[52ch] font-gotham text-[14px] leading-6 text-[#40506c] md:text-[15px]">
              Sto will ask a few sharp questions to help you see what is actually blocking your promotion momentum.
            </p>
            <button
              type="button"
              className="mt-4 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-[10px] bg-[#0057D9] px-5 font-gotham text-[15px] font-bold text-white shadow-[0_14px_30px_rgba(0,87,217,0.24)] transition hover:bg-[#0A57C6] md:max-w-[560px]"
              onClick={() => {
                if (!sessionActivated) {
                  setSessionActivated(true);
                  setSessionStartedAt(new Date().toISOString());
                }
                goTo("q1");
              }}
            >
              Promotion Clarity Check
              <ArrowRight className="h-5 w-5" />
            </button>
            <p className="mt-3 flex items-center justify-center gap-2 font-gotham text-[12px] font-medium text-[#667085] md:max-w-[560px]">
              <Clock3 className="h-4 w-4" />
              Takes 3-4 minutes. No generic advice.
            </p>
          </section>
        </div>
      );
    }

    if (step === "q1") {
      return (
        <div className="mx-auto flex h-full w-full max-w-[1370px] flex-col justify-start gap-3 pt-2 md:pt-3">
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex shrink-0 items-center gap-3">
                <Image src={stoHeadshot} alt="Sto headshot" width={64} height={64} className="h-[54px] w-[54px] shrink-0 rounded-full border border-[#d8e4f6] object-cover shadow-[0_8px_18px_rgba(15,23,42,0.08)] md:h-[64px] md:w-[64px]" />
                <div>
                  <p className="font-gotham text-[14px] font-bold text-[#101828]">Sto</p>
                  <p className="font-gotham text-[12px] font-medium text-[#5269a3]">Your guide</p>
                </div>
              </div>
              <div className="relative w-full max-w-[645px] rounded-[22px] bg-[#f0f2f7] px-7 py-3 font-gotham text-[14px] font-medium leading-5 text-[#273348] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] before:absolute before:left-[-18px] before:top-1/2 before:hidden before:h-0 before:w-0 before:-translate-y-1/2 before:border-y-[14px] before:border-r-[20px] before:border-y-transparent before:border-r-[#f0f2f7] sm:ml-8 sm:before:block">
                Let&apos;s get real about what&apos;s going on for you at work.
              </div>
            </div>
            <h2 className="mt-4 max-w-[25ch] font-quattrocento text-[30px] font-bold leading-[1.02] text-[#050817] md:text-[38px] xl:text-[42px]">
              Which of these feels closest to what&apos;s happening at work right now?
            </h2>
            <p className="mt-2 font-gotham text-[14px] font-medium leading-5 text-[#5269a3] md:text-[15px]">
              Choose the one that feels most true. This stays between us.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-7 md:gap-y-3">
            {q1Options.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`relative flex min-h-[150px] cursor-pointer flex-col overflow-hidden rounded-[17px] border bg-white text-center shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition hover:border-[#014BAA] hover:shadow-[0_14px_30px_rgba(10,87,198,0.08)] md:min-h-[176px] ${
                  q1 === option.id ? "border-2 border-[#014BAA]" : "border-[#e6e0d7]"
                }`}
                onClick={() => {
                  setQ1(option.id);
                  trackBotEvent("sto_q1_selected", { q1: option.id });
                }}
                aria-pressed={q1 === option.id}
              >
                {q1 === option.id ? (
                  <span className="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#014BAA] text-white shadow-[0_8px_16px_rgba(1,75,170,0.24)]">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                ) : null}
                <div className="relative h-[110px] w-full bg-[#fffaf3] md:h-[128px]">
                  <img
                    src={situationImages[option.id].src}
                    alt=""
                    className="h-full w-full object-cover"
                    aria-hidden
                  />
                </div>
                <span className="flex min-h-[40px] items-center justify-center px-4 font-gotham text-[14px] font-bold leading-5 text-[#111827] md:text-[15px]">
                  {q1ShortLabels[option.id]}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={!q1}
            className="min-h-[52px] w-full cursor-pointer rounded-[10px] border border-[#014BAA] bg-[#014BAA] px-5 font-quattrocento text-[18px] font-bold text-white shadow-[0_12px_26px_rgba(1,75,170,0.18)] transition hover:bg-[#0A57C6] disabled:cursor-not-allowed disabled:border-[#c6d4ea] disabled:bg-[#d1d5db] disabled:opacity-100"
            onClick={() => goTo("empathy")}
          >
            Continue
          </button>
        </div>
      );
    }

    if (step === "empathy" && selectedQ1 && q1) {
      const empathyCopy = getQ1Empathy(q1);
      const empathySentences = empathyCopy
        .split(/(?<=[.!?])\s+/)
        .map((sentence) => sentence.trim())
        .filter(Boolean);

      return (
        <div className="mx-auto grid h-full w-full max-w-[1224px] items-center gap-5 md:grid-cols-[320px_minmax(0,1fr)]">
          <aside>
            <p className="mb-3 font-gotham text-[11px] font-bold uppercase tracking-[0.16em] text-[#014BAA]">You selected</p>
            <div className="rounded-[16px] border border-[#d8e4f6] bg-white p-3 text-center shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
              <SituationArt id={q1} />
              <p className="mt-4 font-gotham text-[14px] font-bold leading-5 text-[#202939]">{q1ShortLabels[q1]}</p>
            </div>
          </aside>

          <section>
            <div className="rounded-[16px] border border-[#d8e4f6] bg-white px-6 py-7 shadow-[0_12px_30px_rgba(15,23,42,0.05)] md:px-8">
              <div className="mb-5 flex items-center gap-3">
                <Image src={stoHeadshot} alt="Sto headshot" width={56} height={56} className="h-12 w-12 shrink-0 rounded-full border border-[#d8e4f6] object-cover" />
                <div>
                  <p className="font-gotham text-[14px] font-bold text-[#101828]">Sto</p>
                  <p className="font-gotham text-[13px] text-[#336bd6]">Your guide</p>
                </div>
              </div>
              <div className="space-y-4">
                {empathySentences.map((sentence) => (
                  <p key={sentence} className="font-quattrocento text-[26px] font-bold leading-[1.22] text-[#101828] md:text-[32px]">
                    {sentence}
                  </p>
                ))}
                <p className="font-quattrocento text-[28px] font-bold leading-tight text-[#101828] md:text-[34px]">
                  Let&apos;s go one layer deeper.
                </p>
              </div>
            </div>
            <p className="mt-4 text-center font-gotham text-[13px] font-medium text-[#336bd6]">
              2-3 questions. Then Sto will show you what may be blocking your momentum.
            </p>
          </section>
        </div>
      );
    }

    if (step === "context") {
      const canProceed = context.targetRole.trim();

      return (
        <div className="mx-auto flex h-full w-full max-w-[1224px] flex-col justify-center gap-4">
          <div className="grid min-h-0 items-stretch gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <section className="rounded-[16px] border border-[#d8e4f6] bg-white px-6 py-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] md:px-8">
              <PandaHeader />
              <h2 className="max-w-[19ch] font-quattrocento text-[30px] font-bold leading-[1.08] text-[#050817] md:text-[38px]">
                What role or career milestone are you currently working towards?
              </h2>
              <p className="mt-4 font-gotham text-[15px] leading-6 text-[#40506c] md:text-[16px]">
                This helps Sto understand what progress would look like for you.
              </p>
            </section>
            <div className="relative min-h-[280px] overflow-hidden rounded-[16px] border border-[#d8e4f6] bg-[#fffaf3] shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
              <Image
                src={diagnosticMountainPeakWide}
                alt=""
                fill
                sizes="(max-width: 1024px) 92vw, 620px"
                className="object-cover"
                aria-hidden
              />
            </div>
          </div>

          <label className="block font-gotham text-[11px] font-bold uppercase leading-[1.4] tracking-[0.18em] text-[#014BAA]">
            Role or career milestone
            <textarea
              value={context.targetRole}
              onChange={(event) => setContext((current) => ({ ...current, targetRole: event.target.value }))}
              placeholder="E.g. Senior Manager. Or just want to feel more appreciated at work."
              className="mt-2 min-h-[76px] w-full resize-none rounded-[14px] border border-[#d8e4f6] bg-white px-4 py-3 font-gotham text-[15px] normal-case leading-6 tracking-[0] text-[#111111] outline-none shadow-[0_8px_20px_rgba(1,75,170,0.05)] transition placeholder:text-[#9aa4b2] focus:border-[#014BAA]"
            />
          </label>

          <div className="grid gap-3 md:grid-cols-2">
            <button
              type="button"
              disabled={!canProceed}
              className="min-h-12 w-full cursor-pointer rounded-[14px] border border-[#014BAA] bg-[#014BAA] px-5 font-gotham text-[15px] font-bold text-white transition hover:bg-[#0A57C6] disabled:cursor-not-allowed disabled:border-[#c6d4ea] disabled:bg-[#d1d5db] disabled:opacity-100"
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
              className="min-h-12 w-full cursor-pointer rounded-[14px] border border-[#d8e4f6] bg-white px-5 font-gotham text-[15px] font-bold text-[#014BAA] transition hover:border-[#014BAA] hover:bg-[#f8fbff]"
              onClick={() => {
                setSkippedContext(true);
                trackBotEvent("sto_screen2_skipped", { q1 });
                goTo("diagnostic");
              }}
            >
              Let&apos;s skip this for now
            </button>
          </div>
        </div>
      );
    }

    if (step === "diagnostic") {
      return (
        <div className="relative mx-auto flex h-full min-h-[620px] w-full max-w-[1180px] flex-col justify-center overflow-hidden rounded-[24px] px-5 py-5 md:min-h-0 md:px-8 md:py-7">
          <DiagnosticMapBackground />
          <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center">
            <DiagnosticQuestionCard />
            <DiagnosticBranchLines />
            <div className="mt-9 grid w-full max-w-[860px] gap-6 md:mt-[128px] md:grid-cols-2 md:gap-16">
              <OutcomeChoiceCard
                type="not_considered"
                onClick={() => {
                  setDiagnosticPath("not_considered");
                  trackBotEvent("sto_diagnostic_answered", { answer: "not_considered", q1 });
                  goTo("not_considered_formula");
                }}
              />
              <OutcomeChoiceCard
                type="considered"
                onClick={() => {
                  setDiagnosticPath("considered");
                  trackBotEvent("sto_diagnostic_answered", { answer: "considered", q1 });
                  goTo("considered_formula");
                }}
              />
            </div>
            <div className="relative z-20 mt-6 flex w-full justify-center">
              <StoNote>Pick the version closest to what happened. The next path changes based on your choice.</StoNote>
            </div>
          </div>
        </div>
      );
    }

    if (step === "not_considered_formula") {
      return (
        <div className="mx-auto flex h-full w-full max-w-[1224px] flex-col justify-center gap-5">
          <FormulaVisual
            kind="not_considered"
            formula="To be considered = Performance x Visibility"
            note="If either is missing, the result is zero. Your performance isn't the issue. So let's look at visibility."
            outcomeTitle="I was not even considered"
            outcomeBody="You were not discussed, shortlisted, or seen as a contender."
          />
          <StoNote>This insight is based on your selection. The next step will help uncover what&apos;s holding your visibility back -- and what to do about it.</StoNote>
        </div>
      );
    }

    if (step === "considered_formula") {
      return (
        <div className="mx-auto flex h-full w-full max-w-[1224px] flex-col justify-center gap-5">
          <FormulaVisual
            kind="considered"
            formula="To be picked = Sponsor Strength x Next Level Signal"
            note="Sponsor strength is about who goes to bat for you, and with what impact. Next level signals help people see you in the new role."
            outcomeTitle="I was considered but someone else got chosen"
            outcomeBody="You were in the frame, but the final bet went to someone else."
          />
          <StoNote>This insight is based on your selection. The next step will help uncover what affected the final decision -- and what to do about it.</StoNote>
        </div>
      );
    }

    if (step === "desire") {
      return (
        <div className="mx-auto flex h-full w-full max-w-[1224px] flex-col justify-center gap-5">
          <QuestionPanel
            eyebrow="Early signal"
            title="Did you ask for the promotion early enough?"
            subtitle="Did you ensure your manager knew you were looking for one?"
            wide
          />
          <StoNote>Performance shows what you did. Intent shows what you want next.</StoNote>
        </div>
      );
    }

    if (step === "importance") {
      return (
        <div className="mx-auto flex h-full w-full max-w-[1224px] flex-col justify-center gap-5">
          <QuestionPanel
            icon={<Eye className="h-9 w-9" />}
            title="Is the project you are working on seen as important by leadership?"
            subtitle="Do they care about the outcomes?"
            wide
          />
          <StoNote>Clearly, you have the desire for visibility. Now we check whether leadership sees the work as important.</StoNote>
        </div>
      );
    }

    if (step === "personal_seen") {
      return (
        <div className="mx-auto flex h-full w-full max-w-[1224px] flex-col justify-center gap-5">
          <QuestionPanel
            icon={<UserRound className="h-9 w-9" />}
            title="The project is seen as important. But are you?"
            subtitle="Do people know it's you doing all this work?"
            wide
          />
          <StoNote>The work can be visible while your contribution stays disconnected from it.</StoNote>
        </div>
      );
    }

    if (step === "desire_blocker") {
      return (
        <div className="mx-auto flex h-full w-full max-w-[1224px] flex-col justify-center gap-5">
          <QuestionPanel
            icon={<WifiOff className="h-9 w-9" />}
            title="You didn't ask. I think I see what's happening here."
            subtitle="Not because you don't want it, but because somewhere deep inside you is the fear that you aren't ready for it."
            wide
          />
          <StoNote>This happens more often than you&apos;d think. And it&apos;s fixable.</StoNote>
        </div>
      );
    }

    if (step === "sponsor_power") {
      return (
        <div className="mx-auto flex h-full w-full max-w-[1224px] flex-col justify-center gap-5">
          <QuestionPanel
            icon={<Signal className="h-9 w-9" />}
            title="Does your sponsor have real power in the decision room?"
            wide
          />
          <StoNote>Sponsor strength depends on who can influence the room, not just who likes your work.</StoNote>
        </div>
      );
    }

    if (step === "sponsor_willing") {
      return (
        <div className="mx-auto flex h-full w-full max-w-[1224px] flex-col justify-center gap-5">
          <QuestionPanel
            icon={<Shield className="h-9 w-9" />}
            title="Would your sponsor spend their political currency on you?"
            subtitle="Would they put their own reputation on the line for you?"
            wide
          />
          <StoNote>A sponsor with power still has to feel invested enough to use it.</StoNote>
        </div>
      );
    }

    if (step === "next_level") {
      return (
        <div className="mx-auto flex h-full w-full max-w-[1224px] flex-col justify-center gap-5">
          <QuestionPanel
            icon={<Target className="h-9 w-9" />}
            title="Does your current work show that you're ready for the next level?"
            wide
          />
          <StoNote>Promotion decisions need proof that others can already imagine you in the bigger role.</StoNote>
        </div>
      );
    }

    if (door && step === "door") {
      return (
        <div className="mx-auto flex h-full w-full max-w-[1224px] flex-col justify-center gap-5">
          <QuestionPanel
            icon={<Lightbulb className="h-9 w-9" />}
            eyebrow="What's really going on"
            title={doorDetails[door].name}
            subtitle={doorDetails[door].summary}
            wide
          />
          <StoNote>Here&apos;s what I think is really going on.</StoNote>
        </div>
      );
    }

    if (step === "result" && resultCopy && door) {
      return (
        <div className="mx-auto flex h-full w-full max-w-[1224px] flex-col justify-center gap-5">
          <QuestionPanel icon={<BookOpen className="h-9 w-9" />} eyebrow="Your full picture" title={resultCopy.title} subtitle={resultCopy.summary} wide />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["What's actually hurting", resultCopy.pain],
              ["Why this is happening", resultCopy.concept],
              ["What changes this", resultCopy.program],
            ].map(([title, copy]) => (
              <section key={title} className="rounded-[16px] border border-[#d8e4f6] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                <p className="font-gotham text-[11px] font-bold uppercase tracking-[0.16em] text-[#014BAA]">{title}</p>
                <p className="mt-3 font-gotham text-[14px] leading-6 text-[#40506c] md:text-[15px]">{copy}</p>
              </section>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto w-full max-w-[820px]">
        <QuestionPanel title="Let's continue." wide />
      </div>
    );
  };

  const shellClassName = isEmbedded
    ? "relative mx-auto grid h-full min-h-0 w-full grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-[12px] border border-[#e6e0d7] bg-white font-gotham shadow-[0_16px_44px_rgba(15,23,42,0.09)]"
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
      <header className={isEmbedded ? "relative z-10" : "border-b border-[#dce8f8] bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)] backdrop-blur"}>
        {isEmbedded ? (
          step === "intro" || step === "q1" || step === "empathy" ? (
            <div className="border-b border-[#dce8f8] bg-white/80">
              <div className="flex h-[64px] items-center justify-between px-6 md:px-12">
                <button
                  type="button"
                  onClick={step === "intro" ? reset : goBack}
                  disabled={step !== "intro" && !history.length}
                  className="inline-flex min-w-[112px] cursor-pointer items-center gap-4 font-gotham text-[14px] font-medium text-[#050817] hover:text-[#014BAA] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back
                </button>
                <div className="font-quattrocento text-[22px] font-bold leading-none text-[#050817] md:text-[28px]">
                  Better <span className="text-[#014BAA]">Corporate Life</span>
                </div>
                <div className="min-w-[112px] text-right font-gotham text-[10px] font-bold uppercase tracking-[0.26em] text-[#5269a3] md:text-[12px]">
                  {step === "intro" ? "Introduction" : "Your Situation"}
                </div>
              </div>
              <div className="mx-6 h-[4px] bg-[#d9dee8] md:mx-12">
                <div className={`h-full bg-[#014BAA] ${step === "intro" ? "w-[16%]" : step === "q1" ? "w-[16%]" : "w-[27%]"}`} />
              </div>
            </div>
          ) : (
            <QuestProgress step={step} />
          )
        ) : (
          <>
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
          </>
        )}
      </header>

      <div className={isEmbedded ? `relative z-10 min-h-0 overflow-y-auto px-5 md:overflow-hidden md:px-12 ${step === "q1" ? "py-0" : "py-5 md:py-6"}` : "flex-1 overflow-y-auto bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] px-5 py-6 md:px-8 md:py-8"}>
        {renderVisualScreen()}
      </div>

      <footer className={isEmbedded ? `${step === "intro" ? "hidden" : `relative z-10 px-5 pb-[calc(12px+env(safe-area-inset-bottom))] pt-1 md:px-12 md:pb-4`}` : "bg-gradient-to-t from-white from-[62%] to-white/0 px-5 pb-[calc(16px+env(safe-area-inset-bottom))] pt-6 md:px-8"}>
        {controlsReady && step === "result" && resultCopy && door ? (
          <div className="mx-auto max-w-[980px] space-y-3">
            <div className={`grid gap-3 ${activeDoorCtas?.secondary ? "md:grid-cols-2" : ""}`}>
              <button
                type="button"
                onClick={handlePrimaryCta}
                disabled={actionState === "loading"}
                className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-[14px] border border-[#014BAA] bg-[#014BAA] px-5 py-4 font-gotham text-[15px] font-bold text-white transition hover:bg-[#0A57C6] disabled:cursor-not-allowed disabled:border-[#c6d4ea] disabled:bg-[#d1d5db] disabled:opacity-100 md:py-5"
              >
                {actionState === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
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
                  className="cursor-pointer rounded-[14px] border border-[#014BAA] bg-white px-5 py-4 text-center font-gotham text-[15px] font-bold text-[#014BAA] transition hover:border-[#0A57C6] hover:bg-[#f8fbff] md:py-5"
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
        ) : controlsReady && step !== "diagnostic" ? (
          <div className={isEmbedded ? "mx-auto max-w-[1370px]" : ""}>{renderControls()}</div>
        ) : step !== "diagnostic" ? (
          <div className="min-h-[44px]" />
        ) : (
          <div />
        )}

        <div className="mx-auto mt-2 flex max-w-[1370px] items-center justify-between pt-1">
          <button
            type="button"
            onClick={step === "q1" ? reset : goBack}
            disabled={step !== "q1" && !history.length}
            className="inline-flex cursor-pointer items-center gap-2 rounded-[12px] px-3 py-2 font-gotham text-sm font-bold text-[#526177] hover:bg-[#f3f8ff] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {step === "q1" ? "Restart" : "Back"}
          </button>
          {step === "q1" || step === "empathy" ? (
            <div className="font-gotham text-sm font-medium text-[#7f8da3]">{step === "empathy" ? "2 of 5" : "1 of 5"}</div>
          ) : step === "diagnostic" ? (
            <div />
          ) : null}
          <div className="inline-flex items-center gap-2 rounded-[12px] px-3 py-2 font-gotham text-sm font-bold text-[#526177]">
            {step === "q1" || step === "empathy" ? (
              <>
                <Shield className="h-4 w-4" />
                Private & confidential
              </>
            ) : (
              <button type="button" onClick={reset} className="inline-flex cursor-pointer items-center gap-2 hover:text-[#014BAA]">
                Restart
                <RefreshCw className="h-4 w-4" />
              </button>
            )}
          </div>
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
        <Image src={stoHeadshot} alt="" width={58} height={58} className="h-[58px] w-[58px] rounded-full border border-[#d8e4f6] object-cover" />
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
