"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  CheckCircle2,
  Compass,
  Lock,
  Megaphone,
  Search,
  Sparkles,
  UserRoundCheck,
  UsersRound,
  X,
} from "lucide-react";
import posthog from "posthog-js";
import env from "@/utils/env";
import { writeStoDiagnosticContext } from "@/lib/diagnosticContext";
import certificate from "../assets/certificate.png";

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

const programFeatures = [
  { label: "Stakeholder management", icon: UsersRound },
  { label: "Leadership signalling", icon: Megaphone },
  { label: "Executive presence", icon: UserRoundCheck },
  { label: "Promotion pitches", icon: BarChart3 },
];

const clarityFeatures = [
  { label: "Identify the real roadblock", icon: Search },
  { label: "Get direction on the next move", icon: Compass },
  { label: "See whether the program is right for you", icon: CheckCircle2 },
];

const supportPillars = [
  { label: "AI coach", icon: Sparkles },
  { label: "Strategic insights", icon: BarChart3 },
  { label: "Accountability support", icon: UsersRound },
  { label: "12-month access", icon: Lock },
];

const PromotableHeroWaitlist: React.FC<HeroWaitlistProps> = ({
  isOpen,
  onClose,
  initialEmail,
  initialReferenceId,
  initialWaitlistId,
  initialName,
  initialPhone,
  initialCountryCode = "+91",
  source = "waitlist_modal",
  onSubmit,
}) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(initialName || "");
      setEmail(initialEmail || "");
      setPhone(initialPhone || "");
      setCountryCode(initialCountryCode || "+91");
      router.prefetch("/diagnostic");
    }
  }, [isOpen, initialName, initialEmail, initialPhone, initialCountryCode, router]);

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
    amount: number;
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
        amount: payload.amount,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data?.error || "Unable to start payment.");
    }

    const shortUrl = data?.short_url || data?.shortUrl;
    if (!shortUrl) {
      throw new Error("Payment link was not returned.");
    }

    return shortUrl as string;
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

      const shortUrl = await createPaymentLink({
        name,
        email,
        phone: fullPhone,
        reference_id: initialReferenceId,
        amount: 197000,
      });
      posthog.capture("payment_redirected", {
        source,
        amount: 197000,
      });
      pushToDataLayer({
        event: "payment_redirected",
        source,
        amount: 197000,
      });
      window.location.href = shortUrl;
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

  const handleGetUnstuck = () => {
    writeStoDiagnosticContext({
      name,
      email,
      phone,
      countryCode,
      referenceId: initialReferenceId || initialWaitlistId || "",
      waitlistId: initialWaitlistId || initialReferenceId || "",
      source,
    });

    posthog.capture("sto_diagnostic_route_opened", {
      source,
      waitlist_reference_id: initialReferenceId,
      waitlist_id: initialWaitlistId || initialReferenceId,
    });
    pushToDataLayer({
      event: "sto_diagnostic_route_opened",
      source,
      waitlist_reference_id: initialReferenceId,
      waitlist_id: initialWaitlistId || initialReferenceId,
    });

    onClose();
    router.push("/diagnostic");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-2">
      <div
        className="absolute inset-0 z-0 bg-black/45 backdrop-blur-[6px]"
        onClick={handleBackdropClick}
        aria-label="Close waitlist"
      />

      <div
        role="dialog"
        aria-modal="true"
        data-waitlist-modal
        className="pointer-events-auto relative z-10 max-h-[calc(100vh-24px)] w-full max-w-[405px] overflow-hidden rounded-[28px] border border-[#d9e4f2] bg-white shadow-[0_28px_80px_rgba(15,23,42,0.24)] md:max-h-[calc(100vh-16px)] md:max-w-[850px] md:rounded-[28px]"
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose("x_button");
          }}
          className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#667085] shadow-[0_10px_24px_rgba(15,23,42,0.14)] transition hover:bg-[#f6f8fb] focus:outline-none focus:ring-2 focus:ring-blue-500 md:right-6 md:top-6"
          aria-label="Close waitlist"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="max-h-[calc(100vh-24px)] overflow-y-auto px-5 pb-7 pt-7 md:max-h-[calc(100vh-16px)] md:px-10 md:pb-5 md:pt-5">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#0A57C6] p-2 shadow-[0_10px_24px_rgba(10,87,198,0.26)] md:mb-2 md:h-10 md:w-10">
              <Image src={certificate} width={26} height={26} alt="BCL certificate" className="object-contain" />
            </div>
            <h2 className="font-gotham text-[31px] font-bold leading-[1.08] text-[#0A57C6] md:text-[38px]">
              Be More Promotable
            </h2>
            <p className="mx-auto mt-3 max-w-[610px] font-gotham text-[16px] leading-6 text-[#273348] md:mt-2 md:text-[15px] md:leading-5">
              <span className="md:hidden">Choose the next best step for your career.</span>
              <span className="hidden md:inline">You know you are capable of more. Choose the next best step for your career.</span>
            </p>
            <p className="mx-auto mt-1 hidden max-w-[610px] font-gotham text-[12px] leading-5 text-[#7b8798] md:block md:text-[13px] md:leading-4">
              Pick the path that fits where you are right now.
            </p>
          </div>

          <div className="relative mt-5 grid gap-4 md:mt-4 md:grid-cols-[1fr_36px_1fr] md:items-stretch md:gap-4">
            <form
              onSubmit={handleSubmit}
              className="relative rounded-[14px] border-2 border-[#0A57C6] bg-white px-4 pb-4 pt-12 shadow-[0_18px_36px_rgba(10,87,198,0.08)] md:px-5 md:pb-4 md:pt-8"
            >
              <span className="absolute left-5 top-3 rounded-[5px] bg-[#e7f1ff] px-2 py-1 font-gotham text-[9px] font-bold uppercase tracking-[0.08em] text-[#0A57C6]">
                Recommended
              </span>
              <div className="text-center">
                <h3 className="font-gotham text-[22px] font-bold leading-tight text-[#0A57C6] md:text-[23px]">
                  Join the Program
                </h3>
                <p className="mx-auto mt-2 max-w-[250px] font-gotham text-[13px] font-medium leading-5 text-[#273348] md:mt-1 md:text-[12px] md:leading-[18px]">
                  <span className="md:hidden">Build your promotion operating system.</span>
                  <span className="hidden md:inline">Build the operating system for faster promotion momentum.</span>
                </p>
              </div>

              <div className="mt-3 hidden space-y-2 md:block">
                {programFeatures.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3 rounded-[8px] border border-[#edf1f7] bg-[#f8fbff] px-3 py-[7px]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-[#e6f1ff] text-[#0A57C6]">
                      <Icon className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                    <span className="font-gotham text-[13px] font-medium text-[#273348]">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-end justify-center gap-5 md:mt-3 md:gap-4">
                <span className="pb-1 font-gotham text-[16px] font-bold text-[#9aa4b2] line-through">{"\u20b9"}4,999</span>
                <span className="font-gotham text-[30px] font-bold leading-none text-[#0A57C6] md:text-[28px]">{"\u20b9"}1,970</span>
              </div>

              <input type="hidden" name="name" value={name} readOnly />
              <input type="hidden" name="email" value={email} readOnly />
              <input type="hidden" name="phone" value={phone} readOnly />
              <input type="hidden" name="countryCode" value={countryCode} readOnly />

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-5 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-[9px] bg-[#0057D9] px-4 font-gotham text-[16px] font-bold text-white shadow-[0_12px_24px_rgba(0,87,217,0.22)] transition hover:bg-[#0A57C6] focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-55 md:mt-3 md:min-h-11 md:text-[15px]"
              >
                {status === "loading" ? "Processing..." : "I'll Invest in My Career"}
              </button>

              {message ? (
                <p className="mt-3 text-center font-gotham text-xs font-medium text-[#b42318]" role="status" aria-live="polite">
                  {message}
                </p>
              ) : null}
            </form>

            <div className="relative flex items-center justify-center md:flex">
              <span className="absolute h-px w-full bg-[#d9dfe8] md:inset-y-2 md:h-auto md:w-px" />
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#e4e8ef] bg-white font-gotham text-[15px] font-bold text-[#273348] shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                or
              </span>
            </div>

            <section className="rounded-[14px] border border-[#e2e6ee] bg-white px-4 py-5 shadow-[0_14px_32px_rgba(15,23,42,0.06)] md:px-6 md:py-7">
              <div className="text-center">
                <h3 className="font-gotham text-[22px] font-bold leading-tight text-[#202939] md:text-[23px]">
                  Get Unstuck First
                </h3>
                <p className="mx-auto mt-2 max-w-[270px] font-gotham text-[13px] font-medium leading-5 text-[#667085] md:mt-1 md:text-[12px] md:leading-[18px]">
                  <span className="md:hidden">Not ready yet? Get clarity first.</span>
                  <span className="hidden md:inline">Not ready to join yet? Start with clarity on what is blocking your promotion momentum.</span>
                </p>
              </div>

              <div className="mt-5 hidden space-y-3 md:block">
                {clarityFeatures.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#e6f1ff] text-[#0A57C6]">
                      <Icon className="h-4 w-4" strokeWidth={2.4} />
                    </span>
                    <span className="font-gotham text-[13px] font-medium leading-5 text-[#273348]">{label}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleGetUnstuck}
                className="mt-5 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-[9px] border border-[#0A57C6] bg-white px-4 font-gotham text-[16px] font-bold text-[#0A57C6] transition hover:bg-[#f7fbff] focus:outline-none focus:ring-2 focus:ring-blue-400 md:mt-5 md:min-h-11 md:text-[15px]"
              >
                Get Unstuck
              </button>
            </section>
          </div>

          <div className="mt-5 border-t border-[#d9dfe8] pt-4 md:mt-4 md:pt-3">
            <div className="mb-3 flex items-center gap-3 md:hidden">
              <span className="h-px flex-1 bg-[#d9dfe8]" />
              <span className="font-gotham text-[13px] font-medium text-[#667085]">What&apos;s included</span>
              <span className="h-px flex-1 bg-[#d9dfe8]" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-[#526177] md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-4 md:gap-y-1">
              {supportPillars.map(({ label, icon: Icon }, index) => (
                <React.Fragment key={label}>
                  <span className="inline-flex min-h-11 items-center gap-2 rounded-[9px] border border-[#edf1f7] bg-white px-3 font-gotham text-[12px] font-medium shadow-[0_8px_18px_rgba(15,23,42,0.03)] md:min-h-0 md:border-0 md:bg-transparent md:px-0 md:text-[12px] md:shadow-none">
                    <Icon className="h-4 w-4 text-[#526177]" />
                    {label}
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
