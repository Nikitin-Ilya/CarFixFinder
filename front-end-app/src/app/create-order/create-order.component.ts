import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { OrdersService } from '../orders.service';
import { AuthService } from '../auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import { Console } from 'console';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})

export class CreateOrderComponent implements OnInit {
  @ViewChild('defaultRTE')
  public rteObj! : RichTextEditorComponent;

  name!: String;
  description!: String;
  descriptionHtml!: String;
  userLogin!: String;

  constructor(
    private ordersService: OrdersService,
    private authService: AuthService,
    private flashMessages: FlashMessagesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  createOrderClick(){
    //this.user = this.authService.getUser();


    const order = {
      name: this.name,
      description: this.rteObj.getText(),
      descriptionHtml: this.rteObj.getHtml(),
      userLogin: this.authService.getUser().login
    };
    this.ordersService.createOrder(order).subscribe(data => {
      if(!data.success){
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        },);
        this.router.navigate(['/create-order']);
      } else {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 2000
        },);
        this.router.navigate(['/orders']);
      }
    });
    return;
  }
}
