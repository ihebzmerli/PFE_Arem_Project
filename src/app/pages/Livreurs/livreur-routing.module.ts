import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LivreursComponent } from './livreur.component';
import { LivreurListComponent } from './livreur-list/livreur-list.component';
import { CreateLivreurComponent } from './create-livreur/create-livreur.component';
import { UpdateLivreurComponent } from './update-livreur/update-livreur.component';
import { LivreurDetailComponent } from './livreur-detail/livreur-detail.component';
import { ChartjsLivreurComponent } from './echarts-livreur/chartjs.component';
import { AuthGuardAdmin } from '../../auth-guardRoles/auth-guardAdmin';
import { AuthGuardExpediteur } from '../../auth-guardRoles/auth-guardExpediteur';
import { AllGuard } from '../../auth-guardRoles/auth-guardModules.ts/AllGuard';
import { AuthGuardPreparateurBr } from '../../auth-guardRoles/auth-guardPreparateur_Br';
import { AuthGuardRDispatchingBp } from '../../auth-guardRoles/auth-guardR_Dispatching_Bp';

const routes: Routes = [{
  path: '',
  data: {guards: [ AuthGuardAdmin , AuthGuardExpediteur , AuthGuardPreparateurBr , AuthGuardRDispatchingBp]}, canActivate: [AllGuard],
  component: LivreursComponent,
  children: [
    {
      path: 'livreur-list',
      component: LivreurListComponent,
    },
    {
      path: 'create-livreur',
      data: {guards: [ AuthGuardAdmin , AuthGuardExpediteur , AuthGuardPreparateurBr ]}, canActivate: [AllGuard],
      component: CreateLivreurComponent,
    },
    {
      path: 'update-livreur/:id_livreur',
      data: {guards: [ AuthGuardAdmin , AuthGuardExpediteur , AuthGuardPreparateurBr ]}, canActivate: [AllGuard],
      component: UpdateLivreurComponent,
    },
    {
      path: 'livreur-list/livreur-detail/:id_livreur',
      data: {guards: [ AuthGuardAdmin , AuthGuardExpediteur , AuthGuardPreparateurBr ]}, canActivate: [AllGuard],
      component: LivreurDetailComponent,
    },
    {
      path: 'echarts-livreur',
      data: {guards: [ AuthGuardAdmin , AuthGuardExpediteur , AuthGuardPreparateurBr ]}, canActivate: [AllGuard],
      component: ChartjsLivreurComponent,
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
export class LivreurRoutingModule { }

export const routedComponents = [
  LivreursComponent,
  LivreurListComponent,
  CreateLivreurComponent,
  UpdateLivreurComponent,
  LivreurDetailComponent,
];
