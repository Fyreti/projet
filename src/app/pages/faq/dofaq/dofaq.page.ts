import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApp } from 'src/app/model/user.model';
import { MessageService } from 'src/app/services/message.service';
import * as firebase from 'firebase';
import { DataService } from 'src/app/services/data.service';
import { VoteService } from 'src/app/services/vote.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dofaq',
  templateUrl: './dofaq.page.html',
  styleUrls: ['./dofaq.page.scss'],
})
export class DofaqPage implements OnInit {
  addfaqForm: FormGroup;
  public variabletemps:string;
  public allReponse : Array<string> = [];
  private vote: string;
  public voteOrNot : Array<number>;

  constructor(public userApp: UserApp, 
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private voteservice: VoteService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.vote = params['vote']; 
    });
    var user = firebase.default.auth().currentUser; //Get the user who is connected
    this.dataService.getOneUser(user.email, this.userApp).then(() => {
      this.voteservice.getAllReponse(this.userApp, this.vote).then(allReponse => {
        this.allReponse = allReponse;
        this.voteservice.whichvote(this.userApp, this.vote, this.allReponse).then( voteOrNot => {
          this.voteOrNot = voteOrNot;
          console.log(">"+voteOrNot);
        });
      });
      }, (raison) => {
      console.log(raison); // Erreur !
    });

    
    console.log(this.allReponse);
  }

  voteIt(reponse: string){
    this.voteservice.voteIt(this.userApp, this.vote, reponse).then(() => {
      this.voteservice.whichvote(this.userApp, this.vote, this.allReponse).then( voteOrNot => {
        this.voteOrNot = voteOrNot;
        console.log(">"+voteOrNot);
      });
    });
  }

  getColor(index: number) {
    try {
      if(this.voteOrNot[index] === 1){
        return 'success';
      }
      else{
        return 'danger';
      }
    } catch (error) {
      
    }
    
}

}
