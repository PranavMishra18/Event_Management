import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../authService';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  userId : number | null= null;
  email: string | null = '';
  role: string | null = '';

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router : Router
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

  viewProfile(userId : number){

    this.router.navigate([`/user/profile/${userId}`]);

  }

  logout() {
    this.authService.logout();
  }
}