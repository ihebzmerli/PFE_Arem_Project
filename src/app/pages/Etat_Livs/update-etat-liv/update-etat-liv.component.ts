import { Component, OnInit } from '@angular/core';
import { EtatLivService } from '../etat-liv.service';
import { Etat_liv } from '../etat-liv';
import { Router, ActivatedRoute } from '@angular/router';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
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
import { delay } from 'rxjs/operators';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-update-etat-liv',
  templateUrl: './update-etat-liv.component.html',
  styleUrls: ['./update-etat-liv.component.scss']
})
export class UpdateEtatLivComponent implements OnInit {

  etatliv:Etat_liv;
  artpreps:any[] = [];
  bonlivs: any[] = [];
  users: Utilisateur[];
  id: string;
  statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  /**start the update  */

  etatLivForm: FormGroup;
  submitted = false;
  date: Date;

  /**end update */
  constructor(private authService: TokenStorageService,public datepipe: DatePipe,private formBuilder: FormBuilder,private toastrService: NbToastrService,private etatlivService: EtatLivService , private router : Router,private _Activatedroute :ActivatedRoute) { }
  test1:string;
  dateTest:Date;
  ngOnInit() {
    
    this.etatliv = new Etat_liv();

    this.id = this._Activatedroute.snapshot.params['id'];
    
    this.etatlivService.getEtat_liv(this.id).subscribe(data => {
      this.etatliv = data;
      this.test1=this.etatliv.bonLiv.numBon;
      //this.etatliv.date = moment(this.datepipe.transform(this.etatliv.date, 'yyyy-MM-dd hh:mm:ss'),'yyyy-MM-dd hh:mm:ss').toDate();
      this.loading = false;
      console.log(data)
    });
    this.dateTest = this.etatliv.date;
  }
  
  onSubmitBon() {
    this.updateEtat_liv();
    this.makeToast(); 
    delay(4000);
    this.etat_liv_list();
  } 
  updateEtat_liv(){
    this.etatlivService.updateEtat_liv(this.id,this.etatliv).subscribe(data => {
      console.log(data);
      this.etatliv = new Etat_liv();
    }, error => console.log(error));
  }
  etat_liv_list(){
  this.router.navigate(['//pages/Etat_Livs/etat-liv-list']);
}

onReset() {
  this.submitted = false;
  console.log(this.dateTest);
  this.etatLivForm.reset();
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
content = `L'Etat liv' a été modifier!`;

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
}