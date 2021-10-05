import { Component, OnInit } from '@angular/core';
import { Det_emba } from '../det-emba';
import { DetEmbaService } from '../det-emba.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { UtilisateurService } from '../../Utilisateurs/utilisateur.service';
import { BonPrepService } from '../../Bon_Preps/bon-prep.service';
import { NbComponentStatus, NbDateService, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Bon_prep } from '../../Bon_Preps/bon-prep';

@Component({
  selector: 'ngx-update-det-emba',
  templateUrl: './update-det-emba.component.html',
  styleUrls: ['./update-det-emba.component.scss']
})
export class UpdateDetEmbaComponent implements OnInit {

  id: bigint;
  userPost: Utilisateur;
  poste: any;
  TypEmbaList;
  detemba: Det_emba = new Det_emba();
  submitted = false;
  detembaForm: FormGroup;
  detemba2modif: Det_emba;
  constructor(private authService: TokenStorageService,private route: ActivatedRoute,protected dateService: NbDateService<Date>,public datepipe: DatePipe,private formBuilder: FormBuilder,private toastrService: NbToastrService, private detembaService: DetEmbaService,
    private router: Router,private bonprepService: BonPrepService,public utilisateurService: UtilisateurService) { }

  ngOnInit() {
    this.getExpideOfAdd();
    const now = Date.now()
    const myFormattedDate = this.datepipe.transform(now, 'yyyy-MM-dd hh:mm:ss');
    const myFormattedDate2 = this.datepipe.transform(now, 'yyyy-MM-dd'); 

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
        this.detemba.user=this.userPost;
    }, error => console.log(error));
  }, error => console.log(error));
    this.detemba = new Det_emba();

    this.id = this.route.snapshot.params['id'];
    
    this.detembaService.getDet_emba(this.id)
      .subscribe(data => {
        console.log(data);
        this.detemba2modif =data;
        this.detemba = data;
      }, error => console.log(error));
  }
  
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  BonPPSelected;
  isDisabled = false;
  async onSubmitDetemba() {
    if(this.detemba.typEmba==null || this.detemba.qut==null || this.detemba.bonprep_detEmbas==null){
      this.makeToast2(); 
    }
    else {
      this.updateDetemba();
      await this.showModalDialogBarProgression();
      await this.delay(1000);
      this.makeToast(); 
      this.Detemba_list();  
    }
  }
getOut:boolean
  updateDetemba(){  
    console.log(this.BonPPSelected);
    this.detemba.bonprep_detEmbas = this.BonPPSelected;
    this.detembaService.updateDet_emba(this.id,this.detemba).subscribe(data => {
      console.log(data);
    }, error => console.log(error));
}
  Detemba_list(){
    this.router.navigate(['//pages/Det_Embas/det-emba-list']);
  }

  onReset() {
    this.submitted = false;
    this.detembaForm.reset();
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
content = `L'emballage' a été modifier!`;

status2: NbComponentStatus = 'danger';

title2 = 'La modification n est pas faite avec succée!';
content2 = `Erreur de modification!`;

status3: NbComponentStatus = 'warning';

title3 = 'La modification est faite!';
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


BonPrepList:Bon_prep[];
public getExpideOfAdd() {
  this.bonprepService.getBon_prepsList().subscribe(data => {
    this.BonPrepList = data;
  });
}

}
