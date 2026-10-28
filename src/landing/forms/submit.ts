import api from '../../api/axios';

export type SubmitResult =
  | { ok: true }
  | { ok: false; kind: 'fields'; errors: Record<string, string> }
  | { ok: false; kind: 'busy' | 'failed' };

/** Sends a website form to the AlignTraits API (POST /forms/ambassador or /forms/pilot). */
export async function submitForm(path: '/forms/ambassador' | '/forms/pilot', body: unknown): Promise<SubmitResult> {
  try {
    await api.post(path, body);
    return { ok: true };
  } catch (err: unknown) {
    const res = (err as { response?: { status?: number; data?: { errors?: Record<string, string> } } })?.response;
    if (res?.status === 400 && res.data?.errors) return { ok: false, kind: 'fields', errors: res.data.errors };
    if (res?.status === 429) return { ok: false, kind: 'busy' };
    return { ok: false, kind: 'failed' };
  }
}

/** Moves focus to the first answer that needs fixing, after the errors have rendered. */
export function focusFirstProblem(form: HTMLFormElement | null) {
  requestAnimationFrame(() => {
    const bad = form?.querySelector<HTMLElement>('[aria-invalid="true"]');
    if (!bad) return;
    const target = bad.tagName === 'FIELDSET' ? bad.querySelector<HTMLElement>('input') : bad;
    bad.scrollIntoView({ block: 'center', behavior: 'smooth' });
    target?.focus({ preventScroll: true });
  });
}
