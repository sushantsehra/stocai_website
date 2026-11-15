import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PromotionArchitectCheckout from "./PromotionArchitectCheckout";

const render = (amount: number | null, loading = false, message = "", callbackConfirmed = false, callbackLoading = false) => renderToStaticMarkup(
  <PromotionArchitectCheckout
    amount={amount}
    loading={loading}
    message={message}
    onSubmit={() => {}}
    onCheckoutClick={() => {}}
    callbackLoading={callbackLoading}
    callbackMessage={callbackConfirmed ? "Payment confirmed. Expect a callback within the next 24 hours." : ""}
    callbackConfirmed={callbackConfirmed}
    onCallbackClick={() => {}}
  />,
);

describe("Promotion Architect checkout", () => {
  it("presents the digital and human support paths from the offer design", () => {
    const html = render(180000);
    expect(html).toContain("Build the case for your next promotion.");
    expect(html).toContain("Build your plan.");
    expect(html).toContain("At your pace.");
    expect(html).toContain("1:1 human coaching");
    expect(html).toContain("Get clarity.");
    expect(html).toContain("Plan your next move.");
    expect(html).toContain("Schedule a diagnostic call");
    expect(html).not.toContain('href="/diagnostic"');
    expect(html).toContain("Book a diagnostic call — ₹51");
  });

  it("places the supplied price and access action inside a closed pricing reveal", () => {
    const html = render(180000);
    expect(html).toContain("₹1,800");
    expect(html).toContain("₹15,000");
    expect(html).toContain("Show me what it costs");
    expect(html).not.toMatch(/<details[^>]*\sopen/);
    expect(html).toMatch(/<form[^>]*>[\s\S]*<button type="submit"/);
    expect(html).toContain("One-time payment");
    expect(html).toContain("No questions asked.");
  });

  it("uses the payment service price instead of hardcoding a different charge", () => {
    expect(render(250000)).toContain("₹2,500");
    expect(render(250000)).not.toContain("₹1,800");
    expect(render(null)).toContain("At checkout");
    expect(render(null)).not.toContain("₹1,800");
  });

  it("retains the payment loading and error states", () => {
    expect(render(180000, true)).toMatch(/<button[^>]*disabled=""/);
    expect(render(180000, true)).toContain("Processing...");
    const html = render(180000, false, "Unable to start payment.");
    expect(html).toContain('role="status"');
    expect(html).toContain("Unable to start payment.");
  });

  it("shows the callback payment action and its loading state", () => {
    const html = render(180000);
    expect(html).toContain("Book a diagnostic call — ₹51");
    expect(render(180000, false, "", false, true)).toContain("Opening payment...");
  });

  it("shows the confirmed callback state", () => {
    const html = render(180000, false, "", true);
    expect(html).toContain("Callback requested");
    expect(html).toContain("Payment confirmed. Expect a callback within the next 24 hours.");
    expect(html).not.toContain("Book a diagnostic call — ₹51");
  });
});
