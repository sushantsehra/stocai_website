const barrierIds = new Set(["office-politics", "biased-manager", "invisible-work", "zero-network", "executive-presence"]);
const newChoices = new Set(["good-work", "self-improvement", "surroundings", "leaving", "waiting"]);
const oldChoices = new Set(["change", "hope", "manager"]);

export type PromotionFlowResume = {
  updated?: boolean;
  promotion_flow_current_step?: string;
  promotion_flow_answers?: { barrier_id?: string; choice_id?: string };
};

export function buildPromotionFlowResumeUrl(fallback: string, data: PromotionFlowResume, origin: string) {
  const barrier = data.updated ? data.promotion_flow_answers?.barrier_id?.trim() : "";
  if (!barrier || !barrierIds.has(barrier)) return fallback;
  const destination = new URL(fallback, origin);
  if (destination.pathname !== "/promotion-flow") return fallback;
  if (data.promotion_flow_current_step === "prime_suspect") {
    for (const parameter of ["barrier", "stage", "choice"]) destination.searchParams.delete(parameter);
    return `${destination.pathname}${destination.search}${destination.hash}`;
  }
  destination.searchParams.set("barrier", barrier);
  const choice = data.promotion_flow_answers?.choice_id;
  const step = data.promotion_flow_current_step;
  const stages: Record<string, string> = { principle: "principle", honest_choice: "application", offer: "offer" };
  let stage = step && Object.hasOwn(stages, step) ? stages[step] : "";
  if (step === "consequence") stage = choice && newChoices.has(choice) ? "insight" : choice && oldChoices.has(choice) ? "consequence" : "principle";
  if (stage) destination.searchParams.set("stage", stage);
  else destination.searchParams.delete("stage");
  if (choice && (newChoices.has(choice) || oldChoices.has(choice)) && ["insight", "consequence", "offer"].includes(stage)) destination.searchParams.set("choice", choice);
  else destination.searchParams.delete("choice");
  return `${destination.pathname}${destination.search}${destination.hash}`;
}
