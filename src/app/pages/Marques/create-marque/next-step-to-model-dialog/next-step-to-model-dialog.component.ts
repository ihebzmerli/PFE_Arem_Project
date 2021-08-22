import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { MarqueService } from '../../marque.service';

@Component({
  selector: 'ngx-next-step-to-model-dialog',
  templateUrl: 'next-step-to-model-dialog.component.html',
  styleUrls: ['next-step-to-model-dialog.component.scss'],
})
export class NextStepToModelDialogComponent {

  @Input() title: string;


  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<NextStepToModelDialogComponent>,private router: Router,private marqueService: MarqueService,
    private _Activatedroute :ActivatedRoute) {
    }

  cancel() {
    this.ref.close();
    this.gotoListMarque(); 
  }

  submitRotation() {
    this.ref.close();
    this.gotoAddModel2();
  }

  gotoAddModel2($myParam: string = ''): void {
    const navigationDetails: string[] = ['//pages/Models/create-model'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

  gotoListMarque($myParam: string = ''): void {
    const navigationDetails: string[] = ['//pages/Marques/marque-list'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }
}
