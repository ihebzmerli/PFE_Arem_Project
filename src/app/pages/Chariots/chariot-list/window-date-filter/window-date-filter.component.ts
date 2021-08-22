import { Component ,ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbWindowRef, NbDateService } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <form class="form">

  <div class="form-group">
  <input nbInput
  placeholder="Form Picker"
  [nbDatepicker]="dateTimePicker">
  <nb-datepicker #dateTimePicker></nb-datepicker>
  
  <input nbInput
  placeholder="Form Picker"
  [nbDatepicker]="formpickertest">
  <nb-datepicker #formpickertest></nb-datepicker>
</div>

<button class="btn btn-md btn-outline-warning">
<i class="fa fa-user"></i>Recherche</button>
</form>

  `,
  styleUrls: ['window-date-filter.component.scss'],
})
export class WindowDateFilterComponent {
  constructor(private authService: TokenStorageService,public windowRef: NbWindowRef,protected dateService: NbDateService<Date>) {}

  close() {
    this.windowRef.close();
  }
  ngOnInit() {
    
  }
}
