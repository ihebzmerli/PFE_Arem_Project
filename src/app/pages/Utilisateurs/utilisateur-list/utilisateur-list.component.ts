import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Utilisateur } from '../utilisateur';
import { UtilisateurService } from '../utilisateur.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { DeletePrimeDialogComponent } from '../../Primes/prime-list/delete-dialog/delete-prime-dialog.component';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDialogService , NbWindowService} from '@nebular/theme';
import { ShowPasswordDialogComponent } from './showPassword/show-password-dialog.component';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrls: ['./utilisateur-list.component.scss']
})
export class UtilisateurListComponent implements OnInit {

  statuses: NbComponentStatus[] = ['info' ];
  shapes: NbComponentShape[] = [ 'rectangle' ];
  sizes: NbComponentSize[] = ['medium'];
  searchText;

  utilisateurs: Utilisateur[];
    /*****************************Filtrage des donner *****************************/
    filteredUtilisateurs: Utilisateur[];
    private _searchTermLastname: string;
    private _searchTermFirstname: string;
    private _searchTermUserName: string;
    private _searchTermEmail: string;
    private _searchTermCin: string;
    private _searchTermAddress: string;
    private _searchTermCps: string;
    private _searchTermTelephone: string;
    private _searchTermPassword: string;
    private _searchTermPseudo: string;
    private _searchTermTypeContrat: string;
    private _searchTermRaison: string;
    private _searchTermFamille: string;
    private _searchTermSalaire: string;
    private _searchTermPrimeDeRendement: string;
    private _searchTermHeuresDeTravail: string;
    private _searchTermVenteParHeure: string;
    private _searchTermObjectifParJour: string;
    private _searchTermObjectifParMois: string;
    private _searchTermTypeConge: string;
    private _searchTermPrimeDev: string;
    private _searchTermPrimeGlobal: string;
    private _searchTermPrimeParClient: string;
    private _searchTermPrimeStock: string;
    private _searchTermPostV: string;
    private _searchTermCodUser: string;
    private _searchTermRc: string;
    private _searchTermRespon1: string;
    private _searchTermFonction1: string;
    private _searchTermFaxs: string;
    private _searchTermAdrSiege: string;
    private _searchTermRuel: string;
    private _searchTermNumRuel: string;
    private _searchTermCpl: string;
    private _searchTermVillel: string;
    private _searchTermRegionl: string;
    private _searchTermTell: string;
    private _searchTermFaxl: string;
    private _searchTermAdrLiv: string;
    private _searchTermRegion: string;
    private _searchTermTaxe: string;
    private _searchTermCcb1: string;
    private _searchTermBank1: string;
    private _searchTermAgence1: string;
    private _searchTermGaranties: string;
    private _searchTermCodGrp: string;
    private _searchTermModReg: string;
    private _searchTermDomBan: string;
    private _searchTermEcheance: string;
    private _searchTermCrMax: string;
    private _searchTermDetMvt: string;
    private _searchTermCredit: string;
    private _searchTermPreVen: string;
    private _searchTermCumulAch: string;
    private _searchTermChifAff1: string;
    private _searchTermChifAff2: string;
    private _searchTermChifAff3: string;
    private _searchTermTauxRem: string;
    private _searchTermTauxCom: string;
    private _searchTermReste: string;
    private _searchTermTauxRes: string;
    private _searchTermValRes: string;
    private _searchTermPatron: string;
    private _searchTermRang: string;
    private _searchTermImpaye: string;
    private _searchTermChqImpaye: string;
    private _searchTermEfPort: string;
    private _searchTermEfBanque: string;
    private _searchTermEfNrecu: string;
    private _searchTermAvCom: string;
    private _searchTermCaution: string;
    private _searchTermBenefice: string;
    private _searchTermTauxBene: string;
    private _searchTermRecFff: string;
    private _searchTermTva: string;
    private _searchTermCle: string;
    private _searchTermSoldDep: string;
    private _searchTermInteret: string;
    private _searchTermRegChq: string;
    private _searchTermRegEff: string;
    private _searchTermRegEsp: string;
    private _searchTermFacInst: string;
    private _searchTermAvoir: string;
    private _searchTermEffInst: string;
    private _searchTermSoldeBq: string;
    private _searchTermCreance: string;
    private _searchTermEffEnc: string;
    private _searchTermEffEsc: string;
    private _searchTermComission: string;
    private _searchTermBloc: string;
    private _searchTermCodeTva: string;
    private _searchTermRemOrg: string;
    private _searchTermAvance: string;
    private _searchTermChqPf: string;
    private _searchTermRetenue: string;
    private _searchTermRegVir: string;
    private _searchTermAvN1: string;
    private _searchTermClasse: string;
    private _searchTermRistourne: string;
    private _searchTermCaPrev: string;
    private _searchTermSoldeCpf: string;
    private _searchTermSoldeImp: string;
    private _searchTermSoldeEpf: string;
    private _searchTermCaMens: string;
    private _searchTermCrImax: string;
    private _searchTermFcreN1: string;
    private _searchTermFcreN2: string;
    private _searchTermFreglN1: string;
    private _searchTermFreglN2: string;
    private _searchTermFescN1: string;
    private _searchTermFescN2: string;
    private _searchTermFbkN1: string;
    private _searchTermFbkN2: string;
    private _searchTermFefpN1: string;
    private _searchTermFefpN2: string;
    private _searchTermFchpN1: string;
    private _searchTermFchpN2: string;
    private _searchTermFefnrN1: string;
    private _searchTermFefnrN2: string;
    private _searchTermIcreN1: string;
    private _searchTermIcreN2: string;
    private _searchTermIreglN1: string;
    private _searchTermIreglN2: string;
    private _searchTermIescN1: string;
    private _searchTermIescN2: string;
    private _searchTermIbkN1: string;
    private _searchTermIbkN2: string;
    private _searchTermIefpN1: string;
    private _searchTermIefpN2: string;
    private _searchTermIchpN1: string;
    private _searchTermIchpN2: string;
    private _searchTermIefnrN1: string;
    private _searchTermIefnrN2: string;
    private _searchTermCommand: string;
    private _searchTermRemExp: string;
    private _searchTermChefMag: string;
    private _searchTermJourVisit: string;
    private _searchTermInstance: string;
    private _searchTermComptant: string;
    private _searchTermBl: string;
    private _searchTermNatLiv: string;
    private _searchTermMois1: string;
    private _searchTermMois2: string;
    private _searchTermMois3: string;
    private _searchTermMois4: string;
    private _searchTermMois5: string;
    private _searchTermMois6: string;
    private _searchTermMois7: string;
    private _searchTermMois8: string;
    private _searchTermMois9: string;
    private _searchTermMois10: string;
    private _searchTermMois11: string;
    private _searchTermMois12: string;
    private _searchTermMargePour: string;
    private _searchTermMargeVal: string;
    private _searchTermCredblEnc: string;
    private _searchTermCredinstec: string;
    private _searchTermObservatio: string;
    private _searchTermObserv: string;
    private _searchTermGouv1: string;
    private _searchTermGouv2: string;
    private _searchTermNatcaution: string;
    private _searchTermCheque: string;
    private _searchTermEspece: string;
    private _searchTermTraite: string;
    private _searchTermCrRef: string;
    private _searchTermSoldTerm: string;
    private _searchTermChqImp: string;
    private _searchTermCriRef: string;
    private _searchTermRemFam: string;
    private _searchTermReglement: string;
    private _searchTermDelai: string;
    private _searchTermNbTranche: string;
    private _searchTermCodSteq: string;
    private _searchTermReference: string;
    private _searchTermSansRet: string;
    private _searchTermCliGroup: string;
    private _searchTermTauxMarge: string;

