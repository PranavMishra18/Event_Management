import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Event } from '../../../entities/event';
import { EventService } from '../../../eventService';
import { Router } from '@angular/router';
import { AuthService } from '../../../authService';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dean-approved',
  templateUrl: './dean-approved.component.html',
  styleUrl: './dean-approved.component.css'
})
export class DeanApprovedComponent implements OnInit{


  events : Event[];
  userId : number | null= null;
  username: string | null = '';
  role: string | null = '';
  
  constructor(private eventService : EventService,private router : Router, private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object){

  }

  ngOnInit(): void {
    
    this.eventService.getConfirmedByDean().subscribe(data => {
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

