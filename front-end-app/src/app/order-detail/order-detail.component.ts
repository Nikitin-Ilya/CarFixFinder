import { Component, OnInit } from '@angular/core';

import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order$!: any;
  orderId!: string;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService,
  ) {}

  ngOnInit(): void {
    /*this.order$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.orderService.getOrder(params.get('id')!))
    );
    console.log(this.order$);*/

    /*this.orderId=this.route.snapshot.params['id'];
    console.log(this.orderId)
    this.orderService.getOrder(this.orderId).subscribe(event=>{
    this.order$=event;
    console.log(this.order$,'movie event')
    })*/

    /*this.order$ = this.orderService.getOrder(this.route.snapshot.params['id']);
    console.log(this.order$);*/

    this.orderService.getOrders().forEach(element => {
      element.forEach((value: any) => {
        if(value._id===this.route.snapshot.params['id']) {this.order$ = value; console.log(value);}
      });
    });

  }

}
