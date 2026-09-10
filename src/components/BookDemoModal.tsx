import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Sparkles, Send, User, Mail, Building, Phone, MessageSquare } from 'lucide-react';
import { buildWhatsAppEnquiry } from '../data/contact';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceInterest: 'AI Automations',
    preferredTime: '10:00 AM - 12:00 PM',
    notes: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const enquiryLink = () =>
    buildWhatsAppEnquiry('Demo request — rudraaihub.com', [
      ['Name', formData.name],
      ['Email', formData.email],
      ['Phone', formData.phone],
      ['Company', formData.company],
      ['Interest', formData.serviceInterest],
      ['Preferred time', formData.preferredTime],
      ['Notes', formData.notes],
    ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(enquiryLink(), '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
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
              <Sparkles className="w-4 h-4" />
              <span>RudraAiHub Live Demo Session</span>
            </div>

            <h3 className="text-2xl font-extrabold mb-1">
              Book a 1-on-1 AI Demo
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Connect with an AI Architect in Hyderabad or via Google Meet.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-white placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Business Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rahul@company.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-white placeholder-slate-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-white placeholder-slate-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Company / Startup Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Acme Tech Solutions"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-white placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Primary Area of Interest</label>
                <select
                  value={formData.serviceInterest}
                  onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-white outline-none"
                >
                  <option value="AI Automations">AI Automations (RPA, Email & CRM Workflows)</option>
                  <option value="SaaS Solutions">Custom SaaS Development & Dashboards</option>
                  <option value="Integrations">API & System Integrations</option>
                  <option value="AI Consulting">Executive AI Consulting & Strategy</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Preferred Time Window</label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-white outline-none"
                >
                  <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM IST)</option>
                  <option value="02:00 PM - 05:00 PM">Afternoon (02:00 PM - 05:00 PM IST)</option>
                  <option value="06:00 PM - 09:00 PM">Evening (06:00 PM - 09:00 PM IST)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirm Demo Request</span>
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
              Thank you <strong className="text-white">{formData.name}</strong>. Your demo request has opened in WhatsApp — press send and our team at <strong className="text-blue-400">RudraAiHub</strong> will confirm a slot. If nothing opened, tap the button below.
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
              onClick={handleReset}
              className="block mx-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
