import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { AchatsService } from '../achats.service';

@Component({
  selector: 'ngx-echarts-achatsPret-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsAchatsPretPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private achatsService: AchatsService,private theme: NbThemeService) {
  }
/**changes made */

  Sum1:number;
  Sum2:number;
  ngOnInit() {

  }

/**changes made */
  ngAfterViewInit() {


    this.achatsService.getSumP1().subscribe(data => {
      this.Sum1 = Number(data);
      console.log(data);

      this.achatsService.getSumP2().subscribe(data => {
        this.Sum2 = Number(data);
        console.log(data);


    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.dangerLight, colors.successLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Non payer','payer'],
          /*
          data: ['ABARTH','AIWAYS','ALFA ROMEO','ASTON MARTIN','AUDI','BENTLEY','BMW','CITROEN','CUPRA','DACIA','DS','FERRARI',
          'FIAT','FORD','HONDA','HYUNDAI','JAGUAR','JEEP','KIA','LAMBORGHINI','LAND ROVER','LEXUS','LOTUS','MASERATI','MAZDA',
          'MCLAREN','MERCEDES','MG','MINI','MITSUBISHI','NISSAN','OPEL','PEUGEOT','PORSCHE','RENAULT','SEAT','SKODA','SMART',
          'IZUZU','VW','TGL','SGB','P','UGU','OCT','DEP'],*/
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Tout le Stock',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: this.Sum1, name: 'Non payer' },
              { value: this.Sum2, name: 'payer' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  });
});
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
