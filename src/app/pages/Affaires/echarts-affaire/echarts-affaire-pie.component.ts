import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { AffaireService } from '../affaire.service';

@Component({
  selector: 'ngx-echarts-affaire-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsAffairePieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private affaireService: AffaireService,private theme: NbThemeService) {
  }
/**changes made */
SumAvg1;
SumAvg2;

  ngOnInit() {

  }

/**changes made */
  ngAfterViewInit() {
    this.affaireService.getSumAvg1().subscribe(data1 => {
      this.SumAvg1 = data1;
      console.log(data1);
      this.affaireService.getSumAvg2().subscribe(data2 => {
        this.SumAvg2 = data2;
        console.log(data1);

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
          data: [this.SumAvg1[0],this.SumAvg1[1],this.SumAvg1[2],this.SumAvg1[3],this.SumAvg1[4],this.SumAvg1[5],this.SumAvg1[6],
          this.SumAvg1[7],this.SumAvg1[8],this.SumAvg1[9],this.SumAvg1[10],this.SumAvg1[11],this.SumAvg1[12],this.SumAvg1[13],
          this.SumAvg1[14],this.SumAvg1[15],this.SumAvg1[16],this.SumAvg1[17],this.SumAvg1[18],this.SumAvg1[19],this.SumAvg1[20],this.SumAvg1[21],
          this.SumAvg1[22],this.SumAvg1[23],this.SumAvg1[24],this.SumAvg1[25],this.SumAvg1[26],this.SumAvg1[27],this.SumAvg1[28],this.SumAvg1[29],
          this.SumAvg1[30]],
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
              { value: this.SumAvg2[0], name: this.SumAvg1[0] },
              { value: this.SumAvg2[1], name: this.SumAvg1[1] },
              { value: this.SumAvg2[2], name: this.SumAvg1[2] },
              { value: this.SumAvg2[3], name: this.SumAvg1[3] },
              { value: this.SumAvg2[4], name: this.SumAvg1[4] },
              { value: this.SumAvg2[5], name: this.SumAvg1[5] },
              { value: this.SumAvg2[6], name: this.SumAvg1[6] },
              { value: this.SumAvg2[7], name: this.SumAvg1[7] },
              { value: this.SumAvg2[8], name: this.SumAvg1[8] },
              { value: this.SumAvg2[9], name: this.SumAvg1[9] },
              { value: this.SumAvg2[10], name: this.SumAvg1[10] },
              { value: this.SumAvg2[11], name: this.SumAvg1[11] },
              { value: this.SumAvg2[12], name: this.SumAvg1[12] },
              { value: this.SumAvg2[13], name: this.SumAvg1[13] },
              { value: this.SumAvg2[14], name: this.SumAvg1[14] },
              { value: this.SumAvg2[15], name: this.SumAvg1[15] },
              { value: this.SumAvg2[16], name: this.SumAvg1[16] },
              { value: this.SumAvg2[17], name: this.SumAvg1[17] },
              { value: this.SumAvg2[18], name: this.SumAvg1[18] },
              { value: this.SumAvg2[19], name: this.SumAvg1[19] },
              { value: this.SumAvg2[20], name: this.SumAvg1[20] },
              { value: this.SumAvg2[21], name: this.SumAvg1[21] },
              { value: this.SumAvg2[22], name: this.SumAvg1[22] },
              { value: this.SumAvg2[23], name: this.SumAvg1[23] },
              { value: this.SumAvg2[24], name: this.SumAvg1[24] },
              { value: this.SumAvg2[25], name: this.SumAvg1[25] },
              { value: this.SumAvg2[26], name: this.SumAvg1[26] },
              { value: this.SumAvg2[27], name: this.SumAvg1[27] },
              { value: this.SumAvg2[28], name: this.SumAvg1[28] },
              { value: this.SumAvg2[29], name: this.SumAvg1[29] },
              { value: this.SumAvg2[30], name: this.SumAvg1[30] },
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
