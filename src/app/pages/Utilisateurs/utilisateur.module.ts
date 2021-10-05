import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbAccordionModule, NbActionsModule, NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbListModule, NbPopoverModule, NbProgressBarModule, NbRadioModule, NbSearchModule, NbSelectModule, NbTabsetModule, NbTooltipModule, NbTreeGridModule, NbUserModule, NbWindowModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, UtilisateurRoutingModule } from './utilisateur-routing.module';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ThemeModule } from '../../@theme/theme.module';
import { CreateUtilisateurComponent } from './create-utilisateur/create-utilisateur.component';
import { UpdateUtilisateurComponent } from './update-utilisateur/update-utilisateur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';
import { FormsRoutingModule } from '../forms/forms-routing.module';

// RECOMMENDED
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common'
import {ButtonModule} from 'primeng/button'
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {PaginatorModule} from 'primeng/paginator';
import {OrderListModule} from 'primeng/orderlist';
import {CheckboxModule} from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { InputTextModule } from 'primeng/inputtext';
import { ChartjsUtilisateurBar2Component } from './echarts-utilisateur/chartjs-utilisateur-bar2.component';
import { ChartjsUtilisateurComponent } from './echarts-utilisateur/chartjs.component';
import { ChartjsUtilisateurBarComponent } from './echarts-utilisateur/chartjs-utilisateur-bar.component';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import {CalendarModule} from 'primeng/calendar';
import { ShowPasswordDialogComponent } from './utilisateur-list/showPassword/show-password-dialog.component';
import { DeleteUtilisateurDialogComponent } from './utilisateur-list/delete-dialog/delete-utilisateur-dialog.component';

@NgModule({
  declarations: [
    ...routedComponents,
    CreateUtilisateurComponent,
    UtilisateurListComponent,
    UpdateUtilisateurComponent,
    DeleteUtilisateurDialogComponent,
    ChartjsUtilisateurBarComponent,
    ChartjsUtilisateurBar2Component,
    ChartjsUtilisateurComponent,
    ShowPasswordDialogComponent
  ],
  imports: [
    CommonModule,
    NbTreeGridModule,
    UtilisateurRoutingModule,
    Ng2SmartTableModule,
    ThemeModule,
    NbInputModule,
    Ng2SearchPipeModule,
    FormsModule,
    NbCardModule,
    NbIconModule,
    NbSelectModule,
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
    NbDatepickerModule,
    NbButtonModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbTabsetModule,
    NbTooltipModule,
    NbWindowModule,
    NbListModule,
    InputTextModule,
    CalendarModule,
    DataViewModule,
    SelectButtonModule,
    NbProgressBarModule,
    NbDialogModule.forChild(),
  ],
  providers: [DatePipe]
})
export class UtilisateurModule { }
