import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { promise } from "protractor";

@Injectable()
export class AuthService {
  
    constructor() {}

    createNewUser(email: string, password: string){
      return new Promise(
        (resolve, reject) => {
          firebase.default.auth().createUserWithEmailAndPassword(email, password).then(
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

  }