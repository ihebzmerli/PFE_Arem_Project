import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  NbAccordionModule, NbDialogModule, NbListModule, NbProgressBarModule,
} from '@nebular/theme';
import { NbActionsModule, NbButtonModule, NbCardModule, NbAlertModule, NbPopoverModule, NbSearchModule , NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTreeGridModule,   NbStepperModule, NbUserModule } from '@nebular/theme';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, ExpideRoutingModule } from './expide-routing.module';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ThemeModule } from '../../@theme/theme.module';
import { CreateExpideComponent } from './create-expide/create-expide.component';
import { UpdateExpideComponent } from './update-expide/update-expide.component';
import { ExpideListComponent } from './expide-list/expide-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteExpideDialogComponent } from '../Expides/expide-list/delete-dialog/delete-expide-dialog.component';
import { WindowDateFilterComponent } from '../Expides/expide-list/window-date-filter/window-date-filter.component';
import { ExpideDetailComponent } from './expide-detail/expide-detail.component';
import { FormsRoutingModule } from '../forms/forms-routing.module';

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
import {InputTextModule} from 'primeng/inputtext';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { ChartjsExpideComponent } from './echarts-expide/chartjs.component';
import { ChartjsExpidePieComponent } from './echarts-expide/chartjs-expide-pie.component';
import { ChartjsExpideBarHorizontalComponent } from './echarts-expide/chartjs-expide-bar-horizontal.component';
import { ChartjsExpideBarComponent } from './echarts-expide/chartjs-expide-bar.component';
@NgModule({
  declarations: [
    ...routedComponents,
    CreateExpideComponent,
    ExpideListComponent,
    UpdateExpideComponent,
    DeleteExpideDialogComponent,
    WindowDateFilterComponent,
    ExpideDetailComponent,
    ChartjsExpideComponent,
    ChartjsExpidePieComponent,
    ChartjsExpideBarHorizontalComponent,
    ChartjsExpideBarComponent

  ],
  imports: [
    CommonModule,
    NbTreeGridModule,
    ExpideRoutingModule,
    Ng2SmartTableModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    NbStepperModule,
    FormsModule,
    NbSearchModule,
    NbSelectModule,
    NbUserModule,
    NbRadioModule,
    NbAccordionModule,
    Ng2SearchPipeModule,
    NbDatepickerModule,
    NbCheckboxModule,
    NbAlertModule,
    NbPopoverModule,
    NbButtonModule,
    NbActionsModule,
    FormsRoutingModule,
    ButtonModule,
    TableModule,
    DialogModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ProgressBarModule,
    PaginatorModule,
    OrderListModule,
    CheckboxModule,
    InputNumberModule,
    ReactiveFormsModule,
    NbListModule,
    InputTextModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbProgressBarModule,
    NbDialogModule.forChild(),
  ],
  providers: [DatePipe]
})
export class ExpideModule { }
