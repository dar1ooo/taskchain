import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoardModel, UserModel } from 'src/app/shared/models';

@Component({
  selector: 'app-board-settings',
  templateUrl: './board-settings.component.html',
  styleUrls: ['./board-settings.component.scss'],
})
export class BoardSettingsComponent implements OnInit {
  public users: UserModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public board: BoardModel,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BoardSettingsComponent>
  ) {}

  ngOnInit(): void {
    this.board.inviteCode = 'L29BNI';
    this.getAllUsers();
    this.users.push({
      boards: [],
      id: 'c7111522-f519-4fa2-ae80-070e2212c7e1',
      username: 'Test User 1',
    });
    this.users.push({
      boards: [],
      id: 'c7111522-f519-4fa2-ae80-070e2212c7e2',
      username: 'Test User 2',
    });
    this.users.push({
      boards: [],
      id: 'c7111522-f519-4fa2-ae80-070e2212c7e3',
      username: 'Test User 3',
    });
    this.users.push({
      boards: [],
      id: 'c7111522-f519-4fa2-ae80-070e2212c7e4',
      username: 'Test User 4',
    });
    this.users.push({
      boards: [],
      id: 'c7111522-f519-4fa2-ae80-070e2212c7e5',
      username: 'Test User 5',
    });
    this.users.push({
      boards: [],
      id: 'c7111522-f519-4fa2-ae80-070e2212c7e6',
      username: 'Test User 6',
    });
  }

  /**
   * Get all users of the current Board
   * @private
   * @memberof BoardSettingsComponent
   */
  private getAllUsers(): void {}

  /**
   * Remove a user from the board
   * @param {UserModel} user
   * @memberof BoardSettingsComponent
   */
  public removeUser(user: UserModel): void {
    this.users = this.users.filter((itm) => itm.id !== user.id);
  }

  /**
   * Delete the current board
   * @memberof BoardSettingsComponent
   */
  public deleteBoard(): void {
    this.snackBar.open('nice try :)');
  }
}
