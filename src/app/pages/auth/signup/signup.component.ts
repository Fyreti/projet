import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router, ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.signUpForm = this.formBuilder.group( 
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
        ville: ['', Validators.required],
        age: ['', Validators.required]
      }
    )
  }

  onSubmit(){
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const ville = this.signUpForm.get('ville').value;
    const age = this.signUpForm.get('age').value;
    this.authService.createNewUser(email, password, ville, age).then(
      () => {
        this.router.navigate(['/info-city']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
