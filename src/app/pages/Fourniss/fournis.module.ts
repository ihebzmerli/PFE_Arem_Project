import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbUserModule,NbSelectModule,NbRadioModule,NbDatepickerModule,NbCheckboxModule,NbButtonModule,NbActionsModule,NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbDialogModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, FournisRoutingModule } from './fournis-routing.module';

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ThemeModule } from '../../@theme/theme.module';

import { FormsModule } from '@angular/forms';
import { FournisListComponent } from './fournis-list/fournis-list.component';
import { FournisDetailComponent } from './fournis-detail/fournis-detail.component';
import {GMapModule} from 'primeng/gmap';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';

import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
@NgModule({
  declarations: [
    ...routedComponents,
    FournisListComponent,
    FournisDetailComponent
  ],
  imports: [
    CommonModule,
    NbTreeGridModule,
    FournisRoutingModule,
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
    GMapModule,
    ToastModule,
    DialogModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    TabViewModule,
    NbDialogModule.forChild(),
  ]
})
export class FournisModule { }
