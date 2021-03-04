import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddfaqPage } from './addfaq.page';

const routes: Routes = [
  {
    path: '',
    component: AddfaqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddfaqPageRoutingModule {}
