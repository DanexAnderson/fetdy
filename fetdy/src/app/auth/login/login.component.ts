import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isloading = false;
  valid = 0; // mat error form true or false

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
  }

}
