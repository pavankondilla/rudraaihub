import React from 'react';
import logoSrc from '../../assets/logo/rudraaihub.png';
import { Sparkles, Phone, Mail, MapPin, Linkedin, Facebook, Twitter, Instagram, MessageSquare } from 'lucide-react';
import { Starfield } from './Starfield';
import { WHATSAPP_URL, PHONE_TEL, PHONE_DISPLAY } from '../data/contact';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-[#0A0F2C] text-slate-300 border-t border-slate-800 pt-16 pb-12">
      {/* Interactive twinkling starfield */}
      <Starfield density={0.00007} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand Info (Matching Image) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-2xl overflow-hidden flex items-center justify-center shadow-lg">
                <img
                  src={logoSrc}
                  alt="RudraAiHub logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  Rudra<span className="text-blue-500">AiHub</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  — From Idea to AI Business —
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering startups, agencies, and enterprises with custom AI Automations, SaaS Platforms, API Integrations, and Strategic AI Consulting.
            </p>
          </div>

          {/* Col 2: Quick Links (Matching Image) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li>
                <button onClick={() => scrollToSection('home')} className="hover:text-blue-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-blue-400 transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('solutions')} className="hover:text-blue-400 transition-colors">
                  Solutions
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('why-us')} className="hover:text-blue-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Us (Matching Image) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              </li>
              <li className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors">
                <MessageSquare className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  WhatsApp Chat
                </a>
              </li>
              <li className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <a href="mailto:info@rudraaihub.com">info@rudraaihub.com</a>
              </li>
              <li className="flex items-center space-x-3 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>Hyderabad, India</span>
              </li>
            </ul>

            {/* Follow Us Social Icons (Matching Image) */}
            <div className="pt-4">
              <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                Follow Us
              </h5>
              <div className="flex items-center space-x-3">
                <a href="#linkedin" className="p-2 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#facebook" className="p-2 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#twitter" className="p-2 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#instagram" className="p-2 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-xs text-slate-500 font-medium">
          © 2026 RudraAiHub. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
