import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLogin, UserModel } from 'src/app/shared/models';
import { tap, catchError } from 'rxjs';
import { IUserLoginRequest } from 'src/app/shared/request';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public userLogin = new UserLogin();

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  public loginUser(): void {
    if (this.userLogin.Username !== '' && this.userLogin.Password !== '') {
      const request: IUserLoginRequest = {
        Username: this.userLogin.Username,
        Password: this.userLogin.Password,
      };

      this.userService
        .loginUser(request)
        .pipe(
          tap((res) => {
            let user = new UserModel();
            user = res;
            sessionStorage.setItem('user', JSON.stringify(user));
            window.location.href = '/dashboard';
          }),
          catchError((error) => {
            this.snackBar.open('Login Failed, please retry', '', {
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              duration: 6000,
            });

            this.userLogin = new UserLogin();
            return error;
          })
        )
        .subscribe();
    }
  }
}
