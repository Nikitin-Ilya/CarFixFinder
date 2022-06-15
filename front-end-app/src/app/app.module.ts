import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegComponent } from './reg/reg.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ExecutorsComponent } from './executors/executors.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserDataComponent } from './user-data/user-data.component';

import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

import { FormsModule } from '@angular/forms';
import { CheckFormService } from './check-form.service';
import { FlashMessagesModule } from 'flash-messages-angular';
import { AuthService } from './auth.service';
import { OrdersService } from './orders.service';
import { HttpClientModule } from '@angular/common/http';
import { OrdersRoutingModule } from './orders/orders-routing/orders-routing.module';
import { ExecutorsRoutingModule } from './executors/executors-routing/executors-routing.module';

import { IsLoggedIn } from './isLogged.guard';

import { editAreaClick, RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { UserProfileComponent } from './user-profile/user-profile.component';

import {ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTreeModule} from '@angular/material/tree';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

const appRoute: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [IsLoggedIn],
    children:[{ path: 'profile', component: ProfileComponent },
              { path: 'edit-profile', component: EditProfileComponent },
              { path: 'user-data', component: UserDataComponent },],},
  {path: 'executors', component: ExecutorsComponent},
  {path: 'orders', component: OrdersComponent},
  //{path: 'orders/:id', component: OrderDetailComponent},
  {path: 'reg', component: RegComponent},
  {path: 'create-order', component: CreateOrderComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegComponent,
    AuthComponent,
    DashboardComponent,
    HomeComponent,
    OrdersComponent,
    ExecutorsComponent,
    FooterComponent,
    CreateOrderComponent,
    ProfileComponent,
    EditProfileComponent,
    UserDataComponent,
    UserProfileComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute),
    BrowserModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    RichTextEditorModule,
    OrdersRoutingModule,
    ExecutorsRoutingModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatTreeModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    CheckFormService,
    AuthService,
    IsLoggedIn,
    OrdersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
