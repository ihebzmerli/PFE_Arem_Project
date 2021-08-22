import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ChariotService } from '../chariot.service';

@Component({
  selector: 'ngx-chartjs-chariot-pie',
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsChariotPieComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  SumCha1:Number;
  SumCha2:Number;
  SumCha3:Number;
  constructor(private chariotService: ChariotService,private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.chariotService.getSumCha1().subscribe(data1 => {
        this.SumCha1 = Number(data1);
        console.log(data1);
        this.chariotService.getSumCha2().subscribe(data2 => {
          this.SumCha2 = Number(data2);
          console.log(data2);
          this.chariotService.getSumCha3().subscribe(data3 => {
            this.SumCha3 = Number(data3);
            console.log(data3);
            
      this.data = {
        labels: ['en_attente', 'en_panne', 'occuper'],
        datasets: [{
          data: [this.SumCha2, this.SumCha3, this.SumCha1],
          backgroundColor: [colors.primaryLight, colors.infoLight, colors.successLight],
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
