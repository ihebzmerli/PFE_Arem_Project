import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Bon_sort } from '../bon-sort';
import 'rxjs/add/operator/delay';
import { BonSortService } from '../bon-sort.service';
import { NbDateService, NbWindowService } from '@nebular/theme';
import { Bon_liv } from '../../Bon_Livs/bon-liv'
import { BonLivService } from '../../Bon_Livs/bon-liv.service';
import { FormBuilder, Validators ,NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, NgForm, FormGroup } from '@angular/forms';
import { WindowTypeStockComponent } from './window-type-stock/window-type-stock.component';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from '@nebular/theme';
import { Fournis } from '../../Fourniss/Fournis';
import { Article } from '../../Articles/article';
import { Art_Sort } from '../Art_Sorts/art-sort';
import { delay } from 'rxjs/operators';
import { ArticleService } from '../../Articles/article.service';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { Chariot } from '../../Chariots/chariot';
import { ChariotService } from '../../Chariots/chariot.service';
import { UtilisateurService } from '../../Utilisateurs/utilisateur.service';
import { DatePipe } from '@angular/common';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { Console } from 'console';
import { Marque } from '../../Marques/marque';
import { MarqueService } from '../../Marques/marque.service';
import { Model } from '../../Model/model';
import { VehiculeService } from '../../Vehicules/vehicule.service';
import { Vehicule } from '../../Vehicules/vehicule';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-create-bon-sort',
  templateUrl: './create-bon-sort.component.html',
  styleUrls: ['./create-bon-sort.component.scss']
})
export class CreateBonSortComponent implements OnInit,Validator {
/** start list des select option */
previewPhotoArticle = false;
previewPhotoAllArticle = false;
selected = null;

FournisList: Fournis[];

CommandList: Bon_liv[];
ArticleGeted: Article;
MarqueList: Marque[];
codArticle: any[] = [];
/** end list des select option */
ArticleWindow : boolean;
/** teamplate Ajouter */
starRate = 2;
heartRate = 4;
radioGroupValue = 'This is value 2';

min: Date;
max: Date;

ArticleList: Article [];
value = 1;
choise_destina: boolean = false;


bonSortForm: FormGroup;
/** ********************* */
article: Article = new Article();
bonsort: Bon_sort = new Bon_sort();
artsort: Art_Sort = new Art_Sort();
submitted = false;
userPost: Utilisateur;
poste: any;

constructor(private authService: TokenStorageService,private toastrService: NbToastrService,public fb: FormBuilder,private bonlivService:BonLivService,public bonsortService: BonSortService,
  private router: Router,protected dateService: NbDateService<Date>,private windowService: NbWindowService,public articleService: ArticleService
  ,public chariotService: ChariotService,public utilisateurService:UtilisateurService,public datepipe: DatePipe, public marqueService: MarqueService
  ,public vehiculeService:VehiculeService) {
    this.min = this.dateService.addDay(this.dateService.today(), -7);
    this.max = this.dateService.addDay(this.dateService.today(), 7);

   }
  validate(control: AbstractControl): ValidationErrors {
    throw new Error('Method not implemented.');
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
  
  ngOnInit(): void {
    
    this.getVehicules();
    this.getBonSorts();
    this.getArtSorts();
    this.getFournisOfAdd();
    this.getArticleOfAdd();
    this.getAllMarquesList();
    this.getListChariot();
    this.utilisateurService.getIdUserByUsername(this.authService.getUsername()).subscribe(data1 => {
      this.utilisateurService.getUtilisateur(data1.toString()).subscribe(data => {
        this.userPost = data;
        this.poste = this.userPost.firstname+' '+this.userPost.lastname;
        this.bonsort.user = this.userPost;
        this.bonsort.poste =this.poste;
      }, error => console.log(error));
    }, error => console.log(error));

    this.bonsort.datBon = new Date(Date().toLocaleString());
    this.bonsort.datBon.setMinutes(this.bonsort.datBon.getMinutes() + this.bonsort.datBon.getTimezoneOffset() + 120);

    this.bonsort.xbase1 = 0;
    this.bonsort.xbase2 = 0;
    this.bonsort.xbase3 = 0;
    this.bonsort.xbase4 = 0;
    this.bonsort.xbase5 = 0;
    this.bonsort.xtva1 = 0;
    this.bonsort.xtva2 = 0;
    this.bonsort.xtva3 = 0;
    this.bonsort.xtva4 = 0;
  }


  bonSorts: Bon_sort[];
  artSortsList: Art_Sort[];
  private getBonSorts() {
    this.bonsortService.getBon_sortsList().subscribe(data => {
      this.bonSorts = data;
    });
  }
  private getArtSorts(){
    this.bonsortService.getArt_sortsList().subscribe(data => {
      this.artSortsList = data;
    });
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

saveBonsort() {
  

  this.bonsortService.createBon_sort(this.bonsort).subscribe( data =>{
    console.log(data);
    //this.gotoListBonsort();
  },
  error => console.log(error));
}
quatiteStk: bigint;
plz:any;


saveArtsort() {


/*
        Article.PrixVen == BonPrep.NetHT * artPrep.tva
        BonPrep.NetHT  == Article.PrixAch * Quantité.ArtPrep
        BonPrep.BrutHT  == Article.PrixVen * Quantité.ArtPrep
        BonPrep.TotTTc  == Article.PrixArem * Quantité.ArtPrep // Si le Article don t existe PrisArem is brutHt //
//////////////////////
        ArtPrep.PrixHt  == Article.PrixAch
        ArtPrep.PrixArem  == Article.PrixArem * qutPiv
        ArtPrep.ToTHt  == ArtPrep.PrixHt * qutPiv
        ArtPrep.PrixAch  == Article.PrixAch * qutPiv
        artPrep.tva == BonPrep.montTva*ArtPrep.ToTHt/100

*/

  this.artsort.num_bon_sort = this.bonsort.numBon;
//  this.artsort.centre = this.bonsort.centre;

  this.artsort.codArt = this.article.codArt;  

    this.artsort.cumulRet = 0;

    if(this.artsort.qutStk==null || !this.artsort.qutStk || this.artsort.qutStk == 0){
      this.artsort.qutStk=0
    }
    if(this.artsort.qutStk2==null || !this.artsort.qutStk2 || this.artsort.qutStk2 == 0){
      this.artsort.qutStk2=0
    }
    if(this.artsort.stkGar==null || !this.artsort.stkGar || this.artsort.stkGar == 0){
      this.artsort.stkGar=0
    }
    if(this.artsort.stkIni==null || !this.artsort.stkIni || this.artsort.stkIni == 0){
      this.artsort.stkIni=0
    }
    if(this.artsort.analStk==null || !this.artsort.analStk || this.artsort.analStk == 0){
      this.artsort.analStk=0
    }
    if(this.artsort.nbjStk==null || !this.artsort.nbjStk || this.artsort.nbjStk == 0){
      this.artsort.nbjStk=0
    }
    if(this.artsort.vSstk==null || !this.artsort.vSstk || this.artsort.vSstk == 0){
      this.artsort.vSstk=0
    }
    if(this.artsort.comStk==null || !this.artsort.comStk || this.artsort.comStk == 0){
      this.artsort.comStk=0
    }
    if(this.artsort.xanalStk==null || !this.artsort.xanalStk || this.artsort.xanalStk == 0){
      this.artsort.xanalStk=0
    }
    if(this.artsort.stkAtrsf==null || !this.artsort.stkAtrsf || this.artsort.stkAtrsf == 0){
      this.artsort.stkAtrsf=0
    }
    if(this.artsort.stkTrsf==null || !this.artsort.stkTrsf || this.artsort.stkTrsf == 0){
      this.artsort.stkTrsf=0
    }
    if(this.artsort.stkReel==null || !this.artsort.stkReel || this.artsort.stkReel == 0){
      this.artsort.stkReel=0
    }
    if(this.artsort.stkRes==null || !this.artsort.stkRes || this.artsort.stkRes == 0){
      this.artsort.stkRes=0
    }
    if(this.artsort.stkNp==null || !this.artsort.stkNp || this.artsort.stkNp == 0){
      this.artsort.stkNp=0
    }

    this.artsort.qutSortie = this.artsort.qutStk+this.artsort.qutStk2+this.artsort.stkGar+this.artsort.stkIni+this.artsort.analStk+
    this.artsort.nbjStk+this.artsort.vSstk+this.artsort.comStk+this.artsort.xanalStk+this.artsort.stkAtrsf+this.artsort.stkTrsf+
    this.artsort.stkReel+this.artsort.stkRes+this.artsort.stkNp;


    if (this.ArticleGeted.prixArem > 0) {
      this.artsort.prixArem = this.ArticleGeted.prixArem*this.artsort.qutSortie;
    }
    if (this.ArticleGeted.prixArem <= 0 || this.ArticleGeted.prixArem == null || !this.ArticleGeted.prixArem || this.ArticleGeted.prixArem==NaN) {
      this.artsort.prixArem = 0;
    }

  
    if (this.ArticleGeted.prixAch > 0) {
      this.artsort.prixHt = this.ArticleGeted.prixAch;
    }
    if (this.ArticleGeted.prixAch <= 0 || this.ArticleGeted.prixAch == null || !this.ArticleGeted.prixAch || this.ArticleGeted.prixAch==NaN) {
      this.artsort.prixHt = 0;
    }
  this.artsort.totHt = this.artsort.prixHt*this.artsort.qutSortie;

  this.artsort.tva = Number(((this.bonsort.montTva*this.artsort.totHt)/100).toFixed(2));
  console.log(this.artsort.tva);
  if(this.artsort.tva <= 0 || this.artsort.tva == null || !this.artsort.tva || this.artsort.tva==NaN){
    this.artsort.tva=0;
  }

    
  console.log(this.artsort);
    this.bonsortService.createArt_sort(this.artsort).subscribe( data =>{
      console.log(data);
    },
    error => console.log(error));

    this.articleService.UpdateStkArticleOut(this.artsort.codArt,this.artsort).subscribe( data =>{
      console.log(data);
    },
    error => console.log(error));


    this.bonsortService.getSumQutByBSAREM(this.bonsort.numBon).subscribe(data => {
      this.QutTotalArem = data;
      this.bonsort.totTtc=Number(this.QutTotalArem);
      console.log("123"+this.QutTotalArem);
    this.bonsortService.getSumQutByBSht(this.bonsort.numBon).subscribe(data => {
      this.QutTotalHt= data;
      this.bonsort.brutHt=Number(this.QutTotalHt);
      console.log("123"+this.QutTotalHt);
    });
  });
}

gotoListBonsort($myParam: string = ''): void {
  const navigationDetails: string[] = ['//pages/Bon_Sorts/bon-sort-list'];
  if($myParam.length) {
    navigationDetails.push($myParam);
  }
  this.router.navigate(navigationDetails);
}


QutTotalAch: any;
QutTotalHt: any;
QutTotalArem: any;

prixUpdateBS(){
  
      this.bonsortService.updateBonSortPrix(this.bonsort.numBon,this.bonsort).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
}

AutreArticle: boolean;
  async onSubmitArtBon() {
  await this.getArtSorts();
  if(this.article.marque  || this.article.model ||  this.article.codArt){
  var target=this.artSortsList.find(temp=>temp.codArt==this.article.codArt && temp.num_bon_sort==this.bonsort.numBon);
  }
  console.log(target);
   if((this.article.marque && this.article.codArt) && ((this.artsort.qutStk== 0 || this.artsort.qutStk==null) && (this.artsort.qutStk2 == 0 || this.artsort.qutStk2==null) && (this.artsort.stkGar == 0 || this.artsort.stkGar==null) && (this.artsort.stkIni == 0 || this.artsort.stkIni==null) &&
   (this.artsort.analStk == 0 || this.artsort.analStk==null) && (this.artsort.nbjStk == 0 || this.artsort.nbjStk==null) && (this.artsort.vSstk == 0 || this.artsort.vSstk==null) && (this.artsort.comStk == 0 || this.artsort.comStk==null) &&
    (this.artsort.xanalStk == 0 || this.artsort.xanalStk==null) && (this.artsort.stkAtrsf == 0 || this.artsort.stkAtrsf==null)
    && (this.artsort.stkTrsf == 0 || this.artsort.stkTrsf==null) && (this.artsort.stkReel == 0 || this.artsort.stkReel==null) && (this.artsort.stkRes == 0 || this.artsort.stkRes==null) && (this.artsort.stkNp == 0 || this.artsort.stkNp==null))){
      this.ChariotWindow=false;
      return this.makeToast3();
      
    }else if(target){
      return this.makeToast6();
    }else if(!this.article.marque || !this.article.model || !this.article.codArt){
      return this.makeToast2();
    } else if(!target){
        this.saveArtsort();
        await this.delay(2500);
        this.prixUpdateBS();
        await this.showModalDialogBarProgression();
        this.makeToast();
        this.ArticleWindow=false;
        this.ChariotWindow=true;
        this.lastAdd=this.lastAdd+1;
        console.log(this.lastAdd);
        this.getListArtSortForChariot();
    }
}

lastAdd:number = 0;
  async onResetArtSortExistForm(){
    await this.getArtSorts();
    if(this.article.marque  && this.article.model &&  this.article.codArt && this.artSortsList){
      var target=this.artSortsList.find(temp=>temp.codArt==this.article.codArt && temp.num_bon_sort==this.bonsort.numBon);
    }
    console.log(target);

    if(!this.article.marque || !this.article.model || !this.article.codArt){
      return this.makeToast2();
    }else if((this.article.marque && this.article.codArt) && (this.artsort.qutStk== 0 || this.artsort.qutStk==null) && (this.artsort.qutStk2 == 0 || this.artsort.qutStk2==null) && (this.artsort.stkGar == 0 || this.artsort.stkGar==null) && (this.artsort.stkIni == 0 || this.artsort.stkIni==null) &&
    (this.artsort.analStk == 0 || this.artsort.analStk==null) && (this.artsort.nbjStk == 0 || this.artsort.nbjStk==null) && (this.artsort.vSstk == 0 || this.artsort.vSstk==null) && (this.artsort.comStk == 0 || this.artsort.comStk==null) &&
     (this.artsort.xanalStk == 0 || this.artsort.xanalStk==null) && (this.artsort.stkAtrsf == 0 || this.artsort.stkAtrsf==null)
     && (this.artsort.stkTrsf == 0 || this.artsort.stkTrsf==null) && (this.artsort.stkReel == 0 || this.artsort.stkReel==null) && (this.artsort.stkRes == 0 || this.artsort.stkRes==null) && (this.artsort.stkNp == 0 || this.artsort.stkNp==null)){
        this.ChariotWindow=false;
        console.log(this.artsort);
        return this.makeToast3();
      } else if(target){
        return this.makeToast6();
      } else if(!target && this.lastAdd!=9){
      await this.saveArtsort();
      await this.delay(700);
      await this.showModalDialogBarProgression();
      this.makeToast();
      this.artsort.qutStk = 0;
      this.artsort.qutStk2 = 0;
      this.artsort.stkGar = 0;
      this.artsort.stkIni = 0;
      this.artsort.analStk = 0;
      this.artsort.nbjStk = 0;
      this.artsort.vSstk = 0;
      this.artsort.comStk = 0;
      this.artsort.xanalStk = 0;
      this.artsort.stkAtrsf = 0;
      this.artsort.stkTrsf = 0;
      this.artsort.stkReel = 0;
      this.artsort.stkRes = 0;
      this.artsort.stkNp = 0;
      this.ArticleWindow=true ;
      this.lastAdd=this.lastAdd+1;
      console.log(this.lastAdd);
    }else if(this.lastAdd==10){
      this.makeToast11();
    }
}

onSubmitBon() {

  var target=this.bonSorts.find(temp=>temp.numBon==this.bonsort.numBon)
  if(target){
    return this.makeToast4();
  }else if(!target){
    console.log(this.bonsort);
    this.saveBonsort();
    this.makeToast();
    delay(1000);
    this.ArticleWindow=true ;
  }else{
    this.makeToast2();
  }
}



/** test verification des input */



ResetForm(){
  this.bonsortService.dataForm.reset();
}
/** end test verification des input*/


/**toaster show start */
config: NbToastrConfig;

index = 1;
destroyByClick = true;
duration = 4000;
hasIcon = true;
position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
preventDuplicates = false;

status: NbComponentStatus = 'success';

title = 'L addition faite avec succée!';
content = `Le Bon de Preparation est ajouter!`;
status2: NbComponentStatus = 'danger';

title2 = 'L addition n est pas faite !!!';
content2 = `Erreur de saisir!`;

status3: NbComponentStatus = 'warning';

title3 = 'L addition n est pas faite stk est vide!';
content3 = `saisir n'est pas comptet!`;

status4: NbComponentStatus = 'warning';

title4 = 'L addition n est pas faite Bon Existe deja!';
content4 = `saisir n'est pas comptet!`;


status5: NbComponentStatus = 'info';

title5 = 'L addition est en cours !';
content5 = `Veuillez attendre le traitement des données!`;

status6: NbComponentStatus = 'warning';

title6 = 'L addition n est pas faite article Existe deja dans ce Bon!';
content6 = `saisir n'est pas comptet!`;


status7: NbComponentStatus = 'warning';

title7 = 'L addition n est pas faite ,Choisir un centre!';
content7 = `saisir n'est pas comptet!`;

status8: NbComponentStatus = 'warning';

title8 = 'L addition n est pas faite ,Choisir un zone!';
content8 = `saisir n'est pas comptet!`;

status9: NbComponentStatus = 'warning';

title9 = 'L addition n est pas faite ,Choisir un preparateur!';
content9 = `saisir n'est pas comptet!`;

status10: NbComponentStatus = 'warning';

title10= 'L addition n est pas faite ,Choisir un chariot!';
content10 = `saisir n'est pas comptet!`;

status11: NbComponentStatus = 'warning';
title11= 'L addition n est pas faite , max nombre des articles est 11 par bon!';
content11 = `saisir n'est pas comptet,clicker sur ajouter dérniére acticle!`;

types: NbComponentStatus[] = [
  'primary',
  'success',
  'info',
  'warning',
  'danger',
];

positions: string[] = [
  NbGlobalPhysicalPosition.TOP_RIGHT,
  NbGlobalPhysicalPosition.TOP_LEFT,
  NbGlobalPhysicalPosition.BOTTOM_LEFT,
  NbGlobalPhysicalPosition.BOTTOM_RIGHT,
  NbGlobalLogicalPosition.TOP_END,
  NbGlobalLogicalPosition.TOP_START,
  NbGlobalLogicalPosition.BOTTOM_END,
  NbGlobalLogicalPosition.BOTTOM_START,
];

makeToast() {
  this.showToast(this.status, this.title, this.content);
}

makeToast2() {
  this.showToast(this.status2, this.title2, this.content2);
}
makeToast3() {
  this.showToast(this.status3, this.title3, this.content3);
}
makeToast4() {
  this.showToast(this.status4, this.title4, this.content4);
}
makeToast5() {
  this.showToast(this.status5, this.title5, this.content5);
}
makeToast6() {
  this.showToast(this.status6, this.title6, this.content6);
}
makeToast7() {
  this.showToast(this.status7, this.title7, this.content7);
}
makeToast8() {
  this.showToast(this.status8, this.title8, this.content8);
}
makeToast9() {
  this.showToast(this.status9, this.title9, this.content9);
}
makeToast10() {
  this.showToast(this.status10, this.title10, this.content10);
}
makeToast11() {
  this.showToast(this.status11, this.title11, this.content11);
}
private showToast(type: NbComponentStatus, title: string, body: string) {
  const config = {
    status: type,
    destroyByClick: this.destroyByClick,
    duration: this.duration,
    hasIcon: this.hasIcon,
    position: this.position,
    preventDuplicates: this.preventDuplicates,
  };
  const titleContent = title ? `. ${title}` : '';

  this.index += 1;
  this.toastrService.show(
    body,
    `Notif ${this.index}${titleContent}`,
    config);
}

/**toaster show start */


/** progression bar */

progress=0;
displayModalBarProgression: boolean;
  async showModalDialogBarProgression() {
  this.progress=0;
  this.displayModalBarProgression = true;
  this.makeToast5();
  await this.delay(500);
  this.progress=15;
  await this.delay(500);
  this.progress=37;
  await this.delay(1000);
  this.progress=62;
  await this.delay(1000);
  this.progress=87;
  await this.delay(1000);
  this.progress=99;
  await this.delay(500);
  this.progress=100;
  this.delay(1500);
  this.displayModalBarProgression=false;
}


/**end progression bar */
MarqueArticleList: String[];
ArticleListWithMarque: Article[];
StockListWithArticle: any[] = [];
ModelFromMarque:Model[];
/** add drop lists */
public getArticleOfAdd() {
  console.log("option 1");
  this.bonsortService.getArticleOfAddForBonSort().subscribe(data => {
    this.ArticleList = data;
  });
}
public getArticleFromStockBS(itemsArticle :any) {  
  console.log("option 2");
  if(itemsArticle && itemsArticle!='0'){
    this.bonsortService.getArticleFromStockBS(itemsArticle).subscribe(data => {
      this.StockListWithArticle = data;
      console.log(this.StockListWithArticle);
    });

    this.articleService.getArticle(itemsArticle).subscribe(data => {
      this.ArticleGeted = data;
      console.log(this.ArticleGeted);
    });
  }
}
public getArticleOfFromMarqueAddForBonSort(itemsModel :any) {
  console.log(itemsModel);
  if(itemsModel!=0){
    this.bonlivService.getArticleOfFromMarqueAddForBonLiv(itemsModel.id).subscribe(data => {
      this.ArticleListWithMarque = data;
      console.log(this.ArticleListWithMarque);
      });
    }
}
public getAllMarquesList() {
  this.marqueService.getMarquesList().subscribe(data => {
    this.MarqueList = data;
    console.log(this.MarqueList);
  });
}
public getModeleFromMarque(itemsMarquee :any) {

  if(itemsMarquee){ 
    this.articleService.getAllModelByMarque(itemsMarquee.id).subscribe(data => {
      this.ModelFromMarque = data;
      console.log(data);
    });
  }
  }
private getFournisOfAdd() {
  this.bonsortService.getFournisOfAdd().subscribe(data => {
    this.FournisList = data;
  });
}

/** add drop lists */

/** */


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
  this.windowService.open(WindowTypeStockComponent, { title: `type de Stock` });
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
/**end popap */

/**Show image article */
galery: any;
togglepreviewPhotoArticle(){
  this.previewPhotoArticle = !this.previewPhotoArticle;
}
togglepreviewPhotoAllArticle(){
  this.previewPhotoAllArticle = !this.previewPhotoAllArticle;
  console.log("bbbb")
}
/** end Show image article */


  //function to return list of numbers from 0 to n-1 
  qutStk:number;
  counter(i: number) {
    return new Array(i);

}


/** add of a chariot to the bon sortie */
chariot: Chariot = new Chariot();
ChariotArticleForm: FormGroup;
ListArtSortForChariot: Art_Sort[];
PreparateurList0: Utilisateur[];
ChariotList: Chariot[];
ArticlesPrep: Article = new Article();
ZoneArticle0: string[];
ChariotWindow: boolean;
centerAdd0:any;
SelectZoneChoix0:any;
preparateurAdd0:any;
numCharAdd0:any;

public getListArtSortForChariot() {
  this.bonsortService.getArtSortForBonSort(this.bonsort.numBon).subscribe(data => {
    this.ListArtSortForChariot = data;
    console.log(this.ListArtSortForChariot);
  });
}
public getListChariot() {
  this.chariotService.getChariotsList().subscribe(data => {
    this.ChariotList = data;
    console.log(this.ChariotList);
  });
}

isDisabled0:boolean=true;
ArticlesSort;
SnumCharAdd0;



/**TEST TA3 LES LISTE ADD F LE5ER */

public getZoneArticleByCentre0(SelectCentreChoix:any,codArt:any) {
  this.articleService.getZoneArticle(SelectCentreChoix,codArt).subscribe(data => {
    this.ZoneArticle0= data;
    console.log(this.ZoneArticle0)
  });
}
public getAllPreparateur0(iteamZone:any) {
  console.log('option last4')
  this.utilisateurService.getUtilisateursList().subscribe(data => {
    this.PreparateurList0 = data.filter(temp=>temp.roles[0].name=="ROLE_PREPARATEUR" && temp.zone==iteamZone);
    console.log(this.PreparateurList0);
  });
}

NbrTest0:number=0;


public CentreSwitchDisable_0(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest0<4){
    this.NbrTest0=this.NbrTest0+1;
  }
  if(this.NbrTest0==4 && this.ZoneArticle0!=[] && this.PreparateurList0!=[]){
    this.isDisabled0 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest0>0){
    this.NbrTest0=this.NbrTest0-1;
    this.isDisabled0 = true;
  }
  console.log('test0'+this.NbrTest0);
}
public ZoneSwitchDisable_0(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest0<4){
    this.NbrTest0=this.NbrTest0+1;
  }
  if(this.NbrTest0==4 && this.ZoneArticle0!=[] && this.PreparateurList0!=[]){
    this.isDisabled0 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest0>0){
    this.NbrTest0=this.NbrTest0-1;
    this.isDisabled0 = true;
  }
  console.log('test0'+this.NbrTest0);
}
public PrepSwitchDisable_0(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest0<4){
    this.NbrTest0=this.NbrTest0+1;
  }  
  if(this.NbrTest0==4 && this.ZoneArticle0!=[] && this.PreparateurList0!=[]){
    this.isDisabled0 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest0>0){
    this.NbrTest0=this.NbrTest0-1;
    this.isDisabled0 = true;
  }
  console.log('test0'+this.NbrTest0);
}
public CharSwitchDisable_0(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest0<4){
    this.NbrTest0=this.NbrTest0+1;
  }
  if(this.NbrTest0==4 && this.ZoneArticle0!=[] && this.PreparateurList0!=[]){
    this.isDisabled0 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest0>0){
    this.NbrTest0=this.NbrTest0-1;
    this.isDisabled0 = true;
  }
  console.log('test0'+this.NbrTest0);
}

