import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { InteractiveBrainOrbit } from './InteractiveBrainOrbit';
import { Starfield } from './Starfield';

interface HeroProps {
  onOpenBookDemo: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBookDemo, onExploreServices }) => {

  return (
    <section id="home" className="relative min-h-[90vh] bg-[#0A0F2C] text-white pt-10 pb-20 sm:pt-12 overflow-hidden flex items-center">
      {/* Interactive starfield */}
      <Starfield density={0.00018} swirl />

      {/* Background radial glowing gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center lg:grid lg:grid-cols-12 gap-10 lg:gap-8 lg:items-center">

          {/* Block A — Headline + Subheadline */}
          <div className="order-1 w-full lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Main Headline */}
            <h1 className="text-[2.5rem] leading-[1.1] sm:text-6xl lg:text-7xl font-extrabold tracking-tight sm:leading-[1.12] text-white">
              One-Stop Solution
              <br />
              for All Your <span className="text-[#2563EB]">AI</span> Needs
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Automations, premium websites, SaaS platforms, integrations, and AI consulting — all built by one team, so you never have to juggle vendors again.
            </p>
          </div>

          {/* Block B — Interactive Brain Orbit */}
          <div className="order-2 w-full lg:col-span-5 relative flex flex-col items-center justify-center">
            <InteractiveBrainOrbit
              onOpenBookDemo={onOpenBookDemo}
            />
          </div>

          {/* Block C — CTAs + Trust Badges */}
          <div className="order-3 w-full lg:col-span-7 space-y-8">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onExploreServices}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenBookDemo}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-500 transition-all flex items-center justify-center space-x-2"
              >
                <span>Book a Demo</span>
                <Sparkles className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Trust Badges — hidden on mobile to match reference */}
            <div className="hidden lg:grid grid-cols-4 gap-4 pt-8 border-t border-slate-800/80 text-center lg:text-left">
              <div>
                <p className="text-2xl font-bold text-white">1</p>
                <p className="text-xs text-slate-400 font-medium">One-Stop AI Partner</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">50+</p>
                <p className="text-xs text-slate-400 font-medium">AI Workflows Built</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-400">99.8%</p>
                <p className="text-xs text-slate-400 font-medium">Execution Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">10x</p>
                <p className="text-xs text-slate-400 font-medium">Average ROI</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
