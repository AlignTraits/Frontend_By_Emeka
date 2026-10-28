/* Must match NIGERIAN_STATES in the backend (src/services/formsService.ts). */
export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe',
  'Zamfara',
] as const;

/** True for a Nigerian mobile number typed as 0801 234 5678, 801 234 5678 or +234 801 234 5678. */
export function isNigerianPhone(raw: string): boolean {
  let digits = raw.replace(/[^\d]/g, '');
  if (digits.startsWith('234')) digits = digits.slice(3);
  if (digits.startsWith('0')) digits = digits.slice(1);
  return /^[789]\d{9}$/.test(digits);
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* The WhatsApp enquiry group, used when a form cannot be sent. */
export const WHATSAPP_HELP = 'https://chat.whatsapp.com/LS7jfa4W5iFLP49rYoR9IX?mode=gi_t';

const TITLES = new Set(['mr', 'mrs', 'ms', 'miss', 'dr', 'prof', 'engr', 'chief', 'pastor', 'rev', 'alhaji', 'alhaja', 'barr', 'sir', 'hon']);

/** The name to greet someone by: "Mr Tunde Adeyemi" becomes "Tunde". */
export function greetingName(fullName: string): string {
  const words = fullName.trim().split(/\s+/).filter(Boolean);
  const first = words.find((w) => !TITLES.has(w.toLowerCase().replace(/\./g, '')));
  return first ?? words[0] ?? '';
}
