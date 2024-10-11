import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmitEmail(f: NgForm) {
    const email = f.value.email;

    this.authService.sendOtp(email).subscribe(response => {
        this.error = ''; // Clear any previous errors
    }, error => {
        this.error = "Failed to send OTP. Please try again.";
    });
    this.router.navigate(['/verify-otp']); 
  }
}
