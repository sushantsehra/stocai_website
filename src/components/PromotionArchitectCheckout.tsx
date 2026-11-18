import { Children, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, Check, CheckCircle2, Compass, MessageCircle, Phone, Search, ShieldCheck } from "lucide-react";
import styles from "./promotionArchitectCheckout.module.css";

type Props = {
  amount: number | null;
  callbackAmount: number | null;
  loading: boolean;
  message: string;
  onSubmit: (event: FormEvent) => void;
  onCheckoutClick: () => void;
  callbackLoading: boolean;
  callbackMessage: string;
  callbackConfirmed: boolean;
  onCallbackClick: () => void;
  onPricingRevealed?: () => void;
  onPricingClick?: (opening: boolean) => void;
  presentation?: "modal" | "page";
};

const digitalToolkit = [
  "Stakeholder management, personal branding & networking tools",
  "Awareness videos",
  "AI coach",
  "Accountability partner",
];

const coachingSteps = [
  { title: "Schedule a diagnostic call", description: "Speak with a Corporate Strategist coach.", Icon: Phone },
  { title: "Tell us your situation", description: "Share your concerns, goals and coaching preferences.", Icon: MessageCircle },
  { title: "Understand your promotion barriers", description: "We identify what may be holding you back and where to focus.", Icon: Search },
  { title: "Find the right coaching approach", description: "We recommend coaching to help you build your 30–60–90-day promotion plan.", Icon: Compass },
];

function CallbackFirstOfferGrid({ children }: { children: ReactNode }) {
  const [diyCard, callbackCard] = Children.toArray(children);

  return <div className={styles.offerGrid}>{callbackCard}{diyCard}</div>;
}

