import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-disapprove-dialog',
  templateUrl: './disapprove-dialog.component.html',
  styleUrl: './disapprove-dialog.component.css'
})
export class DisapproveDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string }) {}

}
