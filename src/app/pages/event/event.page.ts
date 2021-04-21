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
  currentDate : Date;
  formattedDate : string;

  constructor(public eventService: EventService,
              public userApp: UserApp,
              public dataService: DataService,
              public router: Router) { }

  ngOnInit() {
    var user = firebase.default.auth().currentUser; //Get the user who is connected
    this.dataService.getOneUser(user.email, this.userApp).then(() => {
      this.eventService.getEvent(this.userApp).then((allEvent) => {
        this.allEvent = allEvent;

        firebase.default.firestore().collection('ville').doc(this.userApp.ville).collection('event')
        .onSnapshot((querySnapshot) => {
          this.eventService.getEvent(this.userApp).then( allEvent => {
            this.allEvent = allEvent;
          });
        });
      }); 
    }, (raison) => {
      console.log(raison); // Erreur !
    });//set the object userApp with all info of the user who is connected
    this.currentDate = new Date();
  }

  goToEventForm() {
    console.log("redirection");
    this.router.navigate(['/event-form']);
  }

  deleteEvent(dateDebut: Date, eventName: string){
    this.eventService.deleteEvent(this.userApp, dateDebut, eventName);
  }

  // formatDate(currentDate : Date){
  //   let year = currentDate.getFullYear();
  //   let month = currentDate.getMonth();
  //   let day = currentDate.getDate();

  //   this.formattedDate = year + '-' + month + '-' + day;
  //   return Date.parse(this.formattedDate);
  // }

  // formatDate(currentDate: Date) {
  //   var d = new Date(currentDate),
  //       month = '' + (d.getMonth() + 1),
  //       day = '' + d.getDate(),
  //       year = d.getFullYear();

  //   if (month.length < 2) 
  //       month = '0' + month;
  //   if (day.length < 2) 
  //       day = '0' + day;

  //   return [year, month, day].join('-');
  // }

  displayEvent(event : Event){
    return Date.parse(event.dateFin.toString()).valueOf() >= Date.parse(this.currentDate.toDateString()).valueOf();
  }

}


