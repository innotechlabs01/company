"use client";

import { useEffect, useRef } from "react";

const DRAW_DURATION_MS = 950;
const FILL_START_MS = 1350;
const FILL_DURATION_MS = 600;
const HOLD_END_MS = 2550;
const REVEAL_END_MS = 3050;
const INTRO_SEEN_KEY = "ar:intro:seen";

const CONTOURS = [
  // A — triángulo exterior
  { d: "M18 58 L26 10 L36 58", group: "A" as const, delayMs: 0 },
  // A — barra transversal
  { d: "M22 38 L30 38", group: "A" as const, delayMs: 90 },
  // R — tallo vertical
  { d: "M36 58 L36 14", group: "R" as const, delayMs: 180 },
  // R — cuenco
  { d: "M36 14 Q44 14 44 26 Q44 36 36 36", group: "R" as const, delayMs: 270 },
  // R — pata
  { d: "M36 36 L46 58", group: "R" as const, delayMs: 360 },
] as const;

function clamp01(v: number): number {
  return v <= 0 ? 0 : v >= 1 ? 1 : v;
}

function easeCosine(v: number): number {
  return 0.5 - 0.5 * Math.cos(Math.PI * clamp01(v));
}

export function BrandIntro({ onFinish }: { onFinish: () => void }) {
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const outlineRefs = useRef<(SVGPathElement | null)[]>([]);
  const outlineGroupRef = useRef<SVGGElement | null>(null);
  const filledGroupRef = useRef<SVGGElement | null>(null);
  const wordmarkRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const rafRef = useRef<number | null>(null);
  const finishedRef = useRef(false);

  const finishIntro = (immediate = false) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Ignore storage access errors
    }
    if (immediate) {
      onFinishRef.current();
      return;
    }
    if (containerRef.current) {
      containerRef.current.style.transition = "opacity 320ms ease-out";
      containerRef.current.style.opacity = "0";
      containerRef.current.style.pointerEvents = "none";
    }
    window.setTimeout(() => onFinishRef.current(), 330);
  };

  useEffect(() => {
    finishedRef.current = false;

    // Measure exact path lengths in SVG coordinate space
    const lengths = CONTOURS.map((_, i) => {
      const el = outlineRefs.current[i];
      if (!el) return 160;
      const len = el.getTotalLength();
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      return len;
    });

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      // Show completed logo immediately, then fade out gently
      if (outlineGroupRef.current) outlineGroupRef.current.style.opacity = "0";
      if (filledGroupRef.current) filledGroupRef.current.style.opacity = "1";
      if (wordmarkRef.current) {
        wordmarkRef.current.style.opacity = "1";
        wordmarkRef.current.style.transform = "translateY(0)";
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = "scaleX(1)";
      }
      const t = window.setTimeout(() => finishIntro(false), 900);
      return () => window.clearTimeout(t);
    }

    let elapsed = 0;
    let lastTime = performance.now();
    let hidden = document.hidden;

    const applyFrame = (ms: number) => {
      // 1. Progress bar (compositor-only scaleX, zero layout thrash)
      if (progressBarRef.current) {
        const pct = clamp01(ms / REVEAL_END_MS);
        progressBarRef.current.style.transform = `scaleX(${pct})`;
      }

      // 2. DRAW phase: staggered stroke-dashoffset with cosine easing
      for (let i = 0; i < CONTOURS.length; i++) {
        const el = outlineRefs.current[i];
        if (!el) continue;
        const localT = (ms - CONTOURS[i].delayMs) / DRAW_DURATION_MS;
        const eased = easeCosine(localT);
        el.style.strokeDashoffset = `${lengths[i] * (1 - eased)}`;
      }

      // 3. FILL phase: crossfade outline -> filled + reveal wordmark
      const fillEased = easeCosine((ms - FILL_START_MS) / FILL_DURATION_MS);
      if (outlineGroupRef.current) {
        outlineGroupRef.current.style.opacity = `${1 - fillEased}`;
      }
      if (filledGroupRef.current) {
        filledGroupRef.current.style.opacity = `${fillEased}`;
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = `${0.25 + 0.75 * fillEased}`;
      }
      if (wordmarkRef.current) {
        wordmarkRef.current.style.opacity = `${fillEased}`;
        wordmarkRef.current.style.transform = `translateY(${(1 - fillEased) * 10}px)`;
      }

      // 4. REVEAL phase: fade entire overlay cleanly
      if (ms >= HOLD_END_MS && containerRef.current) {
        const revealEased = easeCosine(
          (ms - HOLD_END_MS) / (REVEAL_END_MS - HOLD_END_MS),
        );
        containerRef.current.style.opacity = `${1 - revealEased}`;
        if (revealEased > 0.1) {
          containerRef.current.style.pointerEvents = "none";
        }
      }
    };

    const tick = (now: number) => {
      if (finishedRef.current) return;
      if (!hidden) {
        elapsed += Math.min(now - lastTime, 50);
      }
      lastTime = now;

      applyFrame(elapsed);

      if (elapsed >= REVEAL_END_MS) {
        finishIntro(true);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const handleVisibility = () => {
      hidden = document.hidden;
      lastTime = performance.now();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#080B12] text-white flex flex-col items-center justify-center overflow-hidden select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Introducción de la marca Anthony Rivera"
    >
      {/* Fondo arquitectónico sutil */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(22,136,248,0.16),_transparent_58%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
        aria-hidden="true"
      />

      {/* Logo lockup */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-2xl px-6">
        <div className="relative flex items-center justify-center">
          <div
            ref={glowRef}
            className="absolute inset-0 rounded-full bg-[#1688F8]/20 blur-2xl"
            style={{ opacity: 0.25 }}
            aria-hidden="true"
          />
          <svg
            className="relative shrink-0 block w-32 h-32 sm:w-40 sm:h-40"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
          >
            {/* Drawing outlines */}
            <g ref={outlineGroupRef} style={{ opacity: 1 }}>
              {CONTOURS.map((p, i) => (
                <path
                  key={`outline-${i}`}
                  ref={(el) => {
                    outlineRefs.current[i] = el;
                  }}
                  d={p.d}
                  stroke={p.group === "A" ? "#F5EDDE" : "#60B2FF"}
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              ))}
            </g>

            {/* Filled / final color state */}
            <g ref={filledGroupRef} style={{ opacity: 0 }}>
              {CONTOURS.map((p, i) => (
                <path
                  key={`filled-${i}`}
                  d={p.d}
                  stroke={p.group === "A" ? "#FFFFFF" : "#299BFF"}
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              ))}
            </g>
          </svg>
        </div>

        {/* Wordmark */}
        <div
          ref={wordmarkRef}
          className="flex flex-col items-center gap-2.5 will-change-transform"
          style={{ opacity: 0, transform: "translateY(10px)" }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-none text-white">
            Anthony Rivera
          </h2>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#299BFF] to-transparent my-0.5" />
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.26em] text-slate-400 font-medium font-mono">
            Software Developer &amp; Technology Partner
          </p>
        </div>
      </div>

      {/* Barra de progreso GPU (scaleX) + botón saltar */}
      <div className="absolute bottom-8 left-6 right-6 z-20 flex items-center justify-between max-w-2xl mx-auto">
        <div className="flex-1 max-w-[160px] h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left bg-gradient-to-r from-[#1688F8] to-[#299BFF] will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <button
          type="button"
          onClick={() => finishIntro(false)}
          className="text-xs font-medium text-slate-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#299BFF] transition-colors px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/25 bg-white/5"
        >
          Saltar intro →
        </button>
      </div>
    </div>
  );
}
