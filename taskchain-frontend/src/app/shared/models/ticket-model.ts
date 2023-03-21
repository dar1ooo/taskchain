import { TagModel } from './tag-model';
import { TaskModel } from './task-model';
import { UserModel } from './user-model';

export class TicketModel {
  constructor(init?: Partial<TicketModel>) {
    Object.assign(this, init);
  }

  public title = '';
  public description = '';
  public completedChecks = 0;
  public totalChecks = 0;
  public tags: TagModel[] = [];
  public users: UserModel[] = [];
  public tasks: TaskModel[] = [];
}
