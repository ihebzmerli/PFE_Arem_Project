import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { Router } from '@angular/router';
import { PrimeService } from '../prime.service';
import { Observable } from 'rxjs';
import { Prime } from '../prime';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDialogService , NbWindowService} from '@nebular/theme';
import { DeletePrimeDialogComponent } from './delete-dialog/delete-prime-dialog.component';
import { trigger,style,transition,animate,keyframes,query,stagger, state} from '@angular/animations';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
@Component({
  selector: 'ngx-prime-list',
  templateUrl: './prime-list.component.html',
  styleUrls: ['./prime-list.component.scss']
 
})
export class PrimeListComponent implements OnInit {

  statuses: NbComponentStatus[] = ['info' ];
  shapes: NbComponentShape[] = [ 'rectangle' ];
  sizes: NbComponentSize[] = ['medium'];
  searchText;
  primes: Prime[];
    /*****************************Filtrage des donner *****************************/
    filteredPrimes: Prime[];
    private _searchTermRaison: string;
    private _searchTermCategorie: string;

    private _searchTermObjMin_1: string;
    
    private _searchTermObjMax_1: string;

    private _searchTermCa_1: string;

    private _searchTermCaN1_1: string;
    


    private _searchTermMort_1: string;

    private _searchTermArtSpec: string;
    
    private _searchTermNbArt_1: string;
    
    private _searchTermMarge_1: string;

    private _searchTermPrime_1: string;

    private _searchTermBloc: string;
       /**end searsh string */
  
  
  get searchTermRaison(): string {
    return this._searchTermRaison;
  }
  set searchTermRaison(value: string){
    this._searchTermRaison = value;
    this.filteredPrimes = this.filterePrimesRaison(value);
  }
  get searchTermCategorie(): string {
    return this._searchTermCategorie;
  }
  set searchTermCategorie(value: string){
    this._searchTermCategorie = value;
    this.filteredPrimes = this.filterePrimesCategorie(value);
  }
/** */
  get searchTermObjMin_1(): string {
    return this._searchTermObjMin_1;
  }
  set searchTermObjMin_1(value: string){
    this._searchTermObjMin_1 = value;
    this.filteredPrimes = this.filterePrimesObjMin_1(value);
  }

//** */
  get searchTermObjMax_1(): string {
    return this._searchTermObjMax_1;
  }
  set searchTermObjMax_1(value: string){
    this._searchTermObjMax_1 = value;
    this.filteredPrimes = this.filterePrimesObjMax_1(value);
  }
//** */
get searchTermCa_1(): string {
  return this._searchTermCa_1;
}
set searchTermCa_1(value: string){
  this._searchTermCa_1 = value;
  this.filteredPrimes = this.filterePrimesCa_1(value);
}
//** */
get searchTermCaN1_1(): string {
  return this._searchTermCaN1_1;
}
set searchTermCaN1_1(value: string){
  this._searchTermCaN1_1 = value;
  this.filteredPrimes = this.filterePrimesCaN1_1(value);
}
get searchTermMort_1(): string {
  return this._searchTermMort_1;
}
set searchTermMort_1(value: string){
  this._searchTermMort_1 = value;
  this.filteredPrimes = this.filterePrimesMort_1(value);
}
//** */
get searchTermArtSpec(): string {
  return this._searchTermArtSpec;
}
set searchTermArtSpec(value: string){
  this._searchTermArtSpec = value;
  this.filteredPrimes = this.filterePrimesArtSpec(value);
}
//** */
get searchTermNbArt_1(): string {
  return this._searchTermNbArt_1;
}
set searchTermNbArt_1(value: string){
  this._searchTermNbArt_1 = value;
  this.filteredPrimes = this.filterePrimesNbArt_1(value);
}
//** */
get searchTermMarge_1(): string {
  return this._searchTermMarge_1;
}
set searchTermMarge_1(value: string){
  this._searchTermMarge_1 = value;
  this.filteredPrimes = this.filterePrimesMarge_1(value);
}
//** */
get searchTermPrime_1(): string {
  return this._searchTermPrime_1;
}
set searchTermPrime_1(value: string){
  this._searchTermPrime_1 = value;
  this.filteredPrimes = this.filterePrimesPrime_1(value);
}
//** */
get searchTermBloc(): string {
  return this._searchTermBloc;
}
set searchTermBloc(value: string){
  this._searchTermBloc = value;
  this.filteredPrimes = this.filterePrimesBloc(value);
}

//** */
  filterePrimesRaison(seachString: string){
  return this.primes.filter(Prime => Prime.raison.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filterePrimesCategorie(seachString: string){
  return this.primes.filter(Prime => Prime.raison.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }

  filterePrimesObjMin_1(seachString: string){
    return this.primes.filter(Prime => Prime.categorie.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filterePrimesObjMax_1(seachString: string){
  return this.primes.filter(Prime => Prime.objMax.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filterePrimesCa_1(seachBigint: string){
    return this.primes.filter(Prime => Prime.ca.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filterePrimesCaN1_1(seachBigint: string){
    return this.primes.filter(Prime => Prime.caN1.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filterePrimesMort_1(seachBigint: string){
    return this.primes.filter(Prime => Prime.mort.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filterePrimesArtSpec(seachBigint: string){
    return this.primes.filter(Prime => Prime.artSpec.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filterePrimesNbArt_1(seachBigint: string){
    return this.primes.filter(Prime => Prime.nbArt.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filterePrimesMarge_1(seachBigint: string){
    return this.primes.filter(Prime => Prime.marge.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filterePrimesPrime_1(seachBigint: string){
    return this.primes.filter(Prime => Prime.prime.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filterePrimesBloc(seachBigint: string){
    return this.primes.filter(Prime => Prime.bloc.toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  /****************Filtrage des donner ***************/
  constructor(private authService: TokenStorageService,private dialogService: NbDialogService, private primeService: PrimeService,
    private router: Router,private service: SmartTableData) {

    }


/*  affichage all chariot ****************/
authority;
  ngOnInit(): void {
    
    this.authService.getAuthorities().forEach(authority => {
      this.authority=authority;
      console.log(this.authority);
    });
    this.getPrimes();
  }

  private getPrimes() {
    this.primeService.getPrimesList().subscribe(data => {
      this.primes = data;
      this.filteredPrimes = this.primes;
    });
  }

/*  affichage all chariot ****************/

  deletePrime(id: string) {
    this.primeService.deletePrime(id)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log('ERROR: ' + error));
  }

  primeDetails(id: bigint){
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
id:any;
    OpenDeletePopap(id) {
      this.dialogService.open(DeletePrimeDialogComponent, {
        context: {
          title: id,
        },
      });
    }
/* end the popap **/  


goToModifier(id: string ){
  this.router.navigate(['//pages/Primes/update-prime',id])
  }
}