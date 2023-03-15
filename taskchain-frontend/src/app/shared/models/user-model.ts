import { BoardModel } from './board-model';

export class UserModel {
  Id = '';
  Username = '';
  Boards: BoardModel[] = [];
}
