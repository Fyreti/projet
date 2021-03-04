import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApp } from 'src/app/model/user.model';
import { MessageService } from 'src/app/services/message.service';
import * as firebase from 'firebase';
import { DataService } from 'src/app/services/data.service';
import { FaqService } from 'src/app/services/faq.service';

@Component({
  selector: 'app-addfaq',
  templateUrl: './addfaq.page.html',
  styleUrls: ['./addfaq.page.scss'],
})
export class AddfaqPage implements OnInit {
  addfaqForm: FormGroup;
  public variabletemps:string;
  public allReponse : Array<string> = [];
  constructor(public userApp: UserApp, 
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private faqservice: FaqService
    ) { }

  ngOnInit() {

    var user = firebase.default.auth().currentUser; //Get the user who is connected
    this.dataService.getOneUser(user.email, this.userApp).then(() => {
      }, (raison) => {
      console.log(raison); // Erreur !
    });

    this.initForm();
  }

  initForm(){
    this.addfaqForm = this.formBuilder.group( 
      {
        titre: ['', [Validators.required]],
        question: ['', [Validators.required]],
        reponse: ['', [Validators.required]]
      }
    )
  }

  onSubmit(){
    
    console.log('coucou');
    const titre : string = this.addfaqForm.get('titre').value;
    const question : string = this.addfaqForm.get('question').value;
    const reponse : string = this.addfaqForm.get('reponse').value;
    this.allReponse = [];
    if (reponse.includes(',')){
      this.variabletemps = "";
      for ( let i = 0; i < reponse.length; i++){
        if(reponse.charAt(i) !== ','){
          this.variabletemps += reponse.charAt(i);
        }
        else if (reponse.charAt(i) === ','){
          this.variabletemps = this.variabletemps.trim();
          if (!this.allReponse.includes(this.variabletemps)){
            this.allReponse.push(this.variabletemps);
          }
          this.variabletemps = "";
        }
        
      }
      this.variabletemps = this.variabletemps.trim();
      if (!this.allReponse.includes(this.variabletemps)){
        this.allReponse.push(this.variabletemps);
      }
      
    }

    this.allReponse.forEach(element => {
      console.log(element);
    });

    this.faqservice.addFaq(titre, question, this.userApp);

  }

}
