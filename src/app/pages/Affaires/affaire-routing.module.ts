import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AffaireComponent } from './affaire.component';

import { AffaireListComponent } from './affaire-list/affaire-list.component';
import { AffairesDetailComponent } from './affaires-detail/affaires-detail.component';
import { EchartsAffaireComponent } from './echarts-affaire/echarts.component';
import { AuthGuardCaissier } from '../../auth-guardRoles/auth-guardCaissier';
import { AuthGuardAgentCab } from '../../auth-guardRoles/auth-guardAgent_Cab';
import { AuthGuardAdmin } from '../../auth-guardRoles/auth-guardAdmin';
import { AuthGuardPreparateurBr } from '../../auth-guardRoles/auth-guardPreparateur_Br';
import { AllGuard } from '../../auth-guardRoles/auth-guardModules.ts/AllGuard';

const routes: Routes = [{
  path: '',
  data: {guards: [AuthGuardAdmin , AuthGuardAgentCab , AuthGuardPreparateurBr , AuthGuardCaissier]}, canActivate: [AllGuard],
  component: AffaireComponent,
  children: [
    {
      path: 'affaire-list',
      component: AffaireListComponent,
    },
    {
      path: 'affaire-list/affaire-detail/:numAff',
      component: AffairesDetailComponent,
    },
    {
      path: 'echarts-affaire',
      data: {guards: [AuthGuardAdmin , AuthGuardCaissier]}, canActivate: [AllGuard],
      component: EchartsAffaireComponent,
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
export class AffaireRoutingModule { }

export const routedComponents = [
  AffaireComponent
];
