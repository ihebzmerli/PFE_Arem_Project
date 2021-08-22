import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbListModule,NbRouteTabsetModule,NbStepperModule,NbProgressBarModule,NbTabsetModule,NbAccordionModule, NbActionsModule, NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbPopoverModule, NbRadioModule, NbSearchModule, NbSelectModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule } from '../forms/forms-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestPwdComponent } from './request-pwd.component';
// RECOMMENDED
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


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
import {DataViewModule} from 'primeng/dataview';
import {SelectButtonModule} from 'primeng/selectbutton';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { InputMaskModule } from "primeng/inputmask";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";

@NgModule({
  declarations: [
    RequestPwdComponent
  ],
  imports: [
    CommonModule,
    NbTreeGridModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbPopoverModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbListModule,
    Ng2SearchPipeModule,
    NbRadioModule,
    NbSearchModule,
    NbDatepickerModule,
    FormsRoutingModule,
    NbAlertModule,
    NbSelectModule,
    FormsModule,
    NbAccordionModule,
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
    DataViewModule,
    SelectButtonModule,
    NbProgressBarModule,
    FileUploadModule,
    HttpClientModule,
    NbDialogModule.forChild(),
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    InputMaskModule,
    CascadeSelectModule,
    InputTextareaModule,
    InputTextModule
  ]
})
export class RequestPwdModule { }
