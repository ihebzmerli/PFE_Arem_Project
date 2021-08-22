import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AchatsComponent } from './achats.component';

import { AchatsListComponent } from './achats-list/achats-list.component';
import { AchatsDetailComponent } from './achats-detail/achats-detail.component';
import { EchartsAchatsComponent } from './echarts-achats/echarts.component';
import { ValiderAchatsDialogComponent } from './achats-list/valider-dialog/valider-achats-dialog.component';
import { AuthGuardCaissier } from '../../auth-guardRoles/auth-guardCaissier';
import { AuthGuardAdmin } from '../../auth-guardRoles/auth-guardAdmin';
import { AuthGuardPreparateurBr } from '../../auth-guardRoles/auth-guardPreparateur_Br';
import { AuthGuardRDispatchingBp } from '../../auth-guardRoles/auth-guardR_Dispatching_Bp';
import { AllGuard } from '../../auth-guardRoles/auth-guardModules.ts/AllGuard';


const routes: Routes = [{
  path: '',
  data: {guards: [AuthGuardAdmin , AuthGuardCaissier , AuthGuardPreparateurBr , AuthGuardRDispatchingBp ]}, canActivate: [AllGuard],
  component: AchatsComponent,
  children: [
    {
      path: 'achats-list',
      component: AchatsListComponent,
    },
    {
      path: 'achats-list/achats-detail/:numDocAchat',
      component: AchatsDetailComponent,
    },
    {
      path: 'echarts-achats',
      data: {guards: [AuthGuardAdmin , AuthGuardCaissier ]}, canActivate: [AllGuard],
      component: EchartsAchatsComponent,
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
export class AchatsRoutingModule { }

export const routedComponents = [
  AchatsComponent,
  AchatsListComponent,
  AchatsDetailComponent
];
