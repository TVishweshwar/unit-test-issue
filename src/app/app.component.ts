import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService, User } from './services/auths/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements DoCheck, OnInit {
  isLoggedIn = this.authService.getisLoggedIn();
  user: User | undefined;
  token: string | null = '';
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
    if (this.token) {
      this.authService.setisLoggedIn(true);
    } else {
      this.authService.setisLoggedIn(false);
    }
    this.isLoggedIn = this.authService.getisLoggedIn();
  }

  ngDoCheck(): void {
    this.isLoggedIn = this.authService.getisLoggedIn();
  }

  title = 'shell';
}
