import { Component, OnInit } from '@angular/core';
import { Event } from '../entities/event';
import { EventService } from '../eventService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{


  events : Event[];



  constructor(private eventService : EventService, private router : Router){

    

  }

  ngOnInit(): void {
    this.eventService.getAllConfirmedEvents().subscribe(data => {
      this.events = data;
      console.log(data);
      
    })
  }

}
