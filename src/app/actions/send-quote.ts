"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || "contacto@anthonyrivera.dev";
const NOTIFY_EMAIL = "anthonyrivera51@icloud.com";

export type QuoteFormData = {
  fullName: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  timeline: string;
  description: string;
  contactMethod: string;
};

export async function sendQuoteRequest(data: QuoteFormData) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY no está configurada.");
  }

  const subject = `[Cotización] ${data.projectType} — ${data.fullName}`;

  // Email de notificación a Anthony
  await resend.emails.send({
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
  <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Nombre</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.fullName}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Correo</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.email}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Empresa</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.company || "No especificada"}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Tipo de proyecto</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.projectType}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Presupuesto estimado</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.budget || "No especificado"}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Tiempo de ejecución</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.timeline || "No especificado"}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Medio de contacto</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.contactMethod}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Descripción</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.description.replace(/\n/g, "<br>")}</td></tr>
</table>
    `,
  });

  // Email de confirmación al cliente
  await resend.emails.send({
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
<h2>Hola ${data.fullName},</h2>
<p>Gracias por contactarme. He recibido tu solicitud de cotización para un proyecto de tipo <b>${data.projectType}</b>.</p>
<p>Te responderé a la brevedad posible para conversar sobre tus necesidades y definir los próximos pasos.</p>
<p>Puedes escribirme directamente a <a href="mailto:anthonyrivera51@icloud.com">anthonyrivera51@icloud.com</a> o por <a href="https://wa.me/573128386640">WhatsApp</a>.</p>
<p>Quedo atento.</p>
<p><b>Anthony Rivera</b><br>Desarrollador de Software</p>
    `,
  });

  return { success: true };
}
