"use client";

import posthog from "posthog-js";

const pushToDataLayer = (payload: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  const dataLayerWindow = window as unknown as Window & { dataLayer?: unknown[] };
  if (!dataLayerWindow.dataLayer) {
    dataLayerWindow.dataLayer = [];
  }
  dataLayerWindow.dataLayer.push(payload);
};

export const trackAlreadyWaitlisted = (
  source: string,
  properties: Record<string, unknown> = {},
) => {
  const payload = {
    source,
    updated: true,
    ...properties,
  };

  posthog.capture("Already_Waitlisted", payload);
  pushToDataLayer({
    event: "Already_Waitlisted",
    ...payload,
  });
};
