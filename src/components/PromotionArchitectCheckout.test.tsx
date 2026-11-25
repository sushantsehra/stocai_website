import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PromotionArchitectCheckout from "./PromotionArchitectCheckout";

const render = (amount: number | null, loading = false, message = "", callbackConfirmed = false, callbackLoading = false, callbackAmount: number | null = 49900, personalCoachingAmount: number | null = 2199900) => renderToStaticMarkup(
  <PromotionArchitectCheckout
    amount={amount}
    callbackAmount={callbackAmount}
    personalCoachingAmount={personalCoachingAmount}
    loading={loading}
    message={message}
    onCheckoutClick={() => {}}
    callbackLoading={callbackLoading}
    callbackMessage={callbackConfirmed ? "Payment confirmed. Expect a callback within the next 24 hours." : ""}
    callbackConfirmed={callbackConfirmed}
    onCallbackClick={() => {}}
  />,
);

describe("Promotion Architect checkout", () => {
  it("presents the approved digital and 1:1 personal coaching offer copy", () => {
    const html = render(499900);
    expect(html).toContain("Build the case for your next promotion.");
    expect(html).toContain("Start with a plan. Choose how you want to move forward.");
    expect(html).toContain("Digital programme");
    expect(html).toContain("1:1 personal coaching");
    expect(html).toContain("A structured roadmap to turn your promotion goals into actionable priorities.");
    expect(html).toContain("Stakeholder Management, Personal Branding &amp; Networking Tools");
    expect(html).toContain("1:1 PERSONAL COACHING");
    expect(html).toContain("Personalised coaching");
    expect(html).toContain("Build your promotion strategy with your personal Corporate Strategist.");
    expect(html).toContain("Your personal promotion dossier");
    expect(html).not.toContain("Perfect your brand and promotion pitch");
    expect(html).toContain("Complete 1:1 personal coaching programme");
    expect(html).toContain("7 personalised coaching sessions");
    expect(html).toContain("₹21,999");
    expect(html).toContain("₹50,000");
    expect(html).not.toContain("TALK TO A STRATEGIST");
    expect(html).not.toContain("1:1 strategist conversation");
    expect(html).not.toContain('href="/diagnostic"');
    expect(html).toContain("First call for just ₹499");
  });

  it("presents the DIY path before the callback path", () => {
    const html = render(499900);

    expect(html.indexOf("Digital programme")).toBeLessThan(html.indexOf("1:1 personal coaching"));
    expect(html.indexOf("DIGITAL PROGRAMME")).toBeLessThan(html.indexOf("1:1 PERSONAL COACHING"));
  });

  it("shows the supplied price and a direct programme checkout action", () => {
    const html = render(499900);
    expect(html).toContain("₹4,999");
    expect(html).not.toContain("Invest ₹4,999 in my next promotion");
    expect(html).not.toContain("₹15,000");
    expect(html).not.toContain("<details");
    expect(html).toMatch(/<button type="button"[^>]*>GET PROMOTION ARCHITECT/);
    expect(html).toContain("GET PROMOTION ARCHITECT");
    expect(html).toContain("One-time payment. Instant programme access.");
    expect(html).toContain("No questions asked.");
  });

  it("uses the payment service price instead of hardcoding a different charge", () => {
    expect(render(250000)).toContain("₹2,500");
    expect(render(250000)).not.toContain("₹4,999");
    expect(render(null)).toContain("At checkout");
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
    expect(html).toContain("First call for just ₹99");
    expect(html).not.toContain("First call for just ₹499");
    expect(render(499900, false, "", false, false, null)).toContain("Book your diagnostic call");
    expect(render(499900, false, "", false, true)).toContain("Opening payment...");
  });

  it("shows the confirmed callback state", () => {
    const html = render(499900, false, "", true);
    expect(html).toContain("Callback requested");
    expect(html).toContain("Payment confirmed. Expect a callback within the next 24 hours.");
    expect(html).not.toContain("First call for just ₹499");
  });
});
