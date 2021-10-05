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
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    rectifForm: FormGroup;
  
  /** ********************* */
  
  rectif: Rectif = new Rectif();
  submitted = false;
  
  constructor(private authService: TokenStorageService,public datepipe: DatePipe,private formBuilder: FormBuilder,private toastrService: NbToastrService,
    private router: Router, private rectifService: RectifService) { }

      ngOnInit(): void {
        const now = Date.now()
        const myFormattedDate = this.datepipe.transform(now, 'yyyy-MM-dd hh:mm:ss');
        const myFormattedDate2 = this.datepipe.transform(now, 'yyyy-MM-dd');
          this.rectifForm = this.formBuilder.group({
              date: ['', Validators.compose([
                Validators.maxLength(30),
                Validators.minLength(5),
                Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
              ])],
              numDoc: ['', Validators.compose([
                Validators.min(0),
                Validators.required,
                Validators.pattern('^(0|[1-9][0-9]*)$')
              ])],
              qutArt: ['', Validators.compose([
                Validators.min(0),
                Validators.required,
                Validators.pattern('^(0|[1-9][0-9]*)$')
              ])],
              prixAch: ['', Validators.compose([
                Validators.min(0),
                Validators.required,
                Validators.pattern('^(0|[1-9][0-9]*)$')
              ])],
              observ: ['', Validators.compose([
                Validators.minLength(3),
                Validators.maxLength(100),
                Validators.pattern('^[a-zA-Z ]+$'),
                Validators.required
              ])],
              typMvt: ['', Validators.compose([
                Validators.minLength(3),
                Validators.maxLength(100),
                Validators.pattern('^[a-zA-Z ]+$'),
                Validators.required
              ])],
              numRec: ['', Validators.compose([
                Validators.min(3),
                Validators.max(100),
                Validators.required,
                Validators.pattern('^(0|[1-9][0-9]*)$')
              ])],
              centre: ['',  Validators.compose([
                Validators.minLength(3),
                Validators.maxLength(15),
                Validators.pattern('^[a-zA-Z ]+$'),
                Validators.required
              ])],
              reclam: ['', Validators.compose([
                Validators.min(3),
                Validators.max(100),
                Validators.required,
                Validators.pattern('^(0|[1-9][0-9]*)$')
              ])],
              cloture: ['', Validators.compose([
                Validators.min(0),
                Validators.max(500),
                Validators.required,
                Validators.pattern('^[0-9 ]+$')
              ])],
              obsReclam: ['', Validators.compose([
                Validators.minLength(3),
                Validators.maxLength(15),
                Validators.pattern('^[a-zA-Z ]+$'),
                Validators.required
              ])],
              datReclam: [myFormattedDate2, Validators.required],
              datRepon: [myFormattedDate2, Validators.required],
              datClotur: [myFormattedDate2, , Validators.required],
          });
      }
  
  // convenience getter for easy access to form fields
  get f() { return this.rectifForm.controls; }

        /**start the add */
      saveRectif() {
        this.rectifService.createRectif(this.rectifForm.value).subscribe( data =>{
          console.log(data);
        },
        error => console.log(error));
      }

      rectif_list(){
        this.router.navigate(['//pages/Rectifs/rectif-list']);
      }
      derMvtSave:Date;
      onReset() {
        this.submitted = false;
        this.derMvtSave=this.rectifForm.controls.derMvt.value;
        this.rectifForm.reset()
        this.rectifForm.get('date').setValue(this.derMvtSave);
    } 
      onSubmit() {
        this.submitted = true;
  
        // stop here if form is invalid
        if (this.rectifForm.invalid) {
          this.makeToast2();
            return;
        }
        this.saveRectif();
        this.makeToast(); 
        this.rectif_list();
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
            
                title = 'l`Addition est faite avec succéer!';
                content = `Réctif ajouter!`;
              
                status2: NbComponentStatus = 'danger';
                
                title2 = 'La modification n est pas faite avec succée!';
                content2 = `Erreur de modification!`;
                
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
  }
  