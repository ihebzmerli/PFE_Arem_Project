import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NbAccordionModule, NbAlertModule, NbPopoverModule, NbProgressBarModule, NbSearchModule } from '@nebular/theme';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule,NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, Bon_SortRoutingModule } from './bon_sort-routing.module';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ThemeModule } from '../../@theme/theme.module';
import { CreateBonSortComponent } from './create-bon-sort/create-bon-sort.component';
import { UpdateBonSortComponent } from './update-bon-sort/update-bon-sort.component';
import { BonSortListComponent } from './bon-sort-list/bon-sort-list.component';
import { FormsRoutingModule } from '../forms/forms-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteBonSortDialogComponent } from './bon-sort-list/delete-dialog/delete-bon-sort-dialog.component';
import { XbaseXtvaDialogComponent } from './bon-sort-list/window-xbase&tva/xbase&xtva-dialog.component';
import { WindowTypeStockComponent } from './create-bon-sort/window-type-stock/window-type-stock.component';
import { BonSortDetailComponent } from './bon-sort-detail/bon-sort-detail.component';
// primering module
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
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartModule } from 'angular2-chartjs';
import { BonSortService } from './bon-sort.service';



@NgModule({
  declarations: [
    ...routedComponents,
    CreateBonSortComponent,
    BonSortListComponent,
    BonSortDetailComponent,
    UpdateBonSortComponent,
    XbaseXtvaDialogComponent,
    DeleteBonSortDialogComponent,
    WindowTypeStockComponent
  ],
  imports: [
    CommonModule,
    NbTreeGridModule,
    Bon_SortRoutingModule,
    Ng2SmartTableModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    FormsModule,
    NbCheckboxModule,
    NbRadioModule,
    NbAccordionModule,
    NbDatepickerModule,
    FormsRoutingModule,
    Ng2SearchPipeModule,
    NbSelectModule,
    NbIconModule,
    ReactiveFormsModule,
    NbPopoverModule,
    NbSearchModule,
    NbAlertModule,
    TableModule,
    DialogModule,
    SliderModule,
    ButtonModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    PaginatorModule,
    OrderListModule,
    NbProgressBarModule,
    NbDialogModule.forChild(),
    CheckboxModule,
		InputNumberModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
  ],
  providers: [DatePipe]
})
export class Bon_SortModule { }
