import React from 'react';
import { Sparkles, ArrowRight, PhoneCall } from 'lucide-react';

interface CallToActionProps {
  onOpenContact: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenContact }) => {
  return (
    <section className="bg-electric-blue text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden shadow-2xl">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-60 h-60 bg-blue-900/20 rounded-full blur-xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Start Your AI Journey Today</span>
        </div>

        {/* Headline - Matches Image */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Ready to Build Your AI Business?
        </h2>

        {/* Subtitle - Matches Image */}
        <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto font-normal">
          Let's turn your idea into an intelligent, automated and scalable business.
        </p>

        {/* Button - Matches Image */}
        <div className="pt-4">
          <button
            onClick={onOpenContact}
            className="px-8 py-4 rounded-xl font-extrabold text-base bg-slate-950 text-white hover:bg-slate-900 shadow-2xl hover:scale-105 transition-all inline-flex items-center space-x-3 group"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
