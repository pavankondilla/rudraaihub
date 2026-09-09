import React from 'react';
import { WHY_CHOOSE_US } from '../data/rudraData';
import { Sparkles, TrendingUp, Users, Target, ShieldCheck, Zap } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { Starfield } from './Starfield';

export const WhyChooseUs: React.FC = () => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-blue-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-blue-400" />;
      case 'Users':
        return <Users className="w-6 h-6 text-blue-400" />;
      case 'Target':
        return <Target className="w-6 h-6 text-blue-400" />;
      default:
        return <Zap className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <section id="why-us" className="py-24 bg-[#0A0F2C] text-white relative overflow-hidden border-t border-slate-800/60">
      {/* Interactive twinkling starfield */}
      <Starfield density={0.00009} />

      {/* Background Subtle Accent Lights */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Matches Image */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3" delay={80}>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 border border-blue-800 px-3 py-1 rounded-full inline-block">
            Our Key Differentiators
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Why Choose RudraAiHub?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-normal">
            We bridge the gap between abstract AI capability and tangible business bottom-line growth.
          </p>
        </ScrollReveal>

        {/* 4 Pillars Grid - Matches Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_CHOOSE_US.map((item, index) => (
            <ScrollReveal
              key={item.id}
              as="div"
              className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between group"
              delay={index * 90}
              variant="card"
            >
              <div>
                {/* Icon Container with glowing effect */}
                <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center mb-5 group-hover:border-blue-400 group-hover:scale-105 transition-all">
                  {renderIcon(item.iconName)}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Metric Tag if available */}
              {item.metric && (
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-baseline justify-between">
                  <span className="text-2xl font-black text-blue-400 tracking-tight">
                    {item.metric}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {item.metricLabel}
                  </span>
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>

        {/* Guarantees Ribbon */}
        <ScrollReveal className="mt-16 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800" delay={140}>
          <div className="flex flex-col items-center justify-center p-2">
            <ShieldCheck className="w-6 h-6 text-blue-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Zero Data Leakage</h4>
            <p className="text-xs text-slate-400 mt-1">Enterprise encryption & zero LLM training on private data</p>
          </div>
          <div className="flex flex-col items-center justify-center p-2 pt-4 md:pt-2">
            <Zap className="w-6 h-6 text-blue-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Rapid Deployment</h4>
            <p className="text-xs text-slate-400 mt-1">First functional automation prototype delivered in 7 days</p>
          </div>
          <div className="flex flex-col items-center justify-center p-2 pt-4 md:pt-2">
            <Sparkles className="w-6 h-6 text-blue-400 mb-2" />
            <h4 className="text-sm font-bold text-white">Dedicated Support</h4>
            <p className="text-xs text-slate-400 mt-1">24/7 SLA monitoring & continuous pipeline health optimization</p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
