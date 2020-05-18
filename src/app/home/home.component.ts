import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/firebase/auth.service';
import { PixabayService } from 'src/api/pixabay.service';


@Component({
  selector: 'eat-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAuth: boolean;

  constructor(private authService: AuthService,
    private pixabayService: PixabayService) { }

  ngOnInit(): void {
    this.authService.onAuthStateChanged(user => {
      console.log("user: ", user.email);
      this.isAuth = user ? true : false;
    });
  }

}
