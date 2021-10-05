import { Component, OnInit, ViewChild ,TemplateRef } from '@angular/core';
import { Achats } from '../Achats';
import { Router } from '@angular/router';
import { SmartTableData } from '../../../@core/data/smart-table';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDialogService, NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { AchatsService } from '../achats.service';
import { ValiderAchatsDialogComponent } from './valider-dialog/valider-achats-dialog.component';
import { NotValiderAchatsDialogComponent } from './Notvalider-dialog/notValider-achats-dialog.component';

import { Table } from 'primeng/table';
import { UtilisateurService } from '../../Utilisateurs/utilisateur.service';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ngx-achats-list',
  templateUrl: './achats-list.component.html',
  styleUrls: ['./achats-list.component.scss']
})
export class AchatsListComponent implements OnInit {
  achatss: Achats[];
  closeResult: string;
  editForm: any;
  searchText;
  statuses: NbComponentStatus[] = ['primary', 'success', 'info', 'warning', 'danger'  ];
  shapes: NbComponentShape[] = [ 'rectangle', 'semi-round', 'round' ];
  sizes: NbComponentSize[] = ['tiny', 'small', 'medium', 'large', 'giant'];

  exportColumns: any[];
  cols: any[];
/*****************************Filtrage des donner *****************************/
    filteredAchatss: Achats[];
    private _searchTermNumDoc: string;
    private _searchTermTypDoc: string;
    private _searchTermDate: string;
    private _searchTermCodFrs: string;
    private _searchTermCodUtilisateur: string;
    private _searchTermMontant: string;
    private _searchTermMontHt: string;
    private _searchTermTva: string;
    private _searchTermSolde: string;
    private _searchTermNumCom: string;
    private _searchTermTypReg: string;
    private _searchTermMontReg: string;
    private _searchTermDocReg: string;
    private _searchTermPret: string;
    private _searchTermValidation: string;
/**end searsh string */
    get searchTermNumDoc(): string {
      return this._searchTermNumDoc;
    }
    set searchTermNumDoc(value: string){
      this._searchTermNumDoc = value;
      this.filteredAchatss = this.filtereAchatsNumDoc(value);
    }

    get searchTermTypDoc(): string {
      return this._searchTermTypDoc;
    }
    set searchTermTypDoc(value: string){
      this._searchTermTypDoc = value;
      this.filteredAchatss = this.filtereAchatsTypDoc(value);
    }

    get searchTermCodUtilisateur(): string {
      return this._searchTermCodUtilisateur;
    }
    set searchTermCodUtilisateur(value: string){
      this._searchTermCodUtilisateur = value;
      this.filteredAchatss = this.filtereAchatsCodUtilisateur(value);
    }
    
    get searchTermMontant(): string {
      return this._searchTermMontant;
    }
    set searchTermMontant(value: string){
      this._searchTermMontant = value;
      this.filteredAchatss = this.filtereAchatsMontant(value);
    }
    
    get searchTermCodFrs(): string {
      return this._searchTermCodFrs;
    }
    set searchTermCodFrs(value: string){
      this._searchTermCodFrs = value;
      this.filteredAchatss = this.filtereAchatsCodFrs(value);
    }

    get searchTermMontHt(): string {
      return this._searchTermMontHt;
    }
    set searchTermMontHt(value: string){
      this._searchTermMontHt = value;
      this.filteredAchatss = this.filtereAchatsMontHt(value);
    }

    get searchTermTva(): string {
      return this._searchTermTva;
    }
    set searchTermTva(value: string){
      this._searchTermTva = value;
      this.filteredAchatss = this.filtereAchatsTva(value);
    }
 
    get searchTermSolde(): string {
      return this._searchTermSolde;
    }
    set searchTermSolde(value: string){
      this._searchTermSolde = value;
      this.filteredAchatss = this.filtereAchatsSolde(value);
    }

    get searchTermNumCom(): string {
      return this._searchTermNumCom;
    }
    set searchTermNumCom(value: string){
      this._searchTermNumCom = value;
      this.filteredAchatss = this.filtereAchatsNumCom(value);
    }

