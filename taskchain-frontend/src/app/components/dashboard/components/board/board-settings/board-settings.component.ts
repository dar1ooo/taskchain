import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs';
import { BoardModel, UserModel } from 'src/app/shared/models';
import {
  IGetAllUsersRequest,
  IRemoveUserRequest,
} from 'src/app/shared/request';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-board-settings',
  templateUrl: './board-settings.component.html',
  styleUrls: ['./board-settings.component.scss'],
})
export class BoardSettingsComponent implements OnInit {
  public users: UserModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public board: BoardModel,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BoardSettingsComponent>
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  private getAllUsers(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const boardId = urlParams.get('id')?.toString();

    if (boardId) {
      const request: IGetAllUsersRequest = {
        boardId: boardId.toString(),
      };

      this.userService
        .getAllUsers(request)
        .pipe(
          tap((res) => {
            this.users = res.users;
          }),
          catchError((err) => {
            const ref = this.snackBar.open('Failed to load users', 'close', {
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });

            ref.onAction().subscribe(() => {
              this.dialogRef.close();
            });

            return err;
          })
        )
        .subscribe();
    }
  }

  public removeUser(user: UserModel): void {
    const request: IRemoveUserRequest = {
      userId: user.id,
      boardId: this.board.id,
    };

    this.userService
      .removeUser(request)
      .pipe(
        tap(() => {
          const index = this.users.indexOf(user);
          if (index > 0) {
            this.users.splice(index, 1);
          }
        }),
        catchError((err) => {
          this.snackBar.open('User could not be removed', 'close');
          return err;
        })
      )
      .subscribe();
  }
}
