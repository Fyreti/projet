import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SQLite} from '@ionic-native/sqlite/ngx';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { DataService } from './services/data.service';
import { UserApp } from './model/user.model';
import { MessageService } from './services/message.service';
import { DatePipe } from '@angular/common';
import { MessageApp } from './model/message.model';
import { AuthGuardMairie } from './services/auth-guard-mairie';
import { InfoCityService } from './services/info-city.service';
import { VoteService } from './services/vote.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    
 	  AngularFirestoreModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    AuthService,
    AuthGuard,
    AuthGuardMairie,
    DataService,
    InfoCityService,
    UserApp,
    MessageService,
    DatePipe,
    MessageApp,
    VoteService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
