import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApp } from 'src/app/model/user.model';
import { MessageService } from 'src/app/services/message.service';
import * as firebase from 'firebase';
import { DataService } from 'src/app/services/data.service';
import { VoteService } from 'src/app/services/vote.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addvote',
  templateUrl: './addvote.page.html',
  styleUrls: ['./addvote.page.scss'],
})
export class AddvotePage implements OnInit {
  addvoteForm: FormGroup;
  addreponseForm: FormGroup;
  public variabletemps:string;
  public verif: boolean = false;
  public allReponse : Array<string> = [];
  constructor(private router: Router, 
    public userApp: UserApp, 
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private voteservice: VoteService
    ) { }

  ngOnInit() {

    var user = firebase.default.auth().currentUser; //Get the user who is connected
    this.dataService.getOneUser(user.email, this.userApp).then(() => {
      }, (raison) => {
      console.log(raison); // Erreur !
    });

    this.initForm();
    this.initForm2();
  }

  initForm2(){
    this.addreponseForm = this.formBuilder.group( 
      {
        reponse: ['', [Validators.required]]
      }
    )
  }

  initForm(){
    this.addvoteForm = this.formBuilder.group( 
      {
        titre: ['', [Validators.required]],
        question: ['', [Validators.required]]
      }
    )
  }

  verifValideForm(){
    if(this.allReponse.length>0){
      this.verif = true;
    }
    else{
      this.verif = false;
    }
  }

  supprimerReponse(rep: string){
    this.allReponse.splice(this.allReponse.indexOf(rep),1)
    this.verifValideForm();
  }

  onSubmit2(){
    const reponse: string = this.addreponseForm.get('reponse').value;
    this.allReponse.push(reponse);
    console.log(this.allReponse);
    this.verifValideForm();
    this.addreponseForm.reset();
  }

  onSubmit(){
    const titre : string = this.addvoteForm.get('titre').value;
    const question : string = this.addvoteForm.get('question').value;
    
    

    this.allReponse.forEach(element => {
      console.log(element);
    });
    
    this.voteservice.addVote(titre, question, this.allReponse, this.userApp);

    this.allReponse = [];
    this.addvoteForm.reset();
    this.router.navigate(['/vote']);
  }

}
