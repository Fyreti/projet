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
      this.messageService.receiveMessage(this.userApp).then((allMessage)=> {
        this.allMessage = allMessage;
      }); // Succès !
      }, (raison) => {
      console.log(raison); // Erreur !
    });//set the object userApp with all info of the user who is connected
    this.initForm();
      
  }

  initForm(){
    
    this.sendMessageForm = this.formBuilder.group( 
      {
        message: ['', [Validators.required]]
      }
    )
  }

  onSubmit(){
    console.log('coucou');
    const message = this.sendMessageForm.get('message').value;
    this.messageService.sendMessage(message, this.userApp);
    this.messageService.receiveMessage(this.userApp).then((allMessage)=> {
      this.allMessage = allMessage;
    }); 
    
  }
}
