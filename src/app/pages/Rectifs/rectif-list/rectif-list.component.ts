import { Component, OnInit , TemplateRef , ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { WindowDateFilterComponent } from './window-date-filter/window-date-filter.component';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Rectif } from '../rectif';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RectifService } from '../rectif.service';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDialogService , NbWindowService} from '@nebular/theme';
import { DeleteRectifDialogComponent } from './delete-dialog/delete-rectif-dialog.component';
import { Table } from 'primeng/table';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
@Component({
  selector: 'ngx-rectif-list',
  templateUrl: './rectif-list.component.html',
  styleUrls: ['./rectif-list.component.scss']
})
export class RectifListComponent implements OnInit {
  
  rectifs: Rectif[];
  searchText;
  statuses: NbComponentStatus[] = ['info' ];
  shapes: NbComponentShape[] = [ 'rectangle' ];
  sizes: NbComponentSize[] = ['medium'];


  exportColumns: any[];
  cols: any[];
      /*****************************Filtrage des donner *****************************/
      filteredRectifs: Rectif[];
      private _searchTermNumDoc: string;
      private _searchTermQutArt: string;
      private _searchTermPrixAch: string;
      private _searchTermObserv: string;
      private _searchTermTypMvt: string;
      private _searchTermNumRec: string;
      private _searchTermCentre: string;
      private _searchTermReclam: string;
      private _searchTermCloture: string;  
      private _searchTermObsReclam: string

      /**end searsh string */
  
  
      get searchTermNumDoc(): string {
        return this._searchTermNumDoc;
      }
      set searchTermNumDoc(value: string){
        this._searchTermNumDoc = value;
        this.filteredRectifs = this.filtereRectifsNumDoc(value);
      }
  
      get searchTermQutArt(): string {
        return this._searchTermQutArt;
      }
      set searchTermQutArt(value: string){
        this._searchTermQutArt = value;
        this.filteredRectifs = this.filtereRectifsQutArt(value);
      }
  
      get searchTermPrixAch(): string {
        return this._searchTermPrixAch;
      }
      set searchTermPrixAch(value: string){
        this._searchTermPrixAch = value;
        this.filteredRectifs = this.filtereRectifsPrixAch(value);
      }
      get searchTermObserv(): string {
        return this._searchTermObserv;
      }
      set searchTermObserv(value: string){
        this._searchTermObserv = value;
        this.filteredRectifs = this.filtereRectifsObserv(value);
      }
      get searchTermTypMvt(): string {
        return this._searchTermTypMvt;
      }
      set searchTermTypMvt(value: string){
        this._searchTermTypMvt = value;
        this.filteredRectifs = this.filtereRectifsTypMvt(value);
      }
      get searchTermNumRec(): string {
        return this._searchTermNumRec;
      }
      set searchTermNumRec(value: string){
        this._searchTermNumRec = value;
        this.filteredRectifs = this.filtereRectifsNumRec(value);
      }
      get searchTermCentre(): string {
        return this._searchTermCentre;
      }
      set searchTermCentre(value: string){
        this._searchTermCentre = value;
        this.filteredRectifs = this.filtereRectifsCentre(value);
      }
      get searchTermReclam(): string {
        return this._searchTermReclam;
      }
      set searchTermReclam(value: string){
        this._searchTermReclam = value;
        this.filteredRectifs = this.filtereRectifsReclam(value);
      }
      get searchTermCloture(): string {
        return this._searchTermCloture;
      }
      set searchTermCloture(value: string){
        this._searchTermCloture = value;
        this.filteredRectifs = this.filtereRectifsCloture(value);
      }
  
      get searchTermObsReclam(): string {
        return this._searchTermObsReclam;
      }
      set searchTermObsReclam(value: string){
        this._searchTermObsReclam = value;
        this.filteredRectifs = this.filtereRectifsObsReclam(value);
      }
  
      filtereRectifsNumDoc(seachString: string){
        return this.rectifs.filter(Rectif => Rectif.numDoc.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
      }
      filtereRectifsQutArt(seachBigint: string){
        return this.rectifs.filter(Rectif => Rectif.qutArt.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
      }
      filtereRectifsPrixAch(seachString: string){
        return this.rectifs.filter(Rectif => Rectif.prixAch.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
      }
      filtereRectifsObserv(seachString: string){
        return this.rectifs.filter(Rectif => Rectif.observ.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
      }
      filtereRectifsTypMvt(seachString: string){
        return this.rectifs.filter(Rectif => Rectif.typMvt.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
      }
      filtereRectifsNumRec(seachString: string){
        return this.rectifs.filter(Rectif => Rectif.numRec.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
      }
      filtereRectifsCentre(seachString: string){
        return this.rectifs.filter(Rectif => Rectif.centre.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
      }
      filtereRectifsObsReclam(seachString: string){
        return this.rectifs.filter(Rectif => Rectif.reclam.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
      }
      filtereRectifsReclam(seachString: string){
        return this.rectifs.filter(Rectif => Rectif.reclam.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
      }
      filtereRectifsCloture(seachString: string){
        return this.rectifs.filter(Rectif => Rectif.cloture.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
      }

  /*********end seach fot anything */


  constructor(private authService: TokenStorageService,private windowService: NbWindowService,private dialogService: NbDialogService, private rectifService: RectifService,
    private router: Router,private service: SmartTableData) {

    }


/*  affichage all rectif ****************/
  authority;
  ngOnInit(): void {

    this.authService.getAuthorities().forEach(authority => {
      this.authority=authority;
      console.log(this.authority);
    });

    this.getRectifs();

    
    this.cols = [
      { field: 'id_rectif', header: 'Numéro Rectif' },
      { field: 'date', header: 'Date rectif' },
      { field: 'observ', header: 'Observation' },
      { field: 'typMvt', header: 'Type Mvt' },
      { field: 'numRec', header: 'Numéro Reclamation' },
      { field: 'centre', header: 'Centre' },
      { field: 'datReclam', header: 'Date Reclamation' },
      { field: 'cloture', header: 'Cloture' },
      { field: 'obsReclam', header: 'Observation Reclamation' },
      { field: 'datRepon', header: 'Date Reponse' },
      { field: 'datClotur', header: 'Date Cloture' },
      { field: 'id_rectif', header: 'Consultation' },
      { field: 'id_rectif', header: 'Actions' }
  ];

  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  private getRectifs() {
    this.rectifService.getRectifsList().subscribe(data => {
      this.rectifs = data;
      this.filteredRectifs = this.rectifs;
      console.log(this.rectifs)
    });
  }

/*  affichage all rectif ****************/

  deleteRectif(id_rectif: bigint) {
    this.rectifService.deleteRectif(id_rectif)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log('ERROR: ' + error));
  }

  rectifDetails(id_rectif: bigint){
    this.router.navigate(['details', id_rectif]);
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


  /* delete popap*/

  OpenDeletePopap() {
    this.dialogService.open(DeleteRectifDialogComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }
/* end the popap **/  



/**stat export CSV & PDF & Excel window*/

clear(table: Table) {
  table.clear();
}

previewTableAllRectifExcelPdf = false;
togglepreviewTableRectif(){
  this.previewTableAllRectifExcelPdf = !this.previewTableAllRectifExcelPdf;
}
exportCSV

exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.rectifs);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "rectifs");
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