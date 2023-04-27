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

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.snackBar.open('Just press the login button :)');
  }

  /**
   * Logs in the user
   * @memberof LoginComponent
   */
  public loginUser(): void {
    const user = new UserModel();
    user.username = 'to the Demo';
    sessionStorage.setItem('user', JSON.stringify(user));
    window.location.href = '/dashboard';
  }
}
