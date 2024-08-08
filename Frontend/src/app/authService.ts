import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080'; 
  private tokenKey = 'authToken';

  constructor(
    private http: HttpClient, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
    this.router.navigate(['/login']);
  }

  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getUserDetails(): { userId: number, username: string, role: string } | null {
    const token = this.getToken();
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return {
        userId: tokenPayload.userId,
        username: tokenPayload.sub,
        role: tokenPayload.role
      };
    }
  }
}
