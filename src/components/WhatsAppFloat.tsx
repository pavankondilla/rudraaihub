import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { WHATSAPP_URL, PHONE_DISPLAY } from '../data/contact';

/** Official WhatsApp glyph so the button is instantly recognisable. */
const WhatsAppGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
    <path d="M16.004 0h-.008C7.174 0 .001 7.174.001 16c0 3.5 1.128 6.744 3.045 9.377L1.05 31.32l6.148-1.966A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.826 32 16S24.826 0 16.004 0Zm9.318 22.594c-.386 1.09-1.918 1.994-3.14 2.258-.836.178-1.928.32-5.604-1.204-4.7-1.948-7.726-6.724-7.962-7.034-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.166-3.424 1.636-3.904.386-.394.836-.574 1.36-.574.17 0 .322.008.46.014.44.02.66.046.95.74.36.87 1.24 3.166 1.346 3.396.108.23.216.542.06.852-.146.32-.274.46-.504.726-.23.266-.438.47-.668.756-.21.25-.448.518-.184.966.264.44 1.174 1.936 2.522 3.136 1.74 1.55 3.174 2.03 3.67 2.24.37.154.81.118 1.08-.17.342-.37.764-.984 1.194-1.59.306-.434.692-.488 1.098-.336.414.144 2.63 1.24 3.08 1.464.45.226.75.336.86.526.108.19.108 1.09-.278 2.18Z" />
  </svg>
);

/**
 * Floating WhatsApp button pinned to the bottom-right of every page. Opens a
 * pre-filled chat to the RudraAiHub number. A small tooltip bubble appears
 * shortly after load and can be dismissed.
 */
export const WhatsAppFloat: React.FC = () => {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem('wa-bubble-dismissed') === '1';
    } catch {
      dismissed = false;
    }
    if (dismissed) return;
    const timer = window.setTimeout(() => setShowBubble(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  const dismissBubble = () => {
    setShowBubble(false);
    try {
      sessionStorage.setItem('wa-bubble-dismissed', '1');
    } catch {
      /* ignore storage failures */
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 print:hidden">
      {showBubble && (
        <div className="relative max-w-[230px] rounded-2xl rounded-br-sm bg-white text-slate-800 shadow-2xl shadow-black/30 px-4 py-3 text-xs font-medium animate-fadeIn">
          <button
            onClick={dismissBubble}
            aria-label="Dismiss WhatsApp message"
            className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-md hover:bg-slate-700 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="font-bold text-slate-900">RudraAiHub Support</p>
          <p className="mt-1 text-slate-600 leading-relaxed">
            Hi! 👋 Message us on WhatsApp — we usually reply within minutes.
          </p>
        </div>
      )}

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with RudraAiHub on WhatsApp at ${PHONE_DISPLAY}`}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-900/40 hover:scale-105 active:scale-95 transition-transform"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-70 animate-ping" />
        <WhatsAppGlyph className="relative w-7 h-7" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shadow-lg">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};
