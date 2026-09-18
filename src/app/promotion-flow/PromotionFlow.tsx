"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { readStoDiagnosticContext } from "@/lib/diagnosticContext";
import { barriers, type Barrier } from "./flowData";
import PromotionStoryUserNav from "../promotion-story/PromotionStoryUserNav";
import storyStyles from "../promotion-story/page.module.css";
import { usePromotionFlowTracking } from "./usePromotionFlowTracking";
import styles from "./promotionFlow.module.css";
import SolvingScreen from "./SolvingScreen";
import InsightScreen from "./InsightScreen";
import CheckoutScreen from "./CheckoutScreen";
import { trackCtaClick } from "@/lib/analytics/events";
import { approaches, getPromotionInsight } from "./insightData";

const evidence: ReadonlyArray<{ id: string; code: string; title: string; quote: string; stamp?: string }> = [
  { id: "office-politics", code: "A", title: "Office politics", quote: "I refuse to play those games." },
  { id: "biased-manager", code: "B", title: "My manager", quote: "They simply don’t back me.", stamp: "Not backed" },
  { id: "invisible-work", code: "C", title: "Invisible work", quote: "The work is seen. My name isn’t." },
  { id: "zero-network", code: "D", title: "My network", quote: "I don’t know the people who matter." },
  { id: "executive-presence", code: "E", title: "Executive presence", quote: "I don’t show up as a next-level leader.", stamp: "Reliable doer" },
];

const truthContent: Record<string, { title: string; setup: React.ReactNode; body: React.ReactNode; equation?: string }> = {
  "office-politics": {
    title: "Promotions are decisions made by people.",
    setup: <p>You don&apos;t have to become political to get promoted.</p>,
    body: <p>But you do need to understand <strong>who influences the decision, what they need to see, and what makes them confident in your next move.</strong></p>,
  },
  "biased-manager": {
    title: "Your manager shouldn’t be your entire promotion strategy.",
    setup: <><p>Managers have their own preferences, priorities and perceptions.</p><p>You can&apos;t control how your manager sees you.</p></>,
    body: <p><strong>You can control whether your promotion case depends on just one person&apos;s view.</strong></p>,
  },
  "invisible-work": {
    title: "Good work still needs a story.",
    equation: "Quality of work × Story of work → Visibility",
    setup: <p>Leadership doesn&apos;t see every detail.</p>,
    body: <p><strong>They see what gets noticed, understood and remembered.</strong></p>,
  },
  "zero-network": {
    title: "Your promotion doesn’t happen in isolation.",
    setup: <p>You don&apos;t need to know everyone.</p>,
    body: <><p>You need the right people to understand <strong>what you&apos;re good at, where you create value and what you&apos;re ready to take on next.</strong></p><p>A network becomes useful when people can connect your name to opportunities.</p></>,
  },
  "executive-presence": {
    title: "Being good at your job isn’t the same as looking ready for the next one.",
    setup: <p>Executive presence isn&apos;t about sounding polished or looking important.</p>,
    body: <><p>It shows up when <strong>you&apos;re challenged, when the room disagrees, or when you&apos;re expected to make a call.</strong></p><p><strong>That&apos;s when people form a view of your readiness.</strong></p></>,
  },
};

const honestChoices = [
  { id: "change", label: "Changing jobs" },
  { id: "hope", label: "Hoping things improve" },
  { id: "manager", label: "Trusting my manager will notice me" },
] as const;

