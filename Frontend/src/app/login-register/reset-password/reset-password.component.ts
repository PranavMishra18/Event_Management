import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../authService';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  error: string | null = null;
  passwordToken: string | null;

  constructor(private authService: AuthService, private router: Router) {
    // Retrieve the token from local storage
    this.passwordToken = localStorage.getItem('otpToken');
    
    if (!this.passwordToken) {
      this.error = 'Token not found. Please go through the OTP verification again.';
      console.error(this.error); // Log error message
      // Optionally, navigate back to verify OTP page
      // this.router.navigate(['/verify-otp']);
    }
  }

  onSubmit(f: any): void {
    const email = f.value.email; // Extracting email from the form
    const newPassword = f.value.newPassword; // New password from the form
    const confirmPassword = f.value.confirmPassword; // Confirm password from the form

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    // Call the AuthService to reset the password
    this.authService.resetPassword(email, newPassword).subscribe(
      (response) => {
        console.log('Password reset successful:', response); // Log success message
        this.router.navigate(['/login']); // Redirect to login or wherever needed
      },
      (err) => {
        console.error('Error resetting password:', err); // Log error
        this.error = err.error.message || 'Something went wrong. Please try again.';
      }
    );
  }
}
