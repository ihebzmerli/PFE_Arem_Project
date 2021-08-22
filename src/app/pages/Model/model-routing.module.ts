import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ModelsComponent } from './model.component';
import { ModelListComponent } from './model-list/model-list.component';
import { CreateModelComponent } from './create-model/create-model.component';
import { UpdateModelComponent } from './update-model/update-model.component';
import { AuthGuardAdmin } from '../../auth-guardRoles/auth-guardAdmin';
import { AllGuard } from '../../auth-guardRoles/auth-guardModules.ts/AllGuard';
import { AuthGuardTransitaire } from '../../auth-guardRoles/auth-guardTransitaire';

const routes: Routes = [{
  path: '',
  component: ModelsComponent,
  children: [
    {
      path: 'model-list/:marque_id',
      component: ModelListComponent,
    },
    {
      path: 'model-list',
      component: ModelListComponent,
    },
    {
      path: 'create-model',
      data: {guards: [ AuthGuardAdmin , AuthGuardTransitaire ]}, canActivate: [AllGuard],
      component: CreateModelComponent,
    },
    {
      path: 'update-model/:id',
      data: {guards: [ AuthGuardAdmin , AuthGuardTransitaire ]}, canActivate: [AllGuard],
      component: UpdateModelComponent,
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
export class ModelRoutingModule { }

export const routedComponents = [
  ModelsComponent,
  ModelListComponent,
  CreateModelComponent,
  UpdateModelComponent,
];
