import { Component } from '@angular/core';
import { TokenStorageService } from '../../auth/token-storage.service';
import { PagesComponent } from '../../pages.component';

@Component({
  selector: 'ngx-chartjs-livreur',
  styleUrls: ['./chartjs.component.scss'],
  templateUrl: './chartjs.component.html',
})
export class ChartjsLivreurComponent {
    
  constructor(private pagesComponent: PagesComponent,private authService: TokenStorageService) { }
  
  ngOnInit() {
  
  }

  currentDate: number = new Date().getDate();
  currentMonth: number = new Date().getMonth()+1;

  currentYear: number = new Date().getFullYear();
}
