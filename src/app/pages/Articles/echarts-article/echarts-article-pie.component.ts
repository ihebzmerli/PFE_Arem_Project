import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ArticleService } from '../article.service';

@Component({
  selector: 'ngx-echarts-article-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsArticlePieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private articleService: ArticleService,private theme: NbThemeService) {
  }
/**changes made */

  Sum1:number;
  Sum2:number;
  Sum3:number;
  Sum4:number;
  Sum5:number;
  Sum6:number;
  Sum7:number;
  Sum8:number;
  Sum9:number;
  Sum10:number;
  Sum11:number;
  Sum12:number;
  Sum13:number;
  Sum14:number;
  ngOnInit() {

  }

/**changes made */
  ngAfterViewInit() {
    this.articleService.getSum1().subscribe(data => {
      this.Sum1 = Number(data);
      console.log(this.Sum1);
    })
    this.articleService.getSum2().subscribe(data => {
      this.Sum2 = Number(data);
      console.log(data);
    });
    this.articleService.getSum3().subscribe(data => {
      this.Sum3 = Number(data);
      console.log(data);
    });
    this.articleService.getSum4().subscribe(data => {
      this.Sum4 = Number(data);
      console.log(data);
    });
    this.articleService.getSum5().subscribe(data => {
      this.Sum5 = Number(data);
      console.log(data);
    });
    this.articleService.getSum6().subscribe(data => {
      this.Sum6 = Number(data);
      console.log(data);
    });
    this.articleService.getSum7().subscribe(data => {
      this.Sum7 = Number(data);
      console.log(data);
    });
    this.articleService.getSum8().subscribe(data => {
      this.Sum8 = Number(data);
      console.log(data);
    });
    this.articleService.getSum9().subscribe(data => {
      this.Sum9 = Number(data);
      console.log(data);
    });
    this.articleService.getSum10().subscribe(data => {
      this.Sum10 = Number(data);
      console.log(data);
    });
    this.articleService.getSum11().subscribe(data => {
      this.Sum11 = Number(data);
      console.log(data);
    });
    this.articleService.getSum12().subscribe(data => {
      this.Sum12 = Number(data);
      console.log(data);
    });
    this.articleService.getSum13().subscribe(data => {
      this.Sum13 = Number(data);
      console.log(data);
    });
    this.articleService.getSum14().subscribe(data => {
      this.Sum14 = Number(data);
      console.log(data);
    });

    this.articleService.getSum1().subscribe(data => {
      this.Sum1 = Number(data);
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
          data: ['QUT_STK','QUT_STK2','STK_GAR','STK_INI','ANAL_STK','NBJ_STK','V_SSTK','COM_STK','XANAL_STK','STK_ATRSF',
        'STK_TRSF','STK_REEL','STK_RES','STK_NP'],
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
              { value: Number(this.Sum1), name: 'QUT_STK' },
              { value: Number(this.Sum2), name: 'QUT_STK2' },
              { value: this.Sum3, name: 'STK_GAR' },
              { value: this.Sum4, name: 'STK_INI' },
              { value: this.Sum5, name: 'ANAL_STK' },
              { value: this.Sum6, name: 'NBJ_STK' },
              { value: this.Sum7, name: 'V_SSTK' },
              { value: this.Sum8, name: 'COM_STK' },
              { value: this.Sum9, name: 'XANAL_STK' },
              { value: this.Sum10, name: 'STK_ATRSF' },
              { value: this.Sum11, name: 'STK_TRSF' },
              { value: this.Sum12, name: 'STK_REEL' },
              { value: this.Sum13, name: 'STK_RES' },
              { value: this.Sum14, name: 'STK_NP' },
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
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