    /**end searsh string */
  
  

  get searchTermLastname(): string {
    return this._searchTermLastname;
  }
  set searchTermLastname(value: string){
    this._searchTermLastname = value;
    this.filteredUtilisateurs = this.filtereUtilisateursLastname(value);
  }
  get searchTermFirstname(): string {
    return this._searchTermFirstname;
  }
  set searchTermFirstname(value: string){
    this._searchTermFirstname = value;
    this.filteredUtilisateurs = this.filtereUtilisateursFirstname(value);
  }
  get searchTermUserName(): string {
    return this._searchTermUserName;
  }
  set searchTermUserName(value: string){
    this._searchTermUserName = value;
    this.filteredUtilisateurs = this.filtereUtilisateursUserName(value);
  }
  get searchTermEmail(): string {
    return this._searchTermEmail;
  }
  set searchTermEmail(value: string){
    this._searchTermEmail = value;
    this.filteredUtilisateurs = this.filtereUtilisateursEmail(value);
  }
  get searchTermCin(): string {
    return this._searchTermCin;
  }
  set searchTermCin(value: string){
    this._searchTermCin = value;
    this.filteredUtilisateurs = this.filtereUtilisateursCin(value);
  }
  get searchTermAddress(): string {
    return this._searchTermAddress;
  }
  set searchTermAddress(value: string){
    this._searchTermAddress = value;
    this.filteredUtilisateurs = this.filtereUtilisateursAddress(value);
  }
  get searchTermCps(): string {
    return this._searchTermCps;
  }
  set searchTermCps(value: string){
    this._searchTermCps = value;
    this.filteredUtilisateurs = this.filtereUtilisateursCps(value);
  }
  get searchTermTelephone(): string {
    return this._searchTermTelephone;
  }
  set searchTermTelephone(value: string){
    this._searchTermTelephone = value;
    this.filteredUtilisateurs = this.filtereUtilisateursTelephone(value);
  }
  get searchTermPassword(): string {
    return this._searchTermPassword;
  }
  set searchTermPassword(value: string){
    this._searchTermPassword = value;
    this.filteredUtilisateurs = this.filtereUtilisateursPassword(value);
  }
  get searchTermPseudo(): string {
    return this._searchTermPseudo;
  }
  set searchTermPseudo(value: string){
    this._searchTermPseudo = value;
    this.filteredUtilisateurs = this.filtereUtilisateursPseudo(value);
  }
  get searchTermTypeContrat(): string {
    return this._searchTermTypeContrat;
  }
  set searchTermTypeContrat(value: string){
    this._searchTermTypeContrat = value;
    this.filteredUtilisateurs = this.filtereUtilisateursTypeContrat(value);
  }
  get searchTermRaison(): string {
    return this._searchTermRaison;
  }
  set searchTermRaison(value: string){
    this._searchTermRaison = value;
    this.filteredUtilisateurs = this.filtereUtilisateursRaison(value);
  }
  get searchTermFamille(): string {
    return this._searchTermFamille;
  }
  set searchTermFamille(value: string){
    this._searchTermFamille = value;
    this.filteredUtilisateurs = this.filtereUtilisateursFamille(value);
  }
  get searchTermSalaire(): string {
    return this._searchTermSalaire;
  }
  set searchTermSalaire(value: string){
    this._searchTermSalaire = value;
    this.filteredUtilisateurs = this.filtereUtilisateursSalaire(value);
  }
  get searchTermPrimeDeRendement(): string {
    return this._searchTermPrimeDeRendement;
  }
  set searchTermPrimeDeRendement(value: string){
    this._searchTermPrimeDeRendement = value;
    this.filteredUtilisateurs = this.filtereUtilisateursPrimeDeRendement(value);
  }
  get searchTermHeuresDeTravail(): string {
    return this._searchTermHeuresDeTravail;
  }
  set searchTermHeuresDeTravail(value: string){
    this._searchTermHeuresDeTravail = value;
    this.filteredUtilisateurs = this.filtereUtilisateursHeuresDeTravail(value);
  }
  get searchTermVenteParHeure(): string {
    return this._searchTermVenteParHeure;
  }
  set searchTermVenteParHeure(value: string){
    this._searchTermVenteParHeure = value;
    this.filteredUtilisateurs = this.filtereUtilisateursVenteParHeure(value);
  }
  get searchTermObjectifParJour(): string {
    return this._searchTermObjectifParJour;
  }
  set searchTermObjectifParJour(value: string){
    this._searchTermObjectifParJour = value;
    this.filteredUtilisateurs = this.filtereUtilisateursObjectifParJour(value);
  }
  get searchTermObjectifParMois(): string {
    return this._searchTermObjectifParMois;
  }
  set searchTermObjectifParMois(value: string){
    this._searchTermObjectifParMois = value;
    this.filteredUtilisateurs = this.filtereUtilisateursObjectifParMois(value);
  }
  get searchTermTypeConge(): string {
    return this._searchTermTypeConge;
  }
  set searchTermTypeConge(value: string){
    this._searchTermTypeConge = value;
    this.filteredUtilisateurs = this.filtereUtilisateursTypeConge(value);
  }
  get searchTermPrimeDev(): string {
    return this._searchTermPrimeDev;
  }
  set searchTermPrimeDev(value: string){
    this._searchTermPrimeDev = value;
    this.filteredUtilisateurs = this.filtereUtilisateursPrimeDev(value);
  }
  get searchTermPrimeGlobal(): string {
    return this._searchTermPrimeGlobal;
  }
  set searchTermPrimeGlobal(value: string){
    this._searchTermPrimeGlobal = value;
    this.filteredUtilisateurs = this.filtereUtilisateursPrimeGlobal(value);
  }
  get searchTermPrimeParClient(): string {
    return this._searchTermPrimeParClient;
  }
  set searchTermPrimeParClient(value: string){
    this._searchTermPrimeParClient = value;
    this.filteredUtilisateurs = this.filtereUtilisateursPrimeParClient(value);
  }
  get searchTermPrimeStock(): string {
    return this._searchTermPrimeStock;
  }
  set searchTermPrimeStock(value: string){
    this._searchTermPrimeStock = value;
    this.filteredUtilisateurs = this.filtereUtilisateursPrimeStock(value);
  }
  get searchTermPostV(): string {
    return this._searchTermPostV;
  }
  set searchTermPostV(value: string){
    this._searchTermPostV = value;
    this.filteredUtilisateurs = this.filtereUtilisateursPostV(value);
  }
  get searchTermCodUser(): string {
    return this._searchTermCodUser;
  }
  set searchTermCodUser(value: string){
    this._searchTermCodUser = value;
    this.filteredUtilisateurs = this.filtereUtilisateursCodUser(value);
  }
  get searchTermRc(): string {
    return this._searchTermRc;
  }
  set searchTermRc(value: string){
    this._searchTermRc = value;
    this.filteredUtilisateurs = this.filtereUtilisateursRc(value);
  }
  get searchTermRespon1(): string {
    return this._searchTermRespon1;
  }
  set searchTermRespon1(value: string){
    this._searchTermRespon1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateursRespon1(value);
  }
  get searchTermFonction1(): string {
    return this._searchTermFonction1;
  }
  set searchTermFonction1(value: string){
    this._searchTermFonction1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateursFonction1(value);
  }
  get searchTermFaxs(): string {
    return this._searchTermFaxs;
  }
  set searchTermFaxs(value: string){
    this._searchTermFaxs = value;
    this.filteredUtilisateurs = this.filtereUtilisateursFaxs(value);
  }
  get searchTermAdrSiege(): string {
    return this._searchTermAdrSiege;
  }
  set searchTermAdrSiege(value: string){
    this._searchTermAdrSiege = value;
    this.filteredUtilisateurs = this.filtereUtilisateursAdrSiege(value);
  }
  get searchTermRuel(): string {
    return this._searchTermRuel;
  }
  set searchTermRuel(value: string){
    this._searchTermRuel = value;
    this.filteredUtilisateurs = this.filtereUtilisateursRuel(value);
  }
  get searchTermNumRuel(): string {
    return this._searchTermNumRuel;
  }
  set searchTermNumRuel(value: string){
    this._searchTermNumRuel = value;
    this.filteredUtilisateurs = this.filtereUtilisateursNumRuel(value);
  }
  get searchTermCpl(): string {
    return this._searchTermCpl;
  }
  set searchTermCpl(value: string){
    this._searchTermCpl = value;
    this.filteredUtilisateurs = this.filtereUtilisateursCpl(value);
  }
  get searchTermVillel(): string {
    return this._searchTermVillel;
  }
  set searchTermVillel(value: string){
    this._searchTermVillel = value;
    this.filteredUtilisateurs = this.filtereUtilisateursVillel(value);
  }
  get searchTermRegionl(): string {
    return this._searchTermRegionl;
  }
  set searchTermRegionl(value: string){
    this._searchTermRegionl = value;
    this.filteredUtilisateurs = this.filtereUtilisateursRegionl(value);
  }
  get searchTermTell(): string {
    return this._searchTermTell;
  }
  set searchTermTell(value: string){
    this._searchTermTell = value;
    this.filteredUtilisateurs = this.filtereUtilisateursTell(value);
  }
  get searchTermFaxl(): string {
    return this._searchTermFaxl;
  }
  set searchTermFaxl(value: string){
    this._searchTermFaxl = value;
    this.filteredUtilisateurs = this.filtereUtilisateursFaxl(value);
  }
  get searchTermAdrLiv(): string {
    return this._searchTermAdrLiv;
  }
  set searchTermAdrLiv(value: string){
    this._searchTermAdrLiv = value;
    this.filteredUtilisateurs = this.filtereUtilisateursAdrLiv(value);
  }
  get searchTermRegion(): string {
    return this._searchTermRegion;
  }
  set searchTermRegion(value: string){
    this._searchTermRegion = value;
    this.filteredUtilisateurs = this.filtereUtilisateursRegion(value);
  }
  get searchTermTaxe(): string {
    return this._searchTermTaxe;
  }
  set searchTermTaxe(value: string){
    this._searchTermTaxe = value;
    this.filteredUtilisateurs = this.filtereUtilisateursTaxe(value);
  }
  get searchTermCcb1(): string {
    return this._searchTermCcb1;
  }
  set searchTermCcb1(value: string){
    this._searchTermCcb1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateursCcb1(value);
  }
  get searchTermBank1(): string {
    return this._searchTermBank1;
  }
  set searchTermBank1(value: string){
    this._searchTermBank1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateursBank1(value);
  }
  get searchTermAgence1(): string {
    return this._searchTermAgence1;
  }
  set searchTermAgence1(value: string){
    this._searchTermAgence1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateursAgence1(value);
  }
  get searchTermGaranties(): string {
    return this._searchTermGaranties;
  }
  set searchTermGaranties(value: string){
    this._searchTermGaranties = value;
    this.filteredUtilisateurs = this.filtereUtilisateursGaranties(value);
  }
  get searchTermCodGrp(): string {
    return this._searchTermCodGrp;
  }
  set searchTermCodGrp(value: string){
    this._searchTermCodGrp = value;
    this.filteredUtilisateurs = this.filtereUtilisateursCodGrp(value);
  }
  get searchTermModReg(): string {
    return this._searchTermModReg;
  }
  set searchTermModReg(value: string){
    this._searchTermModReg = value;
    this.filteredUtilisateurs = this.filtereUtilisateursModReg(value);
  }
  get searchTermDomBan(): string {
    return this._searchTermDomBan;
  }
  set searchTermDomBan(value: string){
    this._searchTermDomBan = value;
    this.filteredUtilisateurs = this.filtereUtilisateursDomBan(value);
  }
  get searchTermEcheance(): string {
    return this._searchTermEcheance;
  }
  set searchTermEcheance(value: string){
    this._searchTermEcheance = value;
    this.filteredUtilisateurs = this.filtereUtilisateursEcheance(value);
  }
  get searchTermCrMax(): string {
    return this._searchTermCrMax;
  }
  set searchTermCrMax(value: string){
    this._searchTermCrMax = value;
    this.filteredUtilisateurs = this.filtereUtilisateursCrMax(value);
  }
  get searchTermDetMvt(): string {
    return this._searchTermDetMvt;
  }
  set searchTermDetMvt(value: string){
    this._searchTermDetMvt = value;
    this.filteredUtilisateurs = this.filtereUtilisateursDetMvt(value);
  }
  get searchTermCredit(): string {
    return this._searchTermCredit;
  }
  set searchTermCredit(value: string){
    this._searchTermCredit = value;
    this.filteredUtilisateurs = this.filtereUtilisateursCredit(value);
  }
  get searchTermPreVen(): string {
    return this._searchTermPreVen;
  }
  set searchTermPreVen(value: string){
    this._searchTermPreVen = value;
    this.filteredUtilisateurs = this.filtereUtilisateursPreVen(value);
  }
  get searchTermCumulAch(): string {
    return this._searchTermCumulAch;
  }
  set searchTermCumulAch(value: string){
    this._searchTermCumulAch = value;
    this.filteredUtilisateurs = this.filtereUtilisateursCumulAch(value);
  }
  get searchTermChifAff1(): string {
    return this._searchTermChifAff1;
  }
  set searchTermChifAff1(value: string){
    this._searchTermChifAff1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateursChifAff1(value);
  }
  get searchTermChifAff2(): string {
    return this._searchTermChifAff2;
  }
  set searchTermChifAff2(value: string){
    this._searchTermChifAff2 = value;
    this.filteredUtilisateurs = this.filtereUtilisateursChifAff2(value);
  }
  get searchTermChifAff3(): string {
    return this._searchTermChifAff3;
  }
  set searchTermChifAff3(value: string){
    this._searchTermChifAff3 = value;
    this.filteredUtilisateurs = this.filtereUtilisateursChifAff3(value);
  }
  get searchTermTauxRem(): string {
    return this._searchTermTauxRem;
  }
  set searchTermTauxRem(value: string){
    this._searchTermTauxRem = value;
    this.filteredUtilisateurs = this.filtereUtilisateursTauxRem(value);
  }
  get searchTermTauxCom(): string {
    return this._searchTermTauxCom;
  }
  set searchTermTauxCom(value: string){
    this._searchTermTauxCom = value;
    this.filteredUtilisateurs = this.filtereUtilisateursTauxCom(value);
  }
  get searchTermReste(): string {
    return this._searchTermReste;
  }
  set searchTermReste(value: string){
    this._searchTermReste = value;
    this.filteredUtilisateurs = this.filtereUtilisateursReste(value);
  }
  get searchTermTauxRes(): string {
    return this._searchTermTauxRes;
  }
  set searchTermTauxRes(value: string){
    this._searchTermTauxRes = value;
    this.filteredUtilisateurs = this.filtereUtilisateursTauxRes(value);
  }
  get searchTermValRes(): string {
    return this._searchTermValRes;
  }
  set searchTermValRes(value: string){
    this._searchTermValRes = value;
    this.filteredUtilisateurs = this.filtereUtilisateursValRes(value);
  }
  get searchTermPatron(): string {
    return this._searchTermPatron;
  }
  set searchTermPatron(value: string){
    this._searchTermPatron = value;
    this.filteredUtilisateurs = this.filtereUtilisateursPatron(value);
  }
  get searchTermRang(): string {
    return this._searchTermRang;
  }
  set searchTermRang(value: string){
    this._searchTermRang = value;
    this.filteredUtilisateurs = this.filtereUtilisateursRang(value);
  }
  get searchTermImpaye(): string {
    return this._searchTermImpaye;
  }
  set searchTermImpaye(value: string){
    this._searchTermImpaye = value;
    this.filteredUtilisateurs = this.filtereUtilisateursImpaye(value);
  }
  get searchTermChqImpaye(): string {
    return this._searchTermChqImpaye;
  }
  set searchTermChqImpaye(value: string){
    this._searchTermChqImpaye = value;
    this.filteredUtilisateurs = this.filtereUtilisateursChqImpaye(value);
  }
  get searchTermEfPort(): string {
    return this._searchTermEfPort;
  }
  set searchTermEfPort(value: string){
    this._searchTermEfPort = value;
    this.filteredUtilisateurs = this.filtereUtilisateursEfPort(value);
  }
  get searchTermEfBanque(): string {
    return this._searchTermEfBanque;
  }
  set searchTermEfBanque(value: string){
    this._searchTermEfBanque = value;
    this.filteredUtilisateurs = this.filtereUtilisateursEfBanque(value);
  }
  get searchTermEfNrecu(): string {
    return this._searchTermEfNrecu;
  }
  set searchTermEfNrecu(value: string){
    this._searchTermEfNrecu = value;
    this.filteredUtilisateurs = this.filtereUtilisateursEfNrecu(value);
  }
  get searchTermAvCom(): string {
    return this._searchTermAvCom;
  }
  set searchTermAvCom(value: string){
    this._searchTermAvCom = value;
    this.filteredUtilisateurs = this.filtereUtilisateursAvCom(value);
  }
  get searchTermCaution(): string {
    return this._searchTermCaution;
  }
  set searchTermCaution(value: string){
    this._searchTermCaution = value;
    this.filteredUtilisateurs = this.filtereUtilisateursCaution(value);
  }
  get searchTermBenefice(): string {
    return this._searchTermBenefice;
  }
  set searchTermBenefice(value: string){
    this._searchTermBenefice = value;
    this.filteredUtilisateurs = this.filtereUtilisateursBenefice(value);
  }
  get searchTermTauxBene(): string {
    return this._searchTermTauxBene;
  }
  set searchTermTauxBene(value: string){
    this._searchTermTauxBene = value;
    this.filteredUtilisateurs = this.filtereUtilisateursTauxBene(value);
  }
  get searchTermRecFff(): string {
    return this._searchTermRecFff;
  }
  set searchTermRecFff(value: string){
    this._searchTermRecFff = value;
    this.filteredUtilisateurs = this.filtereUtilisateursRecFff(value);
  }
  get searchTermTva(): string {
    return this._searchTermTva;
  }
  set searchTermTva(value: string){
    this._searchTermTva = value;
    this.filteredUtilisateurs = this.filtereUtilisateursTva(value);
  }
  get searchTermCle(): string {
    return this._searchTermCle;
  }
  set searchTermCle(value: string){
    this._searchTermCle = value;
    this.filteredUtilisateurs = this.filtereUtilisateursCle(value);
  }
  get searchTermSoldDep(): string {
    return this._searchTermSoldDep;
  }
  set searchTermSoldDep(value: string){
    this._searchTermSoldDep = value;
    this.filteredUtilisateurs = this.filtereUtilisateursSoldDep(value);
  }
  get searchTermInteret(): string {
    return this._searchTermInteret;
  }
  set searchTermInteret(value: string){
    this._searchTermInteret = value;
    this.filteredUtilisateurs = this.filtereUtilisateursInteret(value);
  }
  get searchTermRegChq(): string {
    return this._searchTermRegChq;
  }
  set searchTermRegChq(value: string){
    this._searchTermRegChq = value;
    this.filteredUtilisateurs = this.filtereUtilisateursRegChq(value);
  }
  get searchTermRegEff(): string {
    return this._searchTermRegEff;
  }
  set searchTermRegEff(value: string){
    this._searchTermRegEff = value;
    this.filteredUtilisateurs = this.filtereUtilisateursRegEff(value);
  }
  get searchTermRegEsp(): string {
    return this._searchTermRegEsp;
  }
  set searchTermRegEsp(value: string){
    this._searchTermRegEsp = value;
    this.filteredUtilisateurs = this.filtereUtilisateurRegEsp(value);
  }
  get searchTermFacInst(): string {
    return this._searchTermFacInst;
  }
  set searchTermFacInst(value: string){
    this._searchTermFacInst = value;
    this.filteredUtilisateurs = this.filtereUtilisateurFacInst(value);
  }
  get searchTermAvoir(): string {
    return this._searchTermAvoir;
  }
  set searchTermAvoir(value: string){
    this._searchTermAvoir = value;
    this.filteredUtilisateurs = this.filtereUtilisateurAvoir(value);
  }
  get searchTermEffInst(): string {
    return this._searchTermEffInst;
  }
  set searchTermEffInst(value: string){
    this._searchTermEffInst = value;
    this.filteredUtilisateurs = this.filtereUtilisateurEffInst(value);
  }
  get searchTermSoldeBq(): string {
    return this._searchTermSoldeBq;
  }
  set searchTermSoldeBq(value: string){
    this._searchTermSoldeBq = value;
    this.filteredUtilisateurs = this.filtereUtilisateurSoldeBq(value);
  }
  get searchTermCreance(): string {
    return this._searchTermCreance;
  }
  set searchTermCreance(value: string){
    this._searchTermCreance = value;
    this.filteredUtilisateurs = this.filtereUtilisateurCreance(value);
  }
  get searchTermEffEnc(): string {
    return this._searchTermEffEnc;
  }
  set searchTermEffEnc(value: string){
    this._searchTermEffEnc = value;
    this.filteredUtilisateurs = this.filtereUtilisateurEffEnc(value);
  }
  get searchTermEffEsc(): string {
    return this._searchTermEffEsc;
  }
  set searchTermEffEsc(value: string){
    this._searchTermEffEsc = value;
    this.filteredUtilisateurs = this.filtereUtilisateurEffEsc(value);
  }
  get searchTermComission(): string {
    return this._searchTermComission;
  }
  set searchTermComission(value: string){
    this._searchTermComission = value;
    this.filteredUtilisateurs = this.filtereUtilisateurComission(value);
  }
  get searchTermBloc(): string {
    return this._searchTermBloc;
  }
  set searchTermBloc(value: string){
    this._searchTermBloc = value;
    this.filteredUtilisateurs = this.filtereUtilisateurBloc(value);
  }
  get searchTermCodeTva(): string {
    return this._searchTermCodeTva;
  }
  set searchTermCodeTva(value: string){
    this._searchTermCodeTva = value;
    this.filteredUtilisateurs = this.filtereUtilisateurCodeTva(value);
  }
  get searchTermRemOrg(): string {
    return this._searchTermRemOrg;
  }
  set searchTermRemOrg(value: string){
    this._searchTermRemOrg = value;
    this.filteredUtilisateurs = this.filtereUtilisateurRemOrg(value);
  }
  get searchTermAvance(): string {
    return this._searchTermAvance;
  }
  set searchTermAvance(value: string){
    this._searchTermAvance = value;
    this.filteredUtilisateurs = this.filtereUtilisateurAvance(value);
  }
  get searchTermChqPf(): string {
    return this._searchTermChqPf;
  }
  set searchTermChqPf(value: string){
    this._searchTermChqPf = value;
    this.filteredUtilisateurs = this.filtereUtilisateurChqPf(value);
  }
  get searchTermRetenue(): string {
    return this._searchTermRetenue;
  }
  set searchTermRetenue(value: string){
    this._searchTermRetenue = value;
    this.filteredUtilisateurs = this.filtereUtilisateurRetenue(value);
  }
  get searchTermRegVir(): string {
    return this._searchTermRegVir;
  }
  set searchTermRegVir(value: string){
    this._searchTermRegVir = value;
    this.filteredUtilisateurs = this.filtereUtilisateurRegVir(value);
  }
  get searchTermAvN1(): string {
    return this._searchTermAvN1;
  }
  set searchTermAvN1(value: string){
    this._searchTermAvN1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurAvN1(value);
  }
  get searchTermClasse(): string {
    return this._searchTermClasse;
  }
  set searchTermClasse(value: string){
    this._searchTermClasse = value;
    this.filteredUtilisateurs = this.filtereUtilisateurClasse(value);
  }
  get searchTermRistourne(): string {
    return this._searchTermRistourne;
  }
  set searchTermRistourne(value: string){
    this._searchTermRistourne = value;
    this.filteredUtilisateurs = this.filtereUtilisateurRistourne(value);
  }
  get searchTermCaPrev(): string {
    return this._searchTermCaPrev;
  }
  set searchTermCaPrev(value: string){
    this._searchTermCaPrev = value;
    this.filteredUtilisateurs = this.filtereUtilisateurCaPrev(value);
  }
  get searchTermSoldeCpf(): string {
    return this._searchTermSoldeCpf;
  }
  set searchTermSoldeCpf(value: string){
    this._searchTermSoldeCpf = value;
    this.filteredUtilisateurs = this.filtereUtilisateurSoldeCpf(value);
  }
  get searchTermSoldeImp(): string {
    return this._searchTermSoldeImp;
  }
  set searchTermSoldeImp(value: string){
    this._searchTermSoldeImp = value;
    this.filteredUtilisateurs = this.filtereUtilisateurSoldeImp(value);
  }
  get searchTermSoldeEpf(): string {
    return this._searchTermSoldeEpf;
  }
  set searchTermSoldeEpf(value: string){
    this._searchTermSoldeEpf = value;
    this.filteredUtilisateurs = this.filtereUtilisateurSoldeEpf(value);
  }
  get searchTermCaMens(): string {
    return this._searchTermCaMens;
  }
  set searchTermCaMens(value: string){
    this._searchTermCaMens = value;
    this.filteredUtilisateurs = this.filtereUtilisateurCaMens(value);
  }
  get searchTermCrImax(): string {
    return this._searchTermCrImax;
  }
  set searchTermCrImax(value: string){
    this._searchTermCrImax = value;
    this.filteredUtilisateurs = this.filtereUtilisateurCrImax(value);
  }
  get searchTermFcreN1(): string {
    return this._searchTermFcreN1;
  }
  set searchTermFcreN1(value: string){
    this._searchTermFcreN1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurFcreN1(value);
  }
  get searchTermFcreN2(): string {
    return this._searchTermFcreN2;
  }
  set searchTermFcreN2(value: string){
    this._searchTermFcreN2 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurFcreN2(value);
  }
  get searchTermFreglN1(): string {
    return this._searchTermFreglN1;
  }
  set searchTermFreglN1(value: string){
    this._searchTermFreglN1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurFreglN1(value);
  }
  get searchTermFreglN2(): string {
    return this._searchTermFreglN2;
  }
  set searchTermFreglN2(value: string){
    this._searchTermFreglN2 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurFreglN2(value);
  }
  get searchTermFescN1(): string {
    return this._searchTermFescN1;
  }
  set searchTermFescN1(value: string){
    this._searchTermFescN1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurFescN1(value);
  }
  get searchTermFescN2(): string {
    return this._searchTermFescN2;
  }
  set searchTermFescN2(value: string){
    this._searchTermFescN2 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurFescN2(value);
  }
  get searchTermFbkN1(): string {
    return this._searchTermFbkN1;
  }
  set searchTermFbkN1(value: string){
    this._searchTermFbkN1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurFbkN1(value);
  }
  get searchTermFbkN2(): string {
    return this._searchTermFbkN2;
  }
  set searchTermFbkN2(value: string){
    this._searchTermFbkN2 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurFbkN2(value);
  }
  get searchTermFefpN1(): string {
    return this._searchTermFefpN1;
  }
  set searchTermFefpN1(value: string){
    this._searchTermFefpN1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurFefpN1(value);
  }
  get searchTermFefpN2(): string {
    return this._searchTermFefpN2;
  }
  set searchTermFefpN2(value: string){
    this._searchTermFefpN2 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurFefpN2(value);
  }
  get searchTermFchpN1(): string {
    return this._searchTermFchpN1;
  }
  set searchTermFchpN1(value: string){
    this._searchTermFchpN1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurFchpN1(value);
  }
  get searchTermFchpN2(): string {
    return this._searchTermFchpN2;
  }
  set searchTermFchpN2(value: string){
    this._searchTermFchpN2 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurFchpN2(value);
  }
  get searchTermFefnrN1(): string {
    return this._searchTermFefnrN1;
  }
  set searchTermFefnrN1(value: string){
    this._searchTermFefnrN1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurFefnrN1(value);
  }
  get searchTermFefnrN2(): string {
    return this._searchTermFefnrN2;
  }
  set searchTermFefnrN2(value: string){
    this._searchTermFefnrN2 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurFefnrN2(value);
  }
  get searchTermIcreN1(): string {
    return this._searchTermIcreN1;
  }
  set searchTermIcreN1(value: string){
    this._searchTermIcreN1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurIcreN1(value);
  }
  get searchTermIcreN2(): string {
    return this._searchTermIcreN2;
  }
  set searchTermIcreN2(value: string){
    this._searchTermIcreN2 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurIcreN2(value);
  }
  get searchTermIreglN1(): string {
    return this._searchTermIreglN1;
  }
  set searchTermIreglN1(value: string){
    this._searchTermIreglN1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurIreglN1(value);
  }
  get searchTermIreglN2(): string {
    return this._searchTermIreglN2;
  }
  set searchTermIreglN2(value: string){
    this._searchTermIreglN2 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurIreglN2(value);
  }
  get searchTermIescN1(): string {
    return this._searchTermIescN1;
  }
  set searchTermIescN1(value: string){
    this._searchTermIescN1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurIescN1(value);
  }
  get searchTermIescN2(): string {
    return this._searchTermIescN2;
  }
  set searchTermIescN2(value: string){
    this._searchTermIescN2 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurIescN2(value);
  }
  get searchTermIbkN1(): string {
    return this._searchTermIbkN1;
  }
  set searchTermIbkN1(value: string){
    this._searchTermIbkN1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurIbkN1(value);
  }
  get searchTermIbkN2(): string {
    return this._searchTermIbkN2;
  }
  set searchTermIbkN2(value: string){
    this._searchTermIbkN2 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurIbkN2(value);
  }
  get searchTermIefpN1(): string {
    return this._searchTermIefpN1;
  }
  set searchTermIefpN1(value: string){
    this._searchTermIefpN1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurIefpN1(value);
  }
  get searchTermIefpN2(): string {
    return this._searchTermIefpN2;
  }
  set searchTermIefpN2(value: string){
    this._searchTermIefpN2 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurIefpN1(value);
  }
  

