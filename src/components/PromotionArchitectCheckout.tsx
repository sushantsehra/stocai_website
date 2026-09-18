import type { FormEvent } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronDown, ShieldCheck } from "lucide-react";
import styles from "./promotionArchitectCheckout.module.css";

type Props = {
  amount: number | null;
  loading: boolean;
  message: string;
  onSubmit: (event: FormEvent) => void;
  onCheckoutClick: () => void;
  onPricingRevealed?: () => void;
  presentation?: "modal" | "page";
};

export default function PromotionArchitectCheckout({ amount, loading, message, onSubmit, onCheckoutClick, onPricingRevealed, presentation = "modal" }: Props) {
  const Heading = presentation === "page" ? "h1" : "h2";
  const price = amount ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount / 100) : "At checkout";

  return <div className={`${styles.checkout} ${presentation === "page" ? styles.page : ""}`}>
    <div className={styles.cover}>
    <div className={styles.coverInner}>
    <div className={styles.trust}><span aria-hidden="true">★</span><div><strong>Trusted by 500+ professionals</strong><p>4.8/5 average rating <span aria-hidden="true">★★★★★</span></p></div></div>
    <header className={styles.hero}>
      <Heading id="promotion-architect-checkout-title">Promotion <span>Architect</span></Heading>
      <p className={styles.tagline}>Build the case for your next promotion.</p>
      <p>A practical system to help you get seen, get believed and get backed for the next level.</p>
    </header>
    <Image className={styles.mascot} src="/images/promotion-architect/panda-guide.png" alt="Promotion Architect panda holding your promotion plan" width={1122} height={1402} sizes="(min-width: 960px) 300px, 240px" />
    </div>
    </div>
    <div className={styles.content}>
    <section className={styles.positioning}>
      <h3>Not another career course.</h3>
      <p>Courses can build skills.<br />Certifications can build credentials.<br />Networking can build connections.</p>
      <p><strong>Promotion Architect helps you turn what you&apos;ve already built into a case for promotion.</strong></p>
    </section>
    <div className={styles.pillars}>
      <div><h3>Get seen</h3><p>Make your value visible</p></div>
      <div><h3>Get believed</h3><p>Signal you&apos;re ready for more</p></div>
      <div><h3>Get backed</h3><p>Build the advocacy that matters</p></div>
    </div>
    <section className={styles.includes}>
      <h3>Your Promotion Architect includes</h3>
      <ul>{["30–60–90 Day Promotion Plan", "Stakeholder + Personal Brand Tools", "AI Coach + Accountability Partner", "Coach on Call"].map((item) => <li key={item}><CheckCircle2 aria-hidden="true" /><strong>{item}</strong></li>)}</ul>
    </section>
    <details className={styles.pricing} onToggle={(event) => { if (event.currentTarget.open) onPricingRevealed?.(); }}>
      <summary>Show me what it costs <ChevronDown aria-hidden="true" /></summary>
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
    </div>
  </div>;
}
