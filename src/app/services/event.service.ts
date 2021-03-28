import { formatDate } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, pairs } from 'rxjs';
import { Event } from '../model/event.model';
import { UserApp } from '../model/user.model';

@Injectable()
export class EventService {
    public message: string;
    public date: Date;
    public allEvent: Array<Event> = [];
    public event: Event;
    public id: string;
    
    constructor() {  }

    setEvent(userApp: UserApp, name: string, information: string, photo: string, dateDebut: Date, dateFin: Date){
        if (userApp.role.toUpperCase()=='MAIRIE'){
            firebase.default.firestore().collection('ville').doc(userApp.ville).set({
                ville: userApp.ville
            });
            this.id = Date.parse(dateDebut.toString()).toString().concat(name);
            firebase.default.firestore().collection('ville').doc(userApp.ville).collection('event').doc(this.id).set({
                name: name,
                information: information,
                photo: photo,
                dateDebut: dateDebut,
                dateFin: dateFin
            });
        }
    }

    getEvent(userApp: UserApp){
        return new Promise<Array<Event>>(
            (resolve, reject) => {
                firebase.default.firestore().collection('ville').doc(userApp.ville).collection('event').get()
                .then(snapshot => {
                    this.allEvent = [];
                    snapshot.forEach(doc => {
                        this.event = new Event();
                        this.event.setEvent(doc.get('name'), doc.get('information') , doc.get('photo'), doc.get('dateDebut'), doc.get('dateFin'));
                        this.allEvent.push(this.event);  
                    });
                    resolve(this.allEvent);
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                    reject();
                });
            }
        );
    }

    deleteEvent(userApp: UserApp, dateDebut: Date, eventName: string){
        if (userApp.role.toUpperCase() === "MAIRIE"){
            this.id = Date.parse(dateDebut.toString()).toString().concat(eventName);
            console.log(this.id);
            
            firebase.default.firestore().collection('ville').doc(userApp.ville).collection('event').doc(this.id).delete();
            console.log('DELETED');
        }
        
    }
}