import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
    
  constructor() { }



  getOneUser(email : string){
      
    return new Promise(
        (resolve, reject) => {
            firebase.default.firestore().collection('users').doc(email).get().then(function(doc) {
                if (doc.exists) {
                    console.log("Profil found:", doc.data());
                    resolve(doc.data);
                } else {
                    console.log("No profil found to this email");
                    resolve(false);
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