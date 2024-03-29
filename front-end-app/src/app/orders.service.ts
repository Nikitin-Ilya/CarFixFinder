import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  createOrder(order: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.post('account/create-order',
    order,
    {headers: headers}).pipe(map((response: any) => response));
  }

  getOrders(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.get('account/orders',
    {headers: headers}).pipe(map((response: any) => response));
  }

  getOrder(id: string){
    return this.getOrders().pipe(
      // (+) before `id` turns the string into a number
      map((orders: any) => orders.find((order: any) => order._id === +id)!)
    );


    /*let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.get('http://localhost:3000/account/orders',
    {headers: headers}).pipe(map((orders: any) => orders.find((order: any) => order._id === +id)!));*/
  }

  createBid(bid: any){
    console.log(bid);
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.post('account/create-bid',
    bid,
    {headers: headers}).pipe(map((response: any) => response));
  }

  getBids(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.get('account/bids',
    {headers: headers}).pipe(map((response: any) => response));
  }

  getBidsByOrderId(orderInfo: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', "applicaton/json");
    return this.http.post('account/getBidsByOrderId',orderInfo,
    {headers: headers}).pipe(map((response: any) => response));
  }

}
