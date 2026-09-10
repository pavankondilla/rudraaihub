import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/rudraData';
import { ServiceItem } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { ServicesShowcase, renderServiceIcon } from './ServicesShowcase';
import { ArrowRight, Check, X, Sparkles } from 'lucide-react';

interface WhatWeDoProps {
  onOpenBookDemo: () => void;
}

export const WhatWeDo: React.FC<WhatWeDoProps> = ({ onOpenBookDemo }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const renderIcon = (iconName: string) => renderServiceIcon(iconName, 'w-7 h-7 text-blue-600');

  return (
    <section id="services" className="py-24 bg-[#F8FAFC] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Matches Image */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3" delay={80}>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full inline-block">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            What We Do
          </h2>
          <p className="text-lg text-slate-600 font-medium">
            We build smart AI solutions that drive growth and efficiency — and yes, we design premium websites for you too.
          </p>
        </ScrollReveal>
      </div>

      {/* Full-bleed scroll-linked showcase — breaks out of the max-w-7xl
          container so the pinned row can span the whole viewport width */}
      <ServicesShowcase services={SERVICES_DATA} onSelect={setSelectedService} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bottom Callout in What We Do Section */}
        <ScrollReveal className="mt-16 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-blue-900/50" delay={140}>
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Tailored AI Engineering</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold">Need a Custom Hybrid Solution?</h4>
            <p className="text-sm text-slate-300 max-w-xl">
              We combine AI Automations with custom SaaS architecture & APIs for bespoke enterprise workflows.
            </p>
          </div>

          <button
            onClick={onOpenBookDemo}
            className="px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 flex-shrink-0 transition-all flex items-center space-x-2"
          >
            <span>Consult an AI Architect</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-slate-200">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                {renderIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  RudraAiHub Service Overview
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-slate-700 text-base leading-relaxed mb-6 font-normal">
              {selectedService.fullDesc}
            </p>

            {/* Key Features */}
            <div className="mb-6 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Features & Capabilities</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-800 font-medium">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ideal For */}
            <div className="mb-6 bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-xs text-blue-900">
              <strong className="block font-bold text-blue-950 mb-1">Target Audience & Industry Fit:</strong>
              {selectedService.idealFor}
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technologies & Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.techStack.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedService(null);
                  onOpenBookDemo();
                }}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all flex items-center space-x-2"
              >
                <span>Request {selectedService.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
