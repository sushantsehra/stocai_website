"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  FileText,
  Gift,
  Lock,
  MessageCircle,
  ShieldCheck,
  Target,
  UserRound,
  UsersRound,
  X,
  Zap,
} from "lucide-react";
import posthog from "posthog-js";
import env from "@/utils/env";
import useSubscriptionAmount, {
  formatSubscriptionAmount,
} from "@/hooks/useSubscriptionAmount";

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
  { label: "Get credit for your work", icon: Award },
  { label: "Become your boss's go-to", icon: UsersRound },
  { label: "Do more without burnout", icon: Zap },
  { label: "Build a promotion pitch that wins", icon: FileText },
  { label: "Speak up with confidence", icon: MessageCircle },
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
    const response = await fetch(`${env.apiUrl}/payments/razorpay/link`, {
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

    const shortUrl = data?.short_url || data?.shortUrl;
    if (!shortUrl) {
      throw new Error("Payment link was not returned.");
    }

    return {
      shortUrl: shortUrl as string,
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

      posthog.capture("waitlist_submitted", {
        source,
        payment_started: true,
      });
      pushToDataLayer({
        event: "waitlist_submitted",
        source,
        payment_started: true,
      });

      const payment = await createPaymentLink({
        name,
        email,
        phone: fullPhone,
        reference_id: initialReferenceId,
        discount_code: discountCode.trim(),
      });
      posthog.capture("payment_redirected", {
        source,
        amount: payment.pricing?.final_amount,
        discount_code: payment.pricing?.discount_code,
      });
      pushToDataLayer({
        event: "payment_redirected",
        source,
        amount: payment.pricing?.final_amount,
        discount_code: payment.pricing?.discount_code,
      });
      window.location.href = payment.shortUrl;
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
        className="pointer-events-auto relative z-10 h-full max-h-screen w-full overflow-hidden bg-white shadow-[0_28px_80px_rgba(15,23,42,0.24)] sm:h-auto sm:max-h-[calc(100vh-24px)] sm:max-w-[390px] sm:rounded-[18px]"
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose("x_button");
          }}
          className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#667085] shadow-[0_10px_24px_rgba(15,23,42,0.14)] transition hover:bg-[#f6f8fb] focus:outline-none focus:ring-2 focus:ring-blue-500 md:right-6 md:top-6"
          aria-label="Close waitlist"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="h-full max-h-screen overflow-y-auto sm:max-h-[calc(100vh-24px)]">
          <div className="relative px-5 pb-0 pt-5 sm:px-7 sm:pt-6 md:px-8">
            <div className="inline-flex items-center gap-2 rounded-lg border border-[#dcecdf] bg-[#f4faf5] px-2.5 py-1.5 font-jakarta text-[9px] leading-tight text-[#1d2939] sm:text-[10px]">
              <BadgeCheck className="h-4 w-4 fill-[#39b867] text-[#39b867]" />
              <span><strong className="font-semibold">Trusted by 500+ professionals</strong><br />4.8/5 average rating <span className="tracking-[-1px] text-[#ffbd21]">★★★★★</span></span>
            </div>

            <h2 className="mt-4 max-w-[330px] font-jakarta text-[30px] font-extrabold leading-[1.08] tracking-[-1.2px] text-[#080d18] sm:text-[34px]">
              Never Get Rejected<br />for a <span className="relative inline-block text-[#0865df] after:absolute after:bottom-[-2px] after:left-0 after:h-[3px] after:w-full after:-rotate-1 after:bg-[#2eaf68]">Promotion</span>.
            </h2>
            <p className="mt-3 max-w-[340px] font-jakarta text-[12px] font-medium leading-[17px] text-[#222936] sm:text-[13px] sm:leading-[18px]">
              The one skill that has changed career trajectory of many corporate employees.
            </p>
          </div>

          <div className="mt-3 flex items-center gap-3 bg-gradient-to-r from-[#edf4ff] to-[#f6f9ff] px-5 py-3.5 sm:px-7 md:px-8">
            <Target className="h-11 w-11 shrink-0 text-[#1768dd]" strokeWidth={2.2} />
            <p className="font-jakarta text-[11px] font-medium leading-[17px] text-[#26334a] sm:text-[12px]">
              A proven system to help you earn your next promotion, even during a <strong className="font-bold text-[#0757c4]">recession, office politics,</strong> or <strong className="font-bold text-[#0757c4]">organizational uncertainty.</strong>
            </p>
          </div>

          <div className="relative mx-auto grid gap-0 px-5 pt-3 sm:px-7 md:px-8">
            <form
              id="promotion-checkout-form"
              onSubmit={handleSubmit}
              className="relative"
            >
              <h3 className="font-jakarta text-[13px] font-extrabold leading-[17px] text-[#111827]">
                Get a trusted <span className="text-[#075dcc]">Promotion Strategy System</span><br />that helps you:
              </h3>

              <div className="mt-2">
                {promotionBenefits.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex min-h-[34px] items-center gap-2 border-b border-[#e2e5e9] py-1 last:border-0">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#075dcc] text-white">
                      <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                    </span>
                    <span className="font-jakarta text-[11px] font-bold leading-tight text-[#18202d] sm:text-[12px]">{label}</span>
                  </div>
                ))}
              </div>

              <div className="relative mt-3 grid min-h-[58px] grid-cols-[44%_56%] overflow-visible rounded-lg border border-[#1469e8] bg-white">
                <span className="absolute -right-px -top-[10px] rounded bg-[#3bb56a] px-2 py-1 font-jakarta text-[9px] font-bold text-white">
                  {subscriptionAmount ? `${Math.max(0, Math.round((1 - subscriptionAmount / 1500000) * 100))}% OFF` : "SPECIAL OFFER"}
                </span>
                <div className="flex items-center justify-center border-r border-[#e4e7ec] font-jakarta text-[18px] font-semibold text-[#8a9099] line-through sm:text-[20px]">
                  ₹15,000/-
                </div>
                <div className="flex items-center justify-center font-jakarta text-[31px] font-extrabold leading-none text-[#0757c4] sm:text-[34px]">
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

          <div className="grid grid-cols-3 gap-2 px-5 pb-2 pt-2.5 sm:px-7 md:px-8">
            <div className="flex items-center gap-1.5 font-jakarta text-[#16335c]">
              <Target className="h-6 w-6 shrink-0 text-[#075dcc]" />
              <p className="text-[8px] font-medium leading-[10px]"><strong className="block font-bold text-[#075dcc]">Action Plan</strong>for strategic clarity</p>
            </div>
            <div className="flex items-center gap-1.5 border-x border-[#dde3eb] px-2 font-jakarta text-[#16335c]">
              <Clock3 className="h-6 w-6 shrink-0 text-[#075dcc]" />
              <p className="text-[8px] font-medium leading-[10px]"><strong className="block font-bold text-[#075dcc]">1344 mins</strong>of strategic insights</p>
            </div>
            <div className="flex items-center gap-1.5 font-jakarta text-[#16335c]">
              <UserRound className="h-6 w-6 shrink-0 fill-[#4e82df] text-[#4e82df]" />
              <p className="text-[8px] font-medium leading-[10px]"><strong className="block font-bold text-[#075dcc]">AI coach &amp;</strong>accountability partner</p>
            </div>
          </div>

          <div className="mt-1 bg-[#07111f] px-5 pb-2.5 pt-3 text-center text-white sm:px-7 md:px-8">
            <h3 className="flex items-center justify-center gap-1.5 font-jakarta text-[13px] font-bold text-[#3bd06b]">
              <ShieldCheck className="h-5 w-5 fill-[#3bd06b] text-[#3bd06b]" />
              100% Money Back Guarantee
            </h3>
            <p className="mx-auto mt-1 max-w-[320px] font-jakarta text-[9px] font-medium leading-[11px] text-white">
              Complete the program. If you don&apos;t believe it has improved your understanding of how promotions work, we&apos;ll refund your money. No questions asked.
            </p>
            <button
              type="submit"
              form="promotion-checkout-form"
              disabled={status === "loading"}
              className="mt-2.5 inline-flex min-h-[40px] w-full cursor-pointer items-center justify-center gap-3 rounded-md bg-gradient-to-b from-[#ffdc20] to-[#ffca05] px-4 font-jakarta text-[12px] font-extrabold text-[#121820] shadow-[0_5px_10px_rgba(208,163,0,0.25)] transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-not-allowed disabled:opacity-55"
            >
              <Lock className="h-4 w-4 fill-[#111827]" />
              {status === "loading" ? "Processing..." : "Proceed to Secure Checkout"}
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#111827] text-white"><ArrowRight className="h-3.5 w-3.5" /></span>
            </button>
            <p className="mt-2 flex items-center justify-center gap-1 font-jakarta text-[8px] font-medium text-[#d8e0ea]">
              <CheckCircle2 className="h-3 w-3 text-[#3bd06b]" /> Instant access after secure payment
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
