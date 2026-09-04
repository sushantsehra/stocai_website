"use client";

import { useCallback, useEffect, useState } from "react";
import { readStoDiagnosticContext } from "@/lib/diagnosticContext";
import env from "@/utils/env";

type PromotionFlowSnapshot = {
  currentStep: string;
  answers: Record<string, string>;
};

export function usePromotionFlowTracking({ currentStep, answers }: PromotionFlowSnapshot) {
  const [session, setSession] = useState<{ id: string; token: string } | null>(null);

  useEffect(() => {
    const context = readStoDiagnosticContext();
    if (context.promotionFlowSessionId && context.promotionFlowToken) {
      setSession({ id: context.promotionFlowSessionId, token: context.promotionFlowToken });
    }
  }, []);

  const updateSession = useCallback(async (status: "in_progress" | "completed") => {
    if (!session) return;

    try {
      const response = await fetch(`${env.apiUrl}/promotion-flow-sessions/${session.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Promotion-Flow-Token": session.token,
        },
        body: JSON.stringify({
          status,
          current_step: currentStep,
          answers_json: answers,
        }),
        keepalive: true,
      });
      if (!response.ok) throw new Error(`Promotion flow update failed (${response.status}).`);
    } catch (error) {
      console.error("Failed to update promotion flow session", error);
    }
  }, [answers, currentStep, session]);

  useEffect(() => {
    void updateSession("in_progress");
  }, [updateSession]);

  return {
    completeFlow: useCallback(() => updateSession("completed"), [updateSession]),
  };
}
