import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-event-dialog',
  templateUrl: './delete-event-dialog.component.html',
  styleUrl: './delete-event-dialog.component.css'
})
export class DeleteEventDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string, id : number }) {}

}
