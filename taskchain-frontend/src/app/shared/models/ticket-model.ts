import { TagModel } from './tag-model';
import { UserModel } from './user-model';

export class TicketModel {
  constructor(init?: Partial<TicketModel>) {
    Object.assign(this, init);
  }

  public id = '';
  public title = '';
  public description = '';
  public completedChecks = 0;
  public totalChecks = 0;
  public deleteTicket = false;
  public tags: TagModel[] = [];
  public users: UserModel[] = [];
}
