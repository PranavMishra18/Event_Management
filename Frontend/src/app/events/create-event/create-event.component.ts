import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../authService';
import { NgForm } from '@angular/forms';
import { Event } from '../../entities/event';
import { User } from '../../entities/user';
import { EventService } from '../../eventService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent implements OnInit {

  userId : number | null = null;
  user : any;


  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private eventService : EventService,
    private router : Router
  ) {}

  
  ngOnInit() {
      if (isPlatformBrowser(this.platformId)) {
        const userDetails = this.authService.getUserDetails();
        if (userDetails) {
          this.userId = userDetails.userId;          
        }
      }  
      
      this.eventService.getUser(this.userId).subscribe(data => {
        this.user = data;
      })
    
  }

  onSubmit(f : NgForm){

    
    const eventTitle = f.value.eventTitle;
    const coordinatorName = f.value.coordinatorName;
    const clubName = f.value.clubName;        
    const date : Date = f.value.date;
    const formattedDate = date.toISOString().split('T')[0];
    const venue = f.value.venue;
    const time = f.value.time;
    const virtual = f.value.virtual;
    const physical = f.value.physical;
    const eventBudget = f.value.budget;
    const eventDescription = f.value.eventDescription;    

    
    console.log('virtual -> ' + virtual);
    console.log('physical -> ' + physical);
    
    

    const event = new Event(eventTitle,coordinatorName,this.user,this.user.username,clubName,formattedDate,
                            time,venue,eventBudget,eventDescription,virtual,physical);
    
    this.eventService.saveEvent(event).subscribe(data => {
      this.router.navigate(['/dashboard']);  
    })
    
    
  }
}
