import { RequestRouter } from '../../library/Interfaces/RequestRouter';
import { UpdateController } from '../../source/Controllers/UpdateController';
import { ValidRoutes } from '../ValidRoutes';

export class PutRouter extends RequestRouter {
  constructor() {
    super();
  }

  initializeRoutes() {
    this.router.put('/users', (req, res) => {
      this.handleRequest(
        new UpdateController({ route: ValidRoutes.UpdateUser, req, res })
      );
    });

    this.router.put('/requests/accept', (req, res) => {
      this.handleRequest(
        new UpdateController({ route: ValidRoutes.AcceptRequest, req, res })
      );
    });

    this.router.put('/requests/deny', (req, res) => {
      this.handleRequest(
        new UpdateController({ route: ValidRoutes.DenyRequest, req, res })
      );
    });
  }
}
