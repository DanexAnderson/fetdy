
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations:
  [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}