import { Component } from '@angular/core';
import { TokenStorageService } from '../../auth/token-storage.service';
import { PagesComponent } from '../../pages.component';

@Component({
  selector: 'ngx-echarts-etatliv',
  styleUrls: ['./echarts.component.scss'],
  templateUrl: './echarts.component.html',
})
export class EchartsEtatlivComponent {

  constructor(private pagesComponent: PagesComponent,private authService: TokenStorageService) { }
  ngOnInit() {
  
  }
  currentDate: number = new Date().getDate();
  currentMonth: number = new Date().getMonth();

  currentYear: number = new Date().getFullYear();
}
