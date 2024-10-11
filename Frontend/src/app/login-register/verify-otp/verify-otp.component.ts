import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../authService';
import { Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent {
  error: string;
  otpError: string; // For invalid OTP error display
  errorOccured = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmitOtp(f: NgForm) {
    const otp = f.value.otp;
    const email = this.authService.getEmail(); 
    

    this.authService.verifyOtp(email, otp).subscribe(
      response => {
        // Reset any previous errors
        this.otpError = '';
        this.error = '';
        this.errorOccured = false;
        this.router.navigate(['/reset-password']);
      },
      error => {
        console.log('ERROR HAPPENDE BUDDY');
        this.errorOccured = true;
        
        if (error.status === 401) {
          this.otpError = 'The OTP you entered is incorrect. Please double-check and try again, or request a new OTP if needed.';
        } else {
          this.otpError = 'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }
}
