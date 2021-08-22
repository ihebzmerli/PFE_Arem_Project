import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Bon_LivsComponent } from './bon_liv.component';
import { BonLivListComponent } from './bon-liv-list/bon-liv-list.component';
import { CreateBonLivComponent } from './create-bon-liv/create-bon-liv.component';
import { UpdateBonLivComponent } from './update-bon-liv/update-bon-liv.component';
import { BonLivDetailComponent } from './bon-liv-detail/bon-liv-detail.component';
import { EchartsBonLivComponent } from './echarts-bon-liv/echarts.component';
import { WindowDateFilterComponent } from './bon-liv-list/window-date-filter/window-date-filter.component';
import { AuthGuardAdmin } from '../../auth-guardRoles/auth-guardAdmin';
import { AuthGuardAgentCab } from '../../auth-guardRoles/auth-guardAgent_Cab';
import { AuthGuardEmballeur } from '../../auth-guardRoles/auth-guardEmballeur';
import { AuthGuardExpediteur } from '../../auth-guardRoles/auth-guardExpediteur';
import { AuthGuardLivreur } from '../../auth-guardRoles/auth-guardLivreur';
import { AllGuard } from '../../auth-guardRoles/auth-guardModules.ts/AllGuard';
import { AuthGuardPreparateurBr } from '../../auth-guardRoles/auth-guardPreparateur_Br';
import { AuthGuardRDispatchingBp } from '../../auth-guardRoles/auth-guardR_Dispatching_Bp';
import { AuthGuardRPointage } from '../../auth-guardRoles/auth-guardR_Pointage';
import { AuthGuardVendeur } from '../../auth-guardRoles/auth-guardVendeur';

const routes: Routes = [{
  path: '',
  data: {guards: [ AuthGuardAdmin , AuthGuardAgentCab , AuthGuardEmballeur , AuthGuardExpediteur , AuthGuardLivreur , AuthGuardPreparateurBr , AuthGuardRDispatchingBp , AuthGuardRPointage , AuthGuardVendeur]}, canActivate: [AllGuard],
  component: Bon_LivsComponent,
  children: [
    {
      path: 'bon-liv-list',
      component: BonLivListComponent,
    },
    {
      path: 'create-bon-liv',
      data: {guards: [AuthGuardAdmin , AuthGuardPreparateurBr , AuthGuardRDispatchingBp , AuthGuardVendeur ]}, canActivate: [AllGuard],
      component: CreateBonLivComponent,
    },
    {
      path: 'update-bon-liv/:numBon',
      data: {guards: [ AuthGuardAdmin , AuthGuardPreparateurBr , AuthGuardRDispatchingBp , AuthGuardRPointage ]}, canActivate: [AllGuard],
      component: UpdateBonLivComponent,
    },
    {
      path: 'bon-liv-list/bon-liv-detail/:numBon',
      component: BonLivDetailComponent,
    },
    {
      path: 'echarts-bon-liv',
      data: {guards: [ AuthGuardAdmin , AuthGuardPreparateurBr , AuthGuardRDispatchingBp , AuthGuardRPointage ]}, canActivate: [AllGuard],
      component: EchartsBonLivComponent,
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
export class Bon_LivRoutingModule { }

export const routedComponents = [
  Bon_LivsComponent,
  BonLivListComponent,
  CreateBonLivComponent,
  UpdateBonLivComponent,
  BonLivDetailComponent,
];
