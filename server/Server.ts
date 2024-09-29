import express, { Application, Request, Response } from 'express';
import { Globals } from '../library/Globals/Globals';
import { LoggerUtils } from '../library/Utilities/LoggerUtils';
import microAidRoutes from './routes/microAidRoutes';
import authRoutes from './routes/authRoutes'; // Import auth routes
import emailRoutes from './routes/emailRoutes';

import { HttpStatusCode } from 'axios';

export class Server {
  private readonly app: Application;
  private readonly port: number | string;

  constructor() {
    this.app = express();
    this.port = Globals.PORT;

    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
  }

  private configureRoutes(): void { 
    this.app.get('/helloworld', (req: Request, res: Response) => {
      res.status(HttpStatusCode.Ok).send('Hello, World!');
    });

    // Use the micro-aid routes defined in microAidRoutes.ts
    this.app.use('/api/microaid', microAidRoutes);

    this.app.use('/api/auth', authRoutes); // Link to authentication routes

    // Use the email routes under /api/email
    this.app.use('/api/email', emailRoutes);

  }

  public start(): void {
    this.app.listen(Number(this.port), '0.0.0.0', () => {
      LoggerUtils.info(`Server is running on port ${this.port}`);
    });
  }
}
