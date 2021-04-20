import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApp } from 'src/app/model/user.model';
import { MessageService } from 'src/app/services/message.service';
import * as firebase from 'firebase';
import { DataService } from 'src/app/services/data.service';
import { VoteService } from 'src/app/services/vote.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageFaq } from 'src/app/model/messagefaq.model';
import { FaqService } from 'src/app/services/faq.service';

@Component({
  selector: 'app-dofaq',
  templateUrl: './dofaq.page.html',
  styleUrls: ['./dofaq.page.scss'],
})
export class DofaqPage implements OnInit {
  @ViewChild('content') private content:any;
  public allMessage: Array<MessageFaq> = [];
  public testmail: string;
  sendMessageForm: FormGroup;
  errorMessage: string;
  public allUser: Array<string> = [];
  public faq: string;
  public refresh: boolean;

  constructor(public userApp: UserApp, 
    private dataService: DataService, 
    private formBuilder: FormBuilder,
    private router: Router, 
    private messageService: MessageService,
    private route: ActivatedRoute,
    private faqservice: FaqService ) { 
    console.log(userApp.role);
  }


  scrollToBottom() {
    setTimeout(() => {
        this.content.scrollToBottom();
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.faq = params['faq']; 
    });
    var user = firebase.default.auth().currentUser; //Get the user who is connected
    this.dataService.getOneUser(user.email, this.userApp).then(() => {
      if (this.userApp.role.toUpperCase()=='MAIRIE'){
        this.scrollToBottom();
        this.messageService.receiveMessagefaq(this.userApp, this.faq).then((allMessage) => {
          this.allMessage = allMessage;
        }); 
      }
      firebase.default.firestore().collection('ville').doc(this.userApp.ville).collection('faq').doc(this.faq).collection('message')
    .onSnapshot((querySnapshot) => {
      if (decodeURIComponent(this.router.url) === '/dofaq/'+this.faq){
        
        this.messageService.receiveMessagefaq(this.userApp, this.faq).then((allMessage) => {
          this.allMessage = allMessage;
          this.scrollToBottom();
        });
      }
      
    });
      
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
    console.log(message);
    this.messageService.sendMessageFaq(message, this.userApp, this.faq);
    /*this.messageService.receiveMairieMessage(this.userApp, this.email).then((allMessage) => {
      this.allMessage = allMessage;
    }); */
    this.sendMessageForm.reset();
    
  }

  // messageRefresh(){
  //   this.messageService.receiveMairieMessage(this.userApp, this.email).then((allMessage) => {
  //     this.allMessage = allMessage;
  //   });
  //   console.log("coucou")
  //   setTimeout( function() {}, 3000);
  // }
  deleteForum(){
    this.faqservice.deleteForum(this.userApp, this.faq);
    this.router.navigate(['/faq']);
  }
  
}
