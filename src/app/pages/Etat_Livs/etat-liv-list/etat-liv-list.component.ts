import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Etat_liv } from '../etat-liv';
import { Router } from '@angular/router';
import { SmartTableData } from '../../../@core/data/smart-table';
import { EtatLivService } from '../etat-liv.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDialogService , NbWindowService} from '@nebular/theme';
import { DeleteEtatLivDialogComponent } from './delete-dialog/delete-etat-liv-dialog.component';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';


@Component({
  selector: 'ngx-etat-liv-list',
  templateUrl: './etat-liv-list.component.html',
  styleUrls: ['./etat-liv-list.component.scss']
})
export class EtatLivListComponent implements OnInit  {
  
  etatlivs: Etat_liv[];
  searchText;
    /*****************************Filtrage des donner *****************************/
    filteredEtatLivs: Etat_liv[];
    private _searchTermRegion: string;
    private _searchTermConfirmation: string;
    private _searchTermNumBon : string;
    /**end searsh string */
  
  
  get searchTermRegion(): string {
    return this._searchTermRegion;
  }
  set searchTermRegion(value: string){
    this._searchTermRegion = value;
    this.filteredEtatLivs = this.filtereEtatLivsRegion(value);
  }
  get searchTermConfirmation(): string {
    return this._searchTermConfirmation;
  }
  set searchTermConfirmation(value: string){
    this._searchTermConfirmation = value;
    this.filteredEtatLivs = this.filtereEtatLivsConfirmation(value);
  }

  get searchTermNumBon(): string {
    return this._searchTermNumBon;
  }
  set searchTermNumBon(value: string){
    this._searchTermNumBon = value;
    this.filteredEtatLivs = this.filtereEtatLivsNumBon(value);
  }
  filtereEtatLivsRegion(seachString: string){
    return this.etatlivs.filter(Etat_liv => Etat_liv.region.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereEtatLivsConfirmation(seachString: string){
    return this.etatlivs.filter(Etat_liv => Etat_liv.confirmation.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereEtatLivsNumBon(seachString: string){
    return this.etatlivs.filter(Etat_liv => Etat_liv.bonLiv.numBon.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  } 
  /****************Filtrage des donner ***************/
  constructor(private authService: TokenStorageService,private dialogService: NbDialogService, private etatlivService: EtatLivService,
    private router: Router,private service: SmartTableData) {

    }


/*  affichage all chariot ****************/
statusessEtat:any;
authority;
    ngOnInit(){
      this.authService.getAuthorities().forEach(authority => {
        this.authority=authority;
        console.log(this.authority);
      });
      this.getEtatLivs();

      this.statusessEtat= [
        {label: 'un_problem_a_la_reception', value: 'un_problem_a_la_reception'},
        {label: 'n_est_pas_recu', value: 'n_est_pas_recu'},
        {label: 'recu_non_verifier', value: 'recu_non_verifier'},
        {label: 'recu_est_verifier', value: 'recu_est_verifier'}
    ]
    }
  
    private getEtatLivs() {
      this.etatlivService.getEtat_livsList().subscribe(data => {
        this.etatlivs = data;
        this.filteredEtatLivs = this.etatlivs;
      });
    }


    goToCharts($myParam: string = ''): void {
      const navigationDetails: string[] = ['//pages/Etat_Livs/echarts-etatliv'];
      if($myParam.length) {
        navigationDetails.push($myParam);
      }
      this.router.navigate(navigationDetails);
    }
/*  affichage all chariot ****************/

  source: LocalDataSource = new LocalDataSource();

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

    /* delete popap*/
    id:any;
    OpenDeletePopap(id) {
      this.dialogService.open(DeleteEtatLivDialogComponent, {
        context: {
          title: id,
        },
      });
    }
  /* end the popap **/  



  getAllListEtat(selectedItems1: any){
    if(selectedItems1!==null){
       return this.filteredEtatLivs = this.etatlivs.filter(Etat_liv => 
        Etat_liv.confirmation !== null &&  Etat_liv.confirmation.toString().indexOf(selectedItems1 .toString()) !== -1);
      }else{
        this.getEtatLivs();
      }
  }
}