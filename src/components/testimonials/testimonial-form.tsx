"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitTestimonial } from "@/app/actions/submit-testimonial";
import type { Locale } from "@/i18n/dictionary";

const PROJECT_TYPES = {
  es: [
    { value: "web", label: "Desarrollo web" },
    { value: "apps", label: "Aplicaciones" },
    { value: "enterprise", label: "Software empresarial" },
    { value: "inhouse", label: "Proyectos In-house" },
    { value: "consulting", label: "Consultoría" },
    { value: "other", label: "Otro proyecto" },
  ],
  en: [
    { value: "web", label: "Web development" },
    { value: "apps", label: "Applications" },
    { value: "enterprise", label: "Enterprise software" },
    { value: "inhouse", label: "In-house projects" },
    { value: "consulting", label: "Consulting" },
    { value: "other", label: "Other project" },
  ],
} as const;

export function TestimonialForm({ locale }: { locale: Locale }) {
  const isEn = locale === "en";
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState<
    "web" | "apps" | "enterprise" | "inhouse" | "consulting" | "other"
  >("web");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await submitTestimonial({
        name,
        role,
        company,
        project_type: projectType,
        url,
        content,
        language: locale,
      });

      if (result.ok) {
        setSubmitted(true);
      } else {
        setError(result.error);
      }
    });
  };

  if (submitted) {
    return (
      <Card className="border-border/80 bg-card shadow-sm">
        <CardContent className="p-8 sm:p-10 text-center space-y-5">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {isEn ? "Thank you for your testimonial!" : "¡Gracias por tu testimonio!"}
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {isEn
                ? "Your feedback has been recorded. We truly appreciate you taking the time to share your experience."
                : "Tu experiencia ha sido registrada correctamente. Muchas gracias por tomarte el tiempo de compartirla."}
            </p>
          </div>
          <div className="pt-2">
            <Button asChild variant="outline">
              <Link href={`/${locale}/testimonios`}>
                {isEn ? "View testimonials" : "Ver testimonios"}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/80 bg-card shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold">
          {isEn ? "Share your experience" : "Comparte tu experiencia"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="t-name">
                {isEn ? "Full name *" : "Nombre completo *"}
              </Label>
              <Input
                id="t-name"
                required
                minLength={2}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isEn ? "Jane Doe" : "María González"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="t-role">
                {isEn ? "Role / Title *" : "Cargo / Rol *"}
              </Label>
              <Input
                id="t-role"
                required
                minLength={2}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder={isEn ? "CTO / Product Lead" : "CTO / Directora de Producto"}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="t-company">
                {isEn ? "Company *" : "Empresa *"}
              </Label>
              <Input
                id="t-company"
                required
                minLength={1}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Corp"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="t-type">
                {isEn ? "Project type *" : "Tipo de proyecto *"}
              </Label>
              <select
                id="t-type"
                value={projectType}
                onChange={(e) =>
                  setProjectType(
                    e.target.value as
                      | "web"
                      | "apps"
                      | "enterprise"
                      | "inhouse"
                      | "consulting"
                      | "other",
                  )
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {PROJECT_TYPES[locale].map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="t-url">
              {isEn ? "Website or LinkedIn (optional)" : "Sitio web o LinkedIn (opcional)"}
            </Label>
            <Input
              id="t-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="t-content">
              {isEn ? "Your testimonial *" : "Tu testimonio *"}
            </Label>
            <Textarea
              id="t-content"
              required
              minLength={20}
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                isEn
                  ? "Tell us about the challenge we solved, how it was working together, and the results achieved..."
                  : "Cuéntanos qué reto resolvimos, cómo fue la experiencia de trabajo y los resultados obtenidos..."
              }
            />
          </div>

          {error && (
            <p className="text-sm text-destructive font-medium" role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {isEn ? "Submitting..." : "Enviando..."}
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                {isEn ? "Submit testimonial" : "Enviar testimonio"}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
