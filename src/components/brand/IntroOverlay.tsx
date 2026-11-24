"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BrandIntro } from "./BrandIntro";

const INTRO_SEEN_KEY = "ar:intro:seen";

export function IntroOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(INTRO_SEEN_KEY) !== "1") {
        setVisible(true);
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const handleSkip = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Ignore storage access errors
    }
    setVisible(false);
  }, []);

  const handleFinish = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Ignore storage access errors
    }
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] bg-[#080B12] text-white flex items-center justify-center",
        "transition-opacity duration-500",
      )}
      aria-label="Introducción de la marca Anthony Rivera"
      aria-modal="true"
      role="dialog"
    >
      <BrandIntro onFinish={handleFinish} />

      <button
        onClick={handleSkip}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity underline underline-offset-4"
        aria-label="Saltar introducción"
      >
        Saltar intro
      </button>
    </div>
  );
}
