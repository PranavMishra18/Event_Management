import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OtpGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if 'window' and 'localStorage' are available (browser environment)
    if (typeof window !== 'undefined' && window.localStorage) {
      const otpToken = localStorage.getItem('otpToken');
      if (otpToken) {
        return true; // OTP is verified, allow access
      }
    }

    // If OTP is not verified, redirect to the verify OTP page
    this.router.navigate(['/forgot-password']);
    return false; // Deny access
  }
}
