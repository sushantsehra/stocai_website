import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PromotionArchitectCheckout from "./PromotionArchitectCheckout";

const render = (amount: number | null, loading = false, message = "", callbackConfirmed = false, callbackLoading = false, callbackAmount: number | null = 49900) => renderToStaticMarkup(
  <PromotionArchitectCheckout
    amount={amount}
    callbackAmount={callbackAmount}
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
    const html = render(499900);
    expect(html).toContain("Build the case for your next promotion.");
    expect(html).toContain("Build your plan.");
    expect(html).toContain("At your pace.");
    expect(html).toContain("1:1 human coaching");
    expect(html).toContain("Get clarity.");
    expect(html).toContain("Plan your next move.");
    expect(html).toContain("Schedule a diagnostic call");
    expect(html).not.toContain('href="/diagnostic"');
    expect(html).toContain("Book a diagnostic call — ₹499");
  });

  it("places the supplied price and access action inside a closed pricing reveal", () => {
    const html = render(499900);
    expect(html).toContain("₹4,999");
    expect(html).toContain("₹15,000");
    expect(html).toContain("Invest ₹4,999 in my next promotion");
    expect(html).not.toMatch(/<details[^>]*\sopen/);
    expect(html).toMatch(/<form[^>]*>[\s\S]*<button type="submit"/);
    expect(html).toContain("One-time payment");
    expect(html).toContain("No questions asked.");
  });

  it("uses the payment service price instead of hardcoding a different charge", () => {
    expect(render(250000)).toContain("₹2,500");
    expect(render(250000)).toContain("Invest ₹2,500 in my next promotion");
    expect(render(250000)).not.toContain("₹4,999");
    expect(render(null)).toContain("At checkout");
    expect(render(null)).toContain("Invest in my next promotion");
    expect(render(null)).not.toContain("₹4,999");
  });

  it("retains the payment loading and error states", () => {
    expect(render(499900, true)).toMatch(/<button[^>]*disabled=""/);
    expect(render(499900, true)).toContain("Processing...");
    const html = render(499900, false, "Unable to start payment.");
    expect(html).toContain('role="status"');
    expect(html).toContain("Unable to start payment.");
  });

  it("shows the callback payment action and its loading state", () => {
    const html = render(499900, false, "", false, false, 9900);
    expect(html).toContain("Book a diagnostic call — ₹99");
    expect(html).not.toContain("Book a diagnostic call — ₹499");
    expect(render(499900, false, "", false, false, null)).toContain("Book a diagnostic call");
    expect(render(499900, false, "", false, true)).toContain("Opening payment...");
  });

  it("shows the confirmed callback state", () => {
    const html = render(499900, false, "", true);
    expect(html).toContain("Callback requested");
    expect(html).toContain("Payment confirmed. Expect a callback within the next 24 hours.");
    expect(html).not.toContain("Book a diagnostic call — ₹499");
  });
});
