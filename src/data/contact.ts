// Single source of truth for RudraAiHub's public contact channels so the
// phone number, WhatsApp number and prefilled WhatsApp message stay identical
// everywhere they appear (header, footer, contact section, contact modal).

export const PHONE_DISPLAY = '+91 96761 13883';
export const PHONE_TEL = '+919676113883';

/** WhatsApp business number in international format, no "+" or spaces. */
export const WHATSAPP_NUMBER = '919676113883';

/** Message pre-filled in the user's WhatsApp composer. */
export const WHATSAPP_MESSAGE = "Hi RudraAiHub, I'd like to discuss an AI project.";

/** Click-to-chat link used for every plain "WhatsApp" action on the site. */
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

/**
 * Build a wa.me link whose message body is a labelled summary of a submitted
 * form, so every contact / demo form delivers its details straight into the
 * RudraAiHub WhatsApp inbox. Empty fields are skipped.
 */
export const buildWhatsAppEnquiry = (
  title: string,
  fields: Array<[label: string, value: string | undefined | null]>,
): string => {
  const body = fields
    .filter(([, value]) => value != null && String(value).trim() !== '')
    .map(([label, value]) => `${label}: ${String(value).trim()}`)
    .join('\n');
  const message = body ? `${title}\n\n${body}` : title;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
