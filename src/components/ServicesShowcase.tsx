import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ServiceItem } from '../types';
import { ScrollReveal } from './ScrollReveal';
import {
  Workflow,
  Box,
  GitFork,
  Lightbulb,
  Globe,
  Layers,
  ChevronRight,
  ArrowLeftRight
} from 'lucide-react';

// Extra vertical scroll (relative to the horizontal travel distance) spent
// traversing the pinned section. ~1 = 1:1, higher = slower / more cinematic.
const PIN_MULTIPLIER = 1.15;

interface ServicesShowcaseProps {
  services: ServiceItem[];
  onSelect: (service: ServiceItem) => void;
}

const renderServiceIcon = (iconName: string, className: string) => {
  switch (iconName) {
    case 'Workflow':
      return <Workflow className={className} />;
    case 'Box':
      return <Box className={className} />;
    case 'GitFork':
      return <GitFork className={className} />;
    case 'Lightbulb':
      return <Lightbulb className={className} />;
    case 'Globe':
      return <Globe className={className} />;
    default:
      return <Layers className={className} />;
  }
};

interface ServiceCardProps {
  service: ServiceItem;
  delay?: number;
  large?: boolean;
  plain?: boolean;
  extraClassName?: string;
  onSelect: (service: ServiceItem) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  delay = 0,
  large = false,
  plain = false,
  extraClassName = '',
  onSelect,
}) => {
  const className = `bg-white rounded-3xl border border-slate-200/80 hover:border-blue-500/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 active:scale-[0.97] transition-all duration-300 ease-out flex flex-col justify-between group cursor-pointer flex-shrink-0 ${
    large ? 'p-9 w-[280px] sm:w-[360px]' : 'p-8 w-[260px] sm:w-[320px]'
  } ${extraClassName}`;

  const body = (
    <>
      <div>
        <div
          className={`rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 ${
            large ? 'w-16 h-16' : 'w-14 h-14'
          }`}
        >
          <div className="group-hover:text-white transition-colors">
            {renderServiceIcon(service.iconName, large ? 'w-8 h-8 text-blue-600' : 'w-7 h-7 text-blue-600')}
          </div>
        </div>

        <h3 className={`font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors ${large ? 'text-2xl' : 'text-xl'}`}>
          {service.title}
        </h3>

        <p className={`text-slate-600 leading-relaxed mb-6 ${large ? 'text-base' : 'text-sm'}`}>
          {service.shortDesc}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
        <span>View Full Details</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
      </div>
    </>
  );

  if (plain) {
    return (
      <div className={className} onClick={() => onSelect(service)}>
        {body}
      </div>
    );
  }

  return (
    <ScrollReveal as="div" className={className} delay={delay} variant="card" onClick={() => onSelect(service)}>
      {body}
    </ScrollReveal>
  );
};

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Scroll-linked horizontal showcase.
 *
 * Desktop & mobile alike: the section pins to the viewport and a normal
 * downward scroll / swipe is mapped onto a horizontal glide through the
 * service cards. Movement is eased at both ends and damped every frame, so
 * the row starts and finishes smoothly and then the page carries on. If the
 * viewer prefers reduced motion (or all cards already fit), it degrades to a
 * plain horizontal strip with no pinning.
 */
export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({ services, onSelect }) => {
  const [reduced, setReduced] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Measure how far the track overhangs the viewport.
  useLayoutEffect(() => {
    if (reduced) return;

    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const overhang = track.scrollWidth - window.innerWidth;
      setDistance(Math.max(0, overhang > 0 ? overhang + 48 : 0));
    };

    measure();
    const settle = window.setTimeout(measure, 350); // after webfonts settle
    window.addEventListener('resize', measure);
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener('resize', measure);
    };
  }, [reduced, services.length]);

  // Drive the horizontal translate from scroll position, damped per frame.
  useEffect(() => {
    if (reduced || !distance || distance <= 0) return;

    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const runway = distance * PIN_MULTIPLIER;
    let currentX = 0;
    let rafId = 0;
    let running = false;

    const sample = () => {
      const top = wrap.getBoundingClientRect().top;
      const raw = Math.min(1, Math.max(0, -top / runway));
      return { raw, target: easeInOutCubic(raw) * distance };
    };

    const tick = () => {
      const { raw, target } = sample();
      currentX += (target - currentX) * 0.14;
      if (Math.abs(target - currentX) < 0.15) {
        currentX = target;
        running = false;
      }
      track.style.transform = `translate3d(${-currentX}px, 0, 0)`;
      if (progressRef.current) progressRef.current.style.width = `${raw * 100}%`;
      rafId = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const initial = sample();
    currentX = initial.target;
    track.style.transform = `translate3d(${-currentX}px, 0, 0)`;
    if (progressRef.current) progressRef.current.style.width = `${initial.raw * 100}%`;

    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    return () => {
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reduced, distance]);

  const hint = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-1.5 mb-4 text-xs font-semibold text-slate-400">
      <ArrowLeftRight className="w-3.5 h-3.5" />
      <span>Keep scrolling — the services glide across</span>
    </div>
  );

  // Fallback: reduced motion, or everything already fits without overhang.
  if (reduced || (distance !== null && distance <= 0)) {
    return (
      <div>
        {hint}
        <div className="flex gap-6 sm:gap-8 overflow-x-auto overscroll-x-contain snap-x snap-proximity justify-start lg:justify-center pb-6 px-4 sm:px-6 lg:px-8 [scrollbar-width:thin]">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              delay={index * 70}
              large
              plain={reduced}
              extraClassName="snap-start"
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    );
  }

  const runway = (distance ?? 0) * PIN_MULTIPLIER;

  return (
    <div>
      {hint}
      <div ref={wrapRef} style={{ height: `calc(100vh + ${runway}px)` }} className="relative">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div ref={trackRef} className="flex gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8 will-change-transform">
            {services.map((service) => (
              <div key={service.id} className="flex-shrink-0">
                <ServiceCard service={service} large plain onSelect={onSelect} />
              </div>
            ))}
          </div>

          {/* progress rail — fills as the row travels, empties on the way back */}
          <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 h-1 w-40 rounded-full bg-slate-200/80 overflow-hidden">
            <div ref={progressRef} className="h-full rounded-full bg-blue-600 transition-none" style={{ width: '0%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { renderServiceIcon };
