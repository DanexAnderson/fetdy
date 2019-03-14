import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isloading = false;
  valid = 0; // mat error form true or false
  private authStatusSubs: Subscription;
  constructor(public authService: AuthService) { }

  onLogin(form: NgForm) {
    this.valid = 1;
    if (form.invalid) {
      return;
    }

    this.isloading = true;
    this.authService.loginUser(form.value.email, form.value.password);
  }

  ngOnInit() {
    this.authStatusSubs = this.authService.getAuthStatus().subscribe(
      authStatus => {
        this.isloading = false;
      }
    );
  }

  ngOnDestroy() {
    this.authStatusSubs.unsubscribe();
  }

}
