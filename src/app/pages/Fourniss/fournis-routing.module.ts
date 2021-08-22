import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FournissComponent } from './fournis.component';
import { FournisListComponent } from './fournis-list/fournis-list.component';
import { FournisDetailComponent } from './fournis-detail/fournis-detail.component';
import { AuthGuardAdmin } from '../../auth-guardRoles/auth-guardAdmin';
import { AuthGuardCaissier } from '../../auth-guardRoles/auth-guardCaissier';
import { AuthGuardDecideurBp } from '../../auth-guardRoles/auth-guardDecideur_Bp';
import { AuthGuardExpediteur } from '../../auth-guardRoles/auth-guardExpediteur';
import { AuthGuardLivreur } from '../../auth-guardRoles/auth-guardLivreur';
import { AllGuard } from '../../auth-guardRoles/auth-guardModules.ts/AllGuard';
import { AuthGuardPreparateurBr } from '../../auth-guardRoles/auth-guardPreparateur_Br';
import { AuthGuardRDispatchingBp } from '../../auth-guardRoles/auth-guardR_Dispatching_Bp';
import { AuthGuardTransitaire } from '../../auth-guardRoles/auth-guardTransitaire';
import { AuthGuardVendeur } from '../../auth-guardRoles/auth-guardVendeur';

const routes: Routes = [{
  path: '',
  data: {guards: [ AuthGuardAdmin , AuthGuardCaissier , AuthGuardDecideurBp , AuthGuardExpediteur , AuthGuardLivreur , AuthGuardTransitaire , AuthGuardPreparateurBr , AuthGuardRDispatchingBp ]}, canActivate: [AllGuard],
  component: FournissComponent,
  children: [
    {
      path: 'fournis-list',
      component: FournisListComponent,
    },
    {
      path: 'fournis-list/fournis-detail/:codFrs',
      data: {guards: [ AuthGuardAdmin , AuthGuardCaissier , AuthGuardDecideurBp , AuthGuardExpediteur , AuthGuardLivreur , AuthGuardVendeur , AuthGuardTransitaire ]}, canActivate: [AllGuard],
      component: FournisDetailComponent,
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
export class FournisRoutingModule { }

export const routedComponents = [
  FournissComponent,
  FournisListComponent,
  FournisDetailComponent,
];
