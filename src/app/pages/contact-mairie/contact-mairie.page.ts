import { Component, OnInit } from '@angular/core';
import { UserApp } from 'src/app/model/user.model';
import { DataService } from 'src/app/services/data.service';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { MessageApp } from 'src/app/model/message.model';

@Component({
  selector: 'app-contact-mairie',
  templateUrl: './contact-mairie.page.html',
  styleUrls: ['./contact-mairie.page.scss'],
})
export class ContactMairiePage implements OnInit {

  public allMessage: Array<MessageApp> = [];
  sendMessageForm: FormGroup;
  errorMessage: string;
  public allUser: Array<string> = [];

  constructor(public userApp: UserApp, 
    private dataService: DataService, 
    private formBuilder: FormBuilder,
    private router: Router, 
    private messageService: MessageService ) { 
    console.log(userApp.role);
  }

  ngOnInit() {
    var user = firebase.default.auth().currentUser; //Get the user who is connected
    this.dataService.getOneUser(user.email, this.userApp).then(() => {
      if (this.userApp.role.toUpperCase()!='MAIRIE'){
        console.log("User fr");
        this.messageService.receiveMessage(this.userApp).then((allMessage) => {
          this.allMessage = allMessage;
        }); 
      }
      else{
        console.log("Mairie fr");
        this.messageService.getAllUser(this.userApp).then((allUser) => {
          this.allUser = allUser;
        });
      }
      }, (raison) => {
      console.log(raison); // Erreur !
    });//set the object userApp with all info of the user who is connected
    this.initForm();
    /*firebase.default.firestore().collection('ville').doc(this.userApp.ville).collection('contact-mairie').doc('coucou@gmail.com').collection('message')
    .onSnapshot(function(querySnapshot) {
        
        console.log("t dans coucou@gmail ");
    });*/
    firebase.default.firestore().collection('ville').doc('Paris').collection('contact-mairie').doc('coucou@gmail.com').collection('message')
    .onSnapshot((querySnapshot) => {
      this.messageService.receiveMessage(this.userApp).then((allMessage)=> {
        this.allMessage = allMessage;
      }); 
      console.log("peut etre reussi à ");
  });
  }

  initForm(){
    
    this.sendMessageForm = this.formBuilder.group( 
      {
        message: ['', [Validators.required]]
      }
    )
  }

  onSubmit(){
    const message = this.sendMessageForm.get('message').value;
    
    this.messageService.sendMessage(message, this.userApp);
    /*this.messageService.receiveMessage(this.userApp).then((allMessage)=> {
      this.allMessage = allMessage;
    }); */
    this.sendMessageForm.reset();
  }

  goToMessageMairie(message:string) {
    console.log("redirectionn");
    this.router.navigate(['/message-mairie', message]);
  }

  /*messageRefresh(){ 
    this.messageService.receiveMairieMessage(this.userApp, this.userApp.email).then((allMessage) => {
      this.allMessage = allMessage;
    });
    console.log("coucou")
    setTimeout( function() {}, 3000);
  }*/

  
}
