import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BoardModel } from 'src/app/shared/models';

@Component({
  selector: 'app-new-board-dialog',
  templateUrl: './new-board-dialog.component.html',
  styleUrls: ['./new-board-dialog.component.scss'],
})
export class NewBoardDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NewBoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public board: BoardModel,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  public saveBoard(): void {
    if (this.board.title === '') {
      this.snackBar.open('Please enter a Title');
    } else {
      this.dialogRef.close(this.board);
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
