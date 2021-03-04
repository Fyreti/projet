import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddfaqPageRoutingModule } from './addfaq-routing.module';

import { AddfaqPage } from './addfaq.page';
import { UserApp } from 'src/app/model/user.model';

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
export class AddvotePageModule {}
