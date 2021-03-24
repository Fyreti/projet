import { Component, Input, OnInit } from '@angular/core';
import { UserApp } from 'src/app/model/user.model';
import { DataService } from 'src/app/services/data.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { FaqService } from 'src/app/services/faq.service';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
  providers: [UserApp],
})
export class FAQPage implements OnInit {

  private allFaq : Array<string> = [];

  constructor(public userApp: UserApp,
    private dataService: DataService,
    private faqservice: FaqService,
    private router: Router ) { }

  ngOnInit() {
    var user = firebase.default.auth().currentUser; //Get the user who is connected
    this.dataService.getOneUser(user.email, this.userApp).then(() => {
      this.faqservice.getAllFaq(this.userApp).then( allFaq => {
        this.allFaq = allFaq;
      });
      }, (raison) => {
      console.log(raison); // Erreur !
    });
    firebase.default.firestore().collection('ville').doc('Paris').collection('faq')
    .onSnapshot((querySnapshot) => {
      this.faqservice.getAllFaq(this.userApp).then( allFaq => {
        this.allFaq = allFaq;
      });
    });
  }

  goToFaq(faq:string) {
    console.log("redirectionn");
    this.router.navigate(['/dofaq', faq]);
  }

  goToAddFaq() {
    console.log("redirectionn");
    this.router.navigate(['/addfaq']);
  }


}