public TestValider0(event:any,SnumCharAdd0:any,preparateurAdd0:any,SelectZoneChoix0:any,centerAdd0:any){
  console.log(event);
  console.log(SnumCharAdd0);
  console.log(preparateurAdd0);
  console.log(SelectZoneChoix0);
  console.log(centerAdd0);
  if(!this.centerAdd0 || this.centerAdd0==null){
    this.makeToast7();
  }else if(!this.ZoneArticle0){
    this.makeToast8();
  }else if(!this.preparateurAdd0 || this.preparateurAdd0==null){
    this.makeToast9();
  }else if(!this.SnumCharAdd0 || this.SnumCharAdd0==null){
    this.makeToast10();
  }else{
    this.isDisabled0 = !this.isDisabled0;
    console.log(this.artsort);
    console.log(event);
    console.log(this.preparateurAdd0);
    console.log(this.SnumCharAdd0);
    console.log(this.centerAdd0);
    this.artsort.preparateur=this.preparateurAdd0;
    this.artsort.chariot=this.SnumCharAdd0;
    this.artsort.centre=this.centerAdd0;
    this.bonsortService.UpdateArtSort(event,this.artsort).subscribe(data => {
      this.artsort.preparateur=this.preparateurAdd0;
      this.artsort.chariot=this.SnumCharAdd0;
      this.artsort.centre=this.centerAdd0;
      console.log(data);
    }, error => console.log(error));
  }
}
/** end liste 0  Fil chariot window   ( ) */
/** liste 1  Fil chariot window   ( ) */

