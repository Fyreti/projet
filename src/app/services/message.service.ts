import { formatDate } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, pairs } from 'rxjs';
import { UserApp } from '../model/user.model';
import { DatePipe } from '@angular/common'
import { MessageApp } from '../model/message.model';
import { MessageFaq } from '../model/messagefaq.model';

@Injectable()
export class MessageService {
    public allMessage: Array<MessageApp> = [];
    public allMessageFaq: Array<MessageFaq> = [];
    public message: string;
    public date: Date;
    public messageApp : MessageApp;
    public messageFaq : MessageFaq;
    public allUser: Array<string> = [];
    
  constructor(public datepipe: DatePipe) {  }

  sendMessage(message : string, userApp: UserApp){
    if (message !== null){
      if ((message.replace(/ /g, "").length !== 0)){
        this.date = new Date();
        firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(userApp.email).get()
        .then((docSnapshot) => {

          if (docSnapshot.exists) {
            firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(userApp.email).get()
            .then( doc => {
            if (userApp.role.toUpperCase()==='VALID'.toUpperCase()){
              firebase.default.firestore().collection('ville').doc(userApp.ville).set({
                ville: userApp.ville
              });
              firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(userApp.email).set({
                email : userApp.email,
                notif_mairie: doc.get('notif_mairie') + 1,
                notif_user: doc.get('notif_user')
              });
              firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(userApp.email).collection('message').doc(Date.parse(this.date.toString()).toString()).set({
                  message_user: message
              });
            }
            })
          }

          else{
            if (userApp.role.toUpperCase()==='VALID'.toUpperCase()){
              firebase.default.firestore().collection('ville').doc(userApp.ville).set({
                ville: userApp.ville
              });
              firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(userApp.email).set({
                email : userApp.email,
                notif_mairie: 1,
                notif_user: 0
              });
              firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(userApp.email).collection('message').doc(Date.parse(this.date.toString()).toString()).set({
                  message_user: message
              });
            }
          }
        })
      }
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

  sendMessageMairie(message : string, userApp: UserApp, email:string){
    if (message !== null){
      if ((message.replace(/ /g, "").length !== 0)){
        this.date = new Date();
        firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(email).get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(email).get()
            .then( doc => {
            if (userApp.role.toUpperCase()==='MAIRIE'.toUpperCase()){
              
              firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(email).set({
                email : email,
                notif_mairie: doc.get('notif_mairie'),
                notif_user: doc.get('notif_user') + 1
              });
              firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(email).collection('message').doc(Date.parse(this.date.toString()).toString()).set({
                message_mairie: message
              });
            }
            })
          }
        })
      }
    }
/*
    console.log(message);
    if (message !== null){
      console.log((message.replace(/ /g, "").length));
      if ((message.replace(/ /g, "").length !== 0)){
        this.date = new Date();
        console.log(this.date);
        if (userApp.role.toUpperCase()==='MAIRIE'.toUpperCase()){
          firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(email).collection('message').doc(Date.parse(this.date.toString()).toString()).set({
            message_mairie: message
          });
          console.log(userApp.ville);
          console.log(email);
          console.log(message);
        }
        
      }
    }*/
  }
  

  getAllUser(userApp: UserApp){
    let allNotif = new Map<string, number>();
    return new Promise<Map<string, number>>(
      (resolve, reject) => {
        
        firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').onSnapshot((querySnapshot) => {
          this.allUser = [];
          querySnapshot.forEach((doc) => {
            console.log(doc.id); // For doc name
            allNotif.set(doc.id,doc.get('notif_mairie'));
          });
          resolve(allNotif);
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

  resetNotifMairie(userApp: UserApp, email: string){
    if(userApp.role.toUpperCase()==='MAIRIE'){
      firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(email).get()
      .then((docSnapshot) => {

        if (docSnapshot.exists) {
          firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(email).get()
          .then( doc => {
          if (userApp.role.toUpperCase()==='MAIRIE'){
            firebase.default.firestore().collection('ville').doc(userApp.ville).set({
              ville: userApp.ville
            });
            firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(email).set({
              email : email,
              notif_mairie: 0,
              notif_user: doc.get('notif_user')
            });
          }
          })
        }
      })
      
    }
  }

  resetNotifUser(userApp: UserApp){
    if(userApp.role.toUpperCase()==='VALID'.toUpperCase()){
      firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(userApp.email).get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(userApp.email).get()
          .then( doc => {
          if (userApp.role.toUpperCase()==='VALID'.toUpperCase()){
            firebase.default.firestore().collection('ville').doc(userApp.ville).set({
              ville: userApp.ville
            });
            firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(userApp.email).set({
              email : userApp.email,
              notif_mairie: doc.get('notif_mairie'),
              notif_user: 0
            });
          }
          })
        }
      })
    }
  }

  getNotifUser(userApp: UserApp){
    return new Promise<number>(
      (resolve, reject) => {
        if(userApp.role.toUpperCase()==='VALID'.toUpperCase()){
          firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(userApp.email).get()
          .then((docSnapshot) => {
            if (docSnapshot.exists) {
              firebase.default.firestore().collection('ville').doc(userApp.ville).collection('contact-mairie').doc(userApp.email).get()
              .then( doc => {
                resolve(doc.get('notif_user'));
              })
              .catch(function(error) {
                console.log("Error get Notif User: ", error);
                reject();
            });
            }
          })
          .catch(function(error) {
            console.log("Error get Notif User: ", error);
            reject();
        });
        }
      }
    )
  }

  receiveMessagefaq(userApp: UserApp, faq: string){
    return new Promise<Array<MessageFaq>>(
      (resolve, reject) => {
        firebase.default.firestore().collection('ville').doc(userApp.ville).collection('faq').doc(faq).collection('message').get()
        .then(snapshot => {
          this.allMessageFaq = [];
          snapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            if (doc.get('message_user')){
              this.messageFaq = new MessageFaq();
              this.messageFaq.setMessage("User", doc.get('message_user'), doc.get('email'));
              this.allMessageFaq.push(this.messageFaq);
            }
            else{
              this.messageFaq = new MessageFaq();
              this.messageFaq.setMessage("Mairie", doc.get('message_mairie'), doc.get('email'));
              this.allMessageFaq.push(this.messageFaq);
            }
            
        });
        
        resolve(this.allMessageFaq);
      })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
            reject();
        });
    
      }
    )
  }

  sendMessageFaq(message : string, userApp: UserApp, faq:string){
    if (message !== null){
      if ((message.replace(/ /g, "").length !== 0)){
        this.date = new Date();
        if (userApp.role.toUpperCase() === "MAIRIE" || userApp.role.toUpperCase() === "VALID"){
          firebase.default.firestore().collection('ville').doc(userApp.ville).collection('faq').doc(faq).set({
            faq : faq
          });
          if (userApp.role.toUpperCase() === "MAIRIE"){
            firebase.default.firestore().collection('ville').doc(userApp.ville).collection('faq').doc(faq).collection('message').doc(Date.parse(this.date.toString()).toString()).set({
              message_mairie: message,
              email: userApp.email
            });
          }
          else if (userApp.role.toUpperCase() === "VALID"){
            firebase.default.firestore().collection('ville').doc(userApp.ville).collection('faq').doc(faq).collection('message').doc(Date.parse(this.date.toString()).toString()).set({
              message_user: message,
              email: userApp.email
            });
          }
        }
        
      }
    }
  }
}