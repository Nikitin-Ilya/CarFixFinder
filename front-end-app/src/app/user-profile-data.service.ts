import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileDataService {

  constructor() { }
  _id!: String;
  login!:String;
  name!:String;
  foto!:String;
  title!:String;
  resume!:String;
  resumeHtml!:String;
  category!:String;
  telegram!:String;
}
