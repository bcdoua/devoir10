import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from './service/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html'
})
export class AppComponent {
  title = "Accessoires";
  
  constructor(public authService: Auth) {}
  
  ngOnInit() {
    let isloggedin: string;
    let loggedUser: string;
    
    isloggedin = localStorage.getItem('isloggedIn')!;
    loggedUser = localStorage.getItem('loggedUser')!;
    
    if (isloggedin == "true" && loggedUser) {
      this.authService.setLoggedUserFromLocalStorage(loggedUser);
    }
  }
  
  onLogout() {
    this.authService.logout();
  }
}