import { Component } from '@angular/core';
import { NbWindowRef, NbDateService } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';

@Component({
  template: `
    <form class="form">

    <button class="btn btn-md btn-outline-warning">
    <i class="fa fa-user"></i>Modifier XBASEs & XTVAs</button>
        <div class="form-group">
        <input nbInput
        placeholder="Form Picker"
        [nbDatepicker]="formpicker">
        <nb-datepicker #formpicker></nb-datepicker>
        
        <input nbInput
        placeholder="Form Picker"
        [nbDatepicker]="formpicker">
        <nb-datepicker #formpicker></nb-datepicker>
      </div>
      <div class="form-group">
        <button class="btn btn-md btn-outline-primary">
          <i class="fa fa-user"></i>Submit</button>  
      </div>
    </form>
  `,
  styleUrls: ['window-date-filter.component.scss'],
})
export class WindowDateFilterComponent {
  constructor(private authService: TokenStorageService,public windowRef: NbWindowRef,protected dateService: NbDateService<Date>) {}

  close() {
    
    this.windowRef.close();
  }
}
