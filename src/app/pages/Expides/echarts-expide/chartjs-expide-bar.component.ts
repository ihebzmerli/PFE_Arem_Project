import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { ExpideService } from '../expide.service';

@Component({
  selector: 'ngx-chartjs-expide-bar',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsExpideBarComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;




  SumA11:Number;
  SumA12:Number;
  SumA13:Number;
  SumA14:Number;
  SumA15:Number;
  SumA16:Number;
  SumA17:Number;

  SumA21:Number;
  SumA22:Number;
  SumA23:Number;
  SumA24:Number;
  SumA25:Number;
  SumA26:Number;
  SumA27:Number;

  currentYear: number = new Date().getFullYear();
  
  constructor(private expideService: ExpideService,private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.expideService.getSumM11().subscribe(data11 => {
        this.SumA11 = Number(data11);
      })
        this.expideService.getSumM12().subscribe(data12 => {
          this.SumA12 = Number(data12);
        })
          this.expideService.getSumM13().subscribe(data13 => {
            this.SumA13 = Number(data13);
          })
            this.expideService.getSumM14().subscribe(data14 => {
              this.SumA14 = Number(data14);
            })
              this.expideService.getSumM15().subscribe(data15 => {
                this.SumA15 = Number(data15);
              })
                this.expideService.getSumM16().subscribe(data16 => {
                  this.SumA16 = Number(data16);
                })
                  this.expideService.getSumM17().subscribe(data17 => {
                    this.SumA17 = Number(data17);
                  })
                    this.expideService.getSumM21().subscribe(data21 => {
                      this.SumA21 = Number(data21);
                    })
                      this.expideService.getSumM22().subscribe(data22 => {
                        this.SumA22 = Number(data22);
                      })
                        this.expideService.getSumM23().subscribe(data23 => {
                          this.SumA23 = Number(data23);
                        })
                          this.expideService.getSumM24().subscribe(data24 => {
                            this.SumA24 = Number(data24);
                          })
                            this.expideService.getSumM25().subscribe(data25 => {
                              this.SumA25 = Number(data25);
                            })
                              this.expideService.getSumM26().subscribe(data26 => {
                                this.SumA26 = Number(data26);
                              })
                                this.expideService.getSumM27().subscribe(data27 => {
                                  this.SumA27 = Number(data27)

        console.log(this.SumA21);
      this.data = {
        labels: [this.currentYear-6, this.currentYear-5, this.currentYear-4, this.currentYear-3, this.currentYear-2, this.currentYear-1, this.currentYear],
        datasets: [{
          data: [this.SumA17, this.SumA16, this.SumA15, this.SumA14, this.SumA13, this.SumA12, this.SumA11],
          label: 'livraison_voiture',
          backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
        }, {
          data: [this.SumA27, this.SumA26, this.SumA25, this.SumA24, this.SumA23, this.SumA22, this.SumA21],
          label: 'sur_comptoir',
          backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
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
          yAxes: [
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
        },
      };
    });
  });
}

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
