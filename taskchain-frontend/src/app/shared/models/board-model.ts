import { BoardColumn } from './board-column-model';

export class BoardModel {
  public Id = '';
  public Title = '';
  public columns: BoardColumn[] = [];
}
