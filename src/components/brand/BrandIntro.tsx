"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DRAW_MS = 2300;
const FILL_MS = 700;
const HOLD_MS = 1200;
const REVEAL_MS = 600;
const INTRO_SEEN_KEY = "ar:intro:seen";

type Phase = "draw" | "fill" | "hold" | "reveal";

// Longitud aproximada de cada trazo del monograma (viewBox 0 0 64 64, stroke-width 4).
// Suficiente para cubrir cada path completo en stroke-dasharray.
const DASH_ARRAY = "1000";

const paths = [
  // A — triángulo exterior
  { d: "M18 58 L26 10 L36 58", group: "A" as const },
  // A — barra transversal
  { d: "M22 38 L30 38", group: "A" as const },
  // R — tallo vertical
  { d: "M36 58 L36 14", group: "R" as const },
  // R — cuenco
  { d: "M36 14 Q44 14 44 26 Q44 36 36 36", group: "R" as const },
  // R — pata
  { d: "M36 36 L46 58", group: "R" as const },
] as const;

export function BrandIntro({ onFinish }: { onFinish: () => void }) {
  const onFinishRef = useRef(onFinish);
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);
  const [phase, setPhase] = useState<Phase>("draw");
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const cancelledRef = useRef(false);

  useEffect(() => {
    // Una sola vez por sesión de navegación.
    if (sessionStorage.getItem(INTRO_SEEN_KEY) === "1") {
      onFinishRef.current();
      return undefined;
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = mq.matches;

    if (reduced) {
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
      const total = DRAW_MS + FILL_MS + HOLD_MS + REVEAL_MS;

      if (elapsed < DRAW_MS) {
        setPhase("draw");
        rafRef.current = requestAnimationFrame(loop);
      } else if (elapsed < DRAW_MS + FILL_MS) {
        setPhase("fill");
        rafRef.current = requestAnimationFrame(loop);
      } else if (elapsed < DRAW_MS + FILL_MS + HOLD_MS) {
        setPhase("hold");
        rafRef.current = requestAnimationFrame(loop);
      } else if (elapsed < total) {
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
  const isFilling = phase === "fill" || phase === "hold";
  const isRevealing = phase === "reveal";

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] bg-[#080B12] text-white flex items-center justify-center",
        isRevealing && "opacity-0 transition-opacity duration-500 pointer-events-none",
        !isRevealing && "transition-opacity duration-300",
      )}
      aria-label="Introducción de la marca Anthony Rivera"
      aria-live="polite"
    >
      <style>{`
        @keyframes ar-draw {
          to { stroke-dashoffset: 0; }
        }
        .ar-path {
          stroke-dasharray: ${DASH_ARRAY};
          stroke-dashoffset: ${DASH_ARRAY};
        }
        .ar-path.drawing {
          animation: ar-draw ${DRAW_MS}ms ease-out forwards;
        }
        .ar-text {
          opacity: 0;
          transition: opacity 500ms ease;
        }
        .ar-text.visible {
          opacity: 1;
        }
        .ar-descriptor {
          opacity: 0;
          transition: opacity 600ms ease;
        }
        .ar-descriptor.visible {
          opacity: 1;
        }
      `}</style>

      {/* Contenido del logo: monograma + nombre + descriptor */}
      <div
        className={cn(
          "relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 max-w-[520px] px-6",
          isRevealing && "pointer-events-none",
        )}
      >
        {/* Monograma AR */}
        <svg
          className="shrink-0 block"
          width={260}
          height={260}
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
        >
          {paths.map((p, i) => {
            const isA = p.group === "A";
            const finalColor = isA ? "#FFFFFF" : "#299BFF";
            return (
              <path
                key={i}
                d={p.d}
                stroke={isDrawing ? (isA ? "#1688F8" : "#299BFF") : finalColor}
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className={cn("ar-path", isDrawing && "drawing")}
                style={{
                  // A: blanco en fill; R: azul eléctrico
                  transition: isFilling ? "stroke 400ms ease" : "none",
                  stroke: isFilling ? finalColor : (isA ? "#1688F8" : "#299BFF"),
                }}
              />
            );
          })}
        </svg>

        {/* Texto y descriptor (aparecen en la fase FILL) */}
        <div
          className={cn(
            "flex flex-col items-start lg:items-center gap-2",
            isFilling ? "ar-text visible" : "ar-text",
          )}
        >
          <h2
            className="text-3xl lg:text-4xl font-bold tracking-tight leading-none"
            style={{ color: isFilling ? "#FFFFFF" : "transparent" }}
          >
            Anthony Rivera
          </h2>
          <p
            className="text-xs lg:text-sm uppercase tracking-widest leading-none"
            style={{ color: isFilling ? "#94A3B8" : "transparent" }}
          >
            Software Developer &amp; Technology Partner
          </p>
        </div>
      </div>
    </div>
  );
}
