import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs';
import { UserModel, UserRegister } from 'src/app/shared/models';
import { IUserRegisterRequest } from 'src/app/shared/models/request';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public userRegister = new UserRegister();
  public isUsernameTaken = false;
  public passwordsMatch = true;
  public takenUsernames: string[] = [];
  public showUsernameTakenError: boolean = false;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getTakenUsernames();
  }

  public getTakenUsernames(): void {
    this.userService
      .getAllUsernames()
      .pipe(
        tap((usernames) => {
          this.takenUsernames = usernames;
        }),
        catchError((err) => {
          return err;
        })
      )
      .subscribe();
  }

  public register(): void {
    if (
      this.userRegister.Username !== '' &&
      this.userRegister.Password !== '' &&
      this.userRegister.ConfirmPassword != '' &&
      this.passwordsMatch &&
      !this.showUsernameTakenError
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

    if (this.userRegister.Username === '') {
      this.snackBar.open('Username is required!', '', {
        duration: 3000,
      });
    } else if (this.userRegister.Password === '') {
      this.snackBar.open('Password is required!', '', {
        duration: 3000,
      });
    }
  }

  //Checks if the entered username is available
  public checkForAvailableUsername(): void {
    if (this.takenUsernames.includes(this.userRegister.Username)) {
      this.showUsernameTakenError = true;
    } else {
      this.showUsernameTakenError = false;
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
