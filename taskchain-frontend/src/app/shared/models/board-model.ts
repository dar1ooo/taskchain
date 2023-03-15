import { BoardColumn } from './board-column-model';

export class BoardModel {
  public Id: string = '';
  public Title: string = '';
  public columns: BoardColumn[] = [];
}
