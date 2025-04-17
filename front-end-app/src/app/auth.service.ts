import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  host = 'http://localhost:3000/';

  token: any;
  user: any;

  constructor(private http: HttpClient) { }

  // TODO: make a request to the server and get user categories data from the user profile

  registerUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.post(this.host + 'account/reg',
    user,
    {headers: headers}).pipe(map((response: any) => response));
  }

  authUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.post(this.host + 'account/auth',
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

  getUsers() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.get(this.host + 'account/getUsers',
    {headers: headers}).pipe(map((response: any) => response));
  }

  getUsersProfile(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.get(this.host + 'account/getUsersProfile',
    {headers: headers}).pipe(map((response: any) => response));
  }

  getUserByLogin(login: string){
    return this.getUsers().pipe(
      map((users: any) => users.find((user: any) => user.login === +login)!));
  }

  setImage(data: any) {
    return this.http.post(this.host + 'account/setProfileImage',
    data).pipe(map((response: any) => response));
  }

  updateUser(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.post(this.host + 'account/updateUserProfile',
    user,
    {headers: headers}).pipe(map((response: any) => response));
  }

  updateEmail(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.post(this.host + 'account/updateUserEmail',
    user,
    {headers: headers}).pipe(map((response: any) => response));
  }

  updatePassword(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.post(this.host + 'account/updateUserPassword',
    user,
    {headers: headers}).pipe(map((response: any) => response));
  }

  createComment(bid: any){
    console.log(bid);
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.post(this.host + 'account/create-comment',
    bid,
    {headers: headers}).pipe(map((response: any) => response));
  }

  getCommentsByLogin(orderInfo: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.post(this.host + 'account/getCommentsByLogin',orderInfo,
    {headers: headers}).pipe(map((response: any) => response));
  }


}
