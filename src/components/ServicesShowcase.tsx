import React, { useEffect, useRef } from 'react';
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
      large ? 'p-9 w-[280px] sm:w-[360px]' : 'p-8 w-[260px] sm:w-[320px]'
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
 * A single free-scrolling horizontal strip of service cards — no scroll
 * hijacking. Vertical page scrolling always passes straight through:
 *  - Touch: native side-swipe; a downward swipe scrolls the page as normal.
 *  - Trackpad: native horizontal scroll.
 *  - Mouse: click-and-drag to pan, or a vertical wheel is translated to
 *    horizontal movement — but only until the strip reaches an end, at
 *    which point the wheel goes back to scrolling the page.
 */
export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({ services, onSelect }) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // Vertical wheel -> horizontal scroll, released at both ends so the page
  // is never trapped. Skipped on touch devices (native swipe already works).
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;

    const onWheel = (e: WheelEvent) => {
      // Leave genuinely-horizontal gestures (trackpads, shift+wheel) alone.
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;

      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= max - 1;
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return; // hand back to page

      el.scrollLeft += e.deltaY;
      e.preventDefault();
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Click-and-drag to pan (mouse only).
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;

    let dragging = false;
    let startX = 0;
    let startLeft = 0;
    let moved = false;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startLeft - dx;
    };
    const onPointerUp = () => {
      dragging = false;
    };
    // Swallow the click that follows a drag so a card modal doesn't open.
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.stopPropagation();
        e.preventDefault();
        moved = false;
      }
    };

    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    el.addEventListener('click', onClickCapture, true);
    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('click', onClickCapture, true);
    };
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center lg:justify-end gap-1.5 mb-4 text-xs font-semibold text-slate-400">
        <ArrowLeftRight className="w-3.5 h-3.5" />
        <span>Scroll, swipe or drag sideways to explore all services</span>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-6 sm:gap-8 overflow-x-auto overflow-y-hidden overscroll-x-contain snap-x snap-proximity pb-6 px-4 sm:px-6 lg:px-8 [scrollbar-width:thin] cursor-grab active:cursor-grabbing select-none"
      >
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            delay={index * 70}
            large
            extraClassName="snap-start"
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export { renderServiceIcon };
