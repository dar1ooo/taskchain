import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs';
import { Extensions } from 'src/app/shared/extensions';
import { UserLogin, UserModel } from 'src/app/shared/models';
import { IUserLoginRequest } from 'src/app/shared/models/request';
import { UserService } from 'src/app/shared/services/user.service';

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

  /**
   * Logs in the user
   * @memberof LoginComponent
   */
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

    if (this.userLogin.username === '') {
      this.snackBar.open('Username is required !', '', {
        duration: 3000,
      });
    } else if (this.userLogin.password === '') {
      this.snackBar.open('Password is required !', '', {
        duration: 3000,
      });
    }
  }
}