const offerPresentation: Record<string, { label: string; headline: React.ReactNode; introduction: string; direction: string; guidance: string; inside: string }> = {
  "office-politics": {
    label: "Office Politics",
    headline: <>Get promoted without playing <em>office politics.</em></>,
    introduction: "You don't need to become someone you're not. You need to understand the people, influence and decisions that shape your promotion.",
    direction: "Get seen + Get backed",
    guidance: "Know who matters, what they need to see and how your value travels beyond your immediate role.",
    inside: "Build the visibility, evidence and relationships that turn your work into a promotion case.",
  },
  "biased-manager": {
    label: "My Manager",
    headline: <>Don&apos;t make one manager your <em>entire promotion strategy.</em></>,
    introduction: "You can't control how one person sees you. You can build a stronger case supported by your work, relationships and evidence.",
    direction: "Get backed",
    guidance: "Build the visibility, relationships and evidence that strengthen your promotion case beyond one person's view.",
    inside: "Build the evidence and support around your next move so your promotion case doesn't depend on one person's perception.",
  },
  "invisible-work": {
    label: "Invisible Work",
    headline: <>Turn your work into <em>a promotion story.</em></>,
    introduction: "Your contribution needs to be visible, understood and remembered by the people who influence your next move.",
    direction: "Get seen",
    guidance: "Make your contribution easier for the right people to recognise, understand and remember.",
    inside: "Turn the work you've already done into clearer evidence of the value and readiness you bring.",
  },
  "zero-network": {
    label: "My Network",
    headline: <>Don&apos;t just connect with people. Connect <em>with opportunities.</em></>,
    introduction: "Build relationships with the people who matter to your next move and help them understand the value you bring.",
    direction: "Get backed",
    guidance: "Identify who influences your next move and build relationships around the value you bring.",
    inside: "Build the relationships and visibility that help your name travel when opportunities come up.",
  },
  "executive-presence": {
    label: "Executive Presence",
    headline: <>Be seen as ready <em>for the next level.</em></>,
    introduction: "Show your judgement, communication and confidence in the moments that shape how people see your readiness for greater responsibility.",
    direction: "Get believed",
    guidance: "Make your judgement, communication and readiness visible in the moments that shape your reputation.",
    inside: "Practise the behaviours that help you communicate, make decisions and show up with greater authority.",
  },
};

const consequenceContent: Record<string, { chosen: string; title: React.ReactNode; body: string; image: string; caption: [string, string] }> = {
  change: { chosen: "Changing jobs", title: <>A new company can still produce <em>the same career.</em></>, body: "Changing jobs changes the setting. Without changing how you manage your career, the same conditions can follow you into the next role.", image: "/promotion-flow/honest-change.png", caption: ["Different company", "Same pattern"] },
  hope: { chosen: "Hoping things improve", title: <>Hope is <em>not a strategy.</em></>, body: "While you wait for things to improve, someone else continues making the decisions that shape your career.", image: "/promotion-flow/honest-hope.png", caption: ["Time moves", "The career doesn’t"] },
  manager: { chosen: "Trusting my manager", title: <>Who is in control of <em>your career?</em></>, body: "A supportive manager helps. But your progress should never depend on one person noticing you.", image: "/promotion-flow/honest-manager.png", caption: ["The next move", "In their hands"] },
};

