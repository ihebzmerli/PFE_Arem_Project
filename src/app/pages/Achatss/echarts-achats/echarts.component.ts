import { Component } from '@angular/core';
import { PagesComponent } from '../../pages.component';

@Component({
  selector: 'ngx-echarts-achats',
  styleUrls: ['./echarts.component.scss'],
  templateUrl: './echarts.component.html',
})
export class EchartsAchatsComponent {
  constructor(private pagesComponent: PagesComponent) {

  }

  ngOnInit() {
    
  }
  currentDate: number = new Date().getDate();
  currentMonth: number = new Date().getMonth();

  currentYear: number = new Date().getFullYear();
}
