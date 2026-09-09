import React, { useEffect, useRef } from 'react';

interface StarfieldProps {
  /** Approximate stars per pixel of container area */
  density?: number;
  /** Enables a slow galaxy-like rotational drift around the field's center */
  swirl?: boolean;
  className?: string;
}

interface Star {
  cx: number; // orbit center x (px)
  cy: number; // orbit center y (px)
  r: number; // distance from orbit center (px)
  angle: number; // current orbit angle (radians)
  angularSpeed: number; // radians / frame
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  gold: boolean;
}

const REPEL_RADIUS = 190;
const REPEL_STRENGTH = 3.6;
const SPRING_K = 0.035;
const DAMPING = 0.9;

/**
 * Interactive starfield rendered on a canvas that fills its relatively
 * positioned parent. Stars twinkle continuously, drift in a slow galaxy
 * swirl when enabled, and are pushed away from the cursor with a soft
 * spring pulling them back, plus glowing connector lines when the cursor
 * is nearby.
 */
export const Starfield: React.FC<StarfieldProps> = ({ density = 0.00014, swirl = false, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const buildStars = () => {
      const count = Math.max(90, Math.min(420, Math.floor(width * height * density)));
      const cx = width / 2;
      const cy = height / 2;
      const maxR = Math.sqrt(cx * cx + cy * cy);
      stars = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * maxR;
        const baseX = cx + r * Math.cos(angle);
        const baseY = cy + r * Math.sin(angle);
        return {
          cx,
          cy,
          r,
          angle,
          // inner stars sweep faster than outer ones, like galactic rotation
          angularSpeed: swirl ? (0.00025 + 0.0009 / (1 + r / 80)) * (Math.random() > 0.5 ? 1 : -1) * 0.35 : 0,
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          vx: 0,
          vy: 0,
          radius: Math.random() * 1.5 + 0.4,
          baseOpacity: Math.random() * 0.55 + 0.35,
          twinkleSpeed: Math.random() * 0.0018 + 0.0006,
          twinklePhase: Math.random() * Math.PI * 2,
          gold: Math.random() > 0.9,
        };
      });
    };

    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      buildStars();
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      if (relX >= 0 && relX <= rect.width && relY >= 0 && relY <= rect.height) {
        mouse.x = relX;
        mouse.y = relY;
        mouse.active = true;
      } else {
        mouse.active = false;
      }
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    let animationFrameId = 0;
    let time = 0;

    const draw = () => {
      time += 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        if (!prefersReducedMotion) {
          if (star.angularSpeed !== 0) {
            star.angle += star.angularSpeed;
            star.baseX = star.cx + star.r * Math.cos(star.angle);
            star.baseY = star.cy + star.r * Math.sin(star.angle);
          }

          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;

          if (mouse.active && dist < REPEL_RADIUS) {
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            star.vx += (dx / dist) * force;
            star.vy += (dy / dist) * force;
          }

          star.vx += (star.baseX - star.x) * SPRING_K;
          star.vy += (star.baseY - star.y) * SPRING_K;
          star.vx *= DAMPING;
          star.vy *= DAMPING;
          star.x += star.vx;
          star.y += star.vy;
        }

        const distToMouse = mouse.active
          ? Math.sqrt((star.x - mouse.x) ** 2 + (star.y - mouse.y) ** 2)
          : Infinity;
        const proximityBoost = mouse.active && distToMouse < REPEL_RADIUS
          ? (1 - distToMouse / REPEL_RADIUS) * 0.65
          : 0;

        const twinkle = prefersReducedMotion
          ? star.baseOpacity
          : star.baseOpacity + Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.35;
        const opacity = Math.max(0, Math.min(1, twinkle + proximityBoost));
        const radius = star.radius + proximityBoost * 1.5;

        ctx.beginPath();
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = star.gold
          ? `rgba(250, 204, 120, ${opacity})`
          : `rgba(255, 255, 255, ${opacity})`;
        ctx.shadowBlur = radius > 1.3 ? 5 : 0;
        ctx.shadowColor = star.gold ? 'rgba(250,204,120,0.8)' : 'rgba(147,197,253,0.8)';
        ctx.fill();
      }

      // Glowing connector lines from cursor to nearby stars
      if (mouse.active && !prefersReducedMotion) {
        for (const star of stars) {
          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_RADIUS) {
            const lineOpacity = (1 - dist / REPEL_RADIUS) * 0.5;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(star.x, star.y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${lineOpacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [density, swirl]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};
