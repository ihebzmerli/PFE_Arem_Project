import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { BonPrepService } from '../bon-Prep.service';

@Component({
  selector: 'ngx-echarts-bon-Prep-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsBonPrepPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private bonPrepService: BonPrepService,private theme: NbThemeService) {
  }
/**changes made */

SumC:number;
SumL:number;
  ngOnInit() {

  }

/**changes made */
  ngAfterViewInit() {
    this.bonPrepService.getSumC().subscribe(data => {
      this.SumC = Number(data);
      console.log();
    this.bonPrepService.getSumL().subscribe(data => {
      this.SumL = Number(data);
      console.log(data);

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Sur comptoir','Livraison'],
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
            name: 'Nature Livraison',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: Number(this.SumC), name: 'Sur comptoir' },
              { value: Number(this.SumL), name: 'Livraison' },
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
