import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotvalidRoutingModule } from './notvalid-routing.module';

import { NotvalidComponent } from './notvalid.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotvalidRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  declarations: [NotvalidComponent]
})
export class NotvalidPageModule {}
