import { Component } from '@angular/core';
import { TokenStorageService } from '../../auth/token-storage.service';
import { PagesComponent } from '../../pages.component';
import { BonLivService } from '../bon-liv.service';

@Component({
  selector: 'ngx-echarts-bon-Liv',
  styleUrls: ['./echarts.component.scss'],
  templateUrl: './echarts.component.html',
})
export class EchartsBonLivComponent {

  constructor(private authService: TokenStorageService,private bonLivService: BonLivService) {
  }

  MaxChrono:String;
  MinChrono:String;
  Bon;
  chro;
  Bon1;
  chro1;

  currentDate: number = new Date().getDate();
  currentMonth: number = new Date().getMonth();

  currentYear: number = new Date().getFullYear();
  ngOnInit() {
    
    this.bonLivService.getMaxChrono().subscribe(data1 => {
      this.MaxChrono = data1.toString();
      this.Bon = this.MaxChrono.substring(0, this.MaxChrono.indexOf(",") - 1);
      this.chro = this.MaxChrono.substring(this.MaxChrono.indexOf(",") + 1,this.MaxChrono.length);
    })
      this.bonLivService.getMinChrono().subscribe(data2 => {
        this.MinChrono = data2.toString();
        this.Bon1 = this.MinChrono.substring(0, this.MinChrono.indexOf(",") - 1);
        this.chro1 = this.MinChrono.substring(this.MinChrono.indexOf(",") + 1,this.MinChrono.length);
    })
  }
}
