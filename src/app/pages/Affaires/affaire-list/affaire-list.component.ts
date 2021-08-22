import { Component, OnInit, ViewChild ,TemplateRef } from '@angular/core';

import { Router } from '@angular/router';
import { SmartTableData } from '../../../@core/data/smart-table';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDialogService, NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Affaire } from '../affaire';
import { AffaireService } from '../affaire.service';

import { WindowDateFilterComponent } from './window-date-filter/window-date-filter.component';
import { Table } from 'primeng/table';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
@Component({
  selector: 'ngx-affaire-list',
  templateUrl: './affaire-list.component.html',
  styleUrls: ['./affaire-list.component.scss']
})
export class AffaireListComponent implements OnInit {
  affaires: Affaire[];
  closeResult: string;
  editForm: any;
  searchText;
  
  statuses: NbComponentStatus[] = ['info' ];
  shapes: NbComponentShape[] = [ 'rectangle' ];
  sizes: NbComponentSize[] = ['medium'];
  exportColumns: any[];
  cols: any[];
  /*****************************Filtrage des donner *****************************/
  filteredAffaires: Affaire[];
  private _searchTermNumAff: string;
  private _searchTermCodFrs: string;
  private _searchTermRaison: string;
  private _searchTermProven: string;
  private _searchTermNumProf: string;
  private _searchTermTransfer: string;
  private _searchTermProforma: string;
  private _searchTermConfirmer: string;
  private _searchTermNumFac: string;
  private _searchTermMontDev: string;
  private _searchTermMontDt: string;

  private _searchTermMontRev: string;
  private _searchTermDelaiLiv: string;
  private _searchTermMontTrsp: string;
  private _searchTermMontEmba: string;
  private _searchTermMontAff: string;

  private _searchTermTotalAff: string;
  private _searchTermDevise: string;
  private _searchTermListDem: string;
  private _searchTermCoef: string;

  /**end searsh string */
  get searchTermNumAff(): string {
    return this._searchTermNumAff;
  }
  set searchTermNumAff(value: string){
    this._searchTermNumAff = value;
    this.filteredAffaires = this.filtereAffaireNumAff(value);
  }
  get searchTermCodFrs(): string {
    return this._searchTermCodFrs;
  }
  set searchTermCodFrs(value: string){
    this._searchTermCodFrs = value;
    this.filteredAffaires = this.filtereAffaireCodFrs(value);
  }
  get searchTermRaison(): string {
    return this._searchTermRaison;
  }
  set searchTermRaison(value: string){
    this._searchTermRaison = value;
    this.filteredAffaires = this.filtereAffaireRaison(value);
  }
  get searchTermProven(): string {
    return this._searchTermProven;
  }
  set searchTermProven(value: string){
    this._searchTermProven = value;
    this.filteredAffaires = this.filtereAffaireProven(value);
  }
  get searchTermNumProf(): string {
    return this._searchTermNumProf;
  }
  set searchTermNumProf(value: string){
    this._searchTermNumProf = value;
    this.filteredAffaires = this.filtereAffaireNumProf(value);
  }
  get searchTermTransfer(): string {
    return this._searchTermTransfer;
  }
  set searchTermTransfer(value: string){
    this._searchTermTransfer = value;
    this.filteredAffaires = this.filtereAffaireTransfer(value);
  }
  get searchTermProforma(): string {
    return this._searchTermProforma;
  }
  set searchTermProforma(value: string){
    this._searchTermProforma = value;
    this.filteredAffaires = this.filtereAffaireProforma(value);
  }
  get searchTermConfirmer(): string {
    return this._searchTermConfirmer;
  }
  set searchTermConfirmer(value: string){
    this._searchTermConfirmer = value;
    this.filteredAffaires = this.filtereAffaireConfirmer(value);
  }
  get searchTermNumFac(): string {
    return this._searchTermNumFac;
  }
  set searchTermNumFac(value: string){
    this._searchTermNumFac = value;
    this.filteredAffaires = this.filtereAffaireNumFac(value);
  }
  get searchTermMontDev(): string {
    return this._searchTermMontDev;
  }
  set searchTermMontDev(value: string){
    this._searchTermMontDev = value;
    this.filteredAffaires = this.filtereAffaireMontDev(value);
  }
  get searchTermMontDt(): string {
    return this._searchTermMontDt;
  }
  set searchTermMontDt(value: string){
    this._searchTermMontDt = value;
    this.filteredAffaires = this.filtereAffaireMontDt(value);
  }
  get searchTermMontRev(): string {
    return this._searchTermMontRev;
  }
  set searchTermMontRev(value: string){
    this._searchTermMontRev = value;
    this.filteredAffaires = this.filtereAffaireMontRev(value);
  }
  get searchTermDelaiLiv(): string {
    return this._searchTermDelaiLiv;
  }
  set searchTermDelaiLiv(value: string){
    this._searchTermDelaiLiv = value;
    this.filteredAffaires = this.filtereAffaireDelaiLiv(value);
  }
  get searchTermMontTrsp(): string {
    return this._searchTermMontTrsp;
  }
  set searchTermMontTrsp(value: string){
    this._searchTermMontTrsp = value;
    this.filteredAffaires = this.filtereAffaireMontTrsp(value);
  }
  get searchTermMontEmba(): string {
    return this._searchTermMontEmba;
  }
  set searchTermMontEmba(value: string){
    this._searchTermMontEmba = value;
    this.filteredAffaires = this.filtereAffaireMontEmba(value);
  }
  get searchTermMontAff(): string {
    return this._searchTermMontAff;
  }
  set searchTermMontAff(value: string){
    this._searchTermMontAff = value;
    this.filteredAffaires = this.filtereAffaireMontAff(value);
  }
  get searchTermTotalAff(): string {
    return this._searchTermTotalAff;
  }
  set searchTermTotalAff(value: string){
    this._searchTermTotalAff = value;
    this.filteredAffaires = this.filtereAffaireTotalAff(value);
  }
  get searchTermDevise(): string {
    return this._searchTermDevise;
  }
  set searchTermDevise(value: string){
    this._searchTermDevise = value;
    this.filteredAffaires = this.filtereAffaireDevise(value);
  }
  get searchTermListDem(): string {
    return this._searchTermListDem;
  }
  set searchTermListDem(value: string){
    this._searchTermListDem = value;
    this.filteredAffaires = this.filtereAffaireListDem(value);
  }
  get searchTermCoef(): string {
    return this._searchTermCoef;
  }
  set searchTermCoef(value: string){
    this._searchTermCoef = value;
    this.filteredAffaires = this.filtereAffaireCoef(value);
  }

