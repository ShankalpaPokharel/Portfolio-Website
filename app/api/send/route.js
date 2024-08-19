import { EmailTemplate } from '../../../components/email-template'
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(request) {
  const { fullName, email, interest, message } = await request.json();
  console.log(fullName, email, interest, message);
  try {
    const { data, error } = await resend.emails.send({
      from: `${fullName} <onboarding@resend.dev>`,
      to: ['pokharelshankalpa67@gmail.com'],
      subject: `Contact Form Submission from ${fullName} about ${interest}`,
      react: EmailTemplate({ message,interest,fullName,email }),
    });

    if (error) {
      console.error(error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
