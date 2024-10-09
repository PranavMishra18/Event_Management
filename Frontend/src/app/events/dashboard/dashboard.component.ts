import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../authService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  userId : number | null= null;
  email: string | null = '';
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
        this.email = userDetails.email;
        this.role = userDetails.role;
      }
    }
  }

  logout() {
    this.authService.logout();
  }
}
