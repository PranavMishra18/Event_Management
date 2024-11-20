import { Component, OnInit } from '@angular/core';
import { EventService } from '../../eventService';
import {  ActivatedRoute,  Router } from '@angular/router';
import { User } from '../../entities/user';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  userId : number = null;
  user = {} as User;


  constructor(private eventService : EventService, private router : Router,private route : ActivatedRoute){

  }



  ngOnInit(): void {

    this.userId = this.route.snapshot.params['id'];

    this.eventService.getUser(this.userId).subscribe(data => {
      this.user = data;
    })
        
  }



}
