import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { promise } from "protractor";

@Injectable()
export class AuthService {

    isAuth = false;
  
    constructor() {}

    createNewUser(email: string, password: string){
      return new Promise<void>(
        (resolve, reject) => {
          firebase.default.auth().createUserWithEmailAndPassword(email, password).then(
            () => {
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
        }
      );
    }

    signInUser(email: string, password: string){
      return new Promise<void>(
        (resolve, reject) => {
          firebase.default.auth().signInWithEmailAndPassword(email, password).then(
            () => {
              this.isAuth = true;
              resolve();
            },
            (error) => {
              reject(error);
            }

          )
        }
      )
    }

    signOutUser() {
      firebase.default.auth().signOut();
    }

  }