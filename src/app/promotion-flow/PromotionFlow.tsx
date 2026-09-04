"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { readStoDiagnosticContext } from "@/lib/diagnosticContext";
import { barriers, type Barrier } from "./flowData";
import PromotionStoryAccessFlow from "../promotion-story/PromotionStoryAccessFlow";
import PromotionStoryUserNav from "../promotion-story/PromotionStoryUserNav";
import storyStyles from "../promotion-story/page.module.css";
import { usePromotionFlowTracking } from "./usePromotionFlowTracking";
import styles from "./promotionFlow.module.css";

const evidence: ReadonlyArray<{ id: string; code: string; title: string; quote: string; stamp?: string }> = [
  { id: "office-politics", code: "A", title: "Office politics", quote: "I refuse to play those games." },
  { id: "biased-manager", code: "B", title: "My manager", quote: "They simply don’t back me.", stamp: "Not backed" },
  { id: "invisible-work", code: "C", title: "Invisible work", quote: "The work is seen. My name isn’t." },
  { id: "zero-network", code: "D", title: "My network", quote: "I don’t know the people who matter." },
  { id: "executive-presence", code: "E", title: "Executive presence", quote: "I don’t show up as a next-level leader.", stamp: "Reliable doer" },
];

const truthContent: Record<string, { feels: string; truth: string; context: string }> = {
  "office-politics": { feels: "Office politics can feel exhausting—especially when moving ahead seems to require playing games you don’t want to play.", truth: "You don’t have to play those games.", context: "But no company can exist without people influencing decisions, forming alliances and protecting their interests." },
  "biased-manager": { feels: "Feeling unsupported by your manager can make every step forward seem harder than it should be.", truth: "You don’t have to wait for their approval.", context: "Managers are human and naturally biased. The shift is learning how to make your value easier to see, support and advocate for." },
  "invisible-work": { feels: "Doing excellent work without being recognised can make effort feel pointless—and your progress feel out of your hands.", truth: "Your work can become impossible to overlook.", context: "Leaders rarely see every detail. Visibility grows when the value, story and business impact of your work travel beyond the work itself." },
  "zero-network": { feels: "Building a network can feel forced—especially when you believe the right relationships belong to natural extroverts.", truth: "You don’t have to become someone else to connect.", context: "Strong networks are built through useful exchanges and earned trust, not endless small talk or collecting contacts." },
  "executive-presence": { feels: "Executive presence can feel like a mysterious quality reserved for louder, more polished or naturally confident people.", truth: "Presence is a skill—not a personality type.", context: "It grows when you can stay clear, grounded and decisive in the moments where pressure normally makes you fight, flee or freeze." },
};

const principleContent: Record<string, { title: string; watermark: string; stages: [string, string, string]; symbol: string; prompt: string; explanation: string }> = {
  "office-politics": { title: "People act according to their incentives.", watermark: "INCENTIVES", stages: ["Incentives", "Behaviour", "Office politics"], symbol: "→", prompt: "Align here", explanation: "Office politics becomes easier to understand when you see that people act according to their incentives. Aligning those incentives is the first step in navigating it." },
  "biased-manager": { title: "Managers are human before they are managers.", watermark: "ATTENTION", stages: ["Limited attention", "Human bias", "What gets noticed"], symbol: "+", prompt: "Design for this", explanation: "Treat managers the way good parents treat teenagers: don’t assume they will always pay attention or make the smartest choice. Make it easier for them to notice what matters." },
  "invisible-work": { title: "Good work still needs a story.", watermark: "STORY", stages: ["Quality of work", "Story of work", "Visibility"], symbol: "×", prompt: "Keep yourself at the centre", explanation: "Visibility is tied to the quality of your work—and to how well you tell its story in a way leadership finds relevant, while keeping your contribution at the centre." },
  "zero-network": { title: "A network begins with what you can give.", watermark: "VALUE", stages: ["Value given", "Relationships", "Opportunities"], symbol: "→", prompt: "Start here", explanation: "Most people begin by asking whom they should connect with. A stronger network begins by understanding what you can give." },
  "executive-presence": { title: "Presence is revealed under pressure.", watermark: "RESPONSE", stages: ["Pressure", "Fight / flight / freeze", "Perceived readiness"], symbol: "→", prompt: "Work here", explanation: "Executive presence is not dressing well or sounding polished. It is overcoming fight, flight or freeze when a meeting or conversation becomes difficult." },
};

const honestChoices = [
  { id: "change", label: "Changing jobs" },
  { id: "hope", label: "Hoping things improve" },
  { id: "manager", label: "Trusting my manager will notice me" },
] as const;

