"use client";

const WAITLIST_VISITOR_ID_KEY = "waitlistVisitorId";

const generateVisitorId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `visitor_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
};

export const getWaitlistVisitorId = () => {
  if (typeof window === "undefined") {
    return "";
  }

  const existingVisitorId = window.localStorage.getItem(WAITLIST_VISITOR_ID_KEY);
  if (existingVisitorId) {
    return existingVisitorId;
  }

  const visitorId = generateVisitorId();
  window.localStorage.setItem(WAITLIST_VISITOR_ID_KEY, visitorId);
  return visitorId;
};
