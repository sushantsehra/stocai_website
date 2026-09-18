"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { trackPromotionJourneyEvent } from "@/lib/analytics/events";
import { readStoDiagnosticContext, type StoDiagnosticContext } from "@/lib/diagnosticContext";
import { retryFlowProgress, saveFlowProgress, trackFlowOnce, type FlowSession, type FlowSnapshot } from "@/lib/promotionFlowProgress";
import env from "@/utils/env";

export function usePromotionFlowTracking({ currentStep, answers }: FlowSnapshot) {
  const [context, setContext] = useState<StoDiagnosticContext | null>(null);
  const viewedSteps = useRef(new Set<string>());
  const answersKey = JSON.stringify(answers);
  const snapshot = useMemo<FlowSnapshot>(() => ({ currentStep, answers: JSON.parse(answersKey) }), [currentStep, answersKey]);
  const session = useMemo<FlowSession | null>(() => context?.promotionFlowSessionId && context.promotionFlowToken ? {
    id: context.promotionFlowSessionId, token: context.promotionFlowToken, source: context.source || "promotion_flow",
  } : null, [context]);

  useEffect(() => { setContext(readStoDiagnosticContext()); }, []);

  const eventProperties = useMemo(() => ({
    source: context?.source || "promotion_flow",
    current_step: currentStep,
    promotion_flow_session_id: context?.promotionFlowSessionId,
    ...snapshot.answers,
  }), [context, currentStep, snapshot]);

  useEffect(() => {
    if (!context) return;
    trackFlowOnce(context.promotionFlowSessionId || "anonymous", "started", () => trackPromotionJourneyEvent("promotion_flow_started", eventProperties));
    const viewedKey = JSON.stringify(eventProperties);
    if (!viewedSteps.current.has(viewedKey)) {
      viewedSteps.current.add(viewedKey);
      trackPromotionJourneyEvent("promotion_flow_step_viewed", eventProperties);
    }
  }, [context, eventProperties]);

  useEffect(() => {
    if (!session) return;
    void saveFlowProgress(env.apiUrl, session, snapshot);
  }, [session, snapshot]);

  useEffect(() => {
    if (!session) return;
    const retry = () => { void retryFlowProgress(env.apiUrl, session); };
    window.addEventListener("online", retry);
    return () => window.removeEventListener("online", retry);
  }, [session]);

  return {
    completeFlow: useCallback(() => {
      const latest = context || readStoDiagnosticContext();
      trackFlowOnce(latest.promotionFlowSessionId || "anonymous", "completedEvent", () => trackPromotionJourneyEvent("promotion_flow_completed", {
        ...eventProperties, source: latest.source || eventProperties.source, promotion_flow_session_id: latest.promotionFlowSessionId,
      }));
      const activeSession = session || (latest.promotionFlowSessionId && latest.promotionFlowToken ? {
        id: latest.promotionFlowSessionId, token: latest.promotionFlowToken, source: latest.source || "promotion_flow",
      } : null);
      return activeSession ? saveFlowProgress(env.apiUrl, activeSession, snapshot, "completed") : Promise.resolve();
    }, [context, eventProperties, session, snapshot]),
  };
}
