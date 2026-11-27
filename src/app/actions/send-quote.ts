"use server";

import { Resend } from "resend";
import { z } from "zod";

const FROM_EMAIL = process.env.FROM_EMAIL || "contacto@anthonyrivera.dev";
const NOTIFY_EMAIL = "anthonyrivera51@icloud.com";

const quoteFormSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(120).optional(),
  projectType: z.string().trim().min(1).max(120),
  budget: z.string().trim().max(120).optional(),
  timeline: z.string().trim().min(1).max(120),
  description: z.string().trim().min(10).max(5000),
  contactMethod: z.string().trim().min(1).max(60),
  honeypot: z.string().max(0).optional(),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

export type SendQuoteResult = { ok: true } | { ok: false; error: string };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendQuoteRequest(
  rawData: QuoteFormData,
): Promise<SendQuoteResult> {
  const parsed = quoteFormSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Los datos del formulario no son válidos.",
    };
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      ok: false,
      error: "El servicio de correo no está configurado.",
    };
  }

  const data = parsed.data;
  const resend = new Resend(process.env.RESEND_API_KEY);

  const safeFullName = escapeHtml(data.fullName);
  const safeEmail = escapeHtml(data.email);
  const safeCompany = escapeHtml(data.company || "No especificada");
  const safeProjectType = escapeHtml(data.projectType);
  const safeBudget = escapeHtml(data.budget || "No especificado");
  const safeTimeline = escapeHtml(data.timeline || "No especificado");
  const safeContactMethod = escapeHtml(data.contactMethod);
  const safeDescription = escapeHtml(data.description).replace(/\n/g, "<br>");

  const subject = `[Cotización] ${data.projectType} — ${data.fullName}`;

  // Email de notificación a Anthony
  const { error: notifyError } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [NOTIFY_EMAIL],
    subject,
    replyTo: data.email,
    text: `
Nueva solicitud de cotización.

Nombre: ${data.fullName}
Correo: ${data.email}
Empresa: ${data.company || "No especificada"}
Tipo de proyecto: ${data.projectType}
Presupuesto estimado: ${data.budget || "No especificado"}
Tiempo de ejecución: ${data.timeline || "No especificado"}
Medio de contacto: ${data.contactMethod}

Descripción:
${data.description}
    `,
    html: `
<h2>Nueva solicitud de cotización</h2>
<table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;">
  <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Nombre</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${safeFullName}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Correo</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${safeEmail}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Empresa</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${safeCompany}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Tipo de proyecto</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${safeProjectType}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Presupuesto estimado</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${safeBudget}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Tiempo de ejecución</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${safeTimeline}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Medio de contacto</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${safeContactMethod}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Descripción</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${safeDescription}</td></tr>
</table>
    `,
  });

  if (notifyError) {
    return {
      ok: false,
      error: notifyError.message || "No se pudo enviar la solicitud.",
    };
  }

  // Email de confirmación al cliente
  const { error: confirmError } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [data.email],
    subject: "Hemos recibido tu solicitud — Anthony Rivera",
    text: `
Hola ${data.fullName},

Gracias por contactarme. He recibido tu solicitud de cotización para un proyecto de tipo "${data.projectType}".

Te responderé a la brevedad posible para conversar sobre tus necesidades y definir los próximos pasos.

Puedes escribirme directamente a anthonyrivera51@icloud.com o por WhatsApp: https://wa.me/573128386640

Quedo atento.

Anthony Rivera
Desarrollador de Software
    `,
    html: `
<h2>Hola ${safeFullName},</h2>
<p>Gracias por contactarme. He recibido tu solicitud de cotización para un proyecto de tipo <b>${safeProjectType}</b>.</p>
<p>Te responderé a la brevedad posible para conversar sobre tus necesidades y definir los próximos pasos.</p>
<p>Puedes escribirme directamente a <a href="mailto:anthonyrivera51@icloud.com">anthonyrivera51@icloud.com</a> o por <a href="https://wa.me/573128386640">WhatsApp</a>.</p>
<p>Quedo atento.</p>
<p><b>Anthony Rivera</b><br>Desarrollador de Software</p>
    `,
  });

  if (confirmError) {
    return {
      ok: false,
      error:
        confirmError.message ||
        "La solicitud fue recibida, pero no se pudo enviar el correo de confirmación.",
    };
  }

  return { ok: true };
}