export default function PromotionArchitectCheckout({
  amount,
  callbackAmount,
  loading,
  message,
  onSubmit,
  onCheckoutClick,
  callbackLoading,
  callbackMessage,
  callbackConfirmed,
  onCallbackClick,
  onPricingRevealed,
  onPricingClick,
  presentation = "modal",
}: Props) {
  const Heading = presentation === "page" ? "h1" : "h2";
  const price = amount
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount / 100)
    : "At checkout";
  const pricingCtaLabel = amount
    ? `Invest ${price} in my next promotion`
    : "Invest in my next promotion";
  const callbackPrice = callbackAmount
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(callbackAmount / 100)
    : null;

  return (
    <div className={`${styles.checkout} ${presentation === "page" ? styles.page : ""}`}>
      <section className={styles.offer} aria-labelledby="promotion-architect-checkout-title">
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Promotion Architect</p>
          <Heading id="promotion-architect-checkout-title">Build the case for your next promotion.</Heading>
          <p className={styles.subtitle}>Choose the support that works for you.</p>
          <p className={styles.promise} aria-label="Get seen, get believed, get backed">
            <span>Get seen</span><i /><span>Get believed</span><i /><span>Get backed</span>
          </p>
        </header>

        <nav className={styles.offerNav} aria-label="Offer choices">
          <a href="#human-coaching">1:1 Coaching <ArrowDown aria-hidden="true" /></a>
          <a href="#digital-diy">Digital DIY <ArrowDown aria-hidden="true" /></a>
        </nav>

        <CallbackFirstOfferGrid>
          <article className={`${styles.card} ${styles.digitalCard}`} id="digital-diy">
            <div className={styles.digitalIntro}>
              <div className={styles.cardCopy}>
                <p className={styles.cardLabel}>Digital · do it yourself</p>
                <h3>Build your plan.<br />At your pace.</h3>
                <p>A self-paced digital program to build and act on your promotion strategy.</p>
              </div>
              <Image className={styles.mascot} src="/images/promotion-architect/panda-guide.png" alt="Promotion Architect panda holding your promotion plan" width={1122} height={1402} sizes="(min-width: 960px) 260px, 46vw" priority={presentation === "page"} />
            </div>

            <div className={styles.planStrip} aria-label="Your personal 30–60–90-day promotion plan">
              <div className={styles.timeline} aria-hidden="true">{[30, 60, 90].map((day) => <span key={day}>{day}</span>)}</div>
              <strong>Your personal 30–60–90-day promotion plan</strong>
            </div>

            <section className={styles.toolkit} aria-labelledby="digital-toolkit-title">
              <h4 id="digital-toolkit-title"><span>Your digital toolkit</span><i /></h4>
              <ul>{digitalToolkit.map((item) => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}</ul>
            </section>

            <details className={styles.pricing} onToggle={(event) => { if (event.currentTarget.open) onPricingRevealed?.(); }}>
              <summary onClick={(event) => onPricingClick?.(!event.currentTarget.parentElement?.hasAttribute("open"))}>{pricingCtaLabel} <ArrowRight aria-hidden="true" /></summary>
              <div className={styles.priceContent}>
                <h3>What does it take to get promoted?</h3>
                <dl className={styles.comparison}>
                  <div><dt>Executive education</dt><dd>₹5L+</dd></div>
                  <div><dt>Technical certification</dt><dd>₹20K+</dd></div>
                  <div><dt>LinkedIn Premium</dt><dd>₹12K+<small>/year</small></dd></div>
                </dl>
                <p className={styles.comparisonNote}><strong>And none of these guarantees you&apos;ll get promoted.</strong></p>
                <section className={styles.price}>
                  <h3>Promotion Architect</h3>
                  <p><em>Built specifically to help you get seen, believed and backed for your next promotion.</em></p>
                  <div className={styles.amount} aria-live="polite">{price}</div>
                  <del aria-label="Original price ₹15,000">₹15,000</del>
                  <p className={styles.oneTime}>One-time payment</p>
                </section>
                <section className={styles.guarantee}>
                  <h3><ShieldCheck aria-hidden="true" />100% money-back guarantee</h3>
                  <p>Complete the programme. Apply the plan.<br />If you don&apos;t see movement towards your promotion, we&apos;ll refund your payment.</p>
                  <p><strong>No questions asked.</strong></p>
                </section>
                <form onSubmit={onSubmit}>
                  {message && <p className={styles.error} role="status" aria-live="polite">{message}</p>}
                  <button type="submit" disabled={loading} onClick={onCheckoutClick}>{loading ? "Processing..." : <>Get access <ArrowRight aria-hidden="true" /></>}</button>
                  <p className={styles.secure}><em>Instant access · Secure payment</em></p>
                </form>
              </div>
            </details>
          </article>

          <article className={`${styles.card} ${styles.coachingCard}`} id="human-coaching">
            <div className={styles.coachingIntro}>
              <div className={styles.cardCopy}>
                <p className={styles.cardLabel}>1:1 human coaching</p>
                <h3>Get clarity.<br />Plan your next move.</h3>
                <p>A personal strategist to help you work through promotion barriers.</p>
              </div>
              <Image className={styles.coachingImage} src="/images/promotion-architect/diagnostic-coaching.webp" alt="A corporate strategist speaking with a professional during a coaching session" width={1200} height={800} sizes="(min-width: 960px) 300px, 45vw" />
            </div>

            <section className={styles.howItWorks} aria-labelledby="how-it-works-title">
              <h4 id="how-it-works-title"><span>How it works</span><i /></h4>
              <ol>{coachingSteps.map(({ title, description, Icon }) => <li key={title}><span className={styles.stepIcon}><Icon aria-hidden="true" /></span><div><strong>{title}</strong><p>{description}</p></div></li>)}</ol>
            </section>

            <p className={styles.fitPromise}><Check aria-hidden="true" /><i /><strong>If we&apos;re not the right fit, we&apos;ll tell you upfront.</strong></p>
            {callbackConfirmed ? (
              <section className={styles.callbackConfirmed} role="status" aria-live="polite">
                <CheckCircle2 aria-hidden="true" />
                <div><strong>Callback requested</strong><p>{callbackMessage}</p></div>
              </section>
            ) : (
              <>
                {callbackMessage && <p className={styles.error} role="status" aria-live="polite">{callbackMessage}</p>}
                <button type="button" className={styles.diagnosticCta} disabled={callbackLoading || loading} onClick={onCallbackClick}>
                  {callbackLoading ? "Opening payment..." : <>Book a diagnostic call{callbackPrice ? ` — ${callbackPrice}` : ""} <ArrowRight aria-hidden="true" /></>}
                </button>
              </>
            )}
          </article>
        </CallbackFirstOfferGrid>
      </section>
    </div>
  );
}
