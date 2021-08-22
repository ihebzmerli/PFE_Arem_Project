import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChariotsComponent } from './chariot.component';
import { ChariotListComponent } from './chariot-list/chariot-list.component';
import { CreateChariotComponent } from './create-chariot/create-chariot.component';
import { ChariotDetailComponent } from './chariot-detail/chariot-detail.component';
import { UpdateChariotComponent } from './update-chariot/update-chariot.component';
import { DeleteChariotDialogComponent } from './chariot-list/delete-dialog/delete-chariot-dialog.component';
import { ChartjsChariotComponent } from './echarts-chariot/chartjs.component';
import { AuthGuardAdmin } from '../../auth-guardRoles/auth-guardAdmin';
import { AuthGuardAgentSaisieReg } from '../../auth-guardRoles/auth-guardAgent_Saisie_Reg';
import { AuthGuardDecideurBp } from '../../auth-guardRoles/auth-guardDecideur_Bp';
import { AuthGuardExpediteur } from '../../auth-guardRoles/auth-guardExpediteur';
import { AllGuard } from '../../auth-guardRoles/auth-guardModules.ts/AllGuard';
import { AuthGuardPreparateur } from '../../auth-guardRoles/auth-guardPreparateur';
import { AuthGuardPreparateurBr } from '../../auth-guardRoles/auth-guardPreparateur_Br';
import { AuthGuardRDispatchingBp } from '../../auth-guardRoles/auth-guardR_Dispatching_Bp';
import { AuthGuardRPointage } from '../../auth-guardRoles/auth-guardR_Pointage';
const routes: Routes = [{
  path: '',
  data: {guards: [ AuthGuardAdmin , AuthGuardAgentSaisieReg , AuthGuardDecideurBp , AuthGuardExpediteur , AuthGuardPreparateur , AuthGuardPreparateurBr , AuthGuardRDispatchingBp , AuthGuardRPointage ]}, canActivate: [AllGuard],
  component: ChariotsComponent,
  children: [
    {
      path: 'chariot-list',
      component: ChariotListComponent,
    },
    {
      path: 'create-chariot',
      data: {guards: [ AuthGuardAdmin , AuthGuardRDispatchingBp , AuthGuardDecideurBp]}, canActivate: [AllGuard],
      component: CreateChariotComponent,
    },
    {
      path: 'update-chariot/:numChar',
      data: {guards: [ AuthGuardAdmin , AuthGuardRDispatchingBp , AuthGuardDecideurBp ]}, canActivate: [AllGuard],
      component: UpdateChariotComponent,
    },
    {
      path: 'chariot-list/chariot-detail/:numChar',
      component: ChariotDetailComponent,
    },
    {
      path: 'delete-dialog',
      component: DeleteChariotDialogComponent
    },
    {
      path: 'echarts-chariot',
      data: {guards: [ AuthGuardAdmin , AuthGuardAgentSaisieReg , AuthGuardDecideurBp , AuthGuardExpediteur , AuthGuardPreparateur , AuthGuardPreparateurBr , AuthGuardRDispatchingBp ]}, canActivate: [AllGuard],
      component: ChartjsChariotComponent
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
export class ChariotRoutingModule { }

export const routedComponents = [
  ChariotsComponent,
  ChariotListComponent,
  CreateChariotComponent,
  ChariotDetailComponent,
  UpdateChariotComponent,
  DeleteChariotDialogComponent
];
