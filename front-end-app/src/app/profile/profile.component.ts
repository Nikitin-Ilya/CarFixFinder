import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  selectedFile!: File;
  userLogin!: string;
  imagePath!: string;

  login!: any;
  name!: any;
  title!: any;
  resumeHtml!: any;

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getUsersProfile().forEach(element => {
      element.forEach((value: any) => {
        if(value.login===this.authService.getUser().login)//this.route.snapshot.params['id'])
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.userLogin = this.authService.getUser().login;

    const formData = new FormData();
    formData.append('filedata',this.selectedFile,this.userLogin);
    console.log(this.selectedFile);
    console.log(formData);
    /*const data = {
      image: this.selectedFile,
      id: this.userId
    };*/
    this.authService.setImage(formData).subscribe(data => {
      /*if(!data.success){
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        },);
        //this.uploadingStatus = data.msg;
      } else {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 5000
        },);*/
        this.imagePath = data.image;
        /*console.log(this.imagePath)
        this.uploadingStatus = data.msg;*/
    })
    //});
  }
}
