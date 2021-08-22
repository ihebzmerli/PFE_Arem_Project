import { Component, OnInit } from '@angular/core';
import { Livreur } from '../livreur';
import { LivreurService } from '../livreur.service';
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
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-create-livreur',
  templateUrl: './create-livreur.component.html',
  styleUrls: ['./create-livreur.component.scss']
})
export class CreateLivreurComponent implements OnInit {

  /** teamplate Ajouter */
    starRate = 2;
    heartRate = 4;
    radioGroupValue = 'This is value 2';
  
  
  /** ********************* */
  livreurForm: FormGroup;
  date: Date;
  livreur: Livreur = new Livreur();
  submitted = false;
  PrimeList : Prime[];
  selectedPrime : Prime;
  constructor(private authService: TokenStorageService,private primeService: PrimeService ,protected dateService: NbDateService<Date>,public datepipe: DatePipe,private formBuilder: FormBuilder,private toastrService: NbToastrService, private livreurService: LivreurService,
      private router: Router) { }
      myFunction(){
        this.date=new Date();
        let latest_date =this.datepipe.transform(this.date, 'yyyy-mm-dd hh:mm:ss');
        return latest_date;
       }
       
       latest_dat :string;
       ChangeDate(dat :any){

        return this.latest_dat =this.datepipe.transform(dat, 'yyyy-MM-dd');
      }

    ngOnInit() {
      
      this.getLivreurOfAdd();
      const now = Date.now()
      const myFormattedDate = this.datepipe.transform(now, 'yyyy-MM-dd hh:mm:ss');
      const myFormattedDate2 = this.datepipe.transform(now, 'yyyy-MM-dd');
        this.livreurForm = this.formBuilder.group({
            nom: ['', Validators.compose([
              Validators.maxLength(50),
              Validators.minLength(6),
              Validators.pattern('^[a-zA-Z\s]+$'),
              Validators.required
            ])],
            numrec: ['', Validators.compose([
              Validators.min(0),
              Validators.required,
              Validators.pattern('^(0|[1-9][0-9]*)$')
            ])],
            centre: ['', Validators.compose([
              Validators.maxLength(50),
              Validators.minLength(5),
              Validators.required,
              Validators.pattern('^[a-zA-Z\s]+$')
            ])],
            datreclam: ['', Validators.required],
            datrepon: ['', Validators.required],
            date: [ myFormattedDate2, Validators.required],
            objectif: [ '', Validators.compose([
              Validators.min(0),
              Validators.required,
              Validators.pattern('^(0|[1-9][0-9]*)$')
            ])],
            obsreclam: ['', Validators.compose([
              Validators.maxLength(200),
              Validators.minLength(5),
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9\s]+$')
            ])],
            observ: ['', Validators.compose([
              Validators.maxLength(200),
              Validators.minLength(5),
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9\s]+$')
            ])],
            prixach: [0],
            qutart: ['', Validators.compose([
              Validators.min(0),
              Validators.required,
              Validators.pattern('^(0|[1-9][0-9]*)$')
            ])],
            reclam: ['', Validators.compose([
              Validators.min(0),
              Validators.required,
              Validators.pattern('^(0|[1-9][0-9]*)$')
            ])],
            typmvt: ['', Validators.compose([
              Validators.maxLength(4),
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9 ]+$')
            ])],
            nature: ['EN_ATTEND', Validators.required],
            prime: ['']
        });

/*
        datcloturnew = this.ChangeDate(this.livreurForm.value.datclotur)
        let datreclamnew = this.ChangeDate(this.livreurForm.value.datreclam)
        let datreponurnew = this.ChangeDate(this.livreurForm.value.datrepon)
        let datenew = this.ChangeDate(this.livreurForm.value.date)
        this.livreurForm.setValue({
          nom: ['', Validators.required],
          numrec: ['', Validators.required],
          centre: ['', Validators.required],
          cloture: ['', Validators.required],
          datcloturnew: ['', Validators.required],
          datreclamnew: ['', Validators.required],
          datreponurnew: ['', Validators.required],
          datenew: [ '', Validators.required],
          objectif: [ '', Validators.required],
          numdoc: ['', Validators.required],
          obsreclam: ['', Validators.required],
          observ: ['', Validators.required],
          prixach: ['', Validators.required],
          qutart: ['', Validators.required],
          reclam: ['', Validators.required],
          typmvt: ['', Validators.required],
          nature: ['', Validators.required]
        });

        */
    }
  
    // convenience getter for easy access to form fields
    get f() { return this.livreurForm.controls; }
  
    onSubmit() {
      this.livreurForm.patchValue({
        prime: this.selectedPrime
      });
        this.submitted = true;
        console.log(this.livreurForm);
        // stop here if form is invalid
        if (this.livreurForm.invalid) {
          this.makeToast2();
            return;
        }
  
        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.livreurForm.value, null, 4));
        this.saveLivreur();
        this.makeToast(); 
    }
    dateSave:Date;
    onReset() {
        this.submitted = false;
        this.dateSave=this.livreurForm.controls.date.value;
        this.livreurForm.reset()
        this.livreurForm.get('date').setValue(this.dateSave);
    } 
    
    
  /**start the add */
  saveLivreur() {

    this.livreurService.createLivreur(this.livreurForm.value).subscribe( data =>{
      console.log(data);
    },
    error => console.log(error));
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
        
        public getLivreurOfAdd() {
          this.primeService.getPrimesList().subscribe(data => {
            this.PrimeList = data;
          });
        }
  }
  