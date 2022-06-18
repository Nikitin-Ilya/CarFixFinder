import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import {OrdersService} from '../orders.service';
import {UserProfileDataService} from '../user-profile-data.service';


@Component({
  selector: 'app-executors',
  templateUrl: './executors.component.html',
  styleUrls: ['./executors.component.scss']
})
export class ExecutorsComponent implements OnInit {

  users = this.authService.getUsers();
  usersProfiles = this.authService.getUsersProfile();
  imagePath = "../../assets/img/header/profile-image.png";

  panelOpenState = true;

  task = {
    name: 'Усі',
    completed: false,
    color: 'primary',
  };

  constructor(
    public ordersService: OrdersService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userProfileDataService: UserProfileDataService
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

    this.authService.getUsersProfile().subscribe(usersProfiles => {
      console.log("usersProfiles " + usersProfiles);
      this.userProfile = usersProfiles as UserProfileDataService[];
      this.filteredProducts=usersProfiles as UserProfileDataService[];
    });
  }

  filters = { enginefix: false, carBodyfix: false, suspensionfix: false, brakeSystemfix: false, fuelSystemfix: false, wiringfix: false, anotherfix: false,
              geometryBodywork: false,straighteningBodywork: false,weldingBodywork: false,paintingBodywork: false,anotherBodywork: false,
              another: false};
  userProfile:UserProfileDataService[]=[];
  filteredProducts:UserProfileDataService[] = this.userProfile;

  filterChange() {
    this.filteredProducts = this.userProfile.filter(x =>
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
      this.filteredProducts=this.userProfile;
    }
  }

}
