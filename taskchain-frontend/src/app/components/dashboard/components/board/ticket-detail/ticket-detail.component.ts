import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs';
import { TagModel, TicketModel, UserModel } from 'src/app/shared/models';
import { IGetAllUsersRequest } from 'src/app/shared/request';
import { UserService } from 'src/app/shared/services/user.service';
import { AddUserComponent } from './add-user/add-user.component';
import { ColorPickerDialogComponent } from './color-picker-dialog/color-picker-dialog.component';
@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent implements OnInit {
  @HostListener('document:keydown.control.s', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    event.preventDefault();
    this.dialogRef.close(this.ticket);
  }
  private revertTicket: TicketModel = new TicketModel();
  public tagInput: string = '';
  public users: UserModel[] = [];

  constructor(
    public dialogRef: MatDialogRef<TicketDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public ticket: TicketModel,
    public colorPickerdialog: MatDialog,
    public addUserDialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.revertTicket = { ...this.ticket };
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  closeDialog(): void {
    debugger
    this.dialogRef.close(this.ticket);
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

  public delete(): void {
    this.ticket.deleteTicket = true;
    this.dialogRef.close(this.ticket);
  }

  public cancel(): void {
    this.ticket = this.revertTicket;
    this.dialogRef.close(this.ticket);
  }

  public removeTag(tag: TagModel) {
    const index = this.ticket.tags.indexOf(tag, 0);
    if (index > -1) {
      this.ticket.tags.splice(index, 1);
    }
  }

  public addTag(event: MatChipInputEvent) {
    if (this.ticket.tags.length >= 3) {
      this.snackBar.open('You cannot add more than 3 Tags', 'close');
    } else {
      this.ticket.tags.push({ title: event.value, color: '#57DFC8' });
    }
    this.tagInput = '';
  }

  public saveTicket(): void {
    if (this.ticket.title === '') {
      this.snackBar.open('Please enter a Title', '', {
        duration: 4000,
      });
    } else {
      this.dialogRef.close(this.ticket);
    }
  }

  public openColorPickerDialog(tag: TagModel): void {
    const dialogRef = this.colorPickerdialog.open(ColorPickerDialogComponent, {
      panelClass: 'colorpicker-wrapper',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        tag.color = result;
      }
    });
  }

  public addUser() {
    const ticketUsers = this.ticket.users;
    const filteredUsers = this.users.filter((user) => {
      return (
        ticketUsers.findIndex((ticketUser) => ticketUser.id === user.id) === -1
      );
    });

    const dialogRef = this.addUserDialog.open(AddUserComponent, {
      panelClass: 'add-user-wrapper',
      data: filteredUsers,
    });

    dialogRef.afterClosed().subscribe((result: UserModel) => {
      if (result) {
        this.ticket.users.push(result);
      }
    });
  }

  public removeUser(user: UserModel): void {
    const index = this.ticket.users.indexOf(user, 0);
    if (index > -1) {
      this.ticket.users.splice(index, 1);
    }
  }
}
