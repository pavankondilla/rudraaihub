import React, { useState } from 'react';
import { GalaxyIntro } from './components/GalaxyIntro';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhatWeDo } from './components/WhatWeDo';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookDemoModal } from './components/BookDemoModal';
import { ContactModal } from './components/ContactModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';

export default function App() {
  const [bookDemoOpen, setBookDemoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F2C] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-blue-600 selection:text-white">
      {/* One-time galaxy entry animation (session-gated) */}
      <GalaxyIntro />

      {/* Navigation Bar */}
      <Header
        onOpenBookDemo={() => setBookDemoOpen(true)}
        onOpenContact={() => scrollToSection('contact')}
        onOpenEstimator={() => scrollToSection('contact')}
      />

      {/* Hero Section */}
      <Hero
        onOpenBookDemo={() => setBookDemoOpen(true)}
        onExploreServices={() => scrollToSection('services')}
      />

      {/* What We Do Section (Light Theme matching image) */}
      <WhatWeDo
        onOpenBookDemo={() => setBookDemoOpen(true)}
      />

      {/* Why Choose RudraAiHub Section (Dark Theme matching image) */}
      <WhyChooseUs />

      {/* Detailed Inline Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <BookDemoModal
        isOpen={bookDemoOpen}
        onClose={() => setBookDemoOpen(false)}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      {/* Persistent floating WhatsApp chat button */}
      <WhatsAppFloat />
    </div>
  );
}
