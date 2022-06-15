import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  login!: String;
  password!: String;

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {}

  userLoginClick() {
    const user = {
      login: this.login,
      password: this.password
    };

    if(user.password == undefined) {
      this.flashMessages.show("Введіть пароль", {
        cssClass: 'alert-danger',
        timeout: 5000
      },);
      return false;
    }

    this.authService.authUser(user).subscribe(data => {
      if(!data.success) {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        },);
      } else {
        /*this.flashMessages.show("Авторизація пройшла успішно", {
          cssClass: 'alert-success',
          timeout: 4000
        },);*/
        this.router.navigate(['/dashboard/profile']);
        this.authService.storeUser(data.token, data.user);
      }
    });
    return;
  }

}
