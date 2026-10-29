import { checkEligibility } from "./utils";

// When a visitor fills in their grades and goes to pay before they have a
// password, the grades wait in this browser under this key. The paid check can
// only run once they are logged in (the server checks the plan on the logged in
// account), so the dashboard calls runPendingEligibilityCheck after login.
const KEY = "eligibilityPayload";

let running: Promise<boolean> | null = null;

const read = (): any | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const clear = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
};

export const hasPendingEligibilityCheck = () => !!read();

/**
 * Runs the waiting check for the logged in student. Returns true when results
 * were created. Grades typed in for a different email on this device are left
 * alone, so one student's grades never land on another student's account.
 */
export const runPendingEligibilityCheck = (userEmail?: string | null): Promise<boolean> => {
  if (running) return running;
  running = (async () => {
    const payload = read();
    if (!payload) return false;
    if (!payload.courseId || !Array.isArray(payload.exams)) {
      clear();
      return false;
    }
    const owner = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
    const me = (userEmail || "").trim().toLowerCase();
    if (owner && me && owner !== me) return false;

    try {
      await checkEligibility(payload);
      clear();
      return true;
    } catch (err: any) {
      // 403 means the payment is not confirmed yet: keep the grades and try
      // again on the next visit. Anything else will not fix itself.
      if (err?.response?.status !== 403) clear();
      return false;
    }
  })().finally(() => {
    running = null;
  });
  return running;
};
