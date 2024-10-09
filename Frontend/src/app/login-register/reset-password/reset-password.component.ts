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

  constructor(private authService : AuthService, private router: Router) {}

  onSubmit(f: any): void {
    // Extracting values from the form
    const email = f.value.email;
    const newPassword = f.value.newPassword;
    const confirmPassword = f.value.confirmPassword;

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    // Create the payload for the reset password request
    

    // Call the AuthService to reset the password
    this.authService.resetPassword(email,newPassword).subscribe(
      (response) => {
        // Handle success response
        this.router.navigate(['/login']); // Redirect to login or wherever needed
      },
      (err) => {
        // Handle error response
        this.error = err.error.message || 'Something went wrong. Please try again.';
      }
    );
  }
}
