import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApp } from 'src/app/model/user.model';
import { MessageService } from 'src/app/services/message.service';
import * as firebase from 'firebase';
import { DataService } from 'src/app/services/data.service';
import { FaqService } from 'src/app/services/faq.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addfaq',
  templateUrl: './addfaq.page.html',
  styleUrls: ['./addfaq.page.scss'],
})
export class AddfaqPage implements OnInit {
  addfaqForm: FormGroup;
  constructor(private router: Router, 
    public userApp: UserApp, 
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
        question: ['', [Validators.required]]
      }
    )
  }

  onSubmit(){
    
    console.log('coucou');
    const titre : string = this.addfaqForm.get('titre').value;
    const question : string = this.addfaqForm.get('question').value;

    this.faqservice.addFaq(titre, question, this.userApp);
    this.router.navigate(['/faq']);
  }

}
