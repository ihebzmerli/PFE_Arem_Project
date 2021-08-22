import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RectifsComponent } from './rectif.component';
import { RectifListComponent } from './rectif-list/rectif-list.component';
import { CreateRectifComponent } from './create-rectif/create-rectif.component';
import { UpdateRectifComponent } from './update-rectif/update-rectif.component';
import { RectifDetailComponent } from './rectif-detail/rectif-detail.component';
import { AuthGuardAdmin } from '../../auth-guardRoles/auth-guardAdmin';
import { AllGuard } from '../../auth-guardRoles/auth-guardModules.ts/AllGuard';
import { AuthGuardPreparateurBr } from '../../auth-guardRoles/auth-guardPreparateur_Br';
import { AuthGuardRDispatchingBp } from '../../auth-guardRoles/auth-guardR_Dispatching_Bp';
import { AuthGuardRSFrsEtrager } from '../../auth-guardRoles/auth-guardR_S_Frs_Etranger';
import { AuthGuardRSFrsLocal } from '../../auth-guardRoles/auth-guardR_S_Frs_Local';
import { AuthGuardTransitaire } from '../../auth-guardRoles/auth-guardTransitaire';
import { AuthGuardCaissier } from '../../auth-guardRoles/auth-guardCaissier';
import { AuthGuardDecideurBp } from '../../auth-guardRoles/auth-guardDecideur_Bp';

const routes: Routes = [{
  path: '',
  data: {guards: [ AuthGuardAdmin , AuthGuardPreparateurBr , AuthGuardRDispatchingBp , AuthGuardDecideurBp , AuthGuardRSFrsEtrager , AuthGuardRSFrsLocal , AuthGuardTransitaire , AuthGuardCaissier ]}, canActivate: [AllGuard],
  component: RectifsComponent,
  children: [
    {
      path: 'rectif-list',
      component: RectifListComponent,
    },
    {
      path: 'create-rectif',
      data: {guards: [ AuthGuardAdmin , AuthGuardPreparateurBr , AuthGuardRDispatchingBp , AuthGuardTransitaire ]}, canActivate: [AllGuard],
      component: CreateRectifComponent,
    },
    {
      path: 'update-rectif',
      data: {guards: [ AuthGuardAdmin , AuthGuardPreparateurBr , AuthGuardRDispatchingBp , AuthGuardTransitaire ]}, canActivate: [AllGuard],
      component: UpdateRectifComponent,
    },
    {
      path: 'rectif-list/rectif-detail/:id_rectif',
      data: {guards: [ AuthGuardAdmin , AuthGuardPreparateurBr , AuthGuardRDispatchingBp , AuthGuardTransitaire ]}, canActivate: [AllGuard],
      component: RectifDetailComponent,
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
export class RectifRoutingModule { }

export const routedComponents = [
  RectifsComponent,
  RectifListComponent,
  CreateRectifComponent,
  UpdateRectifComponent,
  RectifDetailComponent,
];
