import { Component, OnInit, TemplateRef, ViewChild,Inject,Input} from '@angular/core';
declare let jsPDF;
import { Bon_liv } from '../../Bon_Livs/bon-liv';
import { Observable } from 'rxjs';
import { BonLivService } from '../bon-liv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartTableData } from '../../../@core/data/smart-table';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDialogService, NbWindowService } from '@nebular/theme';
import {LazyLoadEvent} from 'primeng/api';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { XbaseXtvaDialogComponent } from './window-xbase&tva/xbase&xtva-dialog.component';
import { DeleteBonLivDialogComponent } from './delete-dialog/delete-bon-liv-dialog.component';
import { FormBuilder } from '@angular/forms';
import { SpecialMDialogComponent } from '../../Articles/article-list/window-special-M/special-m-dialog.component';
import { Table } from 'primeng/table';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { UtilisateurService } from '../../Utilisateurs/utilisateur.service';
import { FournisService } from '../../Fourniss/fournis.service';
import { Fournis } from '../../Fourniss/fournis';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
import * as FileSaver from 'file-saver';
import { Art_liv } from '../Art_Livs/art-liv';
import { DatePipe } from '@angular/common';
declare let pdfMake: any ;
/*
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
*/
/*
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfmake.vfs =
pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfmake.vfs;
*/
@Component({
  selector: 'ngx-bon-liv-list',
  templateUrl: './bon-liv-list.component.html',
  styleUrls: ['./bon-liv-list.component.scss']
})
export class BonLivListComponent implements OnInit {
  searchText;
  bonlivs: Bon_liv[];
  closeResult: string;
  editForm: any;
  cols: any[];
  loading: boolean = true;
  exportColumns: any[];
  selectedBonlivs: Bon_liv[];
  dialogVisible: boolean;

  statuses: NbComponentStatus[] = ['info' ];
  shapes: NbComponentShape[] = [ 'rectangle' ];
  sizes: NbComponentSize[] = ['medium'];

