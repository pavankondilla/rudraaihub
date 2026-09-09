import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, RefreshCw, Clock, Shield, DollarSign, Cpu, FileText } from 'lucide-react';

interface InteractiveSolutionBuilderProps {
  onOpenBookDemo: () => void;
}

export const InteractiveSolutionBuilder: React.FC<InteractiveSolutionBuilderProps> = ({ onOpenBookDemo }) => {
  const [industry, setIndustry] = useState<string>('SaaS & Tech');
  const [teamSize, setTeamSize] = useState<string>('10 - 50 employees');
  const [selectedServices, setSelectedServices] = useState<string[]>(['AI Automations', 'Integrations']);
  const [primaryGoal, setPrimaryGoal] = useState<string>('Reduce Manual Operations');

  const industries = ['SaaS & Tech', 'E-commerce & Retail', 'Fintech & Banking', 'Healthcare', 'Logistics & Supply Chain', 'Professional Services'];
  const teamSizes = ['1 - 10 employees', '10 - 50 employees', '50 - 250 employees', '250+ Enterprise'];
  const goals = ['Reduce Manual Operations', 'Launch New AI Product/SaaS', 'Integrate Fragmented Systems', 'Data Insights & Executive Consulting'];

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  // Dynamic calculations based on user selections
  const calculateEstimate = () => {
    let weeks = 3;
    let estimatedHoursSavedWeekly = 40;
    
    if (selectedServices.includes('SaaS Solutions')) {
      weeks += 4;
      estimatedHoursSavedWeekly += 60;
    }
    if (selectedServices.includes('Integrations')) {
      weeks += 2;
      estimatedHoursSavedWeekly += 30;
    }
    if (selectedServices.includes('AI Consulting')) {
      weeks += 1;
      estimatedHoursSavedWeekly += 15;
    }

    if (teamSize === '50 - 250 employees') {
      estimatedHoursSavedWeekly *= 2.5;
    } else if (teamSize === '250+ Enterprise') {
      estimatedHoursSavedWeekly *= 5;
    }

    const estimatedAnnualSavings = Math.round(estimatedHoursSavedWeekly * 52 * 45);

    return {
      weeks: `${weeks}-${weeks + 2} Weeks`,
      hoursSaved: `${Math.round(estimatedHoursSavedWeekly)}+ Hours / Week`,
      annualSavings: `$${estimatedAnnualSavings.toLocaleString()}`,
    };
  };

  const est = calculateEstimate();

  return (
    <section id="solutions" className="py-24 bg-slate-900 text-white relative border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950 border border-blue-800 px-3 py-1 rounded-full inline-block">
            Interactive Blueprint Builder
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Build Your Custom AI Blueprint
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Configure your business parameters below to generate an instant technical roadmap and ROI forecast.
          </p>
        </div>

        {/* Builder Interactive Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0A0F2C] rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          
          {/* Controls Form (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Industry */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                1. Select Your Industry
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {industries.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setIndustry(ind)}
                    className={`p-3 rounded-xl text-xs font-semibold text-left border transition-all ${
                      industry === ind
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Company Size */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                2. Company Scale
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {teamSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setTeamSize(size)}
                    className={`p-3 rounded-xl text-xs font-semibold text-left border transition-all ${
                      teamSize === size
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Required Solutions */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                3. Choose Required AI Solutions (Select Multiple)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['AI Automations', 'SaaS Solutions', 'Integrations', 'AI Consulting'].map((srv) => {
                  const isSelected = selectedServices.includes(srv);
                  return (
                    <button
                      key={srv}
                      onClick={() => toggleService(srv)}
                      className={`p-4 rounded-xl text-xs font-bold text-left border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-blue-950/90 text-blue-300 border-blue-500 shadow-sm'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span>{srv}</span>
                      <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-slate-700'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Primary Goal */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                4. Primary Business Goal
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {goals.map((g) => (
                  <button
                    key={g}
                    onClick={() => setPrimaryGoal(g)}
                    className={`p-3 rounded-xl text-xs font-medium text-left border transition-all ${
                      primaryGoal === g
                        ? 'bg-blue-600 text-white border-blue-500 font-semibold'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Real-time Output Card (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 sm:p-8 border border-blue-500/30 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="flex items-center space-x-2 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Custom Solution Blueprint</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                RudraAiHub Roadmap
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Tailored for <span className="text-white font-semibold">{industry}</span> ({teamSize})
              </p>

              {/* Selected Stack summary */}
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 mb-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold text-slate-400">Target Focus:</span>
                  <span className="text-blue-400 font-medium">{primaryGoal}</span>
                </div>
                <div className="flex items-start justify-between text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <span className="font-semibold text-slate-400">Selected Pillars:</span>
                  <div className="text-right font-medium text-slate-200">
                    {selectedServices.join(', ')}
                  </div>
                </div>
              </div>

              {/* Key Estimated Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Est. Delivery
                  </span>
                  <span className="text-lg font-bold text-white flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-blue-400 inline" />
                    <span>{est.weeks}</span>
                  </span>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Time Reclaimed
                  </span>
                  <span className="text-lg font-bold text-blue-400">
                    {est.hoursSaved}
                  </span>
                </div>
              </div>

              {/* Projected Annual Cost Savings */}
              <div className="bg-blue-950/60 border border-blue-500/40 rounded-xl p-4 text-center mb-6">
                <span className="text-xs text-blue-300 font-semibold uppercase tracking-wider block mb-1">
                  Projected Annual Cost Efficiency
                </span>
                <span className="text-3xl font-black text-white tracking-tight">
                  {est.annualSavings} / yr
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onOpenBookDemo}
              className="w-full py-4 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>Get This Custom Blueprint Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
