import { Component, OnInit, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Bon_sort } from '../bon-sort';
import { ActivatedRoute, Router } from '@angular/router';
import { BonSortService } from '../bon-sort.service';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { Table } from 'primeng/table';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
import { ArticleService } from '../../Articles/article.service';
import { Article } from '../../Articles/article';
import { MarqueService } from '../../Marques/marque.service';

@Component({
  selector: 'ngx-bon-sort-detail',
  templateUrl: './bon-sort-detail.component.html',
  styleUrls: ['./bon-sort-detail.component.scss']
})
export class BonSortDetailComponent implements OnInit {
  bonsort:Bon_sort;
  artsorts:any[] = [];
  bonsorts: any[] = [];
  users: Utilisateur[];
  numBon: string;
  statuses: any[];
  codArt:string;
  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(private authService: TokenStorageService,private bonsortService: BonSortService , private marqueService : MarqueService, private router : Router,private _Activatedroute :ActivatedRoute,private articleService:ArticleService) { }

  ngOnInit() {
    
    this.bonsort = new Bon_sort();

    this.numBon = this._Activatedroute.snapshot.params['numBon'];
  
    this.bonsortService.getArtSortForBonSort(this.numBon).subscribe(data => {
      this.artsorts = data;
      this.loading = false;
      console.log(this.artsorts)
    });
    
    this.bonsortService.getBon_sort(this.numBon).subscribe(data => {
      this.bonsort = data;
      console.log(this.bonsort)
    });
  }
   
  clear(table: Table) {
      table.clear();
  }

  list(){
    this.router.navigate(['bonsort']);
  }

  /**Popaps for inside table */
  displayModal: boolean;
  displayPosition: boolean;
  position: string;
  displayPositionQutSortie: boolean;
  displayPositionRemise: boolean;
  displayPositionPrixHt: boolean;
  displayPositionTva: boolean;
  displayPositionTotHt: boolean;
  displayPositionCumulRet: boolean;
  displayPositionCentre: boolean;
  displayPositionPoitageChariot: boolean;
  displayPositionNumChar: boolean;
  displayPositionEtatChar: boolean;

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
  showPositionDialogQutSortie(position: string) {
    this.position = position;
    this.displayPositionQutSortie = true;
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
  showPositionDialogCumulRet(position: string) {
    this.position = position;
    this.displayPositionCumulRet = true;
  }
  showPositionDialogCentre(position: string) {
    this.position = position;
    this.displayPositionCentre = true;
  }
  showPositionDialogPoitageChariot(position: string) {
    this.position = position;
    this.displayPositionPoitageChariot = true;
  }
  showPositionDialogNumChar(position: string) {
    this.position = position;
    this.displayPositionNumChar = true;
  }
  showPositionDialogEtatChar(position: string) {
    this.position = position;
    this.displayPositionEtatChar = true;
  }
}
