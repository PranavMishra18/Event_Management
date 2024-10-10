import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../authService';
import { User } from '../../entities/user';
import { assert } from 'console';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  error : string;

  constructor(private authService : AuthService, private router : Router){

  }



  onSubmit(f : NgForm){

    const email = f.value.email;
    const password = f.value.password;
    

    

    this.authService.login({email : email, password : password}).subscribe(response => {

      this.authService.saveToken(response.token);
      this.router.navigate(['/dashboard']);
      
    },
    error => {
      this.error = "Invalid email or password."
    })

    
    


  }


}
