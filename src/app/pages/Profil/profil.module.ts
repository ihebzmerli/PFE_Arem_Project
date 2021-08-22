import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbAccordionModule, NbActionsModule, NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbListModule, NbPopoverModule, NbProgressBarModule, NbRadioModule, NbSearchModule, NbSelectModule, NbTabsetModule, NbTooltipModule, NbTreeGridModule, NbUserModule, NbWindowModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ProfilRoutingModule, routedComponents } from './profil-routing.module';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import {CalendarModule} from 'primeng/calendar';
import { UpdateProfilComponent } from './update-profil/update-profil.component';

@NgModule({
  declarations: [
    ...routedComponents,
    UpdateProfilComponent
  ],
  imports: [
    CommonModule,
    NbTreeGridModule,
    ProfilRoutingModule,
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
export class ProfilModule { }