PreparateurList1: Utilisateur[];
ZoneArticle1: string[];
public getZoneArticleByCentre1(SelectCentreChoix:any,codArt:any) {
  this.articleService.getZoneArticle(SelectCentreChoix,codArt).subscribe(data => {
    this.ZoneArticle1= data;
    console.log(this.ZoneArticle1)
  });
}
public getAllPreparateur1(iteamZone:any) {
  console.log('option last4')
  this.utilisateurService.getUtilisateursList().subscribe(data => {
    this.PreparateurList1 = data.filter(temp=>temp.roles[0].name=="ROLE_PREPARATEUR" && temp.zone==iteamZone);
    console.log(this.PreparateurList1);
  });
}

centerAdd1:any;
SelectZoneChoix1:any;
preparateurAdd1:any;
numCharAdd1:any;

NbrTest1:number=0;
isDisabled1:boolean=true;

SnumCharAdd1;
public CentreSwitchDisable_1(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest1<4){
    this.NbrTest1=this.NbrTest1+1;
  }
  if(this.NbrTest1==4 && this.ZoneArticle1!=[] && this.PreparateurList1!=[]){
    this.isDisabled1 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest1>0){
    this.NbrTest1=this.NbrTest1-1;
    this.isDisabled1 = true;
  }
  console.log('test1'+this.NbrTest1);
}
public ZoneSwitchDisable_1(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest1<4){
    this.NbrTest1=this.NbrTest1+1;
  }
  if(this.NbrTest1==4 && this.ZoneArticle1!=[] && this.PreparateurList1!=[]){
    this.isDisabled1 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest1>0){
    this.NbrTest1=this.NbrTest1-1;
    this.isDisabled1 = true;
  }
  console.log('test1'+this.NbrTest1);
}
public PrepSwitchDisable_1(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest1<4){
    this.NbrTest1=this.NbrTest1+1;
  }  
  if(this.NbrTest1==4 && this.ZoneArticle1!=[] && this.PreparateurList1!=[]){
    this.isDisabled1 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest1>0){
    this.NbrTest1=this.NbrTest1-1;
    this.isDisabled1 = true;
  }
  console.log('test1'+this.NbrTest1);
}
public CharSwitchDisable_1(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest1<4){
    this.NbrTest1=this.NbrTest1+1;
  }
  if(this.NbrTest1==4 && this.ZoneArticle1!=[] && this.PreparateurList1!=[]){
    this.isDisabled1 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest1>0){
    this.NbrTest1=this.NbrTest1-1;
    this.isDisabled1 = true;
  }
  console.log('test1'+this.NbrTest1);
}
public TestValider1(event:any,SnumCharAdd1:any,preparateurAdd1:any,SelectZoneChoix1:any,centerAdd1:any){
  console.log(event);
  console.log(SnumCharAdd1);
  console.log(preparateurAdd1);
  console.log(SelectZoneChoix1);
  console.log(centerAdd1);
  if(!this.centerAdd1 || this.centerAdd1==null){
    this.makeToast7();
  }else if(!this.ZoneArticle1){
    this.makeToast8();
  }else if(!this.preparateurAdd1 || this.preparateurAdd1==null){
    this.makeToast9();
  }else if(!this.SnumCharAdd1 || this.SnumCharAdd1==null){
    this.makeToast10();
  }else{
    console.log(this.artsort);
    console.log(event);
    console.log(this.preparateurAdd1);
    console.log(this.SnumCharAdd1);
    console.log(this.centerAdd1);
    this.artsort.preparateur=this.preparateurAdd1;
    this.artsort.chariot=this.SnumCharAdd1;
    this.artsort.centre=this.centerAdd1;
    this.bonsortService.UpdateArtSort(event,this.artsort).subscribe(data => {
      this.artsort.preparateur=this.preparateurAdd1;
      this.artsort.chariot=this.SnumCharAdd1;
      this.artsort.centre=this.centerAdd1;
      console.log(data);
    }, error => console.log(error));
    this.isDisabled1 = !this.isDisabled1;
  }
}

/** end liste 1  Fil chariot window   ( ) */

/** liste 2  Fil chariot window   ( ) */

PreparateurList2: Utilisateur[];
ZoneArticle2: string[];
public getZoneArticleByCentre2(SelectCentreChoix:any,codArt:any) {
  this.articleService.getZoneArticle(SelectCentreChoix,codArt).subscribe(data => {
    this.ZoneArticle2= data;
    console.log(this.ZoneArticle2)
  });
}
public getAllPreparateur2(iteamZone:any) {
  console.log('option last4')
  this.utilisateurService.getUtilisateursList().subscribe(data => {
    this.PreparateurList2 = data.filter(temp=>temp.roles[0].name=="ROLE_PREPARATEUR" && temp.zone==iteamZone);
    console.log(this.PreparateurList2);
  });
}
centerAdd2:any;
SelectZoneChoix2:any;
preparateurAdd2:any;
numCharAdd2:any;

NbrTest2:number= 0;
isDisabled2:boolean=true;

SnumCharAdd2;
public CentreSwitchDisable_2(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest2<4){
    this.NbrTest2=this.NbrTest2+1;
  }
  if(this.NbrTest2==4){
    this.isDisabled2 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest2>0){
    this.NbrTest2=this.NbrTest2-1;
    this.isDisabled2 = true;
  }
  console.log('test2'+this.NbrTest2);
}
public ZoneSwitchDisable_2(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest2<4){
    this.NbrTest2=this.NbrTest2+1;
  }
  if(this.NbrTest2==4){
    this.isDisabled2 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest2>0){
    this.NbrTest2=this.NbrTest2-1;
    this.isDisabled2 = true;
  }
  console.log('test2'+this.NbrTest2);
}
public PrepSwitchDisable_2(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest2<4){
    this.NbrTest2=this.NbrTest2+1;
  }  
  if(this.NbrTest2==4){
    this.isDisabled2 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest2>0){
    this.NbrTest2=this.NbrTest2-1;
    this.isDisabled2 = true;
  }
  console.log('test2'+this.NbrTest2);
}
public CharSwitchDisable_2(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest2<4){
    this.NbrTest2=this.NbrTest2+1;
  }
  if(this.NbrTest2==4){
    this.isDisabled2 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest2>0){
    this.NbrTest2=this.NbrTest2-1;
    this.isDisabled2 = true;
  }
  console.log('test2'+this.NbrTest2);
}
public TestValider2(event:any,SnumCharAdd2:any,preparateurAdd2:any,SelectZoneChoix2:any,centerAdd2:any){
  console.log(event);
  console.log(SnumCharAdd2);
  console.log(preparateurAdd2);
  console.log(SelectZoneChoix2);
  console.log(centerAdd2);
  if(!this.centerAdd2 || this.centerAdd2==null){
    this.makeToast7();
  }else if(!this.ZoneArticle2){
    this.makeToast8();
  }else if(!this.preparateurAdd2 || this.preparateurAdd2==null){
    this.makeToast9();
  }else if(!this.SnumCharAdd2 || this.SnumCharAdd2==null){
    this.makeToast10();
  }else{
    console.log(this.artsort);
    console.log(event);
    console.log(this.preparateurAdd2);
    console.log(this.SnumCharAdd2);
    console.log(this.centerAdd2);
    this.artsort.preparateur=this.preparateurAdd2;
    this.artsort.chariot=this.SnumCharAdd2;
    this.artsort.centre=this.centerAdd2;
    this.bonsortService.UpdateArtSort(event,this.artsort).subscribe(data => {
      this.artsort.preparateur=this.preparateurAdd2;
      this.artsort.chariot=this.SnumCharAdd2;
      this.artsort.centre=this.centerAdd2;
      console.log(data);
    }, error => console.log(error));
    this.isDisabled2 = !this.isDisabled2;
  }
}

