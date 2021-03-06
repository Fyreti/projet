import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;
  cityData : any;
  latitude = 0;
  longitude = 0;
  city="";
  checkloc = false;
  address = {};

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              public httpClient: HttpClient, 
              public platform: Platform ) 
              {
                this.setCurrentPlatform();
              }

  ngOnInit() {
    this.getloc();
    console.log(this.city);
    this.initForm();
  }

  
  initForm(){
    this.signUpForm = this.formBuilder.group( 
      {
        username: ['', [Validators.required , Validators.pattern(/[0-9a-zA-Z]{3,}/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
        ville: ['', Validators.required],
        age: ['', Validators.required]
      }
    )
  }


  onSubmit(){
    const username = this.signUpForm.get('username').value;
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const ville = this.signUpForm.get('ville').value;
    const age = this.signUpForm.get('age').value;
    
    this.authService.createNewUser(email, password, ville, age, username).then(
      () => {
        this.router.navigate(['/info-city']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
  

  
  // ***Géolocalisation***

  getloc(){
    this.geolocation.getCurrentPosition().then((resp) => { 
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      if(!(this.longitude == this.latitude)){
        this.checkloc = true;
      }
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    
    setTimeout(() => this.WhereAmI(),800);
  }
  
  WhereAmI(){
    if(this.setCurrentPlatform() === "mobile" && this.checkloc)
    {
      setTimeout(() => this.FindCity(this.latitude,this.longitude),500);
    }
    else if(this.setCurrentPlatform() === "browser" && this.checkloc){
      setTimeout(() => this.FindCityDesktop(this.latitude,this.longitude),100);
    }
    else
    {
      this.getloc();
    }
  }

  FindCityDesktop(latitude, longitude){

    this.cityData = this.httpClient
    .get('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + latitude + '&lon=' + longitude + '&zoom=18&addressdetails=1');
    
    this.cityData
    .subscribe(data => {
      //console.log(data)
      if(data.address.town)
      {
        this.city = data.address.town;
      }
      else
      {
        this.city = data.address.village;
      }
    })
  }

  FindCity(latitude, longitude){
    //get city of the position find above
    let options: NativeGeocoderOptions = { useLocale: true, maxResults: 5 };

    this.nativeGeocoder.reverseGeocode(latitude, longitude, options)
    .then((result: NativeGeocoderResult[]) => {
    this.city = result[0].locality;
    }).catch((error: any) => alert(error));
  }

  private setCurrentPlatform() : string {
    // Are we on mobile platform? Yes if platform is ios or android, but not desktop or mobileweb, no otherwise
    if (this.platform.is('ios') || this.platform.is('android') && !( this.platform.is('desktop') || this.platform.is('mobileweb')) ) {
      return 'mobile';
    } else {
      return 'browser';
    }
  }

}
