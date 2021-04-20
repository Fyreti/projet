import { formatDate } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, pairs } from 'rxjs';
import { UserApp } from '../model/user.model';
import { DatePipe } from '@angular/common'
import { MessageApp } from '../model/message.model';

@Injectable()
export class VoteService {
    private allVote : Array<string> = [];
    private VoteOrNot : Array<number> = [];
    private verif : boolean;
    private tot : number;
    private result: string = "";
    private numberOfVote : number = 0;
    private AllNumberOfVote: Array<number> = [];
  constructor() {  }

  addVote(question : string, allvote : Array<string>, userApp: UserApp){
      if(userApp.role.toUpperCase() === 'MAIRIE'){
        firebase.default.firestore().collection('ville').doc(userApp.ville).set({
            ville: userApp.ville
        });
        //firebase.default.firestore().collection('ville').doc(userApp.ville).collection('vote').doc(question).delete();
        firebase.default.firestore().collection('ville').doc(userApp.ville).collection('vote').doc(question).set({
            question : question,
            reponses : allvote
        });
        
        
      }
    
  }

  getAllVote(userApp : UserApp){
    return new Promise<Array<string>>(
        (resolve, reject) => {
          
          firebase.default.firestore().collection('ville').doc(userApp.ville).collection('vote').onSnapshot((querySnapshot) => {
            this.allVote = [];
            querySnapshot.forEach((doc) => {
              console.log(doc.id); // For doc name
              this.allVote.push(doc.id);
            });
            resolve(this.allVote);
          }),
          (error) => {
            reject(error);
          }
          
        }
      )
  }

  getAllReponse(userApp: UserApp, vote: string){
    return new Promise<Array<string>>(
        (resolve, reject) => {
          firebase.default.firestore().collection('ville').doc(userApp.ville).collection('vote').doc(vote).get().then( doc => {
              
            resolve(doc.get('reponses'));
          }),
          (error) => {
            reject(error);
          }
          
        }
      )
  }

  voteIt(userApp: UserApp, vote:string, reponse: string){
    return new Promise<boolean>(
        (resolve, reject) => {
            firebase.default.firestore().collection('ville').doc(userApp.ville).collection('vote').doc(vote).collection(reponse).get().then((doc) => {
                
                this.result = 'add';
                doc.forEach((voteur) => {
                    if (voteur.id === userApp.email){
                        this.result = 'suppr';
                    }
                });

                if (this.result === 'add'){
                    console.log("add>>");
                    firebase.default.firestore().collection('ville').doc(userApp.ville).collection('vote').doc(vote).collection(reponse).doc(userApp.email).set({
              
                    }).then(() => {
                      resolve(true);
                    }),(error) => {
                        reject(error);
                    }
                }
                if (this.result === 'suppr'){
                    console.log("suppr>>");
                    firebase.default.firestore().collection('ville').doc(userApp.ville).collection('vote').doc(vote).collection(reponse).doc(userApp.email).delete().then(() => {
                        resolve(true);
                      }),(error) => {
                          reject(error);
                      };
                    
                }
            });
            
          
          
        }
      )
  }

  whichvote(userApp: UserApp, vote: string, allVote: Array<string>){
    return new Promise<Array<number>>(
        (resolve, reject) => {
            this.VoteOrNot = [];
            this.tot = 0;
            allVote.forEach(reponse => {
                
                firebase.default.firestore().collection('ville').doc(userApp.ville).collection('vote').doc(vote).collection(reponse).onSnapshot((querySnapshot) => {
                    this.verif = false;
                    querySnapshot.forEach((voteur) => {
                        
                      console.log(voteur.id); // For doc name
                      if (voteur.id === userApp.email){
                        this.VoteOrNot.push(1);
                        this.verif=true;
                      }
                    });
                    if (this.verif === false){
                        this.VoteOrNot.push(0);
                    }
                    if (this.tot === allVote.length-1){
                        resolve(this.VoteOrNot);
                      }
                      ++this.tot;
                  }),
                  (error) => {
                    reject(error);
                  }
                  
        }
      );
      
        }
        
    )
  }

  numberVote(userApp: UserApp, vote: string, allVote: Array<string>){
    return new Promise<Array<number>>(
        (resolve, reject) => {
            this.AllNumberOfVote = [];
            this.tot = 0;
            if (allVote){
              allVote.forEach(reponse => {
                
                firebase.default.firestore().collection('ville').doc(userApp.ville).collection('vote').doc(vote).collection(reponse).onSnapshot((querySnapshot) => {
                    this.verif = false;
                    this.numberOfVote = 0;
                    querySnapshot.forEach(() => {
                        ++this.numberOfVote;
                    });
                    this.AllNumberOfVote.push(this.numberOfVote);
                    if (this.tot === allVote.length-1){
                        resolve(this.AllNumberOfVote);
                      }
                      ++this.tot;
                  }),
                  (error) => {
                    reject(error);
                  }
                  
            }
            );
            }
            else{
              resolve([0]);
            }
            
      
        }
        
    );
  }

  deleteVote(userApp : UserApp, vote : string){
    if (userApp.role.toUpperCase() === "MAIRIE"){
      firebase.default.firestore().collection('ville').doc(userApp.ville).collection('vote').doc(vote).delete();
      console.log('vote DELETED');
  }
  }
 
}