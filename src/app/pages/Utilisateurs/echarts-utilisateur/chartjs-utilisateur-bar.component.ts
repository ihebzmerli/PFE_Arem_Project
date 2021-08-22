import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'ngx-chartjs-utilisateur-bar',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsUtilisateurBarComponent implements OnDestroy {
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
      this.utilisateurService.getSumROLE_USER().subscribe(data1 => {
        this.SumCha1 = Number(data1);
        console.log(data1);
        this.utilisateurService.getSumROLE_ADMIN().subscribe(data2 => {
          this.SumCha2 = Number(data2);
          console.log(data2);
          this.utilisateurService.getSumROLE_ACHETEUR().subscribe(data3 => {
            this.SumCha3 = Number(data3);
            console.log(data3);
            this.utilisateurService.getSumROLE_TRANSITAIRE().subscribe(data4 => {
              this.SumCha4 = Number(data4);
              console.log(data4);
              this.utilisateurService.getSumROLE_CLIENT().subscribe(data5 => {
                this.SumCha5 = Number(data5);
                console.log(data5);
                this.utilisateurService.getSumROLE_VENDEUR().subscribe(data6 => {
                  this.SumCha6 = Number(data6);
                  console.log(data6);
                  this.utilisateurService.getSumROLE_DECIDEUR_BP().subscribe(data7 => {
                    this.SumCha7 = Number(data7);
                    console.log(data7);
                    this.utilisateurService.getSumROLE_AGENT_CAB().subscribe(data8 => {
                      this.SumCha8 = Number(data8);
                      console.log(data8);
                      this.utilisateurService.getSumROLE_PREPARATEUR_BR().subscribe(data9 => {
                        this.SumCha9 = Number(data9);
                        console.log(data9);
                        this.utilisateurService.getSumROLE_RESPONSABLE_DISPATCHING_BP().subscribe(data10 => {
                          this.SumCha10 = Number(data10);
                          console.log(data10);
                          this.utilisateurService.getSumROLE_LIVREUR().subscribe(data11 => {
                            this.SumCha11 = Number(data11);
                            console.log(data11);
      this.data = {
        labels: ['USER', 'ADMIN', 'ACHETEUR', 'TRANSITAIRE', 'CLIENT', 'VENDEUR', 'DECIDEUR_BP', 'AGENT_CAB', 'PREPARATEUR_BR', 'DISPATCHING_BP', 'LIVREUR'],
        datasets: [{
          data: [this.SumCha1, this.SumCha2, this.SumCha3, this.SumCha4, this.SumCha5, this.SumCha6, this.SumCha7, this.SumCha8, this.SumCha9, this.SumCha10, this.SumCha11],
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
});
});
});
}
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
