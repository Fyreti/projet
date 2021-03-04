import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Event } from 'src/app/model/event.model';
import { UserApp } from 'src/app/model/user.model';
import { DataService } from 'src/app/services/data.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  allEvent: Array<Event> = [];

  constructor(public eventService: EventService,
              public userApp: UserApp,
              public dataService: DataService,
              public router: Router) { }

  ngOnInit() {
    var user = firebase.default.auth().currentUser; //Get the user who is connected
    this.dataService.getOneUser(user.email, this.userApp).then(() => {
      this.eventService.getEvent(this.userApp).then((allEvent) => {
        this.allEvent = allEvent;
      }); 
    }, (raison) => {
      console.log(raison); // Erreur !
    });//set the object userApp with all info of the user who is connected
  }

  goToEventForm() {
    console.log("redirection");
    this.router.navigate(['/event-form']);
  }

  deleteEvent(dateDebut: Date, eventName: string){
    this.eventService.deleteEvent(this.userApp, dateDebut, eventName);
  }

}


