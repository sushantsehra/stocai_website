"use client";

export type StoDiagnosticContext = {
  name?: string;
  email?: string;
  phone?: string;
  countryCode?: string;
  referenceId?: string;
  waitlistId?: string;
  source?: string;
};

const STORAGE_KEY = "stoDiagnosticContext";

export const getWaitlistReferenceFromResponse = (data: {
  reference_id?: string;
  referenceId?: string;
  waitlist_id?: string;
  waitlistId?: string;
  id?: string;
}) => data.reference_id || data.referenceId || data.waitlist_id || data.waitlistId || data.id || "";

export const writeStoDiagnosticContext = (context: StoDiagnosticContext) => {
  if (typeof window === "undefined") return;

  window.sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      name: context.name?.trim() || "",
      email: context.email?.trim() || "",
      phone: context.phone?.trim() || "",
      countryCode: context.countryCode?.trim() || "+91",
      referenceId: context.referenceId?.trim() || "",
      waitlistId: context.waitlistId?.trim() || context.referenceId?.trim() || "",
      source: context.source?.trim() || "waitlist_modal",
    }),
  );
};

export const readStoDiagnosticContext = (): StoDiagnosticContext => {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as StoDiagnosticContext;
  } catch {
    return {};
  }
};
