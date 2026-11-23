"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
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

const quoteSchema = z.object({
  fullName: z.string().min(2, t_dict_es("El nombre es requerido.")),
  email: z.string().email(t_dict_es("Correo inválido.")),
  company: z.string().optional(),
  projectType: z.string().min(1, t_dict_es("Selecciona un tipo de proyecto.")),
  budget: z.string().optional(),
  timeline: z.string().min(1, t_dict_es("Selecciona un tiempo estimado.")),
  description: z.string().min(10, t_dict_es("La descripción es muy corta.")),
  contactMethod: z.string().min(1, t_dict_es("Selecciona un medio de contacto.")),
  honeypot: z.string().max(0, t_dict_es("Campo no válido.")),
});

function t_dict_es(es: string) {
  return es;
}

type QuoteFormValues = z.infer<typeof quoteSchema>;

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
  { value: "consulting" },
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

export function QuoteForm({ locale }: QuoteFormProps) {
  const dict = getDictionary(locale);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      contactMethod: "both",
    },
  });

  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const onSubmit = async (data: QuoteFormValues) => {
    // Honeypot anti-spam: si el campo oculto se llenó, no enviar.
    if (data.honeypot) {
      setSubmitStatus("idle");
      return;
    }
    try {
      await sendQuoteRequest(data);
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
            name="honeypot"
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
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <p className="text-sm text-destructive font-medium">
                {t(dict, "contact.form.error", "Hubo un error al enviar el mensaje.")}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>{t(dict, "contact.form.fullName", "Nombre completo")}</Label>
              <Input
                {...register("fullName")}
                placeholder={locale === "en" ? "John Doe" : "Juan Pérez"}
                className={cnInput(!!errors.fullName)}
              />
              {errors.fullName && (
                <p className="text-xs text-destructive">{errors.fullName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>{t(dict, "contact.form.email", "Correo electrónico")}</Label>
              <Input
                {...register("email")}
                placeholder={locale === "en" ? "john@company.com" : "juan@empresa.com"}
                type="email"
                className={cnInput(!!errors.email)}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>

      <div className="space-y-2">
        <Label>{t(dict, "contact.form.company", "Empresa")}</Label>
        <Input
          {...register("company")}
          placeholder={locale === "en" ? "My Company Inc. (optional)" : "Mi empresa S.A.S. (opcional)"}
        />
      </div>

      <div className="space-y-2">
        <Label>{t(dict, "contact.form.projectType", "Tipo de proyecto")}</Label>
        <Select {...register("projectType")}>
          <SelectTrigger className="w-full overflow-hidden [&>span]:truncate">
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
        {errors.projectType && (
          <p className="text-xs text-destructive">{errors.projectType.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        <div className="space-y-2">
          <Label className="md:min-h-[2.25rem] flex items-end leading-snug">
            {t(dict, "contact.form.budget", "Presupuesto estimado")}
          </Label>
          <Select {...register("budget")}>
            <SelectTrigger className="w-full overflow-hidden [&>span]:truncate">
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
        </div>
        <div className="space-y-2">
          <Label className="md:min-h-[2.25rem] flex items-end leading-snug">
            {t(dict, "contact.form.timeline", "Tiempo estimado de ejecución")}
          </Label>
          <Select {...register("timeline")}>
            <SelectTrigger className="w-full overflow-hidden [&>span]:truncate">
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
          {errors.timeline && (
            <p className="text-xs text-destructive">{errors.timeline.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>{t(dict, "contact.form.description", "Descripción del proyecto")}</Label>
        <Textarea
          {...register("description")}
          placeholder="Cuéntame qué quieres construir, los objetivos y cualquier detalle relevante."
          rows={5}
          className={cnInput(!!errors.description)}
        />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>{t(dict, "contact.form.contactMethod", "Medio de contacto preferido")}</Label>
        <Select {...register("contactMethod")} defaultValue="both">
          <SelectTrigger>
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
        {errors.contactMethod && (
          <p className="text-xs text-destructive">{errors.contactMethod.message}</p>
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
