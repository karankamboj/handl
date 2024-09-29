import { RequestCRUD } from '../../../database/Middleware/Request';
import { UserCRUD } from '../../../database/Middleware/User';
import { Catchable } from '../../../library/Decorators/Catchable';
import { Checkable } from '../../../library/Decorators/Checkable';
import {
  Handler,
  IHasChecks,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';
import { RequestStatus } from '../../../library/Validators/Request';

@Checkable
export class AcceptRequest extends Handler<ServerEvent> implements IHasChecks {
  constructor(event: ServerEvent) {
    super(event);
  }

  checkHeaders(): void {
    const requiredHeaders = ['username'];

    requiredHeaders.forEach((header) => {
      if (!this.event.req.headers[header]) {
        throw new Error(`${header} not provided`);
      }
    });
  }

  @Catchable()
  runChecks(): Promise<void> {
    this.checkHeaders();

    return new Promise<void>((resolve) => {
      resolve();
    });
  }

  @Catchable()
  async execute(): Promise<void> {
    const username = this.event.req.headers.username as string;
    const user = await UserCRUD.getUserByUsername(username);

    await RequestCRUD.updateRequestStatus(
      user!._id.toString(),
      RequestStatus.ACCEPTED
    );

    this.event.res.status(200).send('Request accepted');
  }
}