    get searchTermTypReg(): string {
      return this._searchTermTypReg;
    }
    set searchTermTypReg(value: string){
      this._searchTermTypReg = value;
      this.filteredAchatss = this.filtereAchatsTypReg(value);
    }

    get searchTermMontReg(): string {
      return this._searchTermMontReg;
    }
    set searchTermMontReg(value: string){
      this._searchTermMontReg = value;
      this.filteredAchatss = this.filtereAchatsMontReg(value);
    }

    get searchTermDocReg(): string {
      return this._searchTermDocReg;
    }
    set searchTermDocReg(value: string){
      this._searchTermDocReg = value;
      this.filteredAchatss = this.filtereAchatsDocReg(value);
    }
 
    get searchTermPret(): string {
      return this._searchTermPret;
    }
    set searchTermPret(value: string){
      this._searchTermPret = value;
      this.filteredAchatss = this.filtereAchatsPret(value);
    }
    get searchTermValidation(): string {
      return this._searchTermValidation;
    }
    set searchTermValidation(value: string){
      this._searchTermValidation = value;
      this.filteredAchatss = this.filtereAchatsValidation(value);
    } 

    
filtereAchatsNumDoc(seachString: string){
  return this.achatss.filter(Achats => Achats.numDocAchat.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereAchatsTypDoc(seachBigint: string){
  return this.achatss.filter(Achats => Achats.typDoc.toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
/*
filtereAchatsDate(seachString: string){
  return this.achatss.filter(Achats => Achats.date.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}*/
filtereAchatsCodFrs(seachString: string){
  return this.achatss.filter(Achats => Achats.codFrs.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereAchatsCodUtilisateur(seachString: string){
  return this.achatss.filter(Achats => Achats.codUtilisateur.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereAchatsMontant(seachString: string){
  return this.achatss.filter(Achats => Achats.montant.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereAchatsMontHt(seachString: string){
  return this.achatss.filter(Achats => Achats.montHt.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereAchatsTva(seachString: string){
  return this.achatss.filter(Achats => Achats.tva.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereAchatsSolde(seachString: string){
  return this.achatss.filter(Achats => Achats.solde.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereAchatsNumCom(seachString: string){
  return this.achatss.filter(Achats => Achats.numCom.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereAchatsTypReg(seachString: string){
  return this.achatss.filter(Achats => Achats.typReg.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereAchatsMontReg(seachString: string){
  return this.achatss.filter(Achats => Achats.montReg.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereAchatsDocReg(seachString: string){
  return this.achatss.filter(Achats => Achats.docReg.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereAchatsPret(seachString: string){
  return this.achatss.filter(Achats => Achats.pret.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereAchatsValidation(seachString: string){
  return this.achatss.filter(Achats => Achats.validation.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
/*********end seach fot anything */


goToPage(pageName:string):void{
  this.router.navigate([`${pageName}`]);
}
constructor(private authService: TokenStorageService,private achatsService: AchatsService,private dialogService: NbDialogService,private http: HttpClient,private router: Router,
  private service: SmartTableData,private windowService: NbWindowService, private fb: FormBuilder,public utilisateurService: UtilisateurService,public datepipe: DatePipe) {

   }

    /* afficher all achats**/
    statusessPayment: any[];
    statusessValidation: any[];
    statusessTypDoc: any[];
    agents:Utilisateur[];
    authority;
    
    ngOnInit() {

      this.authService.getAuthorities().forEach(authority => {
        this.authority=authority.toString();
        console.log(this.authority);
      });
      
      this.getAchatss();

      
      this.cols = [
        { field: 'numDocAchat', header: 'NUM_DOC' },
        { field: 'typDoc', header: 'TYP_DOC' },
        { field: 'date', header: 'DATE' },
        { field: 'montant', header: 'MONTANT' },
        { field: 'montHt', header: 'montant Hors Tva' },
        { field: 'tva', header: 'T.V.A' },
        { field: 'solde', header: 'SOLDE' },
        { field: 'numCom', header: 'NUM_COM' },
        { field: 'typReg', header: 'TYP_REG' },
        { field: 'montReg', header: 'MONT_REG' },
        { field: 'docReg', header: 'DOC_REG' },
        { field: 'pret', header: 'Payment' },
        { field: 'validation', header: 'Validation Achat' },
        { field: 'user', header: 'Nom&Prenom respensable Achats' },
        { field: 'numDocAchat', header: 'Consultation' },
        { field: 'numDocAchat', header: 'Actions' }
    ];

    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));


    this.statusessTypDoc = [
      {label: 'BON LIV', value: 'BON_LIV'},
      {label: 'AVOIR BL', value: 'AVOIR_BL'}
  ]

    this.statusessPayment = [
      {label: 'non_payer', value: 'non_payer'},
      {label: 'payer', value: 'payer'}
  ]

  this.statusessValidation = [
    {label: 'non_valider', value: 'non_valider'},
    {label: 'valider', value: 'valider'}
]

this.utilisateurService.getUtilisateursList().subscribe(data => {
  this.agents = data;
  console.log(data);
});
}
  
    private getAchatss() {
      this.achatsService.getAchatssList().subscribe(data => {
        this.achatss = data;
        this.filteredAchatss = this.achatss;
        console.log(this.filteredAchatss)
      });
    }

    goToCharts($myParam: string = ''): void {
      const navigationDetails: string[] = ['//pages/Achatss/echarts-achats'];
      if($myParam.length) {
        navigationDetails.push($myParam);
      }
      this.router.navigate(navigationDetails);
    }


  /* delete popap*/
  numDocAchat:any;
  OpenValidationPopap(numDocAchat) {
    console.log(numDocAchat);
    this.dialogService.open(ValiderAchatsDialogComponent, {
      context: {
        title: numDocAchat,
      },
    });
  }
  OpenNotValidationPopap(numDocAchat) {
    console.log(numDocAchat);
    this.dialogService.open(NotValiderAchatsDialogComponent, {
      context: {
        title: numDocAchat,
      },
    });
  }
/* end the popap **/  

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

  getAllListPayment(selectedItems5: any){
    if(selectedItems5!==null){
       return this.filteredAchatss = this.achatss.filter(Achats => 
        Achats.pret !== null && Achats.pret.toString().indexOf(selectedItems5.toString()) !== -1);
      }else if(selectedItems5==null){
        console.log(selectedItems5);
        return this.filteredAchatss = this.achatss;
      }
  }
  getAllListValidation(selectedItems6: any){
    if(selectedItems6!==null){
       return this.filteredAchatss = this.achatss.filter(Achats => 
        Achats.validation !== null && Achats.validation.toString().indexOf(selectedItems6.toString()) !== -1);
      }else if(selectedItems6==null){
        console.log(selectedItems6);
        return this.filteredAchatss = this.achatss;
      }
  }
  /**stat export CSV & PDF & Excel window*/

clear(table: Table) {
  table.clear();
}
position: string;

displayPositionUserRole: boolean;
showPositionDialogUserRole(position: string) {
  this.position = position;
  this.displayPositionUserRole = true;
}



displayModalUserTable2: boolean;
showModalDialogUserTable2() {
  this.displayModalUserTable2 = true;
}

previewTableAllAchatsExcelPdf = false;
togglepreviewTableAchats(){
  this.previewTableAllAchatsExcelPdf = !this.previewTableAllAchatsExcelPdf;
}
exportCSV

exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.achatss);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "achatss");
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



//**LISTS  Fk */

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
  this.achatsService.getAllAchatBydateBetween(latest_startDate.toString(),latest_endDate.toString()).subscribe(data => {
    this.filteredAchatss = data;
    console.log(data);
  });
  this.testStatus = 2
}else {
  this.testStatus = 2
  this.getAchatss();
  this.testStatus = 1
}
}

}
