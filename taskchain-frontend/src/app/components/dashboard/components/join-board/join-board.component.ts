import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs';
import { Extensions } from 'src/app/shared/extensions';
import { IJoinBoardRequest } from 'src/app/shared/request';
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

  public joinBoard(): void {
    if (this.inviteCode !== '') {
      const request: IJoinBoardRequest = {
        InviteCode: this.inviteCode,
      };
      this.userService
        .joinBoard(request)
        .pipe(
          tap((res) => {
            window.location.href = '/dashboard';
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
    }
  }

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
