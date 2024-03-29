import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs';
import { Extensions } from 'src/app/shared/extensions';
import { UserModel } from 'src/app/shared/models';
import { IJoinBoardRequest } from 'src/app/shared/models/request';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-join-board',
  templateUrl: './join-board.component.html',
  styleUrls: ['./join-board.component.scss'],
})
export class JoinBoardComponent implements OnInit {
  public inviteCode = '';
  public inviteCodeInvalid = false;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private extensions: Extensions
  ) {}

  ngOnInit(): void {
    this.extensions.checkForLogin();
  }

  /**
   * Adds a user to the board according to entered invite code
   * @memberof JoinBoardComponent
   */
  public joinBoard(): void {
    if (this.inviteCode !== '') {
      const request: IJoinBoardRequest = {
        InviteCode: this.inviteCode,
        User: this.extensions.getUser(),
      };
      this.userService
        .joinBoard(request)
        .pipe(
          tap((res) => {
            let user = new UserModel();
            user = res.user;
            sessionStorage.setItem('user', JSON.stringify(user));
            window.location.href = '/board?id=' + res.boardId;
          }),
          catchError((error) => {
            this.snackBar.open('Board not found', 'retry', {
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              duration: 3000,
            });
            this.inviteCodeInvalid = false;
            this.inviteCode = '';
            return error;
          })
        )
        .subscribe();
    } else {
      this.snackBar.open('Invite Code is required');
    }
  }

  /**
   * Validates the entered invite code according to it's length
   * @memberof JoinBoardComponent
   */
  public validateToken(): void {
    if (this.inviteCode.length > 6) {
      this.inviteCodeInvalid = true;
    } else {
      this.inviteCodeInvalid = false;
    }
    if (this.inviteCode === '') {
      this.inviteCodeInvalid = false;
    }
  }
}
