import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VehiculesComponent } from './vehicule.component';
import { VehiculeListComponent } from './vehicule-list/vehicule-list.component';
import { CreateVehiculeComponent } from './create-vehicule/create-vehicule.component';
import { UpdateVehiculeComponent } from './update-vehicule/update-vehicule.component';
import { VehiculeDetailComponent } from './vehicule-detail/vehicule-detail.component';
import { AuthGuardAdmin } from '../../auth-guardRoles/auth-guardAdmin';
import { AuthGuardExpediteur } from '../../auth-guardRoles/auth-guardExpediteur';
import { AllGuard } from '../../auth-guardRoles/auth-guardModules.ts/AllGuard';
import { AuthGuardTransitaire } from '../../auth-guardRoles/auth-guardTransitaire';

const routes: Routes = [{
  path: '',
  data: {guards: [ AuthGuardAdmin , AuthGuardExpediteur , AuthGuardTransitaire ]}, canActivate: [AllGuard],
  component: VehiculesComponent,
  children: [
    {
      path: 'vehicule-list',
      component: VehiculeListComponent,
    },
    {
      path: 'create-vehicule',
      component: CreateVehiculeComponent,
    },
    {
      path: 'update-vehicule/:matricule',
      component: UpdateVehiculeComponent,
    },
    {
      path: 'vehicule-list/vehicule-detail/:matricule',
      component: VehiculeDetailComponent,
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
export class VehiculeRoutingModule { }

export const routedComponents = [
  VehiculesComponent,
  VehiculeListComponent,
  CreateVehiculeComponent,
  UpdateVehiculeComponent,
  VehiculeDetailComponent,
];
