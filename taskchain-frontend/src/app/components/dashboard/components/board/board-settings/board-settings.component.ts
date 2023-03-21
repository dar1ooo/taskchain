import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs';
import {
  BoardModel,
  ConfirmDialogModel,
  UserModel,
} from 'src/app/shared/models';
import {
  IDeleteBoardRequest,
  IGetAllUsersRequest,
  IRemoveUserRequest,
} from 'src/app/shared/models/request';
import { BoardService } from 'src/app/shared/services/board.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

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
    private boardService: BoardService,
    public dialog: MatDialog,
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
            const userIndex = this.users.findIndex(
              (user) => user.id === this.board.owner
            );

            if (userIndex > -1) {
              const [user] = this.users.splice(userIndex, 1);
              this.users.unshift(user);
            }
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
    const message =
      'Are you sure you want to remove user: ' + user.username + ' ?';

    const dialogData = new ConfirmDialogModel({
      title: 'Confirm Action',
      message: message,
    });

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
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
    });
  }

  public deleteBoard(): void {
    const message =
      'Are you sure you want to delete board: ' + this.board.title + ' ?';

    const dialogData = new ConfirmDialogModel({
      title: 'Confirm Action',
      message: message,
    });

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
        const request: IDeleteBoardRequest = {
          BoardId: this.board.id,
          Users: this.users,
        };

        this.boardService
          .deleteBoard(request)
          .pipe(
            tap(() => {
              window.location.href = '/dashboard';
            }),
            catchError((err) => {
              this.snackBar.open('Board could not be deleted', 'close');
              return err;
            })
          )
          .subscribe();
      }
    });
  }
}
