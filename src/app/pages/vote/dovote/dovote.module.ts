import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DovotePageRoutingModule } from './dovote-routing.module';

import { DovotePage } from './dovote.page';
import { UserApp } from 'src/app/model/user.model';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DovotePageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    UserApp
  ],
  declarations: [DovotePage]
})
export class DovotePageModule {}
