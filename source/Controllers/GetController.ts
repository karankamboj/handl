import {
  Controller,
  HandlerController,
  ServerEvent
} from '../../library/Interfaces/HandlerController';
import { ValidRoutes } from '../../server/ValidRoutes';
import { GetUsers } from '../Handlers/GetHandlers/GetUsers';

export class GetController extends Controller<ServerEvent> {
  private routeId: ValidRoutes;

  constructor(event: ServerEvent) {
    super(event);
    this.routeId = event.route;
  }

  protected resolve(): HandlerController<ServerEvent> | null {
    switch (this.routeId) {
      case ValidRoutes.GetSentRequests:
        // Return specific handler or controller for GetSentRequests
        return null; // Placeholder
      case ValidRoutes.GetReceivedRequests:
        // Return specific handler or controller for GetReceivedRequests
        return null; // Placeholder
      case ValidRoutes.GetSkills:
        // Return specific handler or controller for GetSkills
        return null; // Placeholder
      case ValidRoutes.GetUsers:
        return new GetUsers(this.trigger);
      default:
        return null;
    }
  }
}
