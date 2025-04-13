import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';

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
  user: User = new User({});

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.isAuthenticated = true;
      this.user = this.authService.user;
    }
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

}
