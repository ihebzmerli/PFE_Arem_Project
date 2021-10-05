import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAccordionModule, NbAlertModule, NbPopoverModule, NbSearchModule,NbListModule, NbTabsetModule,NbTooltipModule,NbWindowModule } from '@nebular/theme';
import { NbActionsModule, NbProgressBarModule,NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, Bon_LivRoutingModule } from './bon_liv-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { CreateBonLivComponent } from './create-bon-liv/create-bon-liv.component';
import { UpdateBonLivComponent } from './update-bon-liv/update-bon-liv.component';
import { BonLivListComponent } from './bon-liv-list/bon-liv-list.component';
import { FormsRoutingModule } from '../forms/forms-routing.module';
import { DeleteBonLivDialogComponent } from './bon-liv-list/delete-dialog/delete-bon-liv-dialog.component';
import { XbaseXtvaDialogComponent } from './bon-liv-list/window-xbase&tva/xbase&xtva-dialog.component';
import { BonLivDetailComponent } from './bon-liv-detail/bon-liv-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowcaseDialogComponent } from './create-bon-liv/showcase-dialog/showcase-dialog.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
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
import { EchartsBonLivComponent } from './echarts-bon-liv/echarts.component';
import { EchartsBonLivPieComponent } from './echarts-bon-liv/echarts-bon-liv-pie.component';
import { EchartsBonLivBarComponent } from './echarts-bon-liv/echarts-bon-liv-bar.component';
import { EchartsFournisBarComponent } from './echarts-bon-liv/echarts-fournis-bar.component';
import { EchartsClientBarComponent } from './echarts-bon-liv/echarts-client-bar.component';
import { BonLivService } from './bon-liv.service';
@NgModule({
  declarations: [
    ...routedComponents,
    CreateBonLivComponent,
    BonLivListComponent,
    UpdateBonLivComponent,
    DeleteBonLivDialogComponent,
    XbaseXtvaDialogComponent,
    BonLivDetailComponent,
    ShowcaseDialogComponent,
    EchartsBonLivBarComponent,
    EchartsBonLivPieComponent,
    EchartsBonLivComponent,
    EchartsFournisBarComponent,
    EchartsClientBarComponent
  ],
  imports: [
    NbTreeGridModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    Bon_LivRoutingModule,
    Ng2SmartTableModule,
    ThemeModule,
    CommonModule,
    NbInputModule,
    NbCardModule,
    NbTabsetModule,
    NbTooltipModule,
    NbWindowModule,
    NbIconModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbListModule,
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
    NbProgressBarModule,
    NbDialogModule.forChild(),
  ]
})
export class Bon_LivModule { }
