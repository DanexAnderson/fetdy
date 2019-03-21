import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isloading = false;
  valid = 0;
  private authStatusSubs: Subscription;
  maxDate: any;

  constructor(public authService: AuthService) { }

  onSignup(form: NgForm) {
    this.valid = 1;
    if (form.invalid) {
      return;
    }
    this.isloading = true;
    this.authService.createUser(form.value.email, form.value.password,
       form.value.firstname, form.value.lastname, form.value.birthday );
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
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
