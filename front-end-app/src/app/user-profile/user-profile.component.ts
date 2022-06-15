import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authService.getUsersProfile().forEach(element => {
      element.forEach((value: any) => {
        if(value.login===this.route.snapshot.params['login'])//this.route.snapshot.params['id'])
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

}
