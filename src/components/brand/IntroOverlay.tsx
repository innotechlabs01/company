"use client";

import { useCallback, useEffect, useState } from "react";
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

  const handleFinish = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Ignore storage access errors
    }
    setVisible(false);
  }, []);

  if (!visible) return null;

  return <BrandIntro onFinish={handleFinish} />;
}
