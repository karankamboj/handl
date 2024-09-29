import { RequestRouter } from '../../library/Interfaces/RequestRouter';
import { GetController } from '../../source/Controllers/GetController';
import { ValidRoutes } from '../ValidRoutes';

export class GetRouter extends RequestRouter {
  constructor() {
    super();
  }

  initializeRoutes() {
    this.router.get('/requests/sent', (req, res) => {
      this.handleRequest(
        new GetController({ route: ValidRoutes.GetSentRequests, req, res })
      );
    });
    this.router.get('/requests/received', (req, res) => {
      this.handleRequest(
        new GetController({ route: ValidRoutes.GetReceivedRequests, req, res })
      );
    });
    this.router.get('/skills', (req, res) => {
      this.handleRequest(
        new GetController({ route: ValidRoutes.GetSkills, req, res })
      );
    });
    this.router.get('/users', (req, res) => {
      this.handleRequest(
        new GetController({ route: ValidRoutes.GetUsers, req, res })
      );
    });
  }
}
