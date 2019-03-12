import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isloading = false;
  valid = 0;

  constructor(public authService: AuthService) { }

  onSignup(form: NgForm) {
    this.valid = 1;
    if (form.invalid) {
      return;
    }
    this.isloading = true;
    this.authService.createUser(form.value.email, form.value.password);
  }


  ngOnInit() {
  }

}
