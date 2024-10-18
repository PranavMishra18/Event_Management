import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../eventService';
import { Event } from '../../entities/event';
import { Location } from '@angular/common';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class MoreDetailsComponent implements OnInit {

  eventId: number;
  event: Event = {} as Event;
  events: Event[] = []; // Initialize events array
  eventsLoaded = false;

  constructor(
    private router: Router,
    private eventService: EventService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id'];

  
    this.eventService.getEvent(this.eventId).subscribe(data => {
      this.event = data;      
      this.loadAllConfirmedEvents(); 
    });
  }

  
  loadAllConfirmedEvents() {
    this.eventService.getAllConfirmedEvents().subscribe(data => {
      this.events = data;      
      this.eventsLoaded = true; 
    });
  }


  highlightEventDates = (date: Date): string | undefined => {
    const eventDates = this.events.map(event => new Date(event.date));

    const isEventDate = eventDates.some(eventDate => 
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    );

    return isEventDate ? 'highlight-date' : undefined;
  }

  goBack() {
    this.location.back();
  }
}
