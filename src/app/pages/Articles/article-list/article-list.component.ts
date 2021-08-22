import { Component, OnInit , ViewChild , TemplateRef, Input} from '@angular/core';
import { Article } from '../article';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SmartTableData } from '../../../@core/data/smart-table';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDialogService, NbWindowService } from '@nebular/theme';
import { ArticleService } from '../article.service';
import { WindowDateFilterComponent } from './window-date-filter/window-date-filter.component';

/**primering imports */
import {SelectItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { SpecialMDialogComponent } from './window-special-M/special-m-dialog.component';
import { ResetArticleDialogComponent } from './reset-dialog/reset-article-dialog.component';
import { Model } from '../../Model/model';
import { GalleryService } from '../../Gallerys/gallery.service';
import { UploadImgArticleDialogComponent } from './uploadImg/uploadImg-article-dialog.component';
import { MarqueService } from '../../Marques/marque.service';
import { ModelService } from '../../Model/model.service';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
import { async } from '@angular/core/testing';
@Component({
  selector: 'ngx-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  searchText;
  articles: Article[];
  closeResult: string;
  editForm: any;


  statuses: NbComponentStatus[] = ['info' ];
  shapes: NbComponentShape[] = [ 'rectangle' ];
  sizes: NbComponentSize[] = ['medium'];

    /*****************************Filtrage des donner *****************************/
filteredArticles: Article[];


private _searchTermCodArt: string;
private _searchTermDesArt: string;
private _searchTermRefOrg: string;
private _searchTermRefRem: string;
private _searchTermCodNgp: string;
private _searchTermNumCas: string;
private _searchTermQutStk: string;
private _searchTermQutStk2: string;
private _searchTermUnitVen: string;
private _searchTermStkGar: string;
private _searchTermCodFrs:string;
private _searchTermStkIni: string;
private _searchTermQutMax: string;
private _searchTermQutMin: string;
private _searchTermQutDep: string;
private _searchTermPrixMin: string;

private _searchTermPrixDev: string;
private _searchTermCours: string;
private _searchTermCoef: string
private _searchTermDerPAch: string
private _searchTermPrixAch: string
private _searchTermPrixVen: string
private _searchTermRemise: string
private _searchTermPrixArem: string
private _searchTermTva: string
private _searchTermCumulVen: string
private _searchTermCumulAch: string
private _searchTermDetMvt: string;
private _searchTermPValu: string;
private _searchTermUnitInv: string;
private _searchTermQutV1: string;
private _searchTermQutV2: string;
private _searchTermQutV3: string;
private _searchTermVente1: string;
private _searchTermVente2: string;
private _searchTermVente3: string;
private _searchTermQutA1: string;
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
private _searchTermChifAff: string;
private _searchTermTaux: string;
private _searchTermTot: string;
private _searchTermClasse: string;
private _searchTermAnalStk: string;
private _searchTermNbjStk: string;
private _searchTermNbjCom: string;
private _searchTermVSstk: string;
private _searchTermFlag1: string;
private _searchTermFlag2: string;
private _searchTermComStk: string;
private _searchTermComNbj: string;
private _searchTermCumulDem: string;
private _searchTermQutDou: string;
private _searchTermXanalStk: string;
private _searchTermXtypAnal: string;
private _searchTermXvCom: string;
private _searchTermQutDem: string;
private _searchTermQutConf: string;
private _searchTermQutProf: string;
private _searchTermPrixProf: string;
private _searchTermPrixConf: string;

private _searchTermQutSup: string;
private _searchTermVenPer: string;
private _searchTermTarifFrs: string;
private _searchTermConfer: string;
private _searchTermPrixAM: string;
private _searchTermTypeV: string;
private _searchTermXprixAch: string;
private _searchTermT: string;
private _searchTermReliq: string;
private _searchTermDerPDev: string;
private _searchTermPrixEuro: string;
private _searchTermCumulRes: string;
private _searchTermCodBar: string;
private _searchTermControle: string;
private _searchTermEnergie: string;

private _searchTermPoids: string;
private _searchTermVersions: string;

private _searchTermObservatio: string;
private _searchTermDatCreat: string;

private _searchTermNbjRup: string;
private _searchTermNbjRup1: string;

private _searchTermSpecific: string;
private _searchTermPrixCEur: string;
private _searchTermPrixIni: string;
private _searchTermCumulEnt: string;
private _searchTermCumulBs: string;
private _searchTermStkAtrsf: string;

private _searchTermStkTrsf: string;
private _searchTermConsMoy: string;
private _searchTermQutRav: string;
private _searchTermQutDep1: string;
private _searchTermCumulConf: string;
private _searchTermPointage: string;
private _searchTermPointage1: string;
private _searchTermPointage2: string;
private _searchTermTotalPoin: string;
private _searchTermEtage2: string;
private _searchTermFamille: string;
private _searchTermSFamille: string;
private _searchTermCentre: string;
private _searchTermStkReel: string;
private _searchTermStkRes: string;
private _searchTermStkNp: string;
private _searchTermDerpach: string;
private _searchTermDerpdev: string;
private _searchTermPrixam: string;
private _searchTermPrixceur: string;
private _searchTermQuta1: string;
private _searchTermDerP_Dev: string;
private _searchTermQutv1: string;
private _searchTermQutv2: string;
private _searchTermQutv3: string;
private _searchTermTypev: string;

/**end searsh string */
get searchTermTypev(): string {
  return this._searchTermTypev;
}
set searchTermTypev(value: string){
  this._searchTermTypev = value;
  this.filteredArticles = this.filtereArticlesTypev(value);
}
get searchTermQutv3(): string {
  return this._searchTermQutv3;
}
set searchTermQutv3(value: string){
  this._searchTermQutv3 = value;
  this.filteredArticles = this.filtereArticlesQutv3(value);
}
get searchTermQutv2(): string {
  return this._searchTermQutv2;
}
set searchTermQutv2(value: string){
  this._searchTermQutv2 = value;
  this.filteredArticles = this.filtereArticlesQutv2(value);
}
get searchTermRefRem(): string {
  return this._searchTermRefRem;
}
set searchTermRefRem(value: string){
  this._searchTermRefRem = value;
  this.filteredArticles = this.filtereArticlesRefRem(value);
}

get searchTermQutv1(): string {
  return this._searchTermQutv1;
}
set searchTermQutv1(value: string){
  this._searchTermQutv1 = value;
  this.filteredArticles = this.filtereArticlesQutv1(value);
}
get searchTermQuta1(): string {
  return this._searchTermQuta1;
}
set searchTermQuta1(value: string){
  this._searchTermQuta1 = value;
  this.filteredArticles = this.filtereArticlesQuta1(value);
}
get searchTermPrixceur(): string {
  return this._searchTermPrixceur;
}
set searchTermPrixceur(value: string){
  this._searchTermPrixceur = value;
  this.filteredArticles = this.filtereArticlesPrixceur(value);
}
get searchTermPrixam(): string {
  return this._searchTermPrixam;
}
set searchTermPrixam(value: string){
  this._searchTermPrixam = value;
  this.filteredArticles = this.filtereArticlesPrixam(value);
}
get searchTermDerpdev(): string {
  return this._searchTermDerpdev;
}
set searchTermDerpdev(value: string){
  this._searchTermDerpdev = value;
  this.filteredArticles = this.filtereArticlesDerpdev(value);
}
get searchTermDerpach(): string {
  return this._searchTermDerpach;
}
set searchTermDerpach(value: string){
  this._searchTermDerpach = value;
  this.filteredArticles = this.filtereArticlesDerpach(value);
}
get searchTermStkNp(): string {
  return this._searchTermStkNp;
}
set searchTermStkNp(value: string){
  this._searchTermStkNp = value;
  this.filteredArticles = this.filtereArticlesStkNp(value);
}
get searchTermStkRes(): string {
  return this._searchTermStkRes;
}
set searchTermStkRes(value: string){
  this._searchTermStkRes = value;
  this.filteredArticles = this.filtereArticlesStkRes(value);
}
get searchTermStkReel(): string {
  return this._searchTermStkReel;
}
set searchTermStkReel(value: string){
  this._searchTermStkReel = value;
  this.filteredArticles = this.filtereArticlesStkReel(value);
}
get searchTermCentre(): string {
  return this._searchTermCentre;
}
set searchTermCentre(value: string){
  this._searchTermCentre = value;
  this.filteredArticles = this.filtereArticlesCentre(value);
}
get searchTermSFamille(): string {
  return this._searchTermSFamille;
}
set searchTermSFamille(value: string){
  this._searchTermSFamille = value;
  this.filteredArticles = this.filtereArticlesSFamille(value);
}
get searchTermFamille(): string {
  return this._searchTermFamille;
}
set searchTermFamille(value: string){
  this._searchTermFamille = value;
  this.filteredArticles = this.filtereArticlesFamille(value);
}
get searchTermEtage2(): string {
  return this._searchTermEtage2;
}
set searchTermEtage2(value: string){
  this._searchTermEtage2 = value;
  this.filteredArticles = this.filtereArticlesEtage2(value);
}
get searchTermTotalPoin(): string {
  return this._searchTermTotalPoin;
}
set searchTermTotalPoin(value: string){
  this._searchTermTotalPoin = value;
  this.filteredArticles = this.filtereArticlesTotalPoin(value);
}

get searchTermCodArt(): string {
  return this._searchTermCodArt;
}
set searchTermCodArt(value: string){
  this._searchTermCodArt = value;
  this.filteredArticles = this.filtereArticlesCodArt(value);
}

get searchTermDesArt(): string {
  return this._searchTermDesArt;
}
set searchTermDesArt(value: string){
  this._searchTermDesArt = value;
  this.filteredArticles = this.filtereArticlesDesArt(value);
}
get searchTermRefOrg(): string {
  return this._searchTermRefOrg;
}
set searchTermRefOrg(value: string){
  this._searchTermRefOrg = value;
  this.filteredArticles = this.filtereArticlesRefOrg(value);
}
get searchTermCodNgp(): string {
  return this._searchTermCodNgp;
}
set searchTermCodNgp(value: string){
  this._searchTermCodNgp = value;
  this.filteredArticles = this.filtereArticlesCodNgp(value);
}
get searchTermNumCas(): string {
  return this._searchTermNumCas;
}
set searchTermNumCas(value: string){
  this._searchTermNumCas = value;
  this.filteredArticles = this.filtereArticlesNumCas(value);
}
get searchTermQutStk(): string {
  return this._searchTermQutStk;
}
set searchTermQutStk(value: string){
  this._searchTermQutStk = value;
  this.filteredArticles = this.filtereArticlesQutStk(value);
}
get searchTermQutStk2(): string {
  return this._searchTermQutStk2;
}
set searchTermQutStk2(value: string){
  this._searchTermQutStk2 = value;
  this.filteredArticles = this.filtereArticlesQutStk2(value);
}
get searchTermUnitVen(): string {
  return this._searchTermUnitVen;
}
set searchTermUnitVen(value: string){
  this._searchTermUnitVen = value;
  this.filteredArticles = this.filtereArticlesUnitVen(value);
}
get searchTermStkGar(): string {
  return this._searchTermStkGar;
}
set searchTermStkGar(value: string){
  this._searchTermStkGar = value;
  this.filteredArticles = this.filtereArticlesStkGar(value);
}
get searchTermStkIni(): string {
  return this._searchTermStkIni;
}
set searchTermStkIni(value: string){
  this._searchTermStkIni = value;
  this.filteredArticles = this.filtereArticlesStkIni(value);
}
get searchTermQutMax(): string {
  return this._searchTermQutMax;
}
set searchTermQutMax(value: string){
  this._searchTermQutMax = value;
  this.filteredArticles = this.filtereArticlesQutMax(value);
}
get searchTermQutMin(): string {
  return this._searchTermQutMin;
}
set searchTermQutMin(value: string){
  this._searchTermQutMin = value;
  this.filteredArticles = this.filtereArticlesQutMin(value);
}
get searchTermQutDep(): string {
  return this._searchTermQutDep;
}
set searchTermQutDep(value: string){
  this._searchTermQutDep = value;
  this.filteredArticles = this.filtereArticlesQutDep(value);
}
get searchTermPrixMin(): string {
  return this._searchTermPrixMin;
}
set searchTermPrixMin(value: string){
  this._searchTermPrixMin = value;
  this.filteredArticles = this.filtereArticlesPrixMin(value);
}
get searchTermPrixDev(): string {
  return this._searchTermPrixDev;
}
set searchTermPrixDev(value: string){
  this._searchTermPrixDev = value;
  this.filteredArticles = this.filtereArticlesPrixDev(value);
}
get searchTermPointage(): string {
  return this._searchTermPointage;
}
set searchTermPointage(value: string){
  this._searchTermPointage = value;
  this.filteredArticles = this.filtereArticlesPointage(value);
}
get searchTermCours(): string {
  return this._searchTermCours;
}
set searchTermCours(value: string){
  this._searchTermCours = value;
  this.filteredArticles = this.filtereArticlesCours(value);
}
get searchTermCoef(): string {
  return this._searchTermCoef;
}
set searchTermCoef(value: string){
  this._searchTermCoef = value;
  this.filteredArticles = this.filtereArticlesCoef(value);
}

get searchTermTva(): string {
  return this._searchTermTva;
}
set searchTermTva(value: string){
  this._searchTermTva = value;
  this.filteredArticles = this.filtereArticlesTva(value);
}
get searchTermCumulVen(): string {
  return this._searchTermCumulVen;
}
set searchTermCumulVen(value: string){
  this._searchTermCumulVen = value;
  this.filteredArticles = this.filtereArticlesCumulVen(value);
}
get searchTermCumulAch(): string {
  return this._searchTermCumulAch;
}
set searchTermCumulAch(value: string){
  this._searchTermCumulAch = value;
  this.filteredArticles = this.filtereArticlesCumulAch(value);
}
get searchTermPrixArem(): string {
  return this._searchTermPrixArem;
}
set searchTermPrixArem(value: string){
  this._searchTermPrixArem = value;
  this.filteredArticles = this.filtereArticlesPrixArem(value);
}

get searchTermDerPAch(): string {
  return this._searchTermDerPAch;
}
set searchTermDerPAch(value: string){
  this._searchTermDerPAch = value;
  this.filteredArticles = this.filtereArticlesDerPAch(value);
}
get searchTermPrixAch(): string {
  return this._searchTermPrixAch;
}
set searchTermPrixAch(value: string){
  this._searchTermPrixAch = value;
  this.filteredArticles = this.filtereArticlesPrixAch(value);
}
get searchTermPrixVen(): string {
  return this._searchTermPrixVen;
}
set searchTermPrixVen(value: string){
  this._searchTermPrixVen = value;
  this.filteredArticles = this.filtereArticlesPrixVen(value);
}
get searchTermRemise(): string {
  return this._searchTermRemise;
}
set searchTermRemise(value: string){
  this._searchTermRemise = value;
  this.filteredArticles = this.filtereArticlesRemise(value);
}
get searchTermDetMvt(): string {
  return this._searchTermDetMvt;
}
set searchTermDetMvt(value: string){
  this._searchTermDetMvt = value;
  this.filteredArticles = this.filtereArticlesDerMvt(value);
}




get searchTermPValu(): string {
  return this._searchTermPValu;
}
set searchTermPValu(value: string){
  this._searchTermPValu = value;
  this.filteredArticles = this.filtereArticlesPValu(value);
}
get searchTermXanalStk(): string {
  return this._searchTermXanalStk;
}
set searchTermXanalStk(value: string){
  this._searchTermXanalStk = value;
  this.filteredArticles = this.filtereArticlesXanalStk(value);
}
get searchTermQutV1(): string {
  return this._searchTermQutV1;
}
set searchTermQutV1(value: string){
  this._searchTermQutV1 = value;
  this.filteredArticles = this.filtereArticlesQutV1(value);
}
get searchTermQutV2(): string {
  return this._searchTermQutV2;
}
set searchTermQutV2(value: string){
  this._searchTermQutV2 = value;
  this.filteredArticles = this.filtereArticlesQutV2(value);
}
get searchTermQutV3(): string {
  return this._searchTermQutV3;
}
set searchTermQutV3(value: string){
  this._searchTermQutV3 = value;
  this.filteredArticles = this.filtereArticlesQutV3(value);
}
get searchTermVente1(): string {
  return this._searchTermVente1;
}
set searchTermVente1(value: string){
  this._searchTermVente1 = value;
  this.filteredArticles = this.filtereArticlesVente1(value);
}
get searchTermVente2(): string {
  return this._searchTermVente2;
}
set searchTermVente2(value: string){
  this._searchTermVente2 = value;
  this.filteredArticles = this.filtereArticlesVente2(value);
}
get searchTermVente3(): string {
  return this._searchTermVente3;
}
set searchTermVente3(value: string){
  this._searchTermVente3 = value;
  this.filteredArticles = this.filtereArticlesVente3(value);
}
get searchTermQutA1(): string {
  return this._searchTermQutA1;
}
set searchTermQutA1(value: string){
  this._searchTermQutA1 = value;
  this.filteredArticles = this.filtereArticlesQutA1(value);
}
get searchTermMois1(): string {
  return this._searchTermMois1;
}
set searchTermMois1(value: string){
  this._searchTermMois1 = value;
  this.filteredArticles = this.filtereArticlesMois1(value);
}
get searchTermMois2(): string {
  return this._searchTermMois2;
}
set searchTermMois2(value: string){
  this._searchTermMois2 = value;
  this.filteredArticles = this.filtereArticlesMois2(value);
}
get searchTermMois3(): string {
  return this._searchTermMois3;
}
set searchTermMois3(value: string){
  this._searchTermMois3 = value;
  this.filteredArticles = this.filtereArticlesMois3(value);
}
get searchTermMois4(): string {
  return this._searchTermMois4;
}
set searchTermMois4(value: string){
  this._searchTermMois4 = value;
  this.filteredArticles = this.filtereArticlesMois4(value);
}
get searchTermMois5(): string {
  return this._searchTermMois5;
}
set searchTermMois5(value: string){
  this._searchTermMois5 = value;
  this.filteredArticles = this.filtereArticlesMois5(value);
}
get searchTermMois6(): string {
  return this._searchTermMois6;
}
set searchTermMois6(value: string){
  this._searchTermMois6 = value;
  this.filteredArticles = this.filtereArticlesMois6(value);
}
get searchTermMois7(): string {
  return this._searchTermMois7;
}
set searchTermMois7(value: string){
  this._searchTermMois7 = value;
  this.filteredArticles = this.filtereArticlesMois7(value);
}
get searchTermMois8(): string {
  return this._searchTermMois8;
}
set searchTermMois8(value: string){
  this._searchTermMois8 = value;
  this.filteredArticles = this.filtereArticlesMois8(value);
}
get searchTermMois9(): string {
  return this._searchTermMois9;
}
set searchTermMois9(value: string){
  this._searchTermMois9 = value;
  this.filteredArticles = this.filtereArticlesMois9(value);
}
get searchTermMois10(): string {
  return this._searchTermMois10;
}
set searchTermMois10(value: string){
  this._searchTermMois10 = value;
  this.filteredArticles = this.filtereArticlesMois10(value);
}
get searchTermMois11(): string {
  return this._searchTermMois11;
}
set searchTermMois11(value: string){
  this._searchTermMois11 = value;
  this.filteredArticles = this.filtereArticlesMois11(value);
}
get searchTermMois12(): string {
  return this._searchTermMois12;
}
set searchTermMois12(value: string){
  this._searchTermMois12 = value;
  this.filteredArticles = this.filtereArticlesMois12(value);
}
get searchTermChifAff(): string {
  return this._searchTermChifAff;
}
set searchTermChifAff(value: string){
  this._searchTermChifAff = value;
  this.filteredArticles = this.filtereArticlesChifAff(value);
}
get searchTermTaux(): string {
  return this._searchTermTaux;
}
set searchTermTaux(value: string){
  this._searchTermTaux = value;
  this.filteredArticles = this.filtereArticlesTaux(value);
}


get searchTermTot(): string {
  return this._searchTermTot;
}
set searchTermTot(value: string){
  this._searchTermTot = value;
  this.filteredArticles = this.filtereArticlesTot(value);
}
get searchTermClasse(): string {
  return this._searchTermClasse;
}
set searchTermClasse(value: string){
  this._searchTermClasse = value;
  this.filteredArticles = this.filtereArticlesClasse(value);
}
get searchTermAnalStk(): string {
  return this._searchTermAnalStk;
}
set searchTermAnalStk(value: string){
  this._searchTermAnalStk = value;
  this.filteredArticles = this.filtereArticlesAnalStk(value);
}
get searchTermNbjStk(): string {
  return this._searchTermNbjStk;
}
set searchTermNbjStk(value: string){
  this._searchTermNbjStk = value;
  this.filteredArticles = this.filtereArticlesNbjStk(value);
}
get searchTermCodFrs(): string {
  return this._searchTermCodFrs;
}
set searchTermCodFrs(value: string){
  this._searchTermCodFrs = value;
  this.filteredArticles = this.filtereArticlesCodFrs(value);
}



get searchTermNbjCom(): string {
  return this._searchTermNbjCom;
}
set searchTermNbjCom(value: string){
  this._searchTermNbjCom = value;
  this.filteredArticles = this.filtereArticlesNbjCom(value);
}
get searchTermVSstk(): string {
  return this._searchTermVSstk;
}
set searchTermVSstk(value: string){
  this._searchTermVSstk = value;
  this.filteredArticles = this.filtereArticlesVSstk(value);
}
get searchTermFlag1(): string {
  return this._searchTermFlag1;
}
set searchTermFlag1(value: string){
  this._searchTermFlag1 = value;
  this.filteredArticles = this.filtereArticlesFlag1(value);
}
get searchTermFlag2(): string {
  return this._searchTermFlag2;
}
set searchTermFlag2(value: string){
  this._searchTermFlag2 = value;
  this.filteredArticles = this.filtereArticlesFlag2(value);
}

get searchTermComStk(): string {
  return this._searchTermComStk;
}
set searchTermComStk(value: string){
  this._searchTermComStk = value;
  this.filteredArticles = this.filtereArticlesComStk(value);
}
get searchTermComNbj(): string {
  return this._searchTermComNbj;
}
set searchTermComNbj(value: string){
  this._searchTermComNbj = value;
  this.filteredArticles = this.filtereArticlesComNbj(value);
}
get searchTermCumulDem(): string {
  return this._searchTermCumulDem;
}
set searchTermCumulDem(value: string){
  this._searchTermCumulDem = value;
  this.filteredArticles = this.filtereArticlesCumulDem(value);
}


get searchTermQutDou(): string {
  return this._searchTermQutDou;
}
set searchTermQutDou(value: string){
  this._searchTermQutDou = value;
  this.filteredArticles = this.filtereArticlesQutDou (value);
}
get searchTermUnitInv(): string {
  return this._searchTermUnitInv;
}
set searchTermUnitInv(value: string){
  this._searchTermUnitInv = value;
  this.filteredArticles = this.filtereArticlesUnitInv(value);
}
get searchTermXtypAnal(): string {
  return this._searchTermXtypAnal;
}
set searchTermXtypAnal(value: string){
  this._searchTermXtypAnal = value;
  this.filteredArticles = this.filtereArticlesXtypAnal(value);
}
get searchTermXvCom(): string {
  return this._searchTermXvCom;
}
set searchTermXvCom(value: string){
  this._searchTermXvCom = value;
  this.filteredArticles = this.filtereArticlesXvCom(value);
}
get searchTermQutDem(): string {
  return this._searchTermQutDem;
}
set searchTermQutDem(value: string){
  this._searchTermQutDem = value;
  this.filteredArticles = this.filtereArticlesQutDem(value);
}
get searchTermQutConf(): string {
  return this._searchTermQutConf;
}
set searchTermQutConf(value: string){
  this._searchTermQutConf = value;
  this.filteredArticles = this.filtereArticlesQutConf(value);
}
get searchTermQutProf(): string {
  return this._searchTermQutProf;
}
set searchTermQutProf(value: string){
  this._searchTermQutProf = value;
  this.filteredArticles = this.filtereArticlesQutProf(value);
}
get searchTermPrixProf(): string {
  return this._searchTermPrixProf;
}
set searchTermPrixProf(value: string){
  this._searchTermPrixProf = value;
  this.filteredArticles = this.filtereArticlesPrixProf(value);
}
get searchTermPrixConf(): string {
  return this._searchTermPrixConf;
}
set searchTermPrixConf(value: string){
  this._searchTermPrixConf = value;
  this.filteredArticles = this.filtereArticlesPrixConf(value);
}
get searchTermQutSup(): string {
  return this._searchTermQutSup;
}
set searchTermQutSup(value: string){
  this._searchTermQutSup = value;
  this.filteredArticles = this.filtereArticlesQutSup(value);
}
get searchTermVenPer(): string {
  return this._searchTermVenPer;
}
set searchTermVenPer(value: string){
  this._searchTermVenPer = value;
  this.filteredArticles = this.filtereArticlesVenPer(value);
}
get searchTermTarifFrs(): string {
  return this._searchTermTarifFrs;
}
set searchTermTarifFrs(value: string){
  this._searchTermTarifFrs = value;
  this.filteredArticles = this.filtereArticlesTarifFrs (value);
}
get searchTermConfer(): string {
  return this._searchTermConfer;
}
set searchTermConfer(value: string){
  this._searchTermConfer = value;
  this.filteredArticles = this.filtereArticlesConfr(value);
}
get searchTermPrixAM(): string {
  return this._searchTermPrixAM;
}
set searchTermPrixAM(value: string){
  this._searchTermPrixAM = value;
  this.filteredArticles = this.filtereArticlesPrixAM(value);
}
get searchTermTypeV(): string {
  return this._searchTermTypeV;
}
set searchTermTypeV(value: string){
  this._searchTermTypeV = value;
  this.filteredArticles = this.filtereArticlesTypeV (value);
}
get searchTermXprixAch(): string {
  return this._searchTermXprixAch;
}
set searchTermXprixAch(value: string){
  this._searchTermXprixAch = value;
  this.filteredArticles = this.filtereArticlesXprixAch(value);
}
get searchTermT(): string {
  return this._searchTermT;
}
set searchTermT(value: string){
  this._searchTermT = value;
  this.filteredArticles = this.filtereArticlesT(value);
}
get searchTermReliq(): string {
  return this._searchTermReliq;
}
set searchTermReliq(value: string){
  this._searchTermReliq = value;
  this.filteredArticles = this.filtereArticlesReliq(value);
}
get searchTermDerPDev(): string {
  return this._searchTermDerPDev;
}
set searchTermDerPDev(value: string){
  this._searchTermDerPDev = value;
  this.filteredArticles = this.filtereArticlesDerPDev(value);
}
get searchTermPrixEuro(): string {
  return this._searchTermPrixEuro;
}
set searchTermPrixEuro(value: string){
  this._searchTermPrixEuro = value;
  this.filteredArticles = this.filtereArticlesPrixEuro(value);
}
get searchTermCumulRes(): string {
  return this._searchTermCumulRes;
}
set searchTermCumulRes(value: string){
  this._searchTermCumulRes = value;
  this.filteredArticles = this.filtereArticlesCumulRes(value);
}
get searchTermCodBar(): string {
  return this._searchTermCodBar;
}
set searchTermCodBar(value: string){
  this._searchTermCodBar = value;
  this.filteredArticles = this.filtereArticlesCodBar(value);
}
get searchTermControle(): string {
  return this._searchTermControle;
}
set searchTermControle(value: string){
  this._searchTermControle = value;
  this.filteredArticles = this.filtereArticlesControle(value);
}
get searchTermEnergie(): string {
  return this._searchTermEnergie;
}
set searchTermEnergie(value: string){
  this._searchTermEnergie = value;
  this.filteredArticles = this.filtereArticlesEnergie(value);
}
get searchTermPoids(): string {
  return this._searchTermPoids;
}
set searchTermPoids(value: string){
  this._searchTermPoids = value;
  this.filteredArticles = this.filtereArticlesPoids(value);
}
get searchTermVersions(): string {
  return this._searchTermVersions;
}
set searchTermVersions(value: string){
  this._searchTermVersions = value;
  this.filteredArticles = this.filtereArticlesVersions(value);
}

get searchTermObservatio(): string {
  return this._searchTermObservatio;
}
set searchTermObservatio(value: string){
  this._searchTermObservatio = value;
  this.filteredArticles = this.filtereArticlesObservatio(value);
}
get searchTermDatCreat(): string {
  return this._searchTermDatCreat;
}
set searchTermDatCreat(value: string){
  this._searchTermDatCreat = value;
  this.filteredArticles = this.filtereArticlesDatCreat(value);
}
get searchTermNbjRup(): string {
  return this._searchTermNbjRup;
}
set searchTermNbjRup(value: string){
  this._searchTermNbjRup = value;
  this.filteredArticles = this.filtereArticlesNbjRup(value);
}
get searchTermNbjRup1(): string {
  return this._searchTermNbjRup1;
}
set searchTermNbjRup1(value: string){
  this._searchTermNbjRup1 = value;
  this.filteredArticles = this.filtereArticlesNbjRup1(value);
}

get searchTermPrixCEur(): string {
  return this._searchTermPrixCEur;
}
set searchTermPrixCEur(value: string){
  this._searchTermPrixCEur = value;
  this.filteredArticles = this.filtereArticlesPrixCEur(value);
}
get searchTermPrixIni(): string {
  return this._searchTermPrixIni;
}
set searchTermPrixIni(value: string){
  this._searchTermPrixIni = value;
  this.filteredArticles = this.filtereArticlesPrixIni(value);
}
get searchTermCumulEnt(): string {
  return this._searchTermCumulEnt;
}
set searchTermCumulEnt(value: string){
  this._searchTermCumulEnt = value;
  this.filteredArticles = this.filtereArticlesCumulEnt(value);
}
get searchTermCumulBs(): string {
  return this._searchTermCumulBs;
}
set searchTermCumulBs(value: string){
  this._searchTermCumulBs = value;
  this.filteredArticles = this.filtereArticlesCumulBs(value);
}
get searchTermStkAtrsf(): string {
  return this._searchTermStkAtrsf;
}
set searchTermStkAtrsf(value: string){
  this._searchTermStkAtrsf = value;
  this.filteredArticles = this.filtereArticlesStkAtrsf(value);
}
get searchTermStkTrsf(): string {
  return this._searchTermStkTrsf;
}
set searchTermStkTrsf(value: string){
  this._searchTermStkTrsf = value;
  this.filteredArticles = this.filtereArticlesStkTrsf(value);
}
get searchTermConsMoy(): string {
  return this._searchTermConsMoy;
}
set searchTermConsMoy(value: string){
  this._searchTermConsMoy = value;
  this.filteredArticles = this.filtereArticlesConsMoy(value);
}
get searchTermQutRav(): string {
  return this._searchTermQutRav;
}
set searchTermQutRav(value: string){
  this._searchTermQutRav = value;
  this.filteredArticles = this.filtereArticlesQutRav(value);
}
get searchTermQutDep1(): string {
  return this._searchTermQutDep1;
}
set searchTermQutDep1(value: string){
  this._searchTermQutDep1 = value;
  this.filteredArticles = this.filtereArticlesQutDep1(value);
}
get searchTermCumulConf(): string {
  return this._searchTermCumulConf;
}
set searchTermCumulConf(value: string){
  this._searchTermCumulConf = value;
  this.filteredArticles = this.filtereArticlesCumulConf(value);
}
get searchTermPointage1(): string {
  return this._searchTermPointage1;
}
set searchTermPointage1(value: string){
  this._searchTermPointage1 = value;
  this.filteredArticles = this.filtereArticlesPointage1(value);
}

get searchTermPointage2(): string {
  return this._searchTermPointage2;
}
set searchTermPointage2(value: string){
  this._searchTermPointage2 = value;
  this.filteredArticles = this.filtereArticlesPointage2(value);
}

get searchTermSpecific(): string {
  return this._searchTermSpecific;
}
set searchTermSpecific(value: string){
  this._searchTermSpecific = value;
  this.filteredArticles = this.filtereArticlesSpecific(value);
}
get searchTermDerP_Dev(): string {
  return this._searchTermDerP_Dev;
}
set searchTermDerP_Dev(value: string){
  this._searchTermDerP_Dev = value;
  this.filteredArticles = this.filtereArticlesDerP_Dev(value);
}


filtereArticlesRefRem(seachString: string){
  return this.articles.filter(Article => Article.refRem.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesSpecific(seachString: string){
  return this.articles.filter(Article => Article.specific.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesPointage1(seachString: string){
  return this.articles.filter(Article => Article.pointage1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesPointage2(seachString: string){
  return this.articles.filter(Article => Article.pointage2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesCumulConf(seachString: string){
  return this.articles.filter(Article => Article.cumulConf.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutDep1(seachString: string){
  return this.articles.filter(Article => Article.qutDep1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutRav(seachString: string){
  return this.articles.filter(Article => Article.qutRav.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesConsMoy(seachString: string){
  return this.articles.filter(Article => Article.consMoy.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesStkTrsf(seachString: string){
  return this.articles.filter(Article => Article.stkTrsf.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesCumulBs(seachString: string){
  return this.articles.filter(Article => Article.cumulBs.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesStkAtrsf(seachString: string){
  return this.articles.filter(Article => Article.stkAtrsf.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesCumulEnt(seachString: string){
  return this.articles.filter(Article => Article.cumulEnt.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesPrixIni(seachString: string){
  return this.articles.filter(Article => Article.prixIni.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesCentre(seachString: string){
  return this.articles.filter(Article => Article.centre.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesNbjRup1(seachString: string){
  return this.articles.filter(Article => Article.nbjRup1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesNbjRup(seachString: string){
  return this.articles.filter(Article => Article.nbjRup.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesDatCreat(seachString: string){
  return this.articles.filter(Article => Article.datCreat.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesObservatio(seachString: string){
  return this.articles.filter(Article => Article.observatio.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}

filtereArticlesVersions(seachString: string){
  return this.articles.filter(Article => Article.versions.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesPoids(seachString: string){
  return this.articles.filter(Article => Article.poids.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesEnergie(seachString: string){
  return this.articles.filter(Article => Article.energie.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesControle(seachString: string){
  return this.articles.filter(Article => Article.controle.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesCodBar(seachString: string){
  return this.articles.filter(Article => Article.codBar.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesCumulRes(seachString: string){
  return this.articles.filter(Article => Article.cumulRes.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesPrixEuro(seachString: string){
  return this.articles.filter(Article => Article.prixEuro.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesDerPDev(seachString: string){
  return this.articles.filter(Article => Article.derPDev.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesReliq(seachString: string){
  return this.articles.filter(Article => Article.reliq.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesT(seachString: string){
  return this.articles.filter(Article => Article.t.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesXprixAch(seachString: string){
  return this.articles.filter(Article => Article.xprixAch.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesTypeV(seachString: string){
  return this.articles.filter(Article => Article.typeV.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesPrixAM(seachString: string){
  return this.articles.filter(Article => Article.prixAM.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesConfr(seachString: string){
  return this.articles.filter(Article => Article.confr.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesTarifFrs(seachString: string){
  return this.articles.filter(Article => Article.tarifFrs.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesVenPer(seachString: string){
  return this.articles.filter(Article => Article.venPer.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutSup(seachString: string){
  return this.articles.filter(Article => Article.qutSup.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesPrixConf(seachString: string){
  return this.articles.filter(Article => Article.prixConf.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesPrixProf(seachString: string){
  return this.articles.filter(Article => Article.prixProf.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutProf(seachString: string){
  return this.articles.filter(Article => Article.qutProf.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutConf(seachString: string){
  return this.articles.filter(Article => Article.qutConf.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesTypAnal(seachString: string){
  return this.articles.filter(Article => Article.typAnal.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutDem(seachString: string){
  return this.articles.filter(Article => Article.qutDem.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesXvCom(seachString: string){
  return this.articles.filter(Article => Article.xvCom.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesXtypAnal(seachString: string){
  return this.articles.filter(Article => Article.xtypAnal.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutDou(seachString: string){
  return this.articles.filter(Article => Article.qutDou.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutA1(seachString: string){
  return this.articles.filter(Article => Article.qutA1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesVente3(seachString: string){
  return this.articles.filter(Article => Article.vente3.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesVente2(seachString: string){
  return this.articles.filter(Article => Article.vente2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesVente1(seachString: string){
  return this.articles.filter(Article => Article.vente1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutV3(seachString: string){
  return this.articles.filter(Article => Article.qutV3.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesFlag1(seachString: string){
  return this.articles.filter(Article => Article.flag1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesFlag2(seachString: string){
  return this.articles.filter(Article => Article.flag2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesAnalStk(seachString: string){
  return this.articles.filter(Article => Article.analStk.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesNbjCom(seachString: string){
  return this.articles.filter(Article => Article.nbjCom.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesNbjStk(seachString: string){
  return this.articles.filter(Article => Article.nbjStk.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesClasse(seachString: string){
  return this.articles.filter(Article => Article.classe.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesChifAff(seachString: string){
  return this.articles.filter(Article => Article.chifAff.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesTaux(seachString: string){
  return this.articles.filter(Article => Article.taux.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesTot(seachString: string){
  return this.articles.filter(Article => Article.tot.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesMois12(seachString: string){
  return this.articles.filter(Article => Article.mois12.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesMois11(seachString: string){
  return this.articles.filter(Article => Article.mois11.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesMois10(seachString: string){
  return this.articles.filter(Article => Article.mois10.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesMois9(seachString: string){
  return this.articles.filter(Article => Article.mois9.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesMois8(seachString: string){
  return this.articles.filter(Article => Article.mois8.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesMois7(seachString: string){
  return this.articles.filter(Article => Article.mois7.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesMois6(seachString: string){
  return this.articles.filter(Article => Article.mois6.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesMois5(seachString: string){
  return this.articles.filter(Article => Article.mois5.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesMois4(seachString: string){
  return this.articles.filter(Article => Article.mois4.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesMois3(seachString: string){
  return this.articles.filter(Article => Article.mois3.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesMois2(seachString: string){
  return this.articles.filter(Article => Article.mois2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesMois1(seachString: string){
  return this.articles.filter(Article => Article.mois1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesUnitInv(seachString: string){
  return this.articles.filter(Article => Article.unitInv.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesCumulDem(seachString: string){
  return this.articles.filter(Article => Article.cumulDem.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesComNbj(seachString: string){
  return this.articles.filter(Article => Article.comNbj.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesComStk(seachString: string){
  return this.articles.filter(Article => Article.comStk.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesVSstk(seachString: string){
  return this.articles.filter(Article => Article.vSstk.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutV2(seachString: string){
  return this.articles.filter(Article => Article.qutV2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutV1(seachString: string){
  return this.articles.filter(Article => Article.qutV1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesXanalStk(seachString: string){
  return this.articles.filter(Article => Article.xanalStk.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesPValu(seachString: string){
  return this.articles.filter(Article => Article.pValu.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesDerMvt(seachString: string){
  return this.articles.filter(Article => Article.derMvt.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesRemise(seachString: string){
  return this.articles.filter(Article => Article.remise.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesPrixVen(seachString: string){
  return this.articles.filter(Article => Article.prixVen.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesPrixCEur(seachString: string){
  return this.articles.filter(Article => Article.prixCEur.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesCodFrs(seachString: string){
  return this.articles.filter(Article => Article.codFrs.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesPrixAch(seachString: string){
  return this.articles.filter(Article => Article.prixAch.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesDerPAch(seachString: string){
  return this.articles.filter(Article => Article.derPAch.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesPrixArem(seachString: string){
  return this.articles.filter(Article => Article.prixArem.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesCumulAch(seachString: string){
  return this.articles.filter(Article => Article.cumulAch.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesCumulVen(seachString: string){
  return this.articles.filter(Article => Article.cumulVen.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesTva(seachString: string){
  return this.articles.filter(Article => Article.tva.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesCoef(seachString: string){
  return this.articles.filter(Article => Article.coef.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesCours(seachString: string){
  return this.articles.filter(Article => Article.cours.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesPointage(seachString: string){
  return this.articles.filter(Article => Article.pointage.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesPrixDev(seachString: string){
  return this.articles.filter(Article => Article.prixDev.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesPrixMin(seachString: string){
  return this.articles.filter(Article => Article.prixMin.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutDep(seachString: string){
  return this.articles.filter(Article => Article.qutDep.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutMin(seachString: string){
  return this.articles.filter(Article => Article.qutMin.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutMax(seachString: string){
  return this.articles.filter(Article => Article.qutMax.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesStkIni(seachString: string){
  return this.articles.filter(Article => Article.stkIni.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesStkGar(seachString: string){
  return this.articles.filter(Article => Article.stkGar.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesUnitVen(seachString: string){
  return this.articles.filter(Article => Article.unitVen.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutStk2(seachString: string){
  return this.articles.filter(Article => Article.qutStk2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutStk(seachString: string){
  return this.articles.filter(Article => Article.qutStk.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesNumCas(seachString: string){
  return this.articles.filter(Article => Article.numCas.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesCodNgp(seachString: string){
  return this.articles.filter(Article => Article.codNgp.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesRefOrg(seachString: string){
  return this.articles.filter(Article => Article.refOrg.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesDesArt(seachString: string){
  return this.articles.filter(Article => Article.desArt.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesCodArt(seachString: string){
  return this.articles.filter(Article => Article.codArt.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesTotalPoin(seachString: string){
  return this.articles.filter(Article => Article.totalPoin.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesEtage2(seachString: string){
  return this.articles.filter(Article => Article.etage2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesFamille(seachString: string){
  return this.articles.filter(Article => Article.famille.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesSFamille(seachString: string){
  return this.articles.filter(Article => Article.sFamille.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesStkReel(seachString: string){
  return this.articles.filter(Article => Article.stkReel.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesStkRes(seachString: string){
  return this.articles.filter(Article => Article.stkRes.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesStkNp(seachString: string){
  return this.articles.filter(Article => Article.stkNp.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesDerpach(seachString: string){
  return this.articles.filter(Article => Article.derPAch.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesDerpdev(seachString: string){
  return this.articles.filter(Article => Article.derPDev.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesPrixam(seachString: string){
  return this.articles.filter(Article => Article.prixAM.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesPrixceur(seachString: string){
  return this.articles.filter(Article => Article.prixCeur.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQuta1(seachString: string){
  return this.articles.filter(Article => Article.qutA1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutv1(seachString: string){
  return this.articles.filter(Article => Article.qutV1.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutv2(seachString: string){
  return this.articles.filter(Article => Article.qutV2.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesQutv3(seachString: string){
  return this.articles.filter(Article => Article.qutV3.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesTypev(seachString: string){
  return this.articles.filter(Article => Article.typeV.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereArticlesDerP_Dev(seachString: string){
  return this.articles.filter(Article => Article.derPDev.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
/*********end seach fot anything */


  /**the other view of table Articles */
  stateOptions: any[];
  sortOptions: SelectItem[];
  sortOrder: number;

  sortField: string;

  /**the other view of table Articles */ 


  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
 

  constructor(private authService: TokenStorageService,private dialogService: NbDialogService, private primengConfig: PrimeNGConfig,private http: HttpClient,private articleService: ArticleService,
    private router: Router, private modelService:ModelService, private marqueService:MarqueService, private galleryService:GalleryService, private service: SmartTableData,private windowService: NbWindowService, private fb: FormBuilder) {
      this.stateOptions = [{label: 'Off', value: 'off'}, {label: 'On', value: 'on'}];
    }

    goToCharts($myParam: string = ''): void {
      const navigationDetails: string[] = ['//pages/Articles/echarts-article'];
      if($myParam.length) {
        navigationDetails.push($myParam);
      }
      this.router.navigate(navigationDetails);
    }

    articleDetails(NUM_BON_LIV: string){
      this.router.navigate(['article-detail', NUM_BON_LIV]);
    }

    goToDetails($myParam: string = ''): void {
      const navigationDetails: string[] = ['//pages/Articles/article-detail'];
      if($myParam.length) {
        navigationDetails.push($myParam);
      }
      this.router.navigate(navigationDetails);
    }

    previewTableAllArticle = false;
    disableMovement = false;
    /* afficher all articles**/
    authority;
    ngOnInit() {

      this.authService.getAuthorities().forEach(authority => {
        this.authority=authority;
        console.log(this.authority);
      });

      if(this.authority=='ROLE_CLIENT' || this.authority=='ROLE_USER' || this.authority=='ROLE_ACHETEUR'){
        this.previewTableAllArticle = true;
        this.disableMovement = true;
      }

      this.getAllModelesList();
      this.getAllMarquesList();
      this.getArticles();
      this.sortOptions = [
        {label: 'les Prix maximal', value: '!prixArem'},
        {label: 'les Prix minimal', value: 'prixArem'}
    ];
    this.primengConfig.ripple = true;
    }
  
    private getArticles() {
      this.articleService.getArticlesList().subscribe(data => {
        this.articles = data;
        this.filteredArticles = this.articles;
        console.log(data);
      });
    } 

  source: LocalDataSource = new LocalDataSource();

/**show image user */
displayModalUser: boolean;
showModalDialogUser() {
  this.displayModalUser = true;
}
  
  getArticleOfFromMarqueAddForBonLiv(selectedMarques: any){
    if(selectedMarques!=null){
      return this.filteredArticles = this.articles.filter(Article => Article.marque.title.toLowerCase().startsWith(selectedMarques.toLowerCase()));
    }else{
  this.getArticles();
}
}
getArticleOfFromModelAddForBonLiv(selectedModels: any){
  console.log(selectedModels);  
  if(selectedModels.value!=null){
  console.log(selectedModels.value.title); 
    return this.filteredArticles = this.articles.filter(Article => Article.model.title.startsWith(selectedModels.value.title));
  }else{
this.getArticles();
}
}
  /* delete popap*/
  codArt:any;
  OpenDeletePopap(codArt) {
    this.dialogService.open(ResetArticleDialogComponent, {
      context: {
        title: codArt,
      },
    });
  }
/* end the popap **/   
  /* delete popap*/
  OpenUploadPopap(codArt) {
    this.dialogService.open(UploadImgArticleDialogComponent, {
      context: {
        title: codArt,
      },
    });
  }
/* end the popap **/   

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  goToModifier(codArt: string ){
    this.router.navigate(['//pages/Articles/update-article',codArt])
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
    @Input() public resultGridList : Array <any> = [];
    data = [];
    handleResults(searchObj) {
      this.data = searchObj
      console.log(this.data);
    }
    openWindowFormFilterDateDAT_CREAT() {
      this.windowService.open(WindowDateFilterComponent, {
            context: {
        title: 'DAT_CREAT',
      }});
    }
    async openWindowFormFilterDateDER_ACH() {
      await this.windowService.open(WindowDateFilterComponent,
        {
          context: {
      title: 'DER_ACH',
      }});
    }
    openWindowFormFilterDateDER_MVT() {
      this.windowService.open(WindowDateFilterComponent,
        {
          context: {
      title: 'DER_MVT',
      }});
    }
    openWindowFormFilterDateDAT_RUP() {
      this.windowService.open(WindowDateFilterComponent,
        {
          context: {
      title: 'DAT_RUP',
      }});
    }
    openWindowFormFilterDateDAT_PACH() {
      this.windowService.open(WindowDateFilterComponent,
        {
          context: {
      title: 'DAT_PACH',
      }});
    }

    /**end filter date */


/**end filter date */

openWindowSpecialM(codArt) {
  this.dialogService.open(SpecialMDialogComponent, {
    context: {
      title: codArt,
    },
  });
}
/**end filter date */


    /**the other view of table Articles */



    onSortChange(event) {
      let value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      }
      else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }

  togglepreviewTableArticle(){
    this.previewTableAllArticle = !this.previewTableAllArticle;
  }
    /**the other view of table Articles */

    marqueAllList:any;
    getAllMarquesList(){
    this.marqueService.getMarquesList().subscribe(data => {
      this.marqueAllList = data;
      console.log(data);
    });
  }
  modeleAllList:any;
  getAllModelesList(){
  this.modelService.getModelsList().subscribe(data => {
    this.modeleAllList = data;
    console.log(data);
  });
}





}
