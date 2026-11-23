"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DRAW_MS = 5500;
const FILL_MS = 2500;
const HOLD_MS = 6000;
const REVEAL_MS = 1000;
const TOTAL_MS = DRAW_MS + FILL_MS + HOLD_MS + REVEAL_MS; // 15,000 ms (15s)
const INTRO_SEEN_KEY = "ar:intro:seen";

type Phase = "draw" | "fill" | "hold" | "reveal";

const DASH_ARRAY = "160";

const paths = [
  // A — triángulo exterior
  { d: "M18 58 L26 10 L36 58", group: "A" as const, delayMs: 0, durationMs: 1800 },
  // A — barra transversal
  { d: "M22 38 L30 38", group: "A" as const, delayMs: 1500, durationMs: 900 },
  // R — tallo vertical
  { d: "M36 58 L36 14", group: "R" as const, delayMs: 2200, durationMs: 1100 },
  // R — cuenco
  { d: "M36 14 Q44 14 44 26 Q44 36 36 36", group: "R" as const, delayMs: 3100, durationMs: 1200 },
  // R — pata
  { d: "M36 36 L46 58", group: "R" as const, delayMs: 4100, durationMs: 1200 },
] as const;

export function BrandIntro({ onFinish }: { onFinish: () => void }) {
  const onFinishRef = useRef(onFinish);
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const [phase, setPhase] = useState<Phase>("draw");
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const cancelledRef = useRef(false);

  const handleSkip = () => {
    cancelledRef.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    setPhase("reveal");
    setTimeout(() => onFinishRef.current(), 350);
  };

  useEffect(() => {
    if (sessionStorage.getItem(INTRO_SEEN_KEY) === "1") {
      onFinishRef.current();
      return undefined;
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      setTimeout(() => setPhase("fill"), 0);
      const t1 = setTimeout(() => setPhase("hold"), 100);
      const t2 = setTimeout(() => setPhase("reveal"), 1300);
      const t3 = setTimeout(() => onFinishRef.current(), 1900);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }

    cancelledRef.current = false;
    startRef.current = performance.now();

    const loop = (now: number) => {
      if (cancelledRef.current) return;
      const elapsed = now - startRef.current;
      setProgress(Math.min(100, (elapsed / TOTAL_MS) * 100));

      if (elapsed < DRAW_MS) {
        setPhase("draw");
        rafRef.current = requestAnimationFrame(loop);
      } else if (elapsed < DRAW_MS + FILL_MS) {
        setPhase("fill");
        rafRef.current = requestAnimationFrame(loop);
      } else if (elapsed < DRAW_MS + FILL_MS + HOLD_MS) {
        setPhase("hold");
        rafRef.current = requestAnimationFrame(loop);
      } else if (elapsed < TOTAL_MS) {
        setPhase("reveal");
        rafRef.current = requestAnimationFrame(loop);
      } else {
        sessionStorage.setItem(INTRO_SEEN_KEY, "1");
        onFinishRef.current();
      }
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelledRef.current = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isDrawing = phase === "draw";
  const isFilling = phase === "fill" || phase === "hold" || phase === "reveal";
  const isRevealing = phase === "reveal";

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] bg-[#080B12] text-white flex flex-col items-center justify-center overflow-hidden",
        isRevealing ? "opacity-0 transition-opacity duration-1000 pointer-events-none" : "opacity-100 transition-opacity duration-300",
      )}
      aria-label="Introducción de la marca Anthony Rivera"
      aria-live="polite"
    >
      <style>{`
        @keyframes ar-draw {
          from { stroke-dashoffset: ${DASH_ARRAY}; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes ar-pulse-glow {
          0%, 100% { opacity: 0.35; transform: scale(0.96); }
          50% { opacity: 0.65; transform: scale(1.04); }
        }
        .ar-path {
          stroke-dasharray: ${DASH_ARRAY};
          stroke-dashoffset: ${DASH_ARRAY};
          animation-name: ar-draw;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-fill-mode: forwards;
        }
        .ar-glow {
          animation: ar-pulse-glow 5s ease-in-out infinite;
        }
      `}</style>

      {/* Fondo arquitectónico sutil */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(22,136,248,0.16),_transparent_58%)] ar-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
        aria-hidden="true"
      />

      {/* Contenido del logo: monograma + nombre + descriptor */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center text-center gap-7 max-w-2xl px-6",
          isRevealing && "pointer-events-none",
        )}
      >
        {/* Monograma AR */}
        <div className="relative flex items-center justify-center">
          <div
            className={cn(
              "absolute inset-0 rounded-full bg-[#1688F8]/15 blur-2xl transition-opacity duration-1000",
              isFilling ? "opacity-100" : "opacity-40",
            )}
            aria-hidden="true"
          />
          <svg
            className="relative shrink-0 block w-36 h-36 sm:w-44 sm:h-44"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
          >
            {paths.map((p, i) => {
              const isA = p.group === "A";
              const drawColor = isA ? "#1688F8" : "#299BFF";
              const finalColor = isA ? "#FFFFFF" : "#299BFF";
              return (
                <path
                  key={i}
                  d={p.d}
                  stroke={isFilling ? finalColor : drawColor}
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  className="ar-path"
                  style={{
                    animationDuration: `${p.durationMs}ms`,
                    animationDelay: `${p.delayMs}ms`,
                    transition: "stroke 800ms ease",
                  }}
                />
              );
            })}
          </svg>
        </div>

        {/* Texto y descriptor (aparecen suavemente en la fase FILL) */}
        <div
          className={cn(
            "flex flex-col items-center gap-3 transition-all duration-1000",
            isFilling && !isDrawing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          )}
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-none text-white">
            Anthony Rivera
          </h2>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#299BFF] to-transparent my-1" />
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.26em] text-slate-400 font-medium">
            Software Developer &amp; Technology Partner
          </p>
        </div>
      </div>

      {/* Barra de progreso sutil y botón para saltar */}
      <div className="absolute bottom-8 left-6 right-6 z-20 flex items-center justify-between max-w-2xl mx-auto">
        <div className="flex-1 max-w-[180px] h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1688F8] to-[#299BFF] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <button
          type="button"
          onClick={handleSkip}
          className="text-xs font-medium text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-white/25 bg-white/5"
        >
          Saltar intro →
        </button>
      </div>
    </div>
  );
}