export default function PromotionFlow({ initialBarrierId, initialStage, initialChoice }: { initialBarrierId?: string; initialStage?: string; initialChoice?: string }) {
  const initialBarrier = barriers.find((item) => item.id === initialBarrierId) ?? null;
  const initialStep = initialBarrier ? (initialStage === "checkout" ? 6 : initialStage === "insight" ? (getPromotionInsight(initialBarrier.id, initialChoice) ? 5 : 2) : initialStage === "principle" ? 2 : ["application", "consequence"].includes(initialStage ?? "") ? 3 : initialStage === "offer" ? 4 : 1) : 0;
  const [step, setStep] = useState(initialStep);
  const [barrier, setBarrier] = useState<Barrier | null>(initialBarrier);
  const approach = approaches.find((item) => item.id === initialChoice);
  const choice = barrier && step >= 3 ? (approach ? { id: approach.id, label: approach.title } : honestChoices.find((item) => item.id === initialChoice)) : undefined;
  // Preserve the backend/GTM step contract; Screen 03 is the new consequence screen.
  const currentStep = step === 0 ? "prime_suspect" : step === 1 ? "truth" : step === 2 ? "principle" : step === 5 ? "consequence" : step === 3 ? (initialStage === "consequence" && initialChoice && Object.hasOwn(consequenceContent, initialChoice) ? "consequence" : "honest_choice") : "offer";
  const { completeFlow } = usePromotionFlowTracking({
    currentStep,
    answers: {
      barrier_id: barrier?.id || "",
      barrier_label: barrier ? offerPresentation[barrier.id].label : "",
      choice_id: choice?.id || "",
      choice_label: choice?.label || "",
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [step]);

  useEffect(() => {
    // Checkout stays within the backend's existing terminal offer step.
    if (step === 6) void completeFlow();
  }, [step, completeFlow]);

  if (step === 0) return <PromotionFlowFrame><PrimeSuspectScreen /></PromotionFlowFrame>;
  if (step === 1 && barrier) return <PromotionFlowFrame><TruthScreen barrier={barrier} /></PromotionFlowFrame>;
  if (step === 2 && barrier) return <PromotionFlowFrame><SolvingScreen barrierId={barrier.id} barrierLabel={offerPresentation[barrier.id].label} /></PromotionFlowFrame>;
  if (step === 5 && barrier) return <PromotionFlowFrame><InsightScreen barrierId={barrier.id} barrierLabel={offerPresentation[barrier.id].label} choiceId={initialChoice} /></PromotionFlowFrame>;
  if (step === 3 && barrier) return <PromotionFlowFrame><HonestPartScreen barrier={barrier} choice={initialStage === "consequence" ? initialChoice : undefined} /></PromotionFlowFrame>;
  if (step === 6 && barrier) return <PromotionFlowFrame><CheckoutScreen /></PromotionFlowFrame>;

  const offer = barrier ? offerPresentation[barrier.id] : null;
  return <PromotionFlowFrame><main className={styles.offerPage}>
    {step === 4 && barrier && offer && <section className={styles.offerHero}>
      <div className={styles.offerCopy}>
        <div className={styles.offerPicked}><span><i />You picked</span><strong>{offer.label}</strong></div>
        <h1>{offer.headline}</h1>
        <p className={styles.offerIntroduction}>{offer.introduction}</p>
        <section className={styles.offerDirection} aria-label="Your promotion direction">
          <p>Your promotion direction</p>
          <h2>{offer.direction}</h2>
          <div>{offer.guidance}</div>
        </section>
        <section className={styles.offerInside}>
          <h2>Inside Promotion Architect</h2>
          <p>{offer.inside}</p>
        </section>
        <div className={styles.offerActions}>
          <Link href={`/promotion-flow?barrier=${encodeURIComponent(barrier.id)}&stage=checkout${choice ? `&choice=${encodeURIComponent(choice.id)}` : ""}`} onClick={() => {
            trackCtaClick({ location: "promotion_flow_complete", label: "Get access to Promotion Architect", source: readStoDiagnosticContext().source || "promotion_flow" });
            void completeFlow();
          }}>Get access to Promotion Architect <ArrowRight aria-hidden="true" /></Link>
          <p><span aria-hidden="true">✓</span>100% money-back guarantee</p>
        </div>
        <button type="button" onClick={() => { setStep(0); setBarrier(null); }}>Start again</button>
      </div>
      <div className={styles.offerVisual}>
        <div className={styles.offerHalo}>
          <Image src="/promotion-flow/promotion-blueprint-stairs.png" alt="A professional climbing a career blueprint staircase toward an open door" fill priority sizes="(max-width: 700px) 90vw, 540px" />
        </div>
        <div className={styles.actionPlan}><i /><span><strong>Action plan</strong>To get promoted</span></div>
      </div>
    </section>}
  </main></PromotionFlowFrame>;
}

function PromotionFlowFrame({ children }: { children: React.ReactNode }) {
  return <>
    <header className={styles.flowHeader}>
      <nav className={storyStyles.nav} aria-label="Main navigation">
        <Link href="/" className={storyStyles.brand} aria-label="Better Corporate Life home">
          <Image src="/bcl-logo.png" alt="Better Corporate Life" width={210} height={105} priority />
        </Link>
        <PromotionStoryUserNav />
      </nav>
    </header>
    {children}
  </>;
}

function PrimeSuspectScreen() {
  const [caseFileName, setCaseFileName] = useState("");

  useEffect(() => {
    setCaseFileName(readStoDiagnosticContext().name?.trim() || "");
  }, []);

  return <main className={styles.casePage}><div className={styles.caseShell}>
    <header className={styles.caseHeading}><h1>What’s your <em>prime suspect?</em></h1><p>Which explanation do you keep returning to when you ask, “Why am I still stuck?”</p></header>
    <fieldset className={styles.evidenceBoard}><legend>{caseFileName ? `${caseFileName}’s case file` : "Your case file"}</legend><p className={styles.boardInstruction}>Tap one piece of evidence</p>
      <div className={styles.evidenceGrid}>{evidence.map((item) => <article key={item.id} className={styles.evidenceCard}>
        <Link href={`/promotion-flow?barrier=${encodeURIComponent(item.id)}`} className={styles.cardHitArea} aria-label={`Choose ${item.title}`} />
        <span className={styles.tape} aria-hidden="true" />
        {item.stamp && <span className={`${styles.stamp} ${item.id === "biased-manager" ? styles.redStamp : ""}`}>{item.stamp}</span>}
        <span className={styles.evidenceCode}>Evidence {item.code}</span><strong>{item.title}</strong><q>{item.quote}</q>
      </article>)}</div>
    </fieldset><p className={styles.reassurance}><span aria-hidden="true" />There is no right answer. Only the one that feels true.</p>
  </div></main>;
}

function TruthScreen({ barrier }: { barrier: Barrier }) {
  const content = truthContent[barrier.id];
  return <main className={styles.truthPage}>
    <div className={styles.truthShell}>
      <div className={styles.picked}><span><i />You picked</span><strong>{offerPresentation[barrier.id].label}</strong></div>
      <section className={styles.truthStory}>
        <div className={styles.feelsPanel}>
          <span className={styles.quoteMark} aria-hidden="true">“</span>
          <h1>{content.title}</h1>
          <div className={`${styles.barrierSetup} ${styles.barrierSetupGold}`}>{content.setup}</div>
        </div>
        <div className={styles.truthDivider} aria-hidden="true"><i /><span>The truth</span></div>
        <div className={`${styles.changesPanel} ${styles.barrierDetails}`}>
          <div className={styles.barrierBody}>{content.body}</div>
          {content.equation && <p className={styles.barrierEquation}>{content.equation}</p>}
          <div className={styles.barrierAttribution}>
            <Image className={styles.playbookMascot} src="/images/promotion-architect/panda-portrait.png" alt="" width={1254} height={1254} sizes="80px" />
            <div><strong>From the Promotion Architect playbook</strong><em>Distilled from 25 years inside corporate life.</em></div>
          </div>
          <Link href={`/promotion-flow?barrier=${encodeURIComponent(barrier.id)}&stage=principle`}>Show me what I’m missing <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </div>
  </main>;
}

function HonestPartScreen({ barrier, choice }: { barrier: Barrier; choice?: string }) {
  const consequence = choice && Object.hasOwn(consequenceContent, choice) ? consequenceContent[choice] : undefined;
  const base = `/promotion-flow?barrier=${encodeURIComponent(barrier.id)}`;
  return <main className={styles.honestPage}><div className={styles.honestShell}>
    {!consequence ? <section className={styles.honestChoice}>
      <div className={styles.honestCopy}><h1>Right now, what are you <em>relying on to move your</em> career forward?</h1><p>Choose the one closest to the truth.</p></div>
      <HonestArtwork src="/promotion-flow/honest-choice.png" alt="Corporate professional holding his next move" caption={["What he is holding", "His next move"]} />
      <div className={styles.honestOptions}>{honestChoices.map((item, index) => <Link key={item.id} href={`${base}&stage=consequence&choice=${item.id}`}><small>0{index + 1}</small><strong>{item.label}</strong><i /></Link>)}</div>
    </section> : <section className={styles.honestConsequence}>
      <div className={`${styles.honestCopy} ${styles.consequenceIntro}`}><p className={styles.honestEyebrow}><i />You chose <strong>{consequence.chosen}</strong></p><h1>{consequence.title}</h1></div>
      <HonestArtwork src={consequence.image} alt={consequence.chosen} caption={consequence.caption} />
      <div className={`${styles.honestCopy} ${styles.consequenceDetails}`}><div className={styles.unchanged}>Look at what stays unchanged</div><p>{consequence.body}</p><blockquote>Your next move needs to<br />belong to you.</blockquote><Link className={styles.showMe} href={`${base}&stage=offer&choice=${encodeURIComponent(choice!)}`}>Show me how <span>→</span></Link></div>
    </section>}
  </div></main>;
}

function HonestArtwork({ src, alt, caption }: { src: string; alt: string; caption: [string, string] }) {
  return <figure className={styles.honestArtwork}><div><Image src={src} alt={alt} fill sizes="(max-width: 760px) 90vw, 46vw" /></div><figcaption><span>{caption[0]} ·</span><strong>{caption[1]}</strong></figcaption></figure>;
}
