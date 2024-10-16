import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-approve-dialog',
  templateUrl: './approve-dialog.component.html',
  styleUrls: ['./approve-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApproveDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string }) {}
}
