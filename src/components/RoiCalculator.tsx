import React, { useState } from 'react';
import { DollarSign, Clock, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenBookDemo: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenBookDemo }) => {
  const [teamMembers, setTeamMembers] = useState<number>(15);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(12);
  const [hourlyRate, setHourlyRate] = useState<number>(35);

  // Calculations
  const totalWeeklyManualHours = teamMembers * hoursPerWeek;
  const currentWeeklyCost = totalWeeklyManualHours * hourlyRate;
  const currentAnnualCost = currentWeeklyCost * 52;

  // Assuming 80% automation efficiency with RudraAiHub
  const annualSavedCost = Math.round(currentAnnualCost * 0.8);
  const annualHoursSaved = Math.round(totalWeeklyManualHours * 52 * 0.8);

  return (
    <section className="py-20 bg-[#0A0F2C] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950 border border-blue-800 px-3 py-1 rounded-full inline-block">
            Cost & Time Savings
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Calculate Your AI Automation ROI
          </h2>
          <p className="text-slate-300 text-base">
            See how much time and capital your team reclaims each year by eliminating repetitive manual work.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/80 rounded-3xl p-6 sm:p-10 border border-slate-800">
          
          {/* Controls (Left 6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Slider 1: Team Members */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Team Members Performing Routine Tasks
                </label>
                <span className="text-sm font-bold text-blue-400 bg-blue-950 px-3 py-1 rounded-lg border border-blue-800">
                  {teamMembers} People
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={teamMembers}
                onChange={(e) => setTeamMembers(parseInt(e.target.value) || 1)}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Slider 2: Hours per week */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Manual Hours Spent / Person / Week
                </label>
                <span className="text-sm font-bold text-blue-400 bg-blue-950 px-3 py-1 rounded-lg border border-blue-800">
                  {hoursPerWeek} Hrs / Wk
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="35"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(parseInt(e.target.value) || 2)}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Slider 3: Hourly Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Average Hourly Cost / Employee ($)
                </label>
                <span className="text-sm font-bold text-blue-400 bg-blue-950 px-3 py-1 rounded-lg border border-blue-800">
                  ${hourlyRate} / Hr
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="150"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value) || 15)}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
              <strong className="text-slate-200 block mb-1">Calculation Methodology:</strong>
              Based on an estimated 80% reduction in manual data entry, ticket processing, email routing, and document parsing times with RudraAiHub automations.
            </div>

          </div>

          {/* Results Summary Box (Right 6 Cols) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 p-8 rounded-2xl border border-blue-500/40 shadow-xl space-y-6">
            
            <div className="flex items-center space-x-2 text-blue-400 text-xs font-mono font-bold uppercase">
              <TrendingUp className="w-4 h-4" />
              <span>Projected Savings Report</span>
            </div>

            <div>
              <span className="text-xs uppercase font-bold text-slate-400 block mb-1">
                Estimated Annual Capital Reclaimed
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                ${annualSavedCost.toLocaleString()} <span className="text-lg text-blue-400 font-bold">/ yr</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Annual Hours Saved
                </span>
                <span className="text-2xl font-bold text-blue-400">
                  {annualHoursSaved.toLocaleString()} Hrs
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Current Manual Cost
                </span>
                <span className="text-2xl font-bold text-slate-300">
                  ${currentAnnualCost.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={onOpenBookDemo}
              className="w-full py-4 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>Unlock These Savings for Your Business</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
