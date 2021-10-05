import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Bon_liv } from '../bon-liv';
import { BonLivService } from '../bon-liv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { Xcommand } from '../../Xcommand/Xcommand';
import { ArticleService } from '../../Articles/article.service';
import { MarqueService } from '../../Marques/marque.service';
import { Article } from '../../Articles/article';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-bon-liv-detail',
  templateUrl: './bon-liv-detail.component.html',
  styleUrls: ['./bon-liv-detail.component.scss']
})
export class BonLivDetailComponent implements OnInit {
  bonliv:Bon_liv;
  artterms:any[] = [];
  artlivs:any[] = [];
  bonlivs: any[] = [];
  users: Utilisateur[];
  Xcommands: Xcommand[];
  numBon: string;
  statuses: any[];
  NumDocList:any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];

  constructor(private authService: TokenStorageService,private bonlivService: BonLivService , private marqueService : MarqueService,private articleService : ArticleService,private router : Router,private _Activatedroute :ActivatedRoute) { }

  ngOnInit() {
    
    this.bonliv = new Bon_liv();

    this.numBon = this._Activatedroute.snapshot.params['numBon'];
  
    this.bonlivService.getArtLivForBonLiv(this.numBon).subscribe(data => {
      this.artlivs = data;
      this.loading = false;
      console.log(data)
    });
  
    this.bonlivService.getArtTermForBonLiv(this.numBon).subscribe(data => {
      this.artterms = data;
      this.loading = false;
      console.log(this.artterms);
    });
    this.bonlivService.getBon_liv(this.numBon).subscribe(data => {
      this.bonliv = data;
      console.log("aaaaaa")
      console.log(data)
    });
  }


  clear(table: Table) {
      table.clear();
  }

  list(){
    this.router.navigate(['bonliv']);
  }

  /**Popaps for inside table */
  displayModal: boolean;
  position: string;
  displayPositionQutLiv: boolean;
  displayPositionRemise: boolean;
  displayPositionPrixHt: boolean;
  displayPositionTva: boolean;
  displayPositionTotHt: boolean;
  displayPositionMarge: boolean;
  displayPositionCumulRet: boolean;
  displayPositionPrixAch: boolean;
  displayPositionCentre: boolean;


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
  showPositionDialogQutLiv(position: string) {
    this.position = position;
    this.displayPositionQutLiv = true;
  }
  showPositionDialogRemise(position: string) {
    this.position = position;
    this.displayPositionRemise = true;
  }
  showPositionDialogPrixHt(position: string) {
    this.position = position;
    this.displayPositionPrixHt = true;
  }
  showPositionDialogTva(position: string) {
    this.position = position;
    this.displayPositionTva = true;
  }
  showPositionDialogTotHt(position: string) {
    this.position = position;
    this.displayPositionTotHt = true;
  }
  showPositionDialogMarge(position: string) {
    this.position = position;
    this.displayPositionMarge = true;
  }
  showPositionDialogCumulRet(position: string) {
    this.position = position;
    this.displayPositionCumulRet = true;
  }
  showPositionDialogPrixAch(position: string) {
    this.position = position;
    this.displayPositionPrixAch = true;
  }
  showPositionDialogCentre(position: string) {
    this.position = position;
    this.displayPositionCentre = true;
  }

  displayPositionNumBonFac: boolean;
  displayPositionNumFac: boolean;
  displayPositionNumBon: boolean;
  displayPositionDate: boolean;
  displayPositionNetHt: boolean;
  displayPositionTva2: boolean;
  displayPositionTotTtc: boolean;
  displayPositionMontTrs: boolean;
  showPositionDialogNumBonFac(position: string) {
    this.position = position;
    this.displayPositionNumBonFac = true;
  }
  showPositionDialogNumFac(position: string) {
    this.position = position;
    this.displayPositionNumFac = true;
  }
  showPositionDialogNumBon(position: string) {
    this.position = position;
    this.displayPositionNumBon = true;
  }
  showPositionDialogDate(position: string) {
    this.position = position;
    this.displayPositionDate = true;
  }
  showPositionDialogNetHt(position: string) {
    this.position = position;
    this.displayPositionNetHt = true;
  }
  showPositionDialogTva2(position: string) {
    this.position = position;
    this.displayPositionTva2 = true;
  }
  showPositionDialogTotTtc(position: string) {
    this.position = position;
    this.displayPositionTotTtc = true;
  }
  showPositionDialogMontTrs(position: string) {
    this.position = position;
    this.displayPositionMontTrs = true;
  }




  /**recu bonLiv table do nt delete */

  displayPositionNumCom: boolean;
  displayPositionRaison: boolean;
  displayPositionDatCom: boolean;
  displayPositionTypCom: boolean;
  displayPositionCodFrs: boolean;
  displayPositionAdresse: boolean;
  displayPositionTel: boolean;
  displayPositionFax: boolean;
  displayPositionPaye: boolean;

  showPositionDialogNumCom(position: string) {
    this.position = position;
    this.displayPositionNumCom = true;
  }
  showPositionDialogRaison(position: string) {
    this.position = position;
    this.displayPositionRaison = true;
  }
  showPositionDialogDatCom(position: string) {
    this.position = position;
    this.displayPositionDatCom = true;
  }
  showPositionDialogTypCom(position: string) {
    this.position = position;
    this.displayPositionTypCom = true;
  }
  showPositionDialogCodFrs(position: string) {
    this.position = position;
    this.displayPositionCodFrs = true;
  }
  showPositionDialogAdresse(position: string) {
    this.position = position;
    this.displayPositionAdresse = true;
  }
  showPositionDialogTel(position: string) {
    this.position = position;
    this.displayPositionTel = true;
  }
  showPositionDialogFax(position: string) {
    this.position = position;
    this.displayPositionFax = true;
  }
  showPositionDialogPaye(position: string) {
    this.position = position;
    this.displayPositionPaye = true;
  }

}


