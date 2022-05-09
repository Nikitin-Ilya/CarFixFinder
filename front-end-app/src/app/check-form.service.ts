import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckFormService {

  constructor() { }

  checkName(name: String) {
    if(name == undefined)
      return false;
    else
      return true;
  }

  checkLogin(login: String) {
    if(login == undefined)
      return false;
    else
      return true;
  }

  checkEmail(email: String) {
    if(email == undefined)
      return false;
    else
      return true;
  }

  checkPassword(password: String) {
    if(password == undefined)
      return false;
    else
      return true;
  }

}
