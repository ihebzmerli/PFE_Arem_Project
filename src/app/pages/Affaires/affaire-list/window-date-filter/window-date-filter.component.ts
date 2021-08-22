import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NbWindowRef, NbDateService } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { Affaire } from '../../affaire';
import { AffaireService } from '../../affaire.service';

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
  FilterByDate:Affaire[];
  @Output() notify : EventEmitter<Affaire[]> = new EventEmitter<Affaire[]>();

  constructor(private authService: TokenStorageService,private achatsService: AffaireService,public windowRef: NbWindowRef,protected dateService: NbDateService<Date>,public datepipe: DatePipe) {

  }
  startDate;
  endDate;
  childMessage;
  currentMsgToParent;
  close() {
    this.windowRef.close();
  }
  message;
  ngOnInit() {
    
  }

  FilterDate(startDate :any,endDate :any){
    let latest_startDate =this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
    let latest_endDate =this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
    latest_startDate.toString();
    latest_endDate.toString();
    this.achatsService.getAllAffaireBydateBetween(latest_startDate.toString(),latest_endDate.toString()).subscribe(data => {
      this.FilterByDate = data;
      console.log(data);
    });
    this.notify.emit(this.FilterByDate);
    this.currentMsgToParent = this.childMessage;
    this.windowRef.close();
  }
}
