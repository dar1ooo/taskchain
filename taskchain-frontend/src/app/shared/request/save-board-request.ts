import { BoardModel, UserModel } from '../models';

export interface ISaveBoardRequest {
  Board: BoardModel;
  User: UserModel;
}
