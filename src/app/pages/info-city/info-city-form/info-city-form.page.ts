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
  public urlUploadFile: string = "";
  public file: File = null;
  public progress: number = 0;
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
    this.urlUploadFile = "";
  }

  initForm(){
    this.infoCityForm = this.formBuilder.group( 
      {
        name: ['', Validators.required],
        information: ['', Validators.required],
        file: ['', Validators.required]
      }
    )
  }

  onSubmit(){
    const name = this.infoCityForm.get('name').value;
    const information = this.infoCityForm.get('information').value;
    //const photo = this.infoCityForm.get('photo').value;
    this.infoCityService.setInfoCity(this.userApp ,name, information, this.urlUploadFile);
    this.router.navigate(['/info-city']);
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
