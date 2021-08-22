import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAccordionModule, NbAlertModule, NbPopoverModule, NbSearchModule } from '@nebular/theme';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule,NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, AffaireRoutingModule } from './affaire-routing.module';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule } from '../forms/forms-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AffaireListComponent } from './affaire-list/affaire-list.component';
import { AffairesDetailComponent } from './affaires-detail/affaires-detail.component';
import { WindowDateFilterComponent } from './affaire-list/window-date-filter/window-date-filter.component';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
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
import { EchartsAffaireComponent } from './echarts-affaire/echarts.component';
import { EchartsAffaireBarComponent } from './echarts-affaire/echarts-affaire-bar.component';
import { EchartsAffairePieComponent } from './echarts-affaire/echarts-affaire-pie.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [
    ...routedComponents,
    AffaireListComponent,
    AffairesDetailComponent,
    WindowDateFilterComponent,
    EchartsAffaireBarComponent,
    EchartsAffairePieComponent,
    EchartsAffaireComponent
  ],
  imports: [
    CommonModule,
    AffaireRoutingModule,
    NbTreeGridModule,
    Ng2SmartTableModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    Ng2SearchPipeModule,
    FormsRoutingModule,
    NbAlertModule,
    NbSelectModule,
    NbSearchModule,
    NbPopoverModule,
    FormsModule,
    NbAccordionModule,
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
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    ReactiveFormsModule,
    CheckboxModule,
		InputNumberModule,
    DataViewModule,
    SelectButtonModule,  
    NbDialogModule.forChild(),
  ]
})
export class AffaireModule { }
