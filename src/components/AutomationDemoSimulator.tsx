import React, { useState } from 'react';
import { DEMO_WORKFLOWS } from '../data/rudraData';
import { DemoWorkflow, WorkflowStep } from '../types';
import { Play, CheckCircle2, Clock, RefreshCw, Terminal, ArrowRight, Zap, Check } from 'lucide-react';

export const AutomationDemoSimulator: React.FC = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<DemoWorkflow>(DEMO_WORKFLOWS[0]);
  const [currentSteps, setCurrentSteps] = useState<WorkflowStep[]>(DEMO_WORKFLOWS[0].steps);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    'RudraAiHub Workflow Engine Initialized.',
    `Ready to test: ${DEMO_WORKFLOWS[0].title}`
  ]);

  const selectScenario = (wf: DemoWorkflow) => {
    setSelectedWorkflow(wf);
    setCurrentSteps(wf.steps.map(s => ({ ...s, status: 'idle' })));
    setIsRunning(false);
    setLogs([
      'RudraAiHub Workflow Engine Initialized.',
      `Switched to scenario: ${wf.title}`
    ]);
  };

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    
    // Reset steps
    const stepsCopy = selectedWorkflow.steps.map(s => ({ ...s, status: 'idle' as const }));
    setCurrentSteps(stepsCopy);
    setLogs([`Starting test execution for "${selectedWorkflow.title}"...`]);

    // Step-by-step execution simulation
    stepsCopy.forEach((_, index) => {
      setTimeout(() => {
        setCurrentSteps(prev => 
          prev.map((step, i) => {
            if (i === index) return { ...step, status: 'running' as const };
            if (i < index) return { ...step, status: 'completed' as const };
            return step;
          })
        );

        setLogs(prevLogs => [
          ...prevLogs,
          `[${new Date().toLocaleTimeString()}] Executing Step ${index + 1}: ${stepsCopy[index].name}`,
          `↳ ${stepsCopy[index].outputLog}`
        ]);

        if (index === stepsCopy.length - 1) {
          setTimeout(() => {
            setCurrentSteps(prev => prev.map(s => ({ ...s, status: 'completed' as const })));
            setIsRunning(false);
            setLogs(prevLogs => [
              ...prevLogs,
              `✅ Workflow Execution Complete! Estimated Time Saved: ${selectedWorkflow.timeSaved}`
            ]);
          }, 800);
        }
      }, (index + 1) * 900);
    });
  };

  return (
    <section className="py-20 bg-[#F1F5F9] text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 border border-blue-200 px-3 py-1 rounded-full inline-block">
            Live Automation Simulator
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            See AI Workflows in Action
          </h2>
          <p className="text-slate-600 text-base font-medium">
            Test our automated pipeline execution engine directly in your browser.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {DEMO_WORKFLOWS.map((wf) => (
            <button
              key={wf.id}
              onClick={() => selectScenario(wf)}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 border ${
                selectedWorkflow.id === wf.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Zap className={`w-4 h-4 ${selectedWorkflow.id === wf.id ? 'text-white' : 'text-blue-600'}`} />
              <span>{wf.title}</span>
            </button>
          ))}
        </div>

        {/* Interactive Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Steps Visualizer (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                  {selectedWorkflow.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedWorkflow.title}
                </h3>
              </div>

              <button
                onClick={runSimulation}
                disabled={isRunning}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white transition-all flex items-center space-x-2 ${
                  isRunning
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30'
                }`}
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Run Test Pipeline</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600">
              {selectedWorkflow.description}
            </p>

            {/* Steps Timeline */}
            <div className="space-y-3 pt-2">
              {currentSteps.map((step, idx) => (
                <div
                  key={step.id}
                  className={`p-4 rounded-xl border transition-all flex items-start space-x-4 ${
                    step.status === 'running'
                      ? 'bg-blue-50 border-blue-400 shadow-sm scale-[1.01]'
                      : step.status === 'completed'
                      ? 'bg-slate-50 border-emerald-200'
                      : 'bg-slate-50/50 border-slate-200/80 opacity-70'
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {step.status === 'completed' ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : step.status === 'running' ? (
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center animate-spin">
                        <RefreshCw className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {step.name}
                      </h4>
                      <span className={`text-[10px] font-semibold uppercase ${
                        step.status === 'completed' ? 'text-emerald-600' : step.status === 'running' ? 'text-blue-600' : 'text-slate-400'
                      }`}>
                        {step.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Terminal Console Output (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-slate-950 text-emerald-400 font-mono rounded-2xl p-6 border border-slate-800 shadow-2xl flex flex-col h-full min-h-[420px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-slate-200">Execution Console</span>
              </div>
              <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-400">
                LIVE LOGS
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 text-[11px] leading-relaxed max-h-[320px] pr-2">
              {logs.map((log, i) => (
                <div key={i} className="break-words">
                  {log.startsWith('✅') ? (
                    <span className="text-emerald-300 font-bold">{log}</span>
                  ) : log.startsWith('Starting') ? (
                    <span className="text-blue-400 font-semibold">{log}</span>
                  ) : log.startsWith('↳') ? (
                    <span className="text-slate-400 pl-3 block">{log}</span>
                  ) : (
                    <span className="text-slate-300">{log}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Time Saved: <strong className="text-white">{selectedWorkflow.timeSaved}</strong></span>
              </span>
              <span className="text-emerald-400 font-bold">STATUS: READY</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
