import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotvalidComponent } from './notvalid.component';

const routes: Routes = [
  {
    path: '',
    component: NotvalidComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
  
})
export class NotvalidRoutingModule {}
