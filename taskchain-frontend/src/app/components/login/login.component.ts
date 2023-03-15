import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLogin, UserModel } from 'src/app/shared/models';
import { tap, catchError } from 'rxjs';
import { IUserLoginRequest } from 'src/app/shared/request';
import { UserService } from 'src/app/shared/services/user.service';
import { Extensions } from 'src/app/shared/extensions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public userLogin = new UserLogin();

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private extensions: Extensions
  ) {}

  ngOnInit(): void {
    if (this.extensions.getUser().id !== '') {
      window.location.href = '/dashboard';
    }
  }

  public loginUser(): void {
    if (this.userLogin.username !== '' && this.userLogin.password !== '') {
      const request: IUserLoginRequest = {
        username: this.userLogin.username,
        password: this.userLogin.password,
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
