import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notvalid',
  templateUrl: './notvalid.component.html',
  styleUrls: ['./notvalid.component.scss']
})
export class NotvalidComponent implements OnInit {

  authStatus: boolean;

  signInForm: FormGroup;
  errorMessage: string;

  constructor() { }

  ngOnInit() {
  }
}
