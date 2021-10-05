import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Fournis } from '../Fournis';
import { FournisService } from '../fournis.service';
import { LocalDataSource } from 'ng2-smart-table';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-fournis-list',
  templateUrl: './fournis-list.component.html',
  styleUrls: ['./fournis-list.component.scss']
})
export class FournisListComponent implements OnInit {
  
  fourniss: Fournis[];

  searchText;
    /*****************************Filtrage des donner *****************************/
    filteredFourniss: Fournis[];
    private _searchTermCodFrs: string;
    private _searchTermRaison: string;

    private _searchTermRespon1: string;
    private _searchTermRespon2: string;
    private _searchTermAdresse: string;
    private _searchTermTel: string;
    private _searchTermFax: string;
    private _searchTermPaye: string;
    private _searchTermModReg: string;
    private _searchTermCreance: string;
    private _searchTermCumulAch: string;
    private _searchTermAffCours: string;
    private _searchTermRistourne: string;
    private _searchTermCumulRis: string;
    private _searchTermCumulVen: string;
    private _searchTermMarge: string;
    private _searchTermRemise: string;
    private _searchTermFodec: string;
    private _searchTermRemTarif: string;
    private _searchTermDelLiv: string;
    private _searchTermAvoir: string;
    private _searchTermCumTva: string;

    private _searchTermCumulBl: string;
    private _searchTermEcheance: string;
    private _searchTermChifAff: string;
    private _searchTermFacInst: string;
    private _searchTermEffNrec: string;
    private _searchTermObligation: string;

    private _searchTermRegEsp: string;
    private _searchTermRegChq: string;
    private _searchTermRegEff: string;
    private _searchTermEffNech: string;
    private _searchTermChqCir: string;
    private _searchTermCredDoc: string;
    private _searchTermContAcc: string;
    private _searchTermVirement: string;
    private _searchTermContDoc: string;
    private _searchTermSoldeDep: string;
    private _searchTermPayement: string;
    private _searchTermEscompte: string;

    private _searchTermEspece: string;
    private _searchTermSolde: string;
    private _searchTermEffEch: string;
    private _searchTermEchEff: string;
    private _searchTermPosit: string;
    private _searchTermTotRegl: string;
    private _searchTermRetenue: string;

