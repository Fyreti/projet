import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import * as firebase from 'firebase';
import { UserApp } from 'src/app/model/user.model';
import { DataService } from 'src/app/services/data.service';
import { EventService } from 'src/app/services/event.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.page.html',
  styleUrls: ['./event-form.page.scss'],
})
export class EventFormPage implements OnInit {

  eventForm: FormGroup;
  errorMessage: string;

  constructor(public formBuilder: FormBuilder,
              public eventService: EventService,
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
    this.eventForm = this.formBuilder.group( 
      {
        name: ['', Validators.required],
        information: ['', Validators.required],
        photo: [''],
        dateDebut: ['', Validators.required],
        dateFin: ['', Validators.required]
      }
    )
  }

  onSubmit(){
    const name = this.eventForm.get('name').value;
    const information = this.eventForm.get('information').value;
    const photo = this.eventForm.get('photo').value;
    const dateDebut = this.eventForm.get('dateDebut').value;
    const dateFin = this.eventForm.get('dateFin').value;
    this.eventService.setEvent(this.userApp ,name, information, photo, dateDebut, dateFin);
    this.router.navigate(['/event']);
  }

}
