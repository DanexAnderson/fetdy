import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Post } from './post/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'TrueFan';
  route: boolean;

  constructor(private authService: AuthService, private router: Router) {
    router.events.subscribe((url: any) => this.route = router.url.includes('/fitness') );
  }

 ngOnInit(): void {

    this.authService.autoAuthUser();
  }

}
