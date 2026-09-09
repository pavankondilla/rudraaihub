import React, { useEffect, useRef, useState } from 'react';
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
  ArrowLeftRight,
  Hand
} from 'lucide-react';

type Mode = 'static' | 'touch' | 'pinned';

// How much extra vertical scroll input (relative to the horizontal travel
// distance) is required to fully traverse the pinned reveal — higher feels
// slower/more deliberate and cinematic, lower feels snappier.
const PIN_SCROLL_MULTIPLIER = 1.6;

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
  extraClassName?: string;
  onSelect: (service: ServiceItem) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, delay = 0, large = false, extraClassName = '', onSelect }) => (
  <ScrollReveal
    as="div"
    className={`bg-white rounded-3xl border border-slate-200/80 hover:border-blue-500/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 active:scale-[0.97] transition-all duration-300 ease-out flex flex-col justify-between group cursor-pointer flex-shrink-0 ${
      large ? 'p-9 w-[300px] sm:w-[360px]' : 'p-8 w-[280px] sm:w-[320px]'
    } ${extraClassName}`}
    delay={delay}
    variant="card"
    onClick={() => onSelect(service)}
  >
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
  </ScrollReveal>
);

/**
 * Services row with three interaction modes, chosen once on mount:
 *  - "pinned" (fine pointer, motion allowed): the section pins in place
 *    while the page scrolls, translating normal vertical scroll into a
 *    cinematic horizontal reveal, with cards nearer the viewport center
 *    scaling/brightening as they come into focus.
 *  - "touch" (coarse pointer / mobile): native swipe with momentum
 *    scrolling, snap points, and larger cards sized for touch.
 *  - "static" (prefers-reduced-motion): plain manual horizontal scroll,
 *    no scroll-jacking or continuous motion.
 */
export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({ services, onSelect }) => {
  const [mode, setMode] = useState<Mode>('static');
  const [scrollDistance, setScrollDistance] = useState(0);
  const outerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion) setMode('static');
    else if (isTouch) setMode('touch');
    else setMode('pinned');
  }, []);

  // Measure how far the track overhangs the viewport, in pinned mode
  useEffect(() => {
    if (mode !== 'pinned') return;

    const measure = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      setScrollDistance(Math.max(0, trackWidth - viewportWidth + 96));
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [mode, services.length]);

  // Scroll-driven horizontal translate + per-card focus scale/opacity
  useEffect(() => {
    if (mode !== 'pinned' || scrollDistance <= 0) return;

    let frameId = 0;

    const update = () => {
      const outer = outerRef.current;
      const track = trackRef.current;
      if (!outer || !track) return;

      const scrollRunway = scrollDistance * PIN_SCROLL_MULTIPLIER;
      const rect = outer.getBoundingClientRect();
      const scrolledIntoSection = Math.min(scrollRunway, Math.max(0, -rect.top));
      const progress = scrolledIntoSection / scrollRunway;

      track.style.transform = `translate3d(${-progress * scrollDistance}px, 0, 0)`;

      const viewportCenter = window.innerWidth / 2;
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        const normalized = Math.min(1, distance / (window.innerWidth * 0.62));
        const scale = 1 - normalized * 0.12;
        const opacity = 1 - normalized * 0.5;
        card.style.transform = `scale(${scale})`;
        card.style.opacity = `${opacity}`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [mode, scrollDistance]);

  if (mode === 'static') {
    return (
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center lg:justify-end gap-1.5 mb-4 text-xs font-semibold text-slate-400">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Scroll sideways to explore all services</span>
        </div>
        <div className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 px-4 sm:px-6 lg:px-8 [scrollbar-width:thin]">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} delay={index * 90} extraClassName="snap-start" onSelect={onSelect} />
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'touch') {
    return (
      <div>
        <div className="flex items-center justify-center gap-1.5 mb-4 text-xs font-semibold text-slate-400">
          <Hand className="w-3.5 h-3.5" />
          <span>Swipe to explore all services</span>
        </div>
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 px-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} delay={index * 70} large extraClassName="snap-center" onSelect={onSelect} />
          ))}
        </div>
      </div>
    );
  }

  // pinned: page-scroll-driven horizontal reveal
  return (
    <div>
      <div className="flex items-center justify-center gap-1.5 mb-4 text-xs font-semibold text-slate-400">
        <ArrowLeftRight className="w-3.5 h-3.5" />
        <span>Keep scrolling to move through our services</span>
      </div>
      <div
        ref={outerRef}
        style={{ height: `calc(100vh + ${scrollDistance * PIN_SCROLL_MULTIPLIER}px)` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div ref={trackRef} className="flex gap-8 px-4 sm:px-6 lg:px-8 will-change-transform">
            {services.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="flex-shrink-0"
              >
                <ServiceCard service={service} delay={index * 90} large onSelect={onSelect} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { renderServiceIcon };
