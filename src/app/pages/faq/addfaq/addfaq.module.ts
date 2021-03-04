import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { AddfaqPage } from './addfaq.page';
import { UserApp } from 'src/app/model/user.model';
import { AddfaqPageRoutingModule } from './addfaq-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddfaqPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    UserApp
  ],
  declarations: [AddfaqPage]
})
export class AddfaqPageModule {}
