import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Det_EmbasComponent } from './det_emba.component';
import { DetEmbaListComponent } from './det-emba-list/det-emba-list.component';
import { CreateDetEmbaComponent } from './create-det-emba/create-det-emba.component';
import { UpdateDetEmbaComponent } from './update-det-emba/update-det-emba.component';
import { DetEmbaDetailComponent } from './det-emba-detail/det-emba-detail.component';
import { AuthGuardAdmin } from '../../auth-guardRoles/auth-guardAdmin';
import { AuthGuardDecideurBp } from '../../auth-guardRoles/auth-guardDecideur_Bp';
import { AuthGuardEmballeur } from '../../auth-guardRoles/auth-guardEmballeur';
import { AuthGuardExpediteur } from '../../auth-guardRoles/auth-guardExpediteur';
import { AllGuard } from '../../auth-guardRoles/auth-guardModules.ts/AllGuard';
import { AuthGuardPreparateurBr } from '../../auth-guardRoles/auth-guardPreparateur_Br';
import { AuthGuardRDispatchingBp } from '../../auth-guardRoles/auth-guardR_Dispatching_Bp';

const routes: Routes = [{
  path: '',
  data: {guards: [ AuthGuardAdmin , AuthGuardDecideurBp , AuthGuardEmballeur , AuthGuardExpediteur , AuthGuardPreparateurBr , AuthGuardRDispatchingBp ]}, canActivate: [AllGuard],
  component: Det_EmbasComponent,
  children: [
    {
      path: 'det-emba-list',
      component: DetEmbaListComponent,
    },
    {
      path: 'create-det-emba',
      data: {guards: [ AuthGuardAdmin , AuthGuardEmballeur , AuthGuardExpediteur ]}, canActivate: [AllGuard],
      component: CreateDetEmbaComponent,
    },
    {
      path: 'update-det-emba/:id',
      data: {guards: [ AuthGuardAdmin , AuthGuardEmballeur , AuthGuardExpediteur ]}, canActivate: [AllGuard],
      component: UpdateDetEmbaComponent,
    },
    {
      path: 'det-emba-list/det-emba-detail/:id',
      component: DetEmbaDetailComponent,
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
export class Det_EmbaRoutingModule { }

export const routedComponents = [
  Det_EmbasComponent,
  DetEmbaListComponent,
  CreateDetEmbaComponent,
  UpdateDetEmbaComponent,
  DetEmbaDetailComponent,
];
