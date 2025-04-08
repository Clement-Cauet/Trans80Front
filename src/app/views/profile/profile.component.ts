import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  isAuthenticated: boolean = false;
  firstName: string = '';
  lastName: string = '';
  email: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();

    if (this.isAuthenticated) {
      const userData = this.authService.userData;
      this.firstName = userData.given_name || '';
      this.lastName = userData.family_name || '';
      this.email = userData.email || '';
    }
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

}
