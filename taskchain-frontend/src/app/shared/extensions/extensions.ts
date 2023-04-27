import { BoardModel, UserModel } from '../models';

export class Extensions {
  /**
   * Checks if a user is logged in. If not -> redirect to login
   * @memberof Extensions
   */
  public checkForLogin(): void {
    const sessionUser = sessionStorage.getItem('user');
    if (!sessionUser) {
      window.location.href = '/login';
    }
  }

  /**
   * Gets a user if it is logged in
   * @return {*}  {UserModel}
   * @memberof Extensions
   */
  public getUser(): UserModel {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      return JSON.parse(sessionUser) as UserModel;
    } else {
      return new UserModel();
    }
  }

  /**
   * Gets a user if it is logged in
   * @return {*}  {UserModel}
   * @memberof Extensions
   */
  public getBoard(id: string): BoardModel {
    const foundBoards = sessionStorage.getItem('boards');
    if (foundBoards) {
      const boards = JSON.parse(foundBoards) as BoardModel[];
      const board: BoardModel | undefined = boards.find((itm) => itm.id === id);
      return board?.id ? board : new BoardModel();
    } else {
      return new BoardModel();
    }
  }

  public updateBoards(board: BoardModel): void {
    const foundBoards = sessionStorage.getItem('boards');

    if (foundBoards) {
      const boards = JSON.parse(foundBoards) as BoardModel[];
      const boardIndex = boards.findIndex((itm) => itm.id === board?.id);

      if (boardIndex >= 0) {
        boards[boardIndex] = board;
      } else {
        boards.push(board);
      }

      sessionStorage.setItem('boards', JSON.stringify(boards));
    } else {
      sessionStorage.setItem('boards', JSON.stringify([board]));
    }
  }

  public addNewBoard(board: BoardModel): void {
    const foundBoards = sessionStorage.getItem('boards');

    if (foundBoards) {
      const boards = JSON.parse(foundBoards) as BoardModel[];
      boards.push(board);
      sessionStorage.setItem('boards', JSON.stringify(boards));
    }
  }
}