/** end liste 2  Fil chariot window   ( ) */

/** liste 3  Fil chariot window   ( ) */

PreparateurList3: Utilisateur[];
ZoneArticle3: string[];
public getZoneArticleByCentre3(SelectCentreChoix:any,codArt:any) {
  this.articleService.getZoneArticle(SelectCentreChoix,codArt).subscribe(data => {
    this.ZoneArticle3= data;
    console.log(this.ZoneArticle3)
  });
}
public getAllPreparateur3(iteamZone:any) {
  console.log('option last4')
  this.utilisateurService.getUtilisateursList().subscribe(data => {
    this.PreparateurList3 = data.filter(temp=>temp.roles[0].name=="ROLE_PREPARATEUR" && temp.zone==iteamZone);
    console.log(this.PreparateurList3);
  });
}
centerAdd3:any;
SelectZoneChoix3:any;
preparateurAdd3:any;
numCharAdd3:any;

NbrTest3:number = 0;
isDisabled3:boolean=true;

SnumCharAdd3;
public CentreSwitchDisable_3(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest3<4){
    this.NbrTest3=this.NbrTest3+1;
  }
  if(this.NbrTest3==4){
    this.isDisabled3 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest3>0){
    this.NbrTest3=this.NbrTest3-1;
    this.isDisabled3 = true;
  }
  console.log('test3'+this.NbrTest3);
}
public ZoneSwitchDisable_3(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest3<4){
    this.NbrTest3=this.NbrTest3+1;
  }
  if(this.NbrTest3==4){
    this.isDisabled3 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest3>0){
    this.NbrTest3=this.NbrTest3-1;
    this.isDisabled3 = true;
  }
  console.log('test3'+this.NbrTest3);
}
public PrepSwitchDisable_3(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest3<4){
    this.NbrTest3=this.NbrTest3+1;
  }  
  if(this.NbrTest3==4){
    this.isDisabled3 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest3>0){
    this.NbrTest3=this.NbrTest3-1;
    this.isDisabled3 = true;
  }
  console.log('test3'+this.NbrTest3);
}
public CharSwitchDisable_3(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest3<4){
    this.NbrTest3=this.NbrTest3+1;
  }
  if(this.NbrTest3==4){
    this.isDisabled3 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest3>0){
    this.NbrTest3=this.NbrTest3-1;
    this.isDisabled3 = true;
  }
  console.log('test3'+this.NbrTest3);
}
public TestValider3(event:any,SnumCharAdd3:any,preparateurAdd3:any,SelectZoneChoix3:any,centerAdd3:any){
  console.log(event);
  console.log(SnumCharAdd3);
  console.log(preparateurAdd3);
  console.log(SelectZoneChoix3);
  console.log(centerAdd3);
  if(!this.centerAdd3 || this.centerAdd3==null){
    this.makeToast7();
  }else if(!this.ZoneArticle3){
    this.makeToast8();
  }else if(!this.preparateurAdd3 || this.preparateurAdd3==null){
    this.makeToast9();
  }else if(!this.SnumCharAdd3 || this.SnumCharAdd3==null){
    this.makeToast10();
  }else{
    console.log(this.artsort);
    console.log(event);
    console.log(this.preparateurAdd3);
    console.log(this.SnumCharAdd3);
    console.log(this.centerAdd3);
    this.artsort.preparateur=this.preparateurAdd3;
    this.artsort.chariot=this.SnumCharAdd3;
    this.artsort.centre=this.centerAdd3;
    this.bonsortService.UpdateArtSort(event,this.artsort).subscribe(data => {
      this.artsort.preparateur=this.preparateurAdd3;
      this.artsort.chariot=this.SnumCharAdd3;
      this.artsort.centre=this.centerAdd3;
      console.log(data);
    }, error => console.log(error));
    this.isDisabled3 = !this.isDisabled3;
  }
}

/** end liste 3  Fil chariot window   ( ) */
/** liste 4  Fil chariot window   ( ) */

PreparateurList4: Utilisateur[];
ZoneArticle4: string[];
public getZoneArticleByCentre4(SelectCentreChoix:any,codArt:any) {
  this.articleService.getZoneArticle(SelectCentreChoix,codArt).subscribe(data => {
    this.ZoneArticle4= data;
  });
}
public getAllPreparateur4(iteamZone:any) {
  console.log('option last4')
  this.utilisateurService.getUtilisateursList().subscribe(data => {
    this.PreparateurList4 = data.filter(temp=>temp.roles[0].name=="ROLE_PREPARATEUR" && temp.zone==iteamZone);
  });
}
centerAdd4:any;
SelectZoneChoix4:any;
preparateurAdd4:any;
numCharAdd4:any;

NbrTest4:number = 0;
isDisabled4:boolean=true;

