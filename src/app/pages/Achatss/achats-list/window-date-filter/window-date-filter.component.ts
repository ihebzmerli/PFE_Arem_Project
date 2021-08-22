import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef, NbDateService } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { Achats } from '../../Achats';
import { AchatsService } from '../../achats.service';

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
  FilterByDate:Achats[];
  @Output() notify : EventEmitter<Achats[]> = new EventEmitter<Achats[]>();

  constructor(private authService: TokenStorageService,private router: Router,private achatsService: AchatsService,public windowRef: NbWindowRef,protected dateService: NbDateService<Date>,public datepipe: DatePipe) {

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
    this.achatsService.getAllAchatBydateBetween(latest_startDate.toString(),latest_endDate.toString()).subscribe(data => {
      this.FilterByDate = data;
      console.log(data);
    });
    this.notify.emit(this.FilterByDate);
    this.currentMsgToParent = this.childMessage;
    this.windowRef.close();
  }

  gobackplz($myParam: string = ''): void {
    const navigationDetails: string[] = ['//pages/Achatss/achats-list'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }
}
