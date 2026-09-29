// Shared, server-side validation for contact-form submissions.
// Used by both the Netlify function (production) and the local Express server (dev),
// because the browser's validation can be bypassed by posting to the endpoint directly.

export interface Inquiry {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

export type InquiryResult =
  | { ok: true; data: Inquiry }
  | { ok: false; error: string }
  | { ok: 'spam' };

const LIMITS: Record<keyof Inquiry, number> = {
  name: 100,
  email: 254,
  phone: 30,
  company: 120,
  projectType: 60,
  budget: 60,
  timeline: 60,
  message: 2000,
};

const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/;

const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

export function validateInquiry(raw: unknown): InquiryResult {
  const body = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;

  // Honeypot: real visitors never see or fill this field.
  if (str(body.website)) return { ok: 'spam' };

  const data = {} as Inquiry;
  for (const key of Object.keys(LIMITS) as (keyof Inquiry)[]) {
    const value = str(body[key]);
    if (value.length > LIMITS[key]) return { ok: false, error: `${key} is too long` };
    data[key] = value;
  }

  if (data.name.length < 2) return { ok: false, error: 'Name is required' };
  if (!EMAIL_RE.test(data.email)) return { ok: false, error: 'A valid email address is required' };
  if (!data.projectType) return { ok: false, error: 'Project type is required' };
  if (data.message.length < 20) return { ok: false, error: 'Project details must be at least 20 characters' };

  return { ok: true, data };
}

/** Escape HTML entities so submitted text can't inject markup into the email. */
export const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Single-line, length-capped value safe for an email header such as Subject. */
export const headerSafe = (s: string): string => s.replace(/[\r\n]+/g, ' ').trim().slice(0, 200);