SnumCharAdd4;
public CentreSwitchDisable_4(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest4<4){
    this.NbrTest4=this.NbrTest4+1;
  }
  if(this.NbrTest4==4){
    this.isDisabled4 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest4>0){
    this.NbrTest4=this.NbrTest4-1;
    this.isDisabled4 = true;
  }
  console.log('test4'+this.NbrTest4);
}
public ZoneSwitchDisable_4(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest4<4){
    this.NbrTest4=this.NbrTest4+1;
  }
  if(this.NbrTest4==4){
    this.isDisabled4 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest4>0){
    this.NbrTest4=this.NbrTest4-1;
    this.isDisabled4 = true;
  }
  console.log('test4'+this.NbrTest4);
}
public PrepSwitchDisable_4(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest4<4){
    this.NbrTest4=this.NbrTest4+1;
  }  
  if(this.NbrTest4==4){
    this.isDisabled4 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest4>0){
    this.NbrTest4=this.NbrTest4-1;
    this.isDisabled4 = true;
  }
  console.log('test4'+this.NbrTest4);
}
public CharSwitchDisable_4(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest4<4){
    this.NbrTest4=this.NbrTest4+1;
  }
  if(this.NbrTest4==4){
    this.isDisabled4 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest4>0){
    this.NbrTest4=this.NbrTest4-1;
    this.isDisabled4 = true;
  }
  console.log('test4'+this.NbrTest4);
}
public TestValider4(event:any,SnumCharAdd4:any,preparateurAdd4:any,SelectZoneChoix4:any,centerAdd4:any){
  console.log(event);
  console.log(SnumCharAdd4);
  console.log(preparateurAdd4);
  console.log(SelectZoneChoix4);
  console.log(centerAdd4);
  if(!this.centerAdd4 || this.centerAdd4==null){
    this.makeToast7();
  }else if(!this.ZoneArticle4){
    this.makeToast8();
  }else if(!this.preparateurAdd4 || this.preparateurAdd4==null){
    this.makeToast9();
  }else if(!this.SnumCharAdd4 || this.SnumCharAdd4==null){
    this.makeToast10();
  }else{
    console.log(this.artsort);
    console.log(event);
    console.log(this.preparateurAdd4);
    console.log(this.SnumCharAdd4);
    console.log(this.centerAdd4);
    this.artsort.preparateur=this.preparateurAdd4;
    this.artsort.chariot=this.SnumCharAdd4;
    this.artsort.centre=this.centerAdd4;
    this.bonsortService.UpdateArtSort(event,this.artsort).subscribe(data => {
      this.artsort.preparateur=this.preparateurAdd4;
      this.artsort.chariot=this.SnumCharAdd4;
      this.artsort.centre=this.centerAdd4;
      console.log(data);
    }, error => console.log(error));
    this.isDisabled4 = !this.isDisabled4;
  }
}

/** end liste 4  Fil chariot window   ( ) */

/** liste 5  Fil chariot window   ( ) */

PreparateurList5: Utilisateur[];
ZoneArticle5: string[];
public getZoneArticleByCentre5(SelectCentreChoix:any,codArt:any) {
  this.articleService.getZoneArticle(SelectCentreChoix,codArt).subscribe(data => {
    this.ZoneArticle5= data;
  });
}
public getAllPreparateur5(iteamZone:any) {
  console.log('option last4')
  this.utilisateurService.getUtilisateursList().subscribe(data => {
    this.PreparateurList5 = data.filter(temp=>temp.roles[0].name=="ROLE_PREPARATEUR" && temp.zone==iteamZone);
  });
}
centerAdd5:any;
SelectZoneChoix5:any;
preparateurAdd5:any;
numCharAdd5:any;

NbrTest5:number = 0;
isDisabled5:boolean=true;

SnumCharAdd5;
public CentreSwitchDisable_5(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest5<4){
    this.NbrTest5=this.NbrTest5+1;
  }
  if(this.NbrTest5==4){
    this.isDisabled5 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest5>0){
    this.NbrTest5=this.NbrTest5-1;
    this.isDisabled5 = true;
  }
  console.log('test5'+this.NbrTest5);
}
public ZoneSwitchDisable_5(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest5<4){
    this.NbrTest5=this.NbrTest5+1;
  }
  if(this.NbrTest5==4){
    this.isDisabled5 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest5>0){
    this.NbrTest5=this.NbrTest5-1;
    this.isDisabled5 = true;
  }
  console.log('test5'+this.NbrTest5);
}
public PrepSwitchDisable_5(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest5<4){
    this.NbrTest5=this.NbrTest5+1;
  }  
  if(this.NbrTest5==4){
    this.isDisabled5 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest5>0){
    this.NbrTest5=this.NbrTest5-1;
    this.isDisabled5 = true;
  }
  console.log('test5'+this.NbrTest5);
}
public CharSwitchDisable_5(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest5<4){
    this.NbrTest5=this.NbrTest5+1;
  }
  if(this.NbrTest5==4){
    this.isDisabled5 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest5>0){
    this.NbrTest5=this.NbrTest5-1;
    this.isDisabled5 = true;
  }
  console.log('test5'+this.NbrTest5);
}
public TestValider5(event:any,SnumCharAdd5:any,preparateurAdd5:any,SelectZoneChoix5:any,centerAdd5:any){
  console.log(event);
  console.log(SnumCharAdd5);
  console.log(preparateurAdd5);
  console.log(SelectZoneChoix5);
  console.log(centerAdd5);
  if(!this.centerAdd5 || this.centerAdd5==null){
    this.makeToast7();
  }else if(!this.ZoneArticle5){
    this.makeToast8();
  }else if(!this.preparateurAdd5 || this.preparateurAdd5==null){
    this.makeToast9();
  }else if(!this.SnumCharAdd5 || this.SnumCharAdd5==null){
    this.makeToast10();
  }else{
    console.log(this.artsort);
    console.log(event);
    console.log(this.preparateurAdd5);
    console.log(this.SnumCharAdd5);
    console.log(this.centerAdd5);
    this.artsort.preparateur=this.preparateurAdd5;
    this.artsort.chariot=this.SnumCharAdd5;
    this.artsort.centre=this.centerAdd5;
    this.bonsortService.UpdateArtSort(event,this.artsort).subscribe(data => {
      this.artsort.preparateur=this.preparateurAdd5;
      this.artsort.chariot=this.SnumCharAdd5;
      this.artsort.centre=this.centerAdd5;
      console.log(data);
    }, error => console.log(error));
    this.isDisabled5 = !this.isDisabled5;
  }
}

/** end liste 5  Fil chariot window   ( ) */
/** liste 6  Fil chariot window   ( ) */

PreparateurList6: Utilisateur[];
ZoneArticle6: string[];
public getZoneArticleByCentre6(SelectCentreChoix:any,codArt:any) {
  this.articleService.getZoneArticle(SelectCentreChoix,codArt).subscribe(data => {
    this.ZoneArticle6= data;
  });
}
public getAllPreparateur6(iteamZone:any) {
  console.log('option last4')
  this.utilisateurService.getUtilisateursList().subscribe(data => {
    this.PreparateurList6 = data.filter(temp=>temp.roles[0].name=="ROLE_PREPARATEUR" && temp.zone==iteamZone);
  });
}
centerAdd6:any;
SelectZoneChoix6:any;
preparateurAdd6:any;
numCharAdd6:any;

NbrTest6:number = 0;
isDisabled6:boolean=true;

SnumCharAdd6;
public CentreSwitchDisable_6(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest6<4){
    this.NbrTest6=this.NbrTest6+1;
  }
  if(this.NbrTest6==4){
    this.isDisabled6 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest6>0){
    this.NbrTest6=this.NbrTest6-1;
    this.isDisabled6 = true;
  }
  console.log('test6'+this.NbrTest6);
}
public ZoneSwitchDisable_6(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest6<4){
    this.NbrTest6=this.NbrTest6+1;
  }
  if(this.NbrTest6==4){
    this.isDisabled6 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest6>0){
    this.NbrTest6=this.NbrTest6-1;
    this.isDisabled6 = true;
  }
  console.log('test6'+this.NbrTest6);
}
public PrepSwitchDisable_6(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest6<4){
    this.NbrTest6=this.NbrTest6+1;
  }  
  if(this.NbrTest6==4){
    this.isDisabled6 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest6>0){
    this.NbrTest6=this.NbrTest6-1;
    this.isDisabled6 = true;
  }
  console.log('test6'+this.NbrTest6);
}
public CharSwitchDisable_6(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest6<4){
    this.NbrTest6=this.NbrTest6+1;
  }
  if(this.NbrTest6==4){
    this.isDisabled6 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest6>0){
    this.NbrTest6=this.NbrTest6-1;
    this.isDisabled6 = true;
  }
  console.log('test6'+this.NbrTest6);
}
public TestValider6(event:any,SnumCharAdd6:any,preparateurAdd6:any,SelectZoneChoix6:any,centerAdd6:any){
  console.log(event);
  console.log(SnumCharAdd6);
  console.log(preparateurAdd6);
  console.log(SelectZoneChoix6);
  console.log(centerAdd6);
  if(!this.centerAdd6 || this.centerAdd6==null){
    this.makeToast7();
  }else if(!this.ZoneArticle6){
    this.makeToast8();
  }else if(!this.preparateurAdd6 || this.preparateurAdd6==null){
    this.makeToast9();
  }else if(!this.SnumCharAdd6 || this.SnumCharAdd6==null){
    this.makeToast10();
  }else{
    console.log(this.artsort);
    console.log(event);
    console.log(this.preparateurAdd6);
    console.log(this.SnumCharAdd6);
    console.log(this.centerAdd6);
    this.artsort.preparateur=this.preparateurAdd6;
    this.artsort.chariot=this.SnumCharAdd6;
    this.artsort.centre=this.centerAdd6;
    this.bonsortService.UpdateArtSort(event,this.artsort).subscribe(data => {
      this.artsort.preparateur=this.preparateurAdd6;
      this.artsort.chariot=this.SnumCharAdd6;
      this.artsort.centre=this.centerAdd6;
      console.log(data);
    }, error => console.log(error));
    this.isDisabled6 = !this.isDisabled6;
  }
}

