import { Component, HostListener, Inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TagModel, TicketModel } from 'src/app/shared/models';
import { ColorPickerDialogComponent } from './color-picker-dialog/color-picker-dialog.component';
@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent {
  @HostListener('document:keydown.control.s', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    event.preventDefault();
    this.dialogRef.close(this.ticket);
  }
  private revertTicket: TicketModel = new TicketModel();
  public tagInput: string = '';

  constructor(
    public dialogRef: MatDialogRef<TicketDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public ticket: TicketModel,
    public colorPickerdialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.revertTicket = { ...this.ticket };
  }

  onNoClick(): void {
    this.dialogRef.close(this.ticket);
  }

  public delete(): void {
    this.ticket.DeleteTicket = true;
    this.dialogRef.close(this.ticket);
  }

  public cancel(): void {
    this.ticket = this.revertTicket;
    this.dialogRef.close(this.ticket);
  }

  public removeTag(tag: TagModel) {
    const index = this.ticket.Tags.indexOf(tag, 0);
    if (index > -1) {
      this.ticket.Tags.splice(index, 1);
    }
  }

  public addTag(event: MatChipInputEvent) {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    this.ticket.Tags.push({ Title: event.value, Color: randomColor });
    this.tagInput = '';
  }

  public saveTicket(): void {
    if (this.ticket.Title === '') {
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
      data: {},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        tag.Color = result;
      }
    });
  }
}
