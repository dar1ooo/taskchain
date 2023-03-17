import { UserModel } from '../models';

export interface IJoinBoardResponse {
  boardId: string;
  user: UserModel;
}
