import { BoardColumn } from './board-column-model';

export class BoardModel {
  public id = '';
  public owner = '';
  public inviteCode = '';
  public title: string = '';
  public columns: BoardColumn[] = [];
}