    /**end searsh string */
  
  
  get searchTermCodFrs(): string {
    return this._searchTermCodFrs;
  }
  set searchTermCodFrs(value: string){
    this._searchTermCodFrs = value;
    this.filteredFourniss = this.filtereFournissZone(value);
  }
  get searchTermRaison(): string {
    return this._searchTermRaison;
  }
  set searchTermRaison(value: string){
    this._searchTermRaison = value;
    this.filteredFourniss = this.filtereFournissRaison(value);
  }
  get searchTermRespon1(): string {
    return this._searchTermRespon1;
  }
  set searchTermRespon1(value: string){
    this._searchTermRespon1 = value;
    this.filteredFourniss = this.filtereFournissFourniss(value);
  }
  get searchTermRespon2(): string {
    return this._searchTermRespon2;
  }
  set searchTermRespon2(value: string){
    this._searchTermRespon2 = value;
    this.filteredFourniss = this.filtereFournissRespon2(value);
  }
  get searchTermAdresse(): string {
    return this._searchTermAdresse;
  }
  set searchTermAdresse(value: string){
    this._searchTermAdresse = value;
    this.filteredFourniss = this.filtereFournissAdresse(value);
  } 
  get searchTermTel(): string {
    return this._searchTermTel;
  }
  set searchTermTel(value: string){
    this._searchTermTel = value;
    this.filteredFourniss = this.filtereFournissTel(value);
  } 
  get searchTermFax(): string {
    return this._searchTermFax;
  }
  set searchTermFax(value: string){
    this._searchTermFax = value;
    this.filteredFourniss = this.filtereFournissFax(value);
  } 
  get searchTermPaye(): string {
    return this._searchTermPaye;
  }
  set searchTermPaye(value: string){
    this._searchTermPaye = value;
    this.filteredFourniss = this.filtereFournissPaye(value);
  } 
  get searchTermModReg(): string {
    return this._searchTermModReg;
  }
  set searchTermModReg(value: string){
    this._searchTermModReg = value;
    this.filteredFourniss = this.filtereFournissModReg(value);
  } 
  get searchTermCreance(): string {
    return this._searchTermCreance;
  }
  set searchTermCreance(value: string){
    this._searchTermCreance = value;
    this.filteredFourniss = this.filtereFournissCreance(value);
  }  
  get searchTermCumulAch(): string {
    return this._searchTermCumulAch;
  }
  set searchTermCumulAch(value: string){
    this._searchTermCumulAch = value;
    this.filteredFourniss = this.filtereFournissCumulAch(value);
  }  
  get searchTermAffCours(): string {
    return this._searchTermAffCours;
  }
  set searchTermAffCours(value: string){
    this._searchTermAffCours = value;
    this.filteredFourniss = this.filtereFournissAffCours(value);
  }  
  get searchTermRistourne(): string {
    return this._searchTermRistourne;
  }
  set searchTermRistourne(value: string){
    this._searchTermRistourne = value;
    this.filteredFourniss = this.filtereFournissRistourne(value);
  }   
  get searchTermCumulRis(): string {
    return this._searchTermCumulRis;
  }
  set searchTermCumulRis(value: string){
    this._searchTermCumulRis = value;
    this.filteredFourniss = this.filtereFournissCumulRis(value);
  } 
  get searchTermCumulVen(): string {
    return this._searchTermCumulVen;
  }
  set searchTermCumulVen(value: string){
    this._searchTermCumulVen = value;
    this.filteredFourniss = this.filtereFournissCumulVen(value);
  } 
  get searchTermMarge(): string {
    return this._searchTermMarge;
  }
  set searchTermMarge(value: string){
    this._searchTermMarge = value;
    this.filteredFourniss = this.filtereFournissMarge(value);
  } 
  get searchTermRemise(): string {
    return this._searchTermRemise;
  }
  set searchTermRemise(value: string){
    this._searchTermRemise = value;
    this.filteredFourniss = this.filtereFournissRemise(value);
  } 
  get searchTermFodec(): string {
    return this._searchTermFodec;
  }
  set searchTermFodec(value: string){
    this._searchTermFodec = value;
    this.filteredFourniss = this.filtereFournissFodec (value);
  } 
  get searchTermRemTarif(): string {
    return this._searchTermRemTarif;
  }
  set searchTermRemTarif(value: string){
    this._searchTermRemTarif = value;
    this.filteredFourniss = this.filtereFournissRemTarif (value);
  } 
  get searchTermDelLiv(): string {
    return this._searchTermDelLiv;
  }
  set searchTermDelLiv(value: string){
    this._searchTermDelLiv = value;
    this.filteredFourniss = this.filtereFournissDelLiv(value);
  } 
  get searchTermAvoir(): string {
    return this._searchTermAvoir;
  }
  set searchTermAvoir(value: string){
    this._searchTermAvoir = value;
    this.filteredFourniss = this.filtereFournissAvoir(value);
  } 
  get searchTermCumTva(): string {
    return this._searchTermCumTva;
  }
  set searchTermCumTva(value: string){
    this._searchTermCumTva = value;
    this.filteredFourniss = this.filtereFournissCumTva(value);
  } 
  get searchTermCumulBl(): string {
    return this._searchTermCumulBl;
  }
  set searchTermCumulBl(value: string){
    this._searchTermCumulBl = value;
    this.filteredFourniss = this.filtereFournissCumulBl(value);
  }
  get searchTermEcheance(): string {
    return this._searchTermEcheance;
  }
  set searchTermEcheance(value: string){
    this._searchTermEcheance = value;
    this.filteredFourniss = this.filtereFournissEcheance(value);
  }
  get searchTermChifAff(): string {
    return this._searchTermChifAff;
  }
  set searchTermChifAff(value: string){
    this._searchTermChifAff = value;
    this.filteredFourniss = this.filtereFournissChifAff(value);
  }
  get searchTermFacInst(): string {
    return this._searchTermFacInst;
  }
  set searchTermFacInst(value: string){
    this._searchTermFacInst = value;
    this.filteredFourniss = this.filtereFournissFacInst(value);
  }
  get searchTermEffNrec(): string {
    return this._searchTermEffNrec;
  }
  set searchTermEffNrec(value: string){
    this._searchTermEffNrec = value;
    this.filteredFourniss = this.filtereFournissEffNrec(value);
  }
  get searchTermObligation(): string {
    return this._searchTermObligation;
  }
  set searchTermObligation(value: string){
    this._searchTermObligation = value;
    this.filteredFourniss = this.filtereFournissObligation(value);
  }
  get searchTermRegEsp(): string {
    return this._searchTermRegEsp;
  }
  set searchTermRegEsp(value: string){
    this._searchTermRegEsp = value;
    this.filteredFourniss = this.filtereFournissRegEsp(value);
  }
  get searchTermRegChq(): string {
    return this._searchTermRegChq;
  }
  set searchTermRegChq(value: string){
    this._searchTermRegChq = value;
    this.filteredFourniss = this.filtereFournissRegChq(value);
  }
  get searchTermRegEff(): string {
    return this._searchTermRegEff;
  }
  set searchTermRegEff(value: string){
    this._searchTermRegEff = value;
    this.filteredFourniss = this.filtereFournissRegEff(value);
  }
  get searchTermEffNech(): string {
    return this._searchTermEffNech;
  }
  set searchTermEffNech(value: string){
    this._searchTermEffNech = value;
    this.filteredFourniss = this.filtereFournissEffNech(value);
  }
  get searchTermChqCir(): string {
    return this._searchTermChqCir;
  }
  set searchTermChqCir(value: string){
    this._searchTermChqCir = value;
    this.filteredFourniss = this.filtereFournissChqCir(value);
  }
  get vsearchTermCredDoc(): string {
    return this._searchTermCredDoc;
  }
  set searchTermCredDoc(value: string){
    this._searchTermCredDoc = value;
    this.filteredFourniss = this.filtereFournissCredDoc(value);
  }
  get searchTermContAcc(): string {
    return this._searchTermContAcc;
  }
  set searchTermContAcc(value: string){
    this._searchTermContAcc = value;
    this.filteredFourniss = this.filtereFournissContAcc(value);
  }
  get searchTermVirement(): string {
    return this._searchTermVirement;
  }
  set searchTermVirement(value: string){
    this._searchTermVirement = value;
    this.filteredFourniss = this.filtereFournissVirement(value);
  }
  get searchTermContDoc(): string {
    return this._searchTermContDoc;
  }
  set searchTermContDoc(value: string){
    this._searchTermContDoc = value;
    this.filteredFourniss = this.filtereFournissContDoc(value);
  }
  get searchTermSoldeDep(): string {
    return this._searchTermSoldeDep;
  }
  set searchTermSoldeDep(value: string){
    this._searchTermSoldeDep = value;
    this.filteredFourniss = this.filtereFournissSoldeDep(value);
  }
  get searchTermPayement(): string {
    return this._searchTermPayement;
  }
  set searchTermPayement(value: string){
    this._searchTermPayement = value;
    this.filteredFourniss = this.filtereFournissPayement(value);
  }
  get searchTermEscompte(): string {
    return this._searchTermEscompte;
  }
  set searchTermEscompte(value: string){
    this._searchTermEscompte = value;
    this.filteredFourniss = this.filtereFournissEscompte(value);
  }
  get searchTermEspece(): string {
    return this._searchTermEspece;
  }
  set searchTermEspece(value: string){
    this._searchTermEspece = value;
    this.filteredFourniss = this.filtereFournissEspece(value);
  }
  get searchTermSolde(): string {
    return this._searchTermSolde;
  }
  set searchTermSolde(value: string){
    this._searchTermSolde = value;
    this.filteredFourniss = this.filtereFournissSolde(value);
  }
  get searchTermEffEch(): string {
    return this._searchTermEffEch;
  }
  set searchTermEffEch(value: string){
    this._searchTermEffEch = value;
    this.filteredFourniss = this.filtereFournissEffEch(value);
  }
  get searchTermEchEff(): string {
    return this._searchTermEchEff;
  }
  set searchTermEchEff(value: string){
    this._searchTermEchEff = value;
    this.filteredFourniss = this.filtereFournissEchEff(value);
  }

