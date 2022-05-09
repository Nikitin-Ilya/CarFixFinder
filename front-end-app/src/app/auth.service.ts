import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.post('http://localhost:3000/account/reg',
    user,
    {headers: headers}).pipe(map((response: any) => response));
  }

  authUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.post('http://localhost:3000/account/auth',
    user,
    {headers: headers}).pipe(map((response: any) => response));
  }

  storeUser(token: any, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  getUser() {
    //console.log(localStorage.getItem('user') || '{}');
    //return localStorage.getItem('user');
    return (JSON.parse(localStorage.getItem('user') || '{}'));
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  };

  isLoggedIn(): any {
    if(localStorage.getItem('token')!=undefined) return true;
  };

}
