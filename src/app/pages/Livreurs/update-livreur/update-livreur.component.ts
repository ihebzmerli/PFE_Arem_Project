import { Component, OnInit } from '@angular/core';
import { Livreur } from '../livreur';
import { LivreurService } from '../livreur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbComponentStatus, NbDialogService, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { delay } from 'rxjs/operators';
import { Prime } from '../../Primes/prime';
import { PrimeService } from '../../Primes/prime.service';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-update-livreur',
  templateUrl: './update-livreur.component.html',
  styleUrls: ['./update-livreur.component.scss']
})
export class UpdateLivreurComponent implements OnInit {
  livreurForm: FormGroup;
  submitted = false;
  livreur: Livreur = new Livreur();
  id_livreur: string;
  nature: any;
  PrimeList: Prime[];
  selectedPrime: Prime;
  authority;
  constructor(private authService: TokenStorageService,private primeService: PrimeService ,private dialogService: NbDialogService,private toastrService: NbToastrService,private formBuilder: FormBuilder,public datepipe: DatePipe,private route: ActivatedRoute,private router: Router,
    private livreurService: LivreurService) { }

  ngOnInit() {    
    this.authService.getAuthorities().forEach(authority => {
      this.authority=authority.toString();
      console.log(this.authority);
    });
    this.getLivreurOfAdd();
    this.livreur = new Livreur();

    this.id_livreur = this.route.snapshot.params['id_livreur'];
    
    this.livreurService.getLivreur(this.id_livreur)
      .subscribe(data => {
        console.log(data)
        this.livreur = data;

        if(this.livreur.datreclam!=null){
          this.livreur.datreclam=new Date(this.livreur.datreclam.toLocaleString());
          this.livreur.datreclam.setMinutes(this.livreur.datreclam.getMinutes() + this.livreur.datreclam.getTimezoneOffset());
          }else{
            this.livreur.datreclam=null;
          }
          if(this.livreur.datrepon!=null){
            this.livreur.datrepon=new Date(this.livreur.datrepon.toLocaleString());
            this.livreur.datrepon.setMinutes(this.livreur.datrepon.getMinutes() + this.livreur.datrepon.getTimezoneOffset());
            }else{
              this.livreur.datrepon=null;
            }

      }, error => console.log(error));
  }

  onSubmitLivreur() {
    this.updateLivreur();
    this.makeToast(); 
    delay(4000);
    this.livreur_list();
  }

  updateLivreur(){  
    if(this.livreur.datreclam!=null){
      this.livreur.datreclam.setDate(this.livreur.datreclam.getDate() + 1);
    }else{
      this.livreur.datreclam=null ;
    }
    if(this.livreur.datrepon!=null){
      this.livreur.datrepon.setDate(this.livreur.datrepon.getDate() + 1);
    }else{
      this.livreur.datrepon=null ;
    } 
    this.livreurService.updateLivreur(this.id_livreur,this.livreur).subscribe(data => {
      console.log(data);
      this.livreur = new Livreur();
    }, error => console.log(error));
}
  livreur_list(){
    this.router.navigate(['//pages/Livreurs/livreur-list']);
  }
  onReset() {
    this.submitted = false;
    this.livreurForm.reset();
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
content = `Livreur a été modifier!`;

status2: NbComponentStatus = 'danger';

title2 = 'La modification n est pas faite avec succée!';
content2 = `Erreur de modification!`;

status3: NbComponentStatus = 'warning';

title3 = 'La modification n est pas faite stk est vide!';
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

public getLivreurOfAdd() {
  this.primeService.getPrimesList().subscribe(data => {
    this.PrimeList = data;
  });
}

}