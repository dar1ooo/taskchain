import { Component, HostListener, Inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
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
    public colorPickerdialog: MatDialog
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
    this.ticket.Tags.push({ Title: event.value, Color: '#e0e0e0' });
    this.tagInput = '';
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
