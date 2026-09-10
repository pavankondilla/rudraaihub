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

interface Ripple {
  x: number;
  y: number;
  radius: number;
  strength: number;
}

const REPEL_RADIUS = 250;
const REPEL_STRENGTH = 7.5;
const SPRING_K = 0.028;
const DAMPING = 0.9;
const LINK_RADIUS = 200; // cursor-to-star + star-to-star link distance
const MAX_KICK = 9; // clamp for scroll-driven velocity nudges

/**
 * Interactive starfield rendered on a canvas that fills its relatively
 * positioned parent. Stars twinkle continuously, drift in a slow galaxy
 * swirl when enabled, and react strongly to pointer input: they are pushed
 * away from the cursor / finger with a soft spring pulling them back, a
 * tap or click fires an expanding shockwave, scrolling gives the whole
 * field a parallax kick, and glowing connector lines web the stars near
 * the pointer together. Pointer events cover mouse, touch and pen, so a
 * single finger dragging to scroll drives the effect on mobile too.
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
    const ripples: Ripple[] = [];
    let lastScrollY = window.scrollY;

    const buildStars = () => {
      const count = Math.max(120, Math.min(520, Math.floor(width * height * density)));
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

    const setPointerFromEvent = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const relX = clientX - rect.left;
      const relY = clientY - rect.top;
      if (relX >= 0 && relX <= rect.width && relY >= 0 && relY <= rect.height) {
        mouse.x = relX;
        mouse.y = relY;
        mouse.active = true;
        return true;
      }
      mouse.active = false;
      return false;
    };

    const addRipple = () => {
      if (!mouse.active || prefersReducedMotion) return;
      ripples.push({ x: mouse.x, y: mouse.y, radius: 0, strength: 1 });
      if (ripples.length > 6) ripples.shift();
    };

    // Pointer events unify mouse, touch and pen. They are passive: we never
    // call preventDefault, so a single finger still scrolls the page while
    // also driving the field.
    const handlePointerMove = (e: PointerEvent) => {
      setPointerFromEvent(e.clientX, e.clientY);
    };
    const handlePointerDown = (e: PointerEvent) => {
      if (setPointerFromEvent(e.clientX, e.clientY)) addRipple();
    };
    const handlePointerEnd = (e: PointerEvent) => {
      // A lifted finger has no hover state; a mouse keeps tracking via move.
      if (e.pointerType !== 'mouse') mouse.active = false;
    };
    const handlePointerLeave = () => {
      mouse.active = false;
    };
    const handleScroll = () => {
      const dy = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      if (prefersReducedMotion || dy === 0) return;
      const kick = Math.max(-MAX_KICK, Math.min(MAX_KICK, dy * 0.06));
      for (const star of stars) {
        star.vy -= kick;
        star.vx += kick * (star.x < width / 2 ? -0.15 : 0.15);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerEnd, { passive: true });
    window.addEventListener('pointercancel', handlePointerEnd, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    let animationFrameId = 0;
    let time = 0;

    const draw = () => {
      time += 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Advance shockwaves
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.radius += 10;
        rp.strength *= 0.94;
        if (rp.strength < 0.03 || rp.radius > Math.max(width, height) * 1.2) {
          ripples.splice(i, 1);
        }
      }

      const nearMouse: Star[] = [];

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

          // Shockwave push — a moving ring that shoves stars outward as it passes
          for (const rp of ripples) {
            const rdx = star.x - rp.x;
            const rdy = star.y - rp.y;
            const rdist = Math.sqrt(rdx * rdx + rdy * rdy) || 0.001;
            if (Math.abs(rdist - rp.radius) < 55) {
              const f = rp.strength * 6;
              star.vx += (rdx / rdist) * f;
              star.vy += (rdy / rdist) * f;
            }
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
        if (distToMouse < LINK_RADIUS) nearMouse.push(star);
        const proximityBoost = mouse.active && distToMouse < REPEL_RADIUS
          ? (1 - distToMouse / REPEL_RADIUS) * 0.95
          : 0;

        const twinkle = prefersReducedMotion
          ? star.baseOpacity
          : star.baseOpacity + Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.35;
        const opacity = Math.max(0, Math.min(1, twinkle + proximityBoost));
        const radius = star.radius + proximityBoost * 2.4;

        const color = star.gold ? '250, 204, 120' : '255, 255, 255';

        // cheap additive glow for the brighter stars — avoids per-star
        // shadowBlur, which is far too costly at this count and instance count
        if (radius > 1.1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, radius * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${opacity * 0.2})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.fill();
      }

      // Faint expanding rings for each live shockwave
      if (!prefersReducedMotion) {
        for (const rp of ripples) {
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(96, 165, 250, ${rp.strength * 0.28})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
      }

      // Constellation web near the pointer: cursor→star plus star→star links
      if (mouse.active && !prefersReducedMotion && nearMouse.length) {
        for (const star of nearMouse) {
          const dist = Math.sqrt((star.x - mouse.x) ** 2 + (star.y - mouse.y) ** 2);
          const lineOpacity = (1 - dist / LINK_RADIUS) * 0.7;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(star.x, star.y);
          ctx.strokeStyle = `rgba(120, 180, 255, ${lineOpacity})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        // Pairwise links stay cheap: only the (usually small) near-pointer subset
        for (let i = 0; i < nearMouse.length; i++) {
          const a = nearMouse[i];
          for (let j = i + 1; j < nearMouse.length; j++) {
            const b = nearMouse[j];
            const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
            if (d < 90) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(96, 165, 250, ${(1 - d / 90) * 0.32})`;
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerEnd);
      window.removeEventListener('pointercancel', handlePointerEnd);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('scroll', handleScroll);
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
