import { Component, OnInit } from '@angular/core';
import { EventService } from '../../eventService';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../../entities/event';
import { log } from 'console';

@Component({
  selector: 'app-completed-event-analytics',
  templateUrl: './completed-event-analytics.component.html',
  styleUrl: './completed-event-analytics.component.css',
})
export class CompletedEventAnalyticsComponent implements OnInit {
  event: Event;
  eventId: number;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    this.eventService.getEvent(this.eventId).subscribe((data) => {
      this.event = data;

      console.log(this.event);
    });
  }
}
