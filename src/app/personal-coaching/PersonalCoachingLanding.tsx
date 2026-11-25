"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  LockKeyhole,
  Map,
  Network,
  Presentation,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import posthog from "posthog-js";
import env from "@/utils/env";
import { getAttributionForApi } from "@/lib/analytics/attribution";
import { getWaitlistVisitorId } from "@/lib/waitlistVisitor";
import {
  trackCtaClick,
  trackInitiateCheckout,
  trackPurchase,
  trackRazorpayCheckoutOpened,
} from "@/lib/analytics/events";
import { openRazorpayCheckout } from "@/lib/razorpayCheckout";
import { formatSubscriptionAmount, usePaymentSettings } from "@/hooks/useSubscriptionAmount";
import {
  buildPersonalCoachingCompletionUrl,
  PERSONAL_COACHING_OFFER_CODE,
} from "./personalCoachingCheckout";
import styles from "./personalCoaching.module.css";

const areas = [
  { icon: Map, title: "Build your promotion strategy", copy: "Know which moves to make, with whom and when." },
  { icon: Network, title: "Build your promotability skills", copy: "Develop visibility, influence, stakeholder management, networking and personal branding." },
  { icon: LockKeyhole, title: "Remove your personal barriers", copy: "Identify and overcome the habits, beliefs and behaviours limiting your progression." },
  { icon: Users, title: "Navigate bosses and stakeholders", copy: "Manage difficult relationships, expectations and workplace dynamics with confidence." },
  { icon: Presentation, title: "Perfect your brand and promotion pitch", copy: "Articulate your value and build a compelling case for your next role." },
];

const inclusions = [
  "Your Personal Corporate Strategist",
  "Promotability skill development",
  "Personal barrier identification and resolution",
  "Your personalised promotion strategy and action plan",
  "Personal brand and promotion pitch refinement",
];

type FormState = { name: string; email: string; phone: string };
type JsonRecord = Record<string, unknown>;

const readJson = async (response: Response) =>
  response.json().catch(() => ({})) as Promise<JsonRecord>;

