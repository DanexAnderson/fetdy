import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
// import { Post } from './post/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'TrueFan';

  constructor(private authService: AuthService) {}

 ngOnInit(): void {

    this.authService.autoAuthUser();
  }

}
