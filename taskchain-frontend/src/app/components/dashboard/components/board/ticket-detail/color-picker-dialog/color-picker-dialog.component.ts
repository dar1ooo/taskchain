import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-color-picker-dialog',
  templateUrl: './color-picker-dialog.component.html',
  styleUrls: ['./color-picker-dialog.component.scss'],
})
export class ColorPickerDialogComponent implements OnInit {
  public selectedColor = '';

  constructor(public dialogRef: MatDialogRef<ColorPickerDialogComponent>) {}

  ngOnInit(): void {}

  onChangeComplete(c: any) {
    this.selectedColor = c.color.hex;
  }
}
