import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { UserApp } from '../model/user.model';

@Injectable()
export class DataService {

  constructor() { }

  getOneUser(email : string, userApp: UserApp){
      
    return new Promise(
        (resolve, reject) => {
            firebase.default.firestore().collection('users').doc(email).get().then(doc =>{
                if (doc.exists) {
                    console.log("Profil found:", doc.data());
                    
                    userApp.setUser(doc.get('age'), doc.get('email'), doc.get('role'), doc.get('ville'));

                    console.log(userApp.email);
                    console.log(userApp.age);
                    console.log(userApp.role);
                    console.log(userApp.ville);
                    
                    resolve(true);
                } else {
                    console.log("No profil found to this email");
                    reject();
                }
        }, (error) => {
            reject(error);
          } );
    
    });
  }
  

 /* getRole(){
      return this.userApp.role;
  }*/

}