import {
  Controller,
  ServerEvent,
  HandlerController
} from '../../library/Interfaces/HandlerController';
import { ValidRoutes } from '../../server/ValidRoutes';

export class PostController extends Controller<ServerEvent> {
  private routeId: ValidRoutes;

  constructor(event: ServerEvent) {
    super(event);
    this.routeId = event.route;
  }

  protected resolve(): HandlerController<ServerEvent> | null {
    switch (this.routeId) {
      case ValidRoutes.CreateRequest:
        // Return specific handler or controller for SubmitNewRequest
        return null; // Placeholder
      case ValidRoutes.CreateSkill:
        // Return specific handler or controller for AddNewSkill
        return null; // Placeholder
      case ValidRoutes.CreateUser:
        // Return specific handler or controller for CreateUser
        return null; // Placeholder
      default:
        return null;
    }
  }
}
