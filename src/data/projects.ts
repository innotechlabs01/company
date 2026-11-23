import type { Locale } from "@/i18n/dictionary";

export type LocalizedText = Record<Locale, string>;

export type Project = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
  technologies: string[];
  type: LocalizedText;
  image?: string;
  url?: string;
  demo: boolean;
};

export const projects: Project[] = [
  {
    id: "demo-001",
    name: {
      es: "Plataforma de Gestión Empresarial",
      en: "Business Management Platform",
    },
    description: {
      es: "Sistema administrativo para pymes que centraliza facturación, inventario y reportes en una sola interfaz.",
      en: "Administrative system for SMBs that centralizes invoicing, inventory, and reporting in a single interface.",
    },
    problem: {
      es: "La empresa gestionaba su operación en hojas de cálculo dispersas, sin visibilidad real de inventario ni finanzas.",
      en: "The company managed its operations across scattered spreadsheets, with no real-time visibility into inventory or finances.",
    },
    solution: {
      es: "Plataforma web con módulos de facturación, control de inventario y tablero ejecutivo, construida con Next.js y PostgreSQL.",
      en: "Web platform featuring invoicing, inventory control, and an executive dashboard, built with Next.js and PostgreSQL.",
    },
    technologies: ["Next.js", "Node.js", "PostgreSQL", "TypeScript"],
    type: {
      es: "Software empresarial",
      en: "Enterprise software",
    },
    image: "https://images.unsplash.com/photo-1460925895917-afbe65ae8364?q=80&w=800&auto=format&fit=crop",
    url: undefined,
    demo: true,
  },
  {
    id: "demo-002",
    name: {
      es: "Landing Page de Producto",
      en: "Product Landing Page",
    },
    description: {
      es: "Landing page de alta conversión para una herramienta SaaS de productividad, con diseño responsivo y optimizada para SEO.",
      en: "High-converting landing page for a SaaS productivity tool, featuring responsive design and SEO optimization.",
    },
    problem: {
      es: "El cliente necesitaba validar su idea de producto y captar usuarios tempranos antes del lanzamiento oficial.",
      en: "The client needed to validate their product idea and capture early adopters ahead of the official launch.",
    },
    solution: {
      es: "Landing page ligera y rápida con formularios de captura, integración con email y métricas de conversión.",
      en: "Fast, lightweight landing page with lead-capture forms, email integration, and conversion tracking.",
    },
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
    type: {
      es: "Landing page",
      en: "Landing page",
    },
    image: "https://images.unsplash.com/photo-1460925895917-afbe65ae8364?q=80&w=800&auto=format&fit=crop",
    url: undefined,
    demo: true,
  },
  {
    id: "demo-003",
    name: {
      es: "App de Servicios Móviles",
      en: "Mobile Services App",
    },
    description: {
      es: "Aplicación multiplataforma para agendamiento de servicios a domicilio con pagos integrados y notificaciones push.",
      en: "Cross-platform app for booking on-demand home services with integrated payments and push notifications.",
    },
    problem: {
      es: "El negocio operaba por llamadas y WhatsApp, sin sistema de citas ni trazabilidad de pagos.",
      en: "The business operated via phone calls and WhatsApp, with no scheduling system or payment tracking.",
    },
    solution: {
      es: "App móvil en React Native conectada a backend en Node.js con pasarela de pagos y notificaciones en tiempo real.",
      en: "React Native mobile app connected to a Node.js backend with a payment gateway and real-time notifications.",
    },
    technologies: ["React Native", "Node.js", "PostgreSQL", "Supabase"],
    type: {
      es: "Aplicación móvil",
      en: "Mobile application",
    },
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    url: undefined,
    demo: true,
  },
];

/**
 * Para agregar proyectos reales, copia este objeto y reemplaza los valores.
 * Marca `demo: false` solo cuando el proyecto sea real y esté autorizado para publicar.
 *
 * Ejemplo:
 * {
 *   id: "proyecto-real-001",
 *   name: "Nombre del proyecto",
 *   description: "...",
 *   problem: "...",
 *   solution: "...",
 *   technologies: ["React", "Next.js", "PostgreSQL"],
 *   type: "Desarrollo Web",
 *   image: "/images/proyecto.jpg",
 *   url: "https://proyecto.com",
 *   demo: false,
 * }
 */
