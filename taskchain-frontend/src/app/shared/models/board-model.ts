import { BoardColumn } from './board-column-model';

export class BoardModel {
  public Id = '';
  public InviteCode = '';
  public Title = '';
  public columns: BoardColumn[] = [];
}
