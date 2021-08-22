import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { BonLivService } from '../bon-Liv.service';

@Component({
  selector: 'ngx-echarts-bon-Liv-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsBonLivPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private bonLivService: BonLivService,private theme: NbThemeService) {
  }
/**changes made */

SumR:number;
SumE:number;
  ngOnInit() {

  }

/**changes made */
  ngAfterViewInit() {
    this.bonLivService.getSumR().subscribe(data => {
      this.SumR = Number(data);
      console.log();
    this.bonLivService.getSumE().subscribe(data => {
      this.SumE = Number(data);
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
          data: ['Reçu','Envoyer'],
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
            name: 'Nature de Livraison',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: Number(this.SumR), name: 'Reçu' },
              { value: Number(this.SumE), name: 'Envoyer' },
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
