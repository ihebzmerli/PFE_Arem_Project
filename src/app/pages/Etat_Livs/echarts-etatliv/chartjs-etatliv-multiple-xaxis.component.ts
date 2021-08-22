import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { EtatLivService } from '../etat-liv.service';

@Component({
  selector: 'ngx-chartjs-etatliv-multiple-xaxis',
  template: `
    <chart type="line" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsEtatlivMultipleXaxisComponent implements OnDestroy {
  data: {};
  options: any;
  themeSubscription: any;

  SumBar1:number;
  SumBar2:number;
  SumBar3:number;
  SumBar4:number;
  SumBar5:number;
  SumBar6:number;
  SumBar7:number;
  SumBar8:number;
  SumBar9:number;
  SumBar10:number;
  SumBar11:number;
  SumBar12:number;

  SumBar21:number;
  SumBar22:number;
  SumBar23:number;
  SumBar24:number;
  SumBar25:number;
  SumBar26:number;
  SumBar27:number;
  SumBar28:number;
  SumBar29:number;
  SumBar210:number;
  SumBar211:number;
  SumBar212:number;

  SumBar31:number;
  SumBar32:number;
  SumBar33:number;
  SumBar34:number;
  SumBar35:number;
  SumBar36:number;
  SumBar37:number;
  SumBar38:number;
  SumBar39:number;
  SumBar310:number;
  SumBar311:number;
  SumBar312:number;

  SumBar41:number;
  SumBar42:number;
  SumBar43:number;
  SumBar44:number;
  SumBar45:number;
  SumBar46:number;
  SumBar47:number;
  SumBar48:number;
  SumBar49:number;
  SumBar410:number;
  SumBar411:number;
  SumBar412:number;
  constructor(private etatLivService: EtatLivService,private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.etatLivService.getSumBar1().subscribe(data1 => {
        this.SumBar1 = Number(data1);
        
        this.etatLivService.getSumBar2().subscribe(data1 => {
          this.SumBar2 = Number(data1);
          
          this.etatLivService.getSumBar3().subscribe(data1 => {
            this.SumBar3 = Number(data1);
            
            this.etatLivService.getSumBar4().subscribe(data1 => {
              this.SumBar4 = Number(data1);
              
              this.etatLivService.getSumBar5().subscribe(data1 => {
                this.SumBar5 = Number(data1);
                
                this.etatLivService.getSumBar6().subscribe(data1 => {
                  this.SumBar6 = Number(data1);
                  
                  this.etatLivService.getSumBar7().subscribe(data1 => {
                    this.SumBar7 = Number(data1);
                    
                    this.etatLivService.getSumBar8().subscribe(data1 => {
                      this.SumBar8 = Number(data1);
                      
                      this.etatLivService.getSumBar9().subscribe(data1 => {
                        this.SumBar9 = Number(data1);
                        
                        this.etatLivService.getSumBar10().subscribe(data1 => {
                          this.SumBar10 = Number(data1);
                          
                          this.etatLivService.getSumBar11().subscribe(data1 => {
                            this.SumBar11 = Number(data1);
                            
                            this.etatLivService.getSumBar12().subscribe(data1 => {
                              this.SumBar12 = Number(data1);
                              
                        /******* 2 */      

      this.etatLivService.getSumBar21().subscribe(data1 => {
        this.SumBar21 = Number(data1);
        
        this.etatLivService.getSumBar22().subscribe(data1 => {
          this.SumBar22 = Number(data1);
          
          this.etatLivService.getSumBar23().subscribe(data1 => {
            this.SumBar23 = Number(data1);
            
            this.etatLivService.getSumBar24().subscribe(data1 => {
              this.SumBar24 = Number(data1);
              
              this.etatLivService.getSumBar25().subscribe(data1 => {
                this.SumBar25 = Number(data1);
                
                this.etatLivService.getSumBar26().subscribe(data1 => {
                  this.SumBar26 = Number(data1);
                  
                  this.etatLivService.getSumBar27().subscribe(data1 => {
                    this.SumBar27 = Number(data1);
                    
                    this.etatLivService.getSumBar28().subscribe(data1 => {
                      this.SumBar28 = Number(data1);
                      
                      this.etatLivService.getSumBar29().subscribe(data1 => {
                        this.SumBar29 = Number(data1);
                        
                        this.etatLivService.getSumBar210().subscribe(data1 => {
                          this.SumBar210 = Number(data1);
                          
                          this.etatLivService.getSumBar211().subscribe(data1 => {
                            this.SumBar211 = Number(data1);
                            
                            this.etatLivService.getSumBar212().subscribe(data1 => {
                              this.SumBar212 = Number(data1);
                              


                        /******* 3 */      

                        this.etatLivService.getSumBar31().subscribe(data1 => {
                          this.SumBar31 = Number(data1);
                          
                          this.etatLivService.getSumBar32().subscribe(data1 => {
                            this.SumBar32 = Number(data1);
                            
                            this.etatLivService.getSumBar33().subscribe(data1 => {
                              this.SumBar33 = Number(data1);
                              
                              this.etatLivService.getSumBar34().subscribe(data1 => {
                                this.SumBar34 = Number(data1);
                                
                                this.etatLivService.getSumBar35().subscribe(data1 => {
                                  this.SumBar35 = Number(data1);
                                  
                                  this.etatLivService.getSumBar36().subscribe(data1 => {
                                    this.SumBar36 = Number(data1);
                                    
                                    this.etatLivService.getSumBar37().subscribe(data1 => {
                                      this.SumBar37 = Number(data1);
                                      
                                      this.etatLivService.getSumBar38().subscribe(data1 => {
                                        this.SumBar38 = Number(data1);
                                        
                                        this.etatLivService.getSumBar39().subscribe(data1 => {
                                          this.SumBar39 = Number(data1);
                                          
                                          this.etatLivService.getSumBar310().subscribe(data1 => {
                                            this.SumBar310 = Number(data1);
                                            
                                            this.etatLivService.getSumBar311().subscribe(data1 => {
                                              this.SumBar311 = Number(data1);
                                              
                                              this.etatLivService.getSumBar312().subscribe(data1 => {
                                                this.SumBar312 = Number(data1);
                                                    
                                                
                         /******* 4 */      

                         this.etatLivService.getSumBar41().subscribe(data1 => {
                          this.SumBar41 = Number(data1);
                          
                          this.etatLivService.getSumBar42().subscribe(data1 => {
                            this.SumBar42 = Number(data1);
                            
                            this.etatLivService.getSumBar43().subscribe(data1 => {
                              this.SumBar43 = Number(data1);
                              
                              this.etatLivService.getSumBar44().subscribe(data1 => {
                                this.SumBar44 = Number(data1);
                                
                                this.etatLivService.getSumBar45().subscribe(data1 => {
                                  this.SumBar45 = Number(data1);
                                  this.etatLivService.getSumBar46().subscribe(data1 => {
                                    this.SumBar46 = Number(data1);
                                    this.etatLivService.getSumBar47().subscribe(data1 => {
                                      this.SumBar47 = Number(data1);
                                      this.etatLivService.getSumBar48().subscribe(data1 => {
                                        this.SumBar48 = Number(data1);
                                        this.etatLivService.getSumBar49().subscribe(data1 => {
                                          this.SumBar49 = Number(data1);
                                          this.etatLivService.getSumBar410().subscribe(data1 => {
                                            this.SumBar410 = Number(data1);
                                            this.etatLivService.getSumBar411().subscribe(data1 => {
                                              this.SumBar411 = Number(data1);
                                              this.etatLivService.getSumBar412().subscribe(data1 => {
                                                this.SumBar412 = Number(data1);                                               
      this.data = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin','Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        datasets: [{
          label: 'reçu non verifier',
          data: [this.SumBar1, this.SumBar2, this.SumBar3, this.SumBar4, this.SumBar5, this.SumBar6, this.SumBar7, this.SumBar8, this.SumBar9, this.SumBar10, this.SumBar11, this.SumBar12],
          borderColor: colors.primary,
          backgroundColor: colors.primary,
          fill: false,
          borderDash: [5, 5],
          pointRadius: 8,
          pointHoverRadius: 10,
        }, {
          label: 'reçu est verifier',
          data: [this.SumBar21, this.SumBar22, this.SumBar23, this.SumBar24, this.SumBar25, this.SumBar26, this.SumBar27, this.SumBar28, this.SumBar29, this.SumBar210, this.SumBar211, this.SumBar212],
          borderColor: colors.dangerLight,
          backgroundColor: colors.dangerLight,
          fill: false,
          borderDash: [5, 5],
          pointRadius: 8,
          pointHoverRadius: 10,
        }, {
          label: 'Un problem a la reception',
          data: [this.SumBar31, this.SumBar32, this.SumBar33, this.SumBar34, this.SumBar35, this.SumBar36, this.SumBar37, this.SumBar38, this.SumBar39, this.SumBar310, this.SumBar311, this.SumBar312],
          borderColor: colors.info,
          backgroundColor: colors.info,
          fill: false,
          pointRadius: 8,
          pointHoverRadius: 10,
        }, {
          label: 'N est pas recu',
          data: [this.SumBar41, this.SumBar42, this.SumBar43, this.SumBar44, this.SumBar45, this.SumBar46, this.SumBar47, this.SumBar48, this.SumBar49, this.SumBar410, this.SumBar411, this.SumBar412],
          borderColor: colors.success,
          backgroundColor: colors.success,
          fill: false,
          pointRadius: 8,
          pointHoverRadius: 10,
        }],
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        hover: {
          mode: 'index',
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Month',
              },
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
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value',
              },
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
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
