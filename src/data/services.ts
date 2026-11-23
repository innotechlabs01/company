export type Service = {
  slug: string;
  name: Record<"es" | "en", string>;
  description: Record<"es" | "en", string>;
  problem: Record<"es" | "en", string>;
  deliverables: Record<"es" | "en", string[]>;
  process: Record<"es" | "en", string[]>;
  timeline: Record<"es" | "en", string>;
  cta: Record<"es" | "en", string>;
};

export const services: Service[] = [
  {
    slug: "web",
    name: {
      es: "Desarrollo Web",
      en: "Web Development",
    },
    description: {
      es:
        "Sitios corporativos, landing pages, e-commerce, portales y aplicaciones web modernas y optimizadas.",
      en:
        "Corporate websites, landing pages, e-commerce, portals, and modern web applications optimized for performance.",
    },
    problem: {
      es:
        "Tu negocio necesita presencia digital profesional que convierta visitantes en clientes.",
      en:
        "Your business needs a professional digital presence that converts visitors into customers.",
    },
    deliverables: {
      es: [
        "Sitio web responsive y rápido",
        "SEO técnico optimizado",
        "Panel de administración (opcional)",
        "Integración con analíticas",
      ],
      en: [
        "Responsive and fast website",
        "Technical SEO optimization",
        "Admin panel (optional)",
        "Analytics integration",
      ],
    },
    process: {
      es: ["Descubrimiento", "Diseño UX/UI", "Desarrollo", "Pruebas", "Despliegue"],
      en: ["Discovery", "UX/UI Design", "Development", "Testing", "Deployment"],
    },
    timeline: {
      es: "2 a 6 semanas",
      en: "2 to 6 weeks",
    },
    cta: {
      es: "Hablemos de tu sitio web",
      en: "Let's talk about your website",
    },
  },
  {
    slug: "custom-software",
    name: {
      es: "Software a Medida",
      en: "Custom Software",
    },
    description: {
      es:
        "Sistemas empresariales, ERP y CRM, automatización de procesos e integraciones de servicios diseñados a tu medida.",
      en:
        "Enterprise systems, ERP and CRM, process automation, and service integrations designed to your measure.",
    },
    problem: {
      es:
        "Tus procesos operativos están desconectados y necesitas un sistema que los una.",
      en:
        "Your operational processes are disconnected and you need a system that unifies them.",
    },
    deliverables: {
      es: [
        "Sistema web o desktop a medida",
        "Base de datos y API",
        "Panel de control y reportes",
        "Documentación técnica",
      ],
      en: [
        "Custom web or desktop system",
        "Database and API",
        "Control panel and reports",
        "Technical documentation",
      ],
    },
    process: {
      es: ["Análisis de requisitos", "Arquitectura", "Desarrollo", "Implantación", "Soporte"],
      en: ["Requirements analysis", "Architecture", "Development", "Implementation", "Support"],
    },
    timeline: {
      es: "8 a 20 semanas",
      en: "8 to 20 weeks",
    },
    cta: {
      es: "Solicitar software a medida",
      en: "Request custom software",
    },
  },
  {
    slug: "mobile",
    name: {
      es: "Aplicaciones Móviles",
      en: "Mobile Applications",
    },
    description: {
      es:
        "Aplicaciones iOS y Android, experiencias multiplataforma y soluciones móviles conectadas a servicios backend.",
      en:
        "iOS and Android applications, cross-platform experiences, and mobile solutions connected to backend services.",
    },
    problem: {
      es:
        "Tus clientes esperan interactuar con tu negocio desde sus dispositivos móviles.",
      en:
        "Your customers expect to interact with your business from their mobile devices.",
    },
    deliverables: {
      es: [
        "App nativa o multiplataforma",
        "Backend y API",
        "Publicación en tiendas (App Store / Google Play)",
        "Notificaciones push",
      ],
      en: [
        "Native or cross-platform app",
        "Backend and API",
        "Store publishing (App Store / Google Play)",
        "Push notifications",
      ],
    },
    process: {
      es: ["Diseño UX móvil", "Desarrollo", "Pruebas en dispositivos", "Publicación", "Mantenimiento"],
      en: ["Mobile UX design", "Development", "Device testing", "Publishing", "Maintenance"],
    },
    timeline: {
      es: "6 a 16 semanas",
      en: "6 to 16 weeks",
    },
    cta: {
      es: "Hablar de tu app móvil",
      en: "Talk about your mobile app",
    },
  },
  {
    slug: "inhouse",
    name: {
      es: "Proyectos In-house",
      en: "In-house Projects",
    },
    description: {
      es:
        "Desarrollo de equipos y productos internos, evolución de plataformas existentes, arquitectura de software y acompañamiento técnico.",
      en:
        "Development of teams and internal products, evolution of existing platforms, software architecture, and technical accompaniment.",
    },
    problem: {
      es:
        "Necesitas capacidad de desarrollo interna sin los tiempos de contratación tradicionales.",
      en:
        "You need internal development capacity without traditional hiring timelines.",
    },
    deliverables: {
      es: [
        "Equipo de desarrollo dedicado",
        "Evolución de plataforma existente",
        "Arquitectura de software",
        "Acompañamiento técnico continuo",
      ],
      en: [
        "Dedicated development team",
        "Existing platform evolution",
        "Software architecture",
        "Ongoing technical accompaniment",
      ],
    },
    process: {
      es: ["Integración al equipo", "Definición de roadmap", "Desarrollo continuo", "Revisión de sprints"],
      en: ["Team integration", "Roadmap definition", "Continuous development", "Sprint reviews"],
    },
    timeline: {
      es: "Indefinido (por meses)",
      en: "Indefinite (monthly)",
    },
    cta: {
      es: "Solicitar equipo in-house",
      en: "Request in-house team",
    },
  },
  {
    slug: "long-term",
    name: {
      es: "Proyectos de Largo Plazo",
      en: "Long-term Projects",
    },
    description: {
      es:
        "Desarrollo por fases, evolución continua, mantenimiento y escalabilidad para plataformas tecnológicas de largo recorrido.",
      en:
        "Phased development, continuous evolution, maintenance, and scalability for long-term technology platforms.",
    },
    problem: {
      es:
        "Tu plataforma tecnológica necesita crecer y evolucionar sin interrupciones.",
      en:
        "Your technology platform needs to grow and evolve without interruptions.",
    },
    deliverables: {
      es: [
        "Hoja de ruta por fases",
        "Mantenimiento evolutivo",
        "Escalabilidad de infraestructura",
        "Nuevas funcionalidades periódicas",
      ],
      en: [
        "Phased roadmap",
        "Evolutionary maintenance",
        "Infrastructure scalability",
        "Periodic new features",
      ],
    },
    process: {
      es: ["Planificación por fases", "Desarrollo incremental", "Mantenimiento", "Optimización continua"],
      en: ["Phased planning", "Incremental development", "Maintenance", "Continuous optimization"],
    },
    timeline: {
      es: "6 meses o más",
      en: "6 months or more",
    },
    cta: {
      es: "Planificar proyecto a largo plazo",
      en: "Plan long-term project",
    },
  },
  {
    slug: "consulting",
    name: {
      es: "Consultoría Tecnológica",
      en: "Technology Consulting",
    },
    description: {
      es:
        "Evaluación técnica, selección de tecnologías, diseño de arquitectura y estrategia de implementación para tu negocio.",
      en:
        "Technical evaluation, technology selection, software architecture design, and implementation strategy for your business.",
    },
    problem: {
      es:
        "No sabes qué tecnología elegir ni cómo arquitecturar tu solución.",
      en:
        "You don't know what technology to choose or how to architect your solution.",
    },
    deliverables: {
      es: [
        "Evaluación técnica",
        "Diseño de arquitectura",
        "Estrategia de implementación",
        "Hoja de ruta tecnológica",
      ],
      en: [
        "Technical evaluation",
        "Software architecture design",
        "Implementation strategy",
        "Technology roadmap",
      ],
    },
    process: {
      es: ["Auditoría", "Recomendación", "Diseño de arquitectura", "Plan de implementación"],
      en: ["Audit", "Recommendation", "Architecture design", "Implementation plan"],
    },
    timeline: {
      es: "1 a 4 semanas",
      en: "1 to 4 weeks",
    },
    cta: {
      es: "Solicitar consultoría",
      en: "Request consulting",
    },
  },
] as const;

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
