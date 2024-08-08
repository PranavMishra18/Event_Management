import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../../eventService';
import { Router } from '@angular/router';
import { log } from 'console';
import { Event } from '../../entities/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{

  @Input() userId : number;

  events : Event[];


  constructor(private eventService : EventService, private router : Router){

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




}
