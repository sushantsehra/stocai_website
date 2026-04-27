"use client";

import React, { useEffect, useState } from "react";
import bclLogo from "../assets/bcl.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import env, { getAppUrl, getSignupUrl } from "@/utils/env";
import { useUser } from "@/contexts/UserContext";
import { deleteAuthCookie, deleteUserCookie, setLogoutSignal } from "@/utils/cookies";

type ReviewSessionResponse = {
  id: string;
  waitlist_id: string;
  flow_version: string;
  status: string;
  current_step?: string | null;
  answers_json?: Record<string, unknown>;
  result_json?: Record<string, unknown>;
  started_at?: string | null;
  completed_at?: string | null;
  created_at: string;
  updated_at: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readString = (value: unknown) => (typeof value === "string" && value.trim() ? value : null);

const renderValue = (value: unknown) => {
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return null;
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewWaitlistId, setReviewWaitlistId] = useState("");
  const [reviewSession, setReviewSession] = useState<ReviewSessionResponse | null>(null);
  const [reviewStatus, setReviewStatus] = useState<"idle" | "loading" | "error">("idle");
  const [reviewError, setReviewError] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useUser();

    const navigateToSection = (id: string) => {
    if (pathname !== "/") {
      router.push(`/#${id}`);
      setMenuOpen(false);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

    const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (pathname !== "/") {
      router.push("/#waitlist");
      setMenuOpen(false);
      return;
    }

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

const handleLoginRedirect = () => {
  window.location.href = getSignupUrl("/");
};

  const handleContinueLearning = () => {
    setShowUserMenu(false);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setLogoutSignal();
    deleteAuthCookie("community_access_token");
    deleteUserCookie();
    setUser(null);
    setShowUserMenu(false);
    setMenuOpen(false);
    router.push("/");
  };

  const openReviewModal = () => {
    setMenuOpen(false);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setReviewSession(null);
    setReviewStatus("idle");
    setReviewError("");
  };

  const handleReviewLookup = async () => {
    const waitlistId = reviewWaitlistId.trim();
    if (!waitlistId) {
      setReviewStatus("error");
      setReviewError("Enter a waitlist ID to review a saved session.");
      return;
    }

    setReviewStatus("loading");
    setReviewError("");
    setReviewSession(null);

    try {
      const response = await fetch(`${env.apiUrl}/waitlist-bot-sessions/by-waitlist/${waitlistId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const data = (await response.json().catch(() => ({}))) as Partial<ReviewSessionResponse> & {
        error?: string;
      };

      if (!response.ok || !data?.id) {
        throw new Error(data?.error || "Unable to load the saved bot session.");
      }

      setReviewSession(data as ReviewSessionResponse);
      setReviewStatus("idle");
    } catch (error) {
      setReviewStatus("error");
      setReviewError(error instanceof Error ? error.message : "Unable to load the saved bot session.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showUserMenu && !target.closest(".landing-user-menu")) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu]);

  useEffect(() => {
    if (!isReviewModalOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeReviewModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isReviewModalOpen]);

  const answers = isRecord(reviewSession?.answers_json) ? reviewSession.answers_json : null;
  const result = isRecord(reviewSession?.result_json) ? reviewSession.result_json : null;
  const context = answers && isRecord(answers.context) ? answers.context : null;
  const decisions = answers && isRecord(answers.decisions) ? answers.decisions : null;

  const decisionRows = decisions
    ? [
        ["Asked early", renderValue(decisions.desireAskedEarlyLabel)],
        ["Leadership importance", renderValue(decisions.importanceVisibleLabel)],
        ["Personally seen", renderValue(decisions.personallySeenLabel)],
        ["Sponsor power", renderValue(decisions.sponsorHasPowerLabel)],
        ["Sponsor willingness", renderValue(decisions.sponsorWillSpendCapitalLabel)],
        ["Next-level evidence", renderValue(decisions.nextLevelEvidenceLabel)],
      ].filter((entry): entry is [string, string] => Boolean(entry[1]))
    : [];


  return (
    <>
      <header className="w-full bg-white mt-2">
        <div className="max-w-full flex justify-between items-center pr-4">
        {/* Logo */}
        <Link href="/" className="ml-4">
          <Image
            src={bclLogo}
            alt="BCL Logo"
            width={180}
            height={50}
            className="object-contain w-[110px] h-auto sm:w-[130px] md:w-[150px] lg:w-[180px]"
          />
        </Link>

        <div className="flex lg:mr-24">
        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-black/80 font-normal text-[14px] items-center mr-6">
            <button onClick={() => navigateToSection("true-section")} className="hover:text-[#0B64F4] font-jakarta cursor-pointer">
              About Us
            </button>
            <button onClick={() => navigateToSection("framework")} className="hover:text-[#0B64F4] font-jakarta cursor-pointer">
              Program
            </button>
            <button onClick={() => navigateToSection("faq")} className="hover:text-[#0B64F4] font-jakarta cursor-pointer">
              FAQ
            </button>
            <button onClick={openReviewModal} className="hover:text-[#0B64F4] font-jakarta cursor-pointer">
              Review Session
            </button>
          </nav>

        <div className="flex items-center space-x-3 lg:space-x-4">
          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <button
              onClick={scrollToWaitlist}
              className="bg-[#0B64F4] hover:bg-blue-700 text-white text-[14px] px-4 py-2 rounded-[12px] font-jakarta cursor-pointer font-bold transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
              Get Early Access
            </button>

            {user ? (
              <div className="landing-user-menu relative">
                <button
                  onClick={() => setShowUserMenu((current) => !current)}
                  className="flex cursor-pointer items-center gap-2 rounded-full bg-[#0B64F4] px-2 py-1 text-white transition hover:bg-blue-700"
                >
                  <Image
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(`${user.firstName} ${user.lastName}`)}&background=ffffff&color=0B64F4&size=32&bold=true`}
                    alt={`${user.firstName} ${user.lastName}`}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="pr-2 text-[14px] font-bold font-jakarta">
                    {user.firstName}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-44 rounded-[14px] border border-slate-200 bg-white p-2 shadow-xl">
                    <div className="border-b border-slate-200 px-3 py-2">
                      <p className="font-jakarta text-sm font-semibold text-slate-900">
                        {user.firstName} {user.lastName}
                      </p>
                      {user.email ? (
                        <p className="mt-1 text-xs text-slate-500">{user.email}</p>
                      ) : null}
                    </div>
                    <Link
                      href={`${getAppUrl()}/`}
                      onClick={handleContinueLearning}
                      className="mt-2 block w-full cursor-pointer rounded-[10px] px-3 py-2 text-left font-jakarta text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Continue Your Learning
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full cursor-pointer rounded-[10px] px-3 py-2 text-left font-jakarta text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={handleLoginRedirect} 
                className="bg-gradient-to-l from-[#C5C5C5] to-[#FFFFFF] hover:bg-gray-200 text-[#3F3F3F] font-jakarta cursor-pointer text-[14px] px-4 py-2 rounded-[12px] font-bold transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
              >
                Sign In / Login
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}

            <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex cursor-pointer flex-col justify-center items-center gap-[4px] rounded-[4px] shadow-3xl border border-gray-100 p-2"
          >
            <span className="w-5 h-[2.5px] bg-[#7A7777]"></span>
            <span className="w-5 h-[2.5px] bg-[#7A7777]"></span>
            <span className="w-5 h-[2.5px] bg-[#7A7777]"></span>
          </button>
          </div>
    
        </div>

        </div>

      {menuOpen && (
        <div className="md:hidden fixed top-20 right-14 bg-white rounded-[16px] shadow-xl p-2.5 w-[220px] z-[9999]">
          <div className="flex flex-col gap-2.5 text-[14px] font-medium">
            <button onClick={() => navigateToSection("true-section")} className="text-black/80 hover:text-[#0B64F4] font-jakarta">
              About Us
            </button>
            <button onClick={() => navigateToSection("framework")} className="text-black/80 hover:text-[#0B64F4] font-jakarta">
              Program
            </button>
            <button onClick={() => navigateToSection("faq")} className="text-black/80 hover:text-[#0B64F4] font-jakarta">
              FAQ
            </button>
            <button onClick={openReviewModal} className="text-black/80 hover:text-[#0B64F4] font-jakarta">
              Review Session
            </button>
            <hr />

            <button
              onClick={scrollToWaitlist}
              className="cursor-pointer bg-[#0B64F4] text-white py-2 rounded-[4px] font-jakarta font-bold transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
              Get Early Access
            </button>

            {user ? (
              <>
                <div className="flex items-center justify-center gap-3 rounded-[10px] bg-[#0B64F4] px-3 py-2 text-white">
                  <Image
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(`${user.firstName} ${user.lastName}`)}&background=ffffff&color=0B64F4&size=32&bold=true`}
                    alt={`${user.firstName} ${user.lastName}`}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="font-jakarta text-sm font-bold">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <Link
                  href={`${getAppUrl()}/`}
                  onClick={handleContinueLearning}
                  className="cursor-pointer rounded-[4px] bg-[#0B64F4] py-2 text-center font-jakarta font-bold text-white transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
                >
                  Continue your learning
                </Link>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer rounded-[4px] bg-slate-100 py-2 font-jakarta font-bold text-slate-700 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
                >
                  Logout
                </button>
              </>
            ) : (
              <button onClick={() => {setMenuOpen(false); handleLoginRedirect()}} 
                className="bg-gradient-to-l from-[#C5C5C5] to-[#FFFFFF] text-[#3F3F3F] py-2 rounded-[4px] font-jakarta font-bold transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
              >
                Sign In / Login
              </button>
            )}
          </div>
        </div>
      )}
      </header>

      {isReviewModalOpen ? (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close review modal"
            onClick={closeReviewModal}
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Review bot session"
            className="relative z-10 flex max-h-[85vh] w-full max-w-[520px] flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.22)]"
          >
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-jakarta text-xs font-semibold uppercase tracking-[0.12em] text-[#0B64F4]">
                    Admin Lookup
                  </p>
                  <h2 className="mt-2 font-jakarta text-2xl font-bold text-slate-900">
                    Review Bot Session
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Enter a waitlist ID to load the latest saved Sto diagnostic session for that waitlist entry.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeReviewModal}
                  className="rounded-[10px] px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block font-jakarta text-sm font-semibold text-slate-800">
                  Waitlist ID
                </span>
                <input
                  type="text"
                  value={reviewWaitlistId}
                  onChange={(event) => setReviewWaitlistId(event.target.value)}
                  placeholder="Enter waitlist ID"
                  className="w-full rounded-[12px] border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0B64F4]"
                />
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleReviewLookup}
                  disabled={reviewStatus === "loading"}
                  className="rounded-[12px] bg-[#0B64F4] px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {reviewStatus === "loading" ? "Loading..." : "Load Session"}
                </button>
                {reviewWaitlistId.trim() ? (
                  <p className="text-xs font-medium text-slate-500">
                    Lookup target: <span className="font-mono">{reviewWaitlistId.trim()}</span>
                  </p>
                ) : null}
              </div>

              {reviewError ? (
                <div className="rounded-[14px] border border-[#F3C7C7] bg-[#FFF6F6] p-4">
                  <p className="text-sm font-semibold text-[#B42318]">{reviewError}</p>
                </div>
              ) : null}

              {reviewSession ? (
                <div className="space-y-4 rounded-[16px] border border-slate-200 bg-slate-50 p-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-[12px] bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Session</p>
                      <p className="mt-2 font-mono text-xs text-slate-600">{reviewSession.id}</p>
                      <p className="mt-3 text-sm text-slate-700">
                        <strong>Status:</strong> {reviewSession.status}
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        <strong>Current step:</strong> {reviewSession.current_step || "N/A"}
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        <strong>Flow version:</strong> {reviewSession.flow_version}
                      </p>
                    </div>
                    <div className="rounded-[12px] bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Timestamps</p>
                      <p className="mt-2 text-sm text-slate-700">
                        <strong>Started:</strong> {reviewSession.started_at || "N/A"}
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        <strong>Completed:</strong> {reviewSession.completed_at || "Not completed"}
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        <strong>Updated:</strong> {reviewSession.updated_at}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[12px] bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Their Situation</p>
                    <p className="mt-2 text-sm text-slate-700">
                      <strong>Primary concern:</strong> {readString(answers?.q1Label) || readString(answers?.q1) || "N/A"}
                    </p>
                    {context ? (
                      <div className="mt-3 space-y-2 text-sm text-slate-700">
                        {readString(context.notExpected) ? (
                          <p><strong>Not going as expected:</strong> {readString(context.notExpected)}</p>
                        ) : null}
                        {readString(context.knownFor) ? (
                          <p><strong>Known for:</strong> {readString(context.knownFor)}</p>
                        ) : null}
                        {readString(context.targetRole) ? (
                          <p><strong>Target role:</strong> {readString(context.targetRole)}</p>
                        ) : null}
                        {context.skipped === true ? (
                          <p><strong>Context:</strong> {readString(context.skippedLabel) || "User skipped context questions"}</p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>

                  <div className="rounded-[12px] bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Diagnostic Path</p>
                    <p className="mt-2 text-sm text-slate-700">
                      <strong>Branch:</strong>{" "}
                      {readString(answers?.diagnosticPathLabel) || readString(answers?.diagnosticPath) || "N/A"}
                    </p>
                    {readString(answers?.desireBlockerLabel) ? (
                      <p className="mt-1 text-sm text-slate-700">
                        <strong>Desire blocker:</strong> {readString(answers?.desireBlockerLabel)}
                      </p>
                    ) : null}
                    {decisionRows.length ? (
                      <div className="mt-3 space-y-1 text-sm text-slate-700">
                        {decisionRows.map(([label, value]) => (
                          <p key={label}>
                            <strong>{label}:</strong> {value}
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="rounded-[12px] bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Outcome</p>
                    <p className="mt-2 text-sm text-slate-700">
                      <strong>Door:</strong> {readString(answers?.doorLabel) || readString(result?.door) || "N/A"}
                    </p>
                    {readString(result?.summary) ? (
                      <p className="mt-1 text-sm text-slate-700"><strong>Summary:</strong> {readString(result?.summary)}</p>
                    ) : null}
                    {readString(result?.pain) ? (
                      <p className="mt-1 text-sm text-slate-700"><strong>Pain:</strong> {readString(result?.pain)}</p>
                    ) : null}
                    {readString(result?.concept) ? (
                      <p className="mt-1 text-sm text-slate-700"><strong>Concept:</strong> {readString(result?.concept)}</p>
                    ) : null}
                    {readString(result?.program) ? (
                      <p className="mt-1 text-sm text-slate-700"><strong>Program:</strong> {readString(result?.program)}</p>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default Header;
