export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  projectType: string;
  date: string; // ISO date string
  relatedProject?: string;
  url?: string;
  language: "es" | "en";
  featured: boolean;
  avatarUrl?: string;
  avatarAuthorized: boolean;
  demo: true; // siempre true hasta que haya testimonios reales verificados
};

export const testimonials: Testimonial[] = [
  {
    id: "demo-001",
    name: "Cliente Demo",
    role: "Co-fundador",
    company: "Startup Tecnológica",
    content:
      "Excelente trabajo en el desarrollo de nuestra plataforma. Entendieron el negocio a la perfección y entregaron una solución escalable y funcional.",
    projectType: "Software empresarial",
    date: "2024-11-01",
    relatedProject: "Plataforma de gestión empresarial",
    url: undefined,
    language: "es",
    featured: true,
    avatarUrl: undefined,
    avatarAuthorized: false,
    demo: true,
  },
  {
    id: "demo-002",
    name: "Demo Client",
    role: "CTO",
    company: "E-commerce Company",
    content:
      "Outstanding work developing our web application. Professional, timely, and technically sound. Highly recommended.",
    projectType: "Aplicación web",
    date: "2024-10-15",
    relatedProject: "Tienda en línea",
    url: undefined,
    language: "en",
    featured: true,
    avatarUrl: undefined,
    avatarAuthorized: false,
    demo: true,
  },
  {
    id: "demo-003",
    name: "Cliente Demo",
    role: "Director de Operaciones",
    company: "Consultora",
    content:
      "Nos acompañaron en la modernización de nuestro software administrativo. El equipo fue claro, puntual y resolutivo en cada etapa.",
    projectType: "Modernización de software",
    date: "2024-09-20",
    relatedProject: "Sistema administrativo",
    url: undefined,
    language: "es",
    featured: false,
    avatarUrl: undefined,
    avatarAuthorized: false,
    demo: true,
  },
  {
    id: "demo-004",
    name: "Demo Client",
    role: "Product Manager",
    company: "App Móvil",
    content:
      "Great experience building our mobile app. The multiplatform experience works flawlessly on iOS and Android.",
    projectType: "Aplicación móvil",
    date: "2024-08-10",
    relatedProject: "App de servicios",
    url: undefined,
    language: "en",
    featured: false,
    avatarUrl: undefined,
    avatarAuthorized: false,
    demo: true,
  },
];

export const featuredTestimonials = testimonials.filter((t) => t.featured);

export const projectTypeOptions = [
  { value: "web", label: "Desarrollo web" },
  { value: "apps", label: "Aplicaciones" },
  { value: "enterprise", label: "Software empresarial" },
  { value: "inhouse", label: "Proyectos In-house" },
  { value: "consulting", label: "Consultoría" },
  { value: "other", label: "Otros proyectos" },
];