/** end liste 6  Fil chariot window   ( ) */

/** liste 6  Fil chariot window   ( ) */

PreparateurList7: Utilisateur[];
ZoneArticle7: string[];
public getZoneArticleByCentre7(SelectCentreChoix:any,codArt:any) {
  this.articleService.getZoneArticle(SelectCentreChoix,codArt).subscribe(data => {
    this.ZoneArticle7= data;
  });
}
public getAllPreparateur7(iteamZone:any) {
  console.log('option last4')
  this.utilisateurService.getUtilisateursList().subscribe(data => {
    this.PreparateurList7 = data.filter(temp=>temp.roles[0].name=="ROLE_PREPARATEUR" && temp.zone==iteamZone);
  });
}
centerAdd7:any;
SelectZoneChoix7:any;
preparateurAdd7:any;
numCharAdd7:any;

NbrTest7:number = 0;
isDisabled7:boolean=true;

SnumCharAdd7;
public CentreSwitchDisable_7(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest7<4){
    this.NbrTest7=this.NbrTest7+1;
  }
  if(this.NbrTest7==4){
    this.isDisabled7 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest7>0){
    this.NbrTest7=this.NbrTest7-1;
    this.isDisabled7 = true;
  }
  console.log('test7'+this.NbrTest7);
}
public ZoneSwitchDisable_7(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest7<4){
    this.NbrTest7=this.NbrTest7+1;
  }
  if(this.NbrTest7==4){
    this.isDisabled7 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest7>0){
    this.NbrTest7=this.NbrTest7-1;
    this.isDisabled7 = true;
  }
  console.log('test7'+this.NbrTest7);
}
public PrepSwitchDisable_7(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest7<4){
    this.NbrTest7=this.NbrTest7+1;
  }  
  if(this.NbrTest7==4){
    this.isDisabled7 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest7>0){
    this.NbrTest7=this.NbrTest7-1;
    this.isDisabled7 = true;
  }
  console.log('test7'+this.NbrTest7);
}
public CharSwitchDisable_7(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest7<4){
    this.NbrTest7=this.NbrTest7+1;
  }
  if(this.NbrTest7==4){
    this.isDisabled7 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest7>0){
    this.NbrTest7=this.NbrTest7-1;
    this.isDisabled7 = true;
  }
  console.log('test7'+this.NbrTest7);
}
public TestValider7(event:any,SnumCharAdd7:any,preparateurAdd7:any,SelectZoneChoix7:any,centerAdd7:any){
  console.log(event);
  console.log(SnumCharAdd7);
  console.log(preparateurAdd7);
  console.log(SelectZoneChoix7);
  console.log(centerAdd7);
  if(!this.centerAdd7 || this.centerAdd7==null){
    this.makeToast7();
  }else if(!this.ZoneArticle7){
    this.makeToast8();
  }else if(!this.preparateurAdd7 || this.preparateurAdd7==null){
    this.makeToast9();
  }else if(!this.SnumCharAdd7 || this.SnumCharAdd7==null){
    this.makeToast10();
  }else{
    console.log(this.artsort);
    console.log(event);
    console.log(this.preparateurAdd7);
    console.log(this.SnumCharAdd7);
    console.log(this.centerAdd7);
    this.artsort.preparateur=this.preparateurAdd7;
    this.artsort.chariot=this.SnumCharAdd7;
    this.artsort.centre=this.centerAdd7;
    this.bonsortService.UpdateArtSort(event,this.artsort).subscribe(data => {
      this.artsort.preparateur=this.preparateurAdd7;
      this.artsort.chariot=this.SnumCharAdd7;
      this.artsort.centre=this.centerAdd7;
      console.log(data);
    }, error => console.log(error));
    this.isDisabled7 = !this.isDisabled7;
  }
}

/** end liste 7  Fil chariot window   ( ) */

/** liste 8  Fil chariot window   ( ) */

PreparateurList8: Utilisateur[];
ZoneArticle8: string[];
public getZoneArticleByCentre8(SelectCentreChoix:any,codArt:any) {
  this.articleService.getZoneArticle(SelectCentreChoix,codArt).subscribe(data => {
    this.ZoneArticle8= data;
  });
}
public getAllPreparateur8(iteamZone:any) {
  console.log('option last4')
  this.utilisateurService.getUtilisateursList().subscribe(data => {
    this.PreparateurList8 = data.filter(temp=>temp.roles[0].name=="ROLE_PREPARATEUR" && temp.zone==iteamZone);
  });
}
centerAdd8:any;
SelectZoneChoix8:any;
preparateurAdd8:any;
numCharAdd8:any;

NbrTest8:number = 0;
isDisabled8:boolean=true;

SnumCharAdd8;
public CentreSwitchDisable_8(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest8<4){
    this.NbrTest8=this.NbrTest8+1;
  }
  if(this.NbrTest8==4){
    this.isDisabled8 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest8>0){
    this.NbrTest8=this.NbrTest8-1;
    this.isDisabled8 = true;
  }
  console.log('test8'+this.NbrTest8);
}
public ZoneSwitchDisable_8(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest8<4){
    this.NbrTest8=this.NbrTest8+1;
  }
  if(this.NbrTest8==4){
    this.isDisabled8 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest8>0){
    this.NbrTest8=this.NbrTest8-1;
    this.isDisabled8 = true;
  }
  console.log('test8'+this.NbrTest8);
}
public PrepSwitchDisable_8(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest8<4){
    this.NbrTest8=this.NbrTest8+1;
  }  
  if(this.NbrTest8==4){
    this.isDisabled8 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest8>0){
    this.NbrTest8=this.NbrTest8-1;
    this.isDisabled8 = true;
  }
  console.log('test8'+this.NbrTest8);
}
public CharSwitchDisable_8(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest8<4){
    this.NbrTest8=this.NbrTest8+1;
  }
  if(this.NbrTest8==4){
    this.isDisabled8 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest8>0){
    this.NbrTest8=this.NbrTest8-1;
    this.isDisabled8 = true;
  }
  console.log('test8'+this.NbrTest8);
}
public TestValider8(event:any,SnumCharAdd8:any,preparateurAdd8:any,SelectZoneChoix8:any,centerAdd8:any){
  console.log(event);
  console.log(SnumCharAdd8);
  console.log(preparateurAdd8);
  console.log(SelectZoneChoix8);
  console.log(centerAdd8);
  if(!this.centerAdd8 || this.centerAdd8==null){
    this.makeToast7();
  }else if(!this.ZoneArticle8){
    this.makeToast8();
  }else if(!this.preparateurAdd8 || this.preparateurAdd8==null){
    this.makeToast9();
  }else if(!this.SnumCharAdd8 || this.SnumCharAdd8==null){
    this.makeToast10();
  }else{
    console.log(this.artsort);
    console.log(event);
    console.log(this.preparateurAdd8);
    console.log(this.SnumCharAdd8);
    console.log(this.centerAdd8);
    this.artsort.preparateur=this.preparateurAdd8;
    this.artsort.chariot=this.SnumCharAdd8;
    this.artsort.centre=this.centerAdd8;
    this.bonsortService.UpdateArtSort(event,this.artsort).subscribe(data => {
      this.artsort.preparateur=this.preparateurAdd8;
      this.artsort.chariot=this.SnumCharAdd8;
      this.artsort.centre=this.centerAdd8;
      console.log(data);
    }, error => console.log(error));
    this.isDisabled8 = !this.isDisabled8;
  }
}