  get searchTermIchpN1(): string {
    return this._searchTermIchpN1;
  }
  set searchTermIchpN1(value: string){
    this._searchTermIchpN1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurIchpN1(value);
  }
  get searchTermIchpN2(): string {
    return this._searchTermIchpN2;
  }
  set searchTermIchpN2(value: string){
    this._searchTermIchpN2 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurIchpN2(value);
  }
  get searchTermIefnrN1(): string {
    return this._searchTermIefnrN1;
  }
  set searchTermIefnrN1(value: string){
    this._searchTermIefnrN1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurIefnrN1(value);
  }
  get searchTermIefnrN2(): string {
    return this._searchTermIefnrN2;
  }
  set searchTermIefnrN2(value: string){
    this._searchTermIefnrN2 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurIefnrN2 (value);
  }
  get searchTermCommand(): string {
    return this._searchTermCommand;
  }
  set searchTermCommand(value: string){
    this._searchTermCommand = value;
    this.filteredUtilisateurs = this.filtereUtilisateurCommand(value);
  }
  get searchTermRemExp(): string {
    return this._searchTermRemExp;
  }
  set searchTermRemExp(value: string){
    this._searchTermRemExp = value;
    this.filteredUtilisateurs = this.filtereUtilisateurRemExp(value);
  }
  get searchTermChefMag(): string {
    return this._searchTermChefMag;
  }
  set searchTermChefMag(value: string){
    this._searchTermChefMag = value;
    this.filteredUtilisateurs = this.filtereUtilisateurChefMag (value);
  }
  get searchTermJourVisit(): string {
    return this._searchTermJourVisit;
  }
  set searchTermJourVisit(value: string){
    this._searchTermJourVisit = value;
    this.filteredUtilisateurs = this.filtereUtilisateurJourVisit(value);
  }
  get searchTermInstance(): string {
    return this._searchTermInstance;
  }
  set searchTermInstance(value: string){
    this._searchTermInstance = value;
    this.filteredUtilisateurs = this.filtereUtilisateurInstance(value);
  }
  get searchTermComptant(): string {
    return this._searchTermComptant;
  }
  set searchTermComptant(value: string){
    this._searchTermComptant = value;
    this.filteredUtilisateurs = this.filtereUtilisateurComptant(value);
  }
  get searchTermBl(): string {
    return this._searchTermBl;
  }
  set searchTermBl(value: string){
    this._searchTermBl = value;
    this.filteredUtilisateurs = this.filtereUtilisateurBl(value);
  }

