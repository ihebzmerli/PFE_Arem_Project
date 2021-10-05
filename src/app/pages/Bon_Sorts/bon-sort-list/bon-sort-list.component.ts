import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SmartTableData } from '../../../@core/data/smart-table';
import { BonSortService } from '../bon-sort.service';
import { Bon_sort } from '../bon-sort';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs';
import { XbaseXtvaDialogComponent } from './window-xbase&tva/xbase&xtva-dialog.component';
import { DeleteBonSortDialogComponent } from './delete-dialog/delete-bon-sort-dialog.component';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDialogService, NbWindowService } from '@nebular/theme';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { UtilisateurService } from '../../Utilisateurs/utilisateur.service';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { VehiculeService } from '../../Vehicules/vehicule.service';
import { Vehicule } from '../../Vehicules/vehicule';
import { MarqueService } from '../../Marques/marque.service';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-bon-sort-list',
  templateUrl: './bon-sort-list.component.html',
  styleUrls: ['./bon-sort-list.component.scss']
})
export class BonSortListComponent implements OnInit {
  statuses: NbComponentStatus[] = ['info' ];
  shapes: NbComponentShape[] = [ 'rectangle' ];
  sizes: NbComponentSize[] = ['medium'];
  searchText;
  bon_sorts: Observable<Bon_sort[]>;
  bonsorts: Bon_sort[];
  exportColumns: any[];
  cols: any[];
      /*****************************Filtrage des donner *****************************/
    filteredBonSorts: Bon_sort[];
    private _searchTermNumBon: string;
    private _searchTermDatBon: string;
    private _searchTermRaison: string;
    private _searchTermBrutHt: string;
    private _searchTermTauxRem: string;
    private _searchTermMontRem: string;
    private _searchTermNetHt: string;
    private _searchTermMontTva: string;

    private _searchTermTotTtc: string

    private _searchTermCentre: string
    private _searchTermObserv: string
    private _searchTermVehicule: string
    private _searchTermNumChar: string
    private _searchTermCodFrs: string
    /**end searsh string */


    get searchTermNumBon(): string {
      return this._searchTermNumBon;
    }
    set searchTermNumBon(value: string){
      this._searchTermNumBon = value;
      this.filteredBonSorts = this.filtereBonSortsNumBon(value);
    }

    get searchTermRaison(): string {
      return this._searchTermRaison;
    }
    set searchTermRaison(value: string){
      this._searchTermRaison = value;
      this.filteredBonSorts = this.filtereBonSortsRaison(value);
    }
    get searchTermBrutHt(): string {
      return this._searchTermBrutHt;
    }
    set searchTermBrutHt(value: string){
      this._searchTermBrutHt = value;
      this.filteredBonSorts = this.filtereBonSortsBrutHt(value);
    }
    get searchTermMontRem(): string {
      return this._searchTermMontRem;
    }
    set searchTermMontRem(value: string){
      this._searchTermMontRem = value;
      this.filteredBonSorts = this.filtereBonSortsMontRem(value);
    }
    get searchTermNetHt(): string {
      return this._searchTermNetHt;
    }
    set searchTermNetHt(value: string){
      this._searchTermNetHt = value;
      this.filteredBonSorts = this.filtereBonSortsNetHt(value);
    }
    get searchTermMontTva(): string {
      return this._searchTermMontTva;
    }
    set searchTermMontTva(value: string){
      this._searchTermMontTva = value;
      this.filteredBonSorts = this.filtereBonSortsMontTva(value);
    }
    get searchTermTotTtc(): string {
      return this._searchTermTotTtc;
    }
    set searchTermTotTtc(value: string){
      this._searchTermTotTtc = value;
      this.filteredBonSorts = this.filtereBonSortsTotTtc(value);
    }

    get searchTermTauxRem(): string {
      return this._searchTermTauxRem;
    }
    set searchTermTauxRem(value: string){
      this._searchTermTauxRem = value;
      this.filteredBonSorts = this.filtereBonSortsTauxRem(value);
    }


