// src/email/email.service.ts
import nodemailer from 'nodemailer';

class EmailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: "skillifyasu@gmail.com", // Gmail address from environment variables
      pass: "orcb ygfq agfm furl", // App password from environment variables
    },
  });

  public async sendMail(to: string, subject: string, html: string): Promise<void> {
    const mailOptions = {
      from: `NoReply <skillifyasu@gmail.com>`, // Sender address
      to, // Receiver address
      subject, // Subject of the email
      html, // HTML body content of the email
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${to}`);
    } catch (error) {
      console.error(`Failed to send email to ${to}`);
      throw new Error(`Failed to send email ${error}`);
    }
  }
}

export const emailService = new EmailService();
