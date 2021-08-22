import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EtatLivService } from '../etat-liv.service';
import { Etat_liv } from '../etat-liv';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from '@nebular/theme';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-create-etat-liv',
  templateUrl: './create-etat-liv.component.html',
  styleUrls: ['./create-etat-liv.component.scss']
})
export class CreateEtatLivComponent implements OnInit {

  /** teamplate Ajouter */
    starRate = 2;
    heartRate = 4;
    radioGroupValue = 'This is value 2';
  
  
  /** ********************* */
  
  etatliv: Etat_liv = new Etat_liv();
  submitted = false;
  
  constructor(private authService: TokenStorageService,private toastrService: NbToastrService, private etatlivService: EtatLivService,
      private router: Router) { }
  ngOnInit() {
    
    }
  newEtat_liv(): void {
      this.submitted = false;
      this.etatliv = new Etat_liv();
    }
  save() {
      this.etatlivService.createEtat_liv(this.etatliv)
        .subscribe(data => console.log(data), error => console.log(error));
      this.etatliv = new Etat_liv();
      this.gotoList();
    }
  onSubmit() {
      this.submitted = true;
      this.save();    
    }
  gotoList() {
      this.router.navigate(['/etat_livs']);
    }
           /** toaster show start */
config: NbToastrConfig;

index = 1;
destroyByClick = true;
duration = 2000;
hasIcon = true;
position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
preventDuplicates = false;

status: NbComponentStatus = 'success';

title = 'HI there!';
content = `I'm cool toaster!`;

types: NbComponentStatus[] = [
  'primary',
  'success',
  'info',
  'warning',
  'danger',
];

positions: string[] = [
  NbGlobalPhysicalPosition.TOP_RIGHT,
  NbGlobalPhysicalPosition.TOP_LEFT,
  NbGlobalPhysicalPosition.BOTTOM_LEFT,
  NbGlobalPhysicalPosition.BOTTOM_RIGHT,
  NbGlobalLogicalPosition.TOP_END,
  NbGlobalLogicalPosition.TOP_START,
  NbGlobalLogicalPosition.BOTTOM_END,
  NbGlobalLogicalPosition.BOTTOM_START,
];

makeToast() {
  this.showToast(this.status, this.title, this.content);
}
private showToast(type: NbComponentStatus, title: string, body: string) {
  const config = {
    status: type,
    destroyByClick: this.destroyByClick,
    duration: this.duration,
    hasIcon: this.hasIcon,
    position: this.position,
    preventDuplicates: this.preventDuplicates,
  };
  const titleContent = title ? `. ${title}` : '';

  this.index += 1;
  this.toastrService.show(
    body,
    `Notif ${this.index}${titleContent}`,
    config);
}

/**toaster show start */ 
}
  
