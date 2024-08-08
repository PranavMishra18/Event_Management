import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../../entities/event';
import { EventService } from '../../eventService';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent implements OnInit{

  eventId : number;
  event : Event = {} as Event;





  constructor(private router : Router, private route : ActivatedRoute, private eventService : EventService){

  }

  ngOnInit(): void {

    this.eventId = this.route.snapshot.params['id'];
    
    this.eventService.getEvent(this.eventId).subscribe(data => {
       
      this.event = data;
      // console.log(this.event);
      
      // this.event.date = new Date(this.event.date);
      // console.log(this.event.date);
      

    })

  }

  onSubmit(f : NgForm){

    const value = new Date(f.value.date);
    const formattedDate = this.formatDate(value);
    const alternateDate = this.convertDateFormat(formattedDate);

    this.event.date = alternateDate;


    this.eventService.editEvent(this.eventId,this.event).subscribe(data => {
      console.log(data);
      
      this.router.navigate(['/dashboard']);
    })

  }

  parseDate(dateString: string): Date {
    const parsedDate = Date.parse(dateString);
    if (!isNaN(parsedDate)) {
      return new Date(parsedDate);
    } else {
      console.error("Invalid date format received from backend");
      return null;
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
  }

  convertDateFormat(dateString: string): string {
    const parts = dateString.split('/');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

}
