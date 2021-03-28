import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApp } from 'src/app/model/user.model';
import { MessageService } from 'src/app/services/message.service';
import * as firebase from 'firebase';
import { DataService } from 'src/app/services/data.service';
import { VoteService } from 'src/app/services/vote.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resultvote',
  templateUrl: './resultvote.page.html',
  styleUrls: ['./resultvote.page.scss'],
})
export class ResultvotePage implements OnInit {
  addvoteForm: FormGroup;
  public variabletemps:string;
  public allReponse : Array<string> = [];
  private vote: string;
  public allNumberOfVote : Array<number> = [];

  constructor(public userApp: UserApp, 
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private voteservice: VoteService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.vote = params['vote']; 
    });
    var user = firebase.default.auth().currentUser; //Get the user who is connected
    this.dataService.getOneUser(user.email, this.userApp).then(() => {
      this.voteservice.getAllReponse(this.userApp, this.vote).then(allReponse => {
        this.allReponse = allReponse;
        this.voteservice.numberVote(this.userApp, this.vote, this.allReponse).then( allNumberOfVote => {
          this.allNumberOfVote = allNumberOfVote;

          firebase.default.firestore().collection('ville').doc(this.userApp.ville).collection('vote')
          .onSnapshot((querySnapshot) => {
            this.voteservice.getAllReponse(this.userApp, this.vote).then(allReponse => {
              this.allReponse = allReponse;
              this.voteservice.numberVote(this.userApp, this.vote, this.allReponse).then( allNumberOfVote => {
                this.allNumberOfVote = allNumberOfVote;
              });
            });
            
          });

        });
      });
      }, (raison) => {
      console.log(raison); // Erreur !
    });

    
    console.log(this.allReponse);

    
  }

  deleteVote(){
    this.voteservice.deleteVote(this.userApp, this.vote);
    this.router.navigate(['/vote']);
  }

}
