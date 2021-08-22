import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { AchatsService } from '../../achats.service';

@Component({
  selector: 'ngx-valider-achats-dialog',
  templateUrl: 'valider-achats-dialog.component.html',
  styleUrls: ['valider-achats-dialog.component.scss'],
})
export class ValiderAchatsDialogComponent {

  @Input() title: string;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<ValiderAchatsDialogComponent>,private router: Router,private achatsService: AchatsService,private _Activatedroute :ActivatedRoute) {}

  ngOnInit() {
    

  }
  cancel() {
    this.ref.close();
  }
  title1:number;
  submitToNotValider() {
    this.title1 = Number(this.title);
    console.log(this.title1);
    this.achatsService.ChangeAchatToNotValidate(this.title1).subscribe(
        data => {
          window.location.reload();
        },
        error => console.log('ERROR: ' + error));
  }

  goToLists($myParam: string = ''): void {
    const navigationDetails: string[] = ['//pages/Achatss/achats-list'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }
}
