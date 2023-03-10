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
    return this.http.post('account/reg',
    user,
    {headers: headers}).pipe(map((response: any) => response));
  }

  authUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.post('account/auth',
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
    /*return this.http.post('http://localhost:3000/account/getUserByLogin',
    login).pipe(map((response: any) => response));*/
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.get('account/getUsers',
    {headers: headers}).pipe(map((response: any) => response));
  }

  getUsersProfile(){
    /*return this.http.post('http://localhost:3000/account/getUserByLogin',
    login).pipe(map((response: any) => response));*/
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.get('account/getUsersProfile',
    {headers: headers}).pipe(map((response: any) => response));
  }

  getUserByLogin(login: string){
    return this.getUsers().pipe(
      // (+) before `id` turns the string into a number
      map((users: any) => users.find((user: any) => user.login === +login)!));
  }

  setImage(data: any) {
    return this.http.post('account/setProfileImage',
    data).pipe(map((response: any) => response));
    /*.subscribe(res => {
      console.log(res);
      return res;
    });*/
  }

  updateUser(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.post('account/updateUserProfile',
    user,
    {headers: headers}).pipe(map((response: any) => response));
  }

  updateEmail(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.post('account/updateUserEmail',
    user,
    {headers: headers}).pipe(map((response: any) => response));
  }

  updatePassword(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.post('account/updateUserPassword',
    user,
    {headers: headers}).pipe(map((response: any) => response));
  }

  createComment(bid: any){
    console.log(bid);
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.post('account/create-comment',
    bid,
    {headers: headers}).pipe(map((response: any) => response));
  }

  getCommentsByLogin(orderInfo: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.post('account/getCommentsByLogin',orderInfo,
    {headers: headers}).pipe(map((response: any) => response));
  }


}
