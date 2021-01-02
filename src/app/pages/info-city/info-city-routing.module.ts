import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoCityPage } from './info-city.page';

const routes: Routes = [
  {
    path: '',
    component: InfoCityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoCityPageRoutingModule {}