  filtereAffaireNumAff(seachString: string){
    return this.affaires.filter(Affaire => Affaire.numAff.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereAffaireCodFrs(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.codFrs.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireRaison(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.raison.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireProven(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.proven.toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }


  filtereAffaireNumProf(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.numProf.toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireTransfer(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.transfer.toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireProforma(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.proforma.toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireConfirmer(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.confirmer.toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireNumFac(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.numFac.toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireMontDev(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.numFac.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireMontDt(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.numFac.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireMontRev(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.montRev.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireDelaiLiv(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.numFac.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireMontTrsp(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.montTrsp.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireMontEmba(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.montTrsp.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireMontAff(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.montTrsp.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireTotalAff(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.totalAff.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireDevise(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.devise.toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireListDem(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.devise.toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireCoef(seachBigint: string){
    return this.affaires.filter(Affaire => Affaire.coef.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }

  /*********end seach fot anything */

  goToCharts($myParam: string = ''): void {
    const navigationDetails: string[] = ['//pages/Affaires/echarts-affaire'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

goToPage(pageName:string):void{
  this.router.navigate([`${pageName}`]);
}

  constructor(private authService: TokenStorageService,private affaireService: AffaireService,private dialogService: NbDialogService,private http: HttpClient,private router: Router,
    private service: SmartTableData,private windowService: NbWindowService, private fb: FormBuilder) { }

  /* afficher all achats**/
  statusessdelaiLiv:any;
  authority;
  ngOnInit() {

    this.authService.getAuthorities().forEach(authority => {
      this.authority=authority;
      console.log(this.authority);
    });
    this.getAffaires();


    
    this.cols = [
      { field: 'numAff', header: 'Numéro Aff~' },
      { field: 'datAff', header: 'Date Aff~' },
      { field: 'codFrs', header: 'Code Frs~' },
      { field: 'raison', header: 'Raison' },
      { field: 'datProf', header: 'Date Prof~' },
      { field: 'datConf', header: 'Date Conf~' },
      { field: 'datTransf', header: 'Date Transf~' },
      { field: 'proven', header: 'Proven' },
      { field: 'numProf', header: 'Numéro Prof~' },
      { field: 'transfer', header: 'Transfer' },
      { field: 'proforma', header: 'Proforma' },
      { field: 'confirmer', header: 'Confirmer' },
      { field: 'datAnal', header: 'Date Anal' },
      { field: 'montDt', header: 'Mont Dt' },
      { field: 'montRev', header: 'Mont Rev' },
      { field: 'delaiLiv', header: 'Delail Liv' },
      { field: 'montTrsp', header: 'Montant Trsp~' },
      { field: 'montEmbl', header: 'Montant Embl~' },
      { field: 'montAff', header: 'Montant Aff~' },
      { field: 'totalAff', header: 'Total Aff~' },
      { field: 'devise', header: 'Devise' },
      { field: 'coef', header: 'Coef' },
      { field: 'numAff', header: 'Consultation' },
      { field: 'numAff', header: 'Actions' }
  ];

  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));


  this.statusessdelaiLiv = [
    {label: 'Sans livraison', value: false},
    {label: 'Avec livraison', value: true}
]
  }

  private getAffaires() {
    this.affaireService.getAffaireList().subscribe(data => {
      this.affaires = data;
      this.filteredAffaires = this.affaires;
    });
  }
 

source: LocalDataSource = new LocalDataSource();

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

openWindowFormFilterDate() {
  this.windowService.open(WindowDateFilterComponent, { title: `entrer les deux dates` });
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


/**stat export CSV & PDF & Excel window*/

clear(table: Table) {
  table.clear();
}

previewTableAllAffaireExcelPdf = false;
togglepreviewTableAffaire(){
  this.previewTableAllAffaireExcelPdf = !this.previewTableAllAffaireExcelPdf;
}
exportCSV

exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.affaires);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "affaires");
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
}
