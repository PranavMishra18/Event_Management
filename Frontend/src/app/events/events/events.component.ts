import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../../eventService';
import { Router } from '@angular/router';
import { log } from 'console';
import { Event } from '../../entities/event';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEventDialogComponent } from '../../dialogs/delete-event-dialog/delete-event-dialog.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{

  @Input() userId : number;

  events : Event[];


  constructor(private eventService : EventService, private router : Router, private dialog : MatDialog){

  }

  ngOnInit(): void {
    
    this.eventService.getEventsByUserId(this.userId).subscribe(data => {
      
      this.events = data;
      console.log(this.events);      
    })


  }

 editEvent(eventId : number){

  console.log(eventId);
  
  this.router.navigate([`/event/edit/${eventId}`]);

 }
 
 viewEvent(eventId : number){

  this.router.navigate([`event/view/${eventId}`]);

 }

 openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string,name : string,id : number): void {
  const dialogRef = this.dialog.open(DeleteEventDialogComponent, {
    width: '350px', 
    height : '295px',
    enterAnimationDuration: '150ms', 
    exitAnimationDuration: '100ms', 
    data: { name, id}
  });

  dialogRef.afterClosed().subscribe(result => {

    if(result === 'delete'){
      this.deleteEvent(id);
    } 
  })


}

 deleteEvent(id : number){
  
  this.eventService.deleteEvent(id).subscribe(result => {
    location.reload();
  });
 }




}
