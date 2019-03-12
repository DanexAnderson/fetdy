import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isNavbarCollapsed = true;
  private authListenerSubs: Subscription;
  userIsAuth = false;
  route = '';

  constructor(private authService: AuthService, private router: Router) {

    router.events.subscribe((url: any) => this.route = router.url );
   }

   onLogout() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    this.authService.logOut();
   }
  ngOnInit() {

    this.userIsAuth = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatus()
    .subscribe(isAuthenticated => {
      this.userIsAuth = isAuthenticated;


    });
  }

  ngOnDestroy() {

  }

}
