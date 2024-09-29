// src/email/email.controller.ts
import { Request, Response } from 'express';
import { emailService } from '../services/emailService';

class EmailController {
  public async sendMail(req: Request, res: Response): Promise<void> {
    const { to, subject, html } = req.body;

    if (!to || !subject || !html) {
      res.status(400).json({ message: 'Missing required fields: to, subject, or html' });
      return;
    }

    try {
      await emailService.sendMail(to, subject, html);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ message: `Failed to send email ${error}` });
    }
  }
}

export const emailController = new EmailController();
