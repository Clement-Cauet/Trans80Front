import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { FavoriteItemComponent } from '../../components/favorite-item/favorite-item.component';
import { HistoryItemComponent } from '../../components/history-item/history-item.component';
import { UserFavorite } from '../../models/user_favorite';
import { UserHistory } from '../../models/user_history';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    FormsModule,
    FavoriteItemComponent,
    HistoryItemComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  isAuthenticated: boolean = false;
  user: User = new User({});
  favorites: UserFavorite[] = [];
  histories: UserHistory[] = [];

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.isAuthenticated = true;
      this.user = this.authService.user;
      this.loadFavorites();
      this.loadHistories();
    }
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  loadFavorites() {
    this.userService.getUserFavorites().then(favorites => {
      this.favorites = favorites;
      console.log('Favorites:', this.favorites);
    }).catch(error => {
      console.error('Error loading favorites:', error);
    });
  }

  loadHistories() {
    this.userService.getUserHistory().then(histories => {
      this.histories = histories;
      console.log('Histories:', this.histories);
    }).catch(error => {
      console.error('Error loading histories:', error);
    });
  }

}
