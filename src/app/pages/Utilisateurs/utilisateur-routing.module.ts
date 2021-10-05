import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UtilisateursComponent } from './utilisateur.component';
import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';
import { CreateUtilisateurComponent } from './create-utilisateur/create-utilisateur.component';
import { UpdateUtilisateurComponent } from './update-utilisateur/update-utilisateur.component';
import { ChartjsUtilisateurComponent } from './echarts-utilisateur/chartjs.component';
import { AuthGuardCaissier } from '../../auth-guardRoles/auth-guardCaissier';
import { AuthGuardAdmin } from '../../auth-guardRoles/auth-guardAdmin';
import { AllGuard } from '../../auth-guardRoles/auth-guardModules.ts/AllGuard';
import { AuthGuardTransitaire } from '../../auth-guardRoles/auth-guardTransitaire';

const routes: Routes = [{
  path: '',
  data: {guards: [ AuthGuardAdmin , AuthGuardCaissier , AuthGuardTransitaire ]}, canActivate: [AllGuard],
  component: UtilisateursComponent,
  children: [
    {
      path: 'utilisateur-list',
      component: UtilisateurListComponent,
    },
    {
      path: 'create-utilisateur',
      data: {guards: [ AuthGuardAdmin , AuthGuardTransitaire ]}, canActivate: [AllGuard],
      component: CreateUtilisateurComponent,
    },
    {
      path: 'update-utilisateur/:id',
      data: {guards: [ AuthGuardAdmin , AuthGuardTransitaire ]}, canActivate: [AllGuard],
      component: UpdateUtilisateurComponent,
    },
    {
      path: 'echarts-utilisateur',
      component: ChartjsUtilisateurComponent,
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
export class UtilisateurRoutingModule { }

export const routedComponents = [
  UtilisateursComponent,
  UtilisateurListComponent,
  CreateUtilisateurComponent,
  UpdateUtilisateurComponent,
];
