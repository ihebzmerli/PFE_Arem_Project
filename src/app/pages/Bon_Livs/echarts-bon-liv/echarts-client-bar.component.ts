import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { BonLivService } from '../bon-liv.service';

@Component({
  selector: 'ngx-echarts-client-bar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsClientBarComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private bonLivService: BonLivService,private theme: NbThemeService) {
  }


  /**changes made */

  SumAvgC1;
  SumAvgC2;

  ngAfterViewInit() {
    this.bonLivService.getSumAvgC1().subscribe(data => {
      this.SumAvgC1 = data;

    this.bonLivService.getSumAvgC2().subscribe(data => {
      this.SumAvgC2 = data;

    if(this.SumAvgC1[0]){
      this.SumAvgC1[0] = this.SumAvgC1[0].substring(0, this.SumAvgC1[0].indexOf(" : ") - 1);
    }
    if(this.SumAvgC1[1]){
      this.SumAvgC1[1] = this.SumAvgC1[1].substring(0, this.SumAvgC1[1].indexOf(" : ") - 1);
    }
    if(this.SumAvgC1[2]){
      this.SumAvgC1[2] = this.SumAvgC1[2].substring(0, this.SumAvgC1[2].indexOf(" : ") - 1);
    }
    if(this.SumAvgC1[3]){
      this.SumAvgC1[3] = this.SumAvgC1[3].substring(0, this.SumAvgC1[3].indexOf(" : ") - 1);
    }
    if(this.SumAvgC1[4]){
      this.SumAvgC1[4] = this.SumAvgC1[4].substring(0, this.SumAvgC1[4].indexOf(" : ") - 1);
    }
    if(this.SumAvgC1[5]){
      this.SumAvgC1[5] = this.SumAvgC1[5].substring(0, this.SumAvgC1[5].indexOf(" : ") - 1);
    }
    if(this.SumAvgC1[6]){
      this.SumAvgC1[6] = this.SumAvgC1[6].substring(0, this.SumAvgC1[6].indexOf(" : ") - 1);
    }
    if(this.SumAvgC1[7]){
      this.SumAvgC1[7] = this.SumAvgC1[7].substring(0, this.SumAvgC1[7].indexOf(" : ") - 1);
    }
    if(this.SumAvgC1[8]){
      this.SumAvgC1[8] = this.SumAvgC1[8].substring(0, this.SumAvgC1[8].indexOf(" : ") - 1);
    }
    if(this.SumAvgC1[9]){
      this.SumAvgC1[9] = this.SumAvgC1[9].substring(0, this.SumAvgC1[9].indexOf(" : ") - 1);
    }
    if(this.SumAvgC1[10]){
      this.SumAvgC1[10] = this.SumAvgC1[10].substring(0, this.SumAvgC1[10].indexOf(" : ") - 1);
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
            data: [this.SumAvgC1[0], this.SumAvgC1[1], this.SumAvgC1[2], this.SumAvgC1[3], this.SumAvgC1[4], this.SumAvgC1[5],
            this.SumAvgC1[6],this.SumAvgC1[7],this.SumAvgC1[8],this.SumAvgC1[9],this.SumAvgC1[10]],
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
            data: [this.SumAvgC2[0], this.SumAvgC2[1], this.SumAvgC2[2], this.SumAvgC2[3],this.SumAvgC2[4], this.SumAvgC2[5],
            this.SumAvgC2[6],this.SumAvgC2[7],this.SumAvgC2[8],this.SumAvgC2[9],this.SumAvgC2[10]],
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