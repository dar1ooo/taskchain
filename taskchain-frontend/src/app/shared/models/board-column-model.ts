import { TicketModel } from './ticket-model';

export class BoardColumn {
  public title = '';
  public tickets: TicketModel[] = [];
}
