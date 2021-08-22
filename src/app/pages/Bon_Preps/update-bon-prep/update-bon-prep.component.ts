import { Component, OnInit } from '@angular/core';
import { Bon_prep } from '../bon-prep';
import { ActivatedRoute, Router } from '@angular/router';
import { BonPrepService } from '../bon-prep.service';
import { NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { delay } from 'rxjs/operators';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-update-bon-prep',
  templateUrl: './update-bon-prep.component.html',
  styleUrls: ['./update-bon-prep.component.scss']
})
export class UpdateBonPrepComponent implements OnInit {
  bonPrepForm: FormGroup;
  numBon: string;
  bonprep: Bon_prep = new Bon_prep();
  bonprepGet: Bon_prep;
  submitted = false;
  constructor(private authService: TokenStorageService,private toastrService: NbToastrService,private formBuilder: FormBuilder,public datepipe: DatePipe,private route: ActivatedRoute,private router: Router,
    private bonprepService: BonPrepService) { }

    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
  ngOnInit() {
    
    this.bonprep = new Bon_prep();

    this.numBon = this.route.snapshot.params['numBon'];
    
    this.bonprepService.getBon_prep(this.numBon).subscribe(data => {
        console.log(data)
        this.bonprep = data;
        if(this.bonprep.nomprenomCli){
          var n = this.bonprep.nomprenomCli.search(" : ");
          this.bonprep.nomprenomCli = this.bonprep.nomprenomCli.slice(0, n);   
        }
      }, error => console.log(error));
  }

  
    async onSubmitBon() {
      this.updateBon_prep();
      await this.showModalDialogBarProgression();
      this.makeToast(); 
      this.bon_prep_list();
    } 
    updateBon_prep(){
      this.bonprepService.updateBon_prep(this.numBon,this.bonprep).subscribe(data => {
        console.log(data);
        this.bonprep = new Bon_prep();
      }, error => console.log(error));
    }
  bon_prep_list(){
    this.router.navigate(['//pages/Bon_Preps/bon-prep-list']);
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
content = `La bon Preparation a été modifier!`;

status2: NbComponentStatus = 'danger';

title2 = 'La modification n est pas faite avec succée!';
content2 = `Erreur de modification!`;

status3: NbComponentStatus = 'warning';

title3 = 'La modification n est pas faite!';
content3 = `La modification n'a rien changé!`;
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