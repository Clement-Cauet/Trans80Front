import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  givenName: string = '';

  constructor(private authService: AuthService) { }
  
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.givenName = this.authService.userData.given_name;
    }
  }

}
