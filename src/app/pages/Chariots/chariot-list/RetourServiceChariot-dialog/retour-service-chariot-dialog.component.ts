import { Component, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { ChariotService } from '../../chariot.service';

@Component({
  selector: 'ngx-retour-service-chariot-dialog',
  templateUrl: 'retour-service-chariot-dialog.component.html',
  styleUrls: ['retour-service-chariot-dialog.component.scss'],
})
export class RetourServiceChariotDialogComponent {

  @Input() title: string;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<RetourServiceChariotDialogComponent>,private router: Router,private chariotService: ChariotService,private _Activatedroute :ActivatedRoute) {}

  ngOnInit() {
    
    this.title;
  }
  cancel() {
    this.ref.close();
  }
  title1:number;
  submitToService() {
    this.chariotService.ChangeChariotEtatEnAttent(this.title)
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


