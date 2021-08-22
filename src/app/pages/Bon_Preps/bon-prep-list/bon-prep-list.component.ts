import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { Bon_prep } from '../bon-prep';
import { BonPrepService } from '../bon-prep.service';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDateService, NbDialogService, NbWindowService } from '@nebular/theme';
import { WindowDateFilterComponent } from './window-date-filter/window-date-filter.component';
import { DeleteBonPrepDialogComponent } from './delete-dialog/delete-bon-prep-dialog.component';
import { Fournis } from '../../Fourniss/Fournis';
import { XbaseXtvaDialogComponent } from './window-xbase&tva/xbase&xtva-dialog.component';
import { Table } from 'primeng/table';
import { FournisService } from '../../Fourniss/fournis.service';
import { UtilisateurService } from '../../Utilisateurs/utilisateur.service';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-bon-prep-list',
  templateUrl: './bon-prep-list.component.html',
  styleUrls: ['./bon-prep-list.component.scss']
})
export class BonPrepListComponent implements OnInit {
  statuses: NbComponentStatus[] = ['info' ];
  shapes: NbComponentShape[] = [ 'rectangle' ];
  sizes: NbComponentSize[] = ['medium'];
  searchText;
  bonpreps: Bon_prep[];
  exportColumns: any[];
  cols: any[];

