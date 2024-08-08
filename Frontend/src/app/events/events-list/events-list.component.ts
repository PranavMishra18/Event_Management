import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { EventService } from '../../eventService';
import { Event } from '../../entities/event';
import { Router } from '@angular/router';
import { AuthService } from '../../authService';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent implements OnInit{


  events : Event[];
  userId : number | null= null;
  username: string | null = '';
  role: string | null = '';
  
  constructor(private eventService : EventService,private router : Router, private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object){

  }

  ngOnInit(): void {
    
    this.eventService.getAllUnconfirmedEvents().subscribe(data => {
      this.events = data;
    })

    if (isPlatformBrowser(this.platformId)) {
      const userDetails = this.authService.getUserDetails();
      if (userDetails) {
        this.userId = userDetails.userId;
        this.username = userDetails.username;
        this.role = userDetails.role;
      }
    }

  }

  viewEvent(eventId : number){

    this.router.navigate([`event/view/${eventId}`]);

  }

}
