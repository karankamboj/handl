import {
  Controller,
  ServerEvent,
  HandlerController
} from '../../library/Interfaces/HandlerController';
import { ValidRoutes } from '../../server/ValidRoutes';

export class UpdateController extends Controller<ServerEvent> {
  private routeId: ValidRoutes;

  constructor(event: ServerEvent) {
    super(event);
    this.routeId = event.route;
  }

  protected resolve(): HandlerController<ServerEvent> | null {
    switch (this.routeId) {
      case ValidRoutes.UpdateUser:
        // Return specific handler or controller for UpdateUser
        return null; // Placeholder
      case ValidRoutes.AcceptRequest:
        // Return specific handler or controller for AcceptRequest
        return null; // Placeholder
      case ValidRoutes.DenyRequest:
        // Return specific handler or controller for DenyRequest
        return null; // Placeholder
      default:
        return null;
    }
  }
}
