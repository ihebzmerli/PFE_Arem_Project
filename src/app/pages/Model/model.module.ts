import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbListModule,NbRouteTabsetModule,NbStepperModule,NbTabsetModule,NbAccordionModule, NbActionsModule, NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbPopoverModule, NbRadioModule, NbSearchModule, NbSelectModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, ModelRoutingModule } from './model-routing.module';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ThemeModule } from '../../@theme/theme.module';
import { CreateModelComponent } from './create-model/create-model.component';
import { UpdateModelComponent } from './update-model/update-model.component';
import { ModelListComponent } from './model-list/model-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModelDialogComponent } from './model-list/delete-dialog/delete-model-dialog.component';
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
import { FormsRoutingModule } from '../forms/forms-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  declarations: [
    ...routedComponents,
    CreateModelComponent,
    ModelListComponent,
    UpdateModelComponent,
    DeleteModelDialogComponent,
  ],
  imports: [
    CommonModule,
    NbTreeGridModule,
    ModelRoutingModule,
    Ng2SmartTableModule,
    ThemeModule,
    NbActionsModule,
    NbListModule,
    NbTabsetModule,
    NbStepperModule,
    NbRouteTabsetModule,
    NbUserModule,
    NbButtonModule,
    Ng2SearchPipeModule,
    NbDatepickerModule,
    NbCheckboxModule,
    FormsModule,
    NbSelectModule,
    NbRadioModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    FormsRoutingModule,
    NbAccordionModule,
    NbPopoverModule,
    NbSearchModule,
    NbAlertModule,
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
    NbDialogModule.forChild(),
  ]
})
export class ModelModule { }
