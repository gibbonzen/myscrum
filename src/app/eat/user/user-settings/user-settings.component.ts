import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/firebase/auth.service';

@Component({
  selector: 'eat-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  private user: firebase.User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.onAuthStateChanged(user => this.user = user);
  }

  getUserEmail() {
    return this.user ? this.user.email : "";
  }

  onSignOut() {
    this.authService.signOut();
  }

}
