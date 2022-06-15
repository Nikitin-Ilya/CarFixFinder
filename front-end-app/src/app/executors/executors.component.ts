import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import {OrdersService} from '../orders.service';


@Component({
  selector: 'app-executors',
  templateUrl: './executors.component.html',
  styleUrls: ['./executors.component.scss']
})
export class ExecutorsComponent implements OnInit {

  users = this.authService.getUsers();
  usersProfiles = this.authService.getUsersProfile();
  imagePath = "../../assets/img/header/profile-image.png";

  constructor(
    public ordersService: OrdersService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authService.getUsersProfile().forEach(element => {
      element.forEach((value: any) => {
        if(value.login===this.authService.getUser().login)//this.route.snapshot.params['id'])
        {
          if(value.foto!=null) {this.imagePath = "../../assets/img/uploads/" + value.foto;}
        }
      });
    });
  }

}
