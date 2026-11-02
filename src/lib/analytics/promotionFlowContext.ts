import { readStoDiagnosticContext } from "../diagnosticContext";

// Analytics screen identities are independent of the backend's legacy step enum.
export const promotionFlowScreens = {
  prime_suspect: { step_number: 1, current_step: "prime_suspect" },
  truth: { step_number: 2, current_step: "truth" },
  solving: { step_number: 3, current_step: "principle" },
  insight: { step_number: 4, current_step: "consequence" },
  honest_choice: { step_number: 3, current_step: "honest_choice" },
  consequence: { step_number: 4, current_step: "consequence" },
  offer: { step_number: 5, current_step: "offer" },
  checkout: { step_number: 6, current_step: "offer" },
} as const;

export type PromotionFlowScreenId = keyof typeof promotionFlowScreens;
export type PromotionFlowDestination = PromotionFlowScreenId | "programme_payment" | "callback_payment";
const anonymousSessionKey = "promotionFlowAnalyticsSessionId";
let storageUnavailableSession: string | undefined;

export function getPromotionFlowSessionId(): string {
  const issuedId = readStoDiagnosticContext().promotionFlowSessionId;
  if (issuedId) return issuedId;
  try {
    const stored = window.sessionStorage.getItem(anonymousSessionKey);
    if (stored) return stored;
    const id = crypto.randomUUID();
    window.sessionStorage.setItem(anonymousSessionKey, id);
    return id;
  } catch {
    // Only in-memory correlation is possible if browser storage is unavailable.
    return storageUnavailableSession ||= crypto.randomUUID();
  }
}

export function promotionFlowScreenProperties(screenId: PromotionFlowScreenId) {
  return {
    screen_id: screenId, flow_version: "promotion-flow-v1", ...promotionFlowScreens[screenId],
    cta_id: "", cta_label: "", option_id: "", option_label: "",
    next_screen_id: "", next_step_number: null as number | null,
  };
}

export type PromotionFlowClick = {
  screenId: PromotionFlowScreenId;
  nextScreenId: PromotionFlowDestination;
  ctaId: string;
  ctaLabel: string;
  barrierId?: string;
  choiceId?: string;
  optionId?: string;
  optionLabel?: string;
};

export function promotionFlowClickProperties(input: PromotionFlowClick) {
  const context = readStoDiagnosticContext();
  const next = input.nextScreenId in promotionFlowScreens
    ? promotionFlowScreens[input.nextScreenId as PromotionFlowScreenId] : null;
  return {
    ...promotionFlowScreenProperties(input.screenId),
    source: context.source || "promotion_flow",
    promotion_flow_session_id: getPromotionFlowSessionId(),
    cta_id: input.ctaId,
    cta_label: input.ctaLabel,
    next_screen_id: input.nextScreenId,
    next_step_number: next?.step_number ?? null,
    barrier_id: input.barrierId ?? "",
    choice_id: input.choiceId ?? "",
    // Explicit empty values prevent GTM's data model retaining an earlier choice.
    option_id: input.optionId ?? "",
    option_label: input.optionLabel ?? "",
  };
}
