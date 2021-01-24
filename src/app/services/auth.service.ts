import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { promise } from "protractor";

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
    constructor(private router : Router) {}

    createNewUser(email: string, password: string, ville: string, age: number){
      return new Promise(
        (resolve, reject) => {
          firebase.default.auth().createUserWithEmailAndPassword(email, password).then(
            (user) => {
              if(user){
                this.createUser(email, ville, age).then(
                )
              }
              resolve(true);
            },
            (error) => {
              reject(error);
            }
          );
        }
      );
    }

    signInUser(email: string, password: string) {
      return new Promise(
        (resolve, reject) => {
          firebase.default.auth().signInWithEmailAndPassword(email, password).then(
            () => {
              resolve(true);
            },
            (error) => {
              reject(error);
            }
          );
        }
      );
  }

    signOutUser() {
      firebase.default.auth().signOut();
    }

    createUser(email, ville, age){
      return firebase.default.firestore().collection('users').add({
        email: email,
        ville: ville,
        age: age
      });
    }

  }