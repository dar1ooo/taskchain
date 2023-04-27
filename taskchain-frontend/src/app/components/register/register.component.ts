import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegister } from 'src/app/shared/models';
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
  public validationMessage: string = 'required';

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Register a user
   * @memberof RegisterComponent
   */
  public register(): void {
    if (
      this.userRegister.Username !== '' &&
      this.userRegister.Password !== '' &&
      this.userRegister.ConfirmPassword != '' &&
      this.passwordsMatch &&
      !this.showUsernameTakenError &&
      this.validationMessage === 'good to go!'
    ) {
      window.location.href = 'dashboard';
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

  /**
   * Checks if the entered username is available
   * @memberof RegisterComponent
   */
  public checkForAvailableUsername(): void {}

  /**
   * Validates the entered password with the confirmation password
   * @memberof RegisterComponent
   */
  public validatePassword(): void {
    var userPassword = this.userRegister.Password;
    if (userPassword === '') {
      this.validationMessage = 'required';
    } else if (userPassword.length < 6) {
      this.validationMessage = 'password is too short';
    } else if (userPassword.length > 50) {
      this.validationMessage = 'password is too long';
    } else if (userPassword.search(/\d/) == -1) {
      this.validationMessage = 'password must include a number';
    } else if (userPassword.search(/[a-zA-Z]/) == -1) {
      this.validationMessage = 'password has no letters';
    } else if (
      userPassword.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) != -1
    ) {
      this.validationMessage = 'incorrect characters';
    } else {
      this.validationMessage = 'good to go!';
    }

    if (this.userRegister.Password === this.userRegister.ConfirmPassword) {
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }
  }
}