    get searchTermCentre(): string {
      return this._searchTermCentre;
    }
    set searchTermCentre(value: string){
      this._searchTermCentre = value;
      this.filteredBonSorts = this.filtereBonSortsCentre(value);
    }

    get searchTermObserv(): string {
      return this._searchTermObserv;
    }
    set searchTermObserv(value: string){
      this._searchTermObserv = value;
      this.filteredBonSorts = this.filtereBonSortsObserv(value);
    }
    get searchTermVehicule(): string {
      return this._searchTermVehicule;
    }
    set searchTermVehicule(value: string){
      this._searchTermVehicule = value;
      this.filteredBonSorts = this.filtereBonSortsVehicule(value);
    }
    get searchTermNumChar(): string {
      return this._searchTermNumChar;
    }
    set searchTermNumChar(value: string){
      this._searchTermNumChar = value;
      this.filteredBonSorts = this.filtereBonSortsNumChar(value);
    }

    filtereBonSortsNumBon(seachString: string){
      return this.bonsorts.filter(Bon_sort => Bon_sort.numBon.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereBonSortsRaison(seachString: string){
      return this.bonsorts.filter(Bon_sort => Bon_sort.raison.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereBonSortsBrutHt(seachString: string){
      return this.bonsorts.filter(Bon_sort => Bon_sort.brutHt.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereBonSortsMontRem(seachString: string){
      return this.bonsorts.filter(Bon_sort => Bon_sort.montRem.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereBonSortsNetHt(seachString: string){
      return this.bonsorts.filter(Bon_sort => Bon_sort.netHt.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereBonSortsMontTva(seachString: string){
      return this.bonsorts.filter(Bon_sort => Bon_sort.montTva.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereBonSortsTotTtc(seachString: string){
      return this.bonsorts.filter(Bon_sort => Bon_sort.totTtc.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereBonSortsTauxRem(seachString: string){
      return this.bonsorts.filter(Bon_sort => Bon_sort.tauxRem.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereBonSortsUserId(seachString: string){
      return this.bonsorts.filter(Bon_sort => Bon_sort.user.codUser.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereBonSortsCentre(seachString: string){
      return this.bonsorts.filter(Bon_sort => Bon_sort.centre.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereBonSortsObserv(seachString: string){
      return this.bonsorts.filter(Bon_sort => Bon_sort.observ.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereBonSortsVehicule(seachString: string){
      return this.bonsorts.filter(Bon_sort => Bon_sort.vehicule.matricule.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereBonSortsNumChar(seachString: string){
      return this.bonsorts.filter(Bon_sort => Bon_sort.chariot_bonsort.numChar.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
/*********end seach fot anything */

  constructor(private authService: TokenStorageService,private dialogService: NbDialogService, private windowService: NbWindowService, private bonsortService: BonSortService,
    private router: Router,private service: SmartTableData, public datepipe: DatePipe,public utilisateurService:UtilisateurService
    ,public vehiculeService:VehiculeService, private marqueService:MarqueService) {

    }

    goToModifier(NUM_BON_SORT: string ){
      this.router.navigate(['//pages/Bon_Sorts/update-bon-sort',NUM_BON_SORT])
    }

/* afficher all bonsort**/
  agents:Utilisateur[];
  statusessRole:any;
  Vehiculelists:Vehicule[];
  authority;
    ngOnInit() {
      this.authService.getAuthorities().forEach(authority => {
        this.authority=authority.toString();
        console.log(this.authority);
      });

      this.getBonSorts();


      this.cols = [
        { field: 'numBon', header: 'NUM_BON_SORT' },
        { field: 'datBon', header: 'DAT_BON' },
        { field: 'raison', header: 'RAISON' },
        { field: 'brutHt', header: 'BRUT_HT' },
        { field: 'tauxRem', header: 'TAUX_REM' },
        { field: 'montRem', header: 'MONT_REM' },
        { field: 'netHt', header: 'NET_HT' },
        { field: 'montTva', header: 'MONT_TVA' },
        { field: 'totTtc', header: 'TOT_TTC' },
        { field: 'centre', header: 'CENTRE' },
        { field: 'observ', header: 'OBSERV' },
        { field: 'vehicule', header: 'VEHICULE' },
        { field: 'user', header: 'Nom&Prenom respensable Bon' },
        { field: 'user', header: 'Post respensable Bon' },
        { field: 'numBon', header: 'Consultation' },
        { field: 'numBon', header: 'Actions' }
    ];

    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

    this.utilisateurService.getRoles().subscribe(data => {
      this.statusessRole = data;
      console.log(data);
    });
    this.utilisateurService.getUtilisateursList().subscribe(data => {
      this.agents = data;
    });
    this.vehiculeService.getVehiculesList().subscribe(data => {
      this.Vehiculelists = data;
    });
    
  }
  
    private getBonSorts() {
      this.bonsortService.getBon_sortsList().subscribe(data => {
        this.bonsorts = data;
        this.filteredBonSorts = this.bonsorts;
        console.log(this.bonsorts);
      });
    }
/* afficher all bonsort**/
  deleteBon_sort(numBon: string) {
    this.bonsortService.deleteBon_sort(numBon)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log('ERROR: ' + error));
  }

  bon_sortDetails(NUM_BON: bigint){
    this.router.navigate(['details', NUM_BON]);
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
  numBon:any;
  OpenDeletePopap(numBon) {
    this.dialogService.open(DeleteBonSortDialogComponent, {
      context: {
        title: numBon,
      },
    });
  }
/* end the popap **/  

/* start the popap **/  

openWindowXbaseXtva(numBon) {
  this.dialogService.open(XbaseXtvaDialogComponent, {
    context: {
      title: numBon,
    },
  });
}
/**end popap */

getAllListItemsAgents(selectedItems5: any){
  if(selectedItems5!==null){
     return this.filteredBonSorts = this.bonsorts.filter(Bon_sort => 
      Bon_sort.user !== null && Bon_sort.user.firstname.toString().indexOf(selectedItems5.toString()) !== -1);
    }else if(selectedItems5==null){
      console.log(selectedItems5);
      return this.filteredBonSorts = this.bonsorts;
    }
}
getAllListItemsRoles(selectedItems6: any){
  if(selectedItems6!==null){
     return this.filteredBonSorts = this.bonsorts.filter(Bon_sort => 
      Bon_sort.user !== null && Bon_sort.user.roles[0].name.toString().indexOf(selectedItems6.toString()) !== -1);
    }else if(selectedItems6==null){
      console.log(selectedItems6);
      return this.filteredBonSorts = this.bonsorts;
    }
}
getAllListItemsVehicules(selectedItems7: any){
  if(selectedItems7!==null){
     return this.filteredBonSorts = this.bonsorts.filter(Bon_sort => 
      Bon_sort.vehicule !== null && Bon_sort.vehicule.matricule.toString().indexOf(selectedItems7.toString()) !== -1);
    }else if(selectedItems7==null){
      console.log(selectedItems7);
      return this.filteredBonSorts = this.bonsorts;
    }
}
/**stat export CSV & PDF & Excel window*/

clear(table: Table) {
  table.clear();
}

displayModalUserTable2: boolean;
showModalDialogUserTable2() {
  this.displayModalUserTable2 = true;
}

previewTableAllBonsortExcelPdf = false;
togglepreviewTableBonSort(){
  this.previewTableAllBonsortExcelPdf = !this.previewTableAllBonsortExcelPdf;
}
exportCSV

exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.bonsorts);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "bonsorts");
  });
}

saveAsExcelFile(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}

/**stat export CSV & PDF & Excel window*/




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
  this.bonsortService.getAllBonSortBydateBetween(latest_startDate.toString(),latest_endDate.toString()).subscribe(data => {
    this.filteredBonSorts = data;
    console.log(data);
  });
  this.testStatus = 2
}else {
  this.testStatus = 2
  this.getBonSorts();
  this.testStatus = 1
}
}
}