import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { BonLivService } from '../bon-liv.service';

@Component({
  selector: 'ngx-echarts-fournis-bar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsFournisBarComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private bonLivService: BonLivService,private theme: NbThemeService) {
  }


  /**changes made */

  SumAvgF1;
  SumAvgF2;

  ngAfterViewInit() {

    this.bonLivService.getSumAvgF1().subscribe(data => {
      this.SumAvgF1 = data;

    this.bonLivService.getSumAvgF2().subscribe(data => {
      this.SumAvgF2 = data;
      if(!this.SumAvgF1[5] || this.SumAvgF1[5]==null || this.SumAvgF2[5]==0){
        this.SumAvgF1[5]='n existe pas';
      }
      if(!this.SumAvgF1[6] || this.SumAvgF1[6]==null || this.SumAvgF2[6]==0){
        this.SumAvgF1[6]='n existe pas';
      }
      if(!this.SumAvgF1[7] || this.SumAvgF1[7]==null || this.SumAvgF2[7]==0){
        this.SumAvgF1[7]='n existe pas';
      }
      if(!this.SumAvgF1[8] || this.SumAvgF1[8]==null || this.SumAvgF2[8]==0){
        this.SumAvgF1[8]='n existe pas';
      }
      if(!this.SumAvgF1[9] || this.SumAvgF1[9]==null || this.SumAvgF2[9]==0){
        this.SumAvgF1[9]='n existe pas';
      }
      if(!this.SumAvgF1[10] || this.SumAvgF1[10]==null || this.SumAvgF2[10]==0){
        this.SumAvgF1[10]='n existe pas';
      }

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: [this.SumAvgF1[0], this.SumAvgF1[1], this.SumAvgF1[2], this.SumAvgF1[3], this.SumAvgF1[4], this.SumAvgF1[5],
            this.SumAvgF1[6],this.SumAvgF1[7],this.SumAvgF1[8],this.SumAvgF1[9],this.SumAvgF1[10]],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'TOT_TTC de livraison',
            type: 'bar',
            barWidth: '60%',
            data: [this.SumAvgF2[0], this.SumAvgF2[1], this.SumAvgF2[2], this.SumAvgF2[3],this.SumAvgF2[4], this.SumAvgF2[5],
            this.SumAvgF2[6],this.SumAvgF2[7],this.SumAvgF2[8],this.SumAvgF2[9],this.SumAvgF2[10]],
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
