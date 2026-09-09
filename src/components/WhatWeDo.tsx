import React, { useMemo, useState } from 'react';
import { SERVICES_DATA } from '../data/rudraData';
import { ServiceItem } from '../types';
import { ScrollReveal } from './ScrollReveal';
import {
  Workflow,
  Box,
  GitFork,
  Lightbulb,
  Globe,
  ArrowRight,
  Check,
  X,
  Layers,
  ChevronRight,
  Sparkles,
  ArrowLeftRight
} from 'lucide-react';

interface WhatWeDoProps {
  onOpenBookDemo: () => void;
}

interface ServiceCardProps {
  service: ServiceItem;
  delay: number;
  extraClassName?: string;
  renderIcon: (iconName: string) => React.ReactNode;
  onSelect: (service: ServiceItem) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, delay, extraClassName = '', renderIcon, onSelect }) => (
  <ScrollReveal
    as="div"
    className={`bg-white rounded-2xl p-8 border border-slate-200/80 hover:border-blue-500/50 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer flex-shrink-0 w-[280px] sm:w-[320px] ${extraClassName}`}
    delay={delay}
    variant="card"
    onClick={() => onSelect(service)}
  >
    <div>
      {/* Icon Container with subtle blue light background matching image */}
      <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
        <div className="group-hover:text-white transition-colors">
          {renderIcon(service.iconName)}
        </div>
      </div>

      {/* Service Title */}
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
        {service.title}
      </h3>

      {/* Service Short Description */}
      <p className="text-sm text-slate-600 leading-relaxed mb-6">
        {service.shortDesc}
      </p>
    </div>

    {/* Action Button */}
    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
      <span>View Full Details</span>
      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </div>
  </ScrollReveal>
);

export const WhatWeDo: React.FC<WhatWeDoProps> = ({ onOpenBookDemo }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  // Duplicated once so the track can loop seamlessly at -50% translateX
  const marqueeServices = useMemo(() => [...SERVICES_DATA, ...SERVICES_DATA], []);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Workflow':
        return <Workflow className="w-7 h-7 text-blue-600" />;
      case 'Box':
        return <Box className="w-7 h-7 text-blue-600" />;
      case 'GitFork':
        return <GitFork className="w-7 h-7 text-blue-600" />;
      case 'Lightbulb':
        return <Lightbulb className="w-7 h-7 text-blue-600" />;
      case 'Globe':
        return <Globe className="w-7 h-7 text-blue-600" />;
      default:
        return <Layers className="w-7 h-7 text-blue-600" />;
    }
  };

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

        {/* Scroll hint */}
        <div className="flex items-center justify-center lg:justify-end gap-1.5 mb-4 text-xs font-semibold text-slate-400">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>{prefersReducedMotion ? 'Scroll sideways to explore all services' : 'Auto-scrolling — hover to pause and explore'}</span>
        </div>

        {prefersReducedMotion ? (
          /* Manual horizontal scroll fallback for prefers-reduced-motion */
          <div className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [scrollbar-width:thin]">
            {SERVICES_DATA.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                delay={index * 90}
                extraClassName="snap-start"
                renderIcon={renderIcon}
                onSelect={setSelectedService}
              />
            ))}
          </div>
        ) : (
          /* Auto-scrolling marquee — pauses on hover/focus for reading */
          <div className="relative overflow-hidden pb-6 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
            <div
              className={`flex gap-6 sm:gap-8 w-max animate-marquee ${isPaused ? 'is-paused' : ''}`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
            >
              {marqueeServices.map((service, index) => (
                <ServiceCard
                  key={`${service.id}-${index}`}
                  service={service}
                  delay={(index % SERVICES_DATA.length) * 90}
                  renderIcon={renderIcon}
                  onSelect={setSelectedService}
                />
              ))}
            </div>
          </div>
        )}

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
