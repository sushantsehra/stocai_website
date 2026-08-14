"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Gift,
  ShieldCheck,
  Target,
  UserRound,
  X,
} from "lucide-react";
import posthog from "posthog-js";
import env from "@/utils/env";
import useSubscriptionAmount, {
  formatSubscriptionAmount,
} from "@/hooks/useSubscriptionAmount";
import {
  trackCtaClick,
  trackInitiateCheckout,
  trackPurchase,
  trackRazorpayCheckoutOpened,
} from "@/lib/analytics/events";
import { openRazorpayCheckout } from "@/lib/razorpayCheckout";

const pushToDataLayer = (payload: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  const dataLayerWindow = window as unknown as Window & { dataLayer?: unknown[] };
  if (!dataLayerWindow.dataLayer) {
    dataLayerWindow.dataLayer = [];
  }
  dataLayerWindow.dataLayer.push(payload);
};

type HeroWaitlistProps = {
  bgImage?: string;
  isOpen: boolean;
  onClose: (reason?: "x_button" | "escape") => void;
  initialEmail?: string;
  initialReferenceId?: string;
  initialWaitlistId?: string;
  initialName?: string;
  initialPhone?: string;
  initialCountryCode?: string;
  source?: string;
  onSubmit?: (data: {
    name: string;
    phone: string;
    email: string;
  }) => void;
};

type ConsultationSlot = { start: string; end: string; start_utc?: string; end_utc?: string };

const promotionBenefits = [
  ["Get credit", "for your work"],
  ["Become your boss's", "go-to."],
  ["Do more", "without burnout."],
  ["Build a promotion pitch", "that wins."],
  ["Speak up", "with confidence."],
];

