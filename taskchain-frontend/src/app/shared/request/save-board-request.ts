import { BoardModel, UserModel } from '../models';

export interface ISaveBoardRequest {
  board: BoardModel;
  user: UserModel;
}
