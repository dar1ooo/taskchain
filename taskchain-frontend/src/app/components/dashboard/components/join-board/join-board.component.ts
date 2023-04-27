import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-join-board',
  templateUrl: './join-board.component.html',
  styleUrls: ['./join-board.component.scss'],
})
export class JoinBoardComponent {
  public inviteCode = '';
  public inviteCodeInvalid = false;

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Adds a user to the board according to entered invite code
   * @memberof JoinBoardComponent
   */
  public joinBoard(): void {
    this.snackBar.open(
      'This feature only works on production environments',
      'Dismiss'
    );
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
