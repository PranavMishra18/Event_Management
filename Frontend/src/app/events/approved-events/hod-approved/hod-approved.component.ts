import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { EventService } from '../../../eventService';
import { Event } from '../../../entities/event';
import { Router } from '@angular/router';
import { AuthService } from '../../../authService';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hod-approved',
  templateUrl: './hod-approved.component.html',
  styleUrl: './hod-approved.component.css'
})
export class HodApprovedComponent implements OnInit{


  events : Event[];
  userId : number | null= null;
  email: string | null = '';
  role: string | null = '';
  
  constructor(private eventService : EventService,private router : Router, private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object){

  }

  ngOnInit(): void {
    
    this.eventService.getConfirmedByHOD().subscribe(data => {
      this.events = data;
    })

    if (isPlatformBrowser(this.platformId)) {
      const userDetails = this.authService.getUserDetails();
      if (userDetails) {
        this.userId = userDetails.userId;
        this.email = userDetails.email;
        this.role = userDetails.role;
      }
    }

  }

  viewEvent(eventId : number){

    this.router.navigate([`event/view/${eventId}`]);

  }

}
