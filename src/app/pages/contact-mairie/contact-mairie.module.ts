import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactMairiePageRoutingModule } from './contact-mairie-routing.module';

import { ContactMairiePage } from './contact-mairie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactMairiePageRoutingModule
  ],
  declarations: [ContactMairiePage]
})
export class ContactMairiePageModule {}
