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
import { UtilisateurService } from '../../Utilisateurs/utilisateur.service';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
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
  TypEmbaList;
  /** teamplate Ajouter */
    starRate = 2;
    heartRate = 4;
    radioGroupValue = 'This is value 2';
    
    userPost: Utilisateur;
    poste: any;
  
  /** ********************* */
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  
  constructor(private authService: TokenStorageService,protected dateService: NbDateService<Date>,public datepipe: DatePipe,private formBuilder: FormBuilder,private toastrService: NbToastrService, private detembaService: DetEmbaService,
      private router: Router,private bonprepService: BonPrepService,public utilisateurService: UtilisateurService) { }

      ngOnInit(){
        
        this.getExpideOfAdd();
        const now = Date.now()
        const myFormattedDate = this.datepipe.transform(now, 'yyyy-MM-dd hh:mm:ss');
        const myFormattedDate2 = this.datepipe.transform(now, 'yyyy-MM-dd');
          this.detembaForm = this.formBuilder.group({
              dateEmba:[new Date(myFormattedDate), Validators.required],
              typEmba: [''],
              qut: [0, Validators.compose([
                Validators.max(100),
                Validators.min(1),
                Validators.required,
                Validators.pattern('^([1-9][0-9]*)$')])
              ],
              bonprep_detEmbas: [''],
              poste: [''],
              user:['']
            });
    

            this.TypEmbaList = [
              { label: '10x10', value: '10x10' },
              { label: '10x20', value: '10x20' },
              { label: '10x30', value: '10x30' },
              { label: '10x50', value: '10x50' },
              { label: '20x20', value: '20x20' },
              { label: '20x30', value: '20x30' },
              { label: '20x50', value: '20x50' },
              { label: '20x60', value: '20x60' },
              { label: '30x80', value: '30x80' },
              { label: '30x100', value: '30x100' },
              { label: '50x50', value: '50x50' },
              { label: '50x100', value: '50x100' },
              { label: '100x100', value: '100x100' },
              { label: '100x150', value: '100x150' },
              { label: '150x150', value: '150x150' }
          ];


          this.utilisateurService.getIdUserByUsername(this.authService.getUsername()).subscribe(data1 => {
            this.utilisateurService.getUtilisateur(data1.toString()).subscribe(data => {
              this.userPost = data;
              this.poste = this.userPost.firstname+' '+this.userPost.lastname;
              this.detembaForm.patchValue({
                poste: this.poste, 
                user: this.userPost,
              });
            }, error => console.log(error));
          }, error => console.log(error));
      }
      // convenience getter for easy access to form fields
      get f() { return this.detembaForm.controls; }
    
      async onSubmit() {
          this.submitted = true;
    
          // stop here if form is invalid
          if (this.detembaForm.invalid) {
            this.makeToast2();
              return;
          }
    
          // display form values on success
          this.saveEmba();
          await this.showModalDialogBarProgression();
          await this.delay(1000);
          this.makeToast(); 
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
          this.router.navigate(['//pages/Det_Embas/det-emba-list']);
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
    
    title = 'L addition faite avec succée!';
    content = `L'emballage est ajouter!`;

    status2: NbComponentStatus = 'danger';
      
    title2 = 'L addition n est pas faite !!!';
    content2 = `Erreur de saisir!`;
    
    status3: NbComponentStatus = 'info';

    title3 = 'L addition est en cours !';
    content3 = `Veuillez attendre le traitement des données!`;
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

    BonPrepList:Bon_prep[];
    public getExpideOfAdd() {
      this.bonprepService.getBon_prepsList().subscribe(data => {
        this.BonPrepList = data;
      });
    }





    /** progression bar */

progress=0;
displayModalBarProgression: boolean;
  async showModalDialogBarProgression() {
  this.progress=0;
  this.displayModalBarProgression = true;
  this.makeToast3();
  await this.delay(1000);
  this.progress=15;
  await this.delay(1000);
  this.progress=37;
  await this.delay(1000);
  this.progress=62;
  await this.delay(1000);
  this.progress=87;
  await this.delay(1000);
  this.progress=99;
  await this.delay(500);
  this.progress=100;
  this.delay(1500);
  this.displayModalBarProgression=false;
}


/**end progression bar */
  }
  