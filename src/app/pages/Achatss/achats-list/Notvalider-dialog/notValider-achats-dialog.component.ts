import { Component, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { AchatsService } from '../../achats.service';

@Component({
  selector: 'ngx-Notvalider-achats-dialog',
  templateUrl: 'Notvalider-achats-dialog.component.html',
  styleUrls: ['Notvalider-achats-dialog.component.scss'],
})
export class NotValiderAchatsDialogComponent {

  @Input() title: string;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<NotValiderAchatsDialogComponent>,private router: Router,private achatsService: AchatsService,private _Activatedroute :ActivatedRoute) {}

  ngOnInit() {
    
  }
  cancel() {
    this.ref.close();
  }
  title1:number;
  submitToValider() {
    this.title1 = Number(this.title);
    console.log(this.title1);
      this.achatsService.ChangeAchatToValidate(this.title1)
        .subscribe(
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


