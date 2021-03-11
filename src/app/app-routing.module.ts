import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardMairie } from './services/auth-guard-mairie';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'info-city',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/auth/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'event-form',
    canActivate: [AuthGuardMairie],
    loadChildren: () => import('src/app/pages/event/event-form/event-form.module').then( m => m.EventFormPageModule)
  },
  {
    path: 'info-city-form',
    canActivate: [AuthGuardMairie],
    loadChildren: () => import('src/app/pages/info-city/info-city-form/info-city-form.module').then( m => m.InfoCityFormPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'notvalid',
    loadChildren: () => import('./pages/auth/notvalid/notvalid.module').then( m => m.NotvalidPageModule)
  },
  {
    path: 'info-city',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/info-city/info-city.module').then( m => m.InfoCityPageModule)
  },
  {
    path: 'event',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'vote',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/vote/vote.module').then( m => m.VotePageModule)
  },
  {
    path: 'addvote',
    canActivate: [AuthGuardMairie],
    loadChildren: () => import('./pages/vote/addvote/addvote.module').then( m => m.AddvotePageModule)
  },
  {
    path: 'dovote/:vote',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/vote/dovote/dovote.module').then( m => m.DovotePageModule)
  },
  {
<<<<<<< Updated upstream
    path: 'resultvote/:vote',
    canActivate: [AuthGuardMairie],
    loadChildren: () => import('./pages/vote/resultvote/resultvote.module').then( m => m.ResultvotePageModule)
  },
  {
=======
>>>>>>> Stashed changes
    path: 'faq',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/faq/faq.module').then( m => m.FAQPageModule)
  },
  {
    path: 'addfaq',
    canActivate: [AuthGuardMairie],
    loadChildren: () => import('./pages/faq/addfaq/addfaq.module').then( m => m.AddfaqPageModule)
  },
  {
    path: 'dofaq/:faq',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/faq/dofaq/dofaq.module').then( m => m.DofaqPageModule)
  },
  {
    path: 'contact-mairie',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/contact-mairie/contact-mairie.module').then( m => m.ContactMairiePageModule)
  },
  {
    path: 'message-mairie/:message',
    canActivate: [AuthGuardMairie],
    loadChildren: () => import('./pages/contact-mairie/message-mairie/message-mairie.module').then( m => m.MessageMairiePageModule)
  },
  {
    path: 'contact-us',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
