import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultvotePageRoutingModule } from './resultvote-routing.module';

import { ResultvotePage } from './resultvote.page';
import { UserApp } from 'src/app/model/user.model';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultvotePageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    UserApp
  ],
  declarations: [ResultvotePage]
})
export class ResultvotePageModule {}
