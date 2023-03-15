import { TicketModel } from './ticket-model';

export class BoardColumn {
  public Title = '';
  public Tickets: TicketModel[] = [];
}
