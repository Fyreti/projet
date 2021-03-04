import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DofaqPageRoutingModule } from './dofaq-routing.module';

import { DofaqPage } from './dofaq.page';
import { UserApp } from 'src/app/model/user.model';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DofaqPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    UserApp
  ],
  declarations: [DofaqPage]
})
export class DofaqPageModule {}
