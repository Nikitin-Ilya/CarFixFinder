import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, ImageSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class EditProfileComponent implements OnInit {
  @ViewChild('defaultRTE')
  public rteObj! : RichTextEditorComponent;
  public insertImageSettings :ImageSettingsModel =
          { allowedTypes: ['.jpeg', '.jpg', '.png'], display: 'inline', width: 'auto', height: 'auto', saveFormat: 'Base64'};

  name!: String;
  title!: String;
  resume!: String;
  resumeHtml!: String;
  category!: String[];
  telegram!: String;

  constructor(
    private authService: AuthService,
    private flashMessages: FlashMessagesService,
  ) { }

  ngOnInit(): void {
    this.authService.getUsersProfile().forEach(element => {
      element.forEach((value: any) => {
        if(value.login===this.authService.getUser().login)//this.route.snapshot.params['id'])
        {
          //if(value.foto!=" ") {this.imagePath = "../../assets/img/uploads/" + value.foto;}
          this.name = value.name;
          this.title = value.title;
          this.resume = value.resume;
          this.resumeHtml = value.resumeHtml;
          this.rteObj.executeCommand('insertHTML', value.resumeHtml);
          this.telegram = value.telegram;
          this.category = value.category;

        }
      });
    });
  }

  updateUserClick(){
    //this.user = this.authService.getUser();
    //this.rteObj.insertImageSettings.saveFormat = 'Base64';
    console.log(this.rteObj.value);

    const user = {
      name: this.name,
      title: this.title,
      resume: this.rteObj.getText(),
      resumeHtml: this.rteObj.value,
      userLogin: this.authService.getUser().login,
      category: this.category,
      telegram: this.telegram
    };
    this.authService.updateUser(user).subscribe(data => {
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
    //return;
  }

}
