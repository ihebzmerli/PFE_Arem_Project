import { Component, OnInit } from '@angular/core';
import { Model } from '../model';
import { ModelService } from '../model.service';
import { Router } from '@angular/router';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
  NbDateService,
} from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';
import { PrimeService } from '../../Primes/prime.service';
import { Prime } from '../../Primes/prime';
import { Marque } from '../../Marques/marque';
import { MarqueService } from '../../Marques/marque.service';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-create-model',
  templateUrl: './create-model.component.html',
  styleUrls: ['./create-model.component.scss']
})
export class CreateModelComponent implements OnInit {

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
  constructor(private authService: TokenStorageService,private marqueService: MarqueService ,protected dateService: NbDateService<Date>,public datepipe: DatePipe,private formBuilder: FormBuilder,private toastrService: NbToastrService, private modelService: ModelService,
      private router: Router) { }

    ngOnInit() {
      this.getModels();
      this.getMarqueOfAdd();
        this.modelForm = this.formBuilder.group({
            code: ['', Validators.compose([
              Validators.maxLength(200),
              Validators.minLength(3),
              Validators.required
            ])],
            title: ['', Validators.compose([
              Validators.maxLength(200),
              Validators.minLength(3),
              Validators.required
            ])],
            marque: ['']
        });

    }
  
    // convenience getter for easy access to form fields
    get f() { return this.modelForm.controls; }
    models: Model[];
    private getModels() {
      this.modelService.getModelsList().subscribe(data => {
        this.models = data;
      });
    }

    onSubmit() {
      this.modelForm.patchValue({
        marque: this.selectedMarque
      });
        this.submitted = true;
        console.log(this.modelForm);
        // stop here if form is invalid
        if (this.modelForm.invalid || this.modelForm.controls.marque.value==null) {
          this.makeToast2();
            return;
        }
        var target=this.models.find(temp=>temp.code==this.modelForm.controls.code.value || temp.title==this.modelForm.controls.title.value)
        if(target){
          return this.makeToast4();
        }else { 
        // display form values on success
        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.modelForm.value, null, 4));
        this.saveModel();
        this.makeToast(); 
        this.gotoListMarque();
        }
    }

    onReset() {
      console.log(this.selectedMarque);
        this.submitted = false;
        this.modelForm.reset();
    } 
    
    gotoListMarque($myParam: string = ''): void {
      const navigationDetails: string[] = [`//pages/Models/model-list/${this.selectedMarque.id}`];
      if($myParam.length) {
        navigationDetails.push($myParam);
      }
      this.router.navigate(navigationDetails);
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
    
        title = 'L addition faite avec succée!';
        content = `Model est ajouter!`;
    
        status2: NbComponentStatus = 'danger';
    
        title2 = 'L addition n est pas faite !!!';
        content2 = `Erreur de saisir!`;
    
        status4: NbComponentStatus = 'warning';

        title4 = 'L addition n est pas faite Model Existe deja!';
        content4 = `saisir n'est pas comptet!`;

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
        makeToast4() {
          this.showToast(this.status4, this.title4, this.content4);
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
  