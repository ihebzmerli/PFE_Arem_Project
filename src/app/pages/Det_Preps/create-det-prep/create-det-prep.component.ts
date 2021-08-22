import { Component, OnInit } from '@angular/core';
import { Det_prep } from '../det-prep';
import { Router } from '@angular/router';
import { DetPrepService } from '../det-prep.service';
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
  selector: 'ngx-create-det-prep',
  templateUrl: './create-det-prep.component.html',
  styleUrls: ['./create-det-prep.component.scss']
})
export class CreateDetPrepComponent implements OnInit {

  /** teamplate Ajouter */
    starRate = 2;
    heartRate = 4;
    radioGroupValue = 'This is value 2';
  
  
  /** ********************* */
  
  detprep: Det_prep = new Det_prep();
  submitted = false;
  
  constructor(private authService: TokenStorageService,private toastrService: NbToastrService, private detprepService: DetPrepService,
      private router: Router) { }

      ngOnInit(): void {
        
      }
  
      saveDetprep() {
          this.detprepService.createDet_prep(this.detprep).subscribe( data =>{
            console.log(data);
            this.gotoListDetprep();
          },
          error => console.log(error));
        }
  
      gotoListDetprep() {
        this.router.navigate(['/det-prep-list']);
      }
  
      onSubmit() {
          console.log(this.detprep);
          this.saveDetprep();    
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
  