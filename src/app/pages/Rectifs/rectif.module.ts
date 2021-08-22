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
import { FsIconComponent } from './rectif-detail/rectif-detail.component';
import { RectifListComponent } from './rectif-list/rectif-list.component';
import { FormsModule } from '@angular/forms';
import { DeleteRectifDialogComponent } from '../Rectifs/rectif-list/delete-dialog/delete-rectif-dialog.component';
import { WindowDateFilterComponent } from './rectif-list/window-date-filter/window-date-filter.component';

@NgModule({
  declarations: [
    ...routedComponents,
    FsIconComponent,
    CreateRectifComponent,
    RectifListComponent,
    UpdateRectifComponent,
    DeleteRectifDialogComponent,
    WindowDateFilterComponent
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
