import { Component, OnInit } from '@angular/core';
import { UserApp } from 'src/app/model/user.model';
import { DataService } from 'src/app/services/data.service';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { MessageApp } from 'src/app/model/message.model';

@Component({
  selector: 'app-message-mairie',
  templateUrl: './message-mairie.page.html',
  styleUrls: ['./message-mairie.page.scss'],
})
export class MessageMairiePage implements OnInit {

  public allMessage: Array<MessageApp> = [];
  sendMessageForm: FormGroup;
  errorMessage: string;
  public allUser: Array<string> = [];
  public email: string;
  public refresh: boolean;

  constructor(public userApp: UserApp, 
    private dataService: DataService, 
    private formBuilder: FormBuilder,
    private router: Router, 
    private messageService: MessageService,
    private route: ActivatedRoute ) { 
    console.log(userApp.role);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.email = params['message']; 
    });
    var user = firebase.default.auth().currentUser; //Get the user who is connected
    this.dataService.getOneUser(user.email, this.userApp).then(() => {
      if (this.userApp.role.toUpperCase()=='MAIRIE'){
        console.log("User fr");
        this.messageService.receiveMairieMessage(this.userApp, this.email).then((allMessage) => {
          this.allMessage = allMessage;
        }); 
      }
      
      }, (raison) => {
      console.log(raison); // Erreur !
    });//set the object userApp with all info of the user who is connected
    this.messageRefresh(this.messageService, this.userApp);
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
    this.messageService.sendMessageMairie(message, this.userApp, this.email);
    this.messageService.receiveMairieMessage(this.userApp, this.email).then((allMessage) => {
      this.allMessage = allMessage;
    }); 
  }

  // messageRefresh(){
  //   this.messageService.receiveMairieMessage(this.userApp, this.email).then((allMessage) => {
  //     this.allMessage = allMessage;
  //   });
  //   console.log("coucou")
  //   setTimeout( function() {}, 3000);
  // }

  messageRefresh(messageService: MessageService, userApp: UserApp){ 
    setInterval( function() {
      messageService.receiveMairieMessage(userApp, userApp.email).then((allMessage) => {
        this.allMessage = allMessage;
      });
      console.log("coucou")
    }, 3000);
  }
}
