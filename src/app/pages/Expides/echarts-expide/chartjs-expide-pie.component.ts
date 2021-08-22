import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ExpideService } from '../expide.service';

@Component({
  selector: 'ngx-chartjs-expide-pie',
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsExpidePieComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  SumT1:Number;
  SumT2:Number;
  constructor(private expideService: ExpideService,private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.expideService.getSumT1().subscribe(data1 => {
        this.SumT1 = Number(data1);
        console.log(data1);
        this.expideService.getSumT2().subscribe(data2 => {
          this.SumT2 = Number(data2);
          console.log(data2);
            
      this.data = {
        labels: ['livraison_voiture', 'sur_comptoir'],
        datasets: [{
          data: [this.SumT1, this.SumT2],
          backgroundColor: [colors.infoLight, colors.dangerLight],
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
}
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
