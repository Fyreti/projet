import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { Console } from 'console';
import { DataService } from './services/data.service';
import { UserApp } from './model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public isAuth: boolean;
  public getData : any;
  //public userApp: UserApp;

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Information de la ville',
      url: '/info-city',
      icon: 'information-circle'
    },
    {
      title: 'Vote',
      url: '/vote',
      icon: 'mail-open'
    },
    {
      title: 'FAQ',
      url: '/faq',
      icon: 'help-circle'
    },
    {
      title: 'Contacter votre mairie',
      url: '/contact-mairie',
      icon: 'chatbox-ellipses'
    },
    {
      title: 'Evenements',
      url: '/events',
      icon: 'calendar'
    },
    {
      title: 'Contactez nous',
      url: '/contact-us',
      icon: 'chatbubble-ellipses'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'accessibility'
    },
    {
      title: 'Deconnexion',
      url: '/auth',
      icon: 'power'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private dataService: DataService,
    public userApp:UserApp,
  ) {
    var firebaseConfig = {
      apiKey: "AIzaSyCRbnhJS76bXL5EnR2GjSkcCKS-LGradA8",
      authDomain: "sondcity-65de4.firebaseapp.com",
      projectId: "sondcity-65de4",
      storageBucket: "sondcity-65de4.appspot.com",
      messagingSenderId: "321982959422",
      appId: "1:321982959422:web:606a966ff83bdf87b8666f",
      measurementId: "G-K7363FC5CH"
    };
    // Initialize Firebase
    firebase.default.initializeApp(firebaseConfig);
    firebase.default.analytics();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    firebase.default.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          console.log("isAuth:True");
          this.isAuth = true;
          this.dataService.getOneUser(user.email, this.userApp).then();
          console.log(this.userApp.email);
        } else {
          console.log("isAuth:False");
          this.isAuth = false;
        }
      }
    );
      
  }

  onSignOut(titleSelect : string) {
    
    if (titleSelect == 'Deconnexion'){
      console.log("deconnexion");
      this.authService.signOutUser();
    }
    
  }


}
