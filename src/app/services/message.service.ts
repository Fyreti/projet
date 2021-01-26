import { formatDate } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { UserApp } from '../model/user.model';
import { DatePipe } from '@angular/common'
import { MessageApp } from '../model/message.model';

@Injectable()
export class MessageService {
    public allMessage: Array<MessageApp> = [];
    public message: string;
    public date: Date;
    public messageApp : MessageApp;
    
  constructor(public datepipe: DatePipe) {  }

  sendMessage(message : string, userApp: UserApp){

    this.date = new Date();
    console.log(this.date);
    if (userApp.role.toUpperCase()=='Valid'.toUpperCase())
    firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(userApp.email).collection('message').doc(this.date.toString()).set({
        message_user: message
      });
    else if (userApp.role.toUpperCase()=='mairie'.toUpperCase()){
    firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(userApp.email).collection('message').doc(this.date.toString()).set({
        message_mairie: message
        });
    }
  }
  
  receiveMessage(userApp: UserApp){
    return new Promise<Array<MessageApp>>(
      (resolve, reject) => {
        firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(userApp.email).collection('message').get()
        .then(snapshot => {
          this.allMessage = [];
          snapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            if (doc.get('message_user')){
              this.messageApp = new MessageApp();
              this.messageApp.setMessage("User", doc.get('message_user'));
              this.allMessage.push(this.messageApp);
            }
            else{
              this.messageApp = new MessageApp();
              this.messageApp.setMessage("Mairie", doc.get('message_mairie'));
              this.allMessage.push(this.messageApp);
            }
            
        });
        
        resolve(this.allMessage);
      })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
            reject();
        });
    
      }
    )
  }
}