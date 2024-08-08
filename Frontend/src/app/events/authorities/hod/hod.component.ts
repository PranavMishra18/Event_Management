import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../../../eventService';
import { Router } from '@angular/router';
import { Event } from '../../../entities/event';

@Component({
  selector: 'app-hod',
  templateUrl: './hod.component.html',
  styleUrl: './hod.component.css'
})
export class HodComponent implements OnInit{

  @Input() userId : number;

  events : Event[];

  constructor(private eventService : EventService,private router : Router){

  }

  ngOnInit(): void {
    
    

    this.eventService.getEventsForHOD().subscribe(data => {
      this.events = data;
    })

    // location.reload();
  }

  viewEvent(eventId : number){
    
    this.router.navigate([`event/view/${eventId}`]);

  }


}
