import { DatePipe } from '@angular/common';
import { Component ,ChangeDetectionStrategy, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbWindowRef, NbDateService } from '@nebular/theme';

import { Expide } from '../../expide';
import { ExpideService } from '../../expide.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <form class="form">

  <div class="form-group">
    <div>
      <label class="label">Date Debut: </label>
      <input nbInput
      placeholder="Form Picker"
      [(ngModel)]="startDate"
      [nbDatepicker]="dateTimePicker" [ngModelOptions]="{standalone: true}">
      <nb-datepicker #dateTimePicker></nb-datepicker>
    </div>
    <div>
      <label class="label">Date Fin: </label>
      <input nbInput
      placeholder="Form Picker"
      [(ngModel)]="endDate"
      [nbDatepicker]="formpickertest" [ngModelOptions]="{standalone: true}">
      <nb-datepicker #formpickertest></nb-datepicker>
    </div>
</div>

<button (click)="FilterDate(startDate,endDate)" class="btn btn-md btn-outline-warning">Recherche</button>
</form>

  `,
  styleUrls: ['window-date-filter.component.scss'],
})
export class WindowDateFilterComponent implements OnInit{
  FilterByDate:Expide[];
  @Output() notify : EventEmitter<Expide[]> = new EventEmitter<Expide[]>();

  constructor(private expideService: ExpideService,public windowRef: NbWindowRef,protected dateService: NbDateService<Date>,public datepipe: DatePipe) {

  }
  startDate;
  endDate;
  childMessage: Expide[];
  currentMsgToParent: Expide[];
  close() {
    this.windowRef.close();
  }

  ngOnInit() {
  }

  FilterDate(startDate :any,endDate :any){
    let latest_startDate =this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
    let latest_endDate =this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
    latest_startDate.toString();
    latest_endDate.toString();
    this.expideService.getAllExpideBydateEXBetween(latest_startDate.toString(),latest_endDate.toString()).subscribe(data => {
      this.FilterByDate = data;
      console.log(data);
    });
    this.notify.emit(this.FilterByDate)
    this.currentMsgToParent = this.FilterByDate;
    console.log(this.currentMsgToParent);
    this.windowRef.close();
  }
  
}
