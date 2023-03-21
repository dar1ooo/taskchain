import { UserModel } from "../user-model";

export interface IDeleteBoardRequest {
  BoardId: string;
  Users: UserModel[];
}
