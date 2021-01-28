import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddvotePage } from './addvote.page';

const routes: Routes = [
  {
    path: '',
    component: AddvotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddvotePageRoutingModule {}
