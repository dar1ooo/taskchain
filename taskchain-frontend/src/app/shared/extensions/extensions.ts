export class Extensions {
  public checkForLogin(): void {
    debugger;
    const sessionUser = sessionStorage.getItem('user');
    if (!sessionUser) {
      window.location.href = '/login';
    }
  }
}
