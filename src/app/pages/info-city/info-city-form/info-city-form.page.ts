import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import * as firebase from 'firebase';
import { UserApp } from 'src/app/model/user.model';
import { DataService } from 'src/app/services/data.service';
import { InfoCityService } from 'src/app/services/info-city.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-info-city-form',
  templateUrl: './info-city-form.page.html',
  styleUrls: ['./info-city-form.page.scss'],
})
export class InfoCityFormPage implements OnInit {

  infoCityForm: FormGroup;
  errorMessage: string;

  constructor(public formBuilder: FormBuilder,
              public infoCityService: InfoCityService,
              public router: Router,
              public userApp: UserApp,
              public dataService: DataService,
              public messageService: MessageService) { }

  ngOnInit() {
    var user = firebase.default.auth().currentUser; //Get the user who is connected
    this.dataService.getOneUser(user.email, this.userApp);
    this.initForm();
  }

  initForm(){
    this.infoCityForm = this.formBuilder.group( 
      {
        name: ['', Validators.required],
        information: ['', Validators.required],
        photo: ['']
      }
    )
  }

  onSubmit(){
    const name = this.infoCityForm.get('name').value;
    const information = this.infoCityForm.get('information').value;
    const photo = this.infoCityForm.get('photo').value;
    this.infoCityService.setInfoCity(this.userApp ,name, information, photo);
    this.router.navigate(['/info-city']);
  }

}
