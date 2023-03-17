import { UserModel } from '..';

export interface ICreateBoardRequest {
  boardTitle: string;
  user: UserModel;
}
