import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'ngx-chartjs-utilisateur-bar2',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsUtilisateurBar2Component implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  SumCha1:Number;
  SumCha2:Number;
  SumCha3:Number;
  SumCha4:Number;
  SumCha5:Number;
  SumCha6:Number;
  SumCha7:Number;
  SumCha8:Number;
  SumCha9:Number;
  SumCha10:Number;
  SumCha11:Number;
  SumCha12:Number;
  SumCha13:Number;
  SumCha14:Number;
  SumCha15:Number;
  SumCha16:Number;
  SumCha17:Number;
  SumCha18:Number;
  SumCha19:Number;
  constructor(private utilisateurService: UtilisateurService,private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

                          this.utilisateurService.getSumROLE_PREPARATEUR().subscribe(data11 => {
                            this.SumCha11 = Number(data11);
                            console.log(data11);
                            this.utilisateurService.getSumROLE_VALIDATEUR_DE_CHARIOT().subscribe(data12 => {
                              this.SumCha12 = Number(data12);
                              console.log(data12);
                              this.utilisateurService.getSumROLE_RESPONSABLE_POINTAGE().subscribe(data13 => {
                                this.SumCha13 = Number(data13);
                                console.log(data13);
                                this.utilisateurService.getSumROLE_EMBALLEUR().subscribe(data14 => {
                                  this.SumCha14 = Number(data14);
                                  console.log(data14);
                                  this.utilisateurService.getSumROLE_EXPEDITEUR().subscribe(data15 => {
                                    this.SumCha15 = Number(data15);
                                    console.log(data15);
                                    this.utilisateurService.getSumROLE_AGENT_SAISIE_REG().subscribe(data16 => {
                                      this.SumCha16 = Number(data16);
                                      this.utilisateurService.getSumROLE_CAISSIER().subscribe(data17 => {
                                        this.SumCha17 = Number(data17);
                                        this.utilisateurService.getSumROLE_RESPONSABLE_SERVICE_FRS_ETRANGER().subscribe(data18 => {
                                          this.SumCha18 = Number(data18);
                                          this.utilisateurService.getSumROLE_RESPONSABLE_SERVICE_FRS_LOCAL().subscribe(data19 => {
                                            this.SumCha19 = Number(data19);
      this.data = {
        labels: ['PREPARATEUR', 'VALIDATEUR_DE_CHARIOT', 'RESPONSABLE_POINTAGE', 'EMBALLEUR', 'EXPEDITEUR', 'AGENT_SAISIE_REG', 'CAISSIER',
        'FRS_ETRANGER', 'FRS_LOCAL'],
        datasets: [{
          data: [this.SumCha11, this.SumCha12, this.SumCha13, this.SumCha14, this.SumCha15, this.SumCha16, this.SumCha17, this.SumCha18
            , this.SumCha19],
          label: 'Utilisateur',
          backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
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
  }
  
);
});
});
});
});
});
});
});
})
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
