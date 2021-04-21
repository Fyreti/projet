import { formatDate } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, pairs } from 'rxjs';
import { UserApp } from '../model/user.model';
import { DatePipe } from '@angular/common'
import { MessageApp } from '../model/message.model';

@Injectable()
export class FaqService {
    private allFaq : Array<string> = [];
    private VoteOrNot : Array<number> = [];
    private verif : boolean;
    private tot : number;
    private result: string = "";
    private numberOfVote : number = 0;
    private AllNumberOfVote: Array<number> = [];
  constructor() {  }

  addFaq(question : string, userApp: UserApp){
      if(userApp.role.toUpperCase() === 'MAIRIE'){
        firebase.default.firestore().collection('ville').doc(userApp.ville).set({
            ville: userApp.ville
        });
        //firebase.default.firestore().collection('ville').doc(userApp.ville).collection('vote').doc(question).delete();
        firebase.default.firestore().collection('ville').doc(userApp.ville).collection('faq').doc(question).set({
            question : question
        });
        
        
      }
    
  }

  getAllFaq(userApp : UserApp){
    return new Promise<Array<string>>(
        (resolve, reject) => {
          
          firebase.default.firestore().collection('ville').doc(userApp.ville).collection('faq').onSnapshot((querySnapshot) => {
            this.allFaq = [];
            querySnapshot.forEach((doc) => {
              console.log(doc.id); // For doc name
              this.allFaq.push(doc.id);
            });
            resolve(this.allFaq);
          }),
          (error) => {
            reject(error);
          }
          
        }
      )
  }

  deleteForum(userApp : UserApp, forum : string){
    if (userApp.role.toUpperCase() === "MAIRIE"){
      firebase.default.firestore().collection('ville').doc(userApp.ville).collection('faq').doc(forum).collection('message').onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          firebase.default.firestore().collection('ville').doc(userApp.ville).collection('faq').doc(forum).collection('message').doc(doc.id).delete();
        });
      });
      firebase.default.firestore().collection('ville').doc(userApp.ville).collection('faq').doc(forum).delete();
      console.log('faq DELETED');
      
  }
  }
}