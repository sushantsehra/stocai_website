"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  BarChart3,
  Clock3,
  Gift,
  Lock,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  UserRound,
  UserRoundCheck,
  UsersRound,
  X,
} from "lucide-react";
import posthog from "posthog-js";
import env from "@/utils/env";
import promotableRibbonIcon from "../assets/promotable-ribbon-icon.png";

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

const programFeatures = [
  { label: "Stakeholder management", icon: UsersRound },
  { label: "Leadership signalling", icon: Megaphone },
  { label: "Executive presence", icon: UserRoundCheck },
  { label: "Promotion pitches", icon: BarChart3 },
];

const supportPillars = [
  { label: "AI coach", icon: Sparkles },
  { label: "Strategic insights", icon: BarChart3 },
  { label: "Accountability", icon: UsersRound },
  { label: "12-month access", icon: Lock },
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
  const [subscriptionAmount, setSubscriptionAmount] = useState<number | null>(null);
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
    }
  }, [isOpen, initialName, initialEmail, initialPhone, initialCountryCode]);

  useEffect(() => {
    if (!isOpen) return;
    fetch(`${env.apiUrl}/payments/razorpay/settings`)
      .then((response) => response.json().then((data) => ({ ok: response.ok, data })))
      .then(({ ok, data }) => {
        setSubscriptionAmount(ok && data?.subscription_amount ? data.subscription_amount : null);
      })
      .catch(() => setSubscriptionAmount(null));

    fetch(`${env.apiUrl}/consultations/slots`)
      .then((response) => response.json().then((data) => ({ ok: response.ok, data })))
      .then(({ ok, data }) => {
        if (ok && data?.enabled) {
          setConsultationAmount(data.amount || null);
          setConsultationSlots(Array.isArray(data.slots) ? data.slots : []);
        } else {
          setConsultationAmount(null);
        }
      })
      .catch(() => setConsultationAmount(null));
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
        className="pointer-events-auto relative z-10 h-full max-h-screen w-full overflow-hidden bg-white shadow-[0_28px_80px_rgba(15,23,42,0.24)] sm:h-auto sm:max-h-[calc(100vh-24px)] sm:max-w-[390px] sm:rounded-[24px] md:max-w-[1120px] md:rounded-[26px]"
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

        <div className="h-full max-h-screen overflow-y-auto px-[26px] pb-7 pt-3 sm:max-h-[calc(100vh-24px)] md:px-10 md:pb-5 md:pt-5 lg:px-12">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3ff] p-2 md:h-12 md:w-12">
              <Image src={promotableRibbonIcon} width={29} height={29} alt="Promotable badge" className="object-contain" />
            </div>
            <h2 className="mt-3 font-quattrocento text-[27px] font-bold leading-tight text-[#0b64f4] md:text-[40px]">
              Be More Promotable
            </h2>
            <p className="mx-auto mt-1 max-w-[285px] font-jakarta text-[11px] font-medium leading-[15px] text-black md:max-w-[610px] md:text-[15px] md:leading-5">
              You know you are capable of more. Choose the next best step for your career.
            </p>
          </div>

          <div className="relative mt-3 grid gap-7 md:mt-4 md:grid-cols-[1fr_36px_1fr] md:items-stretch md:gap-4">
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-[5px] bg-[#1265f5] px-4 pb-[22px] pt-10 text-white shadow-[0_18px_36px_rgba(18,101,245,0.18)] md:rounded-[10px] md:px-5 md:pb-5 md:pt-10"
            >
              <div className="absolute right-0 top-0 h-12 w-12 bg-[#dbe8ff] [clip-path:polygon(0_0,100%_100%,100%_0)] md:h-14 md:w-14">
                <Star className="absolute right-[7px] top-[7px] h-4 w-4 fill-[#1265f5] text-[#1265f5] md:right-2 md:top-2" />
              </div>
              <span className="absolute left-1/2 top-[11px] -translate-x-1/2 rounded-full bg-[#eaf2ff] px-3 py-1 font-jakarta text-[11px] font-medium text-[#075ff0] md:top-4 md:text-[11px]">
                Recommended
              </span>
              <div className="text-center">
                <h3 className="font-quattrocento text-[28px] font-bold leading-none text-white md:text-[28px]">
                  Join the Program
                </h3>
                <p className="mx-auto mt-3 max-w-[225px] font-jakarta text-[11px] font-medium leading-[16px] text-white md:text-[12px] md:leading-[17px]">
                  Build the operating system for faster promotion momentum.
                </p>
              </div>

              <div className="mt-[29px] space-y-2 md:mt-5">
                {programFeatures.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex min-h-[39px] items-center gap-3 rounded-[5px] bg-white px-[7px] text-[#232323] md:min-h-[43px]">
                    <span className="flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-[3px] bg-[#e9f2ff] text-[#1265f5]">
                      <Icon className="h-[19px] w-[19px]" strokeWidth={2.6} />
                    </span>
                    <span className="font-jakarta text-[15px] font-medium leading-tight md:text-[14px]">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-end justify-center gap-4 md:mt-5">
                <span className="font-jakarta text-[31px] font-bold leading-none text-white md:text-[31px]">
                  {subscriptionAmount
                    ? new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(subscriptionAmount / 100)
                    : "Price available at checkout"}
                </span>
              </div>

              <label className="mt-4 block text-left font-jakarta text-[11px] font-semibold text-white/90">
                Discount code
                <input
                  type="text"
                  value={discountCode}
                  onChange={(event) => setDiscountCode(event.target.value.toUpperCase())}
                  placeholder="Enter code if you have one"
                  className="mt-1 h-10 w-full rounded-[5px] border border-white/30 bg-white px-3 text-[13px] font-semibold uppercase tracking-wide text-[#232323] placeholder:text-[#8d98aa] focus:outline-none focus:ring-2 focus:ring-white/70"
                  autoComplete="off"
                />
              </label>

              <input type="hidden" name="name" value={name} readOnly />
              <input type="hidden" name="email" value={email} readOnly />
              <input type="hidden" name="phone" value={phone} readOnly />
              <input type="hidden" name="countryCode" value={countryCode} readOnly />

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-5 inline-flex min-h-[46px] w-full cursor-pointer items-center justify-center rounded-[5px] bg-[#0657b8] px-4 font-jakarta text-[16px] font-medium text-white transition hover:bg-[#034fa9] focus:outline-none focus:ring-2 focus:ring-white/70 disabled:cursor-not-allowed disabled:opacity-55 md:min-h-[44px] md:text-[15px]"
              >
                {status === "loading" ? "Processing..." : "I'll Invest in My Career"}
              </button>

              {message ? (
                <p className="mt-3 text-center font-jakarta text-xs font-medium text-white" role="status" aria-live="polite">
                  {message}
                </p>
              ) : null}
            </form>

            <div className="relative flex items-center justify-center">
              <span className="absolute h-px w-full border-t border-dotted border-[#1265f5] md:inset-y-2 md:h-auto md:w-px md:border-l md:border-t-0" />
              <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0f3fa] font-jakarta text-[18px] font-medium text-[#075ff0] md:h-10 md:w-10 md:text-[16px]">
                or
              </span>
            </div>

            <section className="relative flex flex-col rounded-[10px] border border-[#d9a64f] bg-[#fffcf7] px-4 pb-4 pt-8 text-[#34291f] shadow-[0_8px_24px_rgba(124,83,24,0.05)] md:px-6 md:pb-5 md:pt-8 lg:px-7">
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

          <div className="mt-6 md:mt-4">
            <div className="mb-[18px] flex items-center gap-1 md:mb-3 md:gap-4">
              <span className="h-px flex-1 border-t border-dotted border-[#1265f5]" />
              <span className="shrink-0 font-jakarta text-[11px] font-medium text-[#232323] md:text-[12px]">What&apos;s included</span>
              <span className="h-px flex-1 border-t border-dotted border-[#1265f5]" />
            </div>
            <div className="grid grid-cols-2 gap-[9px] md:flex md:flex-wrap md:items-center md:justify-center md:gap-0">
              {supportPillars.map(({ label, icon: Icon }, index) => (
                <React.Fragment key={label}>
                  <span className="inline-flex min-h-[42px] items-center gap-2 rounded-[5px] border border-[#b5d1ff] bg-[#f3f7ff] px-[7px] font-jakarta text-[12px] font-medium text-[#0757c4] md:min-h-0 md:border-0 md:bg-transparent md:px-3 md:text-[12px] md:text-[#526177]">
                    <Icon className="h-[19px] w-[19px] shrink-0 text-[#1265f5] md:h-4 md:w-4 md:text-[#526177]" strokeWidth={2.6} />
                    <span>{label}</span>
                  </span>
                  {index < supportPillars.length - 1 ? <span className="hidden h-5 w-px bg-[#cfd6e0] md:inline-block" /> : null}
                </React.Fragment>
              ))}
            </div>
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
