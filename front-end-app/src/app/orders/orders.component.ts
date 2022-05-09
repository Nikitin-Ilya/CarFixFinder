import { Component, OnInit } from '@angular/core';
import { IsLoggedIn } from '../isLogged.guard';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { AuthService } from '../auth.service';
import {OrdersService} from '../orders.service';
import { NumericTypes } from 'mongoose';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders = this.ordersService.getOrders();
  ordersCount = Object.keys(this.orders).length;

  constructor(
    public ordersService: OrdersService,
    private isLoggedIn: IsLoggedIn,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  createOrder(){
    if(this.isLoggedIn.canActivate()){
      this.router.navigate(['/create-order']);
    }
    else this.isLoggedIn.canActivate();
  }
}
