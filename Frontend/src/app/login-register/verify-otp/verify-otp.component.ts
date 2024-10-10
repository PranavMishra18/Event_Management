import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent {
  error: string;
  otpError: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmitOtp(f: NgForm) {
    const otp = f.value.otp;
    const email = this.authService.getEmail(); // Assuming you saved the email in your AuthService

    this.authService.verifyOtp(email, otp).subscribe(response => {
      // Redirect to reset password component on success
      this.router.navigate(['/reset-password']);
    }, error => {
      this.otpError = "Invalid OTP. Please try again.";
    });
  }
}
