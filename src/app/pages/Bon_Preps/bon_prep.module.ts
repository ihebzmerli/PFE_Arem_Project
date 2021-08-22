import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAccordionModule, NbDialogModule, NbProgressBarModule,
} from '@nebular/theme';
import { NbActionsModule, NbButtonModule, NbCardModule, NbAlertModule, NbPopoverModule, NbSearchModule , NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, Bon_PrepRoutingModule } from './bon_prep-routing.module';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ThemeModule } from '../../@theme/theme.module';
import { CreateBonPrepComponent } from './create-bon-prep/create-bon-prep.component';
import { UpdateBonPrepComponent } from './update-bon-prep/update-bon-prep.component';
import { BonPrepListComponent } from './bon-prep-list/bon-prep-list.component';
import { FormsRoutingModule } from '../forms/forms-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteBonPrepDialogComponent } from './bon-prep-list/delete-dialog/delete-bon-prep-dialog.component';
import { WindowDateFilterComponent } from './bon-prep-list/window-date-filter/window-date-filter.component';
import { WindowTypeStockComponent } from './create-bon-prep/window-type-stock/window-type-stock.component';
import { XbaseXtvaDialogComponent } from './bon-prep-list/window-xbase&tva/xbase&xtva-dialog.component';
import { BonPrepDetailComponent } from './bon-prep-detail/bon-prep-detail.component';
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
import { InputTextModule } from 'primeng/inputtext';
import { EchartsBonPrepComponent } from './echarts-bon-prep/echarts.component';
import { EchartsBonPrepBarComponent } from './echarts-bon-prep/echarts-bon-prep-bar.component';
import { EchartsBonPrepPieComponent } from './echarts-bon-prep/echarts-bon-prep-pie.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { ChartjsBonPrepBarHorizontalComponent } from './echarts-bon-prep/chartjs-bon-prep-bar-horizontal.component';

@NgModule({
  declarations: [
    ...routedComponents,
    CreateBonPrepComponent,
    BonPrepListComponent,
    UpdateBonPrepComponent,
    DeleteBonPrepDialogComponent,
    WindowDateFilterComponent,
    WindowTypeStockComponent,
    XbaseXtvaDialogComponent,
    BonPrepDetailComponent,
    EchartsBonPrepBarComponent,
    EchartsBonPrepPieComponent,
    EchartsBonPrepComponent,
    ChartjsBonPrepBarHorizontalComponent
  ],
  imports: [
    CommonModule,
    NbTreeGridModule,
    Bon_PrepRoutingModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    FormsModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    FormsRoutingModule,
    NbSelectModule,
    NbAccordionModule,
    Ng2SearchPipeModule,
    NbCardModule,
    NbPopoverModule,
    NbSearchModule,
    NbIconModule,
    NbAlertModule,
    ThemeModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    SliderModule,
    ButtonModule,
    MultiSelectModule,
    InputTextModule,
    ContextMenuModule,
    DropdownModule,
    ProgressBarModule,
    PaginatorModule,
    OrderListModule,
    CheckboxModule,
    NbDialogModule,
		InputNumberModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbProgressBarModule,
    NbDialogModule.forChild(),
  ],
  providers: [DatePipe]
})
export class Bon_PrepModule { }
