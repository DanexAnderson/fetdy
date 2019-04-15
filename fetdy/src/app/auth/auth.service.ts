import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';  // import everything from a file

import * as UI from '../shared/ui.actions';

const BACKEND_URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusLister = new Subject<boolean>();
  private namesListner = new Subject<string>();
  Fname = '' ;



  constructor(private http: HttpClient, private router: Router,
      private store: Store<{ui: fromRoot.State}>) { }

  getToken() {
    return this.token;
  }

  getNames() {
    return this.Fname ;
  }

   getNamesSubs() {
    return this.namesListner.asObservable();
  }

  getIsAuth() {
    return this.isAuth;
  }

  getAuthStatus() {
    return this.authStatusLister.asObservable();
  }

  createUser(email: string, password: string, firstname: string,
     lastname: string, birthday: string) {       // SignUp Component
    const authData: any = {email: email, password: password, firstname: firstname,
    lastname: lastname, birthday: birthday };
    return this.http.post(BACKEND_URL + 'signup', authData)
    .subscribe(() => {

    this.loginUser(email, password);
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
      this.authStatusLister.next(false);
    }

    );
  }


  logOut() {
    this.token = null;
    this.isAuth = false;
    this.namesListner.next('');
    this.authStatusLister.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/home']);
  }

  loginUser(email: string, password: string) {

    const authData: AuthData = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number, userId: string, names: any }>
    (BACKEND_URL + 'login', authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      this.Fname = response.names.firstname;

      if (token) {
        this.namesListner.next(this.Fname);
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuth = true;
        this.userId = response.userId;

        this.store.dispatch(new UI.StartLoading()); // Start isloading state management
        // this.store.dispatch({type: 'START_LOADING'}); // start isLoading state management

        this.authStatusLister.next(true);
        const now = new Date();
        const expirationDate = new Date (now .getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate, this.userId, this.Fname);

        setTimeout( () => { this.store.dispatch(new UI.StopLoading()); } , 1000 ); // testing state management

         this.router.navigate(['/home']);


      }

    }, error => {

      this.store.dispatch(new UI.StopLoading());
      // this.store.dispatch({type: 'STOP_LOADING'});
      this.authStatusLister.next(false);
    });
  }

  getUserId() {
    return this.userId;
  }

  autoAuthUser() {

    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuth = true;
      this.userId = authInfo.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusLister.next(true);
      this.Fname = authInfo.names;
      // this.namesListner.next(authInfo.names);
    }
  }

  private setAuthTimer(duration: number) {
   // console.log('Seting timer: ' + duration );
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const names = localStorage.getItem('names');
    if ( !token || !expirationDate) {

      return;
    }

    return { token: token, expirationDate: new Date(expirationDate), userId: userId, names: names };
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, names: string) {

    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('names', names);
  }

  private clearAuthData() {

    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('names');
  }

}
