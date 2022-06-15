import { Component, OnInit } from '@angular/core';
import { IsLoggedIn } from '../isLogged.guard';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { AuthService } from '../auth.service';
import {OrdersService} from '../orders.service';
import { OrderDataService } from '../order-data.service';
import { NumericTypes } from 'mongoose';
import {ThemePalette} from '@angular/material/core';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {

  orders = this.ordersService.getOrders();
  panelOpenState = true;

  task = {
    name: 'Усі',
    completed: false,
    color: 'primary',
  };

  constructor(
    public ordersService: OrdersService,
    private isLoggedIn: IsLoggedIn,
    private router: Router,
    private authService: AuthService,
    private orderDataService: OrderDataService,
  ) { }

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe(orders => {
      this.order = orders as OrderDataService[];
      this.filteredProducts=orders as OrderDataService[];
    });
  }

  createOrder(){
    if(this.isLoggedIn.canActivate()){
      this.router.navigate(['/create-order']);
    }
    else this.isLoggedIn.canActivate();
  }


  filters = { enginefix: false, carBodyfix: false, suspensionfix: false, brakeSystemfix: false, fuelSystemfix: false, wiringfix: false, anotherfix: false,
              geometryBodywork: false,straighteningBodywork: false,weldingBodywork: false,paintingBodywork: false,anotherBodywork: false,
              another: false};
  order:OrderDataService[]=[];
  filteredProducts:OrderDataService[] = this.order;

  filterChange() {
    this.filteredProducts = this.order.filter(x =>
      (x.category === 'Ремонт двигунів' && this.filters.enginefix)
      ||(x.category === 'Ремонт коробок передач' && this.filters.carBodyfix)
      ||(x.category === 'Ремонт ходової частини' && this.filters.suspensionfix)
      ||(x.category === 'Ремонт гальмівної системи' && this.filters.brakeSystemfix)
      ||(x.category === 'Ремонт паливної системи' && this.filters.fuelSystemfix)
      ||(x.category === 'Ремонт електропроводки' && this.filters.wiringfix)
      ||(x.category === 'Ремонт інших частин авто' && this.filters.anotherfix)

      ||(x.category === 'Відновлення геометрії' && this.filters.geometryBodywork)
      ||(x.category === 'Рихтовка' && this.filters.straighteningBodywork)
      ||(x.category === 'Сварка' && this.filters.weldingBodywork)
      ||(x.category === 'Покраска' && this.filters.paintingBodywork)
      ||(x.category === 'Інші види кузовних робіт' && this.filters.anotherBodywork)

      ||(x.category === 'Інші види робіт' && this.filters.another)
    );
    if(this.filters.enginefix==false&&this.filters.carBodyfix==false&&this.filters.suspensionfix==false&&this.filters.brakeSystemfix==false&&this.filters.fuelSystemfix==false&&this.filters.wiringfix==false&&this.filters.anotherfix==false&&
      this.filters.geometryBodywork==false&&this.filters.straighteningBodywork==false&&this.filters.weldingBodywork==false&&this.filters.paintingBodywork==false&&this.filters.anotherBodywork==false&&
      this.filters.another==false)
    {
      this.filteredProducts=this.order;
    }
  }
}
