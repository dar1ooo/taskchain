import { UserModel } from '..';

export interface IJoinBoardRequest {
  InviteCode: string;
  User: UserModel;
}
