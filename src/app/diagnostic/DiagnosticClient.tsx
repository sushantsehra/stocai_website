"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const StoCareerBot = dynamic(() => import("@/components/StoCareerBot"), {
  ssr: false,
  loading: () => (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[12px] border border-[#e6edf7] bg-white font-gotham shadow-[0_16px_44px_rgba(15,23,42,0.09)]">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#dceaff] border-t-[#0A57C6]" />
    </section>
  ),
});

type DiagnosticContext = {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  referenceId: string;
  waitlistId: string;
  source: string;
};

const defaultContext: DiagnosticContext = {
  name: "",
  email: "",
  phone: "",
  countryCode: "+91",
  referenceId: "",
  waitlistId: "",
  source: "waitlist_modal",
};

export default function DiagnosticClient() {
  const router = useRouter();
  const [context, setContext] = useState<DiagnosticContext>(defaultContext);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("stoDiagnosticContext");
      if (!raw) return;

      const parsed = JSON.parse(raw) as Partial<DiagnosticContext>;
      setContext({
        name: parsed.name || "",
        email: parsed.email || "",
        phone: parsed.phone || "",
        countryCode: parsed.countryCode || "+91",
        referenceId: parsed.referenceId || "",
        waitlistId: parsed.waitlistId || "",
        source: parsed.source || "waitlist_modal",
      });
    } catch {
      setContext(defaultContext);
    }
  }, []);

  return (
    <div className="h-full font-gotham">
      <div className="hidden">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) {
              router.back();
              return;
            }
            router.push("/");
          }}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#e3e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#050817] shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition hover:border-[#c8d7ee] hover:text-[#014BAA]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to homepage</span>
        </button>
      </div>

      <StoCareerBot
        variant="embedded"
        waitlistId={context.waitlistId || context.referenceId || undefined}
        waitlistReferenceId={context.referenceId || undefined}
        source={context.source}
        paymentName={context.name}
        paymentEmail={context.email}
        paymentPhone={context.phone}
        paymentCountryCode={context.countryCode}
      />
    </div>
  );
}
