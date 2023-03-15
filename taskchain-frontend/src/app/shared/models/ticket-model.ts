import { TagModel } from './tag-model';

export class TicketModel {
  constructor(init?: Partial<TicketModel>) {
    Object.assign(this, init);
  }

  public Id = 0;
  public Title = '';
  public Description = '';
  public CompletedChecks = 0;
  public TotalChecks = 0;
  public DeleteTicket = false;
  public Tags: TagModel[] = [];
}
