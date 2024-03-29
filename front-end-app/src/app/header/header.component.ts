import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user = this.authService.getUser().login;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  public active = false;

  public burgerMenuClick(){
    if(!this.active) this.active = true;
    else this.active = false;
  }


}
