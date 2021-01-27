import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoCityFormPageRoutingModule } from './info-city-routing-form.module';

import { InfoCityFormPage } from './info-city-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    InfoCityFormPageRoutingModule
  ],
  declarations: [InfoCityFormPage]
  // Ne jamais importer FormBuilder, ça fait crash
})
export class InfoCityFormPageModule {}