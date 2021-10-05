import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NbAccordionModule, NbProgressBarModule, NbWindowService } from '@nebular/theme';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, ArticleRoutingModule } from './article-routing.module';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule } from '../forms/forms-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleListComponent } from './article-list/article-list.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { SpecialMDialogComponent } from './article-list/window-special-M/special-m-dialog.component';
import { ResetArticleDialogComponent } from './article-list/reset-dialog/reset-article-dialog.component'
// RECOMMENDED
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
import {DataViewModule} from 'primeng/dataview';
import {SelectButtonModule} from 'primeng/selectbutton';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { EchartsArticleBarComponent } from './echarts-article/echarts-article-bar.component';
import { EchartsArticlePieComponent } from './echarts-article/echarts-article-pie.component';
import { EchartsArticleComponent } from './echarts-article/echarts.component';
import { UploadImgArticleDialogComponent } from './article-list/uploadImg/uploadImg-article-dialog.component';
import { AddModelDialogComponent } from './create-article/windowAjoutModel/add-model-dialog.component';
import { AddMarqueDialogComponent } from './create-article/windowAjoutMarque/add-marque-dialog.component';
import { ArticleService } from './article.service';
@NgModule({
  declarations: [
    ...routedComponents,
    ArticleListComponent,
    CreateArticleComponent,
    SpecialMDialogComponent,
    UpdateArticleComponent,
    ResetArticleDialogComponent,
    UploadImgArticleDialogComponent,
    AddModelDialogComponent,
    AddMarqueDialogComponent,
    EchartsArticleBarComponent,
    EchartsArticlePieComponent,
    EchartsArticleComponent
  ],
  imports: [
    CommonModule,
    NbTreeGridModule,
    ArticleRoutingModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    Ng2SearchPipeModule,
    NbRadioModule,
    NbDatepickerModule,
    FormsRoutingModule,
    NbSelectModule,
    FormsModule,
    NbAccordionModule,
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
    DataViewModule,
    SelectButtonModule,  
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbProgressBarModule,
    FileUploadModule,
    HttpClientModule,
    NbDialogModule.forChild(),
  ],
  providers: [DatePipe]
})
export class ArticleModule { }
