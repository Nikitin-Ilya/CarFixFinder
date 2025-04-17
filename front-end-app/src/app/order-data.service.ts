import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  constructor() { }
  _id!: String;
  name!:String;
  description!:String;
  descriptionHtml!:String;
  date!:number;
  category!:string;
  userLogin!:string;
}
