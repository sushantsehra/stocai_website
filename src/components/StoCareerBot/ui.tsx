import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Check,
  Eye,
  Lightbulb,
  Mountain,
  Shield,
  Signal,
  Target,
  UserRoundX,
  UsersRound,
} from "lucide-react";
import stoHeadshot from "@/assets/sto-headshot.png";
import type { Q1OptionId } from "@/data/stoConversation";
import { q1ShortLabels, situationImages } from "./config";
import type { BotStep } from "./types";

export const BotMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-[20px] rounded-bl-[6px] border border-[#e3ebf7] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] px-5 py-4 font-gotham text-[15px] leading-7 text-[#1f2937] shadow-[0_10px_28px_rgba(1,75,170,0.05)] md:px-6 md:py-5 md:text-[16px]">
    {children}
  </div>
);

export const UserChoice = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-end">
    <div className="w-fit max-w-[88%] rounded-[18px] border border-[#0A57C6] bg-[#014BAA] px-5 py-4 text-left font-gotham text-[15px] font-semibold leading-7 text-white shadow-[0_14px_30px_rgba(1,75,170,0.18)] md:max-w-[760px] md:px-6 md:py-5 md:text-[16px]">
      {children}
    </div>
  </div>
);

export const FormulaCard = ({ title, formula, note }: { title: string; formula: string; note: string }) => (
  <div className="rounded-[18px] border border-[#dce8f8] bg-[linear-gradient(180deg,#ffffff_0%,#edf5ff_100%)] px-5 py-5 text-center shadow-[0_14px_34px_rgba(1,75,170,0.07)] md:px-7">
    <p className="mx-auto mb-4 inline-flex rounded-full border border-[#dce8f8] bg-white px-3 py-2 font-gotham text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-[#0A57C6]">
      {title}
    </p>
    <p className="font-gotham text-[22px] font-bold leading-[1.15] tracking-[-0.02em] text-[#111111] md:text-[28px]">
      {formula}
    </p>
    <p className="mt-4 font-gotham text-[15px] leading-7 text-[#4b5563] md:text-[16px]">{note}</p>
  </div>
);

export const PandaHeader = () => (
  <div className="mb-4 flex items-center gap-4">
    <div className="h-[78px] w-[78px] overflow-hidden rounded-full border border-[#d8e4f6] bg-white shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
      <Image src={stoHeadshot} alt="Sto headshot" width={78} height={78} className="h-full w-full object-cover" />
    </div>
    <div>
      <p className="font-gotham text-[17px] font-bold text-[#111111]">Sto</p>
      <p className="font-gotham text-[13px] text-[#6b7280]">Your guide</p>
    </div>
  </div>
);

export const TypingIndicator = () => (
  <div className="flex h-12 w-fit items-center gap-1.5 rounded-[18px] rounded-bl-[6px] border border-[#e3ebf7] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] px-5">
    <span className="h-2 w-2 animate-bounce rounded-full bg-[#0A57C6]" />
    <span className="h-2 w-2 animate-bounce rounded-full bg-[#0A57C6] [animation-delay:120ms]" />
    <span className="h-2 w-2 animate-bounce rounded-full bg-[#0A57C6] [animation-delay:240ms]" />
  </div>
);

const questSteps: BotStep[] = ["intro", "q1", "context", "diagnostic", "door"];

const getQuestIndex = (step: BotStep) => {
  if (step === "intro") return 0;
  if (step === "q1" || step === "empathy" || step === "context") return 1;
  if (
    step === "diagnostic" ||
    step === "not_considered_formula" ||
    step === "considered_formula" ||
    step === "desire" ||
    step === "importance" ||
    step === "personal_seen" ||
    step === "sponsor_power" ||
    step === "sponsor_willing" ||
    step === "next_level" ||
    step === "desire_blocker"
  ) {
    return 2;
  }
  if (step === "door") return 3;
  return 4;
};

