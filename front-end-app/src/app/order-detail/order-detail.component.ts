import { Component, OnInit } from '@angular/core';

import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { OrdersService } from '../orders.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order$!: any;
  orderId!: string;

  price!: Int32Array;
  terms!: Int16Array;
  comment!: string;
  orderInfo = {
    orderId: this.route.snapshot.params['id']
  };
  bids = this.orderService.getBidsByOrderId(this.orderInfo);
  telegram!: string;

  public disable = false;
  public active = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.orderService.getOrders().forEach(element => {
      element.forEach((value: any) => {
        if(value._id===this.route.snapshot.params['id']) {this.order$ = value;}
      });
    });

    this.bids.forEach(element => {
      //if(element.userLogin===this.authService.getUser()) {this.disable = true; console.log(element.userLogin)}
      element.forEach((value: any) => {
        console.log(value)
        if(value.userLogin===this.authService.getUser().login) {this.disable = true;}
      });
    });

    this.authService.getUsersProfile().forEach(element => {
      element.forEach((value: any) => {
        this.bids.forEach(element => {
          element.forEach((value: any) => {
            console.log(value)
            if(value.login===this.route.snapshot.params['login'])
            {

            }
            if(value.userLogin===this.authService.getUser().login) {this.disable = true;}
          });
        });
      });
    });
  }

  openDialog(/*enterAnimationDuration: string, exitAnimationDuration: string*/): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      //enterAnimationDuration,
      //exitAnimationDuration,
    });
  }

  addBid(){
    if (this.disable){ this.openDialog()}
    else{
      if(!this.active) this.active = true;
      else this.active = false;
    }
  }

  createBid(){
    const bid = {
      orderId: this.route.snapshot.params['id'],
      price: this.price,
      terms: this.terms,
      comment: this.comment,
      userLogin: this.authService.getUser().login
    };
    this.orderService.createBid(bid).subscribe(data => {
      if(!data.success){
        console.log(data.msg);
        /*this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        },);
        this.router.navigate(['/create-order']);*/
      } else {
        this.active = false;
        this.disable = true;
        this.bids = this.orderService.getBidsByOrderId(this.orderInfo);
        console.log(data.msg);
        /*this.flashMessages.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 2000
        },);
        this.router.navigate(['/orders']);*/
      }
    });
    return;
  }

}
