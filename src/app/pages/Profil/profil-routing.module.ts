import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProfilComponent } from './update-profil/update-profil.component';
import { ProfilComponent } from './profil.component';

const routes: Routes = [{
  path: '',
  component: ProfilComponent,
  children: [
    {
      path: 'update-profil/:id',
      component: UpdateProfilComponent,
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
export class ProfilRoutingModule { }

export const routedComponents = [
  ProfilComponent,
  UpdateProfilComponent,
];
