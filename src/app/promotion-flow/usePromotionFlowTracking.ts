"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { trackPromotionJourneyEvent } from "@/lib/analytics/events";
import { readStoDiagnosticContext, type StoDiagnosticContext } from "@/lib/diagnosticContext";
import { retryFlowProgress, saveFlowProgress, trackFlowOnce, type FlowSession, type FlowSnapshot } from "@/lib/promotionFlowProgress";
import env from "@/utils/env";
import { getPromotionFlowSessionId, promotionFlowScreenProperties, type PromotionFlowScreenId } from "@/lib/analytics/promotionFlowContext";

export function usePromotionFlowTracking({ currentStep, answers, screenId }: FlowSnapshot & { screenId: PromotionFlowScreenId }) {
  const [context, setContext] = useState<(StoDiagnosticContext & { analyticsSessionId: string }) | null>(null);
  const lastViewed = useRef<string | null>(null);
  const answersKey = JSON.stringify(answers);
  const snapshot = useMemo<FlowSnapshot>(() => ({ currentStep, answers: JSON.parse(answersKey) }), [currentStep, answersKey]);
  const session = useMemo<FlowSession | null>(() => context?.promotionFlowSessionId && context.promotionFlowToken ? {
    id: context.promotionFlowSessionId, token: context.promotionFlowToken, source: context.source || "promotion_flow",
  } : null, [context]);

  useEffect(() => { setContext({ ...readStoDiagnosticContext(), analyticsSessionId: getPromotionFlowSessionId() }); }, []);

  const eventProperties = useMemo(() => ({
    ...promotionFlowScreenProperties(screenId),
    source: context?.source || "promotion_flow",
    current_step: currentStep,
    promotion_flow_session_id: context?.analyticsSessionId,
    ...snapshot.answers,
  }), [context, currentStep, screenId, snapshot]);

  useEffect(() => {
    if (!context) return;
    trackFlowOnce(context.analyticsSessionId, "started", () => trackPromotionJourneyEvent("promotion_flow_started", eventProperties));
    const viewedKey = JSON.stringify(eventProperties);
    if (lastViewed.current !== viewedKey) {
      lastViewed.current = viewedKey;
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
      const analyticsSessionId = getPromotionFlowSessionId();
      trackFlowOnce(analyticsSessionId, "completedEvent", () => trackPromotionJourneyEvent("promotion_flow_completed", {
        ...eventProperties, source: latest.source || eventProperties.source, promotion_flow_session_id: analyticsSessionId,
      }));
      const activeSession = session || (latest.promotionFlowSessionId && latest.promotionFlowToken ? {
        id: latest.promotionFlowSessionId, token: latest.promotionFlowToken, source: latest.source || "promotion_flow",
      } : null);
      return activeSession ? saveFlowProgress(env.apiUrl, activeSession, snapshot, "completed") : Promise.resolve();
    }, [context, eventProperties, session, snapshot]),
  };
}
