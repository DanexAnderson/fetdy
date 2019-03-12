import { AuthInterceptor } from './auth/auth-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './post/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule, MatButtonModule, MatPaginatorModule, MatIconModule } from '@angular/material';
import { MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule, MatMenuModule } from '@angular/material';

import { ListComponent } from './post/list/list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    HeaderComponent,
    ListComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,
    MatInputModule, MatCardModule, MatToolbarModule,
    AppRoutingModule, MatButtonModule, MatExpansionModule,
    // NgbModule.forRoot()
    NgbModule, MatProgressSpinnerModule, MatPaginatorModule,
    BrowserAnimationsModule, ReactiveFormsModule,
    MatMenuModule, MatIconModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
