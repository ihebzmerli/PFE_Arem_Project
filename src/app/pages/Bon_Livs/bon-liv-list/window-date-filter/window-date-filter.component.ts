import { DatePipe } from '@angular/common';
import { Component ,ChangeDetectionStrategy, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbWindowRef, NbDateService } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';

import { Bon_liv } from '../../bon-liv';
import { BonLivService } from '../../bon-liv.service';

@Component({
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
  FilterByDate:Bon_liv[];
  @Output() notify : EventEmitter<Bon_liv[]> = new EventEmitter<Bon_liv[]>();

  constructor(private authService: TokenStorageService,private router: Router,private bonlivService: BonLivService,public windowRef: NbWindowRef,
    protected dateService: NbDateService<Date>,public datepipe: DatePipe) {

  }
  startDate;
  endDate;

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
    this.bonlivService.getAllBonLivBydateBetween(latest_startDate.toString(),latest_endDate.toString()).subscribe(data => {
      this.FilterByDate = data;
      console.log(data);
    });
    this.notify.emit(this.FilterByDate)
    console.log(this.notify.emit(this.FilterByDate));

    this.windowRef.close();
//    window.location.reload();
  }

  gobackplz($myParam: string = ''): void {
    const navigationDetails: string[] = ['//pages/Bon_Livs/bon-liv-list'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }
}
