import { Resend } from "resend";

interface sendEmailProps {
  to: string;
  subject: string;
  text: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, text }: sendEmailProps) {
  await resend.emails.send({
    from: "mohamedmhlb25@gmail.com",
    to,
    subject,
    text,
  });
}
