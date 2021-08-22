import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { delay } from 'rxjs/operators';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { Art_Prep } from '../../../Bon_Preps/Art_Preps/art-prep';
import { PagesComponent } from '../../../pages.component';
import { ChariotService } from '../../chariot.service';

@Component({
  selector: 'ngx-pointage-chariot-dialog',
  templateUrl: 'pointage-chariot-dialog.component.html',
  styleUrls: ['pointage-chariot-dialog.component.scss'],
})
export class PointageChariotDialogComponent {

  @Input() title: string;
  artprep:Art_Prep;
  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<PointageChariotDialogComponent>,private router: Router,private chariotService: ChariotService,private _Activatedroute :ActivatedRoute) {}

  ngOnInit() {
    
    this.title;
  }
  cancel() {
    this.ref.close();
  }
  title1:number;
  submitPointage() {
    this.chariotService.ChangeChariotEtatEnAttent(this.title)
    .subscribe(
      data => {
      },
      error => console.log('ERROR: ' + error));


        this.chariotService.ChronoChariotPointage(this.title)
        .subscribe(
          data => {
          },
          error => console.log('ERROR: ' + error));

        delay(2000);

        this.chariotService.ChangeChrono(this.title)
        .subscribe(
          data => {
          },
          error => console.log('ERROR: ' + error));

          window.location.reload();
  }

  goToLists($myParam: string = ''): void {
    const navigationDetails: string[] = ['//pages/Achatss/achats-list'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }
}
