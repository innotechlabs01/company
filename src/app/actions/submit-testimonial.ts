"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/server";

const testimonialSchema = z.object({
  name: z.string().trim().min(2).max(120),
  role: z.string().trim().min(2).max(120),
  company: z.string().trim().min(1).max(120),
  project_type: z.enum([
    "web",
    "apps",
    "enterprise",
    "inhouse",
    "consulting",
    "other",
  ]),
  content: z.string().trim().min(20).max(1500),
  url: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined))
    .refine(
      (v) => !v || /^https?:\/\/.+/i.test(v),
      "La URL debe comenzar con http:// o https://",
    ),
  language: z.enum(["es", "en"]),
});

export type SubmitTestimonialInput = z.input<typeof testimonialSchema>;

export async function submitTestimonial(
  input: SubmitTestimonialInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = testimonialSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error:
        input.language === "en"
          ? "Please check the required fields and make sure your testimonial is at least 20 characters."
          : "Revisa los campos obligatorios y asegúrate de que tu testimonio tenga al menos 20 caracteres.",
    };
  }

  if (!supabase) {
    return {
      ok: false,
      error:
        parsed.data.language === "en"
          ? "Database connection is not configured."
          : "La conexión con Supabase no está configurada.",
    };
  }

  const { error } = await supabase.from("testimonials").insert({
    name: parsed.data.name,
    role: parsed.data.role,
    company: parsed.data.company,
    project_type: parsed.data.project_type,
    content: parsed.data.content,
    url: parsed.data.url ?? null,
    language: parsed.data.language,
  });

  if (error) {
    console.error("Error inserting testimonial:", error);
    return {
      ok: false,
      error:
        parsed.data.language === "en"
          ? "We couldn't save your testimonial right now. Please try again."
          : "No pudimos guardar tu testimonio en este momento. Intenta de nuevo.",
    };
  }

  revalidatePath(`/${parsed.data.language}/testimonios`);
  revalidatePath(`/${parsed.data.language}`);

  return { ok: true };
}
