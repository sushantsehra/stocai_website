import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, Check, CheckCircle2, ShieldCheck } from "lucide-react";
import styles from "./promotionArchitectCheckout.module.css";

type Props = {
  amount: number | null;
  callbackAmount: number | null;
  loading: boolean;
  message: string;
  onCheckoutClick: () => void;
  callbackLoading: boolean;
  callbackMessage: string;
  callbackConfirmed: boolean;
  onCallbackClick: () => void;
  onPricingViewed?: () => void;
  presentation?: "modal" | "page";
};

const digitalToolkit = [
  { title: "Stakeholder Management, Personal Branding & Networking Tools", description: "Tools to help you build relationships, communicate your contributions and strengthen your professional presence." },
  { title: "Awareness Videos", description: "Understand what it takes to get seen, believed and backed for your next promotion." },
  { title: "AI Coach", description: "Get guidance as you work through your promotion strategy." },
  { title: "Accountability Partner", description: "Stay focused and keep moving towards your goals." },
];

const coachingTopics = [
  { title: "Your current situation and career goals.", description: "Clarify where you are now, what you want next and what a successful promotion would mean for you." },
  { title: "The challenges holding you back.", description: "Explore the decisions, relationships or workplace dynamics that may be slowing your progress." },
  { title: "Your promotion barriers and areas to focus on.", description: "Identify the gaps in visibility, support or readiness that deserve your attention first." },
  { title: "Possible next steps and the right coaching approach.", description: "Leave with practical priorities and a clearer sense of whether coaching could help you move forward." },
];

export default function PromotionArchitectCheckout({
  amount,
  callbackAmount,
  loading,
  message,
  onCheckoutClick,
  callbackLoading,
  callbackMessage,
  callbackConfirmed,
  onCallbackClick,
  onPricingViewed,
  presentation = "modal",
}: Props) {
  const pricingViewTracked = useRef(false);
  useEffect(() => {
    if (pricingViewTracked.current) return;
    pricingViewTracked.current = true;
    onPricingViewed?.();
  }, [onPricingViewed]);

  const Heading = presentation === "page" ? "h1" : "h2";
  const price = amount
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount / 100)
    : "At checkout";
  const callbackPrice = callbackAmount
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(callbackAmount / 100)
    : null;

  return (
    <div className={`${styles.checkout} ${presentation === "page" ? styles.page : ""}`}>
      <section className={styles.offer} aria-labelledby="promotion-architect-checkout-title">
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Promotion Architect</p>
          <Heading id="promotion-architect-checkout-title">Build the case for your next promotion.</Heading>
          <p className={styles.subtitle}>Start with a plan. Choose how you want to move forward.</p>
        </header>

        <nav className={styles.offerNav} aria-label="Offer choices">
          <a href="#digital-diy">Digital programme <ArrowDown aria-hidden="true" /></a>
          <a href="#human-coaching">Talk to a strategist <ArrowDown aria-hidden="true" /></a>
        </nav>

        <div className={styles.offerGrid}>
          <article className={`${styles.card} ${styles.digitalCard}`} id="digital-diy">
            <div className={styles.digitalIntro}>
              <div className={styles.cardCopy}>
                <h3>DIGITAL PROGRAMME</h3>
                <p>A self-paced digital programme to help you build and act on your promotion strategy.</p>
              </div>
              <Image className={styles.mascot} src="/images/promotion-architect/panda-guide.png" alt="Promotion Architect panda holding your promotion plan" width={1122} height={1402} sizes="(min-width: 960px) 260px, 46vw" priority={presentation === "page"} />
            </div>

            <div className={styles.planStrip} aria-label="Your personal 30–60–90-day promotion plan">
              <div className={styles.timeline} aria-hidden="true">{[30, 60, 90].map((day) => <span key={day}>{day}</span>)}</div>
              <div><strong>Your personal 30–60–90-day promotion plan</strong><p>A structured roadmap to turn your promotion goals into actionable priorities.</p></div>
            </div>

            <section className={styles.toolkit} aria-labelledby="digital-toolkit-title">
              <h4 id="digital-toolkit-title"><span>Your digital toolkit</span><i /></h4>
              <ul>{digitalToolkit.map((item) => <li key={item.title}><Check aria-hidden="true" /><span><strong>{item.title}</strong><p>{item.description}</p></span></li>)}</ul>
            </section>

            <section className={styles.pricing} aria-label="Promotion Architect pricing">
              <div className={styles.priceContent}>
                <section className={styles.price}>
                  <div className={styles.amount} aria-live="polite">{price}</div>
                  <p className={styles.oneTime}>One-time payment. Instant programme access.</p>
                </section>
                <div className={styles.checkoutAction}>
                  {message && <p className={styles.error} role="status" aria-live="polite">{message}</p>}
                  <button type="button" disabled={loading} onClick={onCheckoutClick}>{loading ? "Processing..." : <>GET PROMOTION ARCHITECT <ArrowRight aria-hidden="true" /></>}</button>
                </div>
                <section className={styles.guarantee}>
                  <h3><ShieldCheck aria-hidden="true" />100% money-back guarantee</h3>
                  <p>Complete the programme. Apply the plan.<br />If you don&apos;t see movement towards your promotion, we&apos;ll refund your payment.</p>
                  <p><strong>No questions asked.</strong></p>
                </section>
              </div>
            </section>
          </article>

          <article className={`${styles.card} ${styles.coachingCard}`} id="human-coaching">
            <div className={styles.coachingIntro}>
              <div className={styles.cardCopy}>
                <h3>TALK TO A STRATEGIST</h3>
                <p className={styles.cardLabel}>1:1 strategist conversation</p>
                <h4>Get clarity. Plan your next move.</h4>
                <p>Sometimes, you need another perspective to understand what&apos;s holding you back and what to do next.</p>
              </div>
              <Image className={styles.coachingImage} src="/images/promotion-architect/diagnostic-coaching.webp" alt="A corporate strategist speaking with a professional during a coaching session" width={1200} height={800} sizes="(min-width: 960px) 300px, 45vw" />
              <p className={styles.coachingFullWidth}>Speak with a Corporate Strategist about your situation, your promotion goals and the challenges you&apos;re navigating.</p>
            </div>

            <section className={styles.howItWorks} aria-labelledby="how-it-works-title">
              <h4 id="how-it-works-title"><span>What we’ll cover</span><i /></h4>
              <ul className={styles.topicList}>{coachingTopics.map((topic) => <li key={topic.title}><div><strong>{topic.title}</strong><p>{topic.description}</p></div></li>)}</ul>
            </section>

            {callbackConfirmed ? (
              <section className={styles.callbackConfirmed} role="status" aria-live="polite">
                <CheckCircle2 aria-hidden="true" />
                <div><strong>Callback requested</strong><p>{callbackMessage}</p></div>
              </section>
            ) : (
              <>
                {callbackMessage && <p className={styles.error} role="status" aria-live="polite">{callbackMessage}</p>}
                <button type="button" className={styles.diagnosticCta} disabled={callbackLoading || loading} onClick={onCallbackClick}>
                  {callbackLoading ? "Opening payment..." : <>{callbackPrice ? `First call for just ${callbackPrice}` : "Book your diagnostic call"} <ArrowRight aria-hidden="true" /></>}
                </button>
              </>
            )}
            <p className={styles.fitPromise}>If we&apos;re not the right fit, we&apos;ll tell you upfront.</p>
          </article>
        </div>
      </section>
    </div>
  );
}
