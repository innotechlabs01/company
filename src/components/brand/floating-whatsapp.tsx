"use client";

import Link from "next/link";
import { Send } from "lucide-react";

export function FloatingWhatsApp() {
  const whatsappMessage =
    "Hola Anthony, estoy interesado en conocer más sobre tus servicios.";
  const whatsappUrl = `https://wa.me/573128386640?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-[60] flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      aria-label="Contactar por WhatsApp"
    >
      <Send className="h-5 w-5" aria-hidden="true" />
      <span className="text-sm font-medium hidden sm:block">WhatsApp</span>
    </Link>
  );
}
