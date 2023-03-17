import { UserModel } from '../models';

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
}
