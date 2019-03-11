import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './post/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule, MatButtonModule, MatPaginatorModule } from '@angular/material';
import { MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule } from '@angular/material';
import { HeaderComponent } from './header/header/header.component';
import { ListComponent } from './post/list/list.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    HeaderComponent,
    ListComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    MatInputModule, MatCardModule, MatToolbarModule,
    AppRoutingModule, MatButtonModule, MatExpansionModule,
    // NgbModule.forRoot()
    NgbModule, MatProgressSpinnerModule, MatPaginatorModule,
    BrowserAnimationsModule, ReactiveFormsModule
    // ,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
