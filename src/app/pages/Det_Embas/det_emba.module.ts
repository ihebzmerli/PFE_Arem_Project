import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbUserModule,NbSelectModule,NbRadioModule,NbDatepickerModule,NbCheckboxModule,NbButtonModule,NbActionsModule,NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbDialogModule, NbAlertModule, NbPopoverModule, NbSearchModule, NbAccordionModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, Det_EmbaRoutingModule } from './det_emba-routing.module';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ThemeModule } from '../../@theme/theme.module';
import { CreateDetEmbaComponent } from './create-det-emba/create-det-emba.component';
import { UpdateDetEmbaComponent } from './update-det-emba/update-det-emba.component';
import { FsIconComponent } from './det-emba-detail/det-emba-detail.component';
import { DetEmbaListComponent } from './det-emba-list/det-emba-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteDetEmbaDialogComponent } from '../Det_Embas/det-emba-list/delete-dialog/delete-det-emba-dialog.component';
import { FormsRoutingModule } from '../forms/forms-routing.module';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ProgressBarModule } from 'primeng/progressbar';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { OrderListModule } from 'primeng/orderlist';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    ...routedComponents,
    FsIconComponent,
    CreateDetEmbaComponent,
    DetEmbaListComponent,
    UpdateDetEmbaComponent,
    DeleteDetEmbaDialogComponent,
  ],
  imports: [
    CommonModule,
    NbTreeGridModule,
    Det_EmbaRoutingModule,
    Ng2SmartTableModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    FormsModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbCheckboxModule,
    Ng2SearchPipeModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbAlertModule,
    NbPopoverModule,
    NbSearchModule,
    NbAccordionModule,
    FormsRoutingModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    SliderModule,
    ButtonModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ProgressBarModule,
    PaginatorModule,
    OrderListModule,
    CheckboxModule,
		InputNumberModule,
    NbDialogModule.forChild(),
  ]
})
export class Det_EmbaModule { }
