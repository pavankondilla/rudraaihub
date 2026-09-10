import React, { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Starfield } from './Starfield';
import { 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Bot, 
  BarChart3, 
  Database, 
  Settings,
  ArrowRight
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'AI Automations',
    budget: '$5k - $15k',
    message: ''
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const servicesList = [
    { id: 'AI Automations', label: 'AI Automations', icon: <Bot className="w-4 h-4" /> },
    { id: 'SaaS Platforms', label: 'SaaS Platforms', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'API Integrations', label: 'API Integrations', icon: <Database className="w-4 h-4" /> },
    { id: 'AI Consulting', label: 'AI Consulting & Strategy', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 bg-[#070B21] relative overflow-hidden text-white border-t border-slate-800/80">
      {/* Interactive twinkling starfield */}
      <Starfield density={0.00009} />

      {/* Background Radial Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 space-y-4" delay={80}>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get In Touch With RudraAiHub</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Ready to Build Your <span className="text-[#2563EB]">AI Business?</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed">
            Have a project in mind, need custom AI automations, or looking to integrate cloud SaaS solutions? Fill out the form below or reach us directly.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Guarantees (5 Cols) */}
          <ScrollReveal className="lg:col-span-5 space-y-8" delay={120} variant="card">
            
            <div className="bg-[#0A0F2C] border border-slate-800/90 rounded-3xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>

              <h3 className="text-2xl font-extrabold text-white mb-2 flex items-center space-x-2">
                <span>Contact Information</span>
              </h3>
              <p className="text-xs text-slate-300 mb-8 leading-relaxed">
                Our AI architects and automation experts are ready to turn your manual workflows into scalable digital assets.
              </p>

              <div className="space-y-6">
                
                {/* Phone */}
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Direct Phone & WhatsApp</span>
                    <a href="tel:+919703700576" className="text-base font-bold text-white hover:text-blue-400 transition-colors">
                      +91 97037 00576
                    </a>
                    <span className="block text-[11px] text-slate-400">Available Mon - Sat, 9:00 AM - 7:00 PM IST</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Inquiry</span>
                    <a href="mailto:info@rudraaihub.com" className="text-base font-bold text-white hover:text-blue-400 transition-colors">
                      info@rudraaihub.com
                    </a>
                    <span className="block text-[11px] text-slate-400">Response guaranteed within 24 hours</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">HQ Address</span>
                    <span className="text-base font-bold text-white block">
                      HITEC City, Hyderabad
                    </span>
                    <span className="block text-[11px] text-slate-400">Telangana, India - 500081</span>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Business Hours</span>
                    <span className="text-sm font-semibold text-white block">
                      Monday – Saturday: 9:00 AM – 7:00 PM IST
                    </span>
                    <span className="text-xs text-blue-400 font-mono">24/7 Priority Support for Enterprise Clients</span>
                  </div>
                </div>

              </div>

              {/* Security Banner */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center space-x-3 text-xs text-slate-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>Strict Non-Disclosure Agreement (NDA) & 100% Data Confidentiality guaranteed.</span>
              </div>

            </div>

          </ScrollReveal>

          {/* Right Column: Detailed Contact Form (7 Cols) */}
          <ScrollReveal className="lg:col-span-7" delay={160} variant="card">
            <div className="bg-[#0A0F2C] border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div>
                      <h3 className="text-2xl font-extrabold text-white">Send Us a Message</h3>
                      <p className="text-xs text-slate-400 mt-1">Tell us about your requirements for a customized AI response.</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-[11px] font-mono font-bold border border-blue-500/30">
                      Quick 24h Reply
                    </span>
                  </div>

                  {/* 1. Service Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      1. Select Primary Solution Required *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
                      {servicesList.map((srv) => (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: srv.id })}
                          className={`p-3 rounded-xl border text-xs font-semibold flex items-center space-x-2 transition-all text-left ${
                            formData.service === srv.id
                              ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span className={formData.service === srv.id ? 'text-white' : 'text-blue-400'}>
                            {srv.icon}
                          </span>
                          <span className="truncate">{srv.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-sm text-white placeholder-slate-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rahul@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-sm text-white placeholder-slate-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-sm text-white placeholder-slate-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Company / Startup Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Technologies"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-sm text-white placeholder-slate-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Estimated Project Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-sm text-white outline-none cursor-pointer"
                    >
                      <option value="Under $5k">Under $5,000 (Starter Automation)</option>
                      <option value="$5k - $15k">$5,000 – $15,000 (Standard AI Pipeline / SaaS)</option>
                      <option value="$15k - $50k">$15,000 – $50,000 (Full-Stack Enterprise Stack)</option>
                      <option value="$50k+">$50,000+ (Custom Multi-Tenant AI Infrastructure)</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Project Details / Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your current manual bottlenecks, workflows you want automated, or AI features you'd like to build..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-sm text-white placeholder-slate-500 outline-none resize-none transition-all"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-2xl font-black text-base bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 transition-all flex items-center justify-center space-x-3 group disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Processing Request...</span>
                      ) : (
                        <>
                          <span>Submit Contact Request</span>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-center text-slate-400">
                    🔒 We respect your privacy. No spam. Your information is strictly secure.
                  </p>

                </form>
              ) : (
                /* Success Confirmation State */
                <div className="text-center py-12 px-4 space-y-6 animate-fadeIn">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-3xl font-extrabold text-white">Thank You, {formData.name}!</h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Your project inquiry regarding <strong className="text-blue-400">{formData.service}</strong> has been successfully transmitted to our AI engineering team at RudraAiHub.
                    </p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-2 text-slate-300">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Target Email:</span>
                      <strong className="text-white">{formData.email}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Selected Category:</span>
                      <strong className="text-blue-400">{formData.service}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Estimated Budget:</span>
                      <strong className="text-emerald-400">{formData.budget}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400">
                    An engineer will review your project specs and email you a tailored technical roadmap within 24 hours.
                  </p>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        service: 'AI Automations',
                        budget: '$5k - $15k',
                        message: ''
                      });
                    }}
                    className="px-6 py-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white transition-all inline-flex items-center space-x-2"
                  >
                    <span>Send Another Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
