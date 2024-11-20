import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from '../../eventService';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Event } from '../../entities/event';
import { DeleteEventDialogComponent } from '../../dialogs/delete-event-dialog/delete-event-dialog.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  @Input() userId: number;
  events: Event[] = [];
  dataSource = new MatTableDataSource<Event>();
  displayedColumns: string[] = ['index', 'eventTitle', 'clubName', 'date', 'venue', 'time', 'departmentCoordinatorApproval', 'hodApproval', 'deanApproval', 'iqacApproval', 'actions'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private eventService: EventService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.eventService.getEventsByUserId(this.userId).subscribe(data => {
      this.events = data;
      this.dataSource.data = this.events;
      this.dataSource.sort = this.sort;
    });
  }

  editEvent(eventId: number) {
    this.router.navigate([`/event/edit/${eventId}`]);
  }

  viewEvent(eventId: number) {
    this.router.navigate([`event/view/${eventId}`]);
  }

  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, name: string, id: number): void {
    const dialogRef = this.dialog.open(DeleteEventDialogComponent, {
      width: '350px',
      height: '295px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '100ms',
      data: { name, id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteEvent(id);
      }
    });
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(event => event.id !== id);
    });
  }
}
