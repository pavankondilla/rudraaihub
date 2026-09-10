import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import { WHATSAPP_URL, PHONE_TEL, PHONE_DISPLAY, buildWhatsAppEnquiry } from '../data/contact';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const enquiryLink = () =>
    buildWhatsAppEnquiry('New message — rudraaihub.com', [
      ['Name', formData.name],
      ['Email', formData.email],
      ['Phone', formData.phone],
      ['Message', formData.message],
    ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(enquiryLink(), '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0A0F2C] border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <MessageSquare className="w-4 h-4" />
              <span>Let's Talk — RudraAiHub</span>
            </div>

            <h3 className="text-2xl font-extrabold mb-1">
              Start Your AI Project
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Send us a message and we will respond within 24 hours.
            </p>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <a href={`tel:${PHONE_TEL}`} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 hover:border-slate-700 transition-colors flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>{PHONE_DISPLAY}</span>
              </a>
              <a href="mailto:info@rudraaihub.com" className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 hover:border-slate-700 transition-colors flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span className="truncate">info@rudraaihub.com</span>
              </a>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 bg-emerald-600/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/25 transition-colors p-2.5 rounded-xl text-[11px] font-bold flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Chat with us on WhatsApp</span>
            </a>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-white placeholder-slate-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-white placeholder-slate-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-white placeholder-slate-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Message / Project Details *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your automation or AI product requirements..."
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-white placeholder-slate-500 outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Opening WhatsApp…</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
              Thank you <strong className="text-white">{formData.name}</strong>. Your message has opened in WhatsApp — press send to reach the RudraAiHub team. If nothing opened, tap the button below.
            </p>

            <a
              href={enquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send on WhatsApp</span>
            </a>

            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="block mx-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