    /*****************************Filtrage des donner *****************************/
filteredBonLivs: Bon_liv[];
private _searchTermNumBon: string;
private _searchTermDatBon: string;
private _searchTermCodCli: string;
private _searchTermAdresseCli: string;
private _searchTermNumBonFrs: string;
private _searchTermRaison: string;
private _searchTermBrutHt: string;
private _searchTermTauxRem: string;
private _searchTermMontRem: string;
private _searchTermNetHt: string;
private _searchTermMontTva: string;

private _searchTermTotTtc: string;
private _searchTermNumFac: string;
private _searchTermPlusV: string;
private _searchTermTauxRes: string;
private _searchTermMontTrs: string;

private _searchTermLiv: string;
private _searchTermCommand: string;
private _searchTermPointage: string
private _searchTermMontIrpp: string
private _searchTermPoste: string
private _searchTermCentre: string
private _searchTermCodeTva: string
private _searchTermTrans_action: string
private _searchTermExpide: string
private _searchTermUserId: string
/**end searsh string */


get searchTermNumBon(): string {
  return this._searchTermNumBon;
}
set searchTermNumBon(value: string){
  this._searchTermNumBon = value;
  this.filtereBonLivsNumBon(value).then((vals) => {
    this.filteredBonLivs = vals
  });
}

get searchTermCodCli(): string {
  return this._searchTermCodCli;
}
set searchTermCodCli(value: string){
  this._searchTermCodCli = value;
  this.filteredBonLivs = this.filtereBonLivsNomprenomCli(value);
}
get searchTermAdresseCli(): string {
  return this._searchTermAdresseCli;
}
set searchTermAdresseCli(value: string){
  this._searchTermAdresseCli = value;
  this.filteredBonLivs = this.filtereBonLivsAdresseCli(value);
}
get searchTermNumBonFrs(): string {
  return this._searchTermNumBonFrs;
}
set searchTermNumBonFrs(value: string){
  this._searchTermNumBonFrs = value;
  this.filteredBonLivs = this.filtereBonLivsNumBonFrs(value);
}
get searchTermRaison(): string {
  return this._searchTermRaison;
}
set searchTermRaison(value: string){
  this._searchTermRaison = value;
  this.filteredBonLivs = this.filtereBonLivsRaison(value);
}
get searchTermBrutHt(): string {
  return this._searchTermBrutHt;
}
set searchTermBrutHt(value: string){
  this._searchTermBrutHt = value;
  this.filteredBonLivs = this.filtereBonLivsBrutHt(value);
}
get searchTermMontRem(): string {
  return this._searchTermMontRem;
}
set searchTermMontRem(value: string){
  this._searchTermMontRem = value;
  this.filteredBonLivs = this.filtereBonLivsMontRem(value);
}
get searchTermNetHt(): string {
  return this._searchTermNetHt;
}
set searchTermNetHt(value: string){
  this._searchTermNetHt = value;
  this.filteredBonLivs = this.filtereBonLivsNetHt(value);
}
get searchTermMontTva(): string {
  return this._searchTermMontTva;
}
set searchTermMontTva(value: string){
  this._searchTermMontTva = value;
  this.filteredBonLivs = this.filtereBonLivsMontTva(value);
}
get searchTermTotTtc(): string {
  return this._searchTermTotTtc;
}
set searchTermTotTtc(value: string){
  this._searchTermTotTtc = value;
  this.filteredBonLivs = this.filtereBonLivsTotTtc(value);
}
get searchTermNumFac(): string {
  return this._searchTermNumFac;
}
set searchTermNumFac(value: string){
  this._searchTermNumFac = value;
  this.filteredBonLivs = this.filtereBonLivsNumFac(value);
}
get searchTermPlusV(): string {
  return this._searchTermPlusV;
}
set searchTermPlusV(value: string){
  this._searchTermPlusV = value;
  this.filteredBonLivs = this.filtereBonLivsPlusV(value);
}
get searchTermTauxRes(): string {
  return this._searchTermTauxRes;
}
set searchTermTauxRes(value: string){
  this._searchTermTauxRes = value;
  this.filteredBonLivs = this.filtereBonLivsTauxRes(value);
}
get searchTermTauxRem(): string {
  return this._searchTermTauxRem;
}
set searchTermTauxRem(value: string){
  this._searchTermTauxRem = value;
  this.filteredBonLivs = this.filtereBonLivsTauxRem(value);
}
get searchTermMontTrs(): string {
  return this._searchTermMontTrs;
}
set searchTermMontTrs(value: string){
  this._searchTermMontTrs = value;
  this.filteredBonLivs = this.filtereBonLivsMontTrs(value);
}
get searchTermLiv(): string {
  return this._searchTermLiv;
}
set searchTermLiv(value: string){
  this._searchTermLiv = value;
  this.filteredBonLivs = this.filtereBonLivsLiv(value);
}
get searchTermCommand(): string {
  return this._searchTermCommand;
}
set searchTermCommand(value: string){
  this._searchTermCommand = value;
  this.filteredBonLivs = this.filtereBonLivsCommand(value);
}
get searchTermPointage(): string {
  return this._searchTermPointage;
}
set searchTermPointage(value: string){
  this._searchTermPointage = value;
  this.filteredBonLivs = this.filtereBonLivsPointage(value);
}
get searchTermMontIrpp(): string {
  return this._searchTermMontIrpp;
}
set searchTermMontIrpp(value: string){
  this._searchTermMontIrpp = value;
  this.filteredBonLivs = this.filtereBonLivsMontIrpp(value);
}
get searchTermPoste(): string {
  return this._searchTermPoste;
}
set searchTermPoste(value: string){
  this._searchTermPoste = value;
  this.filteredBonLivs = this.filtereBonLivsPost(value);
}

get searchTermCentre(): string {
  return this._searchTermCentre;
}
set searchTermCentre(value: string){
  this._searchTermCentre = value;
  this.filteredBonLivs = this.filtereBonLivsCentre(value);
}
get searchTermCodeTva(): string {
  return this._searchTermCodeTva;
}
set searchTermCodeTva(value: string){
  this._searchTermCodeTva = value;
  this.filteredBonLivs = this.filtereBonLivsCodeTva(value);
}
get searchTermTrans_action(): string {
  return this._searchTermTrans_action;
}
set searchTermTrans_action(value: string){
  this._searchTermTrans_action = value;
  this.filteredBonLivs = this.filtereBonLivsTrans_action(value);
}
get searchTermExpide(): string {
  return this._searchTermExpide;
}
set searchTermExpide(value: string){
  this._searchTermExpide = value;
  this.filteredBonLivs = this.filtereBonLivsExpide(value);
}
get searchTermUserId(): string {
  return this._searchTermUserId;
}
set searchTermUserId(value: string){
  this._searchTermUserId = value;
  this.filteredBonLivs = this.filtereBonLivsUserId(value);
}


filtereBonLivsNumBon(seachString: string): Promise <Bon_liv[]>{
  return new Promise((resolve,reject) => {
   resolve(this.bonlivs.filter(Bon_liv => Bon_liv.numBon.toLowerCase().indexOf(seachString.toLowerCase()) !== -1));
  })
 // return this.bonlivs.filter(Bon_liv => Bon_liv.numBon.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsNomprenomCli(seachBigint: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.nomprenomCli.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereBonLivsAdresseCli(seachBigint: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.nomprenomCli.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereBonLivsNumBonFrs(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.numBonFrs.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsRaison(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.raison.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsBrutHt(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.brutHt.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsMontRem(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.montRem.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsNetHt(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.netHt.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsMontTva(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.montTva.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsTotTtc(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.totTtc.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsNumFac(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.numFac.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsPlusV(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.plusV.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsTauxRes(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.tauxRes.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsTauxRem(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.tauxRem.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsMontTrs(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.montTrs.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsLiv(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.liv.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsCommand(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.command.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsPointage(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.pointage.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsMontIrpp(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.numBon.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsPost(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.poste.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsTrans_action(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.trans_action.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsExpide(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.expide.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsUserId(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.user.codUser.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsCentre(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.centre.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonLivsCodeTva(seachString: string){
  return this.bonlivs.filter(Bon_liv => Bon_liv.codeTva.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}




filtereBonLivsDate(testini:boolean){
  console.log(this.FilterByDate);
  return this.bonlivs = this.FilterByDate;
}
/*********end seach fot anything */

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
  
  _searchTermMarque;
  constructor(private authService: TokenStorageService,private dialogService: NbDialogService,private http: HttpClient,private bonlivService: BonLivService,
    private router: Router,private service: SmartTableData,private windowService: NbWindowService, private fb: FormBuilder,
    private _route:ActivatedRoute,public utilisateurService: UtilisateurService,public fournisService:FournisService,public datepipe: DatePipe) {

    }

    goToCharts($myParam: string = ''): void {
      const navigationDetails: string[] = ['//pages/Bon_Livs/echarts-bon-liv'];
      if($myParam.length) {
        navigationDetails.push($myParam);
      }
      this.router.navigate(navigationDetails);
    }

    goToModifier(NUM_BON_LIV: string ){
    this.router.navigate(['//pages/Bon_Livs/update-bon-liv',NUM_BON_LIV])
    }

    bonlivDetails(numBon: string ){
      this.router.navigate(['bon-liv-detail',numBon])
      }
/*      
    goToDetails($myParam: string = ''): void {
      const navigationDetails: string[] = ['//pages/Bon_Livs/bon-liv-detail'];
      if($myParam.length) {
        navigationDetails.push($myParam);
      }
      this.router.navigate(navigationDetails);
    }
*/
    virtualBonlivs: Bon_liv[];
    /* afficher all bonlivs**/
    FilterByDate: Bon_liv[];
    agents:Utilisateur[];
    statusessRole:any;
    statusessTransaction:any;
    authority;
    ngOnInit() {
      
      this.authService.getAuthorities().forEach(authority => {
        this.authority=authority.toString();
        console.log(this.authority);
      });
      
      this.getAllMarquesList()
      this.getBonLivs();


      this.cols = [
        { field: 'numBon', header: 'NUM_BON' },
        { field: 'datBon', header: 'DAT_BON' },
        { field: 'nomprenomCli', header: 'nom&prenom client' },
        { field: 'adresseCli', header: 'adresse de Client' },
        { field: 'numCom', header: 'codFrs' },
        { field: 'numCom', header: 'Nom Fournisseur' },
        { field: 'numBonFrs', header: 'numBonFrs' },
        { field: 'livreur', header: 'Livreur de Bon' },
        { field: 'raison', header: 'RAISON' },
        { field: 'brutHt', header: 'BRUT_HT' },
        { field: 'tauxRem', header: 'TAUX_REM' },
        { field: 'montRem', header: 'MONT_REM' },
        { field: 'netHt', header: 'NET_HT' },
        { field: 'montTva', header: 'MONT_TVA' },
        { field: 'totTtc', header: 'TOT_TTC' },
        { field: 'tauxRes', header: 'TAUX_RES' },
        { field: 'montTrs', header: 'MONT_TRS' },
        { field: 'liv', header: 'LIV' },
        { field: 'montIrpp', header: 'MONT_IRPP' },
        { field: 'centre', header: 'CENTRE' },
        { field: 'trans_action', header: 'Transaction' },
        { field: 'user', header: 'Nom&Prenom respensable Bon' },
        { field: 'user', header: 'Post respensable Bon' },
        { field: 'numCom', header: 'Numéro de command' },
        { field: 'numCom', header: 'Date de command' },
        { field: 'numCom', header: 'Nom de command' },
        { field: 'numCom', header: 'Type de command' },
        { field: 'numCom', header: 'Nom&Prenom respensable de Commmand' },
        { field: 'numCom', header: 'Post respensable de Commmand' },
        { field: 'numBon', header: 'Consultation' },
        { field: 'numBon', header: 'Actions' }
    ];

    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

    this.utilisateurService.getUtilisateursList().subscribe(data => {
      this.agents = data;
      console.log(data);
    });

    this.utilisateurService.getRoles().subscribe(data => {
      this.statusessRole = data;
      console.log(data);
    });


    this.statusessTransaction = [
      {label: 'Reçu', value: 'recu'},
      {label: 'Envoyer', value: 'envoyer'}
  ]
    }
  
    private getBonLivs() {
      this.bonlivService.getBon_livsList().subscribe(data => {
        this.bonlivs = data;
        this.filteredBonLivs = this.bonlivs;
        this.loading = false;
        console.log(this.bonlivs);
      });
    }

/* start the popap **/  
  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;


/**end popap */

  /* delete popap*/
  numBon:any;
  OpenDeletePopap(numBon) {
    this.dialogService.open(DeleteBonLivDialogComponent, {
      context: {
        title: numBon,
      },
    });
  }
/* end the popap **/  

  source: LocalDataSource = new LocalDataSource();



  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  /**filter date */
  
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
fournisAllList:Fournis[];
getAllMarquesList(){
this.fournisService.getFournissList().subscribe(data => {
  this.fournisAllList = data;
});
}
getAllListFournis(selectedItems: any){
  if(selectedItems!==null){
     return this.filteredBonLivs = this.bonlivs.filter(Bon_liv => 
      Bon_liv.fournis !== null &&  Bon_liv.fournis.codFrs.toString().indexOf(selectedItems.toString()) !== -1);
    }else{
      this.getBonLivs();
    }
}

getAllListTransaction(selectedItems5: any){
  if(selectedItems5!==null){
     return this.filteredBonLivs = this.bonlivs.filter(Bon_liv => 
      Bon_liv.trans_action !== null && Bon_liv.trans_action.toString().indexOf(selectedItems5.toString()) !== -1);
    }else if(selectedItems5==null){
      console.log(selectedItems5);
      return this.filteredBonLivs = this.bonlivs;
    }
}
/**stat xbase & tva window*/
  openWindowXbaseXtva(numBon) {
  this.dialogService.open(XbaseXtvaDialogComponent, {
    context: {
      title: numBon,
    },
  });
}
/**end xbase & tva window */

/**stat export CSV & PDF & Excel window*/

clear(table: Table) {
  table.clear();
}

displayModalUserTable2: boolean;
image_id: number;
image_idString:string;
util:Utilisateur;
showModalDialogUserTable2(clicked_id) {
  this.image_id=clicked_id;
  this.image_idString=this.image_id.toString();
  this.utilisateurService.getUtilisateur(this.image_idString).subscribe(data => {
    this.util = data;
  });
  this.displayModalUserTable2 = true;
}
image_id2: number;
image_idString2:string;
util2:Utilisateur;
displayModalUserTable2Command: boolean;
showModalDialogUserTable2Command(clicked_id2) {

  this.image_id2=clicked_id2;
  this.image_idString2=this.image_id2.toString();
  this.utilisateurService.getUtilisateur(this.image_idString2).subscribe(data => {
    this.util2 = data;
  });
  this.displayModalUserTable2Command = true;
}
previewTableAllBonlivExcelPdf = false;
togglepreviewTableBonLiv(){
  this.previewTableAllBonlivExcelPdf = !this.previewTableAllBonlivExcelPdf;
}
exportCSV


exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.bonlivs);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "bonlivs");
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

