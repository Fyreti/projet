import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageMairiePage } from './message-mairie.page';

const routes: Routes = [
  {
    path: '',
    component: MessageMairiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageMairiePageRoutingModule {}
