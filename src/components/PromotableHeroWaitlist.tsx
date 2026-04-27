"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import posthog from "posthog-js";
import env from "@/utils/env";
import applicationIcon from "../assets/application.png";
import certificate from "../assets/certificate.png";
import communitiesIcon from "../assets/communities.png";
import delegateIcon from "../assets/delegate.png";
import leaderIcon from "../assets/leader.png";
import marketingIcon from "../assets/marketing.png";
import roadmapIcon from "../assets/roadmap.png";
import StoCareerBot from "./StoCareerBot";

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

const curriculumCards = [
  ["Stakeholder", "management"],
  ["Leadership", "signalling"],
  ["Executive", "presence"],
  ["Promotion", "pitches"],
  ["Action", "Plan"],
  ["Art of", "delegation"],
];

const curriculumIcons = [
  applicationIcon,
  communitiesIcon,
  leaderIcon,
  marketingIcon,
  roadmapIcon,
  delegateIcon,
];

const supportPillars = [
  ["AI coach for", "reflection"],
  ["1344 mins of", "strategic insights"],
  ["Accountability", "partner"],
  ["12 month access", "apps for execution"],
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
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const showEmbeddedStoBot = source === "sticky_cta";

  useEffect(() => {
    if (isOpen) {
      setName(initialName || "");
      setEmail(initialEmail || "");
      setPhone(initialPhone || "");
      setCountryCode(initialCountryCode || "+91");
    }
  }, [isOpen, initialName, initialEmail, initialPhone, initialCountryCode]);

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
        amount: 95000,
      });
      posthog.capture("payment_redirected", {
        source,
        amount: 95000,
      });
      pushToDataLayer({
        event: "payment_redirected",
        source,
        amount: 95000,
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 z-0 bg-black/70 backdrop-blur-sm"
        onClick={handleBackdropClick}
        aria-label="Close waitlist"
      />

      <div
        role="dialog"
        aria-modal="true"
        data-waitlist-modal
        className="relative z-10 w-full max-w-[325px] max-h-[92vh] overflow-hidden rounded-[22px] border border-[#D2D6DC] bg-white pointer-events-auto shadow-[0_24px_60px_rgba(0,0,0,0.28)] md:max-w-[820px] md:rounded-[32px]"
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose("x_button");
          }}
          className="hidden md:inline-flex absolute right-6 top-6 z-20 h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-[0_8px_18px_rgba(0,0,0,0.12)] transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close waitlist"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
            <path d="M18 6l-12 12" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
          </svg>
        </button>

        <div className="max-h-[90vh] overflow-y-auto">
          <div className="px-[16px] pt-[21px] md:px-[40px] md:pt-[34px]">
            <div className="mb-[22px] flex items-center gap-[12px] md:hidden">
              <div className="inline-flex h-[37px] w-[37px] items-center justify-center rounded-[4px] bg-[#0A57C6] p-[6px] shadow-[0_6px_14px_rgba(10,87,198,0.24)] md:h-[54px] md:w-[54px] md:rounded-[8px] md:p-[8px]">
                <Image
                  src={certificate}
                  width={24}
                  height={24}
                  alt="BCL icon"
                  className="object-contain md:h-[36px] md:w-[36px]"
                />
              </div>
              <span className="bmp-modal-brand text-[#0A57C6]">
                BCL
              </span>
            </div>

            <div className="mb-[20px] w-[299px] md:hidden">
              <h2 className="bmp-modal-body text-[#111111]">
                Promotability is a skill.
              </h2>
              <h3 className="bmp-modal-body-strong text-[#111111]">
                And like any skill, <span className="bmp-modal-highlight">it can be learnt.</span>
              </h3>
              <p className="bmp-modal-subcopy mt-[4px] text-[#000000]">
                Ready to change your career trajectory?
              </p>
            </div>

            <div className="mb-[5px] w-[292px] md:hidden">
              <p className="bmp-modal-section-title text-[#111111]">
                You know you are capable of more.
              </p>
              <p className="bmp-modal-section-title bmp-modal-highlight">
                You just need the operating system.
              </p>
            </div>

            <div className="mb-[10px] grid grid-cols-3 gap-[4px] md:hidden">
              {curriculumCards.map((card, index) => (
                <div
                  key={card.join(" ")}
                  className="h-[45px] w-[95px] rounded-[10px] bg-[#E6F1FF] px-[7px] pb-[6px] pt-[6px]"
                >
                  <div className="flex justify-end">
                    <Image
                      src={curriculumIcons[index]}
                      alt=""
                      width={13}
                      height={13}
                      aria-hidden
                      className="h-[13px] w-[13px] brightness-0"
                    />
                  </div>
                  <p className="bmp-modal-card-text text-[#111111]">
                    {card[0]}
                    <br />
                    {card[1]}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-[9px] h-[55px] w-[292px] rounded-[8px] bg-[#014BAA] p-[7px] md:hidden">
              <div className="grid h-full grid-cols-[139px_1fr] gap-[7px]">
                <div className="flex items-center justify-center rounded-[6px] bg-[#0E58B6]">
                  <span className="bmp-modal-price text-white/50 line-through">
                    ₹4,999/-
                  </span>
                </div>
                <div className="flex items-center justify-center rounded-[6px] bg-[#003A86]">
                  <span className="bmp-modal-price text-white">
                    ₹950/-
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-[18px] flex w-[292px] items-start justify-between md:hidden">
              {supportPillars.map((item, index) => (
                <React.Fragment key={item.join(" ")}>
                  <div className="w-fit">
                    <p className="bmp-modal-support-text text-left text-[#014BAA]">
                      {item[0]}
                      <br />
                      {item[1]}
                    </p>
                  </div>
                  {index < supportPillars.length - 1 && (
                    <span
                      className="mt-[-2px] h-[30px] w-[0.5px] shrink-0 bg-black"
                      aria-hidden
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="hidden md:block">
              <div className="mb-[12px] flex justify-center">
                <div className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-[4px] bg-[#0A57C6] p-[4px] shadow-[0_6px_14px_rgba(10,87,198,0.2)]">
                  <Image src={certificate} width={22} height={22} alt="certificate" className="object-contain" />
                </div>
              </div>

              <h2 className="mb-[12px] text-center font-jakarta text-[36px] font-bold leading-[1.1] text-[#0A57C6]">
                Be More Promotable
              </h2>

              <div className="text-center">
                <p className="font-inter text-[22px] font-medium leading-[1.2] text-[#111111]">
                  Promotability is a skill. <span className="font-bold">And like any skill, </span>
                  <span className="font-bold text-[#0A57C6]">it can be learnt.</span>
                </p>
                <p className="mt-[10px] font-quattrocento text-[17px] font-bold leading-[22px] text-[#000000]">
                  Ready to change your career trajectory?
                </p>
              </div>

              <div className="mt-[22px] grid grid-cols-[270px_1fr] gap-[30px]">
                <div className="pt-[24px]">
                  <p className="font-inter text-[16px] font-medium leading-[1.2] text-[#111111]">
                    You know you are capable of more.
                  </p>
                  <p className="mt-[14px] font-inter text-[20px] font-bold leading-[1.15] text-[#0A57C6]">
                    You just need the
                    <br />
                    operating system.
                  </p>

                  <div className="mt-[52px] h-[56px] w-[280px] rounded-[8px] bg-[#014BAA] p-[6px]">
                    <div className="grid h-full grid-cols-[132px_1fr] gap-[6px]">
                      <div className="flex items-center justify-center rounded-[6px] bg-[#0E58B6]">
                        <span className="font-inter text-[18px] font-bold leading-[20px] text-white/50 line-through">
                          ₹4,999/-
                        </span>
                      </div>
                      <div className="flex items-center justify-center rounded-[6px] bg-[#003A86]">
                        <span className="font-inter text-[22px] font-bold leading-[20px] text-white">
                          ₹950/-
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-3 gap-[10px]">
                    {curriculumCards.map((card, index) => (
                      <div
                        key={`desktop-${card.join(" ")}`}
                        className="h-[68px] rounded-[10px] bg-[#E6F1FF] px-[12px] pb-[9px] pt-[8px]"
                      >
                        <div className="flex justify-end">
                          <Image
                            src={curriculumIcons[index]}
                            alt=""
                            width={16}
                            height={16}
                            aria-hidden
                            className="h-[16px] w-[16px] brightness-0"
                          />
                        </div>
                        <p className="font-quattrocento text-[12px] font-bold leading-[14px] text-[#111111]">
                          {card[0]}
                          <br />
                          {card[1]}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-[18px] flex items-start justify-between pr-[10px]">
                    {supportPillars.map((item, index) => (
                      <React.Fragment key={`desktop-support-${item.join(" ")}`}>
                        <div className="w-fit">
                          <p className="font-quattrocento text-left text-[12px] font-bold leading-[15px] text-[#014BAA]">
                            {item[0]}
                            <br />
                            {item[1]}
                          </p>
                        </div>
                        {index < supportPillars.length - 1 && (
                          <span className="mt-[-3px] h-[38px] w-[0.5px] shrink-0 bg-black" aria-hidden />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {showEmbeddedStoBot ? (
              <div className="mt-[14px] md:mt-[24px]">
                <StoCareerBot
                  variant="embedded"
                  waitlistId={initialWaitlistId}
                  waitlistReferenceId={initialReferenceId}
                  source={source}
                />
              </div>
            ) : null}
          </div>

          <div className="mt-0 rounded-b-[21px] bg-black px-[14px] pb-[23px] pt-[18px] md:mt-[18px] md:rounded-b-[32px] md:px-[40px] md:pb-[30px] md:pt-[26px]">
            <form onSubmit={handleSubmit} className="mx-auto max-w-[260px] text-center md:max-w-[620px]">
              <h3 className="bmp-modal-footer-title text-white md:hidden">
                Invest in your growth
              </h3>
              <p className="bmp-modal-footer-title text-white md:hidden">
                We&apos;re here to help you lead.
              </p>
              <p className="hidden font-inter text-center text-[19px] font-bold leading-[1.2] text-white md:block">
                Invest in your growth. We&apos;re here to help you lead.
              </p>

              <input type="hidden" name="name" value={name} readOnly />
              <input type="hidden" name="email" value={email} readOnly />
              <input type="hidden" name="phone" value={phone} readOnly />
              <input type="hidden" name="countryCode" value={countryCode} readOnly />

              <div className="mt-[16px] md:mt-[18px]">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bmp-modal-cta-text inline-flex items-center justify-center rounded-[7px] bg-[#357BF2] px-[16px] py-[7px] text-white transition hover:bg-[#1f6dea] focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 md:rounded-[8px] md:px-[44px] md:py-[10px]"
                >
                  {status === "loading" ? "Processing..." : "I'll Invest in My Career"}
                </button>
              </div>

              {message && (
                <p
                  className="mt-4 text-center text-sm text-red-300"
                  role="status"
                  aria-live="polite"
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotableHeroWaitlist;
