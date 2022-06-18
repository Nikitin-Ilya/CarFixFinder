import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router, ActivatedRoute } from '@angular/router';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  selectedFile!: File;
  userLogin!: string;
  imagePath = "../../assets/img/header/profile-image.png";

  login!: any;
  name!: any;
  title!: any;
  resumeHtml!: any;

  comment!: string;
  userProfileInfo = {
    userProfileLogin: this.route.snapshot.params['login']
  };
  bids = this.authService.getCommentsByLogin(this.userProfileInfo);
  telegram!: string;

  public disable = false;
  public active = false;

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.authService.getUsersProfile().forEach(element => {
      element.forEach((value: any) => {
        if(value.login===this.route.snapshot.params['login'])
        {
          if(value.foto!=null) {this.imagePath = value.foto;}
          this.login = value.login;
          this.name = value.name;
          this.title = value.title;
          this.resumeHtml = value.resumeHtml;
        }
      });
    });
  }


  openDialog(/*enterAnimationDuration: string, exitAnimationDuration: string*/): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      //enterAnimationDuration,
      //exitAnimationDuration,
    });
  }

  addComment(){
    if (this.disable){ this.openDialog()}
    else{
      if(!this.active) this.active = true;
      else this.active = false;
    }
  }

  createComment(){
    const bid = {
      userProfileLogin: this.route.snapshot.params['login'],
      comment: this.comment,
      userCommentLogin: this.authService.getUser().login
    };
    this.authService.createComment(bid).subscribe(data => {
      if(!data.success){
        console.log(data.msg);
        /*this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        },);
        this.router.navigate(['/create-order']);*/
      } else {
        this.active = false;
        this.disable = true;
        this.bids = this.authService.getCommentsByLogin(this.userProfileInfo);
        console.log(data.msg);
        /*this.flashMessages.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 2000
        },);
        this.router.navigate(['/orders']);*/
      }
    });
    return;
  }

}
