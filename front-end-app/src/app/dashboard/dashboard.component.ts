import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  selectedFile!: File;
  userLogin!: string;
  imagePath = "../../assets/img/header/profile-image.png";

  login!: any;
  name!: any;
  description!: any;

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authService.getUsers().forEach(element => {
      element.forEach((value: any) => {
        if(value.login===this.route.snapshot.params['id']) {
          this.imagePath = "../../assets/img/uploads/" + value.foto;
          this.login = value.login;
          this.name = value.name;

        }
      });
    });
  }

  logoutUser() {
    this.authService.logout();
    this.flashMessages.show("Ви вийшли з облікового запису", {
      cssClass: 'alert-warning',
      timeout:4000
    });
    this.router.navigate(['/auth']);
    return false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.userLogin = this.route.snapshot.params['id'];

    const formData = new FormData();
    formData.append('filedata',this.selectedFile,this.userLogin);
    console.log(this.selectedFile);
    console.log(formData);
    /*const data = {
      image: this.selectedFile,
      id: this.userId
    };*/
    this.authService.setImage(formData).subscribe(data => {
      if(!data.success){
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        },);
        //this.uploadingStatus = data.msg;
      } else {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 5000
        },);
        this.imagePath = "../../assets/img/uploads/" + data.image;
        /*console.log(this.imagePath)
        this.uploadingStatus = data.msg;*/
      }
    });
  }

}
