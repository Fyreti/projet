import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
      title: 'Deconnection',
      url: '/folder/Deconnection',
      icon: 'power'
    }
  ];
  //public labels = ['Deconnection'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
