import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { delay } from 'rxjs/operators';
import { TokenStorageService } from '../../auth/token-storage.service';
import { PagesComponent } from '../../pages.component';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { UtilisateurService } from '../../Utilisateurs/utilisateur.service';
import { Vehicule } from '../../Vehicules/vehicule';
import { VehiculeService } from '../../Vehicules/vehicule.service';
import { Bon_sort } from '../bon-sort';
import { BonSortService } from '../bon-sort.service';

@Component({
  selector: 'ngx-update-bon-sort',
  templateUrl: './update-bon-sort.component.html',
  styleUrls: ['./update-bon-sort.component.scss']
})
export class UpdateBonSortComponent implements OnInit {
  bonSortForm: FormGroup;
  numBon: string;
  bonsort: Bon_sort = new Bon_sort();
  bonsortGet: Bon_sort;
  submitted = false;
  userPost: Utilisateur;
poste: any;
  constructor(private authService: TokenStorageService,private toastrService: NbToastrService,private formBuilder: FormBuilder,public datepipe: DatePipe,private route: ActivatedRoute,private router: Router,
    private bonsortService: BonSortService,public vehiculeService:VehiculeService,public utilisateurService:UtilisateurService) { }


    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
    
  ngOnInit() {
    this.getVehicules();
    this.bonsort = new Bon_sort();
    this.numBon = this.route.snapshot.params['numBon'];
    
    this.utilisateurService.getIdUserByUsername(this.authService.getUsername()).subscribe(data1 => {
      this.utilisateurService.getUtilisateur(data1.toString()).subscribe(data => {
        this.userPost = data;
        this.poste = this.userPost.firstname+' '+this.userPost.lastname;
        this.bonsort.user = this.userPost;


    this.bonsortService.getBon_sort(this.numBon).subscribe(data => {
        console.log(data)
        this.bonsort = data;
        this.bonsort.datBon = new Date(Date().toLocaleString());
        this.bonsort.datBon.setMinutes(this.bonsort.datBon.getMinutes() + this.bonsort.datBon.getTimezoneOffset() + 120);
      }, error => console.log(error));   
    }, error => console.log(error));
  }, error => console.log(error));   
  }
  
    async onSubmitBon() {

      this.updateBon_sort();
      this.makeToast(); 
      await this.showModalDialogBarProgression();
      this.bon_sort_list();
    } 
    updateBon_sort(){
      this.bonsort.poste =this.poste;
      console.log(this.bonsort);
      this.bonsortService.updateBon_sort(this.numBon,this.bonsort).subscribe(data => {
        console.log(data);
        this.bonsort = new Bon_sort();
      }, error => console.log(error));
    }

  bon_sort_list(){
    this.router.navigate(['//pages/Bon_Sorts/bon-sort-list']);
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
  await this.delay(500);
  this.progress=15;
  await this.delay(500);
  this.progress=37;
  await this.delay(500);
  this.progress=62;
  await this.delay(500);
  this.progress=87;
  await this.delay(500);
  this.progress=99;
  await this.delay(500);
  this.progress=100;
  this.displayModalBarProgression=false;
}


/**end progression bar */

VehiculeList: Vehicule[];
private getVehicules(){
  this.vehiculeService.getVehiculesList().subscribe(data => {
    this.VehiculeList = data;
  });
}


/** end add of a chariot to the bon sortie */
}
