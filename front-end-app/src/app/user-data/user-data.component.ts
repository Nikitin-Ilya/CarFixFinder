import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  email!: string;
  telegram!: string;
  oldPassword!: string;
  newPassword!: string;
  newPassword2!: string;
  public active = false;

  constructor(
    public authService: AuthService,
    private flashMessages: FlashMessagesService, ) { }

  ngOnInit(): void {}

  comparePass(){
    //this.newPassword2 = newValue;
    if(this.newPassword2===this.newPassword){
      this.active = false
    }
    else{
      this.active = true
    }
  }

  updateEmailClick(){
    const user ={
      login: this.authService.getUser().login,
      email: this.email
    }
    this.authService.updateEmail(user).subscribe(data => {
      if(!data.success){
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        },);
      } else {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 5000
        },)
      }
    });
  }

  /*updateTelegramClick(){
    const user ={
      login: this.authService.getUser().login,
      telegram: this.telegram
    }
    this.authService.updateTelegram(user).subscribe(data => {
      if(!data.success){
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        },);
      } else {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 5000
        },)
      }
    });
  }*/

  updatePasswordClick(){
    if (this.active) return;
    const user ={
      login: this.authService.getUser().login,
      newPassword: this.newPassword,
      oldPassword: this.oldPassword
    }
    this.authService.updatePassword(user).subscribe(data => {
      if(!data.success){
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        },);
      } else {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 5000
        },)
      }
    });
  }

}