/** end liste 8  Fil chariot window   ( ) */
/** liste 9  Fil chariot window   ( ) */

PreparateurList9: Utilisateur[];
ZoneArticle9: string[];
public getZoneArticleByCentre9(SelectCentreChoix:any,codArt:any) {
  this.articleService.getZoneArticle(SelectCentreChoix,codArt).subscribe(data => {
    this.ZoneArticle9= data;
  });
}
public getAllPreparateur9(iteamZone:any) {
  console.log('option last4')
  this.utilisateurService.getUtilisateursList().subscribe(data => {
    this.PreparateurList9 = data.filter(temp=>temp.roles[0].name=="ROLE_PREPARATEUR" && temp.zone==iteamZone);
  });
}
centerAdd9:any;
SelectZoneChoix9:any;
preparateurAdd9:any;
numCharAdd9:any;

NbrTest9:number = 0;
isDisabled9:boolean=true;

SnumCharAdd9;
public CentreSwitchDisable_9(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest9<4){
    this.NbrTest9=this.NbrTest9+1;
  }
  if(this.NbrTest9==4){
    this.isDisabled9 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest9>0){
    this.NbrTest9=this.NbrTest9-1;
    this.isDisabled9 = true;
  }
  console.log('test9'+this.NbrTest9);
}
public ZoneSwitchDisable_9(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest9<4){
    this.NbrTest9=this.NbrTest9+1;
  }
  if(this.NbrTest9==4){
    this.isDisabled9 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest9>0){
    this.NbrTest9=this.NbrTest9-1;
    this.isDisabled9 = true;
  }
  console.log('test9'+this.NbrTest9);
}
public PrepSwitchDisable_9(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest9<4){
    this.NbrTest9=this.NbrTest9+1;
  }  
  if(this.NbrTest9==4){
    this.isDisabled9 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest9>0){
    this.NbrTest9=this.NbrTest9-1;
    this.isDisabled9 = true;
  }
  console.log('test9'+this.NbrTest9);
}
public CharSwitchDisable_9(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest9<4){
    this.NbrTest9=this.NbrTest9+1;
  }
  if(this.NbrTest9==4){
    this.isDisabled9 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest9>0){
    this.NbrTest9=this.NbrTest9-1;
    this.isDisabled9 = true;
  }
  console.log('test9'+this.NbrTest9);
}
public TestValider9(event:any,SnumCharAdd9:any,preparateurAdd9:any,SelectZoneChoix9:any,centerAdd9:any){
  console.log(event);
  console.log(SnumCharAdd9);
  console.log(preparateurAdd9);
  console.log(SelectZoneChoix9);
  console.log(centerAdd9);
  if(!this.centerAdd9 || this.centerAdd9==null){
    this.makeToast7();
  }else if(!this.ZoneArticle9){
    this.makeToast8();
  }else if(!this.preparateurAdd9 || this.preparateurAdd9==null){
    this.makeToast9();
  }else if(!this.SnumCharAdd9 || this.SnumCharAdd9==null){
    this.makeToast10();
  }else{
    console.log(this.artsort);
    console.log(event);
    console.log(this.preparateurAdd9);
    console.log(this.SnumCharAdd9);
    console.log(this.centerAdd9);
    this.artsort.preparateur=this.preparateurAdd9;
    this.artsort.chariot=this.SnumCharAdd9;
    this.artsort.centre=this.centerAdd9;
    this.bonsortService.UpdateArtSort(event,this.artsort).subscribe(data => {
      this.artsort.preparateur=this.preparateurAdd9;
      this.artsort.chariot=this.SnumCharAdd9;
      this.artsort.centre=this.centerAdd9;
      console.log(data);
    }, error => console.log(error));
    this.isDisabled9 = !this.isDisabled9;
  }
}

/** end liste 9  Fil chariot window   ( ) */
/** liste 10  Fil chariot window   ( ) */

PreparateurList10: Utilisateur[];
ZoneArticle10: string[];
public getZoneArticleByCentre10(SelectCentreChoix:any,codArt:any) {
  this.articleService.getZoneArticle(SelectCentreChoix,codArt).subscribe(data => {
    this.ZoneArticle10= data;
  });
}
public getAllPreparateur10(iteamZone:any) {
  console.log('option last4')
  this.utilisateurService.getUtilisateursList().subscribe(data => {
    this.PreparateurList10 = data.filter(temp=>temp.roles[0].name=="ROLE_PREPARATEUR" && temp.zone==iteamZone);
  });
}
centerAdd10:any;
SelectZoneChoix10:any;
preparateurAdd10:any;
numCharAdd10:any;

NbrTest10:number = 0;
isDisabled10:boolean=true;

SnumCharAdd10;
public CentreSwitchDisable_10(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest10<4){
    this.NbrTest10=this.NbrTest10+1;
  }
  if(this.NbrTest10==4){
    this.isDisabled10 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest10>0){
    this.NbrTest10=this.NbrTest10-1;
    this.isDisabled10 = true;
  }
  console.log('test10'+this.NbrTest10);
}
public ZoneSwitchDisable_10(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest10<4){
    this.NbrTest10=this.NbrTest10+1;
  }
  if(this.NbrTest10==4){
    this.isDisabled10 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest10>0){
    this.NbrTest10=this.NbrTest10-1;
    this.isDisabled10 = true;
  }
  console.log('test10'+this.NbrTest10);
}
public PrepSwitchDisable_10(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest10<4){
    this.NbrTest10=this.NbrTest10+1;
  }  
  if(this.NbrTest10==4){
    this.isDisabled10 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest10>0){
    this.NbrTest10=this.NbrTest10-1;
    this.isDisabled10 = true;
  }
  console.log('test10'+this.NbrTest10);
}
public CharSwitchDisable_10(event1:any){
  if(event1!=null && event1 && event1!="NULL" && this.NbrTest10<4){
    this.NbrTest10=this.NbrTest10+1;
  }
  if(this.NbrTest10==4){
    this.isDisabled10 = false;
  }
  if((event1==null || !event1 || event1==[] || event1=="NULL") && this.NbrTest10>0){
    this.NbrTest10=this.NbrTest10-1;
    this.isDisabled10 = true;
  }
  console.log('test10'+this.NbrTest10);
}
public TestValider10(event:any,SnumCharAdd10:any,preparateurAdd10:any,SelectZoneChoix10:any,centerAdd10:any){
  console.log(event);
  console.log(SnumCharAdd10);
  console.log(preparateurAdd10);
  console.log(SelectZoneChoix10);
  console.log(centerAdd10);
  if(!this.centerAdd10 || this.centerAdd10==null){
    this.makeToast7();
  }else if(!this.ZoneArticle10){
    this.makeToast8();
  }else if(!this.preparateurAdd10 || this.preparateurAdd10==null){
    this.makeToast9();
  }else if(!this.SnumCharAdd10 || this.SnumCharAdd10==null){
    this.makeToast10();
  }else{
    console.log(this.artsort);
    console.log(event);
    console.log(this.preparateurAdd10);
    console.log(this.SnumCharAdd10);
    console.log(this.centerAdd10);
    this.artsort.preparateur=this.preparateurAdd10;
    this.artsort.chariot=this.SnumCharAdd10;
    this.artsort.centre=this.centerAdd10;
    this.bonsortService.UpdateArtSort(event,this.artsort).subscribe(data => {
      this.artsort.preparateur=this.preparateurAdd10;
      this.artsort.chariot=this.SnumCharAdd10;
      this.artsort.centre=this.centerAdd10;
      console.log(data);
    }, error => console.log(error));
    this.isDisabled10 = !this.isDisabled10;
  }
}

/** end liste 10  Fil chariot window   ( ) */
onSubmitChariotArticle(){
  this.gotoListBonsort();
}

VehiculeList: Vehicule[];
private getVehicules(){
  this.vehiculeService.getVehiculesList().subscribe(data => {
    this.VehiculeList = data;
  });
}


/** end add of a chariot to the bon sortie */



}