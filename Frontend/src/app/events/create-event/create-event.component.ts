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
    const eventBudget = f.value.budget;
    const eventDescription = f.value.eventDescription;    


    const event = new Event(eventTitle,coordinatorName,this.user,this.user.username,clubName,formattedDate,
                            time,venue,eventBudget,eventDescription);
    
    this.eventService.saveEvent(event).subscribe(data => {

      console.log('formattedDate');
      this.router.navigate(['/dashboard']);
      

    })
    
    console.log(date);
  }

  // let formattedDate = this.formatDate(value);
  // const alternateDate = this.convertDateFormat(formattedDate);
  // formatDate(date: Date): string {
  //   // Example format: YYYY-MM-DD
  //   const year = date.getFullYear();
  //   const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 to month as it's zero-based
  //   const day = ('0' + date.getDate()).slice(-2);
  //   return `${year}/${month}/${day}`;
  // }
  
  // convertDateFormat(dateString: string): string {
  //   // Assuming dateString is in YYYY-MM-DD format
  //   const parts = dateString.split('/');
  //   return `${parts[2]}/${parts[1]}/${parts[0]}`; // Assuming the desired format is DD/MM/YYYY
  // }
  


}
