import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetEmbaService } from '../det-emba.service';
import { Det_emba } from '../det-emba';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
  NbDateService,
} from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { delay } from 'rxjs/operators';
import { BonPrepService } from '../../Bon_Preps/bon-prep.service';
import { Bon_prep } from '../../Bon_Preps/bon-prep';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
@Component({
  selector: 'ngx-create-det-emba',
  templateUrl: './create-det-emba.component.html',
  styleUrls: ['./create-det-emba.component.scss']
})
export class CreateDetEmbaComponent implements OnInit {
  detembaForm: FormGroup;
  detemba: Det_emba = new Det_emba();
  submitted = false;
  date: Date;
  /** teamplate Ajouter */
    starRate = 2;
    heartRate = 4;
    radioGroupValue = 'This is value 2';
  
  
  /** ********************* */
  
  
  constructor(private authService: TokenStorageService,protected dateService: NbDateService<Date>,public datepipe: DatePipe,private formBuilder: FormBuilder,private toastrService: NbToastrService, private detembaService: DetEmbaService,
      private router: Router,private bonprepService: BonPrepService,) { }

      ngOnInit(){
        
        this.getExpideOfAdd();
        const now = Date.now()
        const myFormattedDate = this.datepipe.transform(now, 'yyyy-MM-dd hh:mm:ss');
        const myFormattedDate2 = this.datepipe.transform(now, 'yyyy-MM-dd');
          this.detembaForm = this.formBuilder.group({
            dateEmba:[myFormattedDate2, Validators.required],
            num: ['', Validators.compose([
                Validators.max(100),
                Validators.min(0),
                Validators.required,
                Validators.pattern('^([1-9][0-9]*)$')])
              ],
              qut: ['en_attente', Validators.required],
              bonprep_detEmbas: ['']
            });
    
          }
      // convenience getter for easy access to form fields
      get f() { return this.detembaForm.controls; }
    
      onSubmit() {
          this.submitted = true;
    
          // stop here if form is invalid
          if (this.detembaForm.invalid) {
            this.makeToast2();
              return;
          }
    
          // display form values on success
          alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.detembaForm.value, null, 4));
          this.saveEmba();
          this.makeToast(); 
          delay(3000);
          this.gotoListEmba();
      }
    
      onReset() {
          this.submitted = false;
          this.detembaForm.reset();
      } 
    
        saveEmba() {
            this.detembaService.createDet_emba(this.detembaForm.value).subscribe( data =>{
              console.log(data);
            },
            error => console.log(error));
          }
    
        gotoListEmba() {
          this.router.navigate(['//pages/Det_Embas/create-det-emba']);
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
    status2: NbComponentStatus = 'danger';
      
    title2 = 'HI there!';
    content2 = `des probleme de saisi!`;
    
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
    
    makeToast2() {
      this.showToast(this.status2, this.title2, this.content2);
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

    BonPrepList:Bon_prep[];
    public getExpideOfAdd() {
      this.bonprepService.getBon_prepsList().subscribe(data => {
        this.BonPrepList = data;
      });
    }
  }
  