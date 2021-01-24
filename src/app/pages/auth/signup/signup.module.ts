import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupRoutingModule } from './signup-routing.module';

import { SignupComponent } from './signup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  declarations: [SignupComponent]
})
export class SignupPageModule {}
