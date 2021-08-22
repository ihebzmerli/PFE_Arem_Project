import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MarquesComponent } from './marque.component';

import { MarqueListComponent } from './marque-list/marque-list.component';
import { CreateMarqueComponent } from './create-marque/create-marque.component';
import { UpdateMarqueComponent } from './update-marque/update-marque.component';
import { AuthGuardAdmin } from '../../auth-guardRoles/auth-guardAdmin';
import { AllGuard } from '../../auth-guardRoles/auth-guardModules.ts/AllGuard';
import { AuthGuardTransitaire } from '../../auth-guardRoles/auth-guardTransitaire';


const routes: Routes = [{
  path: '',
  component: MarquesComponent,
  children: [
    {
      path: 'marque-list',
      component: MarqueListComponent,
    },
    {
      path: 'create-marque',
      data: {guards: [ AuthGuardAdmin , AuthGuardTransitaire ]}, canActivate: [AllGuard],
      component: CreateMarqueComponent,
    },
    {
      path: 'update-marque/:id',
      data: {guards: [ AuthGuardAdmin , AuthGuardTransitaire ]}, canActivate: [AllGuard],
      component: UpdateMarqueComponent,
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
export class MarqueRoutingModule { }

export const routedComponents = [
  MarquesComponent,
  CreateMarqueComponent,
  MarqueListComponent
];
