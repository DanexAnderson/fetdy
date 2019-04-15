import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';  // state mangement
import * as fromRoot from '../../app.reducer';  // state managemet App Root file


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isloading = false;

  isloading$: Observable<boolean>;
  valid = 0; // mat error form true or false
  private authStatusSubs: Subscription;
  constructor(public authService: AuthService, private store: Store<{ui: fromRoot.State}>) { }

  onLogin(form: NgForm) {
    this.valid = 1;
    if (form.invalid) {
      return;
    }

    this.isloading = true;

    this.authService.loginUser(form.value.email, form.value.password);
  }

  ngOnInit() {

    this.isloading$ = this.store.select(fromRoot.getIsLoading);
    // this.isloading$ = this.store.select(state => state.ui.isLoading); // state management type state
    this.authStatusSubs = this.authService.getAuthStatus().subscribe(
      authStatus => {
       this.isloading = false;
          this.isloading$ = this.store.select(fromRoot.getIsLoading);
      }
    );
  }

  ngOnDestroy() {
    this.authStatusSubs.unsubscribe();
  }

}
