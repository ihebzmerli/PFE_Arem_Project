import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { AchatsService } from '../achats.service';

@Component({
  selector: 'ngx-echarts-achats-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsAchatsPieComponent implements AfterViewInit, OnDestroy {
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
    this.achatsService.getSumV1().subscribe(data1 => {
      this.Sum1 = Number(data1);
      console.log(data1);
      this.achatsService.getSumV2().subscribe(data2 => {
        this.Sum2 = Number(data2);
        console.log(data1);

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Non valider','Valider'],

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
              { value: this.Sum1, name: 'Valider' },
              { value: this.Sum2, name:'Non valider' },
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
