import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbUserModule,NbSelectModule,NbRadioModule,NbDatepickerModule,NbCheckboxModule,NbButtonModule,NbActionsModule,NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbDialogModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, Det_PrepRoutingModule } from './det_prep-routing.module';

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ThemeModule } from '../../@theme/theme.module';
import { CreateDetPrepComponent } from './create-det-prep/create-det-prep.component';
import { UpdateDetPrepComponent } from './update-det-prep/update-det-prep.component';
import { FsIconComponent } from './det-prep-detail/det-prep-detail.component';
import { DetPrepListComponent } from './det-prep-list/det-prep-list.component';
import { FormsModule } from '@angular/forms';
import { DeleteDetPrepDialogComponent } from './det-prep-list/delete-dialog/delete-det-prep-dialog.component';


@NgModule({
  declarations: [
    ...routedComponents,
    FsIconComponent,
    CreateDetPrepComponent,
    DetPrepListComponent,
    UpdateDetPrepComponent,
    DeleteDetPrepDialogComponent,
  ],
  imports: [
    CommonModule,
    NbTreeGridModule,
    Det_PrepRoutingModule,
    Ng2SmartTableModule,
    ThemeModule,
    NbInputModule,
    NbUserModule,
    NbDatepickerModule,
    NbCheckboxModule,
    NbRadioModule,
    NbActionsModule,
    NbButtonModule,
    Ng2SearchPipeModule,
    NbSelectModule,
    NbCardModule,
    NbIconModule,
    FormsModule,
    NbDialogModule.forChild(),
  ]
})
export class Det_PrepModule { }
