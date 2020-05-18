import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/firebase/auth.service';


@Component({
  selector: 'eat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'post-eat';
  isAuth: boolean;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.onAuthStateChanged(user => {
      this.isAuth = user ? true : false;
    });
  }
}
