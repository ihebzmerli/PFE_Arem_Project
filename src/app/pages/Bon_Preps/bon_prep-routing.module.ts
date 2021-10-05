import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Bon_PrepsComponent } from './bon_prep.component';
import { BonPrepListComponent } from './bon-prep-list/bon-prep-list.component';
import { CreateBonPrepComponent } from './create-bon-prep/create-bon-prep.component';
import { UpdateBonPrepComponent } from './update-bon-prep/update-bon-prep.component';
import { BonPrepDetailComponent } from './bon-prep-detail/bon-prep-detail.component';
import { EchartsBonPrepComponent } from './echarts-bon-prep/echarts.component';
import { WindowDateFilterComponent } from './bon-prep-list/window-date-filter/window-date-filter.component';
import { AuthGuardAdmin } from '../../auth-guardRoles/auth-guardAdmin';
import { AuthGuardDecideurBp } from '../../auth-guardRoles/auth-guardDecideur_Bp';
import { AuthGuardExpediteur } from '../../auth-guardRoles/auth-guardExpediteur';
import { AllGuard } from '../../auth-guardRoles/auth-guardModules.ts/AllGuard';
import { AuthGuardPreparateur } from '../../auth-guardRoles/auth-guardPreparateur';
import { AuthGuardRDispatchingBp } from '../../auth-guardRoles/auth-guardR_Dispatching_Bp';
import { AuthGuardRPointage } from '../../auth-guardRoles/auth-guardR_Pointage';

const routes: Routes = [{
  path: '',
  data: {guards: [AuthGuardAdmin , AuthGuardDecideurBp , AuthGuardExpediteur , AuthGuardPreparateur , AuthGuardRDispatchingBp , AuthGuardRPointage ]}, canActivate: [AllGuard],
  component: Bon_PrepsComponent,
  children: [
    {
      path: 'bon-prep-list',
      component: BonPrepListComponent,
    },
    {
      data: {guards: [AuthGuardAdmin , AuthGuardDecideurBp , AuthGuardRDispatchingBp ]}, canActivate: [AllGuard],
      path: 'create-bon-prep',
      component: CreateBonPrepComponent,
    },
    {
      path: 'update-bon-prep/:numBon',
      data: {guards: [AuthGuardAdmin , AuthGuardDecideurBp , AuthGuardExpediteur , AuthGuardPreparateur , AuthGuardRDispatchingBp ]}, canActivate: [AllGuard],
      component: UpdateBonPrepComponent,
    },
    {
      path: 'bon-prep-list/bon-prep-detail/:numBon',
      data: {guards: [AuthGuardAdmin , AuthGuardDecideurBp , AuthGuardExpediteur , AuthGuardPreparateur , AuthGuardRDispatchingBp , AuthGuardRPointage]}, canActivate: [AllGuard],
      component: BonPrepDetailComponent,
    },
    {
      path: 'echarts-bon-prep',
      data: {guards: [AuthGuardAdmin , AuthGuardDecideurBp , AuthGuardRDispatchingBp ]}, canActivate: [AllGuard],
      component: EchartsBonPrepComponent,
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
export class Bon_PrepRoutingModule { }

export const routedComponents = [
  Bon_PrepsComponent,
  BonPrepListComponent,
  CreateBonPrepComponent,
  UpdateBonPrepComponent,
  BonPrepDetailComponent,
];
