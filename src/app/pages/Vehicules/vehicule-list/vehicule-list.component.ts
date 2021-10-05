import { Component, OnInit , TemplateRef , ViewChild  } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Vehicule } from '../vehicule';
import { Observable } from 'rxjs';
import { VehiculeService } from '../vehicule.service';
import { Router } from '@angular/router';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDialogService , NbWindowService} from '@nebular/theme';
import { DeleteVehiculeDialogComponent } from './delete-dialog/delete-vehicule-dialog.component';
import { ArticleService } from '../../Articles/article.service';
import { MarqueService } from '../../Marques/marque.service';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ngx-vehicule-list',
  templateUrl: './vehicule-list.component.html',
  styleUrls: ['./vehicule-list.component.scss']
})
export class VehiculeListComponent implements OnInit {
  
  statuses: NbComponentStatus[] = ['info' ];
  shapes: NbComponentShape[] = [ 'rectangle' ];
  sizes: NbComponentSize[] = ['medium'];

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
  vehicules: Vehicule[];
  searchText;

        /*****************************Filtrage des donner *****************************/
        filteredVehicules: Vehicule[];
        private _searchTermMatricule: string;
        private _searchTermMatAgent: string;
        private _searchTermCouleur: string;
        private _searchTermDt1Mc: string;
        private _searchTermDtAcq: string;
        private _searchTermPattc: string;
        private _searchTermEss: string;  
        private _searchTermDtFAss: string
        private _searchTermDtDVisit: string;  
        private _searchTermKmCour: string;  
        private _searchTermDrKmVida: string; 
        private _searchTermDrKmCh: string; 
        private _searchTermObservation: string; 
        private _searchTermTonnage: string; 
        private _searchTermDt1mc2: string; 
        /**end searsh string */
    
    
        get searchTermMatricule(): string {
          return this._searchTermMatricule;
        }
        set searchTermMatricule(value: string){
          this._searchTermMatricule = value;
          this.filteredVehicules = this.filtereVehiculesMatricule(value);
        }
        get searchTermMatAgent(): string {
          return this._searchTermMatAgent;
        }
        set searchTermMatAgent(value: string){
          this._searchTermMatAgent = value;
          this.filteredVehicules = this.filtereVehiculesMatAgent(value);
        }
        get searchTermCouleur(): string {
          return this._searchTermCouleur;
        }
        set searchTermCouleur(value: string){
          this._searchTermCouleur = value;
          this.filteredVehicules = this.filtereVehiculesCouleur(value);
        }
        get searchTermDt1Mc(): string {
          return this._searchTermDt1Mc;
        }
        get searchTermPattc(): string {
          return this._searchTermPattc;
        }
        set searchTermPattc(value: string){
          this._searchTermPattc = value;
          this.filteredVehicules = this.filtereVehiculesPattc(value);
        }
        get searchTermEss(): string {
          return this._searchTermEss;
        }
        set searchTermEss(value: string){
          this._searchTermEss = value;
          this.filteredVehicules = this.filtereVehiculesEss(value);
        }
        get searchTermKmCour(): string {
          return this._searchTermKmCour;
        }
        set searchTermKmCour(value: string){
          this._searchTermKmCour = value;
          this.filteredVehicules = this.filtereVehiculesKmCour(value);
        }
        get searchTermDrKmVida(): string {
          return this._searchTermDrKmVida;
        }
        set searchTermDrKmVida(value: string){
          this._searchTermDrKmVida = value;
          this.filteredVehicules = this.filtereVehiculesDrKmVida(value);
        }
        get searchTermDrKmCh(): string {
          return this._searchTermDrKmCh;
        }
        set searchTermDrKmCh(value: string){
          this._searchTermDrKmCh = value;
          this.filteredVehicules = this.filtereVehiculesDrKmCh(value);
        }
        get searchTermObservation(): string {
          return this._searchTermObservation;
        }
        set searchTermObservation(value: string){
          this._searchTermObservation = value;
          this.filteredVehicules = this.filtereVehiculesObservation(value);
        }
        get searchTermTonnage(): string {
          return this._searchTermTonnage;
        }
        set searchTermTonnage(value: string){
          this._searchTermTonnage = value;
          this.filteredVehicules = this.filtereVehiculesTonnage(value);
        }
        filtereVehiculesMatricule(seachString: string){
          return this.vehicules.filter(Vehicule => Vehicule.matricule.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
        }
        filtereVehiculesMatAgent(seachBigint: string){
          return this.vehicules.filter(Vehicule => Vehicule.matAgent.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
        }
        filtereVehiculesCouleur(seachString: string){
          return this.vehicules.filter(Vehicule => Vehicule.couleur.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
        }
        filtereVehiculesPattc(seachString: string){
          return this.vehicules.filter(Vehicule => Vehicule.pattc.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
        }
        filtereVehiculesEss(seachString: string){
          return this.vehicules.filter(Vehicule => Vehicule.ess.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
        }
        filtereVehiculesKmCour(seachString: string){
          return this.vehicules.filter(Vehicule => Vehicule.kmCour.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
        }
        filtereVehiculesDrKmVida(seachString: string){
          return this.vehicules.filter(Vehicule => Vehicule.drKmVida.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
        }
        filtereVehiculesDrKmCh(seachString: string){
          return this.vehicules.filter(Vehicule => Vehicule.drKmCh.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
        }
        filtereVehiculesObservation(seachString: string){
          return this.vehicules.filter(Vehicule => Vehicule.observation.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
        }
        filtereVehiculesTonnage(seachString: string){
          return this.vehicules.filter(Vehicule => Vehicule.tonnage.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
        }
    /*********end seach fot anything */
  

  constructor(private authService: TokenStorageService,private windowService: NbWindowService,private marqueService:MarqueService, private articleService: ArticleService, private dialogService: NbDialogService, private vehiculeService: VehiculeService,
    private router: Router,private service: SmartTableData,public datepipe: DatePipe) {

    }


/*  affichage all vehicule ****************/
  authority;
  ngOnInit(): void {
    this.authService.getAuthorities().forEach(authority => {
      this.authority=authority.toString();
      console.log(this.authority);
    });
    this.getAllMarquesList();
    this.getAllModelsList();
    this.getVehicules();
    this.getListCouleur();
  }

  private getVehicules() {
    this.vehiculeService.getVehiculesList().subscribe(data => {
      this.vehicules = data;
      this.filteredVehicules = this.vehicules;
      console.log(data);
    });
  }

/*  affichage all vehicule ****************/

  deleteVehicule(id: string) {
    this.vehiculeService.deleteVehicule(id)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log('ERROR: ' + error));
  }

  
  vehiculeDetails(id: bigint){
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

      /**filter date */

      @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
      @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;
    
        openWindowFilterDate(contentTemplate) {
          this.windowService.open(
            contentTemplate,
            {
              title: 'Window content from template',
              context: {
                text: 'some text to pass into template',
              },
            },
          );
        }

        openWindowFilterDateWithoutBackdrop() {
          this.windowService.open(
            this.disabledEscTemplate,
            {
              title: 'Window without backdrop',
              hasBackdrop: false,
              closeOnEsc: false,
            },
          );
        }
        /**end filter date */


    /* delete popap*/
    matricule:any;
    OpenDeletePopap(matricule) {
      this.dialogService.open(DeleteVehiculeDialogComponent, {
        context: {
          title: matricule,
        },
      });
    }
  /* end the popap **/  

  goToModifier(id: string ){
    this.router.navigate(['//pages/Vehicules/update-vehicule',id])
    }


    getArticleOfFromMarqueAddForBonLiv(selectedMarques: any){
      if(selectedMarques!=null){
        return this.filteredVehicules = this.vehicules.filter(Vehicule => Vehicule.marque.title.toLowerCase().startsWith(selectedMarques.toLowerCase()));
      }else{
    this.getVehicules();
  }
  }

  marqueAllList:any;
  getAllMarquesList(){
  this.marqueService.getMarquesList().subscribe(data => {
    this.marqueAllList = data;
    console.log(data);
  });
}

_searchTermMarq;
selectedMode;
getArticleOfFromModelAddForBonLiv(selectedMode: any){
  console.log(selectedMode);  
  if(selectedMode.value!=null){
  console.log(selectedMode.value.title); 
    return this.filteredVehicules = this.vehicules.filter(Vehicule => Vehicule.model.title.startsWith(selectedMode.value.title));
  }else{
    this.getVehicules();
}
}

modeleAllList:any;
getAllModelsList(){
this.articleService.getAllModelsList().subscribe(data => {
this.modeleAllList = data;
console.log(data);
});
}
couleurAllList:any;
getListCouleur(){
    var couleurAllList = this.vehiculeService.getCouleurVehicule().subscribe(data => {
    this.couleurAllList = data;
    console.log(couleurAllList);
  });
}
getVehiculeCouleur(selectedCouleur: any){
  console.log(selectedCouleur);  
  if(selectedCouleur!==""){
  console.log(selectedCouleur); 
    return this.filteredVehicules = this.vehicules.filter(Vehicule => Vehicule.couleur !== null &&  Vehicule.couleur.toString().indexOf(selectedCouleur.toString()) !== -1);
  }else{
    this.getVehicules();
  }
}



/***filter date */



startDate;
endDate;
testStatus :number = 1;
FilterDate(startDate,endDate){
  console.log(startDate,endDate)
  if (startDate !=null && endDate!=null && this.testStatus != 2) {
  let latest_startDate =this.datepipe.transform(startDate, 'yyyy-MM-dd');
  let latest_endDate =this.datepipe.transform(endDate, 'yyyy-MM-dd');
  latest_startDate.toString();
  latest_endDate.toString();
  this.vehiculeService.getAllVehiculedt1mcBydateBetween(latest_startDate.toString(),latest_endDate.toString()).subscribe(data => {
    this.filteredVehicules = data;
    console.log(data);
  });
  this.testStatus = 2
}else {
  this.testStatus = 2
  this.getVehicules();
  this.testStatus = 1
}
}

startDate1;
endDate1;
FilterDate1(startDate1,endDate1){
  console.log(startDate1,endDate1)
  if (startDate1 !=null && endDate1!=null && this.testStatus != 2) {
  let latest_startDate =this.datepipe.transform(startDate1, 'yyyy-MM-dd');
  let latest_endDate =this.datepipe.transform(endDate1, 'yyyy-MM-dd');
  latest_startDate.toString();
  latest_endDate.toString();
  this.vehiculeService.getAllVehiculeDT_ACQBydateBetween(latest_startDate.toString(),latest_endDate.toString()).subscribe(data => {
    this.filteredVehicules = data;
    console.log(data);
  });
  this.testStatus = 2
}else {
  this.testStatus = 2
  this.getVehicules();
  this.testStatus = 1
}
}

startDate2;
endDate2;
FilterDate2(startDate2,endDate2){
  console.log(startDate2,endDate2)
  if (startDate2 !=null && endDate2!=null && this.testStatus != 2) {
  let latest_startDate =this.datepipe.transform(startDate2, 'yyyy-MM-dd');
  let latest_endDate =this.datepipe.transform(endDate2, 'yyyy-MM-dd');
  latest_startDate.toString();
  latest_endDate.toString();
  this.vehiculeService.getAllVehiculedtfassBydateBetween(latest_startDate.toString(),latest_endDate.toString()).subscribe(data => {
    this.filteredVehicules = data;
    console.log(data);
  });
  this.testStatus = 2
}else {
  this.testStatus = 2
  this.getVehicules();
  this.testStatus = 1
}
}

startDate3;
endDate3;
FilterDate3(startDate3,endDate3){
  console.log(startDate3,endDate3)
  if (startDate3 !=null && endDate3!=null && this.testStatus != 2) {
  let latest_startDate =this.datepipe.transform(startDate3, 'yyyy-MM-dd');
  let latest_endDate =this.datepipe.transform(endDate3, 'yyyy-MM-dd');
  latest_startDate.toString();
  latest_endDate.toString();
  this.vehiculeService.getAllVehiculedtfvisitBydateBetween(latest_startDate.toString(),latest_endDate.toString()).subscribe(data => {
    this.filteredVehicules = data;
    console.log(data);
  });
  this.testStatus = 2
}else {
  this.testStatus = 2
  this.getVehicules();
  this.testStatus = 1
}
}

startDate4;
endDate4;
FilterDate4(startDate4,endDate4){
  console.log(startDate4,endDate4)
  if (startDate4 !=null && endDate4!=null && this.testStatus != 2) {
  let latest_startDate =this.datepipe.transform(startDate4, 'yyyy-MM-dd');
  let latest_endDate =this.datepipe.transform(endDate4, 'yyyy-MM-dd');
  latest_startDate.toString();
  latest_endDate.toString();
  this.vehiculeService.getAllVehiculedt1mc2BydateBetween(latest_startDate.toString(),latest_endDate.toString()).subscribe(data => {
    this.filteredVehicules = data;
    console.log(data);
  });
  this.testStatus = 2
}else {
  this.testStatus = 2
  this.getVehicules();
  this.testStatus = 1
}
}
}
