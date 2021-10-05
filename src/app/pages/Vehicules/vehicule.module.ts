import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { NbUserModule,NbSelectModule,NbRadioModule,NbDatepickerModule,NbCheckboxModule,NbButtonModule,NbActionsModule,NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbAccordionModule, NbProgressBarModule, NbDialogModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, VehiculeRoutingModule } from './vehicule-routing.module';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ThemeModule } from '../../@theme/theme.module';
import { CreateVehiculeComponent } from './create-vehicule/create-vehicule.component';
import { VehiculeDetailComponent } from './vehicule-detail/vehicule-detail.component';
import { UpdateVehiculeComponent } from './update-vehicule/update-vehicule.component';
import { VehiculeListComponent } from './vehicule-list/vehicule-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteVehiculeDialogComponent } from '../Vehicules/vehicule-list/delete-dialog/delete-vehicule-dialog.component';



// RECOMMENDED
import {ColorPickerModule} from 'primeng/colorpicker';
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
import { InputTextModule } from 'primeng/inputtext';
import { FormsRoutingModule } from '../forms/forms-routing.module';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DataViewModule } from 'primeng/dataview';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    ...routedComponents,
    CreateVehiculeComponent,
    VehiculeListComponent,
    UpdateVehiculeComponent,
    VehiculeDetailComponent,
    DeleteVehiculeDialogComponent
  ],
  imports: [
    CommonModule,
    NbTreeGridModule,
    VehiculeRoutingModule,
    Ng2SmartTableModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    Ng2SearchPipeModule,
    FormsModule,
    NbSelectModule,
    NbUserModule,
    NbRadioModule,
    NbDatepickerModule,
    NbCheckboxModule,
    NbButtonModule,
    NbActionsModule,
    ColorPickerModule,
    CheckboxModule,
    ProgressBarModule,
    SliderModule,
    InputNumberModule,
    InputTextModule,
    OrderListModule,
    PaginatorModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    TableModule,
    BsDatepickerModule,
    ContextMenuModule,
    MultiSelectModule,
    ReactiveFormsModule,
    FormsRoutingModule,
    NbAccordionModule,
    DataViewModule,
    SelectButtonModule,  
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbProgressBarModule,
    HttpClientModule,
    NbDialogModule.forChild(),
  ]
})
export class VehiculeModule { }
