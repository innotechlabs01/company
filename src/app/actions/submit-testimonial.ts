"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/server";

const testimonialSchema = z.object({
  name: z.string().trim().min(2).max(120),
  role: z.string().trim().min(2).max(120),
  company: z.string().trim().min(1).max(120),
  project_type: z.enum([
    "landing_page",
    "web",
    "apps",
    "enterprise",
    "inhouse",
    "consulting",
    "other",
  ]),
  rating: z.number().int().min(1).max(5),
  content: z.string().trim().min(20).max(1500),
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

  const basePayload = {
    name: parsed.data.name,
    role: parsed.data.role,
    company: parsed.data.company,
    project_type: parsed.data.project_type,
    content: parsed.data.content,
    language: parsed.data.language,
  };

  let { error } = await supabase
    .from("testimonials")
    .insert({ ...basePayload, rating: parsed.data.rating });

  // Graceful fallback if the `rating` column hasn't been added in Supabase yet
  if (error && /rating/i.test(error.message)) {
    const fallback = await supabase.from("testimonials").insert(basePayload);
    error = fallback.error;
  }

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
