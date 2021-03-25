import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import * as firebase from 'firebase';
import { InfoCity } from 'src/app/model/info-city.model';
import { UserApp } from 'src/app/model/user.model';
import { DataService } from 'src/app/services/data.service';
import { InfoCityService } from 'src/app/services/info-city.service';

@Component({
  selector: 'app-info-city',
  templateUrl: './info-city.page.html',
  styleUrls: ['./info-city.page.scss'],
})
export class InfoCityPage implements OnInit {

  allInfo: Array<InfoCity> = [];

  constructor(public infoCityService: InfoCityService,
              public userApp: UserApp,
              public dataService: DataService,
              public router: Router) { }

  ngOnInit() {
    var user = firebase.default.auth().currentUser; //Get the user who is connected
    this.dataService.getOneUser(user.email, this.userApp).then(() => {
      this.infoCityService.getInfoCity(this.userApp).then((allInfo) => {
        this.allInfo = allInfo;
        firebase.default.firestore().collection('ville').doc('Paris').collection('info-city')
        .onSnapshot((querySnapshot) => {
          this.infoCityService.getInfoCity(this.userApp).then((allInfo) => {
            this.allInfo = allInfo;
          }); 
        });
      }); 
    }, (raison) => {
      console.log(raison); // Erreur !
    });//set the object userApp with all info of the user who is connected
  }

  goToInfoCityForm() {
    console.log("redirection");
    this.router.navigate(['/info-city-form']);
  }

}
