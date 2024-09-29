import express, { Application, Request, Response } from 'express';
import { Globals } from '../library/Globals/Globals';
import { LoggerUtils } from '../library/Utilities/LoggerUtils';

import { HttpStatusCode } from 'axios';
import { GetRouter } from './Routes/Get';
import { PostRouter } from './Routes/Post';
import { PutRouter } from './Routes/Update';

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
      res.status(HttpStatusCode.Ok).send({ message: 'Hello World' });
    });

    this.app.use('/api', new GetRouter().router);

    this.app.use('/api', new PostRouter().router);

    this.app.use('/api', new PutRouter().router);
  }

  public start(): void {
    this.app.listen(Number(this.port), '0.0.0.0', () => {
      LoggerUtils.info(`Server is running on port ${this.port}`);
    });
  }
}
