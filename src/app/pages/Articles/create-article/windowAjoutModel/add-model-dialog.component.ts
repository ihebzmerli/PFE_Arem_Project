import { DatePipe } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbDateService, NbDialogRef, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { Marque } from '../../../Marques/marque';
import { MarqueService } from '../../../Marques/marque.service';
import { Model } from '../../../Model/model';
import { ModelService } from '../../../Model/model.service';
import { PagesComponent } from '../../../pages.component';
import { CreateArticleComponent } from '../create-article.component';

@Component({
  selector: 'ngx-add-model-dialog',
  templateUrl: 'add-model-dialog.component.html',
  styleUrls: ['add-model-dialog.component.scss'],
})
export class AddModelDialogComponent {

  fileInfos: Observable<any>;
  
  @Input() title: string;

  



  
  /** teamplate Ajouter */
  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';

  /** ********************* */
  modelForm: FormGroup;
  date: Date;
  model: Model = new Model();
  submitted = false;
  MarqueList : Marque[];
  selectedMarque : Marque;
  constructor(private authService: TokenStorageService,protected dateService: NbDateService<Date>,public datepipe: DatePipe,private formBuilder: FormBuilder,private toastrService: NbToastrService, private modelService: ModelService,
    protected ref: NbDialogRef<AddModelDialogComponent>,private router: Router,private _Activatedroute :ActivatedRoute, private marqueService: MarqueService) {}

  cancel() {
    this.ref.close();
  }

  ngOnInit() {
    
    this.getMarqueOfAdd();
    this.modelForm = this.formBuilder.group({
      code: ['', Validators.compose([
        Validators.maxLength(200),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9 ]+$'),
        Validators.required
      ])],
      title: ['', Validators.compose([
        Validators.maxLength(200),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9 ]+$'),
        Validators.required
      ])],
      marque: ['']
  });

}
  
    // convenience getter for easy access to form fields
    get f() { return this.modelForm.controls; }
    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
    async onSubmit() {
      this.modelForm.patchValue({
        marque: this.selectedMarque
      });
        this.submitted = true;
        console.log(this.modelForm);
        // stop here if form is invalid
        if (this.modelForm.invalid) {
          this.makeToast2();
            return;
        }
  
        // display form values on success
        this.saveModel();
        this.makeToast(); 
        await this.delay(1000);
        this.ref.close();
    }

  /**start the add */
  saveModel() {

    this.modelService.createModel(this.modelForm.value).subscribe( data =>{
      console.log(data);
    },
    error => console.log(error));
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
    
        title1 = 'HI there!';
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
          this.showToast(this.status, this.title1, this.content);
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
        
        

                
        public getMarqueOfAdd() {
          this.marqueService.getMarquesList().subscribe(data => {
            this.MarqueList = data;
          });
        }
}
