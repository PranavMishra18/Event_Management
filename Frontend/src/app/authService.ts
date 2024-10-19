import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private baseUrl = 'http://155.248.254.4:8080'; 
  private baseUrl = 'http://localhost:8080'; 
  private tokenKey = 'authToken';
  private email : string;
  private passwordToken: string; // Store the password token

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

  getUserDetails(): { userId: number, email: string, role: string } | null {
    const token = this.getToken();
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return {
        userId: tokenPayload.userId,
        email: tokenPayload.sub,
        role: tokenPayload.role
      };
    }
    return null; // Added return statement
  }
  
  getEmail(): string {
    return this.email;
  }

  sendOtp(email: string): Observable<any> {

    this.email = email;
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
    
}

verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify-otp`, { email, otp }).pipe(
        tap((response: any) => {
            // Store the token in local storage
            localStorage.setItem('otpToken', response.token);
        }),
        tap({
            error: error => console.error('Error verifying OTP:', error)
        })
    );
}

resetPassword(email: string, newPassword: string): Observable<any> {
    const passwordToken = localStorage.getItem('otpToken');

    if (!passwordToken) {
        console.error('Password token not found in local storage.');
        return throwError('Password token not found. Please verify your OTP again.');
    }

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${passwordToken}` // Set the password token in the Authorization header
    });

    return this.http.post(`${this.baseUrl}/reset-password`, { email, newPassword }, { headers });
}


  getPasswordToken(): string {
    return this.passwordToken;
  }
}
