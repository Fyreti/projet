import { Component, Input, OnInit } from '@angular/core';
import { UserApp } from 'src/app/model/user.model';
import { DataService } from 'src/app/services/data.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
  providers: [UserApp],
})
export class FAQPage implements OnInit {

  constructor(public userApp: UserApp, private dataService: DataService) { 
    console.log(userApp.email);
  }

  ngOnInit() {
    var user = firebase.default.auth().currentUser;//Get the user who is connected
    this.dataService.getOneUser(user.email, this.userApp).then();//set the object userApp with all info of the user who is connected
  }

}
