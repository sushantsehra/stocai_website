"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StoCareerBot from "@/components/StoCareerBot";

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
    <div className="space-y-4 font-gotham">
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) {
              router.back();
              return;
            }
            router.push("/");
          }}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#d9e6f6] bg-white px-4 py-2 text-sm font-medium text-[#111111] transition hover:border-[#014BAA] hover:text-[#014BAA]"
        >
          <span aria-hidden>←</span>
          <span>Back to homepage</span>
        </button>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(300px,360px)_minmax(0,1fr)] xl:items-start">
      <aside className="space-y-4 xl:sticky xl:top-6">
        <section className="overflow-hidden rounded-[30px] border border-[#d9e6f6] bg-[linear-gradient(160deg,#ffffff_0%,#f6f9ff_100%)] shadow-[0_24px_60px_rgba(1,75,170,0.08)]">
          <div className="px-5 py-6 md:px-6 md:py-7">
            <p className="text-[17px] font-medium text-[#111111] md:text-[21px]">
              You&apos;re not stuck because you&apos;re bad at your job.
            </p>
            <h1 className="mt-3 max-w-[11ch] font-gotham text-[34px] font-bold leading-[0.98] tracking-[-0.04em] text-[#111111] md:text-[44px]">
              You&apos;re stuck because nobody taught you <span className="text-[#014BAA]">how promotions actually work.</span>
            </h1>
            <p className="mt-4 font-gotham text-[15px] leading-7 text-[#4b5563]">
              This conversation helps identify what is actually blocking your growth so you can focus on the right move next.
            </p>
          </div>
        </section>

        <section className="rounded-[28px] border border-[#d9e6f6] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(1,75,170,0.06)] md:px-6">
          <p className="font-gotham text-[11px] font-bold uppercase tracking-[0.18em] text-[#0A57C6]">
            What we&apos;ll uncover
          </p>
          <div className="mt-4 space-y-4">
            {[
              "Whether the real issue is visibility, sponsorship, positioning, or perception.",
              "Why strong work may still not be translating into momentum.",
              "Which Better Corporate Life path is most relevant for your situation.",
            ].map((item, index) => (
              <div key={item} className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edf5ff] font-gotham text-xs font-bold text-[#014BAA]">
                  {index + 1}
                </div>
                <p className="font-gotham text-sm leading-6 text-[#4b5563]">{item}</p>
              </div>
            ))}
          </div>
        </section>

      </aside>

      <div className="min-w-0">
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
      </div>
    </div>
  );
}
