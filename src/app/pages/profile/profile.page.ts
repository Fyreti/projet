import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UserApp } from 'src/app/model/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {


  constructor(public userApp : UserApp,
              public dataService: DataService) {}

  ngOnInit() {
    var user = firebase.default.auth().currentUser; //Get the user who is connected

    // Set userApp object
    this.dataService.getOneUser(user.email, this.userApp).then(() =>{}
      , (raison) => {
      console.log(raison);
    });
  }

  emailAddress = this.userApp.email;
  message = "";

  resetPassword() {
    return new Promise(
      (resolve, reject) => {
        firebase.default.auth().sendPasswordResetEmail(this.emailAddress).then(
          () => {
          this.message = "email de réinitialisation envoyé !"
          resolve(true);
        },(error) => {
          this.message = "Erreur lors de l'envoi de l'email de réinitialisation !"
          reject(error);
        }
        );
      }
    );
  }
}