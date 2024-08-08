import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../../../eventService';
import { Router } from '@angular/router';
import { Event } from '../../../entities/event';

@Component({
  selector: 'app-iqac',
  templateUrl: './iqac.component.html',
  styleUrl: './iqac.component.css'
})
export class IqacComponent implements OnInit{

  @Input() userId : number;

  events : Event[];

  constructor(private eventService : EventService,private router : Router){

  }

  ngOnInit(): void {
    

    this.eventService.getEventsForIQAC().subscribe(data => {
      this.events = data;
    })

  }

  viewEvent(eventId : number){
    
    this.router.navigate([`event/view/${eventId}`]);

  }


}
