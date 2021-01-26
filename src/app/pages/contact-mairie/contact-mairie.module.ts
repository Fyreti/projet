import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactMairiePageRoutingModule } from './contact-mairie-routing.module';

import { ContactMairiePage } from './contact-mairie.page';
import { UserApp } from 'src/app/model/user.model';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactMairiePageRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  providers: [
    UserApp
  ],
  declarations: [ContactMairiePage]
})
export class ContactMairiePageModule {}
