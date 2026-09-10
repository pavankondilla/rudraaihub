// Single source of truth for RudraAiHub's public contact channels so the
// phone number, WhatsApp number and prefilled WhatsApp message stay identical
// everywhere they appear (header, footer, contact section, contact modal).

export const PHONE_DISPLAY = '+91 97037 00576';
export const PHONE_TEL = '+919703700576';

/** WhatsApp business number in international format, no "+" or spaces. */
export const WHATSAPP_NUMBER = '919703700576';

/** Message pre-filled in the user's WhatsApp composer. */
export const WHATSAPP_MESSAGE = "Hi RudraAiHub, I'd like to discuss an AI project.";

/** Click-to-chat link used for every "WhatsApp" action on the site. */
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
