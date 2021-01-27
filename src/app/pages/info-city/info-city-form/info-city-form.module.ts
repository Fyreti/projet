import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoCityFormPageRoutingModule } from './info-city-routing-form.module';

import { InfoCityFormPage } from './info-city-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormBuilder,
    InfoCityFormPageRoutingModule
  ],
  declarations: [InfoCityFormPage]
})
export class InfoCityFormPageModule {}