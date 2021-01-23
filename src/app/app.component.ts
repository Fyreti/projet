import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { Console } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
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
    private authService: AuthService
  ) {
    var firebaseConfig = {
      apiKey: "AIzaSyBEHNcFMoKi8c0muw_riGUqSfx-jvxGm9M",
      authDomain: "soundcity-e36fa.firebaseapp.com",
      projectId: "soundcity-e36fa",
      storageBucket: "soundcity-e36fa.appspot.com",
      messagingSenderId: "800670036452",
      appId: "1:800670036452:web:d873650e027c35434157f1",
      measurementId: "G-6Y7DWJ797F"
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

  signOut(title){
    if (title == 'Deconnexion'){
      console.log(title);
      this.authService.signOut();
    }
  }

  ngOnInit(){
    
  }
}
