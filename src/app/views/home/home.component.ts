import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  user: User = new User({});

  constructor(private authService: AuthService) { }
  
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.user = this.authService.user;
    }
  }

}
