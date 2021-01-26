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
    public allUser: Array<string> = [];
    
  constructor(public datepipe: DatePipe) {  }

  sendMessage(message : string, userApp: UserApp){

    this.date = new Date();
    console.log(this.date);
    if (userApp.role.toUpperCase()=='VALID'.toUpperCase())
    firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(userApp.email).collection('message').doc(this.date.toString()).set({
        message_user: message
      });
    
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

  sendMessageMairie(message : string, userApp: UserApp, email:string){

    this.date = new Date();
    console.log(this.date);
    if (userApp.role.toUpperCase()=='MAIRIE'.toUpperCase())
    firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(email).collection('message').doc(this.date.toString()).set({
        message_mairie: message
      });
    
    }
  

  getAllUser(userApp: UserApp){
    return new Promise<Array<string>>(
      (resolve, reject) => {
        
        firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').onSnapshot((querySnapshot) => {
          this.allUser = [];
          querySnapshot.forEach((doc) => {
            console.log(doc.id); // For doc name
            this.allUser.push(doc.id);
          });
          resolve(this.allUser);
        }),
        (error) => {
          reject(error);
        }
        
      }
    )
  }

  receiveMairieMessage(userApp: UserApp, email: string){
    return new Promise<Array<MessageApp>>(
      (resolve, reject) => {
        firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(email).collection('message').get()
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