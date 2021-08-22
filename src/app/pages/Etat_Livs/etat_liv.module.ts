import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbUserModule,NbSelectModule,NbRadioModule,NbDatepickerModule,NbCheckboxModule,NbButtonModule,NbActionsModule,NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbDialogModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, Etat_LivRoutingModule } from './etat_liv-routing.module';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ThemeModule } from '../../@theme/theme.module';
import { CreateEtatLivComponent } from './create-etat-liv/create-etat-liv.component';
import { UpdateEtatLivComponent } from './update-etat-liv/update-etat-liv.component';
import { EtatLivListComponent } from './etat-liv-list/etat-liv-list.component';
import { EtatLivDetailComponent } from './etat-liv-detail/etat-liv-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteEtatLivDialogComponent } from '../Etat_Livs/etat-liv-list/delete-dialog/delete-etat-liv-dialog.component';
import { NbAccordionModule, NbAlertModule, NbPopoverModule, NbSearchModule } from '@nebular/theme';

import { FormsRoutingModule } from '../forms/forms-routing.module';
import { NgxChronometerModule } from 'ngx-chronometer';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

import {ButtonModule} from 'primeng/button'
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';

import {PaginatorModule} from 'primeng/paginator';
import {OrderListModule} from 'primeng/orderlist';
import { ChartjsEtatlivMultipleXaxisComponent } from './echarts-etatliv/chartjs-etatliv-multiple-xaxis.component';
import { EchartsEtatlivComponent } from './echarts-etatliv/echarts.component';
@NgModule({
  declarations: [
    ...routedComponents,
    CreateEtatLivComponent,
    EtatLivListComponent,
    UpdateEtatLivComponent,
    DeleteEtatLivDialogComponent,
    EtatLivDetailComponent,
    ChartjsEtatlivMultipleXaxisComponent,
    EchartsEtatlivComponent
  ],
  imports: [
    CommonModule,
    NbTreeGridModule,
    NbRadioModule,
    NbUserModule,
    Etat_LivRoutingModule,
    NbButtonModule,
    NbActionsModule,
    NbCheckboxModule,
    Ng2SmartTableModule,
    NbSelectModule,
    NbDatepickerModule,
    ThemeModule,
    Ng2SearchPipeModule,
    NbInputModule,
    NbCardModule,
    FormsModule,
    NbIconModule,
    NbAccordionModule,
    NbAlertModule,
    NbPopoverModule,
    NbSearchModule,
    FormsRoutingModule,
    ButtonModule,
    TableModule,
    DialogModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    PaginatorModule,
    OrderListModule,
    ReactiveFormsModule,
    NgxChronometerModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbDialogModule.forChild(),
  ]
})
export class Etat_LivModule { }
