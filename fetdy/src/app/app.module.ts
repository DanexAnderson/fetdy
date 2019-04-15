import { AuthInterceptor } from './auth/auth-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header/header.component';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { PostsModule } from './post/post.module';
import { StopTrainingComponent } from './training/current-training/stop-training.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LandingPageComponent } from './dashboards/landing-page/landing-page.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    StopTrainingComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModule,
    NgbModule,
    BrowserAnimationsModule,
    PostsModule,
    AngularSvgIconModule,
    StoreModule.forRoot(reducers),

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
             ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, StopTrainingComponent]
})
export class AppModule { }
