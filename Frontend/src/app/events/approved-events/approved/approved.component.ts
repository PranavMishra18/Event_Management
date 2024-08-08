import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../../authService';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrl: './approved.component.css'
})
export class ApprovedComponent implements OnInit {

  userId : number | null= null;
  username: string | null = '';
  role: string | null = '';

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userDetails = this.authService.getUserDetails();
      if (userDetails) {
        this.userId = userDetails.userId;
        this.username = userDetails.username;
        this.role = userDetails.role;
      }
    }
  }
  
}
