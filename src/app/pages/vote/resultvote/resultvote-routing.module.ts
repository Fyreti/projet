import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultvotePage } from './resultvote.page';

const routes: Routes = [
  {
    path: '',
    component: ResultvotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultvotePageRoutingModule {}