const PromotableHeroWaitlist: React.FC<HeroWaitlistProps> = ({
  isOpen,
  onClose,
  initialEmail,
  initialReferenceId,
  initialName,
  initialPhone,
  initialCountryCode = "+91",
  source = "waitlist_modal",
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [discountCode, setDiscountCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const subscriptionAmount = useSubscriptionAmount(isOpen);
  const [consultationStatus, setConsultationStatus] = useState<"idle" | "loading" | "error">("idle");
  const [consultationMessage, setConsultationMessage] = useState("");
  const [consultationAmount, setConsultationAmount] = useState<number | null>(null);
  const [consultationSlots, setConsultationSlots] = useState<ConsultationSlot[]>([]);
  const [selectedSlotStart, setSelectedSlotStart] = useState("");
  const [selectedConsultationDate, setSelectedConsultationDate] = useState("");
  const [showConsultationSlots, setShowConsultationSlots] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(initialName || "");
      setEmail(initialEmail || "");
      setPhone(initialPhone || "");
      setCountryCode(initialCountryCode || "+91");
      setDiscountCode("");
      setConsultationAmount(null);
      setConsultationSlots([]);
      setConsultationStatus("idle");
      setConsultationMessage("");
      setSelectedSlotStart("");
      setSelectedConsultationDate("");
      setShowConsultationSlots(false);
    }
  }, [isOpen, initialName, initialEmail, initialPhone, initialCountryCode]);

  useEffect(() => {
    if (!isOpen) return;
    const controller = new AbortController();
    fetch(`${env.apiUrl}/consultations/slots`, { signal: controller.signal })
      .then((response) => response.json().then((data) => ({ ok: response.ok, data })))
      .then(({ ok, data }) => {
        if (ok && data?.enabled) {
          setConsultationAmount(data.amount || null);
          setConsultationSlots(Array.isArray(data.slots) ? data.slots : []);
        } else {
          setConsultationAmount(null);
          setConsultationSlots([]);
        }
      })
      .catch((reason) => {
        if (reason?.name !== "AbortError") {
          setConsultationAmount(null);
          setConsultationSlots([]);
        }
      });
    return () => controller.abort();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose("escape");
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) return;
    setStatus("idle");
    setMessage("");
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new CustomEvent("waitlist-modal-opened"));
    } else {
      window.dispatchEvent(new CustomEvent("waitlist-modal-closed"));
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const hasPrefillEmail = Boolean(initialEmail?.trim());
    posthog.capture("waitlist_modal_opened", {
      source,
      has_prefill_email: hasPrefillEmail,
    });
    pushToDataLayer({
      event: "waitlist_modal_opened",
      source,
      has_prefill_email: hasPrefillEmail,
    });
  }, [isOpen, source, initialEmail]);

  const createPaymentLink = async (payload: {
    name?: string;
    email?: string;
    phone: string;
    reference_id?: string;
    discount_code?: string;
  }) => {
    const response = await fetch(`${env.apiUrl}/payments/razorpay/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: payload.name || name,
        email: payload.email || email,
        phone: payload.phone,
        reference_id: payload.reference_id || `waitlist_${Date.now()}`,
        discount_code: payload.discount_code || undefined,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data?.detail || data?.error || "Unable to start payment.");
    }

    if (["already_active", "activation_required"].includes(data?.state)) {
      return {
        order: data,
        referenceId: "",
        orderId: "",
        pricing: data?.pricing,
      };
    }
    if (!data?.order_id || !data?.key_id) {
      throw new Error("Payment order was not returned.");
    }

    return {
      order: data,
      referenceId: data?.checkout_attempt_id as string,
      orderId: data?.order_id as string,
      pricing: data?.pricing as
        | {
            original_amount?: number;
            discount_amount?: number;
            final_amount?: number;
            currency?: string;
            discount_code?: string;
          }
        | undefined,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setStatus("error");
      setMessage("Missing contact details. Please submit the request access form first.");
      return;
    }

    const fullPhone = `${countryCode}${phone}`;
    posthog.capture("waitlist_submit_attempt", {
      source,
    });
    pushToDataLayer({
      event: "waitlist_submit_attempt",
      source,
    });

    try {
      if (!initialReferenceId) {
        throw new Error("Waitlist record not found. Please click Request Access again.");
      }

      onSubmit?.({
        name,
        phone: fullPhone,
        email,
      });

      const payment = await createPaymentLink({
        name,
        email,
        phone: fullPhone,
        reference_id: initialReferenceId,
        discount_code: discountCode.trim(),
      });
      if (["already_active", "activation_required"].includes(payment.order.state)) {
        const destination = new URL(
          payment.order.completion_url || "/signUp",
          window.location.origin,
        );
        destination.searchParams.set("auth", "login");
        if (payment.order.state === "activation_required") {
          destination.searchParams.set("payment", "already_paid");
        }
        window.location.href = destination.toString();
        return;
      }
      trackInitiateCheckout({
        checkoutId: payment.referenceId,
        orderId: payment.orderId,
        value: payment.pricing?.final_amount ?? payment.order.amount,
        currency: payment.pricing?.currency ?? payment.order.currency,
        source,
      });
      trackRazorpayCheckoutOpened({
        checkoutId: payment.referenceId,
        orderId: payment.orderId,
        value: payment.pricing?.final_amount ?? payment.order.amount,
        currency: payment.pricing?.currency ?? payment.order.currency,
        source,
        discountCode: payment.pricing?.discount_code,
      });
      const verification = await openRazorpayCheckout(payment.order, env.apiUrl);
      await trackPurchase({
        orderId: payment.order.order_id,
        paymentId: verification.razorpay_payment_id as string | undefined,
        value: payment.pricing?.final_amount ?? payment.order.amount,
        currency: payment.pricing?.currency ?? payment.order.currency,
        source,
      });
      if (payment.order.completion_url) {
        const destination = new URL(payment.order.completion_url, window.location.origin);
        if (verification.activation_token) {
          destination.hash = new URLSearchParams({
            payment_activation: String(verification.activation_token),
          }).toString();
        } else if (verification.account_already_active) {
          destination.searchParams.set("auth", "login");
        } else {
          throw new Error("Payment succeeded, but account activation could not be started. Please contact support.");
        }
        window.location.href = destination.toString();
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
      posthog.capture("waitlist_submit_failed", {
        source,
        error: error instanceof Error ? error.message : "unknown_error",
      });
      pushToDataLayer({
        event: "waitlist_submit_failed",
        source,
        error: error instanceof Error ? error.message : "unknown_error",
      });
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBookConsultation = async () => {
    if (!showConsultationSlots) {
      setShowConsultationSlots(true);
      if (!selectedConsultationDate && consultationSlots[0]) {
        setSelectedConsultationDate(new Date(consultationSlots[0].start).toLocaleDateString("en-CA"));
      }
      return;
    }
    setConsultationStatus("loading");
    setConsultationMessage("");
    try {
      if (!initialReferenceId || !name.trim() || !email.trim() || !phone.trim()) {
        throw new Error("Missing contact details. Please submit the request access form first.");
      }
      const selectedSlot = consultationSlots.find((slot) => slot.start === selectedSlotStart);
      if (!selectedSlot) throw new Error("Please select a consultation slot.");
      const response = await fetch(`${env.apiUrl}/consultations/payment-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          waitlist_reference_id: initialReferenceId,
          slot_start: selectedSlot.start_utc || selectedSlot.start,
          slot_end: selectedSlot.end_utc || selectedSlot.end,
          callback_url: `${window.location.origin}/consultation/confirmation`,
          name,
          email,
          phone: `${countryCode}${phone}`,
        }),
      });
      const booking = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(booking?.detail || "Unable to start consultation payment.");
      if (!booking?.short_url) throw new Error("Payment link was not returned.");
      posthog.capture("consultation_payment_redirected", { source, amount: booking.amount, slot_start: selectedSlot.start });
      pushToDataLayer({ event: "consultation_payment_redirected", source, amount: booking.amount, slot_start: selectedSlot.start });
      window.location.href = booking.short_url;
    } catch (error) {
      setConsultationStatus("error");
      setConsultationMessage(error instanceof Error ? error.message : "Unable to book the consultation.");
    }
  };

  const consultationDays = useMemo(() => {
    const days = new Map<string, ConsultationSlot[]>();
    consultationSlots.forEach((slot) => {
      const key = new Date(slot.start).toLocaleDateString("en-CA");
      days.set(key, [...(days.get(key) || []), slot]);
    });
    return Array.from(days.entries()).slice(0, 5);
  }, [consultationSlots]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-3">
      <div
        className="absolute inset-0 z-0 bg-black/45 backdrop-blur-[6px]"
        onClick={handleBackdropClick}
        aria-label="Close waitlist"
      />

      <div
        role="dialog"
        aria-modal="true"
        data-waitlist-modal
        className="pointer-events-auto relative z-10 h-full max-h-screen w-full overflow-hidden bg-white shadow-[0_30px_90px_rgba(15,23,42,0.28)] sm:h-auto sm:max-h-[calc(100vh-32px)] sm:max-w-[544px] sm:rounded-[42px] sm:border sm:border-[#aeb4bc]"
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose("x_button");
          }}
          className="absolute right-5 top-5 z-20 inline-flex h-11 w-11 items-center justify-center rounded-[13px] bg-[#eeeeee] text-black transition hover:bg-[#dedede] focus:outline-none focus:ring-2 focus:ring-blue-500 sm:right-10 sm:top-10"
          aria-label="Close waitlist"
        >
          <X className="h-7 w-7" strokeWidth={3.5} />
        </button>

        <div className="h-full max-h-screen overflow-y-auto sm:max-h-[calc(100vh-32px)]">
          <div className="relative px-6 pb-0 pt-7 sm:px-10 sm:pt-10">
            <div className="inline-flex items-center gap-3 rounded-xl bg-[#eaf8ef] px-4 py-2.5 font-jakarta text-[12px] leading-tight text-[#1d2939] sm:text-[15px]">
              <span className="text-[30px] leading-none text-[#20b568]">★</span>
              <span><strong className="font-extrabold">Trusted by 500+ professionals</strong><br /><span className="text-[#596273]">4.8/5 average rating</span> <span className="ml-2 tracking-[2px] text-[#ffc20a]">★★★★★</span></span>
            </div>

            <h2 className="mt-8 max-w-[590px] font-jakarta text-[clamp(26px,8vw,38px)] font-extrabold leading-[1.03] tracking-[-1.8px] text-[#080d18] sm:text-[48px]">
              <span className="block whitespace-nowrap">Never Get Rejected</span>
              <span className="block whitespace-nowrap">for a <span className="relative inline-block text-[#0865df] after:absolute after:bottom-[-2px] after:left-0 after:h-[3px] after:w-full after:-rotate-1 after:bg-[#2eaf68]">Promotion</span>.</span>
            </h2>
            <p className="mt-5 max-w-[570px] font-jakarta text-[17px] font-medium leading-[1.4] text-[#50545c] sm:text-[22px]">
              The one skill that has changed career trajectory of many corporate employees.
            </p>
          </div>

          <div className="mt-5 flex items-center gap-5 bg-[#eef3ff] px-6 py-5 sm:px-10">
            <Target className="h-12 w-12 shrink-0 text-black" strokeWidth={2.4} />
            <p className="font-jakarta text-[15px] font-medium leading-[1.4] text-[#111827] sm:text-[20px]">
              A proven system to help you earn your next promotion, even during a <strong className="font-bold text-[#0757c4]">recession, office politics,</strong> or <strong className="font-bold text-[#0757c4]">organizational uncertainty.</strong>
            </p>
          </div>

          <div className="relative mx-auto grid gap-0 px-6 pt-7 sm:px-10">
            <form
              id="promotion-checkout-form"
              onSubmit={handleSubmit}
              className="relative"
            >
              <h3 className="font-jakarta text-[17px] font-extrabold leading-[1.35] text-[#111827] sm:text-[20px]">
                Get a trusted <span className="text-[#075dcc]">Promotion Strategy System</span> that helps you:
              </h3>

              <div className="mt-4 space-y-3">
                {promotionBenefits.map(([lead, rest]) => (
                  <div key={lead} className="flex items-center gap-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[3px] bg-[#075dcc] text-white">
                      <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                    <span className="font-jakarta text-[16px] leading-tight text-[#18202d] sm:text-[20px]"><strong>{lead}</strong> {rest}</span>
                  </div>
                ))}
              </div>

              <div className="relative mt-7 grid min-h-[90px] grid-cols-[40%_60%] overflow-visible rounded-[22px] border-2 border-[#1469e8] bg-white">
                <span className="absolute -right-2 -top-[18px] rounded-full bg-[#24af5b] px-4 py-1.5 font-jakarta text-[14px] font-bold text-white sm:text-[17px]">
                  {subscriptionAmount ? `${Math.max(0, Math.round((1 - subscriptionAmount / 1500000) * 100))}% OFF` : "SPECIAL OFFER"}
                </span>
                <div className="flex items-center justify-center border-r-2 border-[#1469e8] font-jakarta text-[22px] font-semibold text-[#8a9099] line-through sm:text-[28px]">
                  ₹15,000/-
                </div>
                <div className="flex items-center justify-center font-jakarta text-[38px] font-extrabold leading-none text-[#0757c4] sm:text-[50px]">
                  {subscriptionAmount ? `${formatSubscriptionAmount(subscriptionAmount)}/-` : "At checkout"}
                </div>
              </div>

              <label className="hidden">
                Have a discount code?
                <input
                  type="text"
                  value={discountCode}
                  onChange={(event) => setDiscountCode(event.target.value.toUpperCase())}
                  placeholder="Enter code"
                  className="mt-1 h-8 w-full rounded-md border border-[#d5dce6] bg-white px-3 text-[11px] font-semibold uppercase tracking-wide text-[#232323] placeholder:text-[#98a2b3] focus:border-[#075dcc] focus:outline-none focus:ring-1 focus:ring-[#075dcc]"
                  autoComplete="off"
                />
              </label>

              <input type="hidden" name="name" value={name} readOnly />
              <input type="hidden" name="email" value={email} readOnly />
              <input type="hidden" name="phone" value={phone} readOnly />
              <input type="hidden" name="countryCode" value={countryCode} readOnly />

              {message ? (
                <p className="mt-2 text-center font-jakarta text-xs font-medium text-red-600" role="status" aria-live="polite">
                  {message}
                </p>
              ) : null}
            </form>

            <div className="hidden">
              <span className="absolute h-px w-full border-t border-dotted border-[#1265f5] md:inset-y-2 md:h-auto md:w-px md:border-l md:border-t-0" />
              <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0f3fa] font-jakarta text-[18px] font-medium text-[#075ff0] md:h-10 md:w-10 md:text-[16px]">
                or
              </span>
            </div>

            <section className="hidden">
              <span className="absolute left-4 top-2 rounded-md bg-[#fff0d0] px-3 py-1 font-jakarta text-[9px] font-bold tracking-wide text-[#9a6516] md:left-1/2 md:top-0 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-full md:border md:border-[#d9a64f] md:bg-[#fffcf7] md:text-[10px]">
                NEED CLARITY FIRST
              </span>

              <div className="text-left md:text-center">
                <h3 className="font-quattrocento text-[24px] font-bold leading-tight text-[#34291f] md:text-[28px]">
                  Promotion Clarity Session
                </h3>
                <p className="mt-1.5 font-jakarta text-[12px] font-medium leading-[17px] text-[#29231e] md:mx-auto md:max-w-[390px] md:text-[12px] md:leading-[17px]">
                  A private 1:1 session to understand what may be slowing your career—and what to do next.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 font-jakarta text-[10px] font-semibold md:text-[11px]">
                <ClarityPill icon={UserRound}>1:1 Video Call</ClarityPill>
                <ClarityPill icon={Clock3}>45 Minutes</ClarityPill>
                <ClarityPill icon={Target}>Tailored to You</ClarityPill>
              </div>

              <p className="mt-4 font-jakarta text-[11px] font-bold text-[#b57916] md:text-[12px]">In this session, you will:</p>
              <div className="mt-3 grid gap-4 md:grid-cols-[minmax(0,1fr)_155px] md:items-center md:gap-5">
                <div className="space-y-3">
                  <ClarityStep number="01" title="Understand your situation">
                    We unpack your role, recent history, key relationships and current roadblocks.
                  </ClarityStep>
                  <ClarityStep number="02" title="Find the likely gap">
                    We identify the real issue—visibility, influence, positioning, sponsorship or other.
                  </ClarityStep>
                  <ClarityStep number="03" title="Map your next move">
                    You get clarity on the conversations, signals and actions that will make the biggest difference.
                  </ClarityStep>
                </div>

                <div className="rounded-md border border-[#d9a64f] bg-white/60 px-4 py-4 text-center font-jakarta md:px-4 md:py-6">
                  <Gift className="mx-auto h-7 w-7 text-[#b57916]" strokeWidth={1.7} />
                  <h4 className="mt-2 text-[12px] font-bold md:text-[13px]">You’ll leave with</h4>
                  <p className="mt-2 text-[11px] font-medium leading-[16px] md:text-[12px] md:leading-[18px]">
                    A personalised diagnosis and a focused path forward. You also receive a <strong>written summary after</strong> the session.
                  </p>
                </div>
              </div>

              {showConsultationSlots ? (
                <div className="mt-4 rounded-lg border border-[#ead3aa] bg-white p-3 font-jakarta">
                  <p className="text-sm font-semibold text-[#23314d]">Choose your consultation</p>
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Consultation dates">
                    {consultationDays.map(([date]) => {
                      const value = new Date(`${date}T12:00:00`);
                      const active = date === selectedConsultationDate;
                      return <button key={date} type="button" role="tab" aria-selected={active} onClick={() => { setSelectedConsultationDate(date); setSelectedSlotStart(""); }} className={`min-w-[58px] rounded-lg border px-2 py-2 text-center transition ${active ? "border-[#075ff0] bg-[#075ff0] text-white" : "border-[#c9dcff] bg-white text-[#344054] hover:border-[#75a9ff]"}`}><span className="block text-[10px] font-semibold uppercase">{value.toLocaleDateString("en-IN", { weekday: "short" })}</span><span className="mt-0.5 block text-base font-bold">{value.getDate()}</span><span className="block text-[10px]">{value.toLocaleDateString("en-IN", { month: "short" })}</span></button>;
                    })}
                  </div>
                  <p className="mt-3 text-xs font-semibold text-[#667085]">Available times</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {(consultationDays.find(([date]) => date === selectedConsultationDate)?.[1] || []).map((slot) => {
                      const active = selectedSlotStart === slot.start;
                      return <button key={slot.start} type="button" onClick={() => setSelectedSlotStart(slot.start)} className={`rounded-md border px-2 py-2 text-xs font-semibold transition ${active ? "border-[#075ff0] bg-[#eaf2ff] text-[#075ff0] ring-1 ring-[#075ff0]" : "border-[#c9dcff] bg-white text-[#344054] hover:border-[#75a9ff]"}`}>{new Date(slot.start).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}</button>;
                    })}
                  </div>
                  {selectedSlotStart ? <p className="mt-3 text-center text-xs font-medium text-[#067647]">✓ Time selected</p> : null}
                </div>
              ) : null}
              <button type="button" onClick={handleBookConsultation} disabled={consultationStatus === "loading" || consultationAmount === null || (showConsultationSlots && (!consultationSlots.length || !selectedSlotStart))} className="mt-4 inline-flex min-h-[42px] w-full cursor-pointer items-center justify-center rounded-[4px] bg-[#bd861d] px-4 font-jakarta text-[13px] font-semibold text-white transition hover:bg-[#a97415] focus:outline-none focus:ring-2 focus:ring-[#d9a64f] disabled:cursor-not-allowed disabled:bg-[#cbb58d] md:mt-auto md:min-h-[42px] md:text-[13px]">
                {consultationStatus === "loading" ? "Opening payment..." : showConsultationSlots ? `Pay & Book — ₹${((consultationAmount || 0) / 100).toLocaleString("en-IN")}` : consultationAmount ? `Book My Clarity Session — ₹${(consultationAmount / 100).toLocaleString("en-IN")}` : "Clarity sessions unavailable"}
              </button>
              <div className="mt-2.5 flex items-center justify-center gap-2 font-jakarta text-[10px] font-medium text-[#5f6773] md:text-[11px]">
                <ShieldCheck className="h-4 w-4 text-[#b57916]" strokeWidth={1.7} />
                <span>No obligation to join the program. No generic career advice.</span>
              </div>
              {consultationMessage ? (
                <p className="mt-3 text-center font-jakarta text-xs font-medium text-red-600" role="status">
                  {consultationMessage}
                </p>
              ) : null}
            </section>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-0 px-6 pb-5 sm:px-10">
            <div className="font-jakarta text-[#16335c]">
              <p className="text-[10px] font-medium leading-[1.25] sm:text-[13px]"><strong className="block text-[15px] font-extrabold text-[#075dcc] sm:text-[20px]">Action Plan</strong>for strategic clarity</p>
            </div>
            <div className="border-x border-[#aeb7c2] px-4 font-jakarta text-[#16335c]">
              <p className="text-[10px] font-medium leading-[1.25] sm:text-[13px]"><strong className="block text-[15px] font-extrabold text-[#075dcc] sm:text-[20px]">1344 mins</strong>of strategic insights</p>
            </div>
            <div className="pl-4 font-jakarta text-[#16335c]">
              <p className="text-[10px] font-medium leading-[1.25] sm:text-[13px]"><strong className="block text-[15px] font-extrabold text-[#075dcc] sm:text-[20px]">AI coach &amp;</strong>Accountability Partner</p>
            </div>
          </div>

          <div className="bg-black px-6 pb-7 pt-8 text-center text-white sm:px-10 sm:pb-10">
            <h3 className="flex items-center justify-center gap-2 font-jakarta text-[22px] font-extrabold text-[#3bd06b] sm:text-[29px]">
              <ShieldCheck className="h-7 w-7 fill-[#3bd06b] text-[#3bd06b]" />
              100% Money Back Guarantee
            </h3>
            <p className="mx-auto mt-4 max-w-[550px] font-jakarta text-[14px] font-medium leading-[1.45] text-[#e3e6eb] sm:text-[18px]">
              Complete the program. If you don&apos;t believe it has improved your understanding of how promotions work, we&apos;ll refund your money. No questions asked.
            </p>
            <button
              type="submit"
              form="promotion-checkout-form"
              disabled={status === "loading"}
              onClick={() => trackCtaClick({ location: "checkout_modal", label: "Proceed to Secure Checkout", source })}
              className="mt-7 inline-flex min-h-[62px] w-full cursor-pointer items-center justify-center rounded-[16px] bg-gradient-to-b from-[#ffdc20] to-[#ffca05] px-5 font-jakarta text-[20px] font-extrabold text-[#121820] shadow-[0_5px_10px_rgba(208,163,0,0.25)] transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-not-allowed disabled:opacity-55 sm:text-[25px]"
            >
              {status === "loading" ? "Processing..." : "Proceed to Secure Checkout"}
            </button>
            <p className="mt-4 flex items-center justify-center gap-2 font-jakarta text-[13px] font-medium text-[#d8e0ea] sm:text-[17px]">
              <CheckCircle2 className="h-5 w-5 text-[#d8e0ea]" /> Instant access after secure payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotableHeroWaitlist;

const ClarityPill = ({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) => (
  <div className="flex min-h-8 items-center justify-center gap-1.5 rounded border border-[#ead3aa] bg-white/60 px-1.5 text-center">
    <Icon className="h-[17px] w-[17px] shrink-0 text-[#714a1a]" strokeWidth={1.7} />
    <span>{children}</span>
  </div>
);

const ClarityStep = ({ number, title, children }: { number: string; title: string; children: React.ReactNode }) => (
  <div className="relative flex gap-3 font-jakarta after:absolute after:left-[11px] after:top-[24px] after:h-[calc(100%+12px)] after:w-px after:bg-[#e5bd78] last:after:hidden">
    <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#bd861d] text-[10px] font-bold text-white">
      {number}
    </span>
    <div>
      <h4 className="text-[11px] font-bold leading-[14px] text-[#2f2923] md:text-[12px] md:leading-[15px]">{title}</h4>
      <p className="mt-0.5 text-[10px] font-medium leading-[14px] text-[#3f3a35] md:text-[11px] md:leading-[15px]">{children}</p>
    </div>
  </div>
);
