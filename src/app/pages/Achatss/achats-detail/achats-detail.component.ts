import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { Table } from 'primeng/table';
import { Article } from '../../Articles/article';
import { ArticleService } from '../../Articles/article.service';
import { Art_acha } from '../../Art_Achas/art-acha';
import { ArtAchaService } from '../../Art_Achas/art-acha.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { MarqueService } from '../../Marques/marque.service';
import { PagesComponent } from '../../pages.component';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { Achats } from '../Achats';
import { AchatsService } from '../achats.service';

@Component({
  selector: 'ngx-achats-detail',
  templateUrl: './achats-detail.component.html',
  styleUrls: ['./achats-detail.component.scss']
})
export class AchatsDetailComponent implements OnInit {
  roles:string[];
  achats:Achats;
  artachas:any[] = [];
  achatss: any[] = [];
  users: Utilisateur[];
  numDocAchat: string;
  statuses: any[];
  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(private achatsService: AchatsService , private toastrService: NbToastrService, private marqueService : MarqueService,private articleService : ArticleService, private artAchaService : ArtAchaService,private router : Router,private _Activatedroute :ActivatedRoute,private pagesComponent: PagesComponent,private authService: TokenStorageService) { }

  ngOnInit() {
      

    this.achats = new Achats();

    this.numDocAchat = this._Activatedroute.snapshot.params['numDocAchat'];
  
    this.achatsService.getArtAchaForAchats(this.numDocAchat).subscribe(data => {
      this.artachas = data;
      this.loading = false;
    });

    this.achatsService.getAchatss(this.numDocAchat).subscribe(data => {
      this.achats = data;
      console.log(data)
    });
  }


  clear(table: Table) {
      table.clear();
  }

  list(){
    this.router.navigate(['achats']);
  }

    /**Popaps for inside table */
    displayModal: boolean;
    position: string;
    displayPositionQutLiv: boolean;
    displayPositionBonise: boolean;
    displayPositionPrixAch: boolean;
    displayPositionPrixVen: boolean;
    displayPositionTva: boolean;
    displayPositionDate: boolean;
    displayPositionPrixAMp: boolean;
    displayPositionCentre: boolean;
    displayPositionQutNonTrouver: boolean;
    image_id: number;
    image_idString:string;
    artic:Article;
    showModalDialog(clicked_id) {
      this.image_id=clicked_id;
      this.image_idString=this.image_id.toString();
      this.articleService.getArticle(this.image_idString).subscribe(data => {
        this.artic = data;
        console.log(this.artic);
      });
      this.displayModal = true;
    }
    showPositionDialogBonise(position: string) {
      this.position = position;
      this.displayPositionBonise = true;
    }
    showPositionDialogPrixAch(position: string) {
      this.position = position;
      this.displayPositionPrixAch = true;
    }
    showPositionDialogPrixVen(position: string) {
      this.position = position;
      this.displayPositionPrixVen = true;
    }
    showPositionDialogTva(position: string) {
      this.position = position;
      this.displayPositionTva = true;
    }
    showPositionDialogPrixAMp(position: string) {
      this.position = position;
      this.displayPositionPrixAMp = true;
    }
    showPositionDialogCentre(position: string) {
      this.position = position;
      this.displayPositionCentre = true;
    }
    Alz1:number;
    Alz2:number;
    showPositionDialogqutNonTrouver(position: string,event2:number,event3:number) {
      this.Alz1=event2;
      this.Alz2=event3;
      this.position = position;
      this.displayPositionQutNonTrouver = true;
    }

/**modification des CumulRet Rem Exp Etage2 Remise Qut Livrais(expedition)*/
displayModifierQutNonTrouver:boolean=false;
qutLiv:number;
codArtExp:string;
ModifierNonT(){
  this.displayModifierQutNonTrouver=true;
}

artAcha: Art_acha = new Art_acha();
ModifierNonTEnter(qutNonTrouver:number){
    if(this.Alz1==null || !this.Alz1){
      this.Alz1=0;
    }
    this.artAcha.qutNonTrouver =qutNonTrouver;
    console.log(qutNonTrouver);
    console.log(this.artAcha.qutNonTrouver);
    this.artAchaService.updateArt_acha(this.Alz2.toString(),this.artAcha).subscribe(data => {
        console.log(data); 
        this.displayPositionQutNonTrouver = false;
        this.displayModifierQutNonTrouver=false;
        this.codArtExp='';
        this.ngOnInit();
        this.makeToast();
    }), error => console.log(error);
}
/**modification des CumulRet Rem Exp Etage2 Remise Qut Livrais(expedition)*/





        /** toaster show start */
        config: NbToastrConfig;

        index = 1;
        destroyByClick = true;
        duration = 4000;
        hasIcon = true;
        positionn: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_RIGHT;
        preventDuplicates = false;
        
        status: NbComponentStatus = 'success';
        
        title = 'Quantité non trouver valider!';
        content = `Quantité est ${this.artAcha.qutNonTrouver}`;
        
        status2: NbComponentStatus = 'danger';
          
        title2 = 'La validation Quantité non trouver!';
        content2 = `Quantité non trouver est Non valier!`;
        
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
            position: this.positionn,
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
