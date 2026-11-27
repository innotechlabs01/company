"use client";

import { Controller, useForm } from "react-hook-form";
import { useMemo, useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sendQuoteRequest } from "@/app/actions/send-quote";
import { getDictionary, t } from "@/i18n/dictionary";
import { cn } from "@/lib/utils";

function createQuoteSchema(locale: "es" | "en") {
  const isEn = locale === "en";
  return z.object({
    fullName: z.string().min(2, isEn ? "Full name is required." : "El nombre es requerido."),
    email: z.string().email(isEn ? "Invalid email address." : "Correo inválido."),
    company: z.string().optional(),
    projectType: z.string().min(1, isEn ? "Select a project type." : "Selecciona un tipo de proyecto."),
    budget: z.string().optional(),
    timeline: z.string().min(1, isEn ? "Select an estimated timeline." : "Selecciona un tiempo estimado."),
    description: z.string().min(10, isEn ? "Description is too short (min. 10 characters)." : "La descripción es muy corta."),
    contactMethod: z.string().min(1, isEn ? "Select a contact method." : "Selecciona un medio de contacto."),
    honeypot: z.string().max(0, isEn ? "Invalid field." : "Campo no válido."),
  });
}

type QuoteFormValues = z.infer<ReturnType<typeof createQuoteSchema>>;

type QuoteFormProps = {
  locale: "es" | "en";
};

const projectTypes: Array<{ value: string }> = [
  { value: "website" },
  { value: "landing" },
  { value: "webApp" },
  { value: "mobileApp" },
  { value: "customSoftware" },
  { value: "inhouse" },
  { value: "longTerm" },
  { value: "other" },
];

const contactMethods: Array<{ value: string }> = [
  { value: "whatsapp" },
  { value: "email" },
  { value: "both" },
];

const budgetOptions: Array<{ value: string }> = [
  { value: "menos-5k" },
  { value: "5k-20k" },
  { value: "20k-50k" },
  { value: "mas-50k" },
];

const timelineOptions: Array<{ value: string }> = [
  { value: "1-mes" },
  { value: "3-meses" },
  { value: "6-meses" },
  { value: "12-meses" },
  { value: "en-curso" },
];

const fieldErrorIds: Record<string, string> = {
  fullName: "quote-error-fullName",
  email: "quote-error-email",
  company: "quote-error-company",
  projectType: "quote-error-projectType",
  budget: "quote-error-budget",
  timeline: "quote-error-timeline",
  description: "quote-error-description",
  contactMethod: "quote-error-contactMethod",
};

