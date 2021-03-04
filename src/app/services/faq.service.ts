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

  addFaq(titre : string, question : string, userApp: UserApp){
      if(userApp.role.toUpperCase() === 'MAIRIE'){
        firebase.default.firestore().collection('ville').doc(userApp.ville).set({
            ville: userApp.ville
        });
        //firebase.default.firestore().collection('ville').doc(userApp.ville).collection('vote').doc(question).delete();
        firebase.default.firestore().collection('ville').doc(userApp.ville).collection('faq').doc(question).set({
            titre : titre,
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


}