  get searchTermNatLiv(): string {
    return this._searchTermNatLiv;
  }
  set searchTermNatLiv(value: string){
    this._searchTermNatLiv = value;
    this.filteredUtilisateurs = this.filtereUtilisateurNatLiv(value);
  }
  get searchTermMois1(): string {
    return this._searchTermMois1;
  }
  set searchTermMois1(value: string){
    this._searchTermMois1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurMois1(value);
  }
  get searchTermMois2(): string {
    return this._searchTermMois2;
  }
  set searchTermMois2(value: string){
    this._searchTermMois2 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurMois2(value);
  }
  get searchTermMois3(): string {
    return this._searchTermMois3;
  }
  set searchTermMois3(value: string){
    this._searchTermMois3 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurMois3(value);
  }
  get searchTermMois4(): string {
    return this._searchTermMois4;
  }
  set searchTermMois4(value: string){
    this._searchTermMois4 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurMois4(value);
  }
  get searchTermMois5(): string {
    return this._searchTermMois5;
  }
  set searchTermMois5(value: string){
    this._searchTermMois5 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurMois5(value);
  }
  get searchTermMois6(): string {
    return this._searchTermMois6;
  }
  set searchTermMois6(value: string){
    this._searchTermMois6 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurMois6(value);
  }
  get searchTermMois7(): string {
    return this._searchTermMois7;
  }
  set searchTermMois7(value: string){
    this._searchTermMois7 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurMois7(value);
  }
  get searchTermMois8(): string {
    return this._searchTermMois8;
  }
  set searchTermMois8(value: string){
    this._searchTermMois8 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurMois8(value);
  }


  get searchTermMois9(): string {
    return this._searchTermMois9;
  }
  set searchTermMois9(value: string){
    this._searchTermMois9 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurMois9(value);
  }
  get searchTermMois10(): string {
    return this._searchTermMois10;
  }
  set searchTermMois10(value: string){
    this._searchTermMois10 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurMois10(value);
  }
  get searchTermMois11(): string {
    return this._searchTermMois11;
  }
  set searchTermMois11(value: string){
    this._searchTermMois11 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurMois11(value);
  }
  get searchTermMois12(): string {
    return this._searchTermMois12;
  }
  set searchTermMois12(value: string){
    this._searchTermMois12 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurMois12(value);
  }
  get searchTermMargePour(): string {
    return this._searchTermMargePour;
  }
  set searchTermMargePour(value: string){
    this._searchTermMargePour = value;
    this.filteredUtilisateurs = this.filtereUtilisateurMargePour(value);
  }
  get searchTermMargeVal(): string {
    return this._searchTermMargeVal;
  }
  set searchTermMargeVal(value: string){
    this._searchTermMargeVal = value;
    this.filteredUtilisateurs = this.filtereUtilisateurMargeVal(value);
  }
  get searchTermCredblEnc(): string {
    return this._searchTermCredblEnc;
  }
  set searchTermCredblEnc(value: string){
    this._searchTermCredblEnc = value;
    this.filteredUtilisateurs = this.filtereUtilisateurCredblEnc(value);
  }
  get searchTermCredinstec(): string {
    return this._searchTermCredinstec;
  }
  set searchTermCredinstec(value: string){
    this._searchTermCredinstec = value;
    this.filteredUtilisateurs = this.filtereUtilisateurCredinstec(value);
  }
  get searchTermObservatio(): string {
    return this._searchTermObservatio;
  }
  set searchTermObservatio(value: string){
    this._searchTermObservatio = value;
    this.filteredUtilisateurs = this.filtereUtilisateurObservatio(value);
  }
  get searchTermObserv(): string {
    return this._searchTermObserv;
  }
  set searchTermObserv(value: string){
    this._searchTermObserv = value;
    this.filteredUtilisateurs = this.filtereUtilisateurObserv(value);
  }
  get searchTermGouv1(): string {
    return this._searchTermGouv1;
  }
  set searchTermGouv1(value: string){
    this._searchTermGouv1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurGouv1(value);
  }
  get searchTermGouv2(): string {
    return this._searchTermGouv2;
  }
  set searchTermGouv2(value: string){
    this._searchTermGouv2 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurGouv2(value);
  }
  get searchTermNatcaution(): string {
    return this._searchTermNatcaution;
  }
  set searchTermNatcaution(value: string){
    this._searchTermNatcaution = value;
    this.filteredUtilisateurs = this.filtereUtilisateurNatcaution(value);
  }
  get searchTermCheque(): string {
    return this._searchTermCheque;
  }
  set searchTermCheque(value: string){
    this._searchTermCheque = value;
    this.filteredUtilisateurs = this.filtereUtilisateurCheque(value);
  }
  get searchTermEspece(): string {
    return this._searchTermEspece;
  }
  set searchTermEspece(value: string){
    this._searchTermEspece = value;
    this.filteredUtilisateurs = this.filtereUtilisateurEspece(value);
  }
  get searchTermTraite(): string {
    return this._searchTermTraite;
  }
  set searchTermTraite(value: string){
    this._searchTermTraite = value;
    this.filteredUtilisateurs = this.filtereUtilisateurTraite(value);
  }
  get searchTermCrRef(): string {
    return this._searchTermCrRef;
  }
  set searchTermCrRef(value: string){
    this._searchTermIescN1 = value;
    this.filteredUtilisateurs = this.filtereUtilisateurCrRef(value);
  }
  get searchTermSoldTerm(): string {
    return this._searchTermSoldTerm;
  }
  set searchTermSoldTerm(value: string){
    this._searchTermSoldTerm = value;
    this.filteredUtilisateurs = this.filtereUtilisateurSoldTerm(value);
  }
  get searchTermChqImp(): string {
    return this._searchTermChqImp;
  }
  set searchTermChqImp(value: string){
    this._searchTermChqImp = value;
    this.filteredUtilisateurs = this.filtereUtilisateurChqImp(value);
  }
  get searchTermCriRef(): string {
    return this._searchTermCriRef;
  }
  set searchTermCriRef(value: string){
    this._searchTermCriRef = value;
    this.filteredUtilisateurs = this.filtereUtilisateurCriRef(value);
  }
  get searchTermRemFam(): string {
    return this._searchTermRemFam;
  }
  set searchTermRemFam(value: string){
    this._searchTermRemFam = value;
    this.filteredUtilisateurs = this.filtereUtilisateurRemFam(value);
  }
  get searchTermReglement(): string {
    return this._searchTermReglement;
  }
  set searchTermReglement(value: string){
    this._searchTermReglement = value;
    this.filteredUtilisateurs = this.filtereUtilisateurReglement(value);
  }
  get searchTermDelai(): string {
    return this._searchTermDelai;
  }
  set searchTermDelai(value: string){
    this._searchTermDelai = value;
    this.filteredUtilisateurs = this.filtereUtilisateurDelai(value);
  }
  get searchTermNbTranche(): string {
    return this._searchTermNbTranche;
  }
  set searchTermNbTranche(value: string){
    this._searchTermNbTranche = value;
    this.filteredUtilisateurs = this.filtereUtilisateurNbTranche(value);
  }
  get searchTermCodSteq(): string {
    return this._searchTermCodSteq;
  }
  set searchTermCodSteq(value: string){
    this._searchTermCodSteq = value;
    this.filteredUtilisateurs = this.filtereUtilisateurCodSteq(value);
  }
  get searchTermReference(): string {
    return this._searchTermReference;
  }
  set searchTermReference(value: string){
    this._searchTermReference = value;
    this.filteredUtilisateurs = this.filtereUtilisateurReference(value);
  }
  get searchTermSansRet(): string {
    return this._searchTermSansRet;
  }
  set searchTermSansRet(value: string){
    this._searchTermSansRet = value;
    this.filteredUtilisateurs = this.filtereUtilisateurSansRet(value);
  }
  get searchTermCliGroup(): string {
    return this._searchTermCliGroup;
  }
  set searchTermCliGroup(value: string){
    this._searchTermCliGroup = value;
    this.filteredUtilisateurs = this.filtereUtilisateurCliGroup(value);
  }
  get searchTermTauxMarge(): string {
    return this._searchTermTauxMarge;
  }
  set searchTermTauxMarge(value: string){
    this._searchTermTauxMarge = value;
    this.filteredUtilisateurs = this.filtereUtilisateurTauxMarge(value);
  }


/** */