const offerPresentation: Record<string, { label: string; headline: React.ReactNode }> = {
  "office-politics": { label: "Office Politics", headline: <>Get promoted without playing <em>office politics.</em></> },
  "biased-manager": { label: "My Manager", headline: <>Don’t just have managers. Get <em>godfathers who promote you.</em></> },
  "invisible-work": { label: "Invisible Work", headline: <>Build a memorable brand that speaks <em>louder than your work.</em></> },
  "zero-network": { label: "My Network", headline: <>Don’t just connect with people. Connect <em>with opportunities.</em></> },
  "executive-presence": { label: "Executive Presence", headline: <>Be naturally seen <em>as next level.</em></> },
};

const consequenceContent: Record<string, { chosen: string; title: React.ReactNode; body: string; image: string; caption: [string, string] }> = {
  change: { chosen: "Changing jobs", title: <>A new company can still produce <em>the same career.</em></>, body: "Changing jobs changes the setting. Without changing how you manage your career, the same conditions can follow you into the next role.", image: "/promotion-flow/honest-change.png", caption: ["Different company", "Same pattern"] },
  hope: { chosen: "Hoping things improve", title: <>Hope is <em>not a strategy.</em></>, body: "While you wait for things to improve, someone else continues making the decisions that shape your career.", image: "/promotion-flow/honest-hope.png", caption: ["Time moves", "The career doesn’t"] },
  manager: { chosen: "Trusting my manager", title: <>Who is in control of <em>your career?</em></>, body: "A supportive manager helps. But your progress should never depend on one person noticing you.", image: "/promotion-flow/honest-manager.png", caption: ["The next move", "In their hands"] },
};

export default function PromotionFlow({ initialBarrierId, initialStage, initialChoice }: { initialBarrierId?: string; initialStage?: string; initialChoice?: string }) {
  const initialBarrier = barriers.find((item) => item.id === initialBarrierId) ?? null;
  const initialStep = initialBarrier ? (initialStage === "principle" ? 2 : ["application", "consequence"].includes(initialStage ?? "") ? 3 : initialStage === "offer" ? 4 : 1) : 0;
  const [step, setStep] = useState(initialStep);
  const [barrier, setBarrier] = useState<Barrier | null>(initialBarrier);
  const choice = honestChoices.find((item) => item.id === initialChoice);
  const currentStep = step === 0 ? "prime_suspect" : step === 1 ? "truth" : step === 2 ? "principle" : step === 3 ? (initialStage === "consequence" ? "consequence" : "honest_choice") : "offer";
  const { completeFlow } = usePromotionFlowTracking({
    currentStep,
    answers: {
      ...(barrier ? { barrier_id: barrier.id, barrier_label: barrier.label } : {}),
      ...(choice ? { choice_id: choice.id, choice_label: choice.label } : {}),
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [step]);

  if (step === 0) return <PromotionFlowFrame><PrimeSuspectScreen /></PromotionFlowFrame>;
  if (step === 1 && barrier) return <PromotionFlowFrame><TruthScreen barrier={barrier} /></PromotionFlowFrame>;
  if (step === 2 && barrier) return <PromotionFlowFrame><PrincipleScreen barrier={barrier} /></PromotionFlowFrame>;
  if (step === 3 && barrier) return <PromotionFlowFrame><HonestPartScreen barrier={barrier} choice={initialStage === "consequence" ? initialChoice : undefined} /></PromotionFlowFrame>;

  const offer = barrier ? offerPresentation[barrier.id] : null;
  return <PromotionFlowFrame><main className={styles.offerPage}>
    {step === 4 && barrier && offer && <section className={styles.offerHero}>
      <div className={styles.offerCopy}>
        <div className={styles.offerPicked}><span><i />You picked</span><strong>{offer.label}</strong></div>
        <h1>{offer.headline}</h1>
        <div className={styles.offerActions}>
          <a href="#promotion-flow-access" onClick={() => { void completeFlow(); }} data-cta-location="promotion_flow_complete">Get access to Promotion Architect <ArrowRight aria-hidden="true" /></a>
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
    {step === 4 && <PromotionStoryAccessFlow modalTriggerAnchorId="promotion-flow-access" showSticky={false} />}
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
        <a href={`/promotion-flow?barrier=${encodeURIComponent(item.id)}`} className={styles.cardHitArea} aria-label={`Choose ${item.title}`} />
        <span className={styles.tape} aria-hidden="true" />
        {item.stamp && <span className={`${styles.stamp} ${item.id === "biased-manager" ? styles.redStamp : ""}`}>{item.stamp}</span>}
        <span className={styles.evidenceCode}>Evidence {item.code}</span><strong>{item.title}</strong><q>{item.quote}</q>
      </article>)}</div>
    </fieldset><p className={styles.reassurance}><span aria-hidden="true" />There is no right answer—only the one that feels true.</p>
  </div></main>;
}

function TruthScreen({ barrier }: { barrier: Barrier }) {
  const content = truthContent[barrier.id];
  return <main className={styles.truthPage}>
    <div className={styles.truthShell}>
      <div className={styles.picked}><span><i />You picked</span><strong>{barrier.label}</strong></div>
      <section className={styles.truthStory}>
        <div className={styles.feelsPanel}><span className={styles.quoteMark} aria-hidden="true">“</span><p className={styles.truthEyebrow}>What it feels like</p><h1>{content.feels}</h1></div>
        <div className={styles.truthDivider} aria-hidden="true"><i /><span>The truth</span></div>
        <div className={styles.changesPanel}><p className={styles.truthEyebrow}>What changes the picture</p><h2>{content.truth}</h2><i className={styles.tealRule} /><p>{content.context}</p><a href={`/promotion-flow?barrier=${encodeURIComponent(barrier.id)}&stage=principle`}>What can I do about it? <span aria-hidden="true">→</span></a></div>
      </section>
      <p className={styles.truthFolio}>PA / Truth 02</p>
    </div>
  </main>;
}

function PrincipleScreen({ barrier }: { barrier: Barrier }) {
  const content = principleContent[barrier.id];
  return <main className={styles.principlePage}><div className={styles.principleShell}>
    <div className={styles.picked}><span><i />You picked</span><strong>{barrier.label}</strong></div>
    <section className={styles.principleFrame}>
      <p className={styles.principleEyebrow}>A BCL promotion principle</p><h1>{content.title}</h1>
      <div className={styles.principleDiagram} style={{ "--watermark": `"${content.watermark}"` } as React.CSSProperties}>
        {content.stages.map((stage, index) => <div key={stage} className={index === 0 ? styles.activePrinciple : ""}><small>0{index + 1}</small><strong>{stage}</strong>{index === 0 && <span>{content.prompt}</span>}{index < 2 && <b aria-hidden="true">{index === 0 ? content.symbol : "→"}</b>}</div>)}
      </div>
      <p className={styles.principleExplanation}>{content.explanation}</p>
      <footer className={styles.principleFooter}><div><strong>From the Promotion Architect playbook</strong><span>Distilled from 25 years inside corporate life.</span></div><a href={`/promotion-flow?barrier=${encodeURIComponent(barrier.id)}&stage=application`}>Show me how this applies to me <span aria-hidden="true">→</span></a></footer>
    </section>
  </div></main>;
}

function HonestPartScreen({ barrier, choice }: { barrier: Barrier; choice?: string }) {
  const consequence = choice ? consequenceContent[choice] : undefined;
  const base = `/promotion-flow?barrier=${encodeURIComponent(barrier.id)}`;
  return <main className={styles.honestPage}><div className={styles.honestShell}>
    {!consequence ? <section className={styles.honestChoice}>
      <div className={styles.honestCopy}><p className={styles.honestEyebrow}><i />The honest part</p><h1>Right now, what are you <em>relying on to move your</em> career forward?</h1><p>Choose the one closest to the truth.</p></div>
      <HonestArtwork src="/promotion-flow/honest-choice.png" alt="Corporate professional holding his next move" caption={["What he is holding", "His next move"]} />
      <div className={styles.honestOptions}>{honestChoices.map((item, index) => <a key={item.id} href={`${base}&stage=consequence&choice=${item.id}`}><small>0{index + 1}</small><strong>{item.label}</strong><i /></a>)}</div>
    </section> : <section className={styles.honestConsequence}>
      <div className={`${styles.honestCopy} ${styles.consequenceIntro}`}><p className={styles.honestEyebrow}><i />You chose <strong>{consequence.chosen}</strong></p><span className={styles.uncomfortable}>The uncomfortable consequence</span><h1>{consequence.title}</h1></div>
      <HonestArtwork src={consequence.image} alt={consequence.chosen} caption={consequence.caption} />
      <div className={`${styles.honestCopy} ${styles.consequenceDetails}`}><div className={styles.unchanged}>Look at what stays unchanged</div><p>{consequence.body}</p><blockquote>Your next move needs to<br />belong to you.</blockquote><a className={styles.showMe} href={`${base}&stage=offer`}>Show me how <span>→</span></a></div>
    </section>}
  </div></main>;
}

function HonestArtwork({ src, alt, caption }: { src: string; alt: string; caption: [string, string] }) {
  return <figure className={styles.honestArtwork}><div><Image src={src} alt={alt} fill sizes="(max-width: 760px) 90vw, 46vw" /></div><figcaption><span>{caption[0]} ·</span><strong>{caption[1]}</strong></figcaption></figure>;
}
