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
  Star,
  UserRoundCheck,
  UsersRound,
  X,
} from "lucide-react";
import posthog from "posthog-js";
import env from "@/utils/env";
import { writeStoDiagnosticContext } from "@/lib/diagnosticContext";
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
  { label: "Accountability", icon: UsersRound },
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
        className="pointer-events-auto relative z-10 h-full max-h-screen w-full overflow-hidden bg-white shadow-[0_28px_80px_rgba(15,23,42,0.24)] sm:h-auto sm:max-h-[calc(100vh-24px)] sm:max-w-[375px] sm:rounded-[24px] md:max-w-[860px] md:rounded-[26px]"
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

        <div className="h-full max-h-screen overflow-y-auto px-[30px] pb-7 pt-3 sm:max-h-[calc(100vh-24px)] md:px-10 md:pb-5 md:pt-5">
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
                <span className="pb-1 font-jakarta text-[22px] font-bold leading-none text-[#1a3768] line-through md:text-[19px]">{"\u20b9"}4,999</span>
                <span className="font-jakarta text-[31px] font-bold leading-none text-white md:text-[31px]">{"\u20b9"}1,970</span>
              </div>

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

            <section className="rounded-[6px] border border-[#88b9ff] bg-white px-3 pb-4 pt-5 md:rounded-[10px] md:px-5 md:pb-5 md:pt-8">
              <div className="text-center">
                <h3 className="font-quattrocento text-[28px] font-bold leading-tight text-[#075ff0] md:text-[28px]">
                  Get Unstuck First
                </h3>
                <p className="mx-auto mt-1 max-w-[245px] font-jakarta text-[11px] font-medium leading-[16px] text-black md:text-[12px] md:leading-[17px]">
                  Not ready to join yet? Start with clarity on what is blocking your promotion momentum.
                </p>
              </div>

              <div className="mt-5 space-y-2 md:mt-6">
                {clarityFeatures.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex min-h-[39px] items-center gap-3 rounded-[5px] border border-[#9ac3ff] bg-[#f3f7ff] px-[7px] text-[#232323] md:min-h-[43px]">
                    <span className="flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-[3px] bg-white text-[#1265f5]">
                      <Icon className="h-[19px] w-[19px]" strokeWidth={2.6} />
                    </span>
                    <span className="font-jakarta text-[15px] font-medium leading-tight md:text-[14px]">{label}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleGetUnstuck}
                className="mt-[31px] inline-flex min-h-[46px] w-full cursor-pointer items-center justify-center rounded-[5px] border border-[#075ff0] bg-white px-4 font-jakarta text-[16px] font-semibold text-[#075ff0] transition hover:bg-[#f3f7ff] focus:outline-none focus:ring-2 focus:ring-[#88b9ff] md:mt-7 md:min-h-[44px] md:text-[15px]"
              >
                Get Unstuck
              </button>
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
