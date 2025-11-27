import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../model/User.model';
import { Auth } from '../service/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styles: ``
})
export class Login {
  user = new User();
  erreur = 0;

  constructor(private authService: Auth, private router: Router) { }

  onLoggedin() {
    console.log(this.user);
    let isValidUser: Boolean = this.authService.SignIn(this.user);
    
    if (isValidUser) {
      this.router.navigate(['/']); 
    } else {
      this.erreur = 1;
      alert('Login ou mot de passe incorrecte!');
    }
  }
}