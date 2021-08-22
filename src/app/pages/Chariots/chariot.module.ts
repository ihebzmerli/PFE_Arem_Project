import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAccordionModule, NbDialogModule, NbListModule, NbProgressBarModule, NbTabsetModule, NbTooltipModule, NbWindowModule,
} from '@nebular/theme';
import { NbActionsModule, NbButtonModule, NbCardModule, NbAlertModule, NbPopoverModule, NbSearchModule , NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, ChariotRoutingModule } from '../Chariots/chariot-routing.module';

import { ThemeModule } from '../../@theme/theme.module';
import { CreateChariotComponent } from './create-chariot/create-chariot.component';
import { ChariotListComponent } from './chariot-list/chariot-list.component';
import { UpdateChariotComponent } from './update-chariot/update-chariot.component';
import { ChariotDetailComponent } from './chariot-detail/chariot-detail.component';
import { FormsRoutingModule } from '../forms/forms-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteChariotDialogComponent } from '../Chariots/chariot-list/delete-dialog/delete-chariot-dialog.component';
import { WindowDateFilterComponent } from '../Chariots/chariot-list/window-date-filter/window-date-filter.component';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
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
import { ChartjsChariotPieComponent } from './echarts-chariot/chartjs-chariot-pie.component';
import { InputTextModule } from 'primeng/inputtext';
import { ChartjsChariotComponent } from './echarts-chariot/chartjs.component';
import { PointageChariotDialogComponent } from './chariot-list/poitageChariot-dialog/pointage-chariot-dialog.component';
import { RetourServiceChariotDialogComponent } from './chariot-list/RetourServiceChariot-dialog/retour-service-chariot-dialog.component';
@NgModule({
  declarations: [
    ...routedComponents,
    CreateChariotComponent,
    ChariotListComponent,
    UpdateChariotComponent,
    ChariotDetailComponent,
    DeleteChariotDialogComponent,
    WindowDateFilterComponent,
    PointageChariotDialogComponent,
    RetourServiceChariotDialogComponent,
    ChartjsChariotPieComponent,
    ChartjsChariotComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbTreeGridModule,
    NbAlertModule,
    NbInputModule,
    ChariotRoutingModule,
    Ng2SmartTableModule,
    ThemeModule,
    NbButtonModule,
    NbPopoverModule,
    NbSearchModule,
    NbActionsModule,
    FormsModule,
    NbUserModule,
    NbAccordionModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    FormsRoutingModule,
    Ng2SearchPipeModule,
    NbSelectModule,
    NbIconModule,
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
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbTabsetModule,
    NbTooltipModule,
    NbWindowModule,
    NbListModule,
    InputTextModule,
    NbProgressBarModule,
    NbDialogModule.forChild(),


  ]
})
export class ChariotModule { }