export default function PersonalCoachingLanding() {
  const { personalCoachingAmount, currency } = usePaymentSettings();
  const checkoutAvailable = Boolean(personalCoachingAmount && personalCoachingAmount > 0);
  const priceLabel = checkoutAvailable
    ? formatSubscriptionAmount(personalCoachingAmount as number)
    : "Price unavailable";
  const discountPercent = checkoutAvailable
    ? Math.max(0, Math.round((1 - (personalCoachingAmount as number) / 5_000_000) * 100))
    : null;
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && status !== "loading") setIsOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, status]);

  const openForm = (location: string) => {
    if (!checkoutAvailable) return;
    trackCtaClick({ location, label: "Get my Personal Strategist", source: "personal_coaching" });
    posthog.capture("personal_coaching_checkout_started", { location, offer_code: PERSONAL_COACHING_OFFER_CODE });
    setMessage("");
    setStatus("idle");
    setIsOpen(true);
  };

  const startCheckout = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      if (!personalCoachingAmount) {
        throw new Error("Personal coaching checkout is not configured yet.");
      }
      const waitlistResponse = await fetch(`${env.apiUrl}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: `+91${form.phone.trim()}`,
          source: "personal_coaching",
          visitorId: getWaitlistVisitorId(),
          attribution: getAttributionForApi(),
        }),
      });
      const waitlist = await readJson(waitlistResponse);
      if (!waitlistResponse.ok) throw new Error(String(waitlist.error || "Unable to save your details."));
      const referenceId = String(
        waitlist.reference_id
        || waitlist.referenceId
        || waitlist.waitlist_id
        || waitlist.waitlistId
        || waitlist.id
        || "",
      );
      if (!referenceId) throw new Error("Your checkout reference was not returned. Please try again.");

      const orderResponse = await fetch(`${env.apiUrl}/payments/razorpay/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: `+91${form.phone.trim()}`,
          reference_id: referenceId,
          offer_code: PERSONAL_COACHING_OFFER_CODE,
        }),
      });
      const order = await readJson(orderResponse);
      if (!orderResponse.ok) throw new Error(String(order.detail || order.error || "Unable to start payment."));

      if (["already_active", "activation_required"].includes(String(order.state))) {
        const destination = new URL(String(order.completion_url || "/signUp"), window.location.origin);
        destination.searchParams.set("auth", "login");
        if (order.state === "activation_required") destination.searchParams.set("payment", "already_paid");
        window.location.assign(destination.toString());
        return;
      }
      if (!order.order_id || !order.key_id || typeof order.amount !== "number") {
        throw new Error("Payment order was not returned.");
      }
      if (order.amount !== personalCoachingAmount || order.currency !== currency) {
        throw new Error("Checkout pricing is not configured for this offer. No payment was taken.");
      }

      const checkoutId = String(order.checkout_attempt_id || order.order_id);
      trackInitiateCheckout({ checkoutId, orderId: String(order.order_id), value: order.amount, currency, source: "personal_coaching" });
      trackRazorpayCheckoutOpened({ checkoutId, orderId: String(order.order_id), value: order.amount, currency, source: "personal_coaching" });
      const verification = await openRazorpayCheckout(order as never, env.apiUrl);
      await trackPurchase({
        orderId: String(order.order_id),
        paymentId: verification.razorpay_payment_id as string | undefined,
        value: order.amount,
        currency,
        source: "personal_coaching",
      });
      if (!order.completion_url) {
        throw new Error("Payment succeeded, but the signup destination is unavailable. Please contact support.");
      }
      window.location.assign(buildPersonalCoachingCompletionUrl(
        String(order.completion_url),
        verification,
        window.location.origin,
      ));
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      posthog.capture("personal_coaching_checkout_failed", {
        offer_code: PERSONAL_COACHING_OFFER_CODE,
        error: error instanceof Error ? error.message : "unknown_error",
      });
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Image src="/bcl-logo.png" alt="Better Corporate Life" width={246} height={72} priority />
        <span>PA / 1:1</span>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Promotion Architect · Personalised Coaching</p>
            <h1>1:1 Human Coaching for Your Next Promotion</h1>
            <h2>Build your promotion strategy with your personal Corporate Strategist.</h2>
            <p className={styles.lead}>Work 1:1 with a real human strategist to build your promotion strategy, develop your promotability skills and overcome the barriers holding you back.</p>
            <PrimaryButton disabled={!checkoutAvailable} onClick={() => openForm("personal_coaching_hero")} />
            <SecureNote priceLabel={priceLabel} />
          </div>
          <Image className={styles.heroImage} src="/personal-coaching/coaching-session.png" alt="A corporate strategist coaching a professional in a one-to-one session" width={1456} height={1092} sizes="(min-width: 900px) 48vw, 100vw" priority />
        </div>
      </section>

      <div className={styles.strap}>Your ambition. Your context. Your strategist.</div>

      <section className={styles.dossier}>
        <p className={styles.eyebrow}>Your personal promotion dossier</p>
        <h2>Five areas. One clear objective.</h2>
        <div className={styles.areaList}>
          {areas.map(({ icon: Icon, title, copy }, index) => (
            <article className={styles.areaCard} key={title}>
              <span className={styles.areaIcon}><Icon aria-hidden="true" /></span>
              <div><h3>{title}</h3><p>{copy}</p></div>
              <small>{String(index + 1).padStart(2, "0")}</small>
            </article>
          ))}
        </div>

        <section className={styles.offer} aria-labelledby="personal-coaching-offer">
          <div className={styles.offerPrice}>
            <p className={styles.eyebrow}>Invest in your next level</p>
            <span className={styles.offerTag}>Promotion Architect</span>
            <h2 id="personal-coaching-offer">1:1 Personal Coaching</h2>
            <p>Complete personalised coaching program</p>
            <del>₹50,000</del>
            <strong>{priceLabel}</strong>
            {discountPercent !== null && <span className={styles.discount}>({discountPercent}% off)</span>}
            <p>One-time payment for the full program</p>
          </div>
          <div className={styles.included}>
            <h2>What’s included</h2>
            <div className={styles.sessions}><strong>7<small>sessions</small></strong><p><b>7 personalised 1:1 coaching sessions</b><span>With your Personal Corporate Strategist</span></p></div>
            <ul>{inclusions.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
            <PrimaryButton disabled={!checkoutAvailable} onClick={() => openForm("personal_coaching_offer")} />
            <SecureNote priceLabel={priceLabel} />
          </div>
        </section>
      </section>

      <footer className={styles.footer}><strong>Next time, it should be for you.</strong><span>Better Corporate Life</span></footer>

      {isOpen && (
        <div className={styles.modalBackdrop} onMouseDown={(event) => {
          if (event.target === event.currentTarget && status !== "loading") setIsOpen(false);
        }}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="checkout-title">
            <button className={styles.modalClose} type="button" aria-label="Close checkout" disabled={status === "loading"} onClick={() => setIsOpen(false)}><X /></button>
            <p className={styles.eyebrow}>Secure checkout · {priceLabel}</p>
            <h2 id="checkout-title">Meet your Personal Strategist</h2>
            <p>Share your details to continue to Razorpay. Your coaching access and welcome email are activated after verified payment.</p>
            <form onSubmit={startCheckout}>
              <label>Full name<input aria-label="Full name" autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></label>
              <label>Email address<input aria-label="Email address" type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label>
              <label>Phone number<div className={styles.phoneInput}><span>+91</span><input aria-label="Phone number" type="tel" inputMode="numeric" autoComplete="tel-national" pattern="[0-9]{10}" maxLength={10} value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value.replace(/\D/g, "") })} required /></div></label>
              {message && <p className={styles.formError} role="alert">{message}</p>}
              <button className={styles.checkoutButton} type="submit" disabled={status === "loading"}>{status === "loading" ? "Starting secure checkout…" : <>Continue to secure checkout <ArrowRight /></>}</button>
            </form>
            <SecureNote priceLabel={priceLabel} />
          </section>
        </div>
      )}
    </main>
  );
}

function PrimaryButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return <button className={styles.primaryButton} type="button" disabled={disabled} onClick={onClick}>Get my Personal Strategist <ArrowRight aria-hidden="true" /></button>;
}

function SecureNote({ priceLabel }: { priceLabel: string }) {
  return <p className={styles.secure}><ShieldCheck aria-hidden="true" /> Secure checkout · {priceLabel}</p>;
}
