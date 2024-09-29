import { RequestCRUD } from '../../../database/Middleware/Request';
import { UserCRUD } from '../../../database/Middleware/User';
import { INewRequest } from '../../../database/Models/Request';
import { Catchable } from '../../../library/Decorators/Catchable';
import { Checkable } from '../../../library/Decorators/Checkable';
import { MissingHeaders } from '../../../library/Errors/Params';
import {
  Handler,
  IHasChecks,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';
import { StringUtils } from '../../../library/Utilities/StringUtils';

// required headers: sender, receiver, title, description

@Checkable
export class CreateRequest extends Handler<ServerEvent> implements IHasChecks {
  constructor(event: ServerEvent) {
    super(event);
  }

  checkHeaders(): void {
    const requiredHeaders = ['sender', 'receiver', 'title', 'description'];

    requiredHeaders.forEach((header) => {
      if (!this.event.req.headers[header]) {
        throw new MissingHeaders(
          `${StringUtils.formatWord(header)} not provided`,
          [header]
        );
      }
    });
  }

  private async getUserId(username: string): Promise<string> {
    const user = await UserCRUD.getUserByUsername(username);

    return user!._id.toString();
  }

  @Catchable()
  async runChecks(): Promise<void> {
    this.checkHeaders();

    await new Promise<void>((resolve) => {
      resolve();
    });
  }

  @Catchable()
  async execute(): Promise<void> {
    const request: INewRequest = {
      createdBy: await this.getUserId(this.event.req.headers.sender as string),
      createdFor: await this.getUserId(
        this.event.req.headers.receiver as string
      ),
      title: this.event.req.headers.title as string,
      description: this.event.req.headers.description as string
    };

    const user = await RequestCRUD.createRequest(request);

    this.event.res.status(200).send(user);
  }
}
