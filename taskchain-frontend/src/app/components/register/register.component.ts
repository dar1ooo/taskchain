import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs';
import { UserModel, UserRegister } from 'src/app/shared/models';
import { IUserRegisterRequest } from 'src/app/shared/request';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public userRegister = new UserRegister();
  public isUsernameTaken = false;
  public passwordsMatch = true;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  public register(): void {
    if (
      this.userRegister.Username !== '' &&
      this.userRegister.Password !== '' &&
      this.userRegister.ConfirmPassword != '' &&
      this.passwordsMatch
    ) {
      const request: IUserRegisterRequest = {
        Username: this.userRegister.Username,
        Password: this.userRegister.Password,
      };

      this.userService
        .registerUser(request)
        .pipe(
          tap((result) => {
            let user = new UserModel();
            user = result;
            sessionStorage.setItem('user', JSON.stringify(user));
            window.location.href = '/dashboard';
          }),
          catchError((err) => {
            this.snackBar.open('Registration Failed', 'retry', {
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              duration: 3000,
            });
            this.userRegister = new UserRegister();

            return err;
          })
        )
        .subscribe();
    }
  }

  public validatePassword(): void {
    if (this.userRegister.Password === this.userRegister.ConfirmPassword) {
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }
  }
}
