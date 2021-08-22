import { Component } from '@angular/core';
import { TokenStorageService } from '../../auth/token-storage.service';
import { PagesComponent } from '../../pages.component';

@Component({
  selector: 'ngx-echarts-bon-Prep',
  styleUrls: ['./echarts.component.scss'],
  templateUrl: './echarts.component.html',
})
export class EchartsBonPrepComponent {

  constructor(private pagesComponent: PagesComponent,private authService: TokenStorageService) {}

  ngOnInit() {
    
  }
  
  currentYear: number = new Date().getFullYear();
}
