import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs';
import { IJoinBoardRequest } from 'src/app/shared/request';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-join-board',
  templateUrl: './join-board.component.html',
  styleUrls: ['./join-board.component.scss'],
})
export class JoinBoardComponent {
  public inviteCode = '';
  public inviteCodeInvalid = false;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

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
