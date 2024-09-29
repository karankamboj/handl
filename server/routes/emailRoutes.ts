// src/email/email.routes.ts
import { Router } from 'express';
import { emailController } from '../controllers/emailController';

const router = Router();

// Define a POST route for sending emails
router.post('/send', (req, res) => emailController.sendMail(req, res));

export default router;
