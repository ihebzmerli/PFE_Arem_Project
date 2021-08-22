import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbWindowRef, NbDateService } from '@nebular/theme';
import { title } from 'process';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { Article } from '../../article';
import { ArticleService } from '../../article.service';
import { ArticleListComponent } from '../article-list.component';

@Component({
  selector: 'window-date-filter-component',
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
export class WindowDateFilterComponent implements OnInit {
  FilterByDate:Article[];
  @Output() public notify : EventEmitter<Article[]> = new EventEmitter();
  @Input() title: string;
  constructor(private authService: TokenStorageService,private router: Router,private articleService: ArticleService,public windowRef: NbWindowRef,
    protected dateService: NbDateService<Date>,public datepipe: DatePipe,private _Activatedroute :ActivatedRoute) {

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
    console.log(this.title);
    if(this.title=='DAT_CREAT'){
        let latest_startDate =this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
        let latest_endDate =this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
        latest_startDate.toString();
        latest_endDate.toString();
        this.articleService.getAllArticleBydateBetweenDAT_CREAT(latest_startDate.toString(),latest_endDate.toString()).subscribe(data => {
          this.FilterByDate = data;
          console.log(data);
        });
        this.notify.emit(this.FilterByDate);
        this.currentMsgToParent = this.childMessage;
        this.windowRef.close();
      }
      else if(this.title=='DER_ACH'){
        let latest_startDate =this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
        let latest_endDate =this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
        latest_startDate.toString();
        latest_endDate.toString();
        this.articleService.getAllArticleBydateBetweenDER_ACH(latest_startDate.toString(),latest_endDate.toString()).subscribe(data => {
          this.FilterByDate = data;
          console.log(data);
        });
        this.notify.emit(this.FilterByDate);
        this.currentMsgToParent = this.childMessage;
        this.windowRef.close();
      }
      else if(this.title=='DER_MVT'){
        let latest_startDate =this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
        let latest_endDate =this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
        latest_startDate.toString();
        latest_endDate.toString();
        this.articleService.getAllArticleBydateBetweenDER_MVT(latest_startDate.toString(),latest_endDate.toString()).subscribe(data => {
          this.FilterByDate = data;
          console.log(data);
        });
        this.notify.emit(this.FilterByDate);
        this.currentMsgToParent = this.childMessage;
        this.windowRef.close();
      }
      else if(this.title=='DAT_RUP'){
        let latest_startDate =this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
        let latest_endDate =this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
        latest_startDate.toString();
        latest_endDate.toString();
        this.articleService.getAllArticleBydateBetweenDAT_RUP(latest_startDate.toString(),latest_endDate.toString()).subscribe(data => {
          this.FilterByDate = data;
          console.log(data);
        });
        this.notify.emit(this.FilterByDate);
        this.currentMsgToParent = this.childMessage;
        this.windowRef.close();
      }
      else if(this.title=='DAT_PACH'){
        let latest_startDate =this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
        let latest_endDate =this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
        latest_startDate.toString();
        latest_endDate.toString();
        this.articleService.getAllArticleBydateBetweenDAT_PACH(latest_startDate.toString(),latest_endDate.toString()).subscribe(data => {
          this.FilterByDate = data;
          console.log(data);
        });
        this.notify.emit(this.FilterByDate);
        this.currentMsgToParent = this.childMessage;
        this.windowRef.close();
      }

    }
}
