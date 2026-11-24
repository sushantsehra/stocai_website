"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { trackPromotionJourneyEvent } from "@/lib/analytics/events";
import { readStoDiagnosticContext, type StoDiagnosticContext } from "@/lib/diagnosticContext";
import { endFlowVisit, getOrCreateFlowRevisionId, retryFlowProgress, saveFlowProgress, trackFlowOnce, type FlowSession, type FlowSnapshot } from "@/lib/promotionFlowProgress";
import env from "@/utils/env";
import { getPromotionFlowSessionId, promotionFlowScreenProperties, type PromotionFlowScreenId } from "@/lib/analytics/promotionFlowContext";

export function usePromotionFlowTracking({ currentStep, answers, screenId }: FlowSnapshot & { screenId: PromotionFlowScreenId }) {
  const [context, setContext] = useState<(StoDiagnosticContext & { analyticsSessionId: string; revisionId?: string }) | null>(null);
  const lastViewed = useRef<string | null>(null);
  const answersKey = JSON.stringify(answers);
  const snapshot = useMemo<FlowSnapshot>(() => ({ currentStep, answers: JSON.parse(answersKey) }), [currentStep, answersKey]);
  const session = useMemo<FlowSession | null>(() => context?.promotionFlowSessionId && context.promotionFlowToken ? {
    id: context.promotionFlowSessionId, token: context.promotionFlowToken, source: context.source || "promotion_flow",
    revisionId: context.revisionId || getOrCreateFlowRevisionId(context.promotionFlowSessionId),
  } : null, [context]);

  useEffect(() => {
    const latest = readStoDiagnosticContext();
    setContext({
      ...latest,
      analyticsSessionId: getPromotionFlowSessionId(),
      revisionId: latest.promotionFlowSessionId ? getOrCreateFlowRevisionId(latest.promotionFlowSessionId) : undefined,
    });
  }, []);

  useEffect(() => {
    if (!context?.promotionFlowSessionId) return;
    const sessionId = context.promotionFlowSessionId;
    const leave = () => endFlowVisit(sessionId);
    const returnToCachedPage = (event: PageTransitionEvent) => {
      if (event.persisted) setContext((current) => current ? { ...current, revisionId: getOrCreateFlowRevisionId(sessionId) } : current);
    };
    window.addEventListener("pagehide", leave);
    window.addEventListener("pageshow", returnToCachedPage);
    return () => {
      window.removeEventListener("pagehide", leave);
      window.removeEventListener("pageshow", returnToCachedPage);
    };
  }, [context?.promotionFlowSessionId]);

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
    // Checkout records its terminal write through completeFlow. Sending an
    // in-progress snapshot here would misclassify the checkout remount as a revisit.
    if (!session || screenId === "checkout") return;
    void saveFlowProgress(env.apiUrl, session, snapshot);
  }, [screenId, session, snapshot]);

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
        revisionId: getOrCreateFlowRevisionId(latest.promotionFlowSessionId),
      } : null);
      return activeSession ? saveFlowProgress(env.apiUrl, activeSession, snapshot, "completed") : Promise.resolve();
    }, [context, eventProperties, session, snapshot]),
  };
}
