import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAccordionModule } from '@nebular/theme';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, Art_AchaRoutingModule } from './art-acha-routing.module';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule } from '../forms/forms-routing.module';
import { FormsModule } from '@angular/forms';
import { ArtAchaDetailComponent } from './art-acha-detail/art-acha-detail.component';
import { ArtAchaListComponent } from './art-acha-list/art-acha-list.component';
import { WindowDateFilterComponent } from './art-acha-list/window-date-filter/window-date-filter.component';

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    ...routedComponents,
    ArtAchaDetailComponent,
    ArtAchaListComponent,
    WindowDateFilterComponent,
  ],
  imports: [
    Art_AchaRoutingModule,
    CommonModule,
    NbTreeGridModule,
    Ng2SmartTableModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    Ng2SearchPipeModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    FormsRoutingModule,
    NbSelectModule,
    FormsModule,
    NbAccordionModule,
    NbDialogModule.forChild(),
  ]
})
export class Art_AchaModule { }
