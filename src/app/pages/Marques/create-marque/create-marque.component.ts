import { Component, OnInit } from '@angular/core';
import { Marque } from '../marque';
import { MarqueService } from '../marque.service';
import { Router } from '@angular/router';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
  NbDateService,
  NbDialogService,
} from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';
import { PrimeService } from '../../Primes/prime.service';
import { Prime } from '../../Primes/prime';
import { NextStepToModelDialogComponent } from './next-step-to-model-dialog/next-step-to-model-dialog.component';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-create-marque',
  templateUrl: './create-marque.component.html',
  styleUrls: ['./create-marque.component.scss']
})
export class CreateMarqueComponent implements OnInit {

  /** teamplate Ajouter */
    starRate = 2;
    heartRate = 4;
    radioGroupValue = 'This is value 2';
  
  
  /** ********************* */
  marqueForm: FormGroup;
  date: Date;
  marque: Marque = new Marque();
  submitted = false;
  constructor(private authService: TokenStorageService,private dialogService: NbDialogService,protected dateService: NbDateService<Date>,public datepipe: DatePipe,private formBuilder: FormBuilder,private toastrService: NbToastrService, private marqueService: MarqueService,
      private router: Router) { }

    ngOnInit() {
        this.marqueForm = this.formBuilder.group({
            code: ['', Validators.compose([
              Validators.maxLength(200),
              Validators.minLength(3),
              Validators.pattern('^[a-zA-Z\s]+$'),
              Validators.required
            ])],
            title: ['', Validators.compose([
              Validators.maxLength(200),
              Validators.minLength(3),
              Validators.pattern('^[a-zA-Z\s]+$'),
              Validators.required
            ])]
        });

    }
  
    // convenience getter for easy access to form fields
    get f() { return this.marqueForm.controls; }
  
    onSubmit() {
        this.submitted = true;
        console.log(this.marqueForm);
        // stop here if form is invalid
        if (this.marqueForm.invalid) {
          this.makeToast2();
            return;
        }
  
        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.marqueForm.value, null, 4));
        this.saveMarque();
        this.makeToast(); 
        this.OpenDeletePopap()
    }

    dateSave:Date;
    onReset() {
        this.submitted = false;;
        this.marqueForm.reset();
    } 
    
    
  /**start the add */
  /**start the add */
  saveMarque(){
    const formData = new FormData();
    const marque = this.marqueForm.value;
    formData.append('marque',JSON.stringify(marque));
    formData.append('file',this.userFile);
   this.marqueService.createMarque2(formData).subscribe( data =>{
     console.log(data);
   },
   error => console.log(error));
 }

 /**upload image article */
userFile;
imgURL: any;
public imagePath;
onSelectFile(event){
  if(event.target.files.length > 0){
    const file =event.target.files[0];
    this.userFile =file;

    var mimeType = event.target.files[0].type;
    if(mimeType.match(/image\/*/) == null){
      console.log("Only images are supported.");
      return;
    }

    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
}
  
  
  
        /** toaster show start */
        config: NbToastrConfig;
  
        index = 1;
        destroyByClick = true;
        duration = 4000;
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



/* Rotation popap*/
  OpenDeletePopap() {
    this.dialogService.open(NextStepToModelDialogComponent, {
      context: {
        title: null,
      },
    });
  }
/* Rotation popap*/
  }
  