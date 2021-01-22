import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthRoutingModule
  ],
  declarations: [AuthComponent]
})
export class AuthPageModule {}
