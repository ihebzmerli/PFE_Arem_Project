import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Det_PrepsComponent } from './det_prep.component';
import { DetPrepListComponent } from './det-prep-list/det-prep-list.component';
import { CreateDetPrepComponent } from './create-det-prep/create-det-prep.component';
import { UpdateDetPrepComponent } from './update-det-prep/update-det-prep.component';
import { DetPrepDetailComponent } from './det-prep-detail/det-prep-detail.component';

const routes: Routes = [{
  path: '',
  component: Det_PrepsComponent,
  children: [
    {
      path: 'det-prep-list',
      component: DetPrepListComponent,
    },
    {
      path: 'create-det-prep',
      component: CreateDetPrepComponent,
    },
    {
      path: 'update-det-prep',
      component: UpdateDetPrepComponent,
    },
    {
      path: 'det-prep-detail',
      component: DetPrepDetailComponent,
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
export class Det_PrepRoutingModule { }

export const routedComponents = [
  Det_PrepsComponent,
  DetPrepListComponent,
  CreateDetPrepComponent,
  UpdateDetPrepComponent,
  DetPrepDetailComponent,
];
