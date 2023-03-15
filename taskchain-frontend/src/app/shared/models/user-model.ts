import { BoardOverview } from './board-overview-model';

export class UserModel {
  id = '';
  username = '';
  boards: BoardOverview[] = [];
}
