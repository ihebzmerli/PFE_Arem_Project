import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExpidesComponent } from './expide.component';
import { ExpideListComponent } from './expide-list/expide-list.component';
import { CreateExpideComponent } from './create-expide/create-expide.component';
import { UpdateExpideComponent } from './update-expide/update-expide.component';
import { ExpideDetailComponent } from './expide-detail/expide-detail.component';
import { ChartjsExpideComponent } from './echarts-expide/chartjs.component';
import { AuthGuardAdmin } from '../../auth-guardRoles/auth-guardAdmin';
import { AuthGuardDecideurBp } from '../../auth-guardRoles/auth-guardDecideur_Bp';
import { AuthGuardExpediteur } from '../../auth-guardRoles/auth-guardExpediteur';
import { AllGuard } from '../../auth-guardRoles/auth-guardModules.ts/AllGuard';

const routes: Routes = [{
  path: '',
  data: {guards: [ AuthGuardAdmin , AuthGuardDecideurBp , AuthGuardExpediteur ]}, canActivate: [AllGuard],
  component: ExpidesComponent,
  children: [
    {
      path: 'expide-list',
      component: ExpideListComponent,
    },
    {
      path: 'create-expide',
      data: {guards: [ AuthGuardAdmin , AuthGuardExpediteur ]}, canActivate: [AllGuard],
      component: CreateExpideComponent,
    },
    {
      path: 'update-expide/:id',
      data: {guards: [ AuthGuardAdmin , AuthGuardExpediteur ]}, canActivate: [AllGuard],
      component: UpdateExpideComponent,
    },
    {
      path: 'expide-list/expide-detail/:id',
      data: {guards: [ AuthGuardAdmin , AuthGuardDecideurBp , AuthGuardExpediteur ]}, canActivate: [AllGuard],
      component: ExpideDetailComponent,
    },
    {
      path: 'echarts-expide',
      data: {guards: [ AuthGuardAdmin , AuthGuardExpediteur ]}, canActivate: [AllGuard],
      component: ChartjsExpideComponent,
    },
  ],
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ExpideRoutingModule { }

export const routedComponents = [
  ExpidesComponent,
  ExpideListComponent,
  CreateExpideComponent,
  UpdateExpideComponent,
  ExpideDetailComponent,
];