/**bon de livraison imprimer pdf */
articlesPdf:Art_liv[];
artTermsPdf;
BonlivPdf:Bon_liv
generatePdf(numBon:string){
  console.log(numBon);
  console.log(pdfMake);

  const document = this.getDocumentDefinition(numBon);
  pdfMake.createPdf(document).open();
  //pdfMake.createPdf(document).download();


}



  /**pdf  */
resume="balbalbal";
objArticle:any;
objArticle2:any;
lesElement:any;
getDocumentDefinition(numBon: string) {
  
  this.bonlivService.getArtLivForBonLiv(numBon).subscribe(reponse =>{
    this.articlesPdf=reponse;

    this.bonlivService.getArtTermForBonLiv(numBon).subscribe(reponse1 =>{
      this.artTermsPdf=reponse1;

      this.bonlivService.getBon_liv(numBon).subscribe(reponse2 =>{
        this.BonlivPdf=reponse2;

        console.log(this.articlesPdf);
        console.log(this.artTermsPdf);
        console.log(this.BonlivPdf);
      sessionStorage.setItem('articlesPdf', JSON.stringify(this.articlesPdf));
      sessionStorage.setItem('artTermsPdf', JSON.stringify(this.artTermsPdf));
      sessionStorage.setItem('BonlivPdf', JSON.stringify(this.BonlivPdf));
      sessionStorage.setItem('resume', JSON.stringify(this.resume));
      this.objArticle = this.articlesPdf.map( obj => {
        if(obj.codArt==null){
          obj.codArt = "Aucun"
        }
        if(obj.typArt==null){
          obj.typArt = "Aucun"
        }
        if(obj.qutLiv==null || obj.qutLiv==0){
          obj.qutLiv = 0
        }
        if(obj.prixHt==null || obj.prixHt==0){
          obj.prixHt = 0
        }
        if(obj.prixArem==null || obj.prixArem==0){
          obj.prixArem = 0
        }
        if(obj.remExp==null || obj.remExp==0){
          obj.remExp = 0
        }
        if(obj.tva==null || obj.tva==0){
          obj.tva = 0
        }
        return [obj.codArt, obj.typArt, obj.qutLiv, obj.prixHt, obj.prixArem, obj.remExp, obj.tva]
      })
    });
  });
});
if(this.BonlivPdf.fournis!=null)
{
  if(this.BonlivPdf.totTtc==null || this.BonlivPdf.totTtc==0){
    this.BonlivPdf.totTtc=0;
  }
  if(this.BonlivPdf.montRem==null || this.BonlivPdf.montRem==0){
    this.BonlivPdf.montRem=0;
  }
  if(this.BonlivPdf.montTva==null || this.BonlivPdf.montTva==0){
    this.BonlivPdf.montTva=0;
  }
  if(this.BonlivPdf.brutHt==null || this.BonlivPdf.brutHt==0){
    this.BonlivPdf.brutHt=0;
  }
  if(this.BonlivPdf.netHt==null || this.BonlivPdf.netHt==0){
    this.BonlivPdf.netHt=0;
  }
  if(this.BonlivPdf.fournis.matFisc==null || this.BonlivPdf.fournis.matFisc==''){
    this.BonlivPdf.fournis.matFisc="Aucune";
  }
  return {
    content:[{
      columns: [
        [{
            text: 'Centre : '+this.BonlivPdf.centre,
            style: 'name'
          },
          {
            text: 'N~ facture : '+ this.BonlivPdf.numFac,
          },
          {
            text: 'Tel 1 : '+ this.BonlivPdf.user.telephone +', Tel 2 : '+ this.BonlivPdf.user.tell,
            color: 'blue',
          },
          {
            text: 'Fax 1 : '+ this.BonlivPdf.user.faxl +', Fax 2 : '+ this.BonlivPdf.user.faxs,
            color: 'blue',
          },
          {
            text: ' ',
            style: 'header'
          },
          {
            text: ' ',
            style: 'header'
          },
          {
            text: 'Bon de Livraison',
            bold: true,
            fontSize: 20,
            alignment: 'center',
            margin: [0, 20,20, 20]
          },
          {
            text: ' ',
            style: 'header'
          },
          {
            text: 'Numero : '+ this.BonlivPdf.numBon ,
            style: 'ligne',
            margin: [0,10, 0, 0]
          },
          {
            text: 'Date : ' + this.datepipe.transform(this.BonlivPdf.datBon, 'yyyy-MM-dd hh:mm:ss'),
            style: 'ligne' ,
            margin: [0,10, 0, 0]
          },
          {
            text: 'Code : '+ this.BonlivPdf.fournis.codFrs ,
            style: 'ligne1',
          },
          {
            text: 'Client : '+ this.BonlivPdf.fournis.raison ,
            style: 'ligne1',
          },
          {
            text: 'Adresse :  '+ this.BonlivPdf.fournis.adresse ,
            style: 'ligne1',
          },
          {
            text: 'Tel :  '+ this.BonlivPdf.fournis.tel ,
            style: 'ligne1',
          },
          {
            text: 'Mat Fiscale :  '+ this.BonlivPdf.fournis.matFisc ,
            style: 'ligne1',
          },
          {
            text: ' ',
            style: 'header'
          },
        ],      
      ],
    },
  [
    {
      text: ' ',
      style: 'header'
    },
    { width:  '*', text: ''},
        {
          width: 'auto',
          table: {
          body: [
            [
              {
                text: 'Article',
                style: 'tableHeader'
              },
              {
                text: 'type Article',
                style: 'tableHeader'
              },
              {
                text: 'Quantité',
                style: 'tableHeader'
              },
              {
                text: 'Prix ht',
                style: 'tableHeader'
              },
              {
                text: 'Prix Arem',
                style: 'tableHeader'
              },
              {
                text: 'Rem Exp',
                style: 'tableHeader'
              },
              {
                text: 'Tva',
                style: 'tableHeader'
              },
            ],
            
            ...this.articlesPdf.map(obj => {
              if(obj.codArt==null){
                obj.codArt = "Aucun"
              }
              if(obj.typArt==null){
                obj.typArt = "Aucun"
              }
              if(obj.qutLiv==null || obj.qutLiv==0){
                obj.qutLiv = 0
              }
              if(obj.prixHt==null || obj.prixHt==0){
                obj.prixHt = 0
              }
              if(obj.prixArem==null || obj.prixArem==0){
                obj.prixArem = 0
              }
              if(obj.remExp==null || obj.remExp==0){
                obj.remExp = 0
              }
              if(obj.tva==null || obj.tva==0){
                obj.tva = 0
              }
              return [obj.codArt, obj.typArt, obj.qutLiv, obj.prixHt, obj.prixArem, obj.remExp, obj.tva];
            })
          ],
          alignment: "center"
          },
          
        },
        { width:  '*', text: ''},
    {
      text: ' ',
      style: 'header'
    },

    {
      text: ' Tot ht : '+ this.BonlivPdf.totTtc + '      Mont Rem : '+ this.BonlivPdf.montRem + '      Tot Tva : '+ this.BonlivPdf.montTva +
      '      Tot brut Ht : '+ this.BonlivPdf.brutHt + '      Tot net Ht : '+ this.BonlivPdf.netHt,
      style: 'total',
    },
    {
      text: ' ',
      style: 'header'
    },
    {
      text: ' Signature',
      style: 'sign',
      alignment : 'right'
    },
  ]
 
],
  styles: {
    header: {
      fontSize: 18,
      bold: true,

      alignment: 'center',
    },
    name:{
      fontSize: 16,
      bold:true
    },
    total: {
      fontSize: 12,
      bold: true,
      italics: true,

    },
    ligne: {
      fontSize: 12,
      bold: true,
      italics: true, 
    },
    ligne1: {
      fontSize: 12,
      bold: true,
      italics: true, 
      margin: [300,10,0,0]
    },
    sign: {
      margin: [0, 50, 20, 10],
      alignment: 'right',
      italics: true, 
    },
    tableHeader: {
      bold: true,
      fontSize: 15,
      alignment: 'center', 
    }
  }
};
}else{
  if(this.BonlivPdf.user.telephone==null || this.BonlivPdf.user.telephone==0){
    this.BonlivPdf.user.telephone=0;
  }
  if(this.BonlivPdf.user.tell==null || !this.BonlivPdf.user.tell){
    this.BonlivPdf.user.tell="Aucun";
  }
  if(this.BonlivPdf.user.faxl==null || !this.BonlivPdf.user.faxl){
    this.BonlivPdf.user.faxl="Aucun";
  }
  if(this.BonlivPdf.user.faxs==null || !this.BonlivPdf.user.faxs){
    this.BonlivPdf.user.faxs="Aucun";
  }
  if(this.BonlivPdf.numFac==null || !this.BonlivPdf.numFac){
    this.BonlivPdf.numFac=BigInt(0);
  }
  if(this.BonlivPdf.totTtc==null || this.BonlivPdf.totTtc==0){
    this.BonlivPdf.totTtc=0;
  }
  if(this.BonlivPdf.montRem==null || this.BonlivPdf.montRem==0){
    this.BonlivPdf.montRem=0;
  }
  if(this.BonlivPdf.montTva==null || this.BonlivPdf.montTva==0){
    this.BonlivPdf.montTva=0;
  }
  if(this.BonlivPdf.brutHt==null || this.BonlivPdf.brutHt==0){
    this.BonlivPdf.brutHt=0;
  }
  if(this.BonlivPdf.netHt==null || this.BonlivPdf.netHt==0){
    this.BonlivPdf.netHt=0;
  }
    return { 
      content:[{
        columns: [
        [
          {
            text: 'Centre : '+this.BonlivPdf.centre,
            style: 'name'
          },
          {
            text: 'N~ facture : '+ this.BonlivPdf.numFac,
          },
          {
            text: 'Tel 1 : '+ this.BonlivPdf.user.telephone +', Tel 2 : '+ this.BonlivPdf.user.tell,
            color: 'blue',
          },
          {
            text: 'Fax 1 : '+ this.BonlivPdf.user.faxl +', Fax 2 : '+ this.BonlivPdf.user.faxs,
            color: 'blue',
          },
          {
            text: ' ',
            style: 'header'
          },
          {
            text: ' ',
            style: 'header'
          },
          {
            text: 'Bon de Livraison',
            bold: true,
            fontSize: 20,
            alignment: 'center',
            margin: [0, 20,20, 20]
          },
          {
            text: ' ',
            style: 'header'
          },
          {
            text: 'Numero : '+ this.BonlivPdf.numBon ,
            style: 'ligne',
            margin: [0,10, 0, 0]
          },
          {
            text: 'Date : ' + this.datepipe.transform(this.BonlivPdf.datBon, 'yyyy-MM-dd hh:mm:ss'),
            style: 'ligne' ,
            margin: [0,10, 0, 0]
          },
          {
            text: 'Code : '+ this.BonlivPdf.nomprenomCli.slice(this.BonlivPdf.nomprenomCli.search(" : "),this.BonlivPdf.nomprenomCli.length) ,
            style: 'ligne1',
          },
          {
            text: 'Client : '+ this.BonlivPdf.nomprenomCli.slice(0,this.BonlivPdf.nomprenomCli.search(" : ")) ,
            style: 'ligne1',
          },
          {
            text: 'Adresse :  '+ this.BonlivPdf.adresseCli ,
            style: 'ligne1',
          },
          {
            text: ' ',
            style: 'header'
          },
        ],
      ],
    },
    
      [
        {
          text: ' ',
          style: 'header'
        },
        { width:  '*', text: ''},
        {
          width: 'auto',
          table: {
          body: [
            [
              {
                text: 'Article',
                style: 'tableHeader'
              },
              {
                text: 'type Article',
                style: 'tableHeader'
              },
              {
                text: 'Quantité',
                style: 'tableHeader'
              },
              {
                text: 'Prix ht',
                style: 'tableHeader'
              },
              {
                text: 'Prix Arem',
                style: 'tableHeader'
              },
              {
                text: 'Rem Exp',
                style: 'tableHeader'
              },
              {
                text: 'Tva',
                style: 'tableHeader'
              },
            ],
            
            ...this.articlesPdf.map(obj => {
              if(obj.codArt==null){
                obj.codArt = "Aucun"
              }
              if(obj.typArt==null){
                obj.typArt = "Aucun"
              }
              if(obj.qutLiv==null || obj.qutLiv==0){
                obj.qutLiv = 0
              }
              if(obj.prixHt==null || obj.prixHt==0){
                obj.prixHt = 0
              }
              if(obj.prixArem==null || obj.prixArem==0){
                obj.prixArem = 0
              }
              if(obj.remExp==null || obj.remExp==0){
                obj.remExp = 0
              }
              if(obj.tva==null || obj.tva==0){
                obj.tva = 0
              }
              return [obj.codArt, obj.typArt, obj.qutLiv, obj.prixHt, obj.prixArem, obj.remExp, obj.tva];
            })
          ],
          alignment: "center"
          },
          
        },
        { width:  '*', text: ''},
        {
          text: ' ',
          style: 'header'
        },

        {
          text: ' Tot tc : '+ this.BonlivPdf.totTtc + '      Mont Rem : '+ this.BonlivPdf.montRem + '      Tot Tva : '+ this.BonlivPdf.montTva +
          '      Tot brut Ht : '+ this.BonlivPdf.brutHt + '      Tot net Ht : '+ this.BonlivPdf.netHt,
          style: 'total',
        },
        {
          text: ' ',
          style: 'header'
        },
        {
          text: ' Signature',
          style: 'sign',
          alignment : 'right'
        },
      ]
  ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,

        alignment: 'center',
      },
      name:{
        fontSize: 16,
        bold:true
      },
      total: {
        fontSize: 12,
        bold: true,
        italics: true,

      },
      ligne: {
        fontSize: 12,
        bold: true,
        italics: true, 
      },
      ligne1: {
        fontSize: 12,
        bold: true,
        italics: true, 
        margin: [300,10,0,0]
      },
      sign: {
        margin: [0, 50, 20, 10],
        alignment: 'right',
        italics: true, 
      },
      tableHeader: {
        bold: true,
        fontSize: 15,
        alignment: 'center', 
      }
    }
  };
}
}


  /** end pdf */




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
      this.bonlivService.getAllBonLivBydateBetween(latest_startDate.toString(),latest_endDate.toString()).subscribe(data => {
        this.filteredBonLivs = data;
        console.log(data);
      });
      this.testStatus = 2
    }else {
      this.testStatus = 2
      this.getBonLivs();
      this.testStatus = 1
    }
  }
}