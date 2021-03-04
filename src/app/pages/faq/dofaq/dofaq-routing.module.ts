import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DofaqPage } from './dofaq.page';

const routes: Routes = [
  {
    path: '',
    component: DofaqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DofaqPageRoutingModule {}
