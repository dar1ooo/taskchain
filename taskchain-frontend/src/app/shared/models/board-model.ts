import { BoardColumn } from './board-column-model';

export class BoardModel {
  public id = '';
  public inviteCode = '';
  public title = '';
  public owner = '';
  public columns: BoardColumn[] = [];
}
