import { trackPromotionJourneyEvent } from "./analytics/events";

export type PromotionFlowStep = "prime_suspect" | "truth" | "principle" | "honest_choice" | "consequence" | "offer";
export type FlowSnapshot = { currentStep: PromotionFlowStep; answers: Record<string, string> };
export type FlowSession = { id: string; token: string; source: string };
type Update = { status: "in_progress" | "completed"; current_step: PromotionFlowStep; answers_json: Record<string, string> };
type StoredProgress = { started?: boolean; completedEvent?: boolean; pending?: Update; saved?: Update };

const queues = new Map<string, Promise<void>>();
const memory = new Map<string, StoredProgress>();
const key = (id: string) => `promotionFlowProgress:${id}`;

function read(id: string): StoredProgress {
  try { return JSON.parse(window.sessionStorage.getItem(key(id)) || "null") || memory.get(id) || {}; }
  catch { return memory.get(id) || {}; }
}
function write(id: string, progress: StoredProgress) {
  memory.set(id, progress);
  try { window.sessionStorage.setItem(key(id), JSON.stringify(progress)); }
  catch { /* In-memory queue still works when browser storage is unavailable. */ }
}

export function trackFlowOnce(sessionId: string, kind: "started" | "completedEvent", track: () => void) {
  const state = read(sessionId);
  if (state[kind]) return;
  write(sessionId, { ...state, [kind]: true });
  track();
}

async function send(apiUrl: string, session: FlowSession, payload: Update) {
  let failure = "network_error";
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(`${apiUrl}/promotion-flow-sessions/${encodeURIComponent(session.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Accept: "application/json", "X-Promotion-Flow-Token": session.token },
        body: JSON.stringify(payload),
        keepalive: true,
        signal: controller.signal,
      });
      if (response.ok) {
        const state = read(session.id);
        write(session.id, { ...state, saved: payload, pending: JSON.stringify(state.pending) === JSON.stringify(payload) ? undefined : state.pending });
        return;
      }
      failure = `http_${response.status}`;
      if (response.status < 500 && response.status !== 429) break;
    } catch { failure = controller.signal.aborted ? "timeout" : "network_error"; }
    finally { clearTimeout(timer); }
    if (attempt === 0) await new Promise((resolve) => setTimeout(resolve, 300));
  }
  // Keep the pending payload for a subsequent mount or an online event. Never log tokens/PII.
  console.error("Promotion flow save failed", { current_step: payload.current_step, reason: failure });
  trackPromotionJourneyEvent("promotion_flow_save_failed", { source: session.source, promotion_flow_session_id: session.id, current_step: payload.current_step, reason: failure });
}

export function saveFlowProgress(apiUrl: string, session: FlowSession, snapshot: FlowSnapshot, status: Update["status"] = "in_progress") {
  const state = read(session.id);
  const payload: Update = {
    status: state.pending?.status === "completed" || state.saved?.status === "completed" ? "completed" : status,
    current_step: snapshot.currentStep,
    answers_json: snapshot.answers,
  };
  const active = queues.get(session.id);
  if (JSON.stringify(payload) === JSON.stringify(state.pending) && active) return active;
  if (!state.pending && JSON.stringify(payload) === JSON.stringify(state.saved)) return Promise.resolve();
  write(session.id, { ...state, pending: payload });
  const task = (active || Promise.resolve()).then(() => send(apiUrl, session, payload));
  queues.set(session.id, task);
  void task.finally(() => { if (queues.get(session.id) === task) queues.delete(session.id); });
  return task;
}

export function retryFlowProgress(apiUrl: string, session: FlowSession) {
  const pending = read(session.id).pending;
  if (!pending) return Promise.resolve();
  return saveFlowProgress(apiUrl, session, { currentStep: pending.current_step, answers: pending.answers_json }, pending.status);
}
