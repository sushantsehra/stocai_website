"use client";

import { useState } from "react";
import { Mail, ArrowRight, X, Loader2, CheckCircle, ExternalLink, Send } from "lucide-react";
import env from "@/utils/env";
import { AssessmentData } from "./assessmentData";

interface EmailGateModalProps {
    isOpen: boolean;
    onClose: () => void;
    assessmentData: AssessmentData;
}

const EmailGateModal = ({ isOpen, onClose, assessmentData }: EmailGateModalProps) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [submittedEmail, setSubmittedEmail] = useState("");
    const [assessmentId, setAssessmentId] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch(`${env.apiUrl}/assessment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.trim().toLowerCase(),
                    name: name.trim() || null,
                    overall_score: assessmentData.scores.overall,
                    persona_title: assessmentData.persona.title,
                    persona_description: assessmentData.persona.description,
                    category_scores: {
                        sbi: assessmentData.scores.categories.sbi,
                        vsi: assessmentData.scores.categories.vsi,
                        adi: assessmentData.scores.categories.adi,
                        eii: assessmentData.scores.categories.eii,
                        cpi: assessmentData.scores.categories.cpi,
                        msi: assessmentData.scores.categories.msi,
                    },
                    key_insights: assessmentData.insights,
                    action_plan: assessmentData.actionItems,
                    source: "promotion_assessment",
                }),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data?.detail || data?.error || "Unable to save your results. Please try again.");
            }

            const data = await response.json();

            if (data.ok && data.assessment_id) {
                setSubmittedEmail(email);
                setAssessmentId(data.assessment_id);
                setStatus("success");
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
        }
    };

    const handleViewResults = () => {
        if (assessmentId) {
            window.location.href = `/quiz/results?id=${assessmentId}`;
        }
    };

    const handleLearnMore = () => {
        window.location.href = "/";
    };

    if (!isOpen) return null;

    // Success state
    if (status === "success") {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                <div className="relative z-10 w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                            <CheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold font-['Montserrat',sans-serif] text-gray-900 mb-2">
                            Results Saved!
                        </h2>
                        <p className="text-gray-600 font-['Plus_Jakarta_Sans',sans-serif]">
                            Your promotion readiness report has been saved for
                        </p>
                        <p className="text-[#0B64F4] font-semibold font-['Plus_Jakarta_Sans',sans-serif] mt-1">
                            {submittedEmail}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={handleViewResults}
                            className="w-full h-12 bg-[#0B64F4] hover:bg-[#0B64F4]/90 text-white font-['Plus_Jakarta_Sans',sans-serif] font-semibold rounded-xl text-lg flex items-center justify-center gap-2 transition-colors"
                        >
                            <Send className="w-5 h-5" />
                            View My Results
                        </button>

                        <button
                            onClick={handleLearnMore}
                            className="w-full h-12 border-2 border-[#0B64F4] text-[#0B64F4] hover:bg-[#0B64F4]/10 font-['Plus_Jakarta_Sans',sans-serif] font-semibold rounded-xl text-lg flex items-center justify-center gap-2 transition-colors"
                        >
                            <ExternalLink className="w-5 h-5" />
                            Learn More About BCL
                        </button>
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-6 font-['Plus_Jakarta_Sans',sans-serif]">
                        You can access your results anytime using the link we&apos;ll send to your email.
                    </p>
                </div>
            </div>
        );
    }

    // Email form
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative z-10 w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl border border-gray-100">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0B64F4] rounded-2xl mb-4">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold font-['Montserrat',sans-serif] text-[#0B64F4] mb-2">
                        Get Your Results
                    </h2>
                    <p className="text-gray-600 font-['Plus_Jakarta_Sans',sans-serif]">
                        Enter your email to receive your personalized promotion readiness report
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium font-['Plus_Jakarta_Sans',sans-serif] text-gray-700">
                            Name (optional)
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-12 px-4 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] border border-gray-200 focus:border-[#0B64F4] focus:ring-2 focus:ring-[#0B64F4]/20 outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium font-['Plus_Jakarta_Sans',sans-serif] text-gray-700">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full h-12 px-4 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] border border-gray-200 focus:border-[#0B64F4] focus:ring-2 focus:ring-[#0B64F4]/20 outline-none transition-all"
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-sm font-['Plus_Jakarta_Sans',sans-serif]">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={status === "loading" || !email}
                        className="w-full h-12 bg-[#0B64F4] hover:bg-[#0B64F4]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-['Plus_Jakarta_Sans',sans-serif] font-semibold rounded-xl text-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        {status === "loading" ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                Send Result
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmailGateModal;
