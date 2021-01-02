import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoCityPageRoutingModule } from './info-city-routing.module';

import { InfoCityPage } from './info-city.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoCityPageRoutingModule
  ],
  declarations: [InfoCityPage]
})
export class InfoCityPageModule {}
