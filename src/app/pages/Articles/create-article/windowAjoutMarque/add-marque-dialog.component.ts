import { DatePipe } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbDateService, NbDialogRef, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { Marque } from '../../../Marques/marque';
import { MarqueService } from '../../../Marques/marque.service';
import { PagesComponent } from '../../../pages.component';
import { CreateArticleComponent } from '../create-article.component';

@Component({
  selector: 'ngx-add-marque-dialog',
  templateUrl: 'add-marque-dialog.component.html',
  styleUrls: ['add-marque-dialog.component.scss'],
})
export class AddMarqueDialogComponent {
  fileInfos: Observable<any>;
  
  @Input() title: string;

  /** teamplate Ajouter */
  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';

  /** ********************* */
  marqueForm: FormGroup;
  date: Date;
  marque: Marque = new Marque();
  submitted = false;
  constructor(private authService: TokenStorageService,protected dateService: NbDateService<Date>,public datepipe: DatePipe,private formBuilder: FormBuilder,private toastrService: NbToastrService, private marqueService: MarqueService,
    protected ref: NbDialogRef<AddMarqueDialogComponent>,private router: Router,private _Activatedroute :ActivatedRoute) {}

  cancel() {
    this.ref.close();
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
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

    async onSubmit() {
        this.submitted = true;
        console.log(this.marqueForm);
        // stop here if form is invalid
        if (this.marqueForm.invalid) {
          this.makeToast2();
            return;
        }
  
        // display form values on success
        this.saveMarque();
        this.makeToast(); 
        await this.delay(1000);
        
        this.cancel();
    }

  /**start the add */
  saveMarque(){
     const formData = new FormData();
     const marque = this.marqueForm.value;
     formData.append('marque',JSON.stringify(marque));
     formData.append('file',this.userFile);
    this.marqueService.createMarque2(formData).subscribe( data =>{
      console.log(data);
      this.ngOnInit();
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
  if(mimeType.match(/image\/jpeg/) === null && mimeType.match(/image\/png/) === null){
    this.makeToast3();
  }else{

  var reader = new FileReader();
  
  this.imagePath = file;
  reader.readAsDataURL(file);
  reader.onload = (_event) => {
    this.imgURL = reader.result;
  }
}
}
}

  /**upload image article */

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
        
        status3: NbComponentStatus = 'warning';

        title3 = 'Image doit etre de type png,jpg,jpeg!';
        content3 = `Fichier de type eronée!`;
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
        makeToast3() {
          this.showToast(this.status3, this.title3, this.content3);
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