  filtereUtilisateursLastname(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.lastname.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursFirstname(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.firstname.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursUserName(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.username.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursEmail(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.email.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursCin(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.cin.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  } 
  filtereUtilisateursAddress(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.address.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursCps(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.cps.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursTelephone(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.telephone.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursPassword(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.password.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursPseudo(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.pseudo.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursTypeContrat(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.typeContrat.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursRaison(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.raison.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursFamille(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.famille.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursSalaire(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.salaire.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursPrimeDeRendement(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.primeDeRendement.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursHeuresDeTravail(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.heuresDeTravail.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursEfBanque(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.efBanque.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursEfNrecu(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.efNrecu.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursAvCom(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.avCom.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursCaution(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.caution.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursBenefice(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.benefice.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursTauxBene(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.tauxBene.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursRecFff(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.recFff.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursTva(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.tva.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursCle(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.cle.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }

  filtereUtilisateursCodUser(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.codUser.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursRc(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.rc.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursRespon1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.respon1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursFonction1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.fonction1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursFaxs(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.faxs.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursAdrSiege(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.adrSiege.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursRuel(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.ruel.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursNumRuel(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.numRuel.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursCpl(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.cpl.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursVillel(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.villel.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursRegionl(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.regionl.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursTell(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.raison.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursFaxl(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.faxl.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursAdrLiv(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.adrLiv.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursRegion(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.region.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursTaxe(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.taxe.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursCcb1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.ccb1.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursBank1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.bank1.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursAgence1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.agence1.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursGaranties(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.garanties.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursCodGrp(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.codGrp.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursModReg(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.modReg.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursDomBan(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.domBan.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursEcheance(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.echeance.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursCrMax(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.crMax.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursDetMvt(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.derMvt.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursCredit(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.credit.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursPreVen(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.preVen.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursCumulAch(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.cumulAch.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursChifAff1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.chifAff1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  } 
  filtereUtilisateursChifAff2(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.chifAff2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursChifAff3(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.chifAff3.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursTauxRem(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.tauxRem.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursTauxCom(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.tauxCom.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursReste(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.reste.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursTauxRes(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.tauxRes.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursValRes(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.valRes.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursPatron(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.patron.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursRang(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.rang.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursImpaye(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.impaye.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursChqImpaye(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.chqImpaye.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursEfPort(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.efPort.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursVenteParHeure(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.venteParHeure.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursObjectifParJour(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.objectifParJour.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursObjectifParMois(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.objectifParMois.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursTypeConge(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.typeConge.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursPrimeDev(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.primeDev.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursPrimeGlobal(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.primeGlobal.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursPrimeParClient(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.primeParClient.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursPrimeStock(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.primeStock.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursPostV(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.postV.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }

  

  filtereUtilisateursSoldDep(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.soldDep.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursInteret(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.interet.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursRegChq(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.regChq.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateursRegEff(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.regEff.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurRegEsp(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.regEsp.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurFacInst(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.facInst.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurAvoir(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.avoir.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurEffInst(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.effInst.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurSoldeBq(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.soldeBq.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurCreance(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.creance.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurEffEnc(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.effEnc.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurEffEsc(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.effEsc.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurComission(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.comission.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurBloc(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.bloc.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurCodeTva(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.codeTva.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurRemOrg(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.remOrg.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurAvance(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.avance.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurChqPf(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.chqPf.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurRetenue(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.retenue.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurRegVir(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.regVir.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurAvN1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.avN1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurClasse(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.classe.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurRistourne(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.ristourne.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurCaPrev(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.caPrev.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurSoldeCpf(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.soldeCpf.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurSoldeImp(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.soldeImp.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurSoldeEpf(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.soldeEpf.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurCaMens(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.caMens.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurCrImax(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.crImax.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurFcreN1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.fcreN1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurFcreN2(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.fcreN2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurFreglN1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.freglN1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurFreglN2(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.freglN1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurFescN1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.fescN1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurFescN2(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.fescN2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurFbkN1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.fbkN1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurFbkN2(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.fbkN2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurFefpN1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.fefpN1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurFefpN2(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.fefpN2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurFchpN1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.fchpN1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurFchpN2(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.fchpN2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurFefnrN1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.fefnrN1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurFefnrN2(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.fefnrN2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurIcreN1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.icreN1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurIcreN2(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.icreN2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurIreglN1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.ireglN1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurIreglN2(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.ireglN2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurIescN1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.iescN1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurIescN2(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.iescN2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurIbkN1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.ibkN1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurIbkN2(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.ibkN2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurIefpN1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.iefpN1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurIchpN1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.ichpN1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurIchpN2(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.ichpN2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurIefnrN1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.iefnrN1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurIefnrN2(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.iefnrN2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurCommand(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.command.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurRemExp(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.remExp.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurChefMag(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.chefMag.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurJourVisit(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.jourVisit.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurInstance(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.instance.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurComptant(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.comptant.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurBl(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.bl.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurNatLiv(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.natLiv.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurMois1(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.mois1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurMois2(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.mois2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurMois3(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.mois3.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurMois4(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.mois4.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurMois5(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.mois5.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurMois6(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.mois6.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurMois7(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.mois7.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurMois8(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.mois8.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }

  filtereUtilisateurMois9(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.mois9.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurMois10(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.mois10.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurMois11(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.mois11.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurMois12(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.mois12.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurMargePour(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.margePour.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurMargeVal(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.margeVal.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurCredblEnc(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.credblEnc.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurCredinstec(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.credinstec.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurObservatio(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.observatio.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurObserv(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.observ.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurGouv1(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.gouv1.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurGouv2(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.gouv2.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurNatcaution(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.natcaution.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurCheque(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.cheque.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurEspece(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.espece.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurTraite(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.traite.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurCrRef(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.crRef.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurSoldTerm(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.soldTerm.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurChqImp(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.chqImp.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurCriRef(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.criRef.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurRemFam(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.remFam.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurReglement(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.reglement.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurDelai(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.delai.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurNbTranche(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.nbTranche.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurCodSteq(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.codSteq.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurReference(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.reference.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurSansRet(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.sansRet.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurCliGroup(seachString: string){
    return this.utilisateurs.filter(Utilisateur => Utilisateur.cliGroup.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereUtilisateurTauxMarge(seachString: string){
  return this.utilisateurs.filter(Utilisateur => Utilisateur.tauxMarge.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }

//** */
  /****************Filtrage des donner ***************/
  constructor(private authService: TokenStorageService,private dialogService: NbDialogService, private utilisateurService: UtilisateurService,
    private router: Router,private service: SmartTableData) {

    }


/*  affichage all utilisateur ****************/
authority;
ngOnInit(): void {
  this.authService.getAuthorities().forEach(authority => {
    this.authority=authority;
    console.log(this.authority);
  });
  this.getUtilisateurs();
  console.log(this.utilisateurs)
}

private getUtilisateurs() {
  this.utilisateurService.getUtilisateursList().subscribe(data => {
    this.utilisateurs = data;
    this.filteredUtilisateurs = this.utilisateurs
  });
}
/*  affichage all utilisateur ****************/

  deleteUtilisateur(user_id: bigint) {
    this.utilisateurService.deleteUtilisateur(user_id)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log('ERROR: ' + error));
  }

  utilisateurDetails(NUM_BON: bigint){
    this.router.navigate(['details', NUM_BON]);
  }

  goToCharts($myParam: string = ''): void {
    const navigationDetails: string[] = ['//pages/Utilisateurs/echarts-utilisateur'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

  source: LocalDataSource = new LocalDataSource();

  displayModalUserTable2: boolean;
  image_id: number;
  image_idString:string;
  util:Utilisateur;
  showModalDialogUserTable2(clicked_id) {
    this.image_id=clicked_id;
    this.image_idString=this.image_id.toString();
    this.utilisateurService.getUtilisateur(this.image_idString).subscribe(data => {
      this.util = data;
      console.log(this.util);
    });
    this.displayModalUserTable2 = true;
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  /* delete popap*/

  OpenDeletePopap() {
    this.dialogService.open(DeletePrimeDialogComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }
/* end the popap **/


goToModifier(id: string ){
  this.router.navigate(['//pages/Utilisateurs/update-utilisateur',id])
  }



    /* show password popap*/
    OpenShowPasswordPopap(showPassword:any) {
      this.dialogService.open(ShowPasswordDialogComponent, {
        context: {
          title: showPassword,
        },
      });
    }
      /* show username popap*/
      OpenShowUsernamePopap(showUserName:any) {
      this.dialogService.open(ShowPasswordDialogComponent, {
        context: {
          title: showUserName,
        },
      });
    }
}