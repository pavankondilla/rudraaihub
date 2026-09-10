import React, { useState } from 'react';
import { Sparkles, Menu, X, ChevronRight, Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import logoSrc from '../../assets/logo/rudraaihub.png';
import { WHATSAPP_URL, PHONE_TEL, PHONE_DISPLAY } from '../data/contact';

interface HeaderProps {
  onOpenBookDemo: () => void;
  onOpenContact: () => void;
  onOpenEstimator: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBookDemo,
  onOpenContact,
  onOpenEstimator,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A0F2C]/95 backdrop-blur-md border-b border-slate-800/80 transition-all">
      {/* Top micro bar for quick contact info */}
      <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto px-6 py-1.5 text-xs text-slate-400 border-b border-slate-800/40">
        <div className="flex items-center space-x-6">
          <span className="flex items-center space-x-1.5 hover:text-blue-400 transition-colors">
            <Phone className="w-3.5 h-3.5 text-blue-500" />
            <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
          </span>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 hover:text-emerald-400 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
            <span>WhatsApp</span>
          </a>
          <span className="flex items-center space-x-1.5 hover:text-blue-400 transition-colors">
            <Mail className="w-3.5 h-3.5 text-blue-500" />
            <a href="mailto:info@rudraaihub.com">info@rudraaihub.com</a>
          </span>
          <span className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-500" />
            <span>Hyderabad, India</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-blue-400 hover:text-blue-300 font-medium flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3" />
            <span>Interactive Contact & Quote</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo - Matching exact image identity */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} 
          className="flex items-center space-x-3 group"
        >
          {/* Logo with white background for better visibility */}
          <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center shadow-lg shadow-slate-900/10 transition-all group-hover:border-blue-400">
            <img
              src={logoSrc}
              alt="RudraAiHub logo"
              className="w-10 h-10 object-contain"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center space-x-1">
              <span className="font-extrabold text-base sm:text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">
                Rudra<span className="text-blue-500">AiHub</span>
              </span>
            </div>
            <div className="hidden sm:flex items-center space-x-1 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              <span className="w-2 h-[1px] bg-blue-500"></span>
              <span>From Idea to Ai Business</span>
              <span className="w-2 h-[1px] bg-blue-500"></span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <button 
            onClick={() => scrollToSection('home')}
            className="hover:text-white transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="hover:text-white transition-colors"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('solutions')}
            className="hover:text-white transition-colors"
          >
            Solutions
          </button>
          <button 
            onClick={() => scrollToSection('why-us')}
            className="hover:text-white transition-colors"
          >
            About Us
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="hover:text-white transition-colors"
          >
            Contact Now
          </button>
        </nav>

        {/* Action CTAs */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={() => scrollToSection('contact')}
            className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 transition-all"
          >
            Get Custom Quote
          </button>
          
          <button
            onClick={onOpenBookDemo}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all flex items-center space-x-2"
          >
            <span>Book a Demo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center space-x-3">
          <button
            onClick={onOpenBookDemo}
            className="px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500"
          >
            Book Demo
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0F2C] border-b border-slate-800 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 font-medium text-slate-200">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-left py-2 hover:text-blue-400"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-left py-2 hover:text-blue-400"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('solutions')}
              className="text-left py-2 hover:text-blue-400"
            >
              Solutions
            </button>
            <button 
              onClick={() => scrollToSection('why-us')}
              className="text-left py-2 hover:text-blue-400"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-left py-2 hover:text-blue-400"
            >
              Contact
            </button>
          </nav>
          
          <div className="pt-4 border-t border-slate-800 flex flex-col space-y-3">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenEstimator(); }}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Interactive AI Estimator</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBookDemo(); }}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md flex items-center justify-center space-x-2"
            >
              <span>Book a Demo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
