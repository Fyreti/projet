import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { UserApp } from '../model/user.model';
import { DataService } from './data.service';

@Injectable()
export class AuthGuardMairie implements CanActivate {

  constructor(public userApp: UserApp, 
    private dataService: DataService, 
    private router: Router) { }


  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.default.auth().onAuthStateChanged(
          (user) => {
            if(user) {
              this.dataService.getOneUser(user.email, this.userApp).then(() => {
                if (this.userApp.role.toUpperCase()=='MAIRIE'){
                  resolve(true);
                }
                else{
                  this.router.navigate(['/info-city']);
                  resolve(false);
                }
                }, (raison) => {
                console.log(raison); // Erreur !
              });
            } else {
              this.router.navigate(['/auth']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}