import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NbAccordionModule, NbActionsModule, NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbListModule, NbPopoverModule, NbProgressBarModule, NbRadioModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, PrimeRoutingModule } from './prime-routing.module';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ThemeModule } from '../../@theme/theme.module';
import { CreatePrimeComponent } from './create-prime/create-prime.component';
import { UpdatePrimeComponent } from './update-prime/update-prime.component';
import { PrimeListComponent } from './prime-list/prime-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeletePrimeDialogComponent } from '../Primes/prime-list/delete-dialog/delete-prime-dialog.component';
import { FormsRoutingModule } from '../forms/forms-routing.module';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { OrderListModule } from 'primeng/orderlist';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    ...routedComponents,
    CreatePrimeComponent,
    PrimeListComponent,
    UpdatePrimeComponent,
    DeletePrimeDialogComponent,
  ],
  imports: [
    CommonModule,
    NbTreeGridModule,
    NbButtonModule,
    PrimeRoutingModule,
    Ng2SmartTableModule,
    NbDatepickerModule,
    NbDialogModule,
    NbCheckboxModule,
    Ng2SearchPipeModule,
    ThemeModule,
    NbUserModule,
    ReactiveFormsModule,
    NbRadioModule, 
    NbSelectModule,
    NbInputModule,
    NbActionsModule,
    FormsModule,
    NbCardModule,
    NbIconModule, 
    NbListModule,
    NbTabsetModule,
    NbStepperModule,
    NbRouteTabsetModule,
    FormsRoutingModule,
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
    PaginatorModule,
    OrderListModule,
    CheckboxModule,
		InputNumberModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    InputTextModule,
    NbProgressBarModule,
 
  ],
  providers: [DatePipe]
})
export class PrimeModule { }
