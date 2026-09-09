// MIGRAÇÃO SUPABASE: para migrar este serviço consulte
// /docs/migrar-para-supabase.md

import nodemailer from "nodemailer";
import { getConfig } from "./config.service";

export interface ContactEmailData {
  name: string;
  email: string;
  message: string;
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const config = getConfig();
  const destination = config.email.destination || process.env.EMAIL_USER;

  if (!destination) throw new Error("Email de destino não configurado.");

  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"${config.email.senderName || "Site Contato"}" <${process.env.EMAIL_USER}>`,
    to: destination,
    replyTo: data.email,
    subject: `Nova mensagem de ${data.name} – ${config.site.title}`,
    text: `De: ${data.name} <${data.email}>\n\n${data.message}`,
    html: `
      <h2>Nova mensagem via site</h2>
      <p><strong>Nome:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${data.message.replace(/\n/g, "<br>")}</p>
    `,
  });
}

export async function sendTestEmail(destination: string): Promise<void> {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"LogiNord Admin" <${process.env.EMAIL_USER}>`,
    to: destination,
    subject: "✅ Teste de email – LogiNord Admin",
    text: "Se você recebeu este email, a configuração está correta!",
  });
}
