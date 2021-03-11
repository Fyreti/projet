import { Component, OnInit } from '@angular/core';
import { UserApp } from 'src/app/model/user.model';
import * as firebase from 'firebase';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';
import { VoteService } from 'src/app/services/vote.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.page.html',
  styleUrls: ['./vote.page.scss'],
})
export class VotePage implements OnInit {

private allVote : Array<string> = [];

  constructor(public userApp: UserApp,
    private dataService: DataService,
    private voteservice: VoteService,
    private router: Router ) { }

  ngOnInit() {
    var user = firebase.default.auth().currentUser; //Get the user who is connected
    this.dataService.getOneUser(user.email, this.userApp).then(() => {
<<<<<<< Updated upstream
      this.voteservice.getAllVote(this.userApp).then( allVote => {
        this.allVote = allVote;
      });
=======
>>>>>>> Stashed changes
      }, (raison) => {
      console.log(raison); // Erreur !
    });

<<<<<<< Updated upstream
  }

  goToVote(vote:string) {
    console.log("redirectionn");
    this.router.navigate(['/dovote', vote]);
  }

  goToAddVote() {
    console.log("redirectionn");
    this.router.navigate(['/addvote']);
  }

  goToResultVote(vote: string){
    console.log("redirectionn");
    this.router.navigate(['/resultvote', vote]);
=======
    this.voteservice.getAllVote(this.userApp).then( allVote => {
      this.allVote = allVote;
    });
  }

  goToVote(vote:string) {
    console.log("redirectionn");
    this.router.navigate(['/dovote', vote]);
>>>>>>> Stashed changes
  }
}
