import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Etat_LivsComponent } from './etat_liv.component';
import { EtatLivListComponent } from './etat-liv-list/etat-liv-list.component';
import { CreateEtatLivComponent } from './create-etat-liv/create-etat-liv.component';
import { UpdateEtatLivComponent } from './update-etat-liv/update-etat-liv.component';
import { EtatLivDetailComponent } from './etat-liv-detail/etat-liv-detail.component';
import { EchartsEtatlivComponent } from './echarts-etatliv/echarts.component';
import { AuthGuardAcheteur } from '../../auth-guardRoles/auth-guardAcheteur';
import { AuthGuardAdmin } from '../../auth-guardRoles/auth-guardAdmin';
import { AuthGuardClient } from '../../auth-guardRoles/auth-guardClient';
import { AuthGuardExpediteur } from '../../auth-guardRoles/auth-guardExpediteur';
import { AuthGuardLivreur } from '../../auth-guardRoles/auth-guardLivreur';
import { AllGuard } from '../../auth-guardRoles/auth-guardModules.ts/AllGuard';

const routes: Routes = [{
  path: '',
  data: {guards: [AuthGuardAcheteur , AuthGuardAdmin , AuthGuardClient , AuthGuardExpediteur , AuthGuardLivreur ]}, canActivate: [AllGuard],
  component: Etat_LivsComponent,
  children: [
    {
      path: 'etat-liv-list',
      component: EtatLivListComponent,
    },
    {
      path: 'create-etat-liv',
      component: CreateEtatLivComponent,
    },
    {
      path: 'etat-liv-list/update-etat-liv/:id',
      data: {guards: [ AuthGuardAdmin , AuthGuardLivreur , AuthGuardAcheteur]}, canActivate: [AllGuard],
      component: UpdateEtatLivComponent,
    },
    {
      path: 'etat-liv-list/etat-liv-detail/:id',
      component: EtatLivDetailComponent,
    },
    {
      path: 'echarts-etatliv',
      data: {guards: [ AuthGuardAdmin , AuthGuardLivreur ]}, canActivate: [AllGuard],
      component: EchartsEtatlivComponent,
    }
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
export class Etat_LivRoutingModule { }

export const routedComponents = [
  Etat_LivsComponent,
  EtatLivListComponent,
  CreateEtatLivComponent,
  UpdateEtatLivComponent,
  EtatLivDetailComponent,
];
