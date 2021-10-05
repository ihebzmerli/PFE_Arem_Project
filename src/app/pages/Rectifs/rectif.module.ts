import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, RectifRoutingModule } from './rectif-routing.module';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ThemeModule } from '../../@theme/theme.module';
import { CreateRectifComponent } from './create-rectif/create-rectif.component';
import { UpdateRectifComponent } from './update-rectif/update-rectif.component';
import { RectifListComponent } from './rectif-list/rectif-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteRectifDialogComponent } from '../Rectifs/rectif-list/delete-dialog/delete-rectif-dialog.component';

@NgModule({
  declarations: [
    ...routedComponents,
    CreateRectifComponent,
    RectifListComponent,
    UpdateRectifComponent,
    DeleteRectifDialogComponent,
  ],
  imports: [
    CommonModule,
    NbTreeGridModule,
    RectifRoutingModule,
    Ng2SmartTableModule,
    ThemeModule,
    NbActionsModule,
    NbCheckboxModule,
    Ng2SearchPipeModule,
    NbDatepickerModule,
    NbDialogModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbRadioModule, 
    NbSelectModule,
    NbInputModule,
    NbActionsModule,
    FormsModule,
    NbRadioModule, 
    NbUserModule,
    NbSelectModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
  ]
})
export class RectifModule { }
