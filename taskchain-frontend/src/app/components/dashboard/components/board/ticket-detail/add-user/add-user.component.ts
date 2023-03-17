import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs';
import { BoardModel, UserModel } from 'src/app/shared/models';
import { IGetAllUsersRequest } from 'src/app/shared/request';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public users: UserModel[]
  ) {}

  public addUser(user: UserModel): void {
    this.dialogRef.close(user);
  }
}
