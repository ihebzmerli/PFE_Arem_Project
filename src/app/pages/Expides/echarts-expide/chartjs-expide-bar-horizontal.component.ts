import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ExpideService } from '../expide.service';

@Component({
  selector: 'ngx-chartjs-expide-bar-horizontal',
  template: `
    <chart type="horizontalBar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsExpideBarHorizontalComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;


  SumM11:Number;
  SumM12:Number;
  SumM13:Number;
  SumM14:Number;
  SumM15:Number;
  SumM16:Number;
  SumM17:Number;
  SumM18:Number;
  SumM19:Number;
  SumM110:Number;
  SumM111:Number;
  SumM112:Number;


  SumM21:Number;
  SumM22:Number;
  SumM23:Number;
  SumM24:Number;
  SumM25:Number;
  SumM26:Number;
  SumM27:Number;
  SumM28:Number;
  SumM29:Number;
  SumM210:Number;
  SumM211:Number;
  SumM212:Number;

  currentYear: number = new Date().getFullYear();
  constructor(private expideService: ExpideService,private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.expideService.getSumM11().subscribe(data11 => {
        this.SumM11 = Number(data11);
        this.expideService.getSumM12().subscribe(data12 => {
          this.SumM12 = Number(data12);
          this.expideService.getSumM13().subscribe(data13 => {
            this.SumM13 = Number(data13);
            this.expideService.getSumM14().subscribe(data14 => {
              this.SumM14 = Number(data14);
              this.expideService.getSumM15().subscribe(data15 => {
                this.SumM15 = Number(data15);
                this.expideService.getSumM16().subscribe(data16 => {
                  this.SumM16 = Number(data16);
                  this.expideService.getSumM17().subscribe(data17 => {
                    this.SumM17 = Number(data17);
                    this.expideService.getSumM18().subscribe(data18 => {
                      this.SumM18 = Number(data18);
                      this.expideService.getSumM19().subscribe(data19 => {
                        this.SumM19 = Number(data19);
                        this.expideService.getSumM110().subscribe(data110 => {
                          this.SumM110 = Number(data110);
                          this.expideService.getSumM111().subscribe(data111 => {
                            this.SumM111 = Number(data111);
                            this.expideService.getSumM112().subscribe(data112 => {
                              this.SumM112 = Number(data112);

      this.expideService.getSumM21().subscribe(data21 => {
        this.SumM21 = Number(data21);
        this.expideService.getSumM22().subscribe(data22 => {
          this.SumM22 = Number(data22);
          this.expideService.getSumM23().subscribe(data23 => {
            this.SumM23 = Number(data23);
            this.expideService.getSumM24().subscribe(data24 => {
              this.SumM24 = Number(data24);
              this.expideService.getSumM25().subscribe(data25 => {
                this.SumM25 = Number(data25);
                this.expideService.getSumM26().subscribe(data26 => {
                  this.SumM26 = Number(data26);
                  this.expideService.getSumM27().subscribe(data27 => {
                    this.SumM27 = Number(data27);
                    this.expideService.getSumM28().subscribe(data28 => {
                      this.SumM28 = Number(data28);
                      this.expideService.getSumM29().subscribe(data29 => {
                        this.SumM29 = Number(data29);
                        this.expideService.getSumM210().subscribe(data210 => {
                          this.SumM210 = Number(data210);
                          this.expideService.getSumM211().subscribe(data211 => {
                            this.SumM211 = Number(data211);
                            this.expideService.getSumM212().subscribe(data212 => {
                              this.SumM212 = Number(data212); 

      this.data = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin','Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        datasets: [{
            label: this.currentYear,
            backgroundColor: colors.infoLight,
            borderWidth: 1,
            data: [this.SumM11, this.SumM12, this.SumM13, this.SumM14, this.SumM15, this.SumM16,this.SumM17, this.SumM18, this.SumM19, this.SumM110, this.SumM111, this.SumM112],
          }, {
            label: this.currentYear-1,
            backgroundColor: colors.successLight,
            data: [this.SumM21, this.SumM22, this.SumM23, this.SumM24, this.SumM25, this.SumM26,this.SumM27, this.SumM28, this.SumM29, this.SumM210, this.SumM211, this.SumM212],
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
    });
  });
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private random() {
    return Math.round(Math.random() * 100);
  }
}
