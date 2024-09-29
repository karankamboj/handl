import { RequestRouter } from '../../library/Interfaces/RequestRouter';
import { PostController } from '../../source/Controllers/PostController';
import { ValidRoutes } from '../ValidRoutes';

export class PostRouter extends RequestRouter {
  constructor() {
    super();
  }

  initializeRoutes() {
    this.router.post('/requests/new', (req, res) => {
      this.handleRequest(
        new PostController({ route: ValidRoutes.CreateRequest, req, res })
      );
    });
    this.router.post('/skills/new', (req, res) => {
      this.handleRequest(
        new PostController({ route: ValidRoutes.CreateSkill, req, res })
      );
    });
    this.router.post('/users/new', (req, res) => {
      this.handleRequest(
        new PostController({ route: ValidRoutes.CreateUser, req, res })
      );
    });
  }
}