export function QuoteForm({ locale }: QuoteFormProps) {
  const dict = getDictionary(locale);
  const quoteSchema = useMemo(() => createQuoteSchema(locale), [locale]);
  const errorSummaryRef = useRef<HTMLHeadingElement>(null);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      timeline: "",
      description: "",
      contactMethod: "both",
      honeypot: "",
    },
  });

  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const invalidFields = Object.keys(errors) as (keyof QuoteFormValues)[];

  // Move focus to the error summary after a failed submit so screen reader
  // users find it immediately (UX guideline: focusable error summary).
  useEffect(() => {
    if (submitStatus === "error" && errorSummaryRef.current) {
      errorSummaryRef.current.focus();
    }
  }, [submitStatus]);

  const onSubmit = async (data: QuoteFormValues) => {
    // Honeypot anti-spam: si el campo oculto se llenó, no enviar.
    if (data.honeypot) {
      setSubmitStatus("idle");
      return;
    }
    setErrorMessage(null);
    try {
      const result = (await sendQuoteRequest(data)) as
        | { ok: true }
        | { ok: false; error: string }
        | { success?: boolean }
        | undefined;

      if (result && "ok" in result && !result.ok) {
        setErrorMessage(result.error);
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
        return;
      }

      reset();
      setSubmitStatus("success");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <Card className="p-8 md:p-12 border border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{t(dict, "contact.form.title", "Solicitud de cotización")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Honeypot anti-spam: campo oculto para bots. */}
          <input
            type="text"
            {...register("honeypot")}
            tabIndex={-1}
            autoComplete="off"
            style={{ display: "none", width: 0, height: 0, opacity: 0 }}
            aria-hidden="true"
          />
          {submitStatus === "success" && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm text-primary font-medium">
                {t(dict, "contact.form.success", "Mensaje enviado. Gracias por contactarme.")}
              </p>
            </div>
          )}
          {submitStatus === "error" && (
            <div
              className="rounded-lg border border-destructive/20 bg-destructive/5 p-4"
              role="alert"
              aria-live="polite"
            >
              <h2
                ref={errorSummaryRef}
                id="quote-error-summary"
                tabIndex={-1}
                className="text-sm text-destructive font-medium mb-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {t(dict, "contact.form.errorTitle", "Hubo problemas al enviar")}
              </h2>
              <p className="text-sm text-destructive mb-3">
                {errorMessage || t(dict, "contact.form.error", "Revisa los campos marcados e intenta de nuevo.")}
              </p>
              <ul className="text-sm text-destructive space-y-1 list-disc pl-5">
                {invalidFields.map((field) => (
                  <li key={field}>
                    <a
                      href={`#${fieldErrorIds[field]}`}
                      className="underline hover:text-destructive transition-colors"
                      onClick={() => {
                        const input = document.getElementById(`quote-${field}`);
                        input?.focus?.();
                      }}
                    >
                      {errors[field]?.message}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="quote-fullName">
                {t(dict, "contact.form.fullName", "Nombre completo")}
              </Label>
              <Input
                id="quote-fullName"
                {...register("fullName")}
                aria-describedby={errors.fullName ? fieldErrorIds.fullName : undefined}
                aria-invalid={!!errors.fullName}
                placeholder={t(dict, "contact.form.placeholders.fullName", "Juan Pérez")}
                className={cnInput(!!errors.fullName)}
              />
              {errors.fullName && (
                <p id={fieldErrorIds.fullName} className="text-xs text-destructive">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-email">
                {t(dict, "contact.form.email", "Correo electrónico")}
              </Label>
              <Input
                id="quote-email"
                {...register("email")}
                type="email"
                aria-describedby={errors.email ? fieldErrorIds.email : undefined}
                aria-invalid={!!errors.email}
                placeholder={t(dict, "contact.form.placeholders.email", "juan@empresa.com")}
                className={cnInput(!!errors.email)}
              />
              {errors.email && (
                <p id={fieldErrorIds.email} className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote-company">
              {t(dict, "contact.form.company", "Empresa")}
            </Label>
            <Input
              id="quote-company"
              {...register("company")}
              placeholder={t(dict, "contact.form.placeholders.company", "Mi empresa S.A.S. (opcional)")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote-projectType">
              {t(dict, "contact.form.projectType", "Tipo de proyecto")}
            </Label>
            <Controller
              control={control}
              name="projectType"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  aria-describedby={errors.projectType ? fieldErrorIds.projectType : undefined}
                  aria-invalid={!!errors.projectType}
                >
                  <SelectTrigger id="quote-projectType" className="w-full overflow-hidden [&>span]:truncate">
                    <SelectValue placeholder={t(dict, "contact.form.projectType", "Selecciona...")} />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {t(dict, `contact.projectTypes.${p.value}`, p.value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.projectType && (
              <p id={fieldErrorIds.projectType} className="text-xs text-destructive">
                {errors.projectType.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            <div className="space-y-2">
              <Label className="md:min-h-[2.25rem] flex items-end leading-snug" htmlFor="quote-budget">
                {t(dict, "contact.form.budget", "Presupuesto estimado")}
              </Label>
              <Controller
                control={control}
                name="budget"
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="quote-budget" className="w-full overflow-hidden [&>span]:truncate">
                      <SelectValue placeholder={t(dict, "contact.form.budget", "Opcional")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="opcional">
                        {t(dict, "contact.form.budget", "Opcional")}
                      </SelectItem>
                      {budgetOptions.map((b) => (
                        <SelectItem key={b.value} value={b.value}>
                          {t(dict, `contact.budget.${b.value}`, b.value)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label className="md:min-h-[2.25rem] flex items-end leading-snug" htmlFor="quote-timeline">
                {t(dict, "contact.form.timeline", "Tiempo estimado de ejecución")}
              </Label>
              <Controller
                control={control}
                name="timeline"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    aria-describedby={errors.timeline ? fieldErrorIds.timeline : undefined}
                    aria-invalid={!!errors.timeline}
                  >
                    <SelectTrigger id="quote-timeline" className="w-full overflow-hidden [&>span]:truncate">
                      <SelectValue placeholder={t(dict, "contact.form.timeline", "Selecciona...")} />
                    </SelectTrigger>
                    <SelectContent>
                      {timelineOptions.map((tl) => (
                        <SelectItem key={tl.value} value={tl.value}>
                          {t(dict, `contact.timeline.${tl.value}`, tl.value)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.timeline && (
                <p id={fieldErrorIds.timeline} className="text-xs text-destructive">
                  {errors.timeline.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote-description">
              {t(dict, "contact.form.description", "Descripción del proyecto")}
            </Label>
            <Textarea
              id="quote-description"
              {...register("description")}
              aria-describedby={errors.description ? fieldErrorIds.description : undefined}
              aria-invalid={!!errors.description}
              placeholder={t(dict, "contact.form.placeholders.description", "Cuéntame qué quieres construir, los objetivos y cualquier detalle relevante.")}
              rows={5}
              className={cnInput(!!errors.description)}
            />
            {errors.description && (
              <p id={fieldErrorIds.description} className="text-xs text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote-contactMethod">
              {t(dict, "contact.form.contactMethod", "Medio de contacto preferido")}
            </Label>
            <Controller
              control={control}
              name="contactMethod"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  aria-describedby={errors.contactMethod ? fieldErrorIds.contactMethod : undefined}
                  aria-invalid={!!errors.contactMethod}
                >
                  <SelectTrigger id="quote-contactMethod">
                    <SelectValue placeholder={t(dict, "contact.form.contactMethod", "Selecciona...")} />
                  </SelectTrigger>
                  <SelectContent>
                    {contactMethods.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {t(dict, `contact.contactMethods.${m.value}`, m.value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.contactMethod && (
              <p id={fieldErrorIds.contactMethod} className="text-xs text-destructive">
                {errors.contactMethod.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting
              ? t(dict, "contact.form.sending", "Enviando...")
              : t(dict, "contact.form.submit", "Enviar solicitud")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function cnInput(error?: boolean) {
  return cn(
    "rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    error && "border-destructive",
  );
}
