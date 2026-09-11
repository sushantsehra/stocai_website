"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { trackPromotionJourneyEvent } from "@/lib/analytics/events";
import { readStoDiagnosticContext } from "@/lib/diagnosticContext";
import env from "@/utils/env";

type PromotionFlowSnapshot = {
  currentStep: string;
  answers: Record<string, string>;
};

export function usePromotionFlowTracking({ currentStep, answers }: PromotionFlowSnapshot) {
  const [session, setSession] = useState<{ id: string; token: string } | null>(null);
  const startedTrackedRef = useRef(false);
  const completedTrackedRef = useRef(false);
  const viewedStepsRef = useRef(new Set<string>());

  useEffect(() => {
    const context = readStoDiagnosticContext();
    if (context.promotionFlowSessionId && context.promotionFlowToken) {
      setSession({ id: context.promotionFlowSessionId, token: context.promotionFlowToken });
    }
  }, []);

  useEffect(() => {
    if (startedTrackedRef.current) return;
    startedTrackedRef.current = true;
    trackPromotionJourneyEvent("promotion_flow_started", {
      source: readStoDiagnosticContext().source || "promotion_flow",
      current_step: currentStep,
      promotion_flow_session_id: session?.id,
      ...answers,
    });
  }, [answers, currentStep, session?.id]);

  useEffect(() => {
    const viewedKey = `${currentStep}:${JSON.stringify(answers)}`;
    if (viewedStepsRef.current.has(viewedKey)) return;
    viewedStepsRef.current.add(viewedKey);
    trackPromotionJourneyEvent("promotion_flow_step_viewed", {
      source: readStoDiagnosticContext().source || "promotion_flow",
      current_step: currentStep,
      promotion_flow_session_id: session?.id,
      ...answers,
    });
  }, [answers, currentStep, session?.id]);

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
    completeFlow: useCallback(() => {
      if (!completedTrackedRef.current) {
        completedTrackedRef.current = true;
        trackPromotionJourneyEvent("promotion_flow_completed", {
          source: readStoDiagnosticContext().source || "promotion_flow",
          current_step: currentStep,
          promotion_flow_session_id: session?.id,
          ...answers,
        });
      }
      return updateSession("completed");
    }, [answers, currentStep, session?.id, updateSession]),
  };
}
