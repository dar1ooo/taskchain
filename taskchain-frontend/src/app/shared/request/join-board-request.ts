import { UserModel } from '../models';

export interface IJoinBoardRequest {
  InviteCode: string;
  User: UserModel;
}
