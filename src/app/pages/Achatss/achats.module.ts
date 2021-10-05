import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, AchatsRoutingModule } from './achats-routing.module';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule } from '../forms/forms-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AchatsListComponent } from './achats-list/achats-list.component';
import { AchatsDetailComponent } from './achats-detail/achats-detail.component';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ValiderAchatsDialogComponent } from './achats-list/valider-dialog/valider-achats-dialog.component';
import { NotValiderAchatsDialogComponent } from './achats-list/Notvalider-dialog/notValider-achats-dialog.component';
import { NbAccordionModule, NbAlertModule, NbPopoverModule, NbSearchModule } from '@nebular/theme';
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
import { EchartsAchatsComponent } from './echarts-achats/echarts.component';
import { EchartsAchatsPieComponent } from './echarts-achats/echarts-achats-pie.component';
import { EchartsAchatsBarComponent } from './echarts-achats/echarts-achats-bar.component';
import { EchartsAchatsPretPieComponent } from './echarts-achats/echarts-achatsPret-pie.component';
import { AchatsService } from './achats.service';
@NgModule({
  declarations: [
    ...routedComponents,
    AchatsListComponent,
    AchatsDetailComponent,
    ValiderAchatsDialogComponent,
    NotValiderAchatsDialogComponent,
    EchartsAchatsBarComponent,
    EchartsAchatsPieComponent,
    EchartsAchatsPretPieComponent,
    EchartsAchatsComponent
  ],
  imports: [
    CommonModule,
    AchatsRoutingModule,
    NbTreeGridModule,
    Ng2SmartTableModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    Ng2SearchPipeModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    FormsRoutingModule,
    NbSelectModule,
    FormsModule,
    NbAccordionModule,
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
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbDialogModule.forChild(),

  ],
  providers: [DatePipe]
})
export class AchatsModule { }
