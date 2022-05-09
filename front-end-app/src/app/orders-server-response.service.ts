import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersServerResponse {

  id! : String;
  name! : String;
  description! : String;
  descriptionHTML! : String;
  date! : String;
  time! : String;

  constructor() { }
}
