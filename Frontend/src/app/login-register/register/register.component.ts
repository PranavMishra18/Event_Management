import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../entities/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../authService';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  

  constructor(private authService : AuthService, private router : Router){

  }



  onSubmit(f : NgForm){

    const username = f.value.username;
    const email = f.value.email;
    const password = f.value.password;
    const role = f.value.role;

    const user = new User(username,email,password,role);

    this.authService.register(user).subscribe(data => {
      this.router.navigate(['/login']);
      
    })

    
    


  }

}