export const QuestProgress = ({ step }: { step: BotStep }) => {
  const activeIndex = getQuestIndex(step);
  return (
    <div className="mx-auto flex w-full max-w-[520px] items-center justify-center px-6 py-4">
      {questSteps.map((questStep, index) => (
        <React.Fragment key={questStep}>
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full border-[3px] transition ${
              index < activeIndex
                ? "border-[#0A57C6] bg-[#0A57C6] text-white"
                : index === activeIndex
                  ? "border-[#0A57C6] bg-white text-[#0A57C6] ring-4 ring-[#dceaff]"
                  : "border-[#aebbd0] bg-white text-transparent"
            }`}
          >
            {index < activeIndex ? <Check className="h-3.5 w-3.5" strokeWidth={4} /> : null}
          </div>
          {index < questSteps.length - 1 ? (
            <div className={`h-[2px] flex-1 ${index < activeIndex ? "bg-[#0A57C6]" : "bg-[#aebbd0]"}`} />
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
};

export const IconOrb = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#dbe9ff] text-[#014BAA] shadow-[0_10px_22px_rgba(10,87,198,0.10)]">
    {children}
  </div>
);

export const StoNote = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto flex w-full max-w-[980px] items-center gap-3 rounded-[14px] border border-[#d8e4f6] bg-white/80 px-4 py-3 shadow-[0_8px_22px_rgba(17,24,39,0.04)]">
    <Image src={stoHeadshot} alt="Sto headshot" width={48} height={48} className="h-10 w-10 shrink-0 rounded-full border border-[#d8e4f6] object-cover" />
    <p className="font-gotham text-[13px] leading-5 text-[#40506c] md:text-[14px]">
      <span className="font-bold text-[#005AE0]">Sto&apos;s note:</span> {children}
    </p>
  </div>
);

export const DiagnosticMapBackground = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden text-[#b9d6f5]" aria-hidden>
    <svg className="absolute inset-0 h-full w-full opacity-55" viewBox="0 0 1224 680" fill="none" preserveAspectRatio="none">
      <path d="M-40 374 C94 316 121 179 257 228 C369 267 372 418 513 394 C660 369 637 206 789 218 C935 231 939 385 1098 347 C1180 327 1218 250 1266 152" stroke="currentColor" strokeWidth="1.5" strokeDasharray="7 9" />
      <path d="M22 95 C139 37 193 125 289 109 C422 86 461 7 578 38 C695 69 687 173 816 171 C950 170 964 66 1084 93 C1160 110 1193 157 1262 129" stroke="currentColor" strokeWidth="1.3" strokeDasharray="6 9" />
      <path d="M1028 102 C1002 185 994 238 1017 307 C1047 397 1117 436 1078 523" stroke="currentColor" strokeWidth="1.4" strokeDasharray="7 9" />
    </svg>
    <div className="absolute left-12 top-16 h-24 w-24 rounded-full border border-[#d8e8fb] opacity-60">
      <div className="absolute left-1/2 top-2 h-20 w-px -translate-x-1/2 bg-[#d8e8fb]" />
      <div className="absolute left-2 top-1/2 h-px w-20 -translate-y-1/2 bg-[#d8e8fb]" />
      <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#d8e8fb]" />
      <span className="absolute left-1/2 top-[-16px] -translate-x-1/2 font-gotham text-[9px] font-bold">N</span>
      <span className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 font-gotham text-[9px] font-bold">S</span>
      <span className="absolute left-[-15px] top-1/2 -translate-y-1/2 font-gotham text-[9px] font-bold">W</span>
      <span className="absolute right-[-13px] top-1/2 -translate-y-1/2 font-gotham text-[9px] font-bold">E</span>
    </div>
    {[
      "left-[8%] top-[42%]",
      "left-[13%] top-[31%]",
      "left-[86%] top-[18%]",
      "left-[91%] top-[44%]",
      "left-[7%] top-[68%]",
      "left-[88%] top-[66%]",
    ].map((className) => (
      <span key={className} className={`absolute ${className} h-0 w-0 border-x-[8px] border-b-[13px] border-x-transparent border-b-[#dcecff] opacity-70`} />
    ))}
    {["left-[16%] top-[49%]", "left-[79%] top-[50%]", "left-[93%] top-[25%]", "left-[12%] top-[78%]"].map((className) => (
      <span key={className} className={`absolute ${className} h-px w-8 rounded-full bg-[#dcecff] opacity-70`} />
    ))}
  </div>
);

export const DiagnosticBranchLines = () => (
  <svg className="pointer-events-none absolute left-1/2 top-[200px] z-10 hidden h-[150px] w-[610px] -translate-x-1/2 text-[#0A7CFF] md:block" viewBox="0 0 610 150" fill="none" aria-hidden>
    <path d="M305 0 V31 C305 59 282 82 254 82 H67 C44 82 26 100 26 123 V135" stroke="currentColor" strokeWidth="2" />
    <path d="M305 0 V31 C305 59 328 82 356 82 H543 C566 82 584 100 584 123 V135" stroke="currentColor" strokeWidth="2" />
    <rect x="297" y="8" width="16" height="16" rx="2" transform="rotate(45 305 16)" fill="white" stroke="currentColor" strokeWidth="2" />
    <circle cx="26" cy="137" r="6" fill="white" stroke="currentColor" strokeWidth="2" />
    <circle cx="584" cy="137" r="6" fill="white" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const DiagnosticQuestionCard = () => (
  <section className="relative z-20 mx-auto w-full max-w-[560px] rounded-[22px] border border-[#c8dcf5] bg-white px-5 py-8 text-center shadow-[0_18px_42px_rgba(30,80,145,0.12)] md:px-10 md:py-9">
    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#eef5ff] text-[#005AE0] shadow-[0_10px_24px_rgba(10,87,198,0.14)]">
      <Mountain className="h-8 w-8" />
    </div>
    <h2 className="mx-auto max-w-[15ch] font-quattrocento text-[28px] font-bold leading-[1.08] text-[#050817] md:text-[32px]">
      What happened with the promotion or opportunity?
    </h2>
  </section>
);

export const SituationArt = ({ id, compact = false }: { id: Q1OptionId; compact?: boolean }) => (
  <div className={`relative mx-auto w-full overflow-hidden rounded-[12px] bg-[#fffaf3] ${compact ? "aspect-[2.45/1]" : "aspect-[16/9]"}`}>
    <Image src={situationImages[id]} alt="" fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" aria-hidden />
  </div>
);

export const QuestionPanel = ({
  eyebrow,
  title,
  subtitle,
  icon,
  wide = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  wide?: boolean;
}) => (
  <section
    className={`mx-auto rounded-[16px] border border-[#d8e4f6] bg-white px-6 py-6 text-center shadow-[0_12px_30px_rgba(15,23,42,0.05)] md:px-8 md:py-7 ${
      wide ? "max-w-[860px]" : "max-w-[720px]"
    }`}
  >
    {icon ? <IconOrb>{icon}</IconOrb> : null}
    {eyebrow ? (
      <p className="mt-3 font-gotham text-[11px] font-bold uppercase tracking-[0.18em] text-[#014BAA]">{eyebrow}</p>
    ) : null}
    <h2 className="mx-auto mt-4 max-w-[20ch] font-quattrocento text-[30px] font-bold leading-[1.08] text-[#050817] md:text-[38px]">
      {title}
    </h2>
    {subtitle ? <p className="mx-auto mt-4 max-w-[56ch] font-gotham text-[15px] leading-6 text-[#40506c] md:text-[16px]">{subtitle}</p> : null}
  </section>
);

const OutcomePreview = ({
  type,
  title,
  body,
}: {
  type: "not_considered" | "considered";
  title: string;
  body: string;
}) => (
  <section className="relative overflow-hidden rounded-[14px] border border-[#d8e6f7] bg-white text-center shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
    <div className="h-12 bg-[#edf5ff]">
      <Shield className="absolute right-5 top-3 h-6 w-6 text-white" />
    </div>
    <div className="relative px-5 pb-5 pt-9">
      <div className="absolute left-1/2 top-[-30px] flex h-[60px] w-[60px] -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-white text-[#014BAA] shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
        {type === "not_considered" ? <UserRoundX className="h-7 w-7" /> : <UsersRound className="h-7 w-7" />}
      </div>
      <p className="mx-auto mb-3 inline-flex rounded-md bg-[#edf5ff] px-3 py-1 font-gotham text-[10px] font-bold uppercase tracking-[0.16em] text-[#014BAA]">
        {type === "not_considered" ? "Outcome A" : "Outcome B"}
      </p>
      <h3 className="mx-auto max-w-[17ch] font-quattrocento text-[22px] font-bold leading-[1.08] text-[#050817] md:text-[25px]">
        {title}
      </h3>
      <div className="mx-auto my-4 h-px max-w-[220px] bg-[#e8dfd2]" />
      <p className="mx-auto max-w-[30ch] font-gotham text-[14px] leading-6 text-[#40506c]">{body}</p>
    </div>
  </section>
);

export const FormulaVisual = ({
  kind,
  formula,
  note,
  outcomeTitle,
  outcomeBody,
}: {
  kind: "not_considered" | "considered";
  formula: string;
  note: string;
  outcomeTitle: string;
  outcomeBody: string;
}) => (
  <div className="mx-auto grid w-full max-w-[980px] items-center gap-4 lg:grid-cols-[290px_minmax(0,1fr)]">
    <OutcomePreview type={kind} title={outcomeTitle} body={outcomeBody} />
    <section className="rounded-[16px] border border-[#d8e4f6] bg-white/92 px-5 py-5 text-center shadow-[0_12px_30px_rgba(15,23,42,0.05)] md:px-6">
      <IconOrb>
        <Lightbulb className="h-7 w-7" />
      </IconOrb>
      <h2 className="mt-4 font-quattrocento text-[28px] font-bold leading-[1.08] text-[#050817] md:text-[34px]">
        What this usually means
      </h2>
      <div className="mt-5 rounded-[12px] border border-[#bfd9ff] bg-[#f8fbff] px-4 py-3 font-gotham text-[17px] font-bold leading-6 text-[#014BAA] md:text-[20px]">
        {formula}
      </div>
      <div className="mx-auto mt-5 flex max-w-[560px] items-center justify-center gap-3">
        <div className="flex min-h-[54px] flex-1 items-center justify-center gap-2 rounded-[12px] border border-[#e1d8cd] bg-white px-3 font-gotham text-[14px] font-semibold text-[#111827] shadow-[0_8px_18px_rgba(15,23,42,0.04)]">
          {kind === "not_considered" ? <BarChart3 className="h-5 w-5 text-[#a8b1bf]" /> : <Signal className="h-5 w-5 text-[#a8b1bf]" />}
          {kind === "not_considered" ? "Performance" : "Sponsor Strength"}
        </div>
        <span className="font-gotham text-2xl font-light text-[#aeb7c5]">x</span>
        <div className="flex min-h-[54px] flex-1 items-center justify-center gap-2 rounded-[12px] border border-[#014BAA] bg-[#f8fbff] px-3 font-gotham text-[14px] font-bold text-[#014BAA]">
          {kind === "not_considered" ? <Eye className="h-5 w-5" /> : <Target className="h-5 w-5" />}
          {kind === "not_considered" ? "Visibility" : "Next Level Signal"}
        </div>
      </div>
      <p className="mx-auto mt-5 max-w-[58ch] font-gotham text-[14px] leading-6 text-[#40506c] md:text-[15px]">{note}</p>
    </section>
  </div>
);

export const OutcomeChoiceCard = ({
  type,
  onClick,
}: {
  type: "not_considered" | "considered";
  onClick: () => void;
}) => {
  const isNotConsidered = type === "not_considered";
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative z-20 cursor-pointer overflow-visible rounded-[18px] border border-[#cbdff7] bg-white text-center shadow-[0_18px_42px_rgba(30,80,145,0.12)] transition hover:-translate-y-0.5 hover:border-[#0A7CFF] hover:shadow-[0_22px_48px_rgba(10,124,255,0.16)]"
    >
      <div className="h-[74px] rounded-t-[18px] bg-[linear-gradient(180deg,#dfefff_0%,#cfe5ff_100%)]">
        <div className="absolute inset-x-0 top-0 h-[74px] rounded-t-[18px] opacity-35 [background-image:repeating-radial-gradient(ellipse_at_center,transparent_0,transparent_11px,rgba(10,87,198,0.22)_12px,transparent_13px)]" />
        <span className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#94b6df] text-white shadow-[0_7px_14px_rgba(58,99,151,0.20)]">
          <Shield className="h-5 w-5" />
        </span>
      </div>
      <div className="relative px-6 pb-7 pt-12 md:px-8 md:pb-8">
        <div className="absolute left-1/2 top-[-42px] flex h-[86px] w-[86px] -translate-x-1/2 items-center justify-center rounded-full border-[6px] border-white bg-white text-[#0A7CFF] shadow-[0_8px_22px_rgba(30,80,145,0.14)]">
          <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full border border-[#d8e8fb] bg-white">
            {isNotConsidered ? <UserRoundX className="h-9 w-9" /> : <UsersRound className="h-9 w-9" />}
          </div>
        </div>
        <p className="mx-auto mb-4 inline-flex rounded-md bg-[#edf5ff] px-3 py-1 font-gotham text-[10px] font-bold uppercase tracking-[0.18em] text-[#014BAA]">
          {isNotConsidered ? "Outcome A" : "Outcome B"}
        </p>
        <h3 className="mx-auto max-w-[19ch] font-quattrocento text-[23px] font-bold leading-[1.08] text-[#050817] md:text-[27px]">
          {isNotConsidered ? "I was not even considered" : "I was considered, but someone else was chosen"}
        </h3>
        <div className="mx-auto my-5 h-px max-w-[270px] bg-[#e8dfd2]" />
        <p className="mx-auto max-w-[30ch] font-gotham text-[14px] leading-6 text-[#40506c]">
          {isNotConsidered
            ? "You were not discussed, shortlisted, or seen as a contender."
            : "You were in the frame, but the final bet went to someone else."}
        </p>
        <span className="mx-auto mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#dce8f8] bg-white text-[#014BAA] transition group-hover:border-[#014BAA] group-hover:bg-[#f7fbff]">
          <ArrowRight className="h-5 w-5" />
        </span>
      </div>
    </button>
  );
};

export const AnswerChoiceCard = ({
  tone,
  title,
  description,
  onClick,
}: {
  tone: "yes" | "no";
  title: string;
  description: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`group flex min-h-[96px] cursor-pointer items-center gap-4 rounded-[14px] border bg-white px-4 py-4 text-left shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#014BAA] hover:bg-[#f8fbff] ${
      tone === "yes" ? "border-[#014BAA]" : "border-[#d8e4f6]"
    }`}
  >
    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-gotham text-[13px] font-bold uppercase ${tone === "yes" ? "bg-[#e8f2ff] text-[#014BAA]" : "bg-[#f2f4f7] text-[#526177]"}`}>
      {tone}
    </span>
    <span className="min-w-0 flex-1">
      <span className={`block font-gotham text-[15px] font-bold leading-5 ${tone === "yes" ? "text-[#014BAA]" : "text-[#050817]"}`}>
        {title}
      </span>
      <span className="mt-1 block font-gotham text-[13px] leading-5 text-[#40506c] md:text-[14px]">{description}</span>
    </span>
    <span className="text-[#014BAA] transition group-hover:translate-x-1">
      <ArrowRight className="h-5 w-5" />
    </span>
  </button>
);

export { q1ShortLabels };
