export type Project = {
  id: string;
  name: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  type: string;
  image?: string;
  url?: string;
  demo: true;
};

export const projects: Project[] = [
  {
    id: "demo-001",
    name: "Plataforma de Gestión Empresarial",
    description:
      "Sistema administrativo para pymes que centraliza facturación, inventario y reportes en una sola interfaz.",
    problem:
      "La empresa gestionaba su operación en hojas de cálculo dispersas, sin visibilidad real de inventario ni finanzas.",
    solution:
      "Plataforma web con módulos de facturación, control de inventario y tablero de ejecutivos, construida con Next.js y PostgreSQL.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "TypeScript"],
    type: "Software empresarial",
    image: "https://images.unsplash.com/photo-1460925895917-afbe65ae8364?q=80&w=800&auto=format&fit=crop",
    url: undefined,
    demo: true,
  },
  {
    id: "demo-002",
    name: "Landing Page de Producto",
    description:
      "Landing page de alto conversión para una herramienta SaaS de productividad, con diseño responsivo y optimizada para SEO.",
    problem:
      "El cliente necesitaba validar su idea de producto y captar usuarios tempranos antes del lanzamiento oficial.",
    solution:
      "Landing page ligera y rápida con formularios de captura, integración con email y métricas de conversión.",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
    type: "Landing page",
    image: "https://images.unsplash.com/photo-1460925895917-afbe65ae8364?q=80&w=800&auto=format&fit=crop",
    url: undefined,
    demo: true,
  },
  {
    id: "demo-003",
    name: "App de Servicios Móviles",
    description:
      "Aplicación multiplataforma para agendamiento de servicios a domicilio con pagos integrados y notificaciones push.",
    problem:
      "El negocio operaba por llamadas y WhatsApp, sin sistema de citas ni trazabilidad de pagos.",
    solution:
      "App móvil en React Native conectada a backend en Node.js con pasarela de pagos y notificaciones en tiempo real.",
    technologies: ["React Native", "Node.js", "PostgreSQL", "Supabase"],
    type: "Aplicación móvil",
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
