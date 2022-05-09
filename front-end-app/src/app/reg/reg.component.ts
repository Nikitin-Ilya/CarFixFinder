import { Component, OnInit } from '@angular/core';
import { CheckFormService } from '../check-form.service';
import { AuthService } from '../auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {

  name!: String;
  login!: String;
  email!: String;
  password!: String;
  
  constructor(
    private checkForm: CheckFormService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  userRegisterClick(){
    const user = {
      name: this.name,
      email: this.email,
      login: this.login,
      password: this.password
    };
    
    if(!this.checkForm.checkName(user.name)){
      this.flashMessages.show("Ім'я користувача не введено", {
        cssClass: 'alert-danger',
        timeout: 5000
      },);
      console.log("Ім'я користувача не введено");
    } if(!this.checkForm.checkLogin(user.login)){
      this.flashMessages.show("Логін користувача не введено", {
        cssClass: 'alert-danger',
        timeout: 5000
      },);
      console.log("Логін користувача не введено");
    } if(!this.checkForm.checkEmail(user.email)){
      this.flashMessages.show("Email користувача не введено", {
        cssClass: 'alert-danger',
        timeout: 5000
      },);
      console.log("Email користувача не введено");
    } if(!this.checkForm.checkPassword(user.password)){
      this.flashMessages.show("Пароль користувача не введено", {
        cssClass: 'alert-danger',
        timeout: 5000
      },);
      console.log("Пароль користувача не введено");
      return false;
    } //else return true;

    this.authService.registerUser(user).subscribe(data => {
      if(!data.success){
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        },);
        this.router.navigate(['/reg']);
      } else {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 2000
        },);
        this.router.navigate(['/auth']);
      }
    });
    return;

  }

}
