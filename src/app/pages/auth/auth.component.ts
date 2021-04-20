import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authStatus: boolean;

  signInForm: FormGroup;
  mdpForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.signInForm = this.formBuilder.group( 
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      }
    )

    this.mdpForm = this.formBuilder.group(
      {
        email2: ['', [Validators.required, Validators.email]],
      }
    )
  }

  onSubmit(){
    console.log('coucou')
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this.authService.signInUser(email, password).then(
      () => {
        this.router.navigate(['/info-city']);
      },
      (error) => {
        console.log("wrong password or email");
        this.errorMessage = "Identifiant ou mot de passe incorrect.";
      }
    );
  }

  onSubmitmdp(){
    const email = this.mdpForm.get('email2').value;

    return new Promise(
      (resolve, reject) => {
        firebase.auth().sendPasswordResetEmail(email).then(
          () => {
            console.log("Email envoyé pour reset password !")
          resolve(true);
        },(error) => {
          console.log("Echec de l'envoi de l'email pour reset password !")
          reject(error);
        }
        );
      }
    );
  }
}
