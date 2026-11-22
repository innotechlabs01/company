"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sendQuoteRequest } from "@/app/actions/send-quote";
import { getDictionary, t } from "@/i18n/dictionary";

const quoteSchema = z.object({
  fullName: z.string().min(2, "El nombre es requerido."),
  email: z.string().email("Correo inválido."),
  company: z.string().optional(),
  projectType: z.string().min(1, "Selecciona un tipo de proyecto."),
  budget: z.string().optional(),
  timeline: z.string().min(1, "Selecciona un tiempo estimado."),
  description: z.string().min(10, "La descripción es muy corta."),
  contactMethod: z.string().min(1, "Selecciona un medio de contacto."),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

type QuoteFormProps = {
  locale: "es" | "en";
};

const projectTypes: Array<{ value: string; labelEs: string; labelEn: string }> = [
  { value: "website", labelEs: "Página web", labelEn: "Website" },
  { value: "landing", labelEs: "Landing page", labelEn: "Landing page" },
  { value: "webApp", labelEs: "Aplicación web", labelEn: "Web application" },
  { value: "mobileApp", labelEs: "Aplicación móvil", labelEn: "Mobile application" },
  { value: "customSoftware", labelEs: "Software a medida", labelEn: "Custom software" },
  { value: "inhouse", labelEs: "Proyecto In-house", labelEn: "In-house project" },
  { value: "longTerm", labelEs: "Proyecto de largo plazo", labelEn: "Long-term project" },
  { value: "consulting", labelEs: "Consultoría", labelEn: "Consulting" },
  { value: "other", labelEs: "Otro", labelEn: "Other" },
];

const contactMethods: Array<{ value: string; labelEs: string; labelEn: string }> = [
  { value: "whatsapp", labelEs: "WhatsApp", labelEn: "WhatsApp" },
  { value: "email", labelEs: "Correo electrónico", labelEn: "Email" },
  { value: "both", labelEs: "Ambos", labelEn: "Both" },
];

export function QuoteForm({ locale }: QuoteFormProps) {
  const dict = getDictionary(locale);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      contactMethod: "both",
    },
  });

  const projectType = watch("projectType");

  const onSubmit = async (data: QuoteFormValues) => {
    try {
      await sendQuoteRequest(data);
      setValue("fullName", "");
      setValue("email", "");
      setValue("company", "");
      setValue("projectType", "");
      setValue("budget", "");
      setValue("timeline", "");
      setValue("description", "");
      setValue("contactMethod", "both");
      alert(
        t(dict, "contact.form.success", "Mensaje enviado. Gracias por contactarme."),
      );
    } catch (error) {
      alert(
        t(dict, "contact.form.error", "Hubo un error al enviar el mensaje."),
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label>{t(dict, "contact.form.fullName", "Nombre completo")}</Label>
          <Input
            {...register("fullName")}
            placeholder="Juan Pérez"
            className={cnInput(errors.fullName)}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive">{errors.fullName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>{t(dict, "contact.form.email", "Correo electrónico")}</Label>
          <Input
            {...register("email")}
            placeholder="juan@empresa.com"
            type="email"
            className={cnInput(errors.email)}
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
          placeholder="Mi empresa S.A.S. (opcional)"
        />
      </div>

      <div className="space-y-2">
        <Label>{t(dict, "contact.form.projectType", "Tipo de proyecto")}</Label>
        <Select {...register("projectType")}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona..." />
          </SelectTrigger>
          <SelectContent>
            {projectTypes.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {locale === "en" ? p.labelEn : p.labelEs}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.projectType && (
          <p className="text-xs text-destructive">{errors.projectType.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label>{t(dict, "contact.form.budget", "Presupuesto estimado")}</Label>
          <Select {...register("budget")} defaultValue="">
            <SelectTrigger>
              <SelectValue placeholder="Opcional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Opcional</SelectItem>
              <SelectItem value="menos-5k">Menos de $5.000 USD</SelectItem>
              <SelectItem value="5k-20k">$5.000 – $20.000 USD</SelectItem>
              <SelectItem value="20k-50k">$20.000 – $50.000 USD</SelectItem>
              <SelectItem value="mas-50k">Más de $50.000 USD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{t(dict, "contact.form.timeline", "Tiempo estimado de ejecución")}</Label>
          <Select {...register("timeline")}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-mes">1 mes</SelectItem>
              <SelectItem value="3-meses">3 meses</SelectItem>
              <SelectItem value="6-meses">6 meses</SelectItem>
              <SelectItem value="12-meses">12 meses o más</SelectItem>
              <SelectItem value="en-curso">En curso / continuo</SelectItem>
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
          className={cnInput(errors.description)}
        />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>{t(dict, "contact.form.contactMethod", "Medio de contacto preferido")}</Label>
        <Select {...register("contactMethod")} defaultValue="both">
          <SelectTrigger>
            <SelectValue placeholder="Selecciona..." />
          </SelectTrigger>
          <SelectContent>
            {contactMethods.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {locale === "en" ? m.labelEn : m.labelEs}
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
  );
}

function cnInput(error?: any) {
  return `rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
    error ? "border-destructive" : ""
  }`;
}
