import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ArticleService } from '../article.service';

@Component({
  selector: 'ngx-echarts-article-bar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsArticleBarComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private articleService: ArticleService,private theme: NbThemeService) {
  }


  /**changes made */

  SumBar1:number;
  SumBar2:number;
  SumBar3:number;
  SumBar4:number;
  SumBar5:number;
  SumBar6:number;
  SumBar7:number;

  ngAfterViewInit() {

    this.articleService.getSumBar1().subscribe(data => {
      this.SumBar1 = Number(data);
      console.log();

    this.articleService.getSumBar2().subscribe(data => {
      this.SumBar2 = Number(data);
      console.log(data);

    this.articleService.getSumBar3().subscribe(data => {
      this.SumBar3 = Number(data);
      console.log(data);

    this.articleService.getSumBar4().subscribe(data => {
      this.SumBar4 = Number(data);
      console.log(data);

    this.articleService.getSumBar5().subscribe(data => {
      this.SumBar5 = Number(data);
      console.log(data);

    this.articleService.getSumBar6().subscribe(data => {
      this.SumBar6 = Number(data);
      console.log(data);

    this.articleService.getSumBar7().subscribe(data => {
      this.SumBar7 = Number(data);
      console.log(data);


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
            data: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
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
            name: 'Article Preparer',
            type: 'bar',
            barWidth: '60%',
            data: [this.SumBar1, this.SumBar2, this.SumBar3, this.SumBar4, this.SumBar5, this.SumBar6, this.SumBar7],
          },
        ],
      };
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
}
