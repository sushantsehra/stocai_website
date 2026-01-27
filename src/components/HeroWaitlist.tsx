"use client";

import React, { useEffect, useState } from "react";
// import Image from "next/image";
import YourCarrerYourPeeks from "../assets/YourCarrerYourPeeks.jpg";
import env from "@/utils/env";

type HeroWaitlistProps = {
  bgImage?: string;
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
  onSubmit?: (data: {
    name: string;
    phone: string;
    email: string;
  }) => void;
};

const HeroWaitlist: React.FC<HeroWaitlistProps> = ({
  bgImage = "",
  isOpen,
  onClose,
  initialEmail,
  onSubmit,
}) => {
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
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
    if (!isOpen) return;
    setEmail(initialEmail ?? "");
  }, [isOpen, initialEmail]);

  const createPaymentLink = async (payload: {
    name?: string;
    email?: string;
    phone: string;
    reference_id?: string;
    amount: number;
  }) => {
    const response = await fetch(`${env.apiUrl}/payments/razorpay/link`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        name: payload.name ?? firstName,
        email: payload.email ?? email,
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

    try {
      const response = await fetch(`${env.apiUrl}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: firstName,
          phone,
          email,
          source: "hero",
        }),
      });

      const waitlistData = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(waitlistData?.error || "Unable to join the waitlist.");
      }

      onSubmit?.({
        name: firstName,
        phone,
        email,
      });

      const shouldStartPayment = true; /*typeof paymentAmount === "number" && paymentAmount > 0;*/
      if (shouldStartPayment) {
        const shortUrl = await createPaymentLink({
          name: firstName,
          email,
          phone,
          reference_id: waitlistData?.reference_id,
          amount: 100, /*paymentAmount,*/
        });
        window.location.href = shortUrl;
        return;
      }

      setStatus("success");
      setMessage("");
      setFirstName("");
      setPhone("");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
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
        className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm"
        onClick={handleBackdropClick}
        aria-label="Close waitlist"
      />

      <div
        role="dialog"
        aria-modal="true"
        data-waitlist-modal
        className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl pointer-events-auto"
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-white pointer-events-auto"
          aria-label="Close waitlist"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="max-h-[90vh] overflow-y-auto">
          <section className="w-full" id="waitlist">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
              <div className="relative overflow-hidden rounded-2xl border border-black/5 shadow-sm">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-center bg-cover"
                  style={{
                    backgroundImage: `url(${bgImage || YourCarrerYourPeeks.src})`,
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

                <div className="relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-7 px-6 sm:px-10 lg:px-12 py-12 md:py-16 lg:py-20">
                      <div className="max-w-2xl">
                        {status === "success" ? null : (
                          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[49.1px] font-gotham font-normal tracking-tight text-white leading-tight">
                            <span className="block">Congratulations!</span>
                            <span className="block">You just made a decision</span>
                            <span className="block">that&apos;ll change your</span>
                            <span className="block">career trajectory.</span>
                          </h1>
                        )}

                        {status === "success" ? null : (
                          <p className="mt-6 text-sm sm:text-base md:text-[18px] text-white leading-relaxed max-w-lg">
                            Fill out your details below, and we&apos;ll notify you once enrollment for Be More Promotable opens.
                          </p>
                        )}

                        {status === "success" ? (
                          <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-6 text-white backdrop-blur">
                            <h2 className="text-2xl font-gotham font-semibold">You&apos;re on the list! Your future self thanks you.</h2>
                            <p className="mt-4 text-base font-medium">Next steps:</p>
                            <ul className="mt-3 space-y-2 text-sm sm:text-base">
                              <li>Check your inbox (or Spam folder!) for our confirmation email</li>
                              <li>Download our free guide &lt;&lt;TBD&gt;&gt;</li>
                              <li>Follow us on LinkedIn for weekly promotion strategy insights</li>
                              <li>Share this with a friend who&apos;s also stuck (they&apos;ll thank you)</li>
                            </ul>
                          </div>
                        ) : (
                          <form className="mt-8" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                              <label className="sr-only" htmlFor="firstName">
                                Your first name
                              </label>
                              <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="Your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full rounded-[12px] bg-white placeholder:text-[#8A8684] px-4 py-3 text-gray-900 shadow-inner border border-[#cfe0ff] focus:outline-none focus:ring-2 focus:ring-[#cfe0ff] transition"
                                required
                              />

                              <label className="sr-only" htmlFor="email">
                                Email id
                              </label>
                              <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email id"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-[12px] bg-white placeholder:text-[#8A8684] px-4 py-3 text-gray-900 shadow-inner border border-[#cfe0ff] focus:outline-none focus:ring-2 focus:ring-[#cfe0ff] transition"
                                required
                              />

                              <label className="sr-only" htmlFor="phone">
                                WhatsApp number
                              </label>
                              <input
                                id="phone"
                                name="phone"
                                type="tel"
                                inputMode="tel"
                                placeholder="WhatsApp number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full rounded-[12px] bg-white placeholder:text-[#8A8684] px-4 py-3 text-gray-900 shadow-inner border border-[#cfe0ff] focus:outline-none focus:ring-2 focus:ring-[#cfe0ff] transition"
                                pattern="^\\+?[0-9\\s-]{8,20}$"
                                title="Use digits only, optional +, e.g. +14155552671."
                                required
                              />
                            </div>

                            <div className="mt-6">
                              <button
                                type="submit"
                                disabled={status === "loading"}
                                className="inline-flex items-center gap-3 bg-[#014BAA] text-white px-6 py-3 rounded-[12px] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#cfe0ff] transition"
                              >
                                <span className="font-medium text-[16px] font-gotham">
                                  {status === "loading" ? "Joining..." : "Join the waitlist"}
                                </span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                                  <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                  <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                            </div>
                            <p className="mt-4 text-xs sm:text-sm text-white/80">
                              By submitting, you agree to receive program updates and our newsletter. Your information is
                              secure. No spam or third-party nonsense. Unsubscribe at any time.
                            </p>
                            {message ? (
                              <p
                                className="mt-4 text-sm text-red-200"
                                role="status"
                                aria-live="polite"
                              >
                                {message}
                              </p>
                            ) : null}
                          </form>
                        )}
                      </div>
                    </div>

                    <div className="hidden lg:block lg:col-span-5">
                      <div className="h-full" />
                    </div>

                    <div className="lg:hidden px-6 pb-10" />
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/8 to-transparent" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HeroWaitlist;
