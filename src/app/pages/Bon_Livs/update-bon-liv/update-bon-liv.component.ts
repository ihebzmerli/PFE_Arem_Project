import { Component, OnInit } from '@angular/core';
import { Bon_liv } from '../bon-liv';
import { ActivatedRoute, Router } from '@angular/router';
import { BonLivService } from '../bon-liv.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { Fournis } from '../../Fourniss/fournis';
import { FournisService } from '../../Fourniss/fournis.service';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-update-bon-liv',
  templateUrl: './update-bon-liv.component.html',
  styleUrls: ['./update-bon-liv.component.scss']
})
export class UpdateBonLivComponent implements OnInit {
  bonLivForm: FormGroup;
  FournisList: Fournis[];
  submitted = false;
  numBon: string;
  bonliv: Bon_liv = new Bon_liv();
  bonlivGet:Bon_liv;
  editForm: FormGroup;
  items :any;
  selectedCodFrs : Fournis;
  constructor(private authService: TokenStorageService, private fournisService:FournisService,private toastrService: NbToastrService,private formBuilder: FormBuilder,public datepipe: DatePipe,private route: ActivatedRoute,private router: Router,
    private bonlivService: BonLivService) { }

    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
  ngOnInit() {
    
    this.getFournissList();
    this.bonliv = new Bon_liv();

    this.numBon = this.route.snapshot.params['numBon'];
    
    this.bonlivService.getBon_liv(this.numBon).subscribe(data => {
        console.log(data)
        this.bonliv= data;
        if(this.bonliv.fournis){
          this.selectedCodFrs = this.bonliv.fournis;
        }
        if(this.bonliv.nomprenomCli){
          var n = this.bonliv.nomprenomCli.search(" : ");
          this.bonliv.nomprenomCli = this.bonliv.nomprenomCli.slice(0, n);   
        }
      }, error => console.log(error));
    }

  isDisabled = false;
  async onSubmitBon() {
    this.updateBon_liv();
    await this.showModalDialogBarProgression();
    await this.delay(1000);
    this.makeToast(); 
    this.bon_liv_list();
  }

  updateBon_liv(){  
    this.bonlivService.updateBon_liv(this.numBon,this.bonliv).subscribe(data => {
      console.log(data);
      this.bonliv.fournis = this.selectedCodFrs;
      this.bonliv = new Bon_liv();
    }, error => console.log(error));
}
  bon_liv_list(){
    this.router.navigate(['//pages/Bon_Livs/bon-liv-list']);
  }

  onReset() {
    this.submitted = false;
    this.bonLivForm.reset();
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
content = `La bon Livraison a été modifier!`;

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

public getFournissList() {
  this.fournisService.getFournissList().subscribe(data => {
    this.FournisList = data;
  });
}

onSelectionChanged(value) {
  console.log(value);
  if (value === 'false') {
    this.bonLivForm.get('codFrs').disable();
    this.bonLivForm.get('numBonFrs').disable();
    this.bonLivForm.get('nomprenomCli').enable();
    this.bonLivForm.get('adresseCli').enable();
  } else {
    this.bonLivForm.get('nomprenomCli').disable();
    this.bonLivForm.get('adresseCli').disable();
    this.bonLivForm.get('codFrs').enable();
    this.bonLivForm.get('numBonFrs').enable();
  }
}
}
