"use client";

/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock3,
  Lightbulb,
  Loader2,
  PhoneCall,
  Play,
  PlayCircle,
  Signal,
  Star,
  WifiOff,
  X,
} from "lucide-react";
import stoHeadshot from "@/assets/sto-headshot.png";
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
import { booleanAnswerLabel, getDoorCtas, q1ShortLabels, situationCardImages, stepMeta, whatsappNumber } from "./StoCareerBot/config";
import { useBotSessionPersistence, useStoPayment } from "./StoCareerBot/hooks";
import type { BotStep, StoCareerBotProps } from "./StoCareerBot/types";
import {
  AnswerChoiceCard,
  BotMessage,
  DiagnosticMapBackground,
  DiagnosticQuestionCard,
  FormulaCard,
  PandaHeader,
  OutcomeChoiceCard,
  QuestionPanel,
  StoNote,
  TypingIndicator,
  UserChoice,
} from "./StoCareerBot/ui";

const BclHeader = () => (
  <div className="flex h-[52px] shrink-0 items-start bg-white pt-4 md:h-[58px]">
    <div className="font-gotham text-[29px] font-bold leading-none text-[#0057c8]">BCL</div>
  </div>
);

const bclProductVideoSources = {
  webm: "https://stocaistorage.blob.core.windows.net/videos/marketing/bcl_product_video/video.webm?sp=r&st=2026-05-14T11:41:31Z&se=2029-05-14T19:56:31Z&spr=https&sv=2025-11-05&sr=b&sig=5TW5cdUcEa94xMHKHpHQ41QuZzQXZxoPxy36SXNLD6w%3D",
  mp4: "https://stocaistorage.blob.core.windows.net/videos/marketing/bcl_product_video/video.mp4?sp=r&st=2026-05-14T11:41:00Z&se=2029-05-14T19:56:00Z&spr=https&sv=2025-11-05&sr=b&sig=wNyMLeQCZyyqJgwYI2DuGRK5pGYT5UaXQFpnofFvaFQ%3D",
};

const DiagnosticIntroScreen = ({ onStart, onRestart }: { onStart: () => void; onRestart: () => void }) => (
  <div className="diagnostic-intro-screen flex h-full min-h-0 w-full justify-center bg-[#eef4ff] md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full min-h-0 w-full max-w-full flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:max-w-[640px] md:rounded-[4px] md:border md:border-[#d8e4f6] lg:max-w-[760px]">
      <div className="diagnostic-intro-content flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-8 pb-8">
        <BclHeader />
        <div className="diagnostic-intro-card mt-2 shrink-0 overflow-hidden rounded-[4px] border border-[#eef1f6] bg-[#f8fbff] shadow-[0_2px_10px_rgba(15,23,42,0.16)]">
          <div className="diagnostic-intro-art relative aspect-[300/173] max-h-[400px] w-full overflow-hidden bg-[#eef5ff]">
            <img
              src="/diagnostic/intro-office-sto.png"
              alt="Sto standing in a bright office"
              className="h-full w-full object-cover"
            />
            <div className="absolute right-[27px] top-[38px] font-gotham text-[12px] font-medium uppercase leading-none text-[#0057c8]">
              Meet Sto
            </div>
            <div className="absolute right-[25px] top-[64px] rounded-[7px] border border-[#7dafff] bg-white px-3 py-2 font-gotham text-[17px] font-medium leading-none text-[#242424] shadow-[0_6px_14px_rgba(37,99,235,0.08)] after:absolute after:bottom-[-7px] after:left-[18px] after:h-[12px] after:w-[12px] after:rotate-45 after:border-b after:border-l after:border-[#7dafff] after:bg-white">
              Hi, I&apos;m Sto.
            </div>
          </div>

          <div className="diagnostic-intro-copy px-[18px] pb-[23px] pt-[30px] md:px-5 md:pt-7">
            <h1 className="font-quattrocento text-[23px] font-bold leading-[1.03] text-[#242424]">
              You&apos;re not stuck because you&apos;re bad at your job.
            </h1>
            <h2 className="mt-[22px] font-quattrocento text-[23px] font-bold leading-[1.03] text-[#242424]">
              You&apos;re stuck because <span className="text-[#0057c8]">promotions work differently</span> from performance.
            </h2>
            <div className="mt-[22px] h-px w-full bg-[#c7d8f9]" />
            <p className="mt-[22px] max-w-[42ch] font-gotham text-[14px] font-normal leading-[1.45] text-[#242424]">
              Sto will ask a few sharp questions to help you see what is actually <span className="font-bold">blocking your promotion momentum.</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          className="mt-[26px] inline-flex min-h-[48px] w-full shrink-0 cursor-pointer items-center justify-center gap-5 rounded-[6px] bg-[#0057c8] px-5 font-gotham text-[17px] font-medium text-white transition hover:bg-[#0A57C6]"
          onClick={onStart}
        >
          Promotion Clarity Check
          <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
        </button>
        <p className="mt-[18px] flex shrink-0 items-center justify-center gap-2 font-gotham text-[11px] font-normal text-[#1f1f1f]">
          <Clock3 className="h-[14px] w-[14px]" strokeWidth={1.8} />
          Takes 3-4 minutes. No generic advice.
        </p>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" disabled className="cursor-not-allowed font-bold text-[#0057c8] opacity-40">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const CallInvestModal = ({
  isOpen,
  onClose,
  onInvest,
  onCallInstead,
  isLoading,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  onInvest: () => void;
  onCallInstead: () => void;
  isLoading: boolean;
  message: string;
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isInlineVideoPlaying, setIsInlineVideoPlaying] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (isVideoOpen) {
        setIsVideoOpen(false);
        return;
      }

      onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isVideoOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setIsVideoOpen(false);
      setIsInlineVideoPlaying(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onInvest();
  };

  const handleVideoPreviewClick = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setIsInlineVideoPlaying(true);
      return;
    }

    setIsVideoOpen(true);
  };

  return (
    <div
      className="sto-invest-modal fixed inset-0 z-[10050] flex items-center justify-center bg-[#071326]/65 p-3 backdrop-blur-[2px] md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Career investment options"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="sto-invest-shell relative flex max-h-[calc(100svh-24px)] w-full max-w-[980px] flex-col overflow-y-auto rounded-[14px] bg-white shadow-[0_24px_80px_rgba(2,8,23,0.34)] md:grid md:max-h-[720px] md:grid-cols-[1fr_420px] md:overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          className="sto-invest-close absolute right-3 top-3 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/90 text-[#0f172a] shadow-[0_8px_24px_rgba(15,23,42,0.18)] transition hover:bg-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={2.2} />
        </button>

        <section className={`sto-invest-hero flex items-center justify-center bg-[radial-gradient(circle_at_center,#1e66d6_0%,#0b2a58_48%,#061226_100%)] px-4 py-4 text-white md:min-h-[620px] md:px-6 md:py-8 ${isInlineVideoPlaying ? "sto-invest-hero--playing" : ""}`}>
          <div className={`sto-invest-hero-inner w-full max-w-[460px] text-center ${isInlineVideoPlaying ? "sto-invest-hero-inner--playing" : ""}`}>
            <button
              type="button"
              onClick={handleVideoPreviewClick}
              className={`sto-invest-video group relative mx-auto flex aspect-video h-[170px] w-full max-w-[320px] cursor-pointer items-center justify-center overflow-hidden rounded-[14px] border border-white/25 bg-black shadow-[0_18px_48px_rgba(0,0,0,0.28),inset_0_0_0_1px_rgba(255,255,255,0.08)] transition hover:border-white/45 md:h-auto md:max-w-none ${isInlineVideoPlaying ? "sto-invest-video--playing" : ""}`}
              aria-label="Play Be More Promotable product video"
            >
              {isInlineVideoPlaying ? (
                <video
                  className="h-full w-full bg-black object-contain"
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  aria-label="Be More Promotable product walkthrough"
                  onClick={(event) => event.stopPropagation()}
                >
                  <source src={bclProductVideoSources.webm} type="video/webm" />
                  <source src={bclProductVideoSources.mp4} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <>
                  <img
                    src="/diagnostic/thumbnail.jpeg"
                    alt=""
                    className="h-full w-full bg-black object-cover opacity-90"
                    aria-hidden
                  />
                  <span className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />
                  <span className="sto-invest-play absolute flex h-14 w-14 items-center justify-center rounded-full bg-white/92 text-[#0057c8] shadow-[0_12px_30px_rgba(0,0,0,0.26)] transition group-hover:scale-105 md:h-16 md:w-16">
                    <PlayCircle className="hidden h-8 w-8 md:block md:h-9 md:w-9" strokeWidth={1.7} />
                    <Play className="h-7 w-7 fill-current md:hidden" strokeWidth={1.8} />
                  </span>
                </>
              )}
            </button>
            {!isInlineVideoPlaying ? (
              <>
                <p className="sto-invest-eyebrow mt-3 font-gotham text-[10px] font-bold uppercase tracking-[0.14em] text-[#bcd6ff] md:mt-5 md:text-[12px]">Be More Promotable</p>
                <h2 className="sto-invest-title mt-1 font-gotham text-[24px] font-bold leading-[1.08] md:mt-2 md:text-[38px]">See the system before you join.</h2>
                <p className="sto-invest-copy mx-auto mt-2 max-w-[32ch] font-gotham text-[12px] font-medium leading-5 text-white/82 md:mt-3 md:max-w-[34ch] md:text-[14px] md:leading-6">
                  Watch how BCL helps turn strong work into promotion-ready visibility, sponsors, and next-level signals.
                </p>
              </>
            ) : null}
          </div>
        </section>

        <section className="sto-invest-offer bg-white px-4 py-4 md:overflow-y-auto md:px-6 md:py-7">
          <form
            onSubmit={handleSubmit}
            className="sto-invest-card relative rounded-[14px] border-2 border-[#0057c8] bg-white px-4 pb-4 pt-10 shadow-[0_18px_36px_rgba(10,87,198,0.08)] md:px-5 md:pb-5 md:pt-9"
          >
            <span className="sto-invest-badge absolute left-5 top-3 inline-flex items-center gap-1 rounded-[5px] bg-[#e7f1ff] px-2 py-1 font-gotham text-[9px] font-bold uppercase tracking-[0.08em] text-[#0057c8]">
              <Star className="hidden h-3 w-3 fill-current md:hidden" strokeWidth={2} />
              Recommended
            </span>
            <div className="text-center">
              <h3 className="sto-invest-card-title font-gotham text-[21px] font-bold leading-tight text-[#0057c8] md:text-[23px]">Join the Program</h3>
              <p className="sto-invest-card-copy mx-auto mt-2 max-w-[250px] font-gotham text-[12px] font-medium leading-[18px] text-[#242424] md:mt-1 md:text-[12px] md:leading-[18px]">
                Build your promotion operating system after seeing what is blocking you.
              </p>
            </div>

            <div className="sto-invest-divider mt-4 hidden items-center justify-center md:hidden" aria-hidden>
              <span />
            </div>

            <div className="sto-invest-benefits mt-4 space-y-2 md:mt-4">
              {["Translate strong work into promotable signals.", "Build sponsor-ready visibility.", "Leave with a sharper next-level plan."].map((label) => (
                <div key={label} className="sto-invest-benefit flex items-center gap-3 rounded-[8px] border border-[#edf1f7] bg-[#f8fbff] px-3 py-[7px] md:py-[8px]">
                  <span className="sto-invest-benefit-icon flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-[#e6f1ff] text-[#0057c8]">
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <span className="sto-invest-benefit-text font-gotham text-[13px] font-medium leading-5 text-[#242424]">{label}</span>
                </div>
              ))}
            </div>

            <p className="sto-invest-price-label mt-5 hidden text-center font-gotham text-[11px] font-medium text-[#5c6170] md:hidden">Early access price</p>
            <div className="sto-invest-price mt-5 flex items-end justify-center gap-5 md:gap-4">
              <span className="sto-invest-price-old pb-1 font-gotham text-[16px] font-bold text-[#9aa4b2] line-through">{"\u20b9"}4,999</span>
              <span className="sto-invest-price-new font-gotham text-[30px] font-bold leading-none text-[#0057c8] md:text-[32px]">{"\u20b9"}1,970</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="sto-invest-cta mt-5 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[9px] bg-[#0057c8] px-4 font-gotham text-[16px] font-bold text-white shadow-[0_12px_24px_rgba(0,87,217,0.22)] transition hover:bg-[#0A57C6] focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-55"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              {isLoading ? "Processing..." : "I'll Invest in My Career"}
            </button>

            <button
              type="button"
              onClick={onCallInstead}
              disabled={isLoading}
              className="sto-invest-call-cta mt-3 inline-flex min-h-[42px] w-full cursor-pointer items-center justify-center gap-3 rounded-[6px] border border-[#d8b77d] bg-transparent px-4 font-gotham text-[12px] font-bold text-[#211912] transition hover:bg-[#fffaf3] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <PhoneCall className="h-4 w-4" strokeWidth={1.9} />
              I&apos;d like a call instead
            </button>

            {message ? (
              <p className="mt-3 text-center font-gotham text-xs font-medium text-[#b42318]" role="status" aria-live="polite">
                {message}
              </p>
            ) : null}
          </form>
        </section>
      </div>

      {isVideoOpen ? (
        <div
          className="fixed inset-0 z-[10070] flex items-center justify-center bg-black p-0"
          role="dialog"
          aria-modal="true"
          aria-label="Be More Promotable product video"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsVideoOpen(false);
          }}
        >
          <button
            type="button"
            onClick={() => setIsVideoOpen(false)}
            className="absolute left-4 top-4 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/95 text-[#0f172a] shadow-[0_10px_30px_rgba(0,0,0,0.32)] transition hover:bg-white"
            aria-label="Close video"
          >
            <X className="h-6 w-6" strokeWidth={2.2} />
          </button>
          <video
            className="h-[100svh] w-full bg-black object-contain"
            controls
            autoPlay
            playsInline
            preload="auto"
            aria-label="Be More Promotable product walkthrough"
          >
            <source src={bclProductVideoSources.webm} type="video/webm" />
            <source src={bclProductVideoSources.mp4} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : null}
    </div>
  );
};

