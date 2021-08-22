import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { BonPrepService } from '../bon-prep.service';

@Component({
  selector: 'ngx-chartjs-bon-Prep-bar-horizontal',
  template: `
    <chart type="horizontalBar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsBonPrepBarHorizontalComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  SumD1:number;
  SumD2:number;
  SumD3:number;
  SumD4:number;
  currentYear: number = new Date().getFullYear();
  constructor(private bonPrepService: BonPrepService,private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.bonPrepService.getSumD1().subscribe(data => {
        this.SumD1 = Number(data);
        console.log(data);
        this.bonPrepService.getSumD2().subscribe(data => {
          this.SumD2 = Number(data);
          console.log(data);
          this.bonPrepService.getSumD3().subscribe(data => {
            this.SumD3 = Number(data);
            console.log(data);
            this.bonPrepService.getSumD4().subscribe(data => {
              this.SumD4 = Number(data);
              console.log(data);

      this.data = {
        labels: [this.currentYear-4,this.currentYear-3,this.currentYear-1, this.currentYear],
        datasets: [{
            label: 'Année '+(this.currentYear-3).toString(),
            backgroundColor: colors.infoLight,
            borderWidth: 1,
            data: [this.SumD4],
          }, {
            label: 'Année '+(this.currentYear-2).toString(),
            backgroundColor: colors.successLight,
            data: [this.SumD3],
          }, {
            label: 'Année '+(this.currentYear-1).toString(),
            backgroundColor: colors.successLight,
            data: [this.SumD2],
          }, {
            label: 'Année '+(this.currentYear).toString(),
            backgroundColor: colors.successLight,
            data: [this.SumD1],
          },
        ],
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          rectangle: {
            borderWidth: 2,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          position: 'right',
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };



    });});
  });});
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private random() {
    return Math.round(Math.random() * 100);
  }
}
