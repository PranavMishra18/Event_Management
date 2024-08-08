import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { EventService } from '../../../eventService';
import { Event } from '../../../entities/event';
import { Router } from '@angular/router';
import { AuthService } from '../../../authService';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-iqac-approved',
  templateUrl: './iqac-approved.component.html',
  styleUrl: './iqac-approved.component.css'
})
export class IqacApprovedComponent implements OnInit{


  events : Event[];
  userId : number | null= null;
  username: string | null = '';
  role: string | null = '';
  
  constructor(private eventService : EventService,private router : Router, private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object){

  }

  ngOnInit(): void {
    
    this.eventService.getConfirmedByIQAC().subscribe(data => {
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
