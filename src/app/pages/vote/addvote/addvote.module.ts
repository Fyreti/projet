import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddvotePageRoutingModule } from './addvote-routing.module';

import { AddvotePage } from './addvote.page';
import { UserApp } from 'src/app/model/user.model';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddvotePageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    UserApp
  ],
  declarations: [AddvotePage]
})
export class AddvotePageModule {}
