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
    DataService,
    UserApp,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
