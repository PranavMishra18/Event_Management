import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../../../eventService';
import { Router } from '@angular/router';
import { Event } from '../../../entities/event';

@Component({
  selector: 'app-dept-coord',
  templateUrl: './dept-coord.component.html',
  styleUrl: './dept-coord.component.css'
})
export class DeptCoordComponent implements OnInit{


    @Input() userId : number;

    events : Event[];


    constructor(private eventService : EventService, private router : Router){

    }


    ngOnInit(): void {
      
      

      this.eventService.getEventsForDC().subscribe(data => {
        this.events = data;
        console.log(this.events);
        
      }) 
      
      // location.reload();
    }

    viewEvent(eventId : number){

      this.router.navigate([`event/view/${eventId}`]);

    }


}
