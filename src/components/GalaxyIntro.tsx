import React, { useEffect, useRef, useState } from 'react';

const SESSION_KEY = 'rah-galaxy-intro-shown';

// Animation timeline (ms, relative to mount)
const ROAM_END = 800; // background stars + loose particles drift
const FORM_END = ROAM_END + 2800; // spiral galaxy fully assembled
const TEXT_AT = FORM_END - 650; // wordmark starts fading in just before full assembly
const HOLD_END = FORM_END + 900; // hold the formed, still-rotating galaxy + logo
const FADE_DURATION = 900; // overlay fade-out

const ARM_COUNT = 3;
const SPIRAL_PITCH = 3.0;

interface CoreParticle {
  startX: number;
  startY: number;
  radius: number; // orbital radius from galaxy center (px)
  baseAngle: number; // arm angle + jitter (radians, pre-rotation)
  size: number;
  color: [number, number, number]; // rgb, warm near core / cool at rim
  driftPhase: number;
  driftSpeed: number;
  formDelay: number; // ms — staggers when each particle begins converging
  twinkleSpeed: number;
  twinklePhase: number;
}

interface BgStar {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * One-time, full-screen entry animation: a faint deep-space starfield sits
 * behind loosely roaming particles which then settle — staggered,
 * decelerating — into a rotating multi-arm spiral galaxy with a luminous
 * core, revealing the RudraAiHub wordmark at the center before fading out
 * to the real page. Shown once per browser session and skipped for
 * prefers-reduced-motion.
 */
export const GalaxyIntro: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [showText, setShowText] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let alreadyShown = true;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      alreadyShown = false;
    }
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (alreadyShown || prefersReducedMotion) return;

    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let maxRadius = Math.max(width, height) * 0.32;
    const TILT = 0.82; // subtle 3D perspective on the galaxy disk

    let core: CoreParticle[] = [];
    let bgStars: BgStar[] = [];

    const buildField = () => {
      maxRadius = Math.max(width, height) * 0.32;

      const coreCount = Math.min(420, Math.max(220, Math.floor((width * height) / 4200)));
      core = Array.from({ length: coreCount }, (_, i) => {
        const arm = i % ARM_COUNT;
        const armOffset = (arm / ARM_COUNT) * Math.PI * 2;
        // bias toward the core for a realistic brightness/density falloff
        const t = Math.pow(Math.random(), 1.6);
        const radius = t * maxRadius;
        const jitter = (Math.random() - 0.5) * 0.55;
        const baseAngle = armOffset + t * SPIRAL_PITCH + jitter;

        const rf = radius / maxRadius; // 0 = core, 1 = rim
        const warm: [number, number, number] = [255, 231, 189];
        const mid: [number, number, number] = [200, 210, 255];
        const cool: [number, number, number] = [140, 175, 255];
        const color: [number, number, number] =
          rf < 0.45
            ? [
                lerp(warm[0], mid[0], rf / 0.45),
                lerp(warm[1], mid[1], rf / 0.45),
                lerp(warm[2], mid[2], rf / 0.45),
              ]
            : [
                lerp(mid[0], cool[0], (rf - 0.45) / 0.55),
                lerp(mid[1], cool[1], (rf - 0.45) / 0.55),
                lerp(mid[2], cool[2], (rf - 0.45) / 0.55),
              ];

        return {
          startX: Math.random() * width,
          startY: Math.random() * height,
          radius,
          baseAngle,
          size: lerp(2.1, 0.6, rf) * (0.7 + Math.random() * 0.6),
          color,
          driftPhase: Math.random() * Math.PI * 2,
          driftSpeed: Math.random() * 0.0016 + 0.0006,
          formDelay: Math.random() * 550,
          twinkleSpeed: Math.random() * 0.002 + 0.0007,
          twinklePhase: Math.random() * Math.PI * 2,
        };
      });

      const bgCount = Math.min(180, Math.max(90, Math.floor((width * height) / 9000)));
      bgStars = Array.from({ length: bgCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.1 + 0.3,
        baseOpacity: Math.random() * 0.45 + 0.15,
        twinkleSpeed: Math.random() * 0.0015 + 0.0004,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      buildField();
    };
    resize();
    window.addEventListener('resize', resize);

    const start = performance.now();
    let frameId = 0;
    let textTriggered = false;
    let fadeTriggered = false;

    const draw = (now: number) => {
      const elapsed = now - start;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // deep-space radial backdrop
      const bgAlpha = clamp01(elapsed / 300);
      const backdrop = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.75);
      backdrop.addColorStop(0, `rgba(16, 20, 46, ${bgAlpha})`);
      backdrop.addColorStop(0.55, `rgba(8, 10, 28, ${bgAlpha})`);
      backdrop.addColorStop(1, `rgba(3, 4, 14, ${bgAlpha})`);
      ctx.fillStyle = backdrop;
      ctx.fillRect(0, 0, width, height);

      // distant background stars, spanning the full viewport
      ctx.globalCompositeOperation = 'lighter';
      for (const s of bgStars) {
        const tw = s.baseOpacity + Math.sin(elapsed * s.twinkleSpeed + s.twinklePhase) * s.baseOpacity * 0.5;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(214, 224, 255, ${clamp01(tw)})`;
        ctx.fill();
      }

      // overall assembly progress (drives core glow + continuous slow spin)
      const assembly = clamp01((elapsed - ROAM_END) / (FORM_END - ROAM_END));
      const assemblyEased = easeOutCubic(assembly);
      const rotation = 1.05 * assemblyEased + Math.max(0, elapsed - ROAM_END) * 0.00014;

      // Nebula haze behind the galaxy — soft, additive, gently elliptical
      if (assemblyEased > 0.02) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, TILT);
        const haze = ctx.createRadialGradient(0, 0, 0, 0, 0, maxRadius * 1.15);
        haze.addColorStop(0, `rgba(120, 140, 255, ${0.26 * assemblyEased})`);
        haze.addColorStop(0.45, `rgba(80, 90, 200, ${0.14 * assemblyEased})`);
        haze.addColorStop(1, 'rgba(10, 12, 30, 0)');
        ctx.fillStyle = haze;
        ctx.beginPath();
        ctx.arc(0, 0, maxRadius * 1.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      for (const p of core) {
        const formStart = ROAM_END + p.formDelay;
        const formPhase = clamp01((elapsed - formStart) / Math.max(1, FORM_END - formStart));
        const eased = easeOutQuint(formPhase);

        const roamX = p.startX + Math.sin(elapsed * p.driftSpeed + p.driftPhase) * 18;
        const roamY = p.startY + Math.cos(elapsed * p.driftSpeed * 1.3 + p.driftPhase) * 18;

        const angle = p.baseAngle + rotation;
        const galaxyX = cx + p.radius * Math.cos(angle);
        const galaxyY = cy + p.radius * Math.sin(angle) * TILT;

        const px = lerp(roamX, galaxyX, eased);
        const py = lerp(roamY, galaxyY, eased);

        const twinkle = 0.6 + Math.sin(elapsed * p.twinkleSpeed + p.twinklePhase) * 0.3;
        const opacity = clamp01(twinkle * lerp(0.6, 1, eased));
        const size = p.size * lerp(1, 1.2, eased);

        const [r, g, b] = p.color;
        // cheap additive glow: a soft wide halo plus a crisp core dot —
        // avoids per-shape shadowBlur, which is far too costly at this count
        if (size > 1.1) {
          ctx.beginPath();
          ctx.arc(px, py, size * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${opacity * 0.22})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${opacity})`;
        ctx.fill();
      }

      // Glowing galactic core
      if (assemblyEased > 0.04) {
        const coreR = maxRadius * 0.2;
        const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
        coreGlow.addColorStop(0, `rgba(255, 248, 235, ${0.95 * assemblyEased})`);
        coreGlow.addColorStop(0.35, `rgba(255, 220, 170, ${0.55 * assemblyEased})`);
        coreGlow.addColorStop(1, 'rgba(255, 200, 140, 0)');
        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';

      // gentle vignette to draw focus to center
      const vignette = ctx.createRadialGradient(cx, cy, Math.max(width, height) * 0.35, cx, cy, Math.max(width, height) * 0.72);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, `rgba(2, 3, 10, ${0.55 * bgAlpha})`);
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      if (elapsed >= TEXT_AT && !textTriggered) {
        textTriggered = true;
        setShowText(true);
      }
      if (elapsed >= HOLD_END && !fadeTriggered) {
        fadeTriggered = true;
        setFading(true);
      }

      frameId = requestAnimationFrame(draw);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShowText(true);
      setFading(true);
    } else {
      frameId = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  useEffect(() => {
    if (!fading) return;
    const timeout = setTimeout(() => setVisible(false), FADE_DURATION);
    return () => clearTimeout(timeout);
  }, [fading]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#03040E] transition-opacity ease-out ${
        fading ? 'opacity-0 duration-[900ms]' : 'opacity-100 duration-300'
      }`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div
        className={`relative z-10 text-center px-6 transition-all duration-700 ease-out ${
          showText ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
        }`}
      >
        <span className="inline-block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-[0_0_50px_rgba(255,222,170,0.6)]">
          Rudra<span className="text-[#7FB1FF]">Ai</span>Hub
        </span>
        <p className="mt-3 text-xs sm:text-sm uppercase tracking-[0.4em] text-blue-200/80 font-bold">
          From Idea to AI Business
        </p>
      </div>
    </div>
  );
};
