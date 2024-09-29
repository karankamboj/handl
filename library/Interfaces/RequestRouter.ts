import { Router } from 'express';
import { Controller } from './HandlerController';

export abstract class RequestRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  protected abstract initializeRoutes(): void;

  protected handleRequest(handler: InstanceType<typeof Controller>) {
    handler.process().catch(() => {
      // Do Nothing
    });
  }
}
