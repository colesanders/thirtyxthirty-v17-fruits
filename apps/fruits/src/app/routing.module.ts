import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FruitsComponent } from './fruits/fruits.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { UiLoginModule } from '@thirty/ui-login';
import { LoginComponent } from '@thirty/ui-login';
import { FruitsOverviewComponent } from './fruits/components/fruits-overview/fruits-overview.component';

import { LoginGuard } from '@thirty/ui-login';

const routes: Routes = [
  { path: 'fruits', component: FruitsComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: ':id', // child route path
        component: FruitsOverviewComponent // child route component that the router renders
      }
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: '404', component: FourOhFourComponent},
  { path: '', redirectTo: '/fruits', pathMatch: 'full'},
  { path: '**', component: FourOhFourComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiLoginModule,
      RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
