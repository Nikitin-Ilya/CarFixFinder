import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//import { OrdersComponent } from '../orders.component';
import { OrderDetailComponent } from '../../order-detail/order-detail.component';

const OrdersRoutes: Routes = [
  //{ path: 'orders', component: OrdersComponent },
  { path: 'orders/:id', component: OrderDetailComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(OrdersRoutes)
  ],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