const DiagnosticContextScreen = ({
  targetRole,
  onTargetRoleChange,
  onBack,
  onRestart,
  onContinue,
  onSkip,
  canContinue,
}: {
  targetRole: string;
  onTargetRoleChange: (value: string) => void;
  onBack: () => void;
  onRestart: () => void;
  onContinue: () => void;
  onSkip: () => void;
  canContinue: boolean;
}) => (
  <div className="flex h-full min-h-[680px] w-full justify-center bg-[#eef4ff] md:min-h-0 md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full w-full max-w-full md:max-w-[640px] lg:max-w-[760px] flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:rounded-[4px] md:border md:border-[#d8e4f6]">
      <div className="scrollbar-hide flex min-h-0 flex-1 flex-col overflow-y-auto px-8 pb-5">
        <BclHeader />
        <div className="overflow-hidden bg-[#f7fbff]">
          <img src="/diagnostic/context-mountain.png" alt="Mountain path with flag" className="aspect-[300/193] h-auto w-full object-cover" />
        </div>

        <section className="mt-6 rounded-[4px] bg-white px-3 pb-4 pt-3">
          <div className="flex items-center gap-2">
            <img src="/diagnostic/context-sto-avatar.png" alt="Sto" className="h-[50px] w-[50px] rounded-[2px] object-cover" />
            <div>
              <p className="font-gotham text-[14px] font-bold leading-[16px] text-[#0057c8]">Sto says</p>
              <p className="font-gotham text-[9px] font-normal leading-[12px] text-[#8b8b8b]">Your Guide</p>
            </div>
          </div>

          <h1 className="mt-2 max-w-[14ch] font-quattrocento text-[23px] font-bold leading-[1.03] text-[#242424]">
            What are you hoping changes in your career next?
          </h1>
          <p className="mt-[17px] font-gotham text-[14px] font-normal leading-[1.45] text-[#242424]">
            This helps Sto understand what progress would look like for you.
          </p>
          <textarea
            value={targetRole}
            onChange={(event) => onTargetRoleChange(event.target.value)}
            placeholder="E.g. 'I want to become Senior Manager' or 'I want my work to matter more.'"
            className="mt-[17px] min-h-[61px] w-full resize-none rounded-[4px] border border-[#e4e4e4] bg-white px-3 py-3 font-gotham text-[14px] font-normal leading-[1.35] text-[#242424] outline-none transition placeholder:text-[#4f4f4f] focus:border-[#0057c8] focus:placeholder:text-transparent"
          />
        </section>

        <div className="mx-[33px] mt-[17px] flex flex-col gap-4">
          <button
            type="button"
            disabled={!canContinue}
            onClick={onContinue}
            className="min-h-[48px] w-full cursor-pointer rounded-[6px] border border-[#0057c8] bg-[#0057c8] px-5 font-gotham text-[17px] font-medium text-white transition hover:bg-[#0A57C6] disabled:cursor-not-allowed disabled:border-[#c6d4ea] disabled:bg-[#d1d5db]"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={onSkip}
            className="min-h-[48px] w-full cursor-pointer rounded-[6px] border border-[#0057c8] bg-white px-5 font-gotham text-[17px] font-medium text-[#0057c8] transition hover:bg-[#f8fbff]"
          >
            Skip for now
          </button>
        </div>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" onClick={onBack} className="cursor-pointer font-bold text-[#0057c8]">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const selectedSituationImages: Partial<Record<Q1OptionId, string>> = {
  hard_work: "/diagnostic-cards/hard-work.png",
  invisible: "/diagnostic/selected-invisible.png",
  missed_opportunity: "/diagnostic/selected-opportunity.png",
  self_doubt: "/diagnostic/selected-self-doubt.png",
};

const DiagnosticStageProgress = () => {
  return null;
};

const StoPromptHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex items-start gap-3 text-left ${className}`}>
    <img src="/diagnostic/context-sto-avatar.png" alt="Sto" className="h-[50px] w-[50px] shrink-0 rounded-full object-cover" />
    <div className="min-w-0 pt-[2px]">
      <p className="font-gotham text-[14px] font-bold leading-[17px] text-[#0057c8]">Sto</p>
      <div className="mt-[6px] inline-block max-w-full rounded-[6px] border border-[#7dafff] bg-white px-2.5 py-[5px] font-gotham text-[10px] font-normal leading-[13px] text-[#0057c8]">
        {children}
      </div>
    </div>
  </div>
);

const DiagnosticStoNote = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`mt-[20px] flex items-center gap-3 rounded-[4px] bg-[#fffdf9] px-4 py-[14px] shadow-[0_2px_8px_rgba(15,23,42,0.18)] ${className}`}>
    <img src="/diagnostic/context-sto-avatar.png" alt="Sto" className="h-[50px] w-[50px] shrink-0 rounded-full object-cover" />
    <p className="font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
      <span className="font-bold text-[#0057c8]">Sto&apos;s note:</span> {children}
    </p>
  </section>
);

const DiagnosticEmpathyScreen = ({
  selectedLabel,
  selectedImage,
  empathySentences,
  onContinue,
  onBack,
  onRestart,
}: {
  selectedLabel: string;
  selectedImage?: string;
  empathySentences: string[];
  onContinue: () => void;
  onBack: () => void;
  onRestart: () => void;
}) => (
  <div className="flex h-full min-h-[680px] w-full justify-center bg-[#eef4ff] md:min-h-0 md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full w-full max-w-full md:max-w-[640px] lg:max-w-[760px] flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:rounded-[4px] md:border md:border-[#d8e4f6]">
      <div className="scrollbar-hide flex min-h-0 flex-1 flex-col overflow-y-auto px-8 pb-5">
        <BclHeader />
        <div className="flex items-center gap-2">
          <div className="flex h-[36px] min-w-[91px] items-center justify-center rounded-[4px] bg-[#f5f7fb] px-2 font-gotham text-[12px] font-bold leading-none text-[#0057c8] md:h-[46px]">
            You selected
          </div>
          <div className="flex min-h-[36px] flex-1 items-center gap-2 rounded-[4px] bg-[#fbfaf8] px-2 md:min-h-[46px] md:gap-3">
            {selectedImage ? <img src={selectedImage} alt="" className="h-[29px] w-[45px] object-cover md:h-[40px] md:w-[62px]" aria-hidden /> : null}
            <span className="font-gotham text-[13px] font-normal leading-[15px] text-[#242424]">{selectedLabel}</span>
          </div>
        </div>

        <section className="mt-[30px] rounded-[4px] bg-white px-5 pb-[27px] pt-5 shadow-[0_2px_12px_rgba(15,23,42,0.12)]">
          <div className="flex items-center gap-2">
            <img src="/diagnostic/context-sto-avatar.png" alt="Sto" className="h-[50px] w-[50px] rounded-full object-cover" />
            <div>
              <p className="font-gotham text-[14px] font-bold leading-[16px] text-[#0057c8]">Sto says</p>
              <p className="font-gotham text-[9px] font-normal leading-[12px] text-[#8b8b8b]">Your Guide</p>
            </div>
          </div>

          <div className="mt-[24px] space-y-[26px]">
            {empathySentences.map((sentence) => (
              <p key={sentence} className="font-quattrocento text-[23px] font-bold leading-[1.03] text-[#242424]">
                {sentence}
              </p>
            ))}
          </div>
          <div className="mt-[31px] h-px w-full bg-[#c7d8f9]" />
          <p className="mt-[20px] font-quattrocento text-[23px] font-bold leading-[1.03] text-[#0057c8]">
            Let&apos;s go one layer deeper.
          </p>
        </section>

        <button
          type="button"
          onClick={onContinue}
          className="mx-[33px] mt-[39px] inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-8 rounded-[6px] bg-[#0057c8] px-5 font-gotham text-[17px] font-medium text-white transition hover:bg-[#0A57C6]"
        >
          Continue
          <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
        </button>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" onClick={onBack} className="cursor-pointer font-bold text-[#0057c8]">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const DiagnosticNotConsideredFormulaScreen = ({
  onContinue,
  onBack,
  onRestart,
}: {
  onContinue: () => void;
  onBack: () => void;
  onRestart: () => void;
}) => (
  <div className="flex h-full min-h-[680px] w-full justify-center bg-white md:min-h-0 md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full w-full max-w-full flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:max-w-[640px] md:rounded-[4px] md:border md:border-[#d8e4f6] lg:max-w-[760px]">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 md:px-8">
        <BclHeader />
        <div className="shrink-0">
          <DiagnosticStageProgress />
        </div>

      <section className="relative mx-auto mt-[20px] min-h-[140px] w-full max-w-[338px] shrink-0 overflow-visible rounded-[4px] border border-[#c7d8f9] bg-white pb-[15px] pt-[47px] shadow-[0_2px_8px_rgba(15,23,42,0.12)] md:max-w-none">
        <div className="absolute inset-x-0 top-0 h-[34px] rounded-t-[4px] bg-[#0057c8]" />
        <img
          src="/diagnostic/not-considered-badge.png"
          alt=""
          className="absolute left-1/2 top-[-23px] z-10 h-[46px] w-[46px] -translate-x-1/2 object-contain"
          aria-hidden
        />
        <div className="flex items-center gap-[18px] px-[18px] md:gap-5 md:px-8">
          <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full md:h-[48px] md:w-[48px]">
            <img src="/diagnostic/not-considered-person.png" alt="" className="h-[40px] w-[40px] object-contain md:h-[48px] md:w-[48px]" aria-hidden />
          </div>
          <div className="min-w-0 pt-1">
            <h1 className="font-quattrocento text-[18px] font-bold leading-[20px] text-[#242424] md:text-[22px] md:leading-[24px]">I was not even considered</h1>
            <p className="mt-[4px] font-gotham text-[11px] font-normal leading-[14px] text-[#242424] md:mt-[6px] md:text-[13px] md:leading-[17px]">
              You were not discussed, shortlisted, or seen as a contender.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-[22px] shrink-0 rounded-[4px] bg-white px-[18px] pb-[20px] pt-[12px] text-center shadow-[0_2px_12px_rgba(15,23,42,0.12)]">
        <img src="/diagnostic/insight-bulb.png" alt="" className="mx-auto h-[55px] w-[55px] object-contain" aria-hidden />
        <h2 className="mt-[10px] font-quattrocento text-[23px] font-bold leading-[1.03] text-[#242424]">
          What this usually means
        </h2>
        <div className="mt-[14px] rounded-[4px] bg-[#eef4ff] px-3 py-[9px] font-gotham text-[12px] font-semibold leading-none text-[#0057c8]">
          To be considered = Performance x Visibility
        </div>
        <div className="mt-[17px] flex items-center justify-center gap-[11px]">
          <div className="flex h-[36px] min-w-[118px] items-center justify-center rounded-[4px] border border-[#e4e4e4] bg-white px-3 font-gotham text-[12px] font-bold text-[#4b4b4b]">
            Performance
          </div>
          <span className="font-gotham text-[16px] font-normal text-[#0057c8]">x</span>
          <div className="flex h-[36px] min-w-[118px] items-center justify-center rounded-[4px] border border-[#7dafff] bg-[#f7fbff] px-3 font-gotham text-[12px] font-bold text-[#0057c8]">
            Visibility
          </div>
        </div>
        <p className="mx-auto mt-[17px] max-w-[240px] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
          You may be delivering. But if the value is <span className="font-bold text-[#0057c8]">not visible</span>, you don&apos;t enter the conversation.
        </p>
      </section>

      <DiagnosticStoNote className="mt-[22px] shrink-0">
        This insight is based on your selection. The next step will help uncover what&apos;s holding your visibility back-- and what to do about it.
      </DiagnosticStoNote>

        <button
          type="button"
          onClick={onContinue}
          className="mt-[21px] min-h-[48px] w-full shrink-0 cursor-pointer rounded-[6px] bg-[#0057c8] px-3 font-gotham text-[17px] font-medium text-white transition hover:bg-[#0A57C6]"
        >
          See what&apos;s happening with visibility
        </button>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" onClick={onBack} className="cursor-pointer font-bold text-[#0057c8]">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const DecisionContextPill = ({ icon, label, wide = false }: { icon: string; label: string; wide?: boolean }) => (
  <div className={`flex min-h-[34px] items-center justify-center gap-3 rounded-[4px] border border-[#e8dfd6] bg-[#fbf8f4] px-3 ${wide ? "col-span-2" : ""}`}>
    <img src={icon} alt="" className="h-[15px] w-[15px] object-contain" aria-hidden />
    <span className="font-gotham text-[12px] font-bold leading-[14px] text-[#4b4b4b]">{label}</span>
  </div>
);

const DecisionCheckScreen = ({
  onBack,
  onRestart,
  onContinue,
}: {
  onBack: () => void;
  onRestart: () => void;
  onContinue: () => void;
}) => (
  <div className="flex h-full min-h-[720px] w-full justify-center bg-[#eef4ff] md:min-h-0 md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full w-full max-w-full md:max-w-[640px] lg:max-w-[760px] flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:rounded-[4px] md:border md:border-[#d8e4f6]">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-8 pb-5">
        <BclHeader />
        <StoPromptHeader>The main signals are in place.</StoPromptHeader>

        <p className="mt-[19px] font-gotham text-[16px] font-bold leading-none text-[#0057c8]">Deeper decision read</p>
        <h1 className="mt-[10px] max-w-[12ch] font-quattrocento text-[30px] font-bold leading-[1.03] text-[#242424]">
          So this needs a deeper read.
        </h1>
        <p className="mt-[13px] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
          Your sponsor has power. They&apos;re willing to back you. And your current work already shows evidence of the next level. If growth still hasn&apos;t moved, the reason may sit in the decision context around you.
        </p>

        {["Sponsor has power", "Sponsor will back you", "Work shows next level"].map((label) => (
          <div key={label} className="mt-[6px] flex min-h-[36px] items-center gap-4 rounded-[4px] border border-[#b8d4ff] bg-[#eef4ff] px-3">
            <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 border-[#1677ff] text-[#1677ff]">
              <Check className="h-[13px] w-[13px]" strokeWidth={2.8} />
            </span>
            <span className="font-gotham text-[14px] font-bold leading-none text-[#3a3a3a]">{label}</span>
          </div>
        ))}

        <section className="mt-[16px] rounded-[4px] bg-[#fffdf9] px-[15px] pb-[12px] pt-[17px] text-center shadow-[0_2px_10px_rgba(15,23,42,0.18)]">
          <img src="/diagnostic/decision-search.png" alt="" className="mx-auto h-[62px] w-[62px] object-contain" aria-hidden />
          <h2 className="mt-[12px] font-quattrocento text-[24px] font-bold leading-none text-[#242424]">Decision Context</h2>
          <div className="mt-[24px] grid grid-cols-2 gap-[6px_12px]">
            <DecisionContextPill icon="/diagnostic/decision-timing.png" label="Timing" />
            <DecisionContextPill icon="/diagnostic/decision-politics.png" label="Politics" />
            <DecisionContextPill icon="/diagnostic/decision-role.png" label="Role availability" />
            <DecisionContextPill icon="/diagnostic/decision-stakeholder.png" label="Stakeholder alignment" />
            <DecisionContextPill icon="/diagnostic/decision-hidden.png" label="Hidden criteria" wide />
          </div>
        </section>

        <p className="mt-[25px] text-center font-gotham text-[12px] font-normal leading-none text-[#242424]">
          This is better understood in conversation.
        </p>
        <button
          type="button"
          onClick={onContinue}
          className="mt-[22px] min-h-[48px] w-full cursor-pointer rounded-[6px] bg-[#0057c8] px-5 font-gotham text-[17px] font-medium text-white transition hover:bg-[#0A57C6] disabled:cursor-not-allowed disabled:bg-[#9dbbe8]"
        >
          This needs a deeper read
        </button>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" onClick={onBack} className="cursor-pointer font-bold text-[#0057c8]">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const StoryOfWorkScreen = ({
  onBack,
  onRestart,
  onContinue,
}: {
  onBack: () => void;
  onRestart: () => void;
  onContinue: () => void;
}) => (
  <div className="flex h-full min-h-[720px] w-full justify-center bg-[#eef4ff] md:min-h-0 md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full w-full max-w-full md:max-w-[640px] lg:max-w-[760px] flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:rounded-[4px] md:border md:border-[#d8e4f6]">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 md:px-8">
        <BclHeader />
        <DiagnosticStageProgress />

        <StoPromptHeader className="mt-[27px]">I know what&apos;s missing.</StoPromptHeader>

        <section className="mt-[20px] rounded-[4px] bg-white px-5 pb-[23px] pt-[16px] shadow-[0_2px_12px_rgba(15,23,42,0.12)]">
          <p className="font-gotham text-[16px] font-bold leading-none text-[#0057c8]">Story of the work</p>
          <h1 className="mt-[11px] max-w-[18ch] font-quattrocento text-[30px] font-bold leading-[1.03] text-[#242424]">
            Your work is solid. Its story isn&apos;t travelling.
          </h1>
          <p className="mt-[17px] max-w-[38ch] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
            The missing link is how your work gets translated into leadership value.
          </p>

          <div className="relative mt-[22px] min-h-[155px]">
            <div className="absolute left-[178px] top-[6px] w-[82px] font-gotham text-[10px] font-normal leading-[13px] text-[#0057c8] md:left-[398px]">
              Telling better story of work will fix it
            </div>
            <svg className="absolute left-[152px] top-[20px] h-[64px] w-[46px] text-[#1677ff] md:left-[390px]" viewBox="0 0 46 64" fill="none" aria-hidden>
              <path d="M36 4C11 10 4 33 18 52" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M13 48L18 54L24 49" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div className="absolute inset-x-0 bottom-0 grid grid-cols-[minmax(48px,1fr)_12px_minmax(48px,1fr)_12px_minmax(56px,1.1fr)_12px_minmax(48px,1fr)] items-start">
              <div className="text-center">
                <div className="mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#e8dfd6] bg-[#fbf8f4]">
                  <img src="/diagnostic/story-work.png" alt="" className="h-[30px] w-[30px] object-contain" aria-hidden />
                </div>
                <p className="mt-[8px] font-gotham text-[12px] font-normal leading-[15px] text-[#242424]">Work done</p>
              </div>
              <div className="flex justify-center pt-[22px] text-[#1677ff]"><ArrowRight className="h-4 w-4" strokeWidth={2} /></div>
              <div className="text-center">
                <div className="mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#e8dfd6] bg-[#fbf8f4]">
                  <img src="/diagnostic/story-growth.png" alt="" className="h-[30px] w-[30px] object-contain" aria-hidden />
                </div>
                <p className="mt-[8px] font-gotham text-[12px] font-normal leading-[15px] text-[#242424]">Outcome created</p>
              </div>
              <div className="flex justify-center pt-[22px] text-[#1677ff]"><ArrowRight className="h-4 w-4" strokeWidth={2} /></div>
              <div className="text-center">
                <div className="mx-auto flex h-[68px] w-[68px] items-center justify-center rounded-full border border-dashed border-[#1677ff] bg-[#eef4ff]">
                  <img src="/diagnostic/story-eye.png" alt="" className="h-[30px] w-[37px] object-contain" aria-hidden />
                </div>
                <p className="mt-[3px] font-gotham text-[12px] font-bold leading-[15px] text-[#0057c8]">Leadership value</p>
              </div>
              <div className="flex justify-center pt-[22px] text-[#1677ff]"><ArrowRight className="h-4 w-4" strokeWidth={2} /></div>
              <div className="text-center">
                <div className="mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#e8dfd6] bg-[#fbf8f4]">
                  <img src="/diagnostic/story-trophy.png" alt="" className="h-[32px] w-[32px] object-contain" aria-hidden />
                </div>
                <p className="mt-[8px] font-gotham text-[12px] font-normal leading-[15px] text-[#242424]">Promotion story</p>
              </div>
            </div>
          </div>

          <div className="mt-[24px] border-t border-dashed border-[#7dafff] pt-[20px]">
            <div className="flex items-center gap-3">
              <img src="/diagnostic/story-spark.png" alt="" className="h-[24px] w-[24px] shrink-0 object-contain" aria-hidden />
              <p className="font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
                Inside <span className="font-bold text-[#0057c8]">Be More Promotable</span>, we help you turn work into visible value.
              </p>
            </div>
          </div>
        </section>

        <DiagnosticStoNote>Leadership value is what turns good work into promotion momentum.</DiagnosticStoNote>

        <button
          type="button"
          onClick={onContinue}
          className="mt-[21px] min-h-[48px] w-full cursor-pointer rounded-[6px] bg-[#0057c8] px-5 font-gotham text-[17px] font-medium text-white transition hover:bg-[#0A57C6]"
        >
          Show me the full picture
        </button>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" onClick={onBack} className="cursor-pointer font-bold text-[#0057c8]">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const StoryOfContributionScreen = ({
  onBack,
  onRestart,
  onContinue,
}: {
  onBack: () => void;
  onRestart: () => void;
  onContinue: () => void;
}) => (
  <div className="flex h-full min-h-[720px] w-full justify-center bg-[#eef4ff] md:min-h-0 md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full w-full max-w-full md:max-w-[640px] lg:max-w-[760px] flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:rounded-[4px] md:border md:border-[#d8e4f6]">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 md:px-8">
        <BclHeader />
        <DiagnosticStageProgress />

        <section className="mt-[16px] rounded-[4px] bg-white px-[16px] pb-[23px] pt-[14px] text-center shadow-[0_2px_12px_rgba(15,23,42,0.12)]">
          <StoPromptHeader>I know what&apos;s missing.</StoPromptHeader>

          <h1 className="mx-auto mt-[16px] max-w-[18ch] font-quattrocento text-[30px] font-bold leading-[1.03] text-[#242424]">
            The work is visible. Your contribution isn&apos;t travelling upward.
          </h1>
          <p className="mx-auto mt-[17px] max-w-[36ch] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
            The project succeeds, but leadership doesn&apos;t clearly connect the credit to you.
          </p>

          <div className="mt-[26px] grid grid-cols-[minmax(82px,92px)_14px_minmax(70px,82px)_14px_minmax(82px,92px)] items-start justify-center">
            <div className="text-center">
              <div className="mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-full border border-dashed border-[#1677ff] bg-[#eef4ff]">
                <img src="/diagnostic/contribution-you.png" alt="" className="h-[30px] w-[30px] object-contain" aria-hidden />
              </div>
              <p className="mt-[8px] font-gotham text-[12px] font-bold leading-[15px] text-[#0057c8]">Your contribution</p>
            </div>
            <div className="flex justify-center pt-[22px] text-[#1677ff]"><ArrowRight className="h-4 w-4" strokeWidth={2} /></div>
            <div className="text-center">
              <div className="relative mx-auto flex h-[74px] w-[74px] items-center justify-center rounded-full border border-[#e8dfd6] bg-[#fbf8f4]">
                <img src="/diagnostic/contribution-credit.png" alt="" className="h-[38px] w-[38px] object-contain" aria-hidden />
                <span className="absolute right-0 top-0 flex h-[20px] w-[20px] items-center justify-center rounded-full border border-[#c68432] bg-[#fbf8f4] font-gotham text-[16px] leading-none text-[#c68432]">
                  x
                </span>
              </div>
              <p className="mt-[4px] font-gotham text-[12px] font-normal leading-[15px] text-[#8b5f23]">
                Credit signal
                <br />
                <span className="font-bold text-[#c68432]">weak</span>
              </p>
            </div>
            <div className="flex justify-center pt-[22px] text-[#c68432]"><ArrowRight className="h-4 w-4" strokeWidth={2} /></div>
            <div className="text-center">
              <div className="mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-full border border-dashed border-[#1677ff] bg-[#eef4ff]">
                <img src="/diagnostic/contribution-leadership.png" alt="" className="h-[30px] w-[36px] object-contain" aria-hidden />
              </div>
              <p className="mt-[8px] font-gotham text-[12px] font-bold leading-[15px] text-[#0057c8]">Leadership</p>
            </div>
          </div>

          <p className="mx-auto mt-[19px] max-w-[36ch] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
            This is why good work can stay detached from your name.
          </p>
          <div className="mt-[17px] border-t border-dashed border-[#7dafff] pt-[17px]">
            <p className="mx-auto max-w-[38ch] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
              Inside Be More Promotable, we help you build your <span className="font-bold text-[#0057c8]">Story of Contribution</span> so leadership connects the outcome back to you.
            </p>
          </div>
        </section>

        <DiagnosticStoNote>Important work helps only when your name travels with it.</DiagnosticStoNote>

        <button
          type="button"
          onClick={onContinue}
          className="mt-[21px] min-h-[48px] w-full cursor-pointer rounded-[6px] bg-[#0057c8] px-5 font-gotham text-[17px] font-medium text-white transition hover:bg-[#0A57C6]"
        >
          Show me the full picture
        </button>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" onClick={onBack} className="cursor-pointer font-bold text-[#0057c8]">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const ImposterSyndromeScreen = ({
  onBack,
  onRestart,
  onContinue,
}: {
  onBack: () => void;
  onRestart: () => void;
  onContinue: () => void;
}) => (
  <div className="flex h-full min-h-[720px] w-full justify-center bg-[#eef4ff] md:min-h-0 md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full w-full max-w-full md:max-w-[640px] lg:max-w-[760px] flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:rounded-[4px] md:border md:border-[#d8e4f6]">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 md:px-8">
        <BclHeader />
        <DiagnosticStageProgress />

        <section className="mt-[16px] rounded-[4px] bg-white px-[16px] pb-[21px] pt-[12px] text-center shadow-[0_2px_12px_rgba(15,23,42,0.12)]">
          <StoPromptHeader>I think I see why you stayed silent.</StoPromptHeader>

          <h1 className="mx-auto mt-[15px] max-w-[18ch] font-quattrocento text-[30px] font-bold leading-[1.03] text-[#242424]">
            You wanted growth. But asking for it felt loaded.
          </h1>
          <p className="mx-auto mt-[17px] max-w-[36ch] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
            Not because you don&apos;t want the promotion. Because part of you may still be questioning whether you&apos;re ready to claim it.
          </p>

          <div className="mt-[26px] grid grid-cols-[minmax(58px,68px)_16px_minmax(70px,82px)_16px_minmax(58px,68px)] items-start justify-center">
            <div className="text-center">
              <div className="mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-full border border-dashed border-[#1677ff] bg-[#eef4ff]">
                <img src="/diagnostic/imposter-growth.png" alt="" className="h-[30px] w-[30px] object-contain" aria-hidden />
              </div>
              <p className="mt-[8px] font-gotham text-[12px] font-bold leading-[15px] text-[#0057c8]">Growth desire</p>
            </div>
            <div className="flex justify-center pt-[22px] text-[#1677ff]"><ArrowRight className="h-4 w-4" strokeWidth={2} /></div>
            <div className="text-center">
              <div className="mx-auto flex h-[74px] w-[74px] items-center justify-center rounded-full border border-[#e8dfd6] bg-[#fbf8f4]">
                <img src="/diagnostic/imposter-self-doubt.png" alt="" className="h-[38px] w-[38px] object-contain" aria-hidden />
              </div>
              <p className="mt-[4px] font-gotham text-[12px] font-bold leading-[15px] text-[#c68432]">Self-doubt</p>
            </div>
            <div className="flex justify-center pt-[22px] text-[#c68432]"><ArrowRight className="h-4 w-4" strokeWidth={2} /></div>
            <div className="text-center">
              <div className="mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-full border border-dashed border-[#1677ff] bg-[#eef4ff]">
                <img src="/diagnostic/imposter-missing-ask.png" alt="" className="h-[30px] w-[30px] object-contain" aria-hidden />
              </div>
              <p className="mt-[8px] font-gotham text-[12px] font-bold leading-[15px] text-[#0057c8]">Missing ask</p>
            </div>
          </div>

          <p className="mx-auto mt-[22px] max-w-[31ch] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
            This is often called <span className="font-bold text-[#0057c8]">Imposter Syndrome</span> - when capable people wait for more proof before they ask.
          </p>
          <div className="mt-[17px] border-t border-dashed border-[#7dafff] pt-[17px]">
            <p className="mx-auto max-w-[31ch] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
              Inside Be More Promotable, we help you bridge this gap so you can position yourself for growth with clarity.
            </p>
          </div>
        </section>

        <button
          type="button"
          onClick={onContinue}
          className="mt-[24px] min-h-[48px] w-full cursor-pointer rounded-[6px] bg-[#0057c8] px-5 font-gotham text-[17px] font-medium text-white transition hover:bg-[#0A57C6]"
        >
          Show me the full picture
        </button>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" onClick={onBack} className="cursor-pointer font-bold text-[#0057c8]">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const ImportanceMobileScreen = ({
  onBack,
  onRestart,
  onYes,
  onNo,
}: {
  onBack: () => void;
  onRestart: () => void;
  onYes: () => void;
  onNo: () => void;
}) => (
  <div className="flex h-full min-h-[680px] w-full justify-center bg-[#eef4ff] md:min-h-0 md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full w-full max-w-full md:max-w-[640px] lg:max-w-[760px] flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:rounded-[4px] md:border md:border-[#d8e4f6]">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-8 pb-5">
        <BclHeader />
        <DiagnosticStageProgress />

        <section className="mt-[16px] rounded-[4px] bg-white px-[16px] pb-[20px] pt-[19px] text-center shadow-[0_2px_12px_rgba(15,23,42,0.12)]">
          <div className="mx-auto grid max-w-[270px] grid-cols-[86px_1fr_86px] items-start gap-4">
            <div className="text-center">
              <div className="mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-full border border-dashed border-[#1677ff] bg-[#eef4ff]">
                <img src="/diagnostic/importance-leadership.png" alt="" className="h-[30px] w-[30px] object-contain" aria-hidden />
              </div>
              <p className="mt-[10px] whitespace-nowrap font-gotham text-[12px] font-bold leading-none text-[#0057c8]">Leadership</p>
            </div>
            <div className="pt-[29px]">
              <ArrowRight className="h-6 w-full text-[#1677ff]" strokeWidth={1.8} />
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-full border border-dashed border-[#1677ff] bg-[#eef4ff]">
                <img src="/diagnostic/importance-project.png" alt="" className="h-[30px] w-[30px] object-contain" aria-hidden />
              </div>
              <p className="mt-[10px] whitespace-nowrap font-gotham text-[12px] font-bold leading-none text-[#0057c8]">Project</p>
            </div>
          </div>

          <h1 className="mx-auto mt-[24px] max-w-[18ch] font-quattrocento text-[30px] font-bold leading-[1.03] text-[#242424]">
            Does leadership care about this work?
          </h1>
          <p className="mx-auto mt-[17px] max-w-[36ch] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
            Is the project seen as important by leaders who influence promotion decisions?
          </p>
        </section>

        <div className="mt-[21px] space-y-[14px] text-left">
          <button
            type="button"
            onClick={onYes}
            className="flex min-h-[78px] w-full cursor-pointer items-center gap-4 rounded-[6px] border border-[#7dafff] bg-[#eef4ff] px-5 py-[10px] text-left transition hover:border-[#0057c8]"
          >
            <span className="flex h-[58px] w-[58px] shrink-0 items-center justify-center">
              <img
                src="/diagnostic/manager-early-yes-icon.png"
                alt=""
                className="h-[52px] w-[58px] object-contain"
                aria-hidden
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-quattrocento text-[24px] font-bold leading-none text-[#0057c8]">Yes</span>
              <span className="mt-[7px] block font-gotham text-[12px] font-normal leading-[15px] text-[#242424]">It&apos;s clearly important to them.</span>
            </span>
          </button>
          <button
            type="button"
            onClick={onNo}
            className="flex min-h-[78px] w-full cursor-pointer items-center gap-4 rounded-[6px] border border-[#e8dfd6] bg-[#fbf8f4] px-5 py-[10px] text-left transition hover:border-[#c68432]"
          >
            <span className="flex h-[58px] w-[58px] shrink-0 items-center justify-center">
              <img
                src="/diagnostic/manager-early-no-icon.png"
                alt=""
                className="h-[52px] w-[58px] object-contain"
                aria-hidden
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-quattrocento text-[24px] font-bold leading-none text-[#a54747]">No</span>
              <span className="mt-[7px] block font-gotham text-[12px] font-normal leading-[15px] text-[#242424]">I&apos;m not sure they see the value.</span>
            </span>
          </button>
        </div>

        <DiagnosticStoNote>Visibility works only when the work matters to people who decide.</DiagnosticStoNote>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" onClick={onBack} className="cursor-pointer font-bold text-[#0057c8]">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const DesireAskEarlyScreen = ({
  onBack,
  onRestart,
  onYes,
  onNo,
}: {
  onBack: () => void;
  onRestart: () => void;
  onYes: () => void;
  onNo: () => void;
}) => (
  <div className="flex h-full min-h-[680px] w-full justify-center bg-[#eef4ff] md:min-h-0 md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full w-full max-w-full flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:max-w-[640px] md:rounded-[4px] md:border md:border-[#d8e4f6] lg:max-w-[760px]">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-8 pb-5">
        <BclHeader />
        <DiagnosticStageProgress />

        <section className="mt-[16px] rounded-[4px] bg-white px-[16px] pb-[20px] pt-[19px] text-center shadow-[0_2px_12px_rgba(15,23,42,0.12)]">
          <div className="mx-auto grid max-w-[270px] grid-cols-[86px_1fr_86px] items-start gap-4">
            <div className="text-center">
              <div className="mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-full border border-dashed border-[#1677ff] bg-[#eef4ff] text-[#0057c8]">
                <Signal className="h-[30px] w-[30px]" strokeWidth={1.8} />
              </div>
              <p className="mt-[10px] whitespace-nowrap font-gotham text-[12px] font-bold leading-none text-[#0057c8]">Intent</p>
            </div>
            <div className="pt-[29px]">
              <ArrowRight className="h-6 w-full text-[#1677ff]" strokeWidth={1.8} />
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-full border border-dashed border-[#1677ff] bg-[#eef4ff] text-[#0057c8]">
                <Check className="h-[30px] w-[30px]" strokeWidth={2.2} />
              </div>
              <p className="mt-[10px] whitespace-nowrap font-gotham text-[12px] font-bold leading-none text-[#0057c8]">Manager knew</p>
            </div>
          </div>

          <h1 className="mx-auto mt-[24px] max-w-[19ch] font-quattrocento text-[30px] font-bold leading-[1.03] text-[#242424]">
            Did your manager know early enough?
          </h1>
          <p className="mx-auto mt-[17px] max-w-[36ch] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
            Did your manager know you were looking for the promotion before decisions started forming?
          </p>
        </section>

        <div className="mt-[21px] space-y-[14px] text-left">
          <button
            type="button"
            onClick={onYes}
            className="flex w-full cursor-pointer items-center gap-4 rounded-[6px] border border-[#7dafff] bg-[#eef4ff] px-4 py-[12px] text-left transition hover:border-[#0057c8]"
          >
            <img src="/diagnostic/manager-early-yes-icon.png" alt="" className="h-[52px] w-[58px] shrink-0 object-contain" aria-hidden />
            <span className="block">
              <span className="block font-quattrocento text-[24px] font-bold leading-none text-[#0057c8]">Yes</span>
              <span className="mt-1 block font-gotham text-[10px] font-normal leading-[13px] text-[#242424]">I had made it clear early.</span>
            </span>
          </button>
          <button
            type="button"
            onClick={onNo}
            className="flex w-full cursor-pointer items-center gap-4 rounded-[6px] border border-[#e8dfd6] bg-[#fbf8f4] px-4 py-[12px] text-left transition hover:border-[#c68432]"
          >
            <img src="/diagnostic/manager-early-no-icon.png" alt="" className="h-[52px] w-[58px] shrink-0 object-contain" aria-hidden />
            <span className="block">
              <span className="block font-quattrocento text-[24px] font-bold leading-none text-[#a54747]">No</span>
              <span className="mt-1 block font-gotham text-[10px] font-normal leading-[13px] text-[#242424]">I mentioned it late or assumed they knew.</span>
            </span>
          </button>
        </div>

        <DiagnosticStoNote>Performance shows what you did. Intent shows what you want next.</DiagnosticStoNote>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" onClick={onBack} className="cursor-pointer font-bold text-[#0057c8]">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const VisibilityDesireScreen = ({
  onBack,
  onRestart,
  onContinue,
}: {
  onBack: () => void;
  onRestart: () => void;
  onContinue: () => void;
}) => (
  <div className="flex h-full min-h-[680px] w-full justify-center bg-[#eef4ff] md:min-h-0 md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full w-full max-w-full flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:max-w-[640px] md:rounded-[4px] md:border md:border-[#d8e4f6] lg:max-w-[760px]">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 md:px-8">
        <BclHeader />
        <div className="mx-auto w-full max-w-[390px] md:max-w-none">
          <section className="rounded-[4px] bg-white px-[12px] pb-[19px] pt-[14px] text-center shadow-[0_2px_12px_rgba(15,23,42,0.12)]">
            <div className="flex items-start gap-3 text-left">
              <div className="w-[76px] shrink-0">
                <img src="/diagnostic/context-sto-avatar.png" alt="Sto" className="h-[78px] w-[58px] object-contain" />
                <p className="mt-1 whitespace-nowrap font-gotham text-[12px] font-bold leading-none text-[#0057c8]">
                  Sto <span className="text-[9px] font-normal text-[#8b8b8b]">Your Guide</span>
                </p>
              </div>
              <div className="mt-[16px] inline-flex min-h-[30px] items-center rounded-full bg-[#eef4ff] px-7 font-gotham text-[12px] font-medium text-[#0057c8]">
                Deeper Diagnosis
              </div>
            </div>

            <h1 className="mx-auto mt-[10px] max-w-[15ch] font-quattrocento text-[30px] font-bold leading-[1.03] text-[#242424]">
              You made your desire visible.
            </h1>

            <div className="mx-auto mt-[10px] space-y-[3px] font-gotham text-[10px] font-normal leading-[14px] text-[#242424]">
              <p>That matters. Many people never ask.</p>
              <p>But visibility needs more than desire.</p>
            </div>

            <div className="mt-[22px] flex items-center justify-center gap-[9px] whitespace-nowrap">
              <span className="font-quattrocento text-[18px] font-bold leading-none text-[#242424]">Visibility =</span>
              <div className="flex min-h-[70px] w-[65px] flex-col items-center justify-center rounded-[6px] border border-[#7dafff] bg-[#eef4ff] px-2 py-[8px]">
                <img src="/diagnostic/desire-visible-icon.png" alt="" className="h-[31px] w-[31px] object-contain" aria-hidden />
                <span className="mt-[6px] font-quattrocento text-[11px] font-bold leading-none text-[#242424]">Desire</span>
              </div>
              <span className="font-gotham text-[18px] font-normal leading-none text-[#0057c8]">x</span>
              <div className="flex min-h-[70px] w-[65px] flex-col items-center justify-center rounded-[6px] border border-[#e8dfd6] bg-[#fbf8f4] px-2 py-[8px]">
                <img src="/diagnostic/importance-download-icon.png" alt="" className="h-[31px] w-[31px] object-contain" aria-hidden />
                <span className="mt-[6px] font-quattrocento text-[11px] font-bold leading-none text-[#242424]">Importance</span>
              </div>
            </div>

            <p className="mx-auto mt-[28px] max-w-[31ch] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
              You can do <span className="font-bold text-[#0057c8]">strong work</span> and still be invisible if the right people don&apos;t <span className="font-bold text-[#0057c8]">connect</span> you to that work.
            </p>
          </section>

          <DiagnosticStoNote className="mt-[16px]">Desire gets you noticed. Importance gets you remembered.</DiagnosticStoNote>

          <button
            type="button"
            onClick={onContinue}
            className="mt-[18px] flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-[6px] bg-[#0057c8] px-5 font-gotham text-[17px] font-medium text-white transition hover:bg-[#0A57C6]"
          >
            <span className="flex-1">Check importance</span>
            <ArrowRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" onClick={onBack} className="cursor-pointer font-bold text-[#0057c8]">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const SponsorWillingScreen = ({
  onBack,
  onRestart,
  onYes,
  onNo,
}: {
  onBack: () => void;
  onRestart: () => void;
  onYes: () => void;
  onNo: () => void;
}) => (
  <div className="flex h-full min-h-[720px] w-full justify-center bg-[#eef4ff] md:min-h-0 md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full w-full max-w-full md:max-w-[640px] lg:max-w-[760px] flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:rounded-[4px] md:border md:border-[#d8e4f6]">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 md:px-8">
        <BclHeader />
        <DiagnosticStageProgress />

        <section className="mt-[16px] rounded-[4px] bg-white px-[16px] pb-[12px] pt-[14px] shadow-[0_2px_12px_rgba(15,23,42,0.12)]">
          <StoPromptHeader>Let&apos;s test sponsor commitment.</StoPromptHeader>

          <p className="mt-[18px] font-gotham text-[16px] font-bold leading-none text-[#0057c8]">Sponsor has power</p>
          <h1 className="mt-[8px] max-w-[18ch] font-quattrocento text-[30px] font-bold leading-[1.03] text-[#242424]">
            Your sponsor has power. But would they spend it on you?
          </h1>
          <p className="mt-[14px] max-w-[36ch] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
            Would they put their own reputation behind your promotion case?
          </p>

          <div className="mt-[10px] space-y-[16px]">
            <button
              type="button"
              onClick={onYes}
              className="w-full cursor-pointer overflow-hidden rounded-[4px] bg-[#eef4ff] text-left transition hover:bg-[#e7f0ff]"
            >
              <img src="/diagnostic/sponsor-willing-yes.png" alt="" className="aspect-[306/111] w-full object-cover" aria-hidden />
              <span className="block px-3 pb-[8px] pt-[4px]">
                <span className="block font-quattrocento text-[24px] font-bold leading-none text-[#0057c8]">Yes</span>
                <span className="mt-1 block font-gotham text-[10px] font-normal leading-[13px] text-[#242424]">
                  They would actively back me when it matters.
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={onNo}
              className="w-full cursor-pointer overflow-hidden rounded-[4px] border border-[#e8dfd6] bg-[#fbf8f4] text-left transition hover:border-[#c68432]"
            >
              <img src="/diagnostic/sponsor-willing-no.png" alt="" className="aspect-[306/111] w-full object-cover" aria-hidden />
              <span className="block px-3 pb-[8px] pt-[4px]">
                <span className="block font-quattrocento text-[24px] font-bold leading-none text-[#a54747]">No</span>
                <span className="mt-1 block font-gotham text-[10px] font-normal leading-[13px] text-[#242424]">
                  They may support me, but not risk much for me.
                </span>
              </span>
            </button>
          </div>
        </section>

        <DiagnosticStoNote className="mt-[18px]">Power helps only when someone is willing to spend it for you.</DiagnosticStoNote>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" onClick={onBack} className="cursor-pointer font-bold text-[#0057c8]">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const SponsorPowerScreen = ({
  onBack,
  onRestart,
  onYes,
  onNo,
}: {
  onBack: () => void;
  onRestart: () => void;
  onYes: () => void;
  onNo: () => void;
}) => (
  <div className="flex h-full min-h-[720px] w-full justify-center bg-[#eef4ff] md:min-h-0 md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full w-full max-w-full md:max-w-[640px] lg:max-w-[760px] flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:rounded-[4px] md:border md:border-[#d8e4f6]">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 md:px-8">
        <BclHeader />
        <DiagnosticStageProgress />

        <section className="mt-[16px] rounded-[4px] bg-white px-[16px] pb-[12px] pt-[14px] shadow-[0_2px_12px_rgba(15,23,42,0.12)]">
          <StoPromptHeader>Let&apos;s test sponsor strength.</StoPromptHeader>

          <p className="mt-[18px] font-gotham text-[16px] font-bold leading-none text-[#0057c8]">Sponsor strength check</p>
          <h1 className="mt-[8px] max-w-[18ch] font-quattrocento text-[30px] font-bold leading-[1.03] text-[#242424]">
            Does your sponsor have real power in the room where this decision gets made?
          </h1>
          <p className="mt-[14px] max-w-[35ch] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
            When they speak for you, does it meaningfully influence the outcome?
          </p>

          <div className="mt-[10px] space-y-[16px]">
            <button
              type="button"
              onClick={onYes}
              className="w-full cursor-pointer overflow-hidden rounded-[4px] bg-[#eef4ff] text-left transition hover:bg-[#e7f0ff]"
            >
              <img src="/diagnostic/sponsor-power-yes.png" alt="" className="aspect-[306/111] w-full object-cover" aria-hidden />
              <span className="block px-3 pb-[8px] pt-[4px]">
                <span className="block font-quattrocento text-[24px] font-bold leading-none text-[#0057c8]">Yes</span>
                <span className="mt-1 block font-gotham text-[10px] font-normal leading-[13px] text-[#242424]">
                  They carry real weight in that room.
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={onNo}
              className="w-full cursor-pointer overflow-hidden rounded-[4px] border border-[#e8dfd6] bg-[#fbf8f4] text-left transition hover:border-[#c68432]"
            >
              <img src="/diagnostic/sponsor-power-no.png" alt="" className="aspect-[306/111] w-full object-cover" aria-hidden />
              <span className="block px-3 pb-[8px] pt-[4px]">
                <span className="block font-quattrocento text-[24px] font-bold leading-none text-[#a54747]">No</span>
                <span className="mt-1 block font-gotham text-[10px] font-normal leading-[13px] text-[#242424]">
                  They support me, but don&apos;t have much say.
                </span>
              </span>
            </button>
          </div>
        </section>

        <DiagnosticStoNote className="mt-[18px]">A sponsor helps only if their voice carries weight when decisions are made.</DiagnosticStoNote>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" onClick={onBack} className="cursor-pointer font-bold text-[#0057c8]">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const NextLevelSignalScreen = ({
  onBack,
  onRestart,
  onYes,
  onNo,
}: {
  onBack: () => void;
  onRestart: () => void;
  onYes: () => void;
  onNo: () => void;
}) => (
  <div className="flex h-full min-h-[720px] w-full justify-center bg-[#eef4ff] md:min-h-0 md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full w-full max-w-full md:max-w-[640px] lg:max-w-[760px] flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:rounded-[4px] md:border md:border-[#d8e4f6]">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 md:px-8">
        <BclHeader />
        <DiagnosticStageProgress />

        <section className="mt-[16px] rounded-[4px] bg-white px-[16px] pb-[12px] pt-[14px] shadow-[0_2px_12px_rgba(15,23,42,0.12)]">
          <StoPromptHeader>Now let&apos;s test next-level signal.</StoPromptHeader>

          <p className="mt-[18px] font-gotham text-[16px] font-bold leading-none text-[#0057c8]">Next-level signal check</p>
          <h1 className="mt-[8px] max-w-[18ch] font-quattrocento text-[30px] font-bold leading-[1.03] text-[#242424]">
            Your sponsor is willing to back you. But does your current output already show the next level?
          </h1>
          <p className="mt-[14px] max-w-[36ch] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
            When others look at your work, does it make them believe you&apos;re ready for the role above?
          </p>

          <div className="mt-[10px] space-y-[16px]">
            <button
              type="button"
              onClick={onYes}
              className="w-full cursor-pointer overflow-hidden rounded-[4px] bg-[#eef4ff] text-left transition hover:bg-[#e7f0ff]"
            >
              <img src="/diagnostic/next-level-yes.png" alt="" className="aspect-[306/111] w-full object-cover" aria-hidden />
              <span className="block px-3 pb-[8px] pt-[4px]">
                <span className="block font-quattrocento text-[24px] font-bold leading-none text-[#0057c8]">Yes</span>
                <span className="mt-1 block font-gotham text-[10px] font-normal leading-[13px] text-[#242424]">
                  My work already signals the next level.
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={onNo}
              className="w-full cursor-pointer overflow-hidden rounded-[4px] border border-[#e8dfd6] bg-[#fbf8f4] text-left transition hover:border-[#c68432]"
            >
              <img src="/diagnostic/next-level-no.png" alt="" className="aspect-[306/111] w-full object-cover" aria-hidden />
              <span className="block px-3 pb-[8px] pt-[4px]">
                <span className="block font-quattrocento text-[24px] font-bold leading-none text-[#a54747]">No</span>
                <span className="mt-1 block font-gotham text-[10px] font-normal leading-[13px] text-[#242424]">
                  My work is solid, but it doesn&apos;t yet show the next level.
                </span>
              </span>
            </button>
          </div>
        </section>

        <DiagnosticStoNote className="mt-[18px]">Support helps only when your work already makes the next level believable.</DiagnosticStoNote>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" onClick={onBack} className="cursor-pointer font-bold text-[#0057c8]">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const BrillianceImageTrapScreen = ({
  onBack,
  onRestart,
  onContinue,
}: {
  onBack: () => void;
  onRestart: () => void;
  onContinue: () => void;
}) => (
  <div className="flex h-full min-h-[760px] w-full justify-center bg-[#eef4ff] md:min-h-0 md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full w-full max-w-full md:max-w-[640px] lg:max-w-[760px] flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:rounded-[4px] md:border md:border-[#d8e4f6]">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 md:px-8">
        <BclHeader />
        <DiagnosticStageProgress />

        <StoPromptHeader className="mt-[27px]">I think I see the gap.</StoPromptHeader>

        <section className="mt-[20px] rounded-[4px] bg-white px-[16px] pb-[15px] pt-[13px] shadow-[0_2px_12px_rgba(15,23,42,0.12)]">
          <p className="font-gotham text-[16px] font-bold leading-none text-[#0057c8]">Brilliance image trap</p>
          <h1 className="mt-[10px] max-w-[20ch] font-quattrocento text-[27px] font-bold leading-[1.03] text-[#242424]">
            You excel in your current role. But nobody can see you at the next level yet.
          </h1>
          <p className="mt-[11px] max-w-[40ch] font-gotham text-[11px] font-normal leading-[15px] text-[#242424]">
            This is the <span className="font-bold text-[#0057c8]">Brilliance Image Trap</span>. People see what you do today, not what you could do tomorrow.
          </p>

          <img src="/diagnostic/brilliance-current-role.png" alt="Current role certificate" className="mt-[12px] w-full rounded-[6px] object-contain" />

          <div className="mt-[10px] grid grid-cols-[1fr_48px_1fr] items-center gap-3">
            <div className="border-t border-dashed border-[#7dafff]" />
            <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#eef4ff] text-[#0057c8]">
              <ArrowRight className="h-6 w-6 rotate-90" strokeWidth={2.4} />
            </div>
            <div className="border-t border-dashed border-[#7dafff]" />
          </div>
          <p className="mt-[3px] text-center font-gotham text-[10px] font-bold leading-none text-[#0057c8]">The Gap</p>

          <img src="/diagnostic/brilliance-next-level.png" alt="Next level certificate" className="mt-[10px] w-full rounded-[6px] object-contain" />
        </section>

        <section className="mt-[16px] flex items-center gap-3 rounded-[4px] bg-white px-4 py-[13px] shadow-[0_2px_8px_rgba(15,23,42,0.18)]">
          <img src="/diagnostic/brilliance-tip.png" alt="" className="h-[38px] w-[38px] shrink-0 object-contain" aria-hidden />
          <p className="font-gotham text-[10px] font-normal leading-[14px] text-[#242424]">
            <span className="font-bold text-[#c68432]">A tip to break the trap</span>
            <br />
            Stop asking for feedback about your current role performance. Ask what you can do to be considered for the next level.
          </p>
        </section>

        <button
          type="button"
          onClick={onContinue}
          className="mt-[14px] min-h-[48px] w-full cursor-pointer rounded-[6px] bg-[#0057c8] px-5 font-gotham text-[17px] font-medium text-white transition hover:bg-[#0A57C6]"
        >
          Show me the full picture
        </button>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" onClick={onBack} className="cursor-pointer font-bold text-[#0057c8]">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const SponsorNetworkScreen = ({
  onBack,
  onRestart,
  onContinue,
}: {
  onBack: () => void;
  onRestart: () => void;
  onContinue: () => void;
}) => (
  <div className="flex h-full min-h-[760px] w-full justify-center bg-[#eef4ff] md:min-h-0 md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full w-full max-w-full md:max-w-[640px] lg:max-w-[760px] flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:rounded-[4px] md:border md:border-[#d8e4f6]">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 md:px-8">
        <BclHeader />
        <DiagnosticStageProgress />

        <StoPromptHeader className="mt-[27px]">I think I see the gap.</StoPromptHeader>

        <section className="mt-[20px] rounded-[4px] bg-white px-[16px] pb-[15px] pt-[13px] shadow-[0_2px_12px_rgba(15,23,42,0.12)]">
          <p className="font-gotham text-[16px] font-bold leading-none text-[#0057c8]">Sponsor gap</p>
          <h1 className="mt-[10px] max-w-[20ch] font-quattrocento text-[27px] font-bold leading-[1.03] text-[#242424]">
            You don&apos;t have enough sponsor power behind you.
          </h1>
          <p className="mt-[11px] max-w-[40ch] font-gotham text-[11px] font-normal leading-[15px] text-[#242424]">
            Without strong sponsorship, growth slows down. And relying on one sponsor is risky.
          </p>

          <div className="mt-[13px] rounded-[4px] border border-[#1677ff] bg-[#eef4ff] px-3 py-3 md:px-4">
            <div className="grid grid-cols-[88px_1fr] items-center gap-3 md:grid-cols-[128px_1fr] md:gap-6">
              <div>
                <p className="font-gotham text-[11px] font-bold leading-[14px] text-[#242424]">One sponsor</p>
                <p className="mt-1 font-gotham text-[10px] font-normal leading-[13px] text-[#242424]">Growth depends on one person.</p>
              </div>
              <div className="relative h-[68px] md:h-[82px]">
                <div className="absolute left-[17px] right-[42px] top-1/2 h-px -translate-y-1/2 bg-[#7dafff] md:left-[72px] md:right-[58px]" />
                <div className="absolute left-[14px] top-[-7px] h-[82px] w-[82px] rounded-full border border-dashed border-[#7dafff] opacity-70 md:left-[34px] md:top-0" aria-hidden />
                <div className="absolute left-[20px] top-[-1px] h-[70px] w-[70px] rounded-full border border-dashed border-[#7dafff] opacity-85 md:left-[40px] md:top-[6px]" aria-hidden />
                <div className="absolute left-[27px] top-[6px] h-[56px] w-[56px] rounded-full border border-dashed border-[#1677ff] md:left-[47px] md:top-[13px]" aria-hidden />
                <div className="absolute left-[22px] top-[2px] flex h-[64px] w-[64px] items-center justify-center rounded-full md:left-[42px] md:top-[9px]">
                  <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white">
                    <img src="/diagnostic/sponsor-network-blue.png" alt="" className="h-[26px] w-[26px]" aria-hidden />
                  </div>
                  <span className="absolute -bottom-3 font-gotham text-[8px] text-[#242424]">You</span>
                </div>
                <div className="absolute right-0 top-[12px] flex h-[44px] w-[44px] items-center justify-center rounded-full border border-[#1677ff] bg-white md:right-[8px] md:top-[19px]">
                  <img src="/diagnostic/sponsor-network-blue.png" alt="" className="h-[25px] w-[25px]" aria-hidden />
                  <span className="absolute -bottom-4 font-gotham text-[8px] text-[#242424]">Sponsor</span>
                </div>
                <span className="absolute right-[-7px] top-[-8px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#1677ff] font-gotham text-[12px] font-bold text-white md:right-[1px] md:top-[-1px]">!</span>
              </div>
            </div>
          </div>

          <div className="mt-[10px] grid grid-cols-[1fr_48px_1fr] items-center gap-3">
            <div className="border-t border-dashed border-[#7dafff]" />
            <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#eef4ff] text-[#0057c8]">
              <ArrowRight className="h-6 w-6 rotate-90" strokeWidth={2.4} />
            </div>
            <div className="border-t border-dashed border-[#7dafff]" />
          </div>
          <p className="mt-[3px] text-center font-gotham text-[10px] font-bold leading-none text-[#0057c8]">The Gap</p>

          <div className="mt-[10px] rounded-[4px] border border-[#e8dfd6] bg-[#fbf8f4] px-3 py-3 md:px-4">
            <div className="grid grid-cols-[92px_1fr] gap-2 md:grid-cols-[128px_1fr] md:gap-6">
              <div className="pt-1">
                <p className="font-gotham text-[11px] font-bold leading-[14px] text-[#242424]">Sponsor network</p>
                <p className="mt-1 font-gotham text-[10px] font-normal leading-[13px] text-[#242424]">More influence. More momentum.</p>
              </div>
              <div className="relative h-[104px] md:mx-auto md:h-[118px] md:w-[380px]">
                <svg className="absolute left-[6px] top-[2px] h-[91px] w-[145px] md:left-[78px] md:top-[6px] md:h-[100px] md:w-[220px]" viewBox="0 0 145 91" fill="none" aria-hidden>
                  <path d="M28 15L116 15L116 70L72 84L28 70Z" stroke="#c08a3e" strokeWidth="1.1" strokeDasharray="3 3" />
                  <path d="M78 45L28 15M78 45L116 15M78 45L28 70M78 45L116 70M78 45L72 84" stroke="#c08a3e" strokeWidth="1.1" />
                </svg>
                {[
                  ["Executive Sponsor", "left-[22px] top-0 md:left-[108px] md:top-[4px]"],
                  ["Senior Leader", "right-[3px] top-[2px] md:left-[242px] md:right-auto md:top-[4px]"],
                  ["Cross-functional Ally", "right-[2px] bottom-[2px] md:left-[242px] md:right-auto md:bottom-[5px]"],
                  ["Mentor", "left-[62px] bottom-0 md:left-[183px] md:bottom-[1px]"],
                  ["Influential Peer", "left-[2px] bottom-[2px] md:left-[108px] md:bottom-[5px]"],
                ].map(([label, className]) => (
                  <div key={label} className={`absolute ${className} text-center`}>
                    <div className="mx-auto flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[#c08a3e] bg-white md:h-[30px] md:w-[30px]">
                      <img src="/diagnostic/sponsor-network-gold.png" alt="" className="h-[16px] w-[16px] md:h-[18px] md:w-[18px]" aria-hidden />
                    </div>
                    <p className="mt-[2px] max-w-[45px] font-gotham text-[6px] leading-[7px] text-[#242424] md:max-w-[58px] md:text-[7px] md:leading-[8px]">{label}</p>
                  </div>
                ))}
                <div className="absolute left-[66px] top-[31px] text-center md:left-[178px] md:top-[40px]">
                  <div className="mx-auto flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[#1677ff] bg-white shadow-[0_2px_8px_rgba(0,87,200,0.12)] md:h-[40px] md:w-[40px]">
                    <img src="/diagnostic/sponsor-network-blue.png" alt="" className="h-[22px] w-[22px] md:h-[24px] md:w-[24px]" aria-hidden />
                  </div>
                  <p className="font-gotham text-[8px] leading-none text-[#0057c8]">You</p>
                </div>
                <span className="absolute right-[-2px] top-[-6px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#d7953c] text-white md:left-[273px] md:right-auto md:top-[1px]">
                  <Check className="h-[12px] w-[12px]" strokeWidth={3} />
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-[16px] flex items-center gap-3 rounded-[4px] bg-white px-4 py-[13px] shadow-[0_2px_8px_rgba(15,23,42,0.18)]">
          <img src="/diagnostic/brilliance-tip.png" alt="" className="h-[38px] w-[38px] shrink-0 object-contain" aria-hidden />
          <p className="font-gotham text-[10px] font-normal leading-[14px] text-[#242424]">
            <span className="font-bold text-[#c68432]">What changes this</span>
            <br />
            Build relationships with multiple stakeholders who can influence your career.
          </p>
        </section>

        <button
          type="button"
          onClick={onContinue}
          className="mt-[14px] min-h-[48px] w-full cursor-pointer rounded-[6px] bg-[#0057c8] px-5 font-gotham text-[17px] font-medium text-white transition hover:bg-[#0A57C6]"
        >
          Show me the full picture
        </button>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" onClick={onBack} className="cursor-pointer font-bold text-[#0057c8]">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const CommunicationFrameworkScreen = ({
  onBack,
  onRestart,
  onContinue,
}: {
  onBack: () => void;
  onRestart: () => void;
  onContinue: () => void;
}) => (
  <div className="flex h-full min-h-[720px] w-full justify-center bg-[#eef4ff] md:min-h-0 md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full w-full max-w-full flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:max-w-[640px] md:rounded-[4px] md:border md:border-[#d8e4f6] lg:max-w-[760px]">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-3 md:px-8">
        <BclHeader />
        <div className="mx-auto w-full max-w-[390px] md:max-w-none">
          <StoPromptHeader className="pl-[44px]">I think I see what&apos;s happening here.</StoPromptHeader>

          <section className="mt-[6px] rounded-[6px] border border-[#e0e0e0] bg-white px-[13px] pb-[14px] pt-[14px] shadow-[0_3px_12px_rgba(15,23,42,0.10)]">
            <p className="inline-flex rounded-full bg-[#eef4ff] px-[20px] py-[9px] font-gotham text-[11px] font-bold leading-none tracking-[-0.01em] text-[#0057c8]">
              What&apos;s really going on
            </p>
            <h1 className="mt-[17px] font-quattrocento text-[31px] font-bold leading-[1.02] text-[#242424]">
              Win Alignment Gap
            </h1>
            <p className="mt-[13px] max-w-[37ch] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
              Your sponsor has power, but won&apos;t spend it on you. That usually means one thing - your success does not yet feel like their success. This stays between us.
            </p>

            <div className="mt-[18px] flex min-h-[56px] items-center justify-center gap-[15px] rounded-[5px] border border-[#7dafff] bg-[#eef4ff] px-4 text-[#0057c8]">
              <img src="/diagnostic/alignment-growth.png" alt="" className="h-[32px] w-[32px] object-contain" aria-hidden />
              <span className="font-quattrocento text-[25px] font-bold leading-none text-[#0057c8]">Your growth</span>
            </div>

            <div className="mx-auto flex h-[39px] w-px flex-col items-center justify-center">
              <span className="h-[18px] border-l border-dashed border-[#1677ff]" />
              <span className="font-gotham text-[18px] leading-none text-[#0057c8]">x</span>
              <span className="h-[14px] border-l border-dashed border-[#1677ff]" />
            </div>

            <div className="mx-auto text-center">
              <div className="relative mx-auto flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[#e0c194] bg-[#fbf8f4]">
                <img src="/diagnostic/alignment-sponsor.png" alt="" className="h-[32px] w-[32px] object-contain" aria-hidden />
                <img src="/diagnostic/alignment-currency.png" alt="" className="absolute -right-[10px] bottom-[7px] h-[26px] w-[26px] object-contain" aria-hidden />
              </div>
              <p className="mt-[4px] font-gotham text-[11px] font-normal leading-none text-[#c68432]">Sponsor</p>
              <p className="mt-[4px] font-gotham text-[11px] font-normal leading-[14px] text-[#242424]">
                Holding back political currency
              </p>
            </div>

            <div className="mx-auto flex h-[38px] w-px flex-col items-center justify-center">
              <span className="h-[18px] border-l border-dashed border-[#1677ff]" />
              <span className="font-gotham text-[18px] leading-none text-[#0057c8]">x</span>
              <span className="h-[13px] border-l border-dashed border-[#1677ff]" />
            </div>

            <div className="flex min-h-[56px] items-center justify-center gap-[15px] rounded-[5px] border border-[#7dafff] bg-[#eef4ff] px-4 text-[#0057c8]">
              <img src="/diagnostic/alignment-trophy.png" alt="" className="h-[33px] w-[33px] object-contain" aria-hidden />
              <span className="font-quattrocento text-[25px] font-bold leading-none text-[#0057c8]">Their win</span>
            </div>
          </section>

          <div className="mt-[18px] rounded-[4px] border border-[#e0d8cf] bg-[#fffdf9] px-[18px] py-[12px] text-center font-gotham text-[12px] font-normal leading-[17px] text-[#242424] shadow-[0_2px_8px_rgba(15,23,42,0.16)]">
            If they don&apos;t see what&apos;s in it for them, they don&apos;t spend political currency.
          </div>

          <div className="mt-[11px] flex items-center gap-[15px] rounded-[4px] border border-[#e0d8cf] bg-[#fffdf9] px-[12px] py-[12px] shadow-[0_2px_8px_rgba(15,23,42,0.16)]">
            <img src="/diagnostic/alignment-spark.png" alt="" className="h-[43px] w-[43px] shrink-0 object-contain" aria-hidden />
            <div className="text-left">
              <p className="font-gotham text-[11px] font-bold leading-none text-[#c68432]">What changes this</p>
              <p className="mt-[5px] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
                Shift the conversation from asking for support to making the promotion feel like a win for them too.
              </p>
            </div>
          </div>

          <p className="mx-auto mt-[10px] max-w-[34ch] text-center font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
            Inside Better Corporate Life, we show you how to build this shift in simple steps.
          </p>

          <button
            type="button"
            onClick={onContinue}
            className="mt-[14px] min-h-[48px] w-full cursor-pointer rounded-[6px] bg-[#0057c8] px-5 font-gotham text-[17px] font-medium text-white transition hover:bg-[#0A57C6]"
          >
            Show me the full picture
          </button>
        </div>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" onClick={onBack} className="cursor-pointer font-bold text-[#0057c8]">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const DeeperDiagnosisTile = ({ icon, label }: { icon: string; label: string }) => (
  <div className="flex min-h-[58px] flex-col items-center justify-center gap-2 rounded-[4px] border border-[#e8dfd6] bg-[#fbf8f4] px-2 text-center">
    <img src={icon} alt="" className="h-[20px] w-[20px] object-contain" aria-hidden />
    <span className="font-gotham text-[11px] font-bold leading-none text-[#c68432]">{label}</span>
  </div>
);

const DeeperDiagnosisScreen = ({
  onBack,
  onRestart,
  onContinue,
}: {
  onBack: () => void;
  onRestart: () => void;
  onContinue: () => void;
}) => (
  <div className="flex h-full min-h-[720px] w-full justify-center bg-[#eef4ff] md:min-h-0 md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full w-full max-w-full md:max-w-[640px] lg:max-w-[760px] flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:rounded-[4px] md:border md:border-[#d8e4f6]">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-8 pb-5">
        <BclHeader />
        <DiagnosticStageProgress />

        <StoPromptHeader className="mt-[27px]">
          We&apos;ve ruled out the obvious visibility gaps.
        </StoPromptHeader>

        <section className="mt-[23px] rounded-[4px] bg-white px-[12px] pb-[25px] pt-[16px] text-center shadow-[0_2px_12px_rgba(15,23,42,0.12)]">
          <div className="mx-auto inline-flex min-h-[30px] items-center rounded-full bg-[#eef4ff] px-7 font-gotham text-[12px] font-medium text-[#0057c8]">
            Deeper Diagnosis
          </div>
          <h1 className="mx-auto mt-[12px] max-w-[13ch] font-quattrocento text-[30px] font-bold leading-[1.03] text-[#242424]">
            This needs a deeper <span className="text-[#0057c8]">read.</span>
          </h1>
          <p className="mx-auto mt-[14px] max-w-[31ch] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
            Your work is important. Your contribution is known. If growth still didn&apos;t happen, the issue may be deeper than visibility.
          </p>

          <div className="mt-[14px] flex justify-center gap-2">
            {["Important work", "Contribution known"].map((label) => (
              <div key={label} className="flex min-h-[30px] items-center gap-1 rounded-full bg-[#eef4ff] px-2 font-gotham text-[12px] font-medium text-[#0057c8]">
                <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 border-[#1677ff]">
                  <Check className="h-[12px] w-[12px]" strokeWidth={3} />
                </span>
                {label}
              </div>
            ))}
          </div>

          <div className="mt-[18px] grid grid-cols-[1fr_48px_1fr] items-center gap-3">
            <div className="border-t border-dashed border-[#7dafff]" />
            <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#eef4ff] text-[#0057c8]">
              <ArrowRight className="h-6 w-6 rotate-90" strokeWidth={2.4} />
            </div>
            <div className="border-t border-dashed border-[#7dafff]" />
          </div>
          <p className="mt-[8px] font-gotham text-[12px] font-bold leading-none text-[#0057c8]">What could still be missing</p>

          <div className="mx-auto mt-[17px] grid max-w-[250px] grid-cols-3 gap-[8px_7px]">
            <DeeperDiagnosisTile icon="/diagnostic/deeper-readiness.png" label="Readiness" />
            <DeeperDiagnosisTile icon="/diagnostic/deeper-trust.png" label="Trust" />
            <DeeperDiagnosisTile icon="/diagnostic/deeper-timing.png" label="Timing" />
            <div className="col-span-3 grid grid-cols-2 gap-[8px] px-[42px]">
              <DeeperDiagnosisTile icon="/diagnostic/deeper-fit.png" label="Fit" />
              <DeeperDiagnosisTile icon="/diagnostic/deeper-hidden.png" label="Hidden criteria" />
            </div>
          </div>
        </section>

        <button
          type="button"
          onClick={onContinue}
          className="mt-[29px] inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-4 rounded-[6px] bg-[#0057c8] px-5 font-gotham text-[17px] font-medium text-white transition hover:bg-[#0A57C6]"
        >
          This needs a deeper read
        </button>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" onClick={onBack} className="cursor-pointer font-bold text-[#0057c8]">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const ConsideredDecisionTableScreen = ({
  onStart,
  onBack,
  onRestart,
}: {
  onStart: () => void;
  onBack: () => void;
  onRestart: () => void;
}) => (
  <div className="flex h-full min-h-[720px] w-full justify-center bg-[#eef4ff] md:min-h-0 md:items-center md:bg-[#f7f5f2]">
    <section className="flex h-full w-full max-w-full md:max-w-[640px] lg:max-w-[760px] flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:rounded-[4px] md:border md:border-[#d8e4f6]">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 md:px-8">
        <BclHeader />
        <DiagnosticStageProgress />

        <section className="mt-[35px] rounded-[4px] bg-white px-[11px] pb-[26px] pt-[12px] text-center shadow-[0_2px_12px_rgba(15,23,42,0.12)]">
          <StoPromptHeader>Deeper Diagnosis</StoPromptHeader>

          <h1 className="mx-auto mt-[12px] max-w-[18ch] font-quattrocento text-[30px] font-bold leading-[1.03] text-[#242424]">
            You made it to the decision table. Now let&apos;s see what tipped the decision.
          </h1>
          <p className="mx-auto mt-[17px] max-w-[35ch] font-gotham text-[12px] font-normal leading-[17px] text-[#242424]">
            Being considered usually means your performance and visibility were strong enough to enter the promotion conversation. But getting picked often depends on two final signals.
          </p>

          <div className="mx-auto mt-[24px] grid w-full max-w-[286px] grid-cols-[74px_18px_82px_18px_82px] items-center">
            <div className="font-quattrocento text-[21px] font-bold leading-[1.05] text-[#242424]">
              To be
              <br />
              picked
            </div>
            <div className="font-gotham text-[18px] font-bold text-[#0057c8]">=</div>
            <div className="flex min-h-[102px] flex-col items-center justify-center rounded-[6px] border border-[#7dafff] bg-[#eef4ff] px-2">
              <img src="/diagnostic/considered-sponsor.png" alt="" className="h-[38px] w-[38px] object-contain" aria-hidden />
              <p className="mt-2 font-quattrocento text-[13px] font-bold leading-[14px] text-[#242424]">Sponsor Strength</p>
            </div>
            <div className="font-gotham text-[18px] font-bold text-[#0057c8]">x</div>
            <div className="flex min-h-[102px] flex-col items-center justify-center rounded-[6px] border border-[#e8dfd6] bg-[#fbf8f4] px-2">
              <img src="/diagnostic/considered-next-level.png" alt="" className="h-[38px] w-[38px] object-contain" aria-hidden />
              <p className="mt-2 font-quattrocento text-[12px] font-bold leading-[14px] text-[#242424]">
                <span className="whitespace-nowrap">Next-Level</span>
                <br />
                Signal
              </p>
            </div>
          </div>

          <div className="mt-[34px] space-y-[10px] text-left">
            <div className="rounded-[4px] border border-[#7dafff] bg-[#eef4ff] px-4 py-[10px]">
              <p className="font-gotham text-[13px] font-bold leading-[16px] text-[#242424]">Sponsor Strength</p>
              <p className="mt-1 font-gotham text-[10px] font-normal leading-[13px] text-[#242424]">Who goes to bat for you - and with what impact.</p>
            </div>
            <div className="rounded-[4px] border border-[#e8dfd6] bg-[#fbf8f4] px-4 py-[10px]">
              <p className="font-gotham text-[12px] font-bold leading-[16px] text-[#242424]">
                <span className="whitespace-nowrap">Next-Level</span>
                <br />
                Signal
              </p>
              <p className="mt-1 font-gotham text-[10px] font-normal leading-[13px] text-[#242424]">Whether leaders can already see you in the next role.</p>
            </div>
          </div>
        </section>

        <button
          type="button"
          onClick={onStart}
          className="mt-[24px] min-h-[48px] w-full cursor-pointer rounded-[6px] bg-[#0057c8] px-5 font-gotham text-[17px] font-medium text-white transition hover:bg-[#0A57C6]"
        >
          Start decision check
        </button>
      </div>

      <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
        <button type="button" onClick={onBack} className="cursor-pointer font-bold text-[#0057c8]">
          Back
        </button>
        <button type="button" onClick={onRestart} className="cursor-pointer font-normal text-[#242424]">
          Restart
        </button>
      </footer>
    </section>
  </div>
);

const EarlySignalChoice = ({
  tone,
  title,
  description,
  icon,
  onClick,
}: {
  tone: "yes" | "no";
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) => {
  const isYes = tone === "yes";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex min-h-[116px] cursor-pointer items-center gap-5 rounded-[14px] border bg-white px-5 py-5 text-left shadow-[0_12px_28px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 ${
        isYes ? "border-[#0057c8] hover:shadow-[0_16px_34px_rgba(10,87,198,0.12)]" : "border-[#eadcc8] hover:border-[#d9c4a8]"
      }`}
    >
      <span className={`flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full ${isYes ? "bg-[#f3eadf] text-[#b27622]" : "bg-[#f1f3f6] text-[#526177]"}`}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-quattrocento text-[28px] font-bold leading-none text-[#242424]">{title}</span>
        <span className="mt-2 block max-w-[29ch] font-gotham text-[14px] font-medium leading-5 text-[#242424]">{description}</span>
      </span>
      <ArrowRight className={`h-6 w-6 shrink-0 transition group-hover:translate-x-1 ${isYes ? "text-[#0057c8]" : "text-[#8c98aa]"}`} />
    </button>
  );
};

const ImportanceChoice = ({
  tone,
  title,
  description,
  onClick,
}: {
  tone: "yes" | "no";
  title: string;
  description: string;
  onClick: () => void;
}) => {
  const isYes = tone === "yes";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex min-h-[86px] cursor-pointer items-center gap-4 rounded-[6px] border px-5 py-4 text-left transition hover:-translate-y-0.5 ${
        isYes
          ? "border-[#7dafff] bg-[#eef4ff] hover:border-[#0057c8] hover:shadow-[0_14px_30px_rgba(10,87,198,0.10)]"
          : "border-[#e8dfd6] bg-[#fbf8f4] hover:border-[#c68432] hover:shadow-[0_14px_30px_rgba(198,132,50,0.10)]"
      }`}
    >
      <span className="flex h-[58px] w-[58px] shrink-0 items-center justify-center">
        <img
          src={isYes ? "/diagnostic/manager-early-yes-icon.png" : "/diagnostic/manager-early-no-icon.png"}
          alt=""
          className="h-[52px] w-[58px] object-contain"
          aria-hidden
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block font-quattrocento text-[24px] font-bold leading-none ${isYes ? "text-[#0057c8]" : "text-[#a54747]"}`}>{title}</span>
        <span className="mt-[7px] block font-gotham text-[12px] font-normal leading-[15px] text-[#242424]">{description}</span>
      </span>
    </button>
  );
};

const OwnershipCheckPanel = () => (
  <section className="mx-auto w-full max-w-[980px] rounded-[16px] border border-[#d8e4f6] bg-white px-6 py-7 text-center shadow-[0_12px_30px_rgba(15,23,42,0.05)] md:px-8">
    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#eef4ff]">
      <img src="/diagnostic/ownership-check-badge.png" alt="" className="h-[26px] w-[26px] object-contain" aria-hidden />
    </div>
    <p className="mt-3 font-gotham text-[12px] font-bold text-[#0057c8]">Ownership check</p>
    <div className="mx-auto mt-4 grid max-w-[430px] grid-cols-[82px_1fr_82px] items-center gap-4 text-[#0057c8]">
      <div className="flex flex-col items-center gap-2">
        <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-dashed border-[#b8d2ff] bg-[#f7fbff]">
          <img src="/diagnostic/ownership-check-project.png" alt="" className="h-[32px] w-[32px] object-contain" aria-hidden />
        </span>
        <span className="font-gotham text-[10px] font-normal leading-none text-[#0057c8]">Project</span>
      </div>
      <div className="flex items-center justify-center" aria-hidden>
        <div className="h-0 w-full max-w-[110px] border-t border-[#0057c8]" />
        <ArrowRight className="-ml-3 h-5 w-5 shrink-0 text-[#0057c8]" strokeWidth={1.8} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-dashed border-[#b8d2ff] bg-[#f7fbff]">
          <img src="/diagnostic/ownership-check-you.png" alt="" className="h-[29px] w-[29px] object-contain" aria-hidden />
        </span>
        <span className="font-gotham text-[10px] font-normal leading-none text-[#0057c8]">You</span>
      </div>
    </div>
    <h2 className="mx-auto mt-5 max-w-[30ch] font-quattrocento text-[30px] font-bold leading-[1.08] text-[#242424] md:text-[38px]">
      The project matters. Are you linked to it?
    </h2>
    <p className="mx-auto mt-4 max-w-[39ch] font-gotham text-[15px] font-medium leading-6 text-[#242424] md:text-[16px]">
      When leaders think of this work, do they clearly connect it to you?
    </p>
  </section>
);

const OwnershipChoice = ({
  tone,
  title,
  description,
  onClick,
}: {
  tone: "yes" | "no";
  title: string;
  description: string;
  onClick: () => void;
}) => {
  const isYes = tone === "yes";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex min-h-[118px] cursor-pointer flex-col items-center justify-center rounded-[6px] border px-5 py-[12px] text-center transition ${
        isYes
          ? "border-[#0094ff] bg-[#eef4ff] hover:border-[#0057c8]"
          : "border-[#e8dfd6] bg-[#fbf8f4] hover:border-[#c68432]"
      }`}
    >
      <span className={`font-quattrocento text-[24px] font-bold leading-none ${isYes ? "text-[#0057c8]" : "text-[#a16f2b]"}`}>{title}</span>
      <span className="mt-[6px] max-w-[30ch] font-gotham text-[10px] font-normal leading-[13px] text-[#242424]">{description}</span>
      <img
        src={isYes ? "/diagnostic/ownership-linked-yes-icon.png" : "/diagnostic/ownership-linked-no-icon.png"}
        alt=""
        className="mt-[10px] h-[41px] w-[177px] object-contain"
        aria-hidden
      />
    </button>
  );
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
  const [sessionStartedAt, setSessionStartedAt] = useState<string | null>(null);
  const [sessionActivated, setSessionActivated] = useState(false);
  const [debouncedAnswersPayload, setDebouncedAnswersPayload] = useState<Record<string, unknown>>({});
  const [debouncedResultPayload, setDebouncedResultPayload] = useState<Record<string, unknown>>({});
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

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
  const activeDoorCtas = door ? getDoorCtas() : null;
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
            <p className="font-gotham text-[11px] font-bold uppercase tracking-[0.18em] text-[#0057c8]">Better Corporate Life</p>
            <h3 className="max-w-[12ch] font-quattrocento text-[32px] font-bold leading-[1.02] tracking-[-0.03em] text-[#242424] md:text-[44px]">
              The Corporate <span className="text-[#0057c8]">Life</span> Conversation
            </h3>
            <div className="h-[3px] w-12 rounded-full bg-[#0057c8]" />
            <p className="max-w-[38ch] font-gotham text-[16px] leading-8 text-[#242424]">
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

    if (step === "visibility_desire") {
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
        <BotMessage key="sponsor-power-question">Does your sponsor have real poer in the room where this decision gets made?</BotMessage>,
      ];
    }

    if (step === "sponsor_willing") {
      return [
        <PandaHeader key="panda" />,
        <UserChoice key="sponsor-power-yes">Yes, they do</UserChoice>,
        <BotMessage key="sponsor-willing-question">
          Your sponsor has power. But would they spend it on you?
        </BotMessage>,
      ];
    }

    if (step === "next_level") {
      return [
        <PandaHeader key="panda" />,
        <UserChoice key="sponsor-willing-yes">Yes, they would</UserChoice>,
        <BotMessage key="next-level-question">
          Your sponsor is willing to back you. But does your current output already show the next level?
        </BotMessage>,
      ];
    }

    if (step === "result" && resultCopy && door) {
      return [
        <div key="result-card" className="grid items-stretch gap-4 md:grid-cols-2">
          <section className="h-full rounded-[22px] border border-[#dce8f8] bg-white px-5 py-5 shadow-[0_14px_34px_rgba(1,75,170,0.06)] md:col-span-2 md:px-6 md:py-6">
            <p className="mb-3 font-gotham text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-[#0057c8]">
              Where you are
            </p>
            <p className="font-gotham text-[15px] leading-7 text-[#242424] md:text-[16px]">{resultCopy.summary}</p>
          </section>
          <section className="h-full rounded-[22px] border border-[#dce8f8] bg-white px-5 py-5 shadow-[0_14px_34px_rgba(1,75,170,0.06)] md:px-6 md:py-6">
            <p className="mb-3 font-gotham text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-[#0057c8]">
              What&apos;s actually hurting
            </p>
            <p className="font-gotham text-[15px] leading-7 text-[#242424] md:text-[16px]">{resultCopy.pain}</p>
          </section>
          <section className="h-full rounded-[22px] border border-[#dce8f8] bg-white px-5 py-5 shadow-[0_14px_34px_rgba(1,75,170,0.06)] md:px-6 md:py-6">
            <p className="mb-4 inline-flex rounded-full bg-[#0057c8] px-3 py-2 font-gotham text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-white">
              {resultCopy.title}
            </p>
            <h3 className="mb-3 font-quattrocento text-[22px] font-bold leading-[1.08] tracking-[-0.02em] text-[#242424]">
              Why this is happening
            </h3>
            <p className="font-gotham text-[15px] leading-7 text-[#242424] md:text-[16px]">{resultCopy.concept}</p>
          </section>
          <section className="h-full rounded-[22px] border border-[#dce8f8] bg-[linear-gradient(180deg,#ffffff_0%,#edf5ff_100%)] px-5 py-5 shadow-[0_14px_34px_rgba(1,75,170,0.08)] md:px-6 md:py-6">
            <p className="mb-3 font-gotham text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-[#0057c8]">
              What changes this
            </p>
            <p className="font-gotham text-[15px] leading-7 text-[#242424] md:text-[16px]">{resultCopy.program}</p>
          </section>
          {doorDetails[door].special ? (
            <p className="rounded-[18px] border border-[#dce8f8] bg-[#f8fbff] p-4 font-gotham text-sm font-semibold text-[#0057c8] md:col-span-2">
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
          <p className="mb-4 inline-flex rounded-full bg-[#0057c8] px-3 py-2 font-gotham text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-white">
            What&apos;s really going on
          </p>
          <h2 className="mb-3 font-quattrocento text-[30px] font-bold leading-[1.02] tracking-[-0.03em] text-[#242424] md:text-[36px]">
            {doorDetails[door].name}
          </h2>
          <p className="max-w-[58ch] font-gotham text-[15px] leading-7 text-[#242424] md:text-[17px]">{doorDetails[door].summary}</p>
        </div>,
      ];
    }

    return [<BotMessage key="fallback">Let&apos;s continue.</BotMessage>];
  }, [door, q1, resultCopy, selectedQ1, step]);

  const controlsReady = visibleMessageCount >= screenItems.length && !isTyping && controlsVisible;

  useEffect(() => {
    if (!isOpen) return;

    if (isEmbedded) {
      setVisibleMessageCount(screenItems.length);
      setControlsVisible(true);
      setIsTyping(false);
      return;
    }

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
  }, [isEmbedded, isOpen, screenItems.length, step]);

  const goTo = (nextStep: BotStep) => {
    setHistory((current) => [...current, step]);
    setStep(nextStep);
  };

  const goBack = () => {
    setHistory((current) => {
      const previous = current[current.length - 1];
      if (!previous) return current;
      setStep(previous);
      if (previous !== "door") {
        setDoor(null);
      }
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

  const callbackWhatsappHref = useMemo(() => {
    const doorName = door ? doorDetails[door].name : "my result";
    const message = encodeURIComponent(
      `Hi, I completed the Sto career diagnostic and got "${doorName}". Please request a call back for me.`,
    );
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  }, [door]);

  const { actionState, actionMessage, handlePaymentCta, resetPaymentState } = useStoPayment({
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

  const openCallModal = () => {
    if (!door) return;
    resetPaymentState();
    trackBotEvent("sto_call_clicked", {
      door,
      q1,
      placement: isEmbedded ? "diagnostic_route" : "floating_bot",
    });
    setIsCallModalOpen(true);
  };

  const openCallbackWhatsapp = () => {
    if (!door) return;
    trackBotEvent("sto_call_clicked", {
      door,
      q1,
      placement: isEmbedded ? "diagnostic_route" : "floating_bot",
      source: "full_picture_callback_cta",
    });
    window.open(callbackWhatsappHref, "_blank", "noopener,noreferrer");
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

  const renderControls = () => {
    if (step === "intro") {
      return (
        <button
          type="button"
          className="w-full cursor-pointer rounded-[18px] border border-[#0057c8] bg-[#0057c8] px-5 py-4 font-gotham text-[15px] font-bold text-white transition hover:bg-[#0A57C6] md:py-5"
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
          className="w-full cursor-pointer rounded-[12px] border border-[#0057c8] bg-[#0057c8] px-5 py-4 font-gotham text-[15px] font-bold text-white shadow-[0_12px_26px_rgba(1,75,170,0.18)] transition hover:bg-[#0A57C6] md:py-5"
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
        <button type="button" className="w-full cursor-pointer rounded-[18px] border border-[#0057c8] bg-[#0057c8] px-5 py-4 font-gotham text-[15px] font-bold text-white transition hover:bg-[#0A57C6] md:py-5" onClick={() => goTo("desire")}>
          See what&apos;s happening with visibility
        </button>
      );
    }

    if (step === "desire") {
      return (
        <div className="mx-auto max-w-[980px] space-y-5">
          <div className="grid items-stretch gap-5 md:grid-cols-2">
            <EarlySignalChoice
              tone="yes"
              title="Yes"
              description="I had made it clear early."
              icon={
                <span className="relative flex h-10 w-10 items-center justify-center">
                  <Signal className="absolute h-10 w-10" strokeWidth={1.8} />
                  <Check className="absolute bottom-0 h-5 w-5 rounded-full border border-current bg-white" strokeWidth={2.4} />
                </span>
              }
              onClick={() => {
                setDesireAskedEarly(true);
                goTo("visibility_desire");
              }}
            />
            <EarlySignalChoice
              tone="no"
              title="No"
              description="I mentioned it late or assumed they knew."
              icon={<WifiOff className="h-10 w-10" strokeWidth={1.8} />}
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
          className="w-full cursor-pointer rounded-[18px] border border-[#0057c8] bg-[#0057c8] px-5 py-4 font-gotham text-[15px] font-bold text-white transition hover:bg-[#0A57C6] md:py-5"
          onClick={() => {
            setDesireBlocker("I didn't ask early enough.");
            revealDoor("imposter_syndrome");
          }}
        >
          Tell me more
        </button>
      );
    }

    if (step === "visibility_desire") {
      return (
        <button
          type="button"
          className="w-full cursor-pointer rounded-[18px] border border-[#0057c8] bg-[#0057c8] px-5 py-4 font-gotham text-[15px] font-bold text-white transition hover:bg-[#0A57C6] md:py-5"
          onClick={() => goTo("importance")}
        >
          Does leadership care about this work?
        </button>
      );
    }

    if (step === "importance") {
      return (
        <div className="mx-auto max-w-[980px] space-y-5">
          <div className="grid items-stretch gap-5 md:grid-cols-2">
            <ImportanceChoice
              tone="yes"
              title="Yes"
              description="It's clearly important to them."
              onClick={() => {
                setImportanceVisible(true);
                goTo("personal_seen");
              }}
            />
            <ImportanceChoice
              tone="no"
              title="No"
              description="I'm not sure they see the value."
              onClick={() => {
                setImportanceVisible(false);
                revealDoor("story_of_work");
              }}
            />
          </div>
          <StoNote>Visibility works only when the work matters to people who decide.</StoNote>
        </div>
      );
    }

    if (step === "personal_seen") {
      return (
        <div className="mx-auto max-w-[980px] space-y-5">
          <div className="grid items-stretch gap-5 md:grid-cols-2">
            <OwnershipChoice
              tone="yes"
              title="Yes"
              description="They know I'm driving it."
              onClick={() => {
                setPersonallySeen(true);
                revealDoor("values_misalignment");
              }}
            />
            <OwnershipChoice
              tone="no"
              title="No"
              description="The project succeeds, but the credit doesn't clearly come to me."
              onClick={() => {
                setPersonallySeen(false);
                revealDoor("story_of_contribution");
              }}
            />
          </div>
          <StoNote>Important work helps only when your name travels with it.</StoNote>
        </div>
      );
    }

    if (step === "considered_formula") {
      return (
        <button
          type="button"
          className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-[18px] border border-[#0057c8] bg-[#0057c8] px-5 py-4 font-gotham text-[15px] font-bold text-white transition hover:bg-[#0A57C6] md:py-5"
          onClick={() => goTo("sponsor_power")}
        >
          Start decision check
          <ArrowRight className="h-5 w-5" />
        </button>
      );
    }

    if (step === "sponsor_power") {
      return (
        <div className="grid items-stretch gap-3 md:grid-cols-2">
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
        <div className="grid items-stretch gap-3 md:grid-cols-2">
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
        <div className="grid items-stretch gap-3 md:grid-cols-2">
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
          className="w-full cursor-pointer rounded-[18px] border border-[#0057c8] bg-[#0057c8] px-5 py-4 font-gotham text-[15px] font-bold text-white transition hover:bg-[#0A57C6] md:py-5"
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
        <DiagnosticIntroScreen
          onRestart={reset}
          onStart={() => {
            if (!sessionActivated) {
              setSessionActivated(true);
              setSessionStartedAt(new Date().toISOString());
            }
            goTo("q1");
          }}
        />
      );
    }

    if (step === "q1") {
      return (
        <div className="flex h-full w-full flex-col justify-start gap-3 pb-4 pt-2 md:pt-4">
          <BclHeader />
          <div className="mx-auto w-full max-w-[980px]">
            <StoPromptHeader>Let&apos;s get real about what&apos;s going on for you at work.</StoPromptHeader>
            <h2 className="mt-4 max-w-[29ch] font-quattrocento text-[29px] font-bold leading-[1.04] text-[#242424] md:text-[35px]">
              Which of these feels closest to what&apos;s happening at work right now?
            </h2>
            <p className="mt-2 font-gotham text-[14px] font-medium leading-5 text-[#242424] md:text-[15px]">
              Choose the one that feels most true. This stays between us.
            </p>
          </div>

          <div className="mx-auto grid w-full max-w-[784px] grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-5 md:gap-y-3">
            {q1Options.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`relative flex cursor-pointer flex-col overflow-hidden rounded-[14px] border bg-[#fffdf9] text-center shadow-[0_8px_18px_rgba(15,23,42,0.05)] transition hover:border-[#0057c8] hover:shadow-[0_14px_30px_rgba(10,87,198,0.08)] ${
                  q1 === option.id ? "border-[#0057c8] ring-1 ring-[#0057c8]" : "border-[#e6e0d7]"
                }`}
                onClick={() => {
                  setQ1(option.id);
                  trackBotEvent("sto_q1_selected", { q1: option.id });
                }}
                aria-pressed={q1 === option.id}
              >
                {q1 === option.id ? (
                  <span className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#0057c8] text-white shadow-[0_8px_16px_rgba(1,75,170,0.24)]">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                ) : null}
                <span className="block aspect-[1624/820] w-full overflow-hidden">
                  <img
                    src={situationCardImages[option.id]}
                    alt=""
                    className="h-full w-full object-cover"
                    aria-hidden
                  />
                </span>
                <span className="flex min-h-[38px] items-center justify-center px-4 py-2 font-gotham text-[13px] font-bold leading-5 text-[#0057c8] md:min-h-[42px] md:text-[14px]">
                  {q1ShortLabels[option.id]}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={!q1}
            className="mx-auto mt-2 min-h-[46px] w-full max-w-[980px] cursor-pointer rounded-[8px] border border-[#0057c8] bg-[#0057c8] px-5 font-quattrocento text-[17px] font-bold text-white shadow-[0_12px_26px_rgba(1,75,170,0.18)] transition hover:bg-[#0A57C6] disabled:cursor-not-allowed disabled:border-[#c6d4ea] disabled:bg-[#d1d5db] disabled:opacity-100"
            onClick={() => goTo("empathy")}
          >
            Continue
          </button>

          <div className="mx-[-16px] mt-2 flex min-h-[48px] w-[calc(100%+32px)] items-center justify-between bg-[#eef4ff] px-4 font-gotham text-[12px] md:mx-[-36px] md:w-[calc(100%+72px)] md:px-8">
            <button type="button" onClick={goBack} className="cursor-pointer font-bold text-[#0057c8]">
              Back
            </button>
            <button type="button" onClick={reset} className="cursor-pointer font-normal text-[#242424]">
              Restart
            </button>
          </div>

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
          <DiagnosticEmpathyScreen
            selectedLabel={q1ShortLabels[q1]}
            selectedImage={selectedSituationImages[q1]}
            empathySentences={empathySentences}
            onContinue={() => goTo("context")}
            onBack={goBack}
            onRestart={reset}
          />
      );
    }

    if (step === "context") {
      const canProceed = Boolean(context.targetRole.trim());

      return (
        <DiagnosticContextScreen
          targetRole={context.targetRole}
          onTargetRoleChange={(value) => setContext((current) => ({ ...current, targetRole: value }))}
          onBack={goBack}
          onRestart={reset}
          canContinue={canProceed}
          onContinue={() => {
            setSkippedContext(false);
            trackBotEvent("sto_screen2_completed", { q1 });
            goTo("diagnostic");
          }}
          onSkip={() => {
            setSkippedContext(true);
            trackBotEvent("sto_screen2_skipped", { q1 });
            goTo("diagnostic");
          }}
        />
      );
    }

    if (step === "diagnostic") {
      return (
        <div className="relative mx-auto flex min-h-full w-full max-w-[1180px] flex-col justify-start overflow-visible rounded-[24px] px-4 pb-5 pt-1 md:px-8 md:py-2">
          <BclHeader />
          <DiagnosticMapBackground />
          <div className="relative z-10 mx-auto flex w-full max-w-[780px] flex-col items-center gap-3">
            <DiagnosticQuestionCard />
            <div className="grid w-full items-stretch gap-4 md:grid-cols-2 md:gap-5">
              <OutcomeChoiceCard
                type="not_considered"
                compact
                onClick={() => {
                  setDiagnosticPath("not_considered");
                  trackBotEvent("sto_diagnostic_answered", { answer: "not_considered", q1 });
                  goTo("not_considered_formula");
                }}
              />
              <OutcomeChoiceCard
                type="considered"
                compact
                onClick={() => {
                  setDiagnosticPath("considered");
                  trackBotEvent("sto_diagnostic_answered", { answer: "considered", q1 });
                  goTo("considered_formula");
                }}
              />
            </div>
            <div className="relative z-20 flex w-full justify-center">
              <StoNote>Pick the version closest to what happened. The next path changes based on your choice.</StoNote>
            </div>
          </div>
        </div>
      );
    }

    if (step === "not_considered_formula") {
      return (
        <DiagnosticNotConsideredFormulaScreen
          onBack={goBack}
          onRestart={reset}
          onContinue={() => goTo("desire")}
        />
      );
    }

    if (step === "considered_formula") {
      return (
        <ConsideredDecisionTableScreen
          onBack={goBack}
          onRestart={reset}
          onStart={() => goTo("sponsor_power")}
        />
      );
    }

    if (step === "desire") {
      return (
        <DesireAskEarlyScreen
          onBack={goBack}
          onRestart={reset}
          onYes={() => {
            setDesireAskedEarly(true);
            goTo("visibility_desire");
          }}
          onNo={() => {
            setDesireAskedEarly(false);
            setDesireBlocker("I didn't ask early enough.");
            revealDoor("imposter_syndrome");
          }}
        />
      );
    }

    if (step === "importance") {
      return (
        <ImportanceMobileScreen
          onBack={goBack}
          onRestart={reset}
          onYes={() => {
            setImportanceVisible(true);
            goTo("personal_seen");
          }}
          onNo={() => {
            setImportanceVisible(false);
            revealDoor("story_of_work");
          }}
        />
      );
    }

    if (step === "visibility_desire") {
      return (
        <VisibilityDesireScreen
          onBack={goBack}
          onRestart={reset}
          onContinue={() => goTo("importance")}
        />
      );
    }

    if (step === "personal_seen") {
      return (
        <div className="flex h-full min-h-[720px] w-full justify-center bg-[#eef4ff] md:min-h-0 md:items-center md:bg-[#f7f5f2]">
          <section className="flex h-full w-full max-w-full flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-full md:min-h-0 md:max-w-[640px] md:rounded-[4px] md:border md:border-[#d8e4f6] lg:max-w-[760px]">
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 md:px-8">
              <BclHeader />
              <OwnershipCheckPanel />
              <div className="mt-5 grid items-stretch gap-5 md:grid-cols-2">
                <OwnershipChoice
                  tone="yes"
                  title="Yes"
                  description="They know I'm driving it."
                  onClick={() => {
                    setPersonallySeen(true);
                    revealDoor("values_misalignment");
                  }}
                />
                <OwnershipChoice
                  tone="no"
                  title="No"
                  description="The project succeeds, but the credit doesn't clearly come to me."
                  onClick={() => {
                    setPersonallySeen(false);
                    revealDoor("story_of_contribution");
                  }}
                />
              </div>
              <div className="mt-5">
                <StoNote>Important work helps only when your name travels with it.</StoNote>
              </div>
            </div>

            <footer className="flex min-h-[55px] items-center justify-between bg-[#eef4ff] px-8 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px]">
              <button type="button" onClick={goBack} className="cursor-pointer font-bold text-[#0057c8]">
                Back
              </button>
              <button type="button" onClick={reset} className="cursor-pointer font-normal text-[#242424]">
                Restart
              </button>
            </footer>
          </section>
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
        <SponsorPowerScreen
          onBack={goBack}
          onRestart={reset}
          onYes={() => {
            setSponsorHasPower(true);
            goTo("sponsor_willing");
          }}
          onNo={() => {
            setSponsorHasPower(false);
            revealDoor("sponsor_network");
          }}
        />
      );
    }

    if (step === "sponsor_willing") {
      return (
        <SponsorWillingScreen
          onBack={goBack}
          onRestart={reset}
          onYes={() => {
            setSponsorWillSpendCapital(true);
            goTo("next_level");
          }}
          onNo={() => {
            setSponsorWillSpendCapital(false);
            revealDoor("communication_framework");
          }}
        />
      );
    }

    if (step === "next_level") {
      return (
        <NextLevelSignalScreen
          onBack={goBack}
          onRestart={reset}
          onYes={() => {
            setNextLevelEvidence(true);
            revealDoor("complex_situation");
          }}
          onNo={() => {
            setNextLevelEvidence(false);
            revealDoor("brilliance_image_trap");
          }}
        />
      );
    }

    if (door && step === "door") {
      if (door === "complex_situation") {
        return (
          <DecisionCheckScreen
            onBack={goBack}
            onRestart={reset}
            onContinue={() => goTo("result")}
          />
        );
      }

      if (door === "story_of_work") {
        return (
          <StoryOfWorkScreen
            onBack={goBack}
            onRestart={reset}
            onContinue={() => goTo("result")}
          />
        );
      }

      if (door === "story_of_contribution") {
        return (
          <StoryOfContributionScreen
            onBack={goBack}
            onRestart={reset}
            onContinue={() => goTo("result")}
          />
        );
      }

      if (door === "imposter_syndrome") {
        return (
          <ImposterSyndromeScreen
            onBack={goBack}
            onRestart={reset}
            onContinue={() => goTo("result")}
          />
        );
      }

      if (door === "brilliance_image_trap") {
        return (
          <BrillianceImageTrapScreen
            onBack={goBack}
            onRestart={reset}
            onContinue={() => goTo("result")}
          />
        );
      }

      if (door === "sponsor_network") {
        return (
          <SponsorNetworkScreen
            onBack={goBack}
            onRestart={reset}
            onContinue={() => goTo("result")}
          />
        );
      }

      if (door === "communication_framework") {
        return (
          <CommunicationFrameworkScreen
            onBack={goBack}
            onRestart={reset}
            onContinue={() => goTo("result")}
          />
        );
      }

      if (door === "values_misalignment") {
        return (
          <DeeperDiagnosisScreen
            onBack={goBack}
            onRestart={reset}
            onContinue={() => goTo("result")}
          />
        );
      }

      return (
        <div className="mx-auto flex h-full w-full max-w-[1224px] flex-col justify-center gap-5">
          <QuestionPanel
            icon={<Lightbulb className="h-9 w-9" />}
            eyebrow="What's really going on"
            title={doorDetails[door as DiagnosticDoorId].name}
            subtitle={doorDetails[door as DiagnosticDoorId].summary}
            wide
          />
          <StoNote>Here&apos;s what I think is really going on.</StoNote>
        </div>
      );
    }

    if (step === "result" && resultCopy && door) {
      return (
        <div className="mx-auto min-h-full w-full max-w-[760px] bg-[linear-gradient(180deg,#fffaf3_0%,#f7f1e8_42%,#efe3d2_100%)] px-4 pb-5 md:max-w-[1040px] md:px-8 md:pb-6">
          <div className="flex h-[52px] shrink-0 items-start pt-4 md:h-[58px]">
            <div className="font-gotham text-[29px] font-bold leading-none text-[#2a2118]">BCL</div>
          </div>

          <section className="relative overflow-hidden border-b border-[#decfbd] px-5 pb-6 pt-5 text-center md:px-8 md:pb-8 md:pt-7">
                <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-16 w-40 bg-[radial-gradient(circle_at_center,#f3dfbd_0%,rgba(243,223,189,0)_68%)]" />
                <div className="relative mx-auto flex h-8 w-8 items-center justify-center rounded-full border border-[#d2b48c] bg-white text-[#9a6a2f] shadow-[0_6px_16px_rgba(74,54,35,0.10)]">
                  <Signal className="h-4 w-4" strokeWidth={2.1} />
                </div>
                <p className="relative mt-3 font-gotham text-[9px] font-bold uppercase leading-none tracking-[0.2em] text-[#8a5a2b]">
                  Your full picture
                </p>
                <h2 className="relative mx-auto mt-3 max-w-[15ch] break-words font-quattrocento text-[26px] font-bold leading-[1.08] text-[#211912] md:text-[40px]">
                  {resultCopy.title}
                </h2>
                <div className="relative mx-auto mt-2 h-px w-12 bg-[#d2b48c]" />
                <p className="relative mx-auto mt-3 max-w-[35ch] break-words font-gotham text-[12px] font-normal leading-[18px] text-[#3f3328] md:max-w-[54ch] md:text-[15px] md:leading-6">
                  {resultCopy.summary}
                </p>
              </section>

              <div className="my-3 flex items-center justify-center gap-3 font-gotham text-[8px] font-bold uppercase leading-none tracking-[0.22em] text-[#8a6a4b]">
                <span className="h-px w-8 bg-[#d2b48c]" />
                <span>Result</span>
                <span className="h-1 w-1 rounded-full bg-[#d2b48c]" />
                <span>{doorDetails[door].shortName}</span>
                <span className="h-px w-8 bg-[#d2b48c]" />
              </div>

              <section className="grid gap-4 border-b border-[#decfbd] px-5 py-5 md:grid-cols-[84px_1fr] md:px-6 md:py-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#decfbd] bg-[#f4eadc] text-[#9a6a2f] md:h-14 md:w-14">
                  <Lightbulb className="h-5 w-5" strokeWidth={1.9} />
                </div>
                <div>
                  <h3 className="font-quattrocento text-[21px] font-bold leading-[1.08] text-[#211912] md:text-[26px]">
                    What&apos;s actually happening
                  </h3>
                  <p className="mt-2 break-words font-gotham text-[12px] leading-[18px] text-[#3f3328] md:max-w-[58ch] md:text-[15px] md:leading-6">
                    {resultCopy.pain}
                  </p>
                </div>
              </section>

              <section className="grid gap-4 border-b border-[#decfbd] px-5 py-5 md:grid-cols-[84px_1fr] md:px-6 md:py-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#decfbd] bg-[#f4eadc] text-[#9a6a2f] md:h-14 md:w-14">
                  <Signal className="h-5 w-5" strokeWidth={1.9} />
                </div>
                <div>
                  <h3 className="font-quattrocento text-[21px] font-bold leading-[1.08] text-[#211912] md:text-[26px]">
                    Why this is happening
                  </h3>
                  <p className="mt-2 break-words font-gotham text-[12px] leading-[18px] text-[#3f3328] md:max-w-[58ch] md:text-[15px] md:leading-6">
                    {resultCopy.concept}
                  </p>
                </div>
              </section>

              <section className="px-5 py-5 md:px-6 md:py-7">
                <div className="grid gap-4 md:grid-cols-[84px_1fr]">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#d8b77d] bg-[#fffaf3] text-[#8a5a2b] shadow-[0_0_0_8px_rgba(216,183,125,0.12)]">
                    <ArrowRight className="h-5 w-5" strokeWidth={1.9} />
                  </div>
                  <div className="relative border-l border-[#d2b48c] pl-4 md:border-l-0 md:pl-0">
                    <h3 className="font-quattrocento text-[21px] font-bold leading-[1.08] text-[#211912] md:text-[26px]">
                      What changes this
                    </h3>
                    <p className="mt-2 break-words font-gotham text-[12px] leading-[18px] text-[#3f3328] md:max-w-[58ch] md:text-[15px] md:leading-6">
                      {resultCopy.program}
                    </p>
                  </div>
                </div>
              </section>

              <section className="mt-3 overflow-hidden rounded-[4px] bg-[#1f1711] px-5 py-5 text-[#fffaf3] shadow-[0_12px_28px_rgba(43,31,22,0.28)] md:px-8 md:py-6">
                <p className="font-gotham text-[9px] font-bold uppercase leading-none tracking-[0.18em] text-[#d8b77d]">
                  Next step
                </p>
                <h3 className="mt-3 max-w-[16ch] font-quattrocento text-[24px] font-bold leading-[1.06] md:text-[34px]">
                  Take the next step with this diagnosis.
                </h3>
                <div className="mt-4 grid gap-3">
                  <button
                    type="button"
                    onClick={openCallModal}
                    disabled={actionState === "loading"}
                    className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-3 rounded-[4px] border border-[#d8b77d] bg-[#fffaf3] px-4 font-gotham text-[14px] font-bold text-[#211912] shadow-[0_0_0_2px_rgba(216,183,125,0.18)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {actionState === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                    {actionState === "loading" ? "Processing..." : activeDoorCtas?.primary.label}
                    {actionState !== "loading" ? <ArrowRight className="h-4 w-4" strokeWidth={2} /> : null}
                  </button>
                  <button
                    type="button"
                    onClick={openCallbackWhatsapp}
                    disabled={actionState === "loading"}
                    className="inline-flex min-h-[42px] w-full cursor-pointer items-center justify-center gap-3 rounded-[4px] border border-[#d8b77d] bg-transparent px-4 font-gotham text-[12px] font-bold text-[#fffaf3] transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <PhoneCall className="h-4 w-4" strokeWidth={1.9} />
                    I&apos;d like a call instead
                  </button>
                </div>
                {actionMessage ? (
                  <p className="mt-3 rounded-[4px] border border-[#f1d7d7] bg-[#fff4f4] px-3 py-2 font-gotham text-xs font-medium text-[#9f2d2d]">
                    {actionMessage}
                  </p>
                ) : null}
              </section>

              <footer className="mt-3 flex min-h-[55px] items-center justify-between bg-[#efe3d2] px-4 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px] md:px-8">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={!history.length}
                  className="cursor-pointer font-bold text-[#8a5a2b] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Back
                </button>
                <button type="button" onClick={reset} className="cursor-pointer font-normal text-[#3f3328]">
                  Restart
                </button>
              </footer>
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
    ? "relative mx-auto grid h-full min-h-0 w-full max-w-full grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-none border-0 bg-white font-gotham shadow-none md:rounded-[10px] md:border md:border-[#e6e0d7] md:shadow-[0_18px_52px_rgba(15,23,42,0.12)]"
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
      <header className={isEmbedded ? "hidden" : "border-b border-[#dce8f8] bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)] backdrop-blur"}>
        {isEmbedded ? (
          null
        ) : (
          <>
            <div className="flex h-[72px] items-center justify-between px-5 md:h-[88px] md:px-8">
              <div className="min-w-0 truncate font-quattrocento text-[26px] font-bold leading-none tracking-[-0.03em] text-[#242424]">
                Better <span className="text-[#0057c8]">Corporate Life</span>
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
          </>
        )}
      </header>

      <div className={isEmbedded ? `relative z-10 min-h-0 max-w-full overflow-x-hidden overflow-y-auto ${step === "intro" || step === "empathy" || step === "context" || step === "not_considered_formula" || step === "considered_formula" || step === "desire" || step === "visibility_desire" || step === "importance" || step === "personal_seen" || step === "sponsor_power" || step === "sponsor_willing" || step === "next_level" || step === "result" || (step === "door" && (door === "complex_situation" || door === "story_of_work" || door === "story_of_contribution" || door === "imposter_syndrome" || door === "brilliance_image_trap" || door === "sponsor_network" || door === "communication_framework" || door === "values_misalignment")) ? "p-0" : `px-4 md:px-9 ${step === "q1" ? "py-0" : "py-4 md:py-6"}`}` : "flex-1 overflow-y-auto bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] px-5 py-6 md:px-8 md:py-8"}>
        {renderVisualScreen()}
      </div>

      <footer className={isEmbedded ? `${step === "intro" || step === "q1" || step === "empathy" || step === "context" || step === "not_considered_formula" || step === "considered_formula" || step === "desire" || step === "visibility_desire" || step === "importance" || step === "personal_seen" || step === "sponsor_power" || step === "sponsor_willing" || step === "next_level" || step === "result" || (step === "door" && (door === "complex_situation" || door === "story_of_work" || door === "story_of_contribution" || door === "imposter_syndrome" || door === "brilliance_image_trap" || door === "sponsor_network" || door === "communication_framework" || door === "values_misalignment")) ? "hidden" : "relative z-20 max-w-full shrink-0 overflow-x-hidden bg-white px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_24px_rgba(15,23,42,0.08)] md:px-9 md:pb-4"}` : "bg-gradient-to-t from-white from-[62%] to-white/0 px-5 pb-[calc(16px+env(safe-area-inset-bottom))] pt-6 md:px-8"}>
        {step === "result" ? (
          null
        ) : controlsReady && step !== "diagnostic" ? (
          <div className={isEmbedded ? "mx-auto max-w-[980px]" : ""}>{renderControls()}</div>
        ) : step !== "diagnostic" ? (
          <div className="min-h-[44px]" />
        ) : (
          <div />
        )}

        {step === "q1" ? null : (
          <div className="mt-2 flex min-h-[55px] w-full items-center justify-between bg-[#eef4ff] px-4 pb-[env(safe-area-inset-bottom)] font-gotham text-[12px] md:px-8">
            <button
              type="button"
              onClick={goBack}
              disabled={!history.length}
              className="cursor-pointer font-bold text-[#0057c8] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>
            <button type="button" onClick={reset} className="cursor-pointer font-normal text-[#242424]">
              Restart
            </button>
          </div>
        )}
      </footer>
      <CallInvestModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        onInvest={handlePaymentCta}
        onCallInstead={openCallbackWhatsapp}
        isLoading={actionState === "loading"}
        message={actionMessage}
      />
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




