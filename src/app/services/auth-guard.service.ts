import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { UserApp } from '../model/user.model';
import { DataService } from './data.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    public userApp: UserApp, 
    private dataService: DataService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.default.auth().onAuthStateChanged(
          (user) => {
            if(user) {
                this.dataService.getOneUser(user.email, this.userApp).then(() => {
                if (this.userApp.role.toUpperCase()!=='NOTVALID'){
                  resolve(true);
                }
                else{
                  this.router.navigate(['/notvalid']);
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