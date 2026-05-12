import { useCallback, useEffect, useState } from "react";
import posthog from "posthog-js";
import env from "@/utils/env";
import type { DiagnosticDoorId, Q1OptionId } from "@/data/stoConversation";
import { pushToDataLayer, trackBotEvent } from "./analytics";
import type { BotSessionResponse, BotStep } from "./types";

type UseBotSessionPersistenceArgs = {
  isEmbedded: boolean;
  waitlistId?: string;
  sessionActivated: boolean;
  sessionStartedAt: string | null;
  step: BotStep;
  status: "completed" | "in_progress";
  answers: Record<string, unknown>;
  result: Record<string, unknown>;
};

export const useBotSessionPersistence = ({
  isEmbedded,
  waitlistId,
  sessionActivated,
  sessionStartedAt,
  step,
  status,
  answers,
  result,
}: UseBotSessionPersistenceArgs) => {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (!isEmbedded || !waitlistId || !sessionActivated || sessionId || !sessionStartedAt) return;

    let isCancelled = false;

    const createSession = async () => {
      try {
        const response = await fetch(`${env.apiUrl}/waitlist-bot-sessions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            waitlist_id: waitlistId,
            flow_version: "v1",
            status: "in_progress",
            current_step: step,
            answers_json: answers,
            result_json: result,
            started_at: sessionStartedAt,
            completed_at: null,
          }),
        });

        const data = (await response.json().catch(() => ({}))) as Partial<BotSessionResponse> & {
          error?: string;
        };

        if (!response.ok || !data?.id) {
          throw new Error(data?.error || "Unable to create bot session.");
        }

        if (!isCancelled) {
          setSessionId(data.id);
        }
      } catch (error) {
        console.error("Failed to create waitlist bot session", error);
      }
    };

    void createSession();

    return () => {
      isCancelled = true;
    };
  }, [answers, isEmbedded, result, sessionActivated, sessionId, sessionStartedAt, step, waitlistId]);

  useEffect(() => {
    if (!sessionId || !sessionActivated) return;

    let isCancelled = false;

    const updateSession = async () => {
      try {
        const response = await fetch(`${env.apiUrl}/waitlist-bot-sessions/${sessionId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            status,
            current_step: step,
            answers_json: answers,
            result_json: result,
            completed_at: status === "completed" ? new Date().toISOString() : null,
          }),
        });

        if (!response.ok && !isCancelled) {
          const data = (await response.json().catch(() => ({}))) as { error?: string };
          throw new Error(data?.error || "Unable to update bot session.");
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Failed to update waitlist bot session", error);
        }
      }
    };

    void updateSession();

    return () => {
      isCancelled = true;
    };
  }, [answers, result, sessionActivated, sessionId, status, step]);

  return {
    resetSession: useCallback(() => setSessionId(null), []),
  };
};

type CtaConfig = {
  primary: {
    label: string;
    kind: "call" | "payment";
  };
  secondary?: {
    label: string;
    kind: "call" | "payment";
  };
} | null;

type UseStoPaymentArgs = {
  activeDoorCtas: CtaConfig;
  door: DiagnosticDoorId | null;
  q1: Q1OptionId | null;
  isEmbedded: boolean;
  source: string;
  whatsappHref: string;
  waitlistReferenceId?: string;
  paymentName: string;
  paymentEmail: string;
  paymentPhone: string;
  paymentCountryCode: string;
};

export const useStoPayment = ({
  activeDoorCtas,
  door,
  q1,
  isEmbedded,
  source,
  whatsappHref,
  waitlistReferenceId,
  paymentName,
  paymentEmail,
  paymentPhone,
  paymentCountryCode,
}: UseStoPaymentArgs) => {
  const [actionState, setActionState] = useState<"idle" | "loading" | "error">("idle");
  const [actionMessage, setActionMessage] = useState("");

  const createPaymentLink = useCallback(async () => {
    const trimmedPhone = paymentPhone.trim();
    const fullPhone = trimmedPhone.startsWith("+") ? trimmedPhone : `${paymentCountryCode}${trimmedPhone}`;

    const response = await fetch(`${env.apiUrl}/payments/razorpay/link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: paymentName || undefined,
        email: paymentEmail || undefined,
        phone: fullPhone,
        reference_id: waitlistReferenceId || `waitlist_${Date.now()}`,
        amount: 197000,
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error((data as { error?: string })?.error || "Unable to start payment.");
    }

    const shortUrl = (data as { short_url?: string; shortUrl?: string })?.short_url || (data as { short_url?: string; shortUrl?: string })?.shortUrl;
    if (!shortUrl) {
      throw new Error("Payment link was not returned.");
    }

    return shortUrl;
  }, [paymentCountryCode, paymentEmail, paymentName, paymentPhone, waitlistReferenceId]);

  const handlePaymentRedirect = useCallback(async () => {
    if (!waitlistReferenceId) {
      throw new Error("Waitlist record not found. Please restart from the waitlist form.");
    }

    if (!paymentPhone.trim()) {
      throw new Error("Phone number is missing. Please restart from the waitlist form.");
    }

    posthog.capture("waitlist_submit_attempt", {
      source,
    });
    pushToDataLayer({
      event: "waitlist_submit_attempt",
      source,
    });

    posthog.capture("waitlist_submitted", {
      source,
      payment_started: true,
    });
    pushToDataLayer({
      event: "waitlist_submitted",
      source,
      payment_started: true,
    });

    const shortUrl = await createPaymentLink();

    posthog.capture("payment_redirected", {
      source,
      amount: 197000,
    });
    pushToDataLayer({
      event: "payment_redirected",
      source,
      amount: 197000,
    });

    window.location.href = shortUrl;
  }, [createPaymentLink, paymentPhone, source, waitlistReferenceId]);

  const handlePaymentCta = useCallback(async () => {
    if (!door) return;
    setActionState("loading");
    setActionMessage("");

    try {
      trackBotEvent("sto_buy_clicked", { door, q1, placement: isEmbedded ? "diagnostic_route" : "floating_bot" });
      await handlePaymentRedirect();
    } catch (error) {
      setActionState("error");
      setActionMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }, [door, handlePaymentRedirect, isEmbedded, q1]);

  const handlePrimaryCta = useCallback(async () => {
    if (!door || !activeDoorCtas) return;

    if (activeDoorCtas.primary.kind === "call") {
      trackBotEvent("sto_call_clicked", {
        door,
        q1,
        placement: isEmbedded ? "diagnostic_route" : "floating_bot",
      });
      window.open(whatsappHref, "_blank", "noopener,noreferrer");
      return;
    }

    await handlePaymentCta();
  }, [activeDoorCtas, door, handlePaymentCta, isEmbedded, q1, whatsappHref]);

  return {
    actionState,
    actionMessage,
    handlePaymentCta,
    handlePrimaryCta,
    resetPaymentState: useCallback(() => {
      setActionState("idle");
      setActionMessage("");
    }, []),
  };
};
