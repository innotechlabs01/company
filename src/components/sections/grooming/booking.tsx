"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDictionary, t } from "@/i18n/dictionary";

type GroomingBookingProps = {
  locale: "es" | "en";
};

const SERVICES = [
  { value: "bath", label: "Baño y cepillado", labelEn: "Bath & brush" },
  { value: "cut", label: "Corte de raza", labelEn: "Breed haircut" },
  { value: "nails", label: "Corte de uñas", labelEn: "Nail trim" },
  { value: "ears", label: "Limpieza de oídos", labelEn: "Ear cleaning" },
];

const PET_TYPES = [
  { value: "dog", label: "Perro", labelEn: "Dog" },
  { value: "cat", label: "Gato", labelEn: "Cat" },
  { value: "other", label: "Otro", labelEn: "Other" },
];

type FormData = {
  name: string;
  email: string;
  petName: string;
  petType: string;
  service: string;
  date: string;
  message: string;
};

export function GroomingBooking({ locale }: GroomingBookingProps) {
  const dict = getDictionary(locale);
  const isEs = locale === "es";
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    petName: "",
    petType: "",
    service: "",
    date: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const label = (es: string, en: string) => (isEs ? es : en);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) nextErrors.name = t(dict, "grooming.booking.errors.required", "Campo requerido");
    if (!formData.email.trim()) nextErrors.email = t(dict, "grooming.booking.errors.required", "Campo requerido");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = t(dict, "grooming.booking.errors.email", "Ingresa un correo válido");
    }
    if (!formData.petName.trim()) nextErrors.petName = t(dict, "grooming.booking.errors.required", "Campo requerido");
    if (!formData.petType) nextErrors.petType = t(dict, "grooming.booking.errors.required", "Campo requerido");
    if (!formData.service) nextErrors.service = t(dict, "grooming.booking.errors.required", "Campo requerido");
    if (!formData.date) nextErrors.date = t(dict, "grooming.booking.errors.required", "Campo requerido");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const minDate = new Date().toISOString().split("T")[0];

  if (submitted) {
    const successMessage = t(
      dict,
      "grooming.booking.success.message",
      "We will email you shortly to confirm the appointment for {petName}."
    ).replace("{petName}", formData.petName);

    return (
      <section className="px-4 py-24 lg:py-32" id="reservas">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center rounded-3xl border border-stone-200 bg-rose-600 p-10 text-rose-50 shadow-lg"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-600 mb-6">
              <span className="text-3xl" aria-hidden="true">🐾</span>
            </div>
            <h2 className="text-2xl font-bold mb-3">
              {t(dict, "grooming.booking.success.title", "¡Cita reservada!")}
            </h2>
            <p className="text-sm mb-8">{successMessage}</p>
            <Button variant="outline" size="lg" onClick={() => setSubmitted(false)} className="w-full sm:w-auto border-rose-200 text-rose-50 hover:bg-rose-50/30">
              {t(dict, "grooming.booking.newBooking", "Reservar otra cita")}
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-24 bg-stone-50 lg:py-32" id="reservas">
      <div className="mx-auto max-w-7xl">
        <div className="text-center lg:max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3 py-1 mb-6 rounded-full border border-rose-200 bg-rose-50 text-xs font-medium text-rose-700 tracking-wide uppercase font-mono">
            {t(dict, "grooming.booking.eyebrow", "Reserva su cita")}
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="display-lg mb-6 tracking-tight text-foreground"
          >
            {t(dict, "grooming.booking.title", "Déjanos mimar a tu mejor amigo")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            {t(
              dict,
              "grooming.booking.subtitle",
              "Elige el servicio, la fecha y cuéntanos todo sobre su mascota. Nos contactamos a la brevedad para confirmar."
            )}
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5" noValidate>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-sm font-medium text-stone-700">
                <Mail className="h-4 w-4 text-rose-600" aria-hidden="true" />
                {label("Tu nombre", "Your name")} <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="María"
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={cn("rounded-xl border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:ring-rose-500 transition-colors", errors.name ? "border-rose-500 focus-visible:ring-rose-500" : "border-stone-200")}
              />
              {errors.name && (
                <p id="name-error" className="text-xs text-rose-600" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-sm font-medium text-stone-700">
                <Phone className="h-4 w-4 text-rose-600" aria-hidden="true" />
                {label("Tu email", "Your email")} <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="maria@email.com"
                required
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={cn("rounded-xl border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:ring-rose-500 transition-colors", errors.email ? "border-rose-500 focus-visible:ring-rose-500" : "border-stone-200")}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-rose-600" role="alert">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1 text-sm font-medium text-stone-700">
              {label("Nombre de tu mascota", "Your pet's name")} <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="petName"
              value={formData.petName}
              onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
              placeholder="Luna"
              required
              aria-invalid={!!errors.petName}
              aria-describedby={errors.petName ? "petname-error" : undefined}
              className={cn("rounded-xl border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:ring-rose-500 transition-colors", errors.petName ? "border-rose-500 focus-visible:ring-rose-500" : "border-stone-200")}
            />
            {errors.petName && (
              <p id="petname-error" className="text-xs text-rose-600" role="alert">{errors.petName}</p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-sm font-medium text-stone-700">
                {label("Tipo de mascota", "Pet type")} <span className="text-rose-500">*</span>
              </Label>
              <Select
                value={formData.petType}
                onValueChange={(value) => setFormData({ ...formData, petType: value })}
                aria-invalid={!!errors.petType}
              >
                <SelectTrigger id="petType" className={cn("rounded-xl border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:ring-rose-500 transition-colors", errors.petType ? "border-rose-500 focus-visible:ring-rose-500" : "border-stone-200")}>
                  <SelectValue placeholder={isEs ? "Selecciona" : "Select"} />
                </SelectTrigger>
                <SelectContent>
                  {PET_TYPES.map((pet) => (
                    <SelectItem key={pet.value} value={pet.value}>
                      {isEs ? pet.label : pet.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.petType && (
                <p id="pettype-error" className="text-xs text-rose-600" role="alert">{errors.petType}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-sm font-medium text-stone-700">
                {label("Servicio", "Service")} <span className="text-rose-500">*</span>
              </Label>
              <Select
                value={formData.service}
                onValueChange={(value) => setFormData({ ...formData, service: value })}
                aria-invalid={!!errors.service}
              >
                <SelectTrigger id="service" className={cn("rounded-xl border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:ring-rose-500 transition-colors", errors.service ? "border-rose-500 focus-visible:ring-rose-500" : "border-stone-200")}>
                  <SelectValue placeholder={isEs ? "Selecciona" : "Select"} />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {isEs ? s.label : s.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.service && (
                <p id="service-error" className="text-xs text-rose-600" role="alert">{errors.service}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1 text-sm font-medium text-stone-700">
              <Clock className="h-4 w-4 text-rose-600" aria-hidden="true" />
              {label("Fecha preferida", "Preferred date")} <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="date"
              type="date"
              min={minDate}
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? "date-error" : undefined}
              className={cn("rounded-xl border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:ring-rose-500 transition-colors", errors.date ? "border-rose-500 focus-visible:ring-rose-500" : "border-stone-200")}
            />
            {errors.date && (
              <p id="date-error" className="text-xs text-rose-600" role="alert">{errors.date}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-stone-700">
              {label("Mensaje (opcional)", "Message (optional)")}
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Algo que debamos saber de su mascota..."
              rows={3}
              className={cn("rounded-xl border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:ring-rose-500 transition-colors border-stone-200")}
            />
          </div>

          <Button type="submit" size="lg" className="w-full sm:w-auto mt-2">
            {t(dict, "grooming.booking.submit", "Reservar cita")}
          </Button>
        </form>
      </div>
    </section>
  );
}
