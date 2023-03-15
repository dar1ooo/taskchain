import { UserModel } from '../models';

export interface ICreateBoardRequest {
  boardTitle: string;
  user: UserModel;
}
