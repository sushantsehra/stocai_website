// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PersonalCoachingLanding from "./PersonalCoachingLanding";
import { openRazorpayCheckout } from "@/lib/razorpayCheckout";

vi.mock("@/utils/env", () => ({ default: { apiUrl: "https://api.example" } }));
let configuredPrice = 2199900;
vi.mock("@/hooks/useSubscriptionAmount", () => ({
  usePaymentSettings: () => ({ personalCoachingAmount: configuredPrice, currency: "INR" }),
  formatSubscriptionAmount: (amount: number) => `₹${(amount / 100).toLocaleString("en-IN")}`,
}));
vi.mock("posthog-js", () => ({ default: { capture: vi.fn() } }));
vi.mock("@/lib/analytics/attribution", () => ({ getAttributionForApi: () => ({}) }));
vi.mock("@/lib/waitlistVisitor", () => ({ getWaitlistVisitorId: () => "visitor-1" }));
vi.mock("@/lib/analytics/events", () => ({
  trackCtaClick: vi.fn(),
  trackInitiateCheckout: vi.fn(),
  trackPurchase: vi.fn(),
  trackRazorpayCheckoutOpened: vi.fn(),
}));
vi.mock("@/lib/razorpayCheckout", () => ({
  openRazorpayCheckout: vi.fn().mockResolvedValue({}),
}));

describe("personal coaching landing page", () => {
  beforeEach(() => {
    configuredPrice = 2199900;
    vi.mocked(openRazorpayCheckout).mockClear();
    vi.stubGlobal("fetch", vi.fn(async (url) => ({
      ok: true,
      json: async () => String(url).endsWith("/waitlist")
        ? { waitlist_id: "lead-1" }
        : {
            order_id: "order-1",
            key_id: "key-1",
            checkout_attempt_id: "attempt-1",
            amount: 2199900,
            currency: "INR",
            completion_url: "https://platform.example/signUp",
          },
    })));
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("exposes the offer and all purchase actions consistently", () => {
    render(<PersonalCoachingLanding />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(/1:1 Human Coaching/);
    expect(screen.getAllByRole("button", { name: /Get my Personal Strategist/i })).toHaveLength(2);
    expect(screen.getAllByText("₹21,999").length).toBeGreaterThan(0);
  });

  it("creates an offer-specific order at the server-authoritative price", async () => {
    render(<PersonalCoachingLanding />);
    fireEvent.click(screen.getAllByRole("button", { name: /Get my Personal Strategist/i })[0]);
    fireEvent.change(screen.getByLabelText("Full name"), { target: { value: "Amit Test" } });
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "amit@example.test" } });
    fireEvent.change(screen.getByLabelText("Phone number"), { target: { value: "9000000000" } });
    fireEvent.click(screen.getByRole("button", { name: /Continue to secure checkout/i }));

    await waitFor(() => expect(openRazorpayCheckout).toHaveBeenCalledTimes(1));
    const orderCall = vi.mocked(fetch).mock.calls.find(([url]) => String(url).endsWith("/payments/razorpay/order"));
    expect(JSON.parse(orderCall![1]!.body as string)).toMatchObject({
      reference_id: "lead-1",
      offer_code: "personal_coaching",
      email: "amit@example.test",
    });
    expect(openRazorpayCheckout).toHaveBeenCalledWith(expect.objectContaining({ amount: 2199900 }), "https://api.example");
  });

  it("keeps checkout unavailable until the admin price is configured", () => {
    configuredPrice = 0;
    render(<PersonalCoachingLanding />);

    expect(screen.getAllByText("Price unavailable").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /Get my Personal Strategist/i }).every((button) => button.hasAttribute("disabled"))).toBe(true);
  });
});
