import { Component } from '@angular/core';
import { TokenStorageService } from '../../auth/token-storage.service';
import { PagesComponent } from '../../pages.component';

@Component({
  selector: 'ngx-chartjs-expide',
  styleUrls: ['./chartjs.component.scss'],
  templateUrl: './chartjs.component.html',
})
export class ChartjsExpideComponent {
  
  constructor(private pagesComponent: PagesComponent,private authService: TokenStorageService) { }
  ngOnInit() {
  
  }
  currentDate: number = new Date().getDate();
  currentMonth: number = new Date().getMonth();

  currentYear: number = new Date().getFullYear();
}