  get searchTermPosit(): string {
    return this._searchTermPosit;
  }
  set searchTermPosit(value: string){
    this._searchTermPosit = value;
    this.filteredFourniss = this.filtereFournissPosit(value);
  }
  get searchTermTotRegl(): string {
    return this._searchTermTotRegl;
  }
  set searchTermTotRegl(value: string){
    this._searchTermTotRegl = value;
    this.filteredFourniss = this.filtereFournissTotRegl(value);
  } 
  get searchTermRetenue(): string {
    return this._searchTermRetenue;
  }
  set searchTermRetenue(value: string){
    this._searchTermRetenue = value;
    this.filteredFourniss = this.filtereFournissRetenue(value);
  } 
  
  filtereFournissZone(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.codFrs.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissRaison(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.raison.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissFourniss(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.respon1.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissRespon2(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.respon2.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissAdresse(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.adresse.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissTel(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.tel.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissFax(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.fax.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissPaye(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.paye.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissModReg(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.modReg.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissCreance(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.creance.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissCumulAch(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.cumulAch.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissAffCours(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.affCours.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissRistourne(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.ristourne.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissCumulRis(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.cumulRis.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissCumulVen(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.cumulVen.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissMarge(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.marge.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissRemise(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.remise.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissFodec(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.fodec.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissRemTarif(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.remTarif.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissDelLiv(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.delLiv.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissAvoir(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.avoir.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissCumTva(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.cumTva.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissCumulBl(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.cumulBl.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissEcheance(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.echeance.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissChifAff(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.chifAff.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissFacInst(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.facInst.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissEffNrec(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.effNrec.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissObligation(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.obligation.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissRegEsp(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.regEsp.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissRegChq(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.regChq.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissRegEff(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.regEff.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissEffNech(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.effNech.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissChqCir(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.chqCir.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissCredDoc(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.credDoc.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissContAcc(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.contAcc.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissVirement(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.virement.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissContDoc(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.contDoc.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissSoldeDep(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.soldeDep.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissPayement(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.payement.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissEscompte(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.escompte.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissEspece(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.espece.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissSolde(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.solde.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissEffEch(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.effEch.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissEchEff(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.echEff.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissPosit(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.posit.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissTotRegl(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.totRegl.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereFournissRetenue(seachString: string){
    return this.fourniss.filter(Fournis => Fournis.retenue.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  
  /****************Filtrage des donner ***************/
  constructor(private authService: TokenStorageService,private dialogService: NbDialogService, private fournisService: FournisService,
    private router: Router,private service: SmartTableData) {

    }


/*  affichage all detPrep ****************/
authority;
  ngOnInit(){
    this.authService.getAuthorities().forEach(authority => {
      this.authority=authority.toString();
      console.log(this.authority);
    });
    this.getFourniss();
  }

  private getFourniss() {
    this.fournisService.getFournissList().subscribe(data => {
      this.fourniss = data;
      this.filteredFourniss = this.fourniss;
    });
  }

/*  affichage all detPrep ****************/

  source: LocalDataSource = new LocalDataSource();

}