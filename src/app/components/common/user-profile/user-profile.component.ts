import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  constructor() {}
  throwError: boolean = false;

  ngOnInit(): void {
    if (this.throwError) {
      throw new Error('error not handled');
    }
  }
}
