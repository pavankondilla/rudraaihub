import React, { useState, useEffect } from 'react';
import { Bot, BarChart3, Database, Settings, Globe, ChevronRight } from 'lucide-react';
import brainCoreImage from '../assets/images/ai_brain_core_1784868298722.jpg';

interface InteractiveBrainOrbitProps {
  onSelectService?: (serviceId: string) => void;
  onOpenBookDemo?: () => void;
}

interface OrbitNode {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  angle: number; // angle in degrees
  metric: string;
  status: string;
  description: string;
  color: string;
}

export const InteractiveBrainOrbit: React.FC<InteractiveBrainOrbitProps> = ({
  onSelectService,
  onOpenBookDemo,
}) => {
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [isPulseActive, setIsPulseActive] = useState<boolean>(false);

  const nodes: OrbitNode[] = [
    {
      id: 'ai-automations',
      name: 'AI Automations',
      category: 'Workflow RPA',
      icon: <Bot className="w-5 h-5 text-blue-400" />,
      angle: 270, // Top
      metric: '99.8% Accuracy',
      status: 'Active Pipeline',
      description: 'Autonomous document parsing, CRM sync & email ticket triage.',
      color: '#2563EB'
    },
    {
      id: 'ai-websites',
      name: 'AI Websites',
      category: 'Premium Web Design',
      icon: <Globe className="w-5 h-5 text-sky-300" />,
      angle: 342, // Upper Right
      metric: '5-Star UX Design',
      status: 'Design Studio Live',
      description: 'Premium, conversion-focused websites engineered to make your brand look world-class.',
      color: '#0EA5E9'
    },
    {
      id: 'saas-solutions',
      name: 'SaaS Platforms',
      category: 'Cloud Software',
      icon: <BarChart3 className="w-5 h-5 text-cyan-400" />,
      angle: 54, // Lower Right
      metric: '10x Growth Scale',
      status: 'Live Micro-SaaS',
      description: 'Multi-tenant cloud architectures with Stripe payments & analytics.',
      color: '#06B6D4'
    },
    {
      id: 'integrations',
      name: 'API Integrations',
      category: 'Data Bridge',
      icon: <Database className="w-5 h-5 text-indigo-400" />,
      angle: 126, // Bottom Left
      metric: '< 15ms Latency',
      status: 'Connected Stack',
      description: 'Seamless REST/GraphQL connections between CRM, ERP & WhatsApp.',
      color: '#6366F1'
    },
    {
      id: 'ai-consulting',
      name: 'AI Consulting & Config',
      category: 'Strategic Tech',
      icon: <Settings className="w-5 h-5 text-blue-400" />,
      angle: 198, // Upper Left
      metric: '100% Data Security',
      status: 'Enterprise Audit',
      description: 'Technology stack evaluation, data readiness & ROI roadmap.',
      color: '#3B82F6'
    },
  ];

  // Smooth rotation animation effect
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (isRotating && !activeNodeId) {
        setRotationAngle((prev) => (prev + 0.3) % 360);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isRotating, activeNodeId]);

  // Trigger pulse wave from brain to all nodes
  const triggerPulse = () => {
    setIsPulseActive(true);
    setTimeout(() => setIsPulseActive(false), 1200);
  };

  const activeNode = nodes.find((n) => n.id === activeNodeId);

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-center p-2">
      

      {/* Main Orbit Stage */}
      <div className="relative w-full aspect-square max-w-[420px] sm:max-w-[460px] flex items-center justify-center overflow-visible p-2">
        
        {/* Deep ambient radial lighting behind brain */}
        <div className={`absolute w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none transition-all duration-700 ${isPulseActive ? 'scale-125 bg-blue-500/35' : 'scale-100'}`}></div>

        {/* SVG Orbital Lines & Laser Pulses */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 400 400">
          <defs>
            <radialGradient id="brainPulseGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0A0F2C" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Glowing Outer Orbital Ring (Matches Image Cyan Orbit Circle) */}
          <circle
            cx="200"
            cy="200"
            r="145"
            fill="none"
            stroke="#2563EB"
            strokeWidth="1.5"
            strokeOpacity="0.6"
            className="shadow-[0_0_15px_#2563EB]"
          />

          {/* Glowing pulse ring on pulse trigger */}
          {isPulseActive && (
            <circle
              cx="200"
              cy="200"
              r="145"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="3"
              className="animate-ping"
            />
          )}

          {/* Laser connection lines from center brain (200, 200) to each satellite node */}
          {nodes.map((node) => {
            const currentAngle = (node.angle + rotationAngle) * (Math.PI / 180);
            const radius = 145; // Orbital radius
            const nodeX = 200 + radius * Math.cos(currentAngle);
            const nodeY = 200 + radius * Math.sin(currentAngle);
            const isActive = activeNodeId === node.id;

            return (
              <g key={`line-${node.id}`}>
                <line
                  x1="200"
                  y1="200"
                  x2={nodeX}
                  y2={nodeY}
                  stroke={isActive ? '#38BDF8' : '#2563EB'}
                  strokeWidth={isActive ? '2.5' : '1'}
                  strokeOpacity={isActive ? '0.9' : '0.35'}
                  strokeDasharray={isActive ? 'none' : '4 4'}
                />
                
                {/* Energy pulse particle moving along line */}
                <circle
                  r={isActive ? '4' : '2.5'}
                  fill="#38BDF8"
                  className="transition-all"
                >
                  <animateMotion
                    path={`M 200,200 L ${nodeX},${nodeY}`}
                    dur={isActive ? '0.8s' : '2.5s'}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Center Glowing AI Brain Image (Interactive) */}
        <div
          onClick={triggerPulse}
          className="relative z-20 w-36 h-36 sm:w-44 sm:h-44 rounded-full cursor-pointer group flex items-center justify-center"
          title="Click Center Brain to Trigger AI Impulse"
        >
          {/* Pulsing Backlight */}
          <div className={`absolute inset-0 rounded-full bg-blue-500/40 blur-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-400/60 ${isPulseActive ? 'scale-125 bg-blue-400/80' : ''}`}></div>

          {/* Clean Border Container */}
          <div className="relative w-full h-full rounded-full border-2 border-blue-400/70 bg-[#0A0F2C] p-1 shadow-[0_0_40px_rgba(37,99,235,0.6)] overflow-hidden flex items-center justify-center group-hover:border-blue-300 transition-all">
            <img
              src={brainCoreImage}
              alt="RudraAiHub Core AI Brain Engine"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full mix-blend-screen scale-105 group-hover:scale-110 transition-transform duration-500"
            />

            {/* Glowing cyan light point at bottom center (Matches Reference Image) */}
            <div className="absolute bottom-1 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_12px_#38BDF8] animate-pulse"></div>
          </div>
        </div>

        {/* Orbiting Satellite Nodes */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {nodes.map((node) => {
            const currentAngle = (node.angle + rotationAngle) * (Math.PI / 180);
            const radius = 145; // Match SVG radius
            const nodeXPercent = 50 + (radius / 200) * 50 * Math.cos(currentAngle);
            const nodeYPercent = 50 + (radius / 200) * 50 * Math.sin(currentAngle);
            const isActive = activeNodeId === node.id;

            return (
              <div
                key={node.id}
                style={{
                  left: `${nodeXPercent}%`,
                  top: `${nodeYPercent}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute pointer-events-auto group"
              >
                {/* Circular Satellite Button (Matches Reference Image Circles) */}
                <button
                  onClick={() => {
                    if (activeNodeId === node.id) {
                      setActiveNodeId(null);
                    } else {
                      setActiveNodeId(node.id);
                      if (onSelectService) onSelectService(node.id);
                    }
                  }}
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-600 border-2 border-white text-white shadow-[0_0_30px_rgba(37,99,235,0.9)] scale-125 z-40'
                      : 'bg-[#0A122E] border border-blue-500/70 text-slate-100 hover:border-cyan-300 hover:scale-110 shadow-[0_0_18px_rgba(37,99,235,0.4)] backdrop-blur-md'
                  }`}
                  title={node.name}
                >
                  {node.icon}
                </button>

                {/* Node Label shown always during orbit rotation */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 mt-2 min-w-max max-w-[130px] px-3 py-1.5 rounded-2xl bg-slate-900/95 border ${isActive ? 'border-blue-500' : 'border-slate-700'} text-center shadow-xl transition-all pointer-events-none z-50 opacity-100 scale-100`}
                >
                  <span className="block text-[11px] font-bold text-white leading-snug">
                    {node.name}
                  </span>
                  <span className="text-[9px] font-mono text-blue-400 font-semibold block mt-1">
                    {node.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Active Selected Node Detail Drawer */}
      {activeNode && (
        <div className="w-full mt-4 bg-slate-900/95 border border-blue-500/40 rounded-2xl p-4 text-xs text-white shadow-xl animate-fadeIn backdrop-blur-md">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-blue-950 border border-blue-800">
                {activeNode.icon}
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">{activeNode.name}</h4>
                <span className="text-[10px] text-blue-400 font-mono">{activeNode.category}</span>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
              {activeNode.status}
            </span>
          </div>

          <p className="text-slate-300 mt-2.5 text-xs leading-relaxed">
            {activeNode.description}
          </p>

          <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[10px] text-slate-400">
              Performance Benchmark: <strong className="text-white">{activeNode.metric}</strong>
            </span>

            <button
              onClick={() => {
                if (onOpenBookDemo) onOpenBookDemo();
              }}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] flex items-center space-x-1 shadow transition-all"
            >
              <span>Explore {activeNode.name}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
