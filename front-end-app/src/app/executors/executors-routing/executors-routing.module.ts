import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

const executorsRoutes: Routes = [
  //{ path: 'orders', component: OrdersComponent },
  { path: 'executors/:login', component: UserProfileComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(executorsRoutes)
  ],
  exports: [RouterModule]
})

export class ExecutorsRoutingModule { }