  selectedAgents : Utilisateur;
  /*****************************Filtrage des donner *****************************/
filteredBonPreps: Bon_prep[];

private _searchTermNumBon: string;
private _searchTermCodCli: string;
private _searchTermBrutHt: string;
private _searchTermTauxRem: string;
private _searchTermMontRem: string;
private _searchTermNetHt: string;
private _searchTermMontTva: string;
private _searchTermTotTtc: string;

private _searchTermPlusV: string;
private _searchTermTauxRes: string;
private _searchTermMontTrs: string;
private _searchTermcodUser: string;
private _searchTermCodFrs: string;

private _searchTermRaison: string;
private _searchTermLiv: string;
private _searchTermCommand: string;
private _searchTermPointage: string;
private _searchTermNatLiv: string;
private _searchTermNatDoc: string; 
private _searchTermCodeTva: string;
private _searchTermAdresse: string;
private _searchTermPoint: string;
private _searchTermAideMag: string;
private _searchTermEmbal: string; 
private _searchTermPrep: string;
private _searchTermPoste: string;
private _searchTermCentre: string;
private _searchTermAvantage: string;

private _searchTermRaisonFrs: string;
/**end searsh string */


get searchTermNumBon(): string {
  return this._searchTermNumBon;
}
set searchTermNumBon(value: string){
  this._searchTermNumBon = value;
  this.filteredBonPreps = this.filtereBonPrepsNumBon(value);
}


get searchTermRaison(): string {
  return this._searchTermRaison;
}
set searchTermRaison(value: string){
  this._searchTermRaison = value;
  this.filteredBonPreps = this.filtereBonPrepsRaison(value);
}

get searchTermLiv(): string {
  return this._searchTermLiv;
}
set searchTermLiv(value: string){
  this._searchTermLiv = value;
  this.filteredBonPreps = this.filtereBonPrepsLiv(value);
}

get searchTermCommand(): string {
  return this._searchTermCommand;
}
set searchTermCommand(value: string){
  this._searchTermCommand = value;
  this.filteredBonPreps = this.filtereBonPrepsCommand(value);
}

get searchTermPointage(): string {
  return this._searchTermPointage;
}
set searchTermPointage(value: string){
  this._searchTermPointage = value;
  this.filteredBonPreps = this.filtereBonPrepsPointage(value);
}

get searchTermNatLiv(): string {
  return this._searchTermNatLiv;
}
set searchTermNatLiv(value: string){
  this._searchTermNatLiv = value;
  this.filteredBonPreps = this.filtereBonPrepsNatLiv(value);
}

get searchTermNatDoc(): string {
  return this._searchTermNatDoc;
}
set searchTermNatDoc(value: string){
  this._searchTermNatDoc = value;
  this.filteredBonPreps = this.filtereBonPrepsNatDoc(value);
}

get searchTermCodeTva(): string {
  return this._searchTermCodeTva;
}
set searchTermCodeTva(value: string){
  this._searchTermCodeTva = value;
  this.filteredBonPreps = this.filtereBonPrepsCodeTva(value);
}

get searchTermAdresse(): string {
  return this._searchTermAdresse;
}
set searchTermAdresse(value: string){
  this._searchTermAdresse = value;
  this.filteredBonPreps = this.filtereBonPrepsAdresse(value);
}

get searchTermPoint(): string {
  return this._searchTermPoint;
}
set searchTermPoint(value: string){
  this._searchTermPoint = value;
  this.filteredBonPreps = this.filtereBonPrepsPoint(value);
}

get searchTermAideMag(): string {
  return this._searchTermAideMag;
}
set searchTermAideMag(value: string){
  this._searchTermAideMag = value;
  this.filteredBonPreps = this.filtereBonPrepsAideMag(value);
}

get searchTermEmbal(): string {
  return this._searchTermEmbal;
}
set searchTermEmbal(value: string){
  this._searchTermEmbal = value;
  this.filteredBonPreps = this.filtereBonPrepsEmbal(value);
}

get searchTermPrep(): string {
  return this._searchTermPrep;
}
set searchTermPrep(value: string){
  this._searchTermPrep = value;
  this.filteredBonPreps = this.filtereBonPrepsPrep(value);
}

get searchTermPoste(): string {
  return this._searchTermPoste;
}
set searchTermPoste(value: string){
  this._searchTermPoste = value;
  this.filteredBonPreps = this.filtereBonPrepsPost(value);
}

get searchTermCentre(): string {
  return this._searchTermCentre;
}
set searchTermCentre(value: string){
  this._searchTermCentre = value;
  this.filteredBonPreps = this.filtereBonPrepsCentre(value);
}
/* end searsh string*/

get searchTermCodCli(): string {
  return this._searchTermCodCli;
}
set searchTermCodCli(value: string){
  this._searchTermCodCli = value;
  this.filteredBonPreps = this.filtereBonPrepsCodCli(value);
}
get searchTermBrutHt(): string {
  return this._searchTermBrutHt;
}
set searchTermBrutHt(value: string){
  this._searchTermBrutHt = value;
  this.filteredBonPreps = this.filtereBonPrepsBrutHt(value);
}
get searchTermTauxRem(): string {
  return this._searchTermTauxRem;
}
set searchTermTauxRem(value: string){
  this._searchTermTauxRem = value;
  this.filteredBonPreps = this.filtereBonPrepsTauxRem(value);
}
get searchTermMontRem(): string {
  return this._searchTermMontRem;
}
set searchTermMontRem(value: string){
  this._searchTermMontRem = value;
  this.filteredBonPreps = this.filtereBonPrepsMontRem(value);
}
get searchTermNetHt(): string {
  return this._searchTermNetHt;
}
set searchTermNetHt(value: string){
  this._searchTermNetHt = value;
  this.filteredBonPreps = this.filtereBonPrepsNetHt(value);
}
get searchTermMontTva(): string {
  return this._searchTermMontTva;
}
set searchTermMontTva(value: string){
  this._searchTermMontTva = value;
  this.filteredBonPreps = this.filtereBonPrepsMontTva(value);
}
get searchTermTotTtc(): string {
  return this._searchTermTotTtc;
}
set searchTermTotTtc(value: string){
  this._searchTermTotTtc = value;
  this.filteredBonPreps = this.filtereBonPrepsTotTtc(value);
}
get searchTermPlusV(): string {
  return this._searchTermPlusV;
}
set searchTermPlusV(value: string){
  this._searchTermPlusV = value;
  this.filteredBonPreps = this.filtereBonPrepsPlusV(value);
}
get searchTermTauxRes(): string {
  return this._searchTermTauxRes;
}
set searchTermTauxRes(value: string){
  this._searchTermTauxRes = value;
  this.filteredBonPreps = this.filtereBonPrepsTauxRes(value);
}
get searchTermMontTrs(): string {
  return this._searchTermMontTrs;
}
set searchTermMontTrs(value: string){
  this._searchTermMontTrs = value;
  this.filteredBonPreps = this.filtereBonPrepsMontTrs(value);
}
get searchTermcodUser(): string {
  return this._searchTermcodUser;
}
set searchTermcodUser(value: string){
  this._searchTermcodUser = value;
  this.filteredBonPreps = this.filtereBonPrepscodUser(value);
}
get searchTermCodFrs(): string {
  return this._searchTermCodFrs;
}
set searchTermCodFrs(value: string){
  this._searchTermCodFrs = value;
  this.filteredBonPreps = this.filtereBonPrepsCodFrs(value);
}
get searchTermAvantage(): string {
  return this._searchTermAvantage;
}
set searchTermAvantage(value: string){
  this._searchTermAvantage = value;
  this.filteredBonPreps = this.filtereBonPrepsAvantage(value);
}
get searchTermRaisonFrs(): string {
  return this._searchTermRaisonFrs;
}
set searchTermRaisonFrs(value: string){
  this._searchTermRaisonFrs = value;
  this.filteredBonPreps = this.filtereBonPrepsRaisonFrs(value);
}

filtereBonPrepsNumBon(seachString: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.numBon.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonPrepsRaison(seachString: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.raison.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonPrepsLiv(seachString: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.liv.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonPrepsCommand(seachString: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.command.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonPrepsPointage(seachString: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.pointage.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonPrepsNatLiv(seachString: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.natLiv.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonPrepsNatDoc(seachString: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.natDoc.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}

filtereBonPrepsCodeTva(seachString: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.codeTva.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonPrepsAdresse(seachString: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.adresse.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonPrepsPoint(seachString: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.point.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonPrepsAideMag(seachString: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.aideMag.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonPrepsEmbal(seachString: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.embal.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonPrepsPrep(seachString: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.prep.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonPrepsPost(seachString: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.poste.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereBonPrepsCentre(seachString: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.centre.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}

/** */
filtereBonPrepsCodCli(seachBigint: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.nomprenomCli.toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereBonPrepsBrutHt(seachBigint: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.brutHt.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereBonPrepsTauxRem(seachBigint: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.tauxRem.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereBonPrepsMontRem(seachBigint: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.montRem.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereBonPrepsNetHt(seachBigint: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.netHt.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereBonPrepsMontTva(seachBigint: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.montTva.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereBonPrepsTotTtc(seachBigint: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.totTtc.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereBonPrepsPlusV(seachBigint: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.plusV.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereBonPrepsTauxRes(seachBigint: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.tauxRes.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereBonPrepsMontTrs(seachBigint: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.montTrs.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereBonPrepscodUser(seachBigint: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.user.codUser.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereBonPrepsCodFrs(seachBigint: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.codFrs.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereBonPrepsAvantage(seachBigint: string){
  return this.bonpreps.filter(Bon_prep => Bon_prep.aven_tage.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereBonPrepsRaisonFrs(seachBigint: string){
  return this.bonpreps.filter(Fournis => Fournis.raison.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}

/**date filter */

@ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
@ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;


openWindow(contentTemplate) {
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

openWindowForm() {
  this.windowService.open(WindowDateFilterComponent, { title: `Window` });
}

openWindowWithoutBackdrop() {
  this.windowService.open(
    this.disabledEscTemplate,
    {
      title: 'Window without backdrop',
      hasBackdrop: false,
      closeOnEsc: false,
    },
  );
}


/**date filter */
  /****************Filtrage des donner ***************/
  constructor(private authService: TokenStorageService, protected dateService: NbDateService<Date>,private bonprepService: BonPrepService,
    private router: Router,private service: SmartTableData,private dialogService: NbDialogService,private windowService: NbWindowService
    ,private fournisService:FournisService,private utilisateurService:UtilisateurService) {

    }

    goToModifier(NUM_BON_PREP: string ){
      this.router.navigate(['//pages/Bon_Preps/update-bon-prep',NUM_BON_PREP])
    }

    codFrsliste:Fournis[];
    statusessNatLiv:any;
    Prepliste:any;
    agentsPrep:Utilisateur[];
    agents:Utilisateur[];
    statusessAventage:any;
    statusessRole:any;
    authority;
    ngOnInit() {
      this.authService.getAuthorities().forEach(authority => {
        this.authority=authority;
        console.log(this.authority);
      });
      this.getBonPreps();
      this.getAllMarquesList();
      this.cols = [
        { field: 'numBon', header: 'NUM_BON_PREP' },
        { field: 'datBon', header: 'DAT_BON' },
        { field: 'codFrs', header: 'codFrs' },
        { field: 'codFrs', header: 'Nom Fournisseur' },
        { field: 'raison', header: 'RAISON' },
        { field: 'brutHt', header: 'BRUT_HT' },
        { field: 'tauxRem', header: 'TAUX_REM' },
        { field: 'montRem', header: 'MONT_REM' },
        { field: 'netHt', header: 'NET_HT' },
        { field: 'montTva', header: 'MONT_TVA' },
        { field: 'tauxRes', header: 'TAUX_RES' },
        { field: 'totTtc', header: 'TOT_TTC' },
        { field: 'montTrs', header: 'MONT_TRS' },
        { field: 'liv', header: 'LIV' },
        { field: 'command', header: 'COMMAND' },
        { field: 'pointage', header: 'POINTAGE' },
        { field: 'natLiv', header: 'NAT_LIV' },
        { field: 'natDoc', header: 'NAT_DOC' },
        { field: 'codeTva', header: 'CODE_TVA' },
        { field: 'adresse', header: 'ADRESSE' },
        { field: 'aideMag', header: 'AIDE_MAG' },
        { field: 'embal', header: 'EMBAL' },
        { field: 'prep', header: 'PREP' },
        { field: 'poste', header: 'POSTE' },
        { field: 'centre', header: 'CENTRE' },
        { field: 'aven_tage', header: 'AVANTAGE' },
        { field: 'user', header: 'Nom&Prenom respensable Bon' },
        { field: 'user', header: 'Post respensable Bon' },
        { field: 'numBon', header: 'Consultation' },
        { field: 'numBon', header: 'Actions' }
    ];

    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

    this.fournisService.getFournissList().subscribe(data => {
      this.codFrsliste = data;
      console.log(data);
    });

    this.utilisateurService.getUtilisateursList().subscribe(data => {
      this.agents = data;
      this.agentsPrep = data.filter(Utilisateur => Utilisateur.roles[0].name=='ROLE_PREPARATEUR');
    });

    this.utilisateurService.getRoles().subscribe(data => {
      this.statusessRole = data;
      console.log(data);
    });
    this.statusessNatLiv = [
      {label: 'Sur comptoir', value: 'sur_comptoir'},
      {label: 'Livraison', value: 'livraison'}
  ]

  this.statusessAventage =[
    {label: 'Sur le champ', value: 'sur_le_champ'},
    {label: 'Avec un delay', value: 'sur_un_delay'},
    {label: 'N existe pas', value: 'n_existe_pas'}
  ]
    
}
  
    private getBonPreps() {
      this.bonprepService.getBon_prepsList().subscribe(data => {
        this.bonpreps = data;
        this.filteredBonPreps = this.bonpreps;
        console.log(data);
      });
    }

    
    goToCharts($myParam: string = ''): void {
      const navigationDetails: string[] = ['//pages/Bon_Preps/echarts-bon-prep'];
      if($myParam.length) {
        navigationDetails.push($myParam);
      }
      this.router.navigate(navigationDetails);
    }

  deleteBon_prep(NUM_BON: string) {
    this.bonprepService.deleteBon_prep(NUM_BON)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log('ERROR: ' + error));
  }

  bon_prepDetails(NUM_BON: string){
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
  /* delete popap*/

numBon:any;
OpenDeletePopap(numBon) {
  this.dialogService.open(DeleteBonPrepDialogComponent, {
    context: {
      title: numBon,
    },
  });
}
/* end the popap **/  
  
openWindowXbaseXtva(numBon) {
  this.dialogService.open(XbaseXtvaDialogComponent, {
    context: {
      title: numBon,
    },
  });
}

/**show image user */
displayModalUser: boolean;
image_id: number;
image_idString:string;
util:Utilisateur;
showModalDialogUser(clicked_id) {
  this.image_id=clicked_id;
  this.image_idString=this.image_id.toString();
  this.utilisateurService.getUtilisateur(this.image_idString).subscribe(data => {
    this.util = data;
  });
  this.displayModalUser = true;
}


/**show image user */
fournisAllList:Fournis[];
getAllMarquesList(){
this.fournisService.getFournissList().subscribe(data => {
  this.fournisAllList = data;
});
}
getAllListFournis(selectedItems: any){
  if(selectedItems!==null){
     return this.filteredBonPreps = this.bonpreps.filter(Bon_prep => 
      Bon_prep.codFrs !== null &&  Bon_prep.codFrs.codFrs.toString().indexOf(selectedItems.toString()) !== -1);
    }else{
      this.getBonPreps();
    }
}
getAllListFournisNom(selectedItems2: any){
  if(selectedItems2!==null){
     return this.filteredBonPreps = this.bonpreps.filter(Bon_prep => 
      Bon_prep.codFrs !== null &&  Bon_prep.codFrs.raison.toString().indexOf(selectedItems2.toString()) !== -1);
    }else{
      this.getBonPreps();
    }
}
getAllListNatLivs(selectedItems3: any){
  if(selectedItems3!==null){
     return this.filteredBonPreps = this.bonpreps.filter(Bon_prep => 
      Bon_prep.natLiv !== null &&  Bon_prep.natLiv.toString().indexOf(selectedItems3.toString()) !== -1);
    }else{
      this.getBonPreps();
    }
}
getAllListAvantage(selectedItems4: any){
  if(selectedItems4!==null){
     return this.filteredBonPreps = this.bonpreps.filter(Bon_prep => 
      Bon_prep.aven_tage !== null &&  Bon_prep.aven_tage.toString().indexOf(selectedItems4.toString()) !== -1);
    }else{
      this.getBonPreps();
    }
}
getAllListItemsAgents(selectedItems5: any){
  if(selectedItems5!==null){
     return this.filteredBonPreps = this.bonpreps.filter(Bon_prep => 
      Bon_prep.user !== null && Bon_prep.user.firstname.toString().indexOf(selectedItems5.toString()) !== -1);
    }else if(selectedItems5==null){
      console.log(selectedItems5);
      return this.filteredBonPreps = this.bonpreps;
    }
}
getAllListItemsRoles(selectedItems6: any){
  if(selectedItems6!==null){
     return this.filteredBonPreps = this.bonpreps.filter(Bon_prep => 
      Bon_prep.user !== null && Bon_prep.user.roles[0].name.toString().indexOf(selectedItems6.toString()) !== -1);
    }else if(selectedItems6==null){
      console.log(selectedItems6);
      return this.filteredBonPreps = this.bonpreps;
    }
}
/**stat export CSV & PDF & Excel window*/

clear(table: Table) {
  table.clear();
}

displayModalUserTable2: boolean;
image_id2: number;
image_idString2:string;
util2:Utilisateur;
showModalDialogUserTable2(clicked_id2) {
  this.image_id2=clicked_id2;
  this.image_idString2=this.image_id2.toString();
  this.utilisateurService.getUtilisateur(this.image_idString2).subscribe(data => {
    this.util2 = data;
  });
  this.displayModalUserTable2 = true;
}

previewTableAllBonprepExcelPdf = false;
togglepreviewTableBonPrep(){
  this.previewTableAllBonprepExcelPdf = !this.previewTableAllBonprepExcelPdf;
}
exportCSV

exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.bonpreps);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "bonpreps");
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


postMessage(messageFromChild:any) {
  console.log(messageFromChild);
  //call service/api to post message
}
}