import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageMairiePageRoutingModule } from './message-mairie-routing.module';

import { MessageMairiePage } from './message-mairie.page';
import { UserApp } from 'src/app/model/user.model';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageMairiePageRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  providers: [
    UserApp
  ],
  declarations: [MessageMairiePage]
})
export class MessageMairiePageModule {}
