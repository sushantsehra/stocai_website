"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { readStoDiagnosticContext } from "@/lib/diagnosticContext";

const StoCareerBot = dynamic(() => import("@/components/StoCareerBot"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-0 w-full items-center justify-center bg-[#eef4ff] font-gotham md:bg-[#f7f5f2]">
      <div className="flex h-full min-h-0 w-full max-w-full flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:h-[calc(100svh-40px)] md:max-h-[920px] md:max-w-[760px] md:rounded-[4px] md:border md:border-[#d8e4f6]">
        <div className="flex h-[52px] shrink-0 items-start bg-white px-8 pt-4 md:h-[58px]">
          <div className="font-gotham text-[29px] font-bold leading-none text-[#0057c8]">BCL</div>
        </div>
        <div className="flex flex-1 items-center justify-center px-8 text-center">
          <div>
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#c7d8f9] border-t-[#0057c8]" />
            <p className="mt-4 font-gotham text-sm font-medium text-[#4b5563]">Loading clarity check...</p>
          </div>
        </div>
      </div>
    </div>
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
      const parsed = readStoDiagnosticContext();
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
