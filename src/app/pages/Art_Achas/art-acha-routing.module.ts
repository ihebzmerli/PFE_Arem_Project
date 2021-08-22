import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Art_AchasComponent } from './art-acha.component';

import { ArtAchaListComponent } from './art-acha-list/art-acha-list.component';
import { ArtAchaDetailComponent } from './art-acha-detail/art-acha-detail.component';

const routes: Routes = [{
  path: '',
  component: Art_AchasComponent,
  children: [
    {
      path: 'art-acha-list',
      component: ArtAchaListComponent,
    },
    {
      path: 'art-acha-detail',
      component: ArtAchaDetailComponent,
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
export class Art_AchaRoutingModule { }

export const routedComponents = [
  Art_AchasComponent
];
