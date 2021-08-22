import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LivreurService } from '../livreur.service';

@Component({
  selector: 'ngx-chartjs-livreur-pie',
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsLivreurPieComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  SumL1:Number;
  SumL2:Number;
  SumL3:Number;
  constructor(private livreurService: LivreurService,private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.livreurService.getSumL1().subscribe(data1 => {
        this.SumL1 = Number(data1);
        console.log(data1);
        this.livreurService.getSumL2().subscribe(data2 => {
          this.SumL2 = Number(data2);
          console.log(data2);
          this.livreurService.getSumL3().subscribe(data3 => {
            this.SumL3 = Number(data3);
            console.log(data3);
            
      this.data = {
        labels: ['N est pas present', 'En mission', 'En attend'],
        datasets: [{
          data: [this.SumL1, this.SumL2, this.SumL3],
          backgroundColor: [colors.dangerLight, colors.infoLight, colors.successLight],
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  });
});
});
}
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
