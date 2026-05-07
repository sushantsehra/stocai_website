import posthog from "posthog-js";

export const pushToDataLayer = (payload: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  const dataLayerWindow = window as unknown as Window & { dataLayer?: unknown[] };
  if (!dataLayerWindow.dataLayer) {
    dataLayerWindow.dataLayer = [];
  }
  dataLayerWindow.dataLayer.push(payload);
};

export const trackBotEvent = (event: string, payload: Record<string, unknown> = {}) => {
  const properties = { source: "bot", ...payload };
  posthog.capture(event, properties);
  pushToDataLayer({ event, ...properties });
};
