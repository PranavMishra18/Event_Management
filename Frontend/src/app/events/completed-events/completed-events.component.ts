import { Component, OnInit, OnChanges } from '@angular/core';
import { Event } from '../../entities/event';
import { EventService } from '../../eventService';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-completed-events',
  templateUrl: './completed-events.component.html',
  styleUrls: ['./completed-events.component.css'],
})
export class CompletedEventsComponent implements OnInit, OnChanges {
  events: Event[] = [];
  searchTerm: string = '';
  eventsLoaded: boolean = false;
  totalEvents: number;

  // Pagination properties
  pageIndex: number = 0;
  pageSize: number = 6; // Fixed to 6 as required
  paginatedEvents: Event[] = [];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getCompletedEvents().subscribe((data) => {
      this.events = data;
      this.totalEvents = this.events.length;
      this.eventsLoaded = true;
      this.updatePaginatedEvents(); // Update the displayed events based on pagination
    });
  }

  moreDetails(eventId: number) {
    this.router.navigate([`event/completed/${eventId}`]);
  }

  filteredEvents(): Event[] {
    if (!this.searchTerm) {
      return this.events;
    }
    return this.events.filter((event) =>
      event.eventTitle.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Update the paginated events
  updatePaginatedEvents(): void {
    const filtered = this.filteredEvents();
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEvents = filtered.slice(startIndex, endIndex);
  }

  // Handle pagination change
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedEvents();
  }

  // Update the paginated events when the search term changes
  onSearchChange(): void {
    this.pageIndex = 0; // Reset to the first page on search
    this.updatePaginatedEvents();
  }

  ngOnChanges(): void {
    this.updatePaginatedEvents();
  }
}
