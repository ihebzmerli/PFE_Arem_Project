import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrimesComponent } from './prime.component';
import { PrimeListComponent } from './prime-list/prime-list.component';
import { CreatePrimeComponent } from './create-prime/create-prime.component';
import { UpdatePrimeComponent } from './update-prime/update-prime.component';
import { AuthGuardCaissier } from '../../auth-guardRoles/auth-guardCaissier';
import { AuthGuardAdmin } from '../../auth-guardRoles/auth-guardAdmin';
import { AllGuard } from '../../auth-guardRoles/auth-guardModules.ts/AllGuard';
import { AuthGuardTransitaire } from '../../auth-guardRoles/auth-guardTransitaire';

const routes: Routes = [{
  path: '',
  data: {guards: [ AuthGuardAdmin , AuthGuardTransitaire , AuthGuardCaissier ]}, canActivate: [AllGuard],
  component: PrimesComponent,
  children: [
    {
      path: 'prime-list',
      component: PrimeListComponent,
    },
    {
      path: 'create-prime',
      data: {guards: [ AuthGuardAdmin , AuthGuardTransitaire ]}, canActivate: [AllGuard],
      component: CreatePrimeComponent,
    },
    {
      path: 'update-prime/:id',
      data: {guards: [ AuthGuardAdmin , AuthGuardTransitaire ]}, canActivate: [AllGuard],
      component: UpdatePrimeComponent,
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
export class PrimeRoutingModule { }

export const routedComponents = [
  PrimesComponent,
  PrimeListComponent,
  CreatePrimeComponent,
  UpdatePrimeComponent
];
