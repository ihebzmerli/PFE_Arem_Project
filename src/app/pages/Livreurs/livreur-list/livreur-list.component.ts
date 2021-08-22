import { Component, OnInit } from '@angular/core';
import { Livreur } from '../livreur';
import { Observable } from 'rxjs';
import { LivreurService } from '../livreur.service';
import { Router } from '@angular/router';
import { SmartTableData } from '../../../@core/data/smart-table';

import { LocalDataSource } from 'ng2-smart-table';

import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDialogService , NbWindowService} from '@nebular/theme';
import { DeleteLivreurDialogComponent } from './delete-dialog/delete-livreur-dialog.component';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-livreur-list',
  templateUrl: './livreur-list.component.html',
  styleUrls: ['./livreur-list.component.scss']
})
export class LivreurListComponent implements OnInit {
  searchText;
  livreurs: Livreur[];
  
  statuses: NbComponentStatus[] = ['info' ];
  shapes: NbComponentShape[] = [ 'rectangle' ];
  sizes: NbComponentSize[] = ['medium'];

      /*****************************Filtrage des donner *****************************/
      filteredLivreurs: Livreur[];
      private _searchTermNom: string;
      private _searchTermNumRec: string;
      private _searchTermCentre: string;
      private _searchTermNumDoc: string;
      private _searchTermObsReclam: string;
      private _searchTermObserv: string;
      private _searchTermPrixAch: string;
      private _searchTermQutArt: string;
      private _searchTermReclam: string;
      private _searchTermTypMvt: string;
      /**end searsh string */
    
  
    get searchTermNom(): string {
      return this._searchTermNom;
    }
    set searchTermNom(value: string){
      this._searchTermNom = value;
      this.filteredLivreurs = this.filtereLivreursNom(value);
    }
  
    get searchTermNumRec(): string {
      return this._searchTermNumRec;
    }
    set searchTermNumRec(value: string){
      this._searchTermNumRec = value;
      this.filteredLivreurs = this.filtereLivreursNumRec(value);
    }
    get searchTermCentre(): string {
      return this._searchTermCentre;
    }
    set searchTermCentre(value: string){
      this._searchTermCentre = value;
      this.filteredLivreurs = this.filtereLivreursCentre(value);
    }
    get searchTermNumDoc(): string {
      return this._searchTermNumDoc;
    }
    set searchTermNumDoc(value: string){
      this._searchTermNumDoc = value;
      this.filteredLivreurs = this.filtereLivreursNumDoc (value);
    }
    get searchTermObsReclam(): string {
      return this._searchTermObsReclam;
    }
    set searchTermObsReclam(value: string){
      this._searchTermObsReclam = value;
      this.filteredLivreurs = this.filtereLivreursObsReclam(value);
    }
    get searchTermObserv(): string {
      return this._searchTermObserv;
    }
    set searchTermObserv(value: string){
      this._searchTermObserv = value;
      this.filteredLivreurs = this.filtereLivreursObserv(value);
    }
    get searchTermPrixAch(): string {
      return this._searchTermPrixAch;
    }
    set searchTermPrixAch(value: string){
      this._searchTermPrixAch = value;
      this.filteredLivreurs = this.filtereLivreursPrixAch(value);
    }
    get searchTermQutArt(): string {
      return this._searchTermQutArt;
    }
    set searchTermQutArt(value: string){
      this._searchTermQutArt = value;
      this.filteredLivreurs = this.filtereLivreursQutArt(value);
    }
    get searchTermReclam(): string {
      return this._searchTermReclam;
    }
    set searchTermReclam(value: string){
      this._searchTermReclam = value;
      this.filteredLivreurs = this.filtereLivreursReclam(value);
    }
    get searchTermTypMvt(): string {
      return this._searchTermTypMvt;
    }
    set searchTermTypMvt(value: string){
      this._searchTermTypMvt = value;
      this.filteredLivreurs = this.filtereLivreursTypMvt(value);
    }

  
    filtereLivreursNom(seachBigint: string){
      return this.livreurs.filter(Livreur => Livreur.nom.toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
    }
    filtereLivreursNumRec(seachString: string){
      return this.livreurs.filter(Livreur => Livreur.numrec.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereLivreursCentre(seachString: string){
      return this.livreurs.filter(Livreur => Livreur.centre.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereLivreursNumDoc(seachString: string){
      return this.livreurs.filter(Livreur => Livreur.numdoc.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereLivreursObsReclam(seachString: string){
      return this.livreurs.filter(Livreur => Livreur.obsreclam.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereLivreursObserv(seachBigint: string){
      return this.livreurs.filter(Livreur => Livreur.observ.toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
    }
    filtereLivreursPrixAch(seachString: string){
      return this.livreurs.filter(Livreur => Livreur.prixach.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereLivreursQutArt(seachString: string){
      return this.livreurs.filter(Livreur => Livreur.qutart.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereLivreursReclam(seachString: string){
      return this.livreurs.filter(Livreur => Livreur.reclam.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereLivreursTypMvt(seachString: string){
      return this.livreurs.filter(Livreur => Livreur.typmvt.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    /****************Filtrage des donner ***************/

    

  constructor(private authService: TokenStorageService,private dialogService: NbDialogService, private livreurService: LivreurService,
    private router: Router,private service: SmartTableData) {

    }


/*  affichage all livreur ****************/
authority;
  ngOnInit(): void {
    this.authService.getAuthorities().forEach(authority => {
      this.authority=authority;
      console.log(this.authority);
    });
    this.getLivreurs();
  }

  private getLivreurs() {
    this.livreurService.getLivreursList().subscribe(data => {
      this.livreurs = data;
      this.filteredLivreurs = this.livreurs;
    });
  }

  goToCharts($myParam: string = ''): void {
    const navigationDetails: string[] = ['//pages/Livreurs/echarts-livreur'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }
  
  goToModifier(id: string ){
    this.router.navigate(['//pages/Livreurs/update-livreur',id])
    }
/*  affichage all livreur ****************/


  livreurDetails(id: bigint){
    this.router.navigate(['details', id]);
  }

  source: LocalDataSource = new LocalDataSource();



  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  /* delete popap*/
  id_livreur:any;
      OpenDeletePopap(id_livreur) {
        this.dialogService.open(DeleteLivreurDialogComponent, {
          context: {
            title: id_livreur,
          },
        });
      }
  /* end the popap **/   
}