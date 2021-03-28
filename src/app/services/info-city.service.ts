import { formatDate } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, pairs } from 'rxjs';
import { InfoCity } from '../model/info-city.model';
import { UserApp } from '../model/user.model';

@Injectable()
export class InfoCityService {
    public message: string;
    public date: Date;
    public allInfo: Array<InfoCity> = [];
    public infoCity: InfoCity;
    
    constructor() {  }

    setInfoCity(userApp: UserApp, name: string, information: string, photo: string){
        if (userApp.role.toUpperCase()=='MAIRIE'){
            firebase.default.firestore().collection('ville').doc(userApp.ville).set({
                ville: userApp.ville
            });
            firebase.default.firestore().collection('ville').doc(userApp.ville).collection('info-city').doc(name+information).set({
                name: name,
                information: information,
                photo: photo
            });
        }
    }

    getInfoCity(userApp: UserApp){
        return new Promise<Array<InfoCity>>(
            (resolve, reject) => {
                firebase.default.firestore().collection('ville').doc(userApp.ville).collection('info-city').get()
                .then(snapshot => {
                this.allInfo = [];
                snapshot.forEach(doc => {
                    this.infoCity = new InfoCity();
                    this.infoCity.setInfo(doc.get('name'), doc.get('information') , doc.get('photo'));
                    this.allInfo.push(this.infoCity);  
                });
              
                resolve(this.allInfo);
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                    reject();
                });
            }
        );
    }

    deleteEvent(userApp: UserApp, name: string, information: string){
        if (userApp.role.toUpperCase() === "MAIRIE"){
            firebase.default.firestore().collection('ville').doc(userApp.ville).collection('info-city').doc(name+information).delete();
            console.log('info city DELETED');
        }
        
    }
}