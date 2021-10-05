import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Bon_SortsComponent } from './bon_sort.component';
import { BonSortListComponent } from './bon-sort-list/bon-sort-list.component';
import { CreateBonSortComponent } from './create-bon-sort/create-bon-sort.component';
import { UpdateBonSortComponent } from './update-bon-sort/update-bon-sort.component';
import { BonSortDetailComponent } from './bon-sort-detail/bon-sort-detail.component';
import { AuthGuardAdmin } from '../../auth-guardRoles/auth-guardAdmin';
import { AllGuard } from '../../auth-guardRoles/auth-guardModules.ts/AllGuard';
import { AuthGuardPreparateurBr } from '../../auth-guardRoles/auth-guardPreparateur_Br';
import { AuthGuardRDispatchingBp } from '../../auth-guardRoles/auth-guardR_Dispatching_Bp';
import { AuthGuardRPointage } from '../../auth-guardRoles/auth-guardR_Pointage';
import { AuthGuardDecideurBp } from '../../auth-guardRoles/auth-guardDecideur_Bp';

const routes: Routes = [{
  path: '',
  data: {guards: [ AuthGuardAdmin , AuthGuardPreparateurBr , AuthGuardRDispatchingBp , AuthGuardRPointage , AuthGuardDecideurBp ]}, canActivate: [AllGuard],
  component: Bon_SortsComponent,
  children: [
    {
      path: 'bon-sort-list',
      component: BonSortListComponent,
    },
    {
      path: 'create-bon-sort',
      data: {guards: [ AuthGuardAdmin , AuthGuardRDispatchingBp, AuthGuardDecideurBp ]}, canActivate: [AllGuard],
      component: CreateBonSortComponent,
    },
    {
      path: 'update-bon-sort/:numBon',
      data: {guards: [ AuthGuardAdmin , AuthGuardRDispatchingBp ]}, canActivate: [AllGuard],
      component: UpdateBonSortComponent,
    },
    {
      path: 'bon-sort-list/bon-sort-detail/:numBon',
      component: BonSortDetailComponent,
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
export class Bon_SortRoutingModule { }

export const routedComponents = [
  Bon_SortsComponent,
  BonSortListComponent,
  CreateBonSortComponent,
  UpdateBonSortComponent,
  BonSortDetailComponent,
];
