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
  public urlUploadFile: string = "";
  public file: File = null;
  public progress: number = 0;
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
    this.urlUploadFile = "";
  }

  initForm(){
    this.eventForm = this.formBuilder.group( 
      {
        name: ['', Validators.required],
        information: ['', Validators.required],
        dateDebut: ['', Validators.required],
        dateFin: ['', Validators.required],
        photo: ['', Validators.required]
      }
    )
  }

  onSubmit(){
    const name = this.eventForm.get('name').value;
    const information = this.eventForm.get('information').value;
    const dateDebut = this.eventForm.get('dateDebut').value;
    const dateFin = this.eventForm.get('dateFin').value;
    this.eventService.setEvent(this.userApp ,name, information, this.urlUploadFile, dateDebut, dateFin);
    this.eventForm.reset();
    this.file = null;
    this.urlUploadFile = "";
    this.router.navigate(['/event']);
  }

  handleFileInput(files: FileList) {
    this.file = files.item(0);
    console.log(this.file);
    this.submiteUploadForm();
  }

  submiteUploadForm(){
    console.log(firebase.default.auth().currentUser)
  if (firebase.default.auth().currentUser)
  {

// Create a root reference
    var storageRef = firebase.default.storage().ref();

    // Create the file metadata
    var metadata = {
      contentType: 'image/jpeg/gif'
    };
  console.log(firebase.default.auth().currentUser.email)
// Upload file and metadata to the object 'images/mountains.jpg'
    var date: Date = new Date;
    console.log(date.getTime())
    var uploadTask = storageRef.child('images/' + firebase.default.auth().currentUser.email + this.file.name + date.getTime() ).put(this.file, metadata);

// Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.default.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + this.progress + '% done');
        switch (snapshot.state) {
          case firebase.default.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.default.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.urlUploadFile = downloadURL;
        });
      }
    );
  }
  }

}
