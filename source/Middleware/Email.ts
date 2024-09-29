import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Globals } from '../../library/Globals/Globals';
import { CouldNotSendEmail } from '../../library/Errors/Email';

export class Email {
  public static async send(
    to: string,
    options: Mail.Options
  ): Promise<SMTPTransport.SentMessageInfo> {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: Globals.V_EMAIL,
          pass: Globals.V_PASSWORD
        }
      });

      const mailOptions: Mail.Options = {
        from: `Skillify NoReply <${Globals.V_EMAIL}>`,
        to,
        ...options
      };

      return await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new CouldNotSendEmail(`Error sending email to ${to}`);
    }
  }

  public static async sendVerificationCode(
    to: string,
    subject: string,
    code: number
  ): Promise<void> {
    const html = `
    <html>
        <body style="background-color: #f7f8fa; margin: 0; padding: 20px; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; text-align: center;">
            <div style="background-color: #ffffff; padding: 50px 40px; border-radius: 12px; border: 1px solid #ddd;">
            <p style="font-size: 32px; font-weight: bold; color: #333; margin: 0; letter-spacing: 2px; padding-bottom: 10px;">${code.toString()}</p>
            <p style="font-size: 16px; color: #777; margin: 0;">
                This code is only valid for your most recent verification request.
            </p>
            </div>
        </div>
        </body>
    </html>
    `;

    const mailOptions: Mail.Options = { subject, html };

    await Email.send(to, mailOptions);
  }
}
