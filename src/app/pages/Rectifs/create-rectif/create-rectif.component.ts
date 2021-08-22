import { Component, OnInit } from '@angular/core';
import { Rectif } from '../rectif';
import { Router } from '@angular/router';
import { RectifService } from '../rectif.service';
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
  selector: 'ngx-create-rectif',
  templateUrl: './create-rectif.component.html',
  styleUrls: ['./create-rectif.component.scss']
})
export class CreateRectifComponent implements OnInit {

  /** teamplate Ajouter */
    starRate = 2;
    heartRate = 4;
    radioGroupValue = 'This is value 2';
  
  
  /** ********************* */
  
  rectif: Rectif = new Rectif();
  submitted = false;
  
  constructor(private authService: TokenStorageService,private toastrService: NbToastrService, private rectifService: RectifService,
      private router: Router) { }

      ngOnInit(): void {

      }
  
      saveRectif() {
          this.rectifService.createRectif(this.rectif).subscribe( data =>{
            console.log(data);
            this.gotoListRectif();
          },
          error => console.log(error));
        }
  
        gotoListRectif() {
        this.router.navigate(['/rectif-list']);
      }
  
      onSubmit() {
          console.log(this.rectif);
          this.saveRectif();    
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
  