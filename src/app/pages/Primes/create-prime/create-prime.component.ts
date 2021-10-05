import { Component, OnInit } from '@angular/core';
import { Prime } from '../prime';
import { PrimeService } from '../prime.service';
import { Router } from '@angular/router';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Control } from 'leaflet';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-create-prime',
  templateUrl: './create-prime.component.html',
  styleUrls: ['./create-prime.component.scss']
})
export class CreatePrimeComponent implements OnInit {
  
  /** teamplate Ajouter */
  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';


/** ********************* */
  primeForm: FormGroup;
  submitted = false;
  date: Date;

  constructor(private authService: TokenStorageService,public datepipe: DatePipe,private formBuilder: FormBuilder,private toastrService: NbToastrService, private primeService: PrimeService,
    private router: Router) { }
    
    myFunction(){
      this.date=new Date();
      let latest_date =this.datepipe.transform(this.date, 'yyyy-mm-dd hh:mm:ss');
      return latest_date;
     }
  ngOnInit() {
    const now = Date.now()
    const myFormattedDate = this.datepipe.transform(now, 'yyyy-MM-dd hh:mm:ss');
    const myFormattedDate2 = this.datepipe.transform(now, 'yyyy-MM-dd');
      this.primeForm = this.formBuilder.group({
          raison: ['', Validators.compose([
            Validators.maxLength(30),
            Validators.minLength(5),
            Validators.required,
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
          ])],
          categorie: ['', Validators.compose([
            Validators.maxLength(4),
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9 ]+$')
          ])],
          objMin: ['', Validators.compose([
            Validators.min(0),
            Validators.required,
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          objMax: ['', Validators.compose([
            Validators.min(0),
            Validators.required,
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          ca: ['', Validators.compose([
            Validators.min(0),
            Validators.required,
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          caN1: ['', Validators.compose([
            Validators.min(0),
            Validators.required,
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          derMvt: [ myFormattedDate2, Validators.required],
          mort: ['', Validators.compose([
            Validators.min(0),
            Validators.required,
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          artSpec: ['',  Validators.compose([
            Validators.required
          ])],
          prime: ['', Validators.compose([
            Validators.min(0),
            Validators.required,
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          bloc: ['', Validators.compose([
            Validators.maxLength(1),
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9 ]+$')
          ])],
          nbArt: ['', Validators.compose([
            Validators.min(0),
            Validators.required,
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          marge: ['', Validators.compose([
            Validators.min(0),
            Validators.required,
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.primeForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.primeForm.invalid) {
        this.makeToast2();
          return;
      }
      this.savePrime();
      this.makeToast(); 
      this.prime_list();
  }
  derMvtSave:Date;
  onReset() {
      this.submitted = false;
      this.derMvtSave=this.primeForm.controls.derMvt.value;
      this.primeForm.reset()
      this.primeForm.get('derMvt').setValue(this.derMvtSave);
  } 

  prime_list(){
    this.router.navigate(['//pages/Primes/prime-list']);
  }

/**start the add */
prime: Prime = new Prime();
savePrime() {
  this.primeService.createPrime(this.primeForm.value).subscribe( data =>{
    console.log(data);
  },
  error => console.log(error));
}



  /**toaster show start */
  config: NbToastrConfig;

  index = 1;
  destroyByClick = true;
  duration = 4000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  
  status: NbComponentStatus = 'success';
  
  title = 'La modification faite avec succée!';
  content = `La prime a été modifier!`;
  
  status2: NbComponentStatus = 'danger';
  
  title2 = 'La modification n est pas faite avec succée!';
  content2 = `Erreur de modification!`;
  
  status3: NbComponentStatus = 'warning';
  
  title3 = 'La modification n est pas faite!';
  content3 = `La modification n'a rien changé!`;
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
      
      



      /**validation form validation section */



      /** end validation section */
}
  