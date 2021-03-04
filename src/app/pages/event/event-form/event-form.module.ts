import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventFormPageRoutingModule } from './event-routing-form.module';

import { EventFormPage } from './event-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EventFormPageRoutingModule
  ],
  declarations: [EventFormPage]
  // Ne jamais importer FormBuilder, ça fait crash
})
export class EventFormPageModule {}