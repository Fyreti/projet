import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DovotePage } from './dovote.page';

const routes: Routes = [
  {
    path: '',
    component: DovotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DovotePageRoutingModule {}
