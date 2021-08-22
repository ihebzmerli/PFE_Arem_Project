import { Component, OnInit } from '@angular/core';
import { Chariot } from '../chariot';
import { ChariotService } from '../chariot.service';
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
import { delay } from 'rxjs/operators';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-create-chariot',
  templateUrl: './create-chariot.component.html',
  styleUrls: ['./create-chariot.component.scss']
})
export class CreateChariotComponent implements OnInit {
  chariotForm: FormGroup;

  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';
  
  chariot: Chariot = new Chariot();
  submitted = false;
  date: Date;
constructor(private authService: TokenStorageService,protected dateService: NbDateService<Date>,public datepipe: DatePipe,private formBuilder: FormBuilder,private toastrService: NbToastrService, private chariotService: ChariotService,
    private router: Router) { }

    myFunction(){
      this.date=new Date();
      let latest_date =this.datepipe.transform(this.date, 'yyyy-mm-dd hh:mm:ss');
      return latest_date;
     }

     lastId:any;
     getLastId(){
      this.chariotService.getLastIdChariot().subscribe(data => {
        this.lastId = data;
        console.log(this.lastId);
      });
     }
     
    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
    ngOnInit() {
      
      this.getChariots();
      this.getLastId();
    const now = Date.now()
    const myFormattedDate = this.datepipe.transform(now, 'yyyy-MM-dd hh:mm:ss');
    const myFormattedDate2 = this.datepipe.transform(now, 'yyyy-MM-dd HH:mm:ss.SSSZ');
      this.chariotForm = this.formBuilder.group({
        datchariot:[new Date(), Validators.required],
        numChar: ['', Validators.compose([
            Validators.max(100),
            Validators.min(0),
            Validators.required,
            Validators.pattern('^([1-9][0-9]*)$')])
          ],
          etat_char: ['en_attente', Validators.required]
        });
      }
  // convenience getter for easy access to form fields
  get f() { return this.chariotForm.controls; }
  chariots: Chariot[];
  private getChariots() {
    this.chariotService.getChariotsList().subscribe(data => {
      this.chariots = data;
    });
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.chariotForm.invalid) {
        this.makeToast2();
          return;
      }
      var target=this.chariots.find(temp=>temp.numChar==this.chariotForm.controls.numChar.value)
    if(target){
      return this.makeToast3();
    }else {
      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.chariotForm.value, null, 4));
      this.saveChariot();
      this.makeToast(); 
      delay(3000);
      this.gotoListChariot();
    }
  }
  datchariotSave:Date;
  onReset() {
      this.submitted = false;
      this.datchariotSave=this.chariotForm.controls.datBon.value;
      this.chariotForm.reset()
      this.chariotForm.get('datchariot').setValue(this.datchariotSave);
  } 

    saveChariot() {
        this.chariotService.createChariot(this.chariotForm.value).subscribe( data =>{
          console.log(data);
        },
        error => console.log(error));
      }

    gotoListChariot() {
      this.router.navigate(['//pages/Chariots/chariot-list']);
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
content = `L Chariot est ajouter!`;

status2: NbComponentStatus = 'danger';
  
title2 = 'HI there!';
content2 = `des probleme de saisi!`;

status3: NbComponentStatus = 'warning';

title3 = 'L addition n est pas faite Chariot exist!';
content3 = `saisir n'est pas comptet!`;

status5: NbComponentStatus = 'info';

title5 = 'L addition est en cours !';
content5 = `Veuillez attendre le traitement des données!`;
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
makeToast5() {
  this.showToast(this.status5, this.title5, this.content5);
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


/** progression bar */

progress=0;
displayModalBarProgression: boolean;
  async showModalDialogBarProgression() {
  this.progress=0;
  this.displayModalBarProgression = true;
  this.makeToast5();
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
