import { UserModel } from '../models';

export class Extensions {
  public checkForLogin(): void {
    const sessionUser = sessionStorage.getItem('user');
    if (!sessionUser) {
      window.location.href = '/login';
    }
  }

  public getUser(): UserModel {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      return JSON.parse(sessionUser) as UserModel;
    } else {
      return new UserModel();
    }
  }
}
