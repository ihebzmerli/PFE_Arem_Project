import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BonLivService } from '../bon-liv.service';
import { Router } from '@angular/router';
import { NbDateService, NbDialogService, NbWindowService } from '@nebular/theme';
import { Bon_liv } from '../bon-liv';
import 'rxjs/add/operator/delay';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from '@nebular/theme';
import { Article } from '../../Articles/article';
import { WindowTypeStockComponent } from '../../Bon_Preps/create-bon-prep/window-type-stock/window-type-stock.component';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ArticleService } from '../../Articles/article.service';
import { DatePipe } from '@angular/common';
import { Fournis } from '../../Fourniss/Fournis';
import { Console } from 'console';
import { FournisService } from '../../Fourniss/fournis.service';
import { Art_liv } from '../Art_Livs/art-liv';
import { Chariot } from '../../Chariots/chariot';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { ChariotService } from '../../Chariots/chariot.service';
import { UtilisateurService } from '../../Utilisateurs/utilisateur.service';
import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
import { XcommandService } from '../../Xcommand/Xcommand.service';
import { Xcommand } from '../../Xcommand/Xcommand';
import { Model } from '../../Model/model';
import { MarqueService } from '../../Marques/marque.service';
import { Marque } from '../../Marques/marque';
@Component({
  selector: 'ngx-create-bon-liv',
  templateUrl: './create-bon-liv.component.html',
  styleUrls: ['./create-bon-liv.component.scss']
})
export class CreateBonLivComponent implements OnInit {
/** inisialisation de select list */

FournisList: Fournis[];
ArticleGeted: Article;
ArticleList: Article [];
article: Article = new Article();
artliv: Art_liv = new Art_liv();
//XcommandList: Xcommand[];
bonLivForm: FormGroup;
artLivDontExistForm: FormGroup;
artLivExistForm: FormGroup;
ArticleWindow : boolean;
listeXcommand : Xcommand[];
/** inisialisation de select list */

  /** teamplate Ajouter */
    starRate = 2;
    heartRate = 4;
    radioGroupValue = 'This is value 2';
  

value;
choise_destina: boolean;    
min: Date;
max: Date;
items :any;
livreur_frs : any;
selectedCodFrs : any;
userPost: Utilisateur;
poste: any;
  /** ********************* */
  
  bonliv: Bon_liv = new Bon_liv();
  submitted = false;
  submittedExist = false;
  submittedDontExist = false;

  constructor(private authService: TokenStorageService,private formBuilder: FormBuilder,public datepipe: DatePipe,private toastrService: NbToastrService, private bonlivService: BonLivService,
      private router: Router, private fournisService:FournisService,protected dateService: NbDateService<Date>,private windowService: NbWindowService,
      public articleService: ArticleService, public chariotService: ChariotService,public xcommandService:XcommandService, public utilisateurService: UtilisateurService
      ,private dialogService: NbDialogService, public marqueService: MarqueService) { 
        this.min = this.dateService.addDay(this.dateService.today(), -7);
        this.max = this.dateService.addDay(this.dateService.today(), 7);
      }
      myDate = new Date('medium');

      
    ngOnInit(){
      
      this.getBonLivs();
      this.getArticles();
      this.getArticleOfAdd();
      this.getFournissList();
      this.getAllMarquesList();
      this.getXcommands();

      const now = Date.now()


          const myFormattedDate = this.datepipe.transform(now, 'yyyy-MM-dd hh:mm:ss');
          const myFormattedDate2 = this.datepipe.transform(now, 'yyyy-MM-dd');
          this.article.derMvt = new Date(myFormattedDate);
          


          this.bonLivForm = this.formBuilder.group({
              numBon: ['', Validators.compose([
                Validators.maxLength(100),
                Validators.minLength(5),
                Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9 ]+$')
              ])],
              Destination: new FormControl("", Validators.required),
              datBon: [new Date(myFormattedDate), Validators.required],
              nomprenomCli: new FormControl({ value: "", disabled: true }, Validators.compose([
                Validators.maxLength(50),
                Validators.minLength(5),
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9 ]+$')
              ])),
              adresseCli: new FormControl({ value: "", disabled: true }, Validators.compose([
                Validators.maxLength(249),
                Validators.minLength(10),
                Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9 ]+$')
              ])),
              fournis: new FormControl({ value: "", disabled: true }),
              numBonFrs: new FormControl({ value: "", disabled: true }, Validators.compose([
                Validators.maxLength(50),
                Validators.minLength(5),
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9 ]+$')
              ])),
              raison:  ['', Validators.compose([
                Validators.maxLength(30),
                Validators.minLength(5),
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9 ]+$')
              ])],
              tauxRem: ['', Validators.compose([
                Validators.min(0),
                Validators.max(999999),
                Validators.required,
                Validators.pattern('^(0|[1-9][0-9]*)$')
              ])],
              montRem: ['', Validators.compose([
                Validators.min(0),
                Validators.max(999999),
                Validators.required,
                Validators.pattern('^(0|[1-9][0-9]*)$')
              ])],
              montTva: ['', Validators.compose([
                Validators.min(0),
                Validators.max(999999),
                Validators.required,
                Validators.pattern('^(0|[1-9][0-9]*)$')
              ])],
              numFac: ['', Validators.compose([
                Validators.min(0),
                Validators.max(999999),
                Validators.required,
                Validators.pattern('^(0|[1-9][0-9]*)$')
              ])],
              xbase0: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xbase6: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xbase10: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xbase17: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xbase29: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xbase7: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xbase12: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xbase21: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xbase36: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xtva6: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xtva10: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xtva17: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xtva29: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xtva7: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xtva12: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xtva21: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xtva36: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              plusV: ['', Validators.compose([
                Validators.min(0),
                Validators.max(999999),
                Validators.required,
                Validators.pattern('^(0|[1-9][0-9]*)$')
              ])],
              tauxRes: ['', Validators.compose([
                Validators.min(0),
                Validators.max(999999),
                Validators.required,
                Validators.pattern('^(0|[1-9][0-9]*)$')
              ])],
              montTrs: ['', Validators.compose([
                Validators.min(0),
                Validators.max(999999),
                Validators.required,
                Validators.pattern('^(0|[1-9][0-9]*)$')
              ])],
              liv: ['', Validators.compose([
                Validators.maxLength(30),
                Validators.minLength(2),
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9 ]+$')
              ])],
              numCom: [''],
              poste: [''],
              montIrpp: ['', Validators.compose([
                Validators.min(0),
                Validators.max(999999),
                Validators.required,
                Validators.pattern('^(0|[1-9][0-9]*)$')
              ])],
              centre: ['', Validators.compose([
                Validators.maxLength(30),
                Validators.minLength(4),
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9 ]+$')
              ])],
              xbase19: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xtva19: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xbase13: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xtva13: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xbase7A: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              xtva7A: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999999999999),
                Validators.required,
                Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
              ])],
              codeTva: ['', Validators.compose([
                Validators.maxLength(30),
                Validators.minLength(4),
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9 ]+$')
              ])],
              trans_action: ['', Validators.required],
              livreur_frs: [''],
              user:['']
          });

          this.utilisateurService.getIdUserByUsername(this.authService.getUsername()).subscribe(data1 => {
            this.utilisateurService.getUtilisateur(data1.toString()).subscribe(data => {
              this.userPost = data;
              this.poste = this.userPost.firstname+' '+this.userPost.lastname;
              this.bonLivForm.patchValue({
                poste: this.poste, 
                user: this.userPost,
              });
            }, error => console.log(error));
          }, error => console.log(error));
        this.artliv.qutStk = 0;
        this.artliv.qutStk2 = 0;
        this.artliv.stkGar = 0;
        this.artliv.stkIni = 0;
        this.artliv.analStk = 0;
        this.artliv.nbjStk = 0;
        this.artliv.vSstk = 0;
        this.artliv.comStk = 0;
        this.artliv.xanalStk = 0;
        this.artliv.stkAtrsf = 0;
        this.artliv.stkTrsf = 0;
        this.artliv.stkReel = 0;
        this.artliv.stkRes = 0;
        this.artliv.stkNp = 0; 



    }
  // convenience getter for easy access to form fields
  get f1() { return this.bonLivForm.controls; }
  itemsQutStk:any;
  QutTotalAch: any;
  QutTotalHt: any;
  QutTotalArem: any;
  warningg: boolean;
  bonLivs: Bon_liv[];
  articles: Article[];
  artLivsList: Art_liv[];
  private getBonLivs() {
    this.bonlivService.getBon_livsList().subscribe(data => {
      this.bonLivs = data;
    });
  }
  private getArtLivs(){
    this.bonlivService.getArt_livsList().delay(750).subscribe(data => {
      this.artLivsList = data;
    });
  }
  private getArticles() {
    this.articleService.getArticlesList().subscribe(data => {
      this.articles = data;
    });
  }
  isDisabled = false;
  onSubmitBon() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.bonLivForm.invalid) {
      this.makeToast2();
        return;
    }
    if(this.bonLivs){
      var target=this.bonLivs.find(temp=>temp.numBon===this.bonLivForm.controls.numBon.value)
    }
    if(target){
      return this.makeToast4();
    }else { 
    // display form values on success
    this.saveBonliv();
    this.makeToast();
    this.ArticleWindow=true ;
    if(this.bonLivForm.controls.trans_action.value=='envoyer'){
      this.isDisabled = true;
    }
    }
    

  }

    saveBonliv() {
      console.log(this.bonLivForm.value)
      if(this.bonLivForm.controls.Destination.value == "true"){
        console.log("yes")
        this.bonLivForm.patchValue({
          nomprenomCli: null, 
          adresseCli : null
        });
      }else{
        this.bonLivForm.patchValue({
          fournis: null, 
        });
      }     
        this.bonlivService.createBon_liv(this.bonLivForm.value).subscribe( data =>{
          console.log(data);
        },
        error => console.log(error));
    }

    gotoListBonliv($myParam: string = ''): void {
      const navigationDetails: string[] = ['//pages/Bon_Livs/bon-liv-list'];
      if($myParam.length) {
        navigationDetails.push($myParam);
      }
      this.router.navigate(navigationDetails);
    }
    choise_existance:boolean;
    datBonSave:Date;
    datBonSaveExist:Date;
      onReset() {
        this.submitted = false;
        this.datBonSave=this.bonLivForm.controls.datBon.value;
        this.bonLivForm.reset()
        this.bonLivForm.get('datBon').setValue(this.datBonSave);
      } 

      resetExist() {
        this.submitted = false;
        this.datBonSaveExist=this.article.derMvt;
        this.artLivExistForm.reset()
        this.article.derMvt=this.datBonSave;
      } 
      delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
//IF ARticle Existe
    async onSubmitArtBonExist() {
      await this.getArtLivs();
      console.log(this.getArtLivs());
      if(this.artLivsList){
        var target=this.artLivsList.find(temp=>temp.codArt==this.artliv.codArt && temp.num_bon_liv==this.bonLivForm.controls.numBon.value);
      }
      console.log(target);
      if((this.artliv.typArt && this.artliv.codArt) && ((this.artliv.qutStk== 0 || this.artliv.qutStk==null) && (this.artliv.qutStk2 == 0 || this.artliv.qutStk2==null) && (this.artliv.stkGar == 0 || this.artliv.stkGar==null) && (this.artliv.stkIni == 0 || this.artliv.stkIni==null) &&
      (this.artliv.analStk == 0 || this.artliv.analStk==null) && (this.artliv.nbjStk == 0 || this.artliv.nbjStk==null) && (this.artliv.vSstk == 0 || this.artliv.vSstk==null) && (this.artliv.comStk == 0 || this.artliv.comStk==null) &&
       (this.artliv.xanalStk == 0 || this.artliv.xanalStk==null) && (this.artliv.stkAtrsf == 0 || this.artliv.stkAtrsf==null)
       && (this.artliv.stkTrsf == 0 || this.artliv.stkTrsf==null) && (this.artliv.stkReel == 0 || this.artliv.stkReel==null) && (this.artliv.stkRes == 0 || this.artliv.stkRes==null) && (this.artliv.stkNp == 0 || this.artliv.stkNp==null))){
        return this.makeToast3();
      }else if(target){
        return this.makeToast6();
      }else if(!this.artliv.typArt  || !this.artliv.codArt){
    
        return this.makeToast2();
      } else{
        await this.saveArtliv();      
        await this.delay(3500);
        await this.prixUpdateBL();
        await this.delay(2000);
        await this.showModalDialogBarProgression();
        await this.delay(1000);
        this.gotoListBonliv();
      }       
    }
      async onResetArtLivExistForm() {
        await this.getArtLivs();
        console.log(this.getArtLivs());
        if(this.artLivsList){
          var target=this.artLivsList.find(temp=>temp.codArt==this.artliv.codArt && temp.num_bon_liv==this.bonLivForm.controls.numBon.value);
        }
        console.log(target);
        if((this.artliv.typArt && this.artliv.codArt) && ((this.artliv.qutStk== 0 || this.artliv.qutStk==null) && (this.artliv.qutStk2 == 0 || this.artliv.qutStk2==null) && (this.artliv.stkGar == 0 || this.artliv.stkGar==null) && (this.artliv.stkIni == 0 || this.artliv.stkIni==null) &&
        (this.artliv.analStk == 0 || this.artliv.analStk==null) && (this.artliv.nbjStk == 0 || this.artliv.nbjStk==null) && (this.artliv.vSstk == 0 || this.artliv.vSstk==null) && (this.artliv.comStk == 0 || this.artliv.comStk==null) &&
         (this.artliv.xanalStk == 0 || this.artliv.xanalStk==null) && (this.artliv.stkAtrsf == 0 || this.artliv.stkAtrsf==null)
         && (this.artliv.stkTrsf == 0 || this.artliv.stkTrsf==null) && (this.artliv.stkReel == 0 || this.artliv.stkReel==null) && (this.artliv.stkRes == 0 || this.artliv.stkRes==null) && (this.artliv.stkNp == 0 || this.artliv.stkNp==null))){
          return this.makeToast3();

        }else if(target){
          return this.makeToast6();

        }else if(!this.artliv.typArt  || !this.artliv.codArt){
          return this.makeToast2();

        } else{
        await this.saveArtliv();
        await this.showModalDialogBarProgression();
        this.makeToast();
        this.artliv.codArt= "0";
        this.artliv.typArt= "0";
        this.artliv.qutStk = 0;
        this.artliv.qutStk2 = 0;
        this.artliv.stkGar = 0;
        this.artliv.stkIni = 0;
        this.artliv.analStk = 0;
        this.artliv.nbjStk = 0;
        this.artliv.vSstk = 0;
        this.artliv.comStk = 0;
        this.artliv.xanalStk = 0;
        this.artliv.stkAtrsf = 0;
        this.artliv.stkTrsf = 0;
        this.artliv.stkReel = 0;
        this.artliv.stkRes = 0;
        this.artliv.stkNp = 0;       
        this.ArticleWindow=true ;
      }
    }

//IF ARticle Don t Existe

  async onSubmitArtBonDontExist() {
    this.getArticles();
    if(this.articles){
      var target=this.articles.find(temp=>temp.codArt==this.article.codArt)
    }
    if((this.article.qutStk== 0 || this.article.qutStk==null) && (this.article.qutStk2 == 0 || this.article.qutStk2==null) && (this.article.stkGar == 0 || this.article.stkGar==null) && (this.article.stkIni == 0 || this.article.stkIni==null) &&
    (this.article.analStk == 0 || this.article.analStk==null) && (this.article.nbjStk == 0 || this.article.nbjStk==null) && (this.article.vSstk == 0 || this.article.vSstk==null) && (this.article.comStk == 0 || this.article.comStk==null) &&
     (this.article.xanalStk == 0 || this.article.xanalStk==null) && (this.article.stkAtrsf == 0 || this.article.stkAtrsf==null)
     && (this.article.stkTrsf == 0 || this.article.stkTrsf==null) && (this.article.stkReel == 0 || this.article.stkReel==null) && (this.article.stkRes == 0 || this.article.stkRes==null) && (this.article.stkNp == 0 || this.article.stkNp==null)){
      return this.makeToast3();
    }
    else if(target){
      return this.makeToast6();
    } else if(!this.artliv.typArt  || !this.artliv.codArt || this.article.refOrg || this.article.desArt || this.article.refRem || this.article.codNgp
      || this.article.marque || this.article.model || this.article.prixAch || this.article.numCas){
      return this.makeToast2();

    }else{
      await this.saveArticle();
      await this.delay(3500);
      await this.prixUpdateBLDont();
      await this.delay(1000);
      await this.showModalDialogBarProgression();
      this.makeToast();
      await this.delay(1000);
      this.gotoListBonliv();
    } 
  }


  async onResetArtLivDontExistForm() {
    this.getArticles();
    if(this.articles){
      var target=this.articles.find(temp=>temp.codArt==this.article.codArt)
    }
    if((this.article.qutStk== 0 || this.article.qutStk==null) && (this.article.qutStk2 == 0 || this.article.qutStk2==null) && (this.article.stkGar == 0 || this.article.stkGar==null) && (this.article.stkIni == 0 || this.article.stkIni==null) &&
    (this.article.analStk == 0 || this.article.analStk==null) && (this.article.nbjStk == 0 || this.article.nbjStk==null) && (this.article.vSstk == 0 || this.article.vSstk==null) && (this.article.comStk == 0 || this.article.comStk==null) &&
     (this.article.xanalStk == 0 || this.article.xanalStk==null) && (this.article.stkAtrsf == 0 || this.article.stkAtrsf==null)
     && (this.article.stkTrsf == 0 || this.article.stkTrsf==null) && (this.article.stkReel == 0 || this.article.stkReel==null) && (this.article.stkRes == 0 || this.article.stkRes==null) && (this.article.stkNp == 0 || this.article.stkNp==null)){
      return this.makeToast3();
  
    }else if(target){
      return this.makeToast6();
    } else if(!this.artliv.typArt  || !this.artliv.codArt || this.article.refOrg || this.article.desArt || this.article.refRem || this.article.codNgp
      || this.article.marque || this.article.model || this.article.prixAch || this.article.numCas){
      return this.makeToast2();

    }else{
      this.submittedDontExist = true;
      await this.saveArticle();
      await this.showModalDialogBarProgression();
      this.makeToast();
      this.article.codArt=null;
      this.article.refOrg=null;
      this.article.desArt=null;
      this.article.refRem=null;
      this.article.codNgp=null;
      this.article.marque.title='0';
      this.article.numCas=null;
      this.article.prixAch=0;
      this.article.qutStk = 0;
      this.article.qutStk2 = 0;
      this.article.stkGar = 0;
      this.article.stkIni = 0;
      this.article.analStk = 0;
      this.article.nbjStk = 0;
      this.article.vSstk = 0;
      this.article.comStk = 0;
      this.article.xanalStk = 0;
      this.article.stkAtrsf = 0;
      this.article.stkTrsf = 0;
      this.article.stkReel = 0;
      this.article.stkRes = 0;
      this.article.stkNp = 0;         
      this.ArticleWindow=true ;
    }
  } 

  ResetForm(){
    this.bonlivService.dataForm.reset();
  }

  saveArtliv() {


/*
        Article.PrixVen == BonPrep.NetHT * artPrep.tva
        BonPrep.NetHT  == Article.PrixAch * Quantité.ArtPrep
        BonPrep.BrutHT  == Article.PrixVen * Quantité.ArtPrep
        BonPrep.TotTTc  == Article.PrixArem * Quantité.ArtPrep // Si le Article don t existe PrisArem is brutHt //
//////////////////////
        Artliv.tva = (montTva*article.prixAch)/100;  //bon recu;
        ArtPrep.PrixHt  == Article.PrixAch
        ArtPrep.PrixArem  == Article.PrixArem * qutPiv
        ArtPrep.ToTHt  == ArtPrep.PrixHt * qutPiv
        ArtPrep.PrixAch  == Article.PrixAch * qutPiv
        artPrep.tva == BonPrep.montTva*ArtPrep.ToTHt/100

*/

      this.artliv.num_bon_liv = this.bonLivForm.controls.numBon.value;
      this.artliv.cumulRet = 0;
      this.artliv.marge = 0;
      this.artliv.poste = this.bonLivForm.controls.poste.value;
      this.artliv.centre = this.bonLivForm.controls.centre.value;

      if(this.bonLivForm.controls.livreur_frs.value!=''){
      this.artliv.livreur_frs = this.bonLivForm.controls.livreur_frs.value;
      }


      if(this.artliv.qutStk==null || !this.artliv.qutStk || this.artliv.qutStk == 0){
        this.artliv.qutStk=0
      }
      if(this.artliv.qutStk2==null || !this.artliv.qutStk2 || this.artliv.qutStk2 == 0){
        this.artliv.qutStk2=0
      }
      if(this.artliv.stkGar==null || !this.artliv.stkGar || this.artliv.stkGar == 0){
        this.artliv.stkGar=0
      }
      if(this.artliv.stkIni==null || !this.artliv.stkIni || this.artliv.stkIni == 0){
        this.artliv.stkIni=0
      }
      if(this.artliv.analStk==null || !this.artliv.analStk || this.artliv.analStk == 0){
        this.artliv.analStk=0
      }
      if(this.artliv.nbjStk==null || !this.artliv.nbjStk || this.artliv.nbjStk == 0){
        this.artliv.nbjStk=0
      }
      if(this.artliv.vSstk==null || !this.artliv.vSstk || this.artliv.vSstk == 0){
        this.artliv.vSstk=0
      }
      if(this.artliv.comStk==null || !this.artliv.comStk || this.artliv.comStk == 0){
        this.artliv.comStk=0
      }
      if(this.artliv.xanalStk==null || !this.artliv.xanalStk || this.artliv.xanalStk == 0){
        this.artliv.xanalStk=0
      }
      if(this.artliv.stkAtrsf==null || !this.artliv.stkAtrsf || this.artliv.stkAtrsf == 0){
        this.artliv.stkAtrsf=0
      }
      if(this.artliv.stkTrsf==null || !this.artliv.stkTrsf || this.artliv.stkTrsf == 0){
        this.artliv.stkTrsf=0
      }
      if(this.artliv.stkReel==null || !this.artliv.stkReel || this.artliv.stkReel == 0){
        this.artliv.stkReel=0
      }
      if(this.artliv.stkRes==null || !this.artliv.stkRes || this.artliv.stkRes == 0){
        this.artliv.stkRes=0
      }
      if(this.artliv.stkNp==null || !this.artliv.stkNp || this.artliv.stkNp == 0){
        this.artliv.stkNp=0
      }

      this.artliv.qutLiv = this.artliv.qutStk+this.artliv.qutStk2+this.artliv.stkGar+this.artliv.stkIni+this.artliv.analStk+
      this.artliv.nbjStk+this.artliv.vSstk+this.artliv.comStk+this.artliv.xanalStk+this.artliv.stkAtrsf+this.artliv.stkTrsf+
      this.artliv.stkReel+this.artliv.stkRes+this.artliv.stkNp;

      

      if(false){
        this.warningg=true;
        this.makeToast3();
        open(); {
          this.dialogService.open(ShowcaseDialogComponent, {
            context: {
              title: 'c est une notification pour corriger le saisie',
            },
          });
        }
      }
      else if(this.ArticleGeted){

      console.log("blabla"+this.ArticleGeted);
      if (this.ArticleGeted.prixVen > 0) {
        this.artliv.prixAch = this.ArticleGeted.prixVen*this.artliv.qutLiv;
      }
      if (this.ArticleGeted.prixVen <= 0 || this.ArticleGeted.prixVen == null || !this.ArticleGeted.prixVen || this.ArticleGeted.prixVen==NaN) {
        this.artliv.prixAch = 0;
      }

      if (this.ArticleGeted.prixArem > 0) {
        this.artliv.prixArem = this.ArticleGeted.prixArem*this.artliv.qutLiv;
      }
      if (this.ArticleGeted.prixArem <= 0 || this.ArticleGeted.prixArem == null || !this.ArticleGeted.prixArem || this.ArticleGeted.prixArem==NaN) {
        this.artliv.prixArem = 0;
      }

    
      if (this.ArticleGeted.prixAch > 0) {
        this.artliv.prixHt = this.ArticleGeted.prixAch;
      }
      if (this.ArticleGeted.prixAch <= 0 || this.ArticleGeted.prixAch == null || !this.ArticleGeted.prixAch || this.ArticleGeted.prixAch==NaN) {
        this.artliv.prixHt = 0;
      }

      this.artliv.totHt = this.artliv.prixHt*this.artliv.qutLiv;
      this.artliv.tva = (this.bonLivForm.controls.montTva.value*this.artliv.totHt)/100;

      if(this.artliv.tva ==null || this.artliv.tva==0){
        this.artliv.tva=0;
      }      


    this.bonlivService.createArt_liv(this.artliv).subscribe( data =>{
      console.log(data);
      //this.gotoListBonliv();
    },
    error => console.log(error));


          //form for Artticle
    if(this.bonLivForm.controls.trans_action.value == 'recu'){
        
      this.articleService.UpdateStkArticle(this.artliv.codArt,this.artliv).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
        
    }
    if(this.bonLivForm.controls.trans_action.value == 'envoyer'){
        
      this.articleService.UpdateStkArticleOut(this.artliv.codArt,this.artliv).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));      
    }
  }
}
  async saveArticle() {

    //form for Art_Liv
      this.artliv.num_bon_liv = this.bonLivForm.controls.numBon.value;
      this.artliv.codArt = this.article.codArt;
      this.artliv.cumulRet = 0;
      this.artliv.marge = 0;

      if(this.bonLivForm.controls.poste.value!=''){
      this.artliv.poste = this.bonLivForm.controls.poste.value;
        }else{
          this.artliv.poste = "Aucune";
        }
      if(this.bonLivForm.controls.centre.value!=''){
      this.artliv.centre = this.bonLivForm.controls.centre.value;
        }else{
          this.artliv.centre = "Aucune";
        }
      if(this.bonLivForm.controls.livreur_frs.value!=''){
      this.artliv.livreur_frs = this.bonLivForm.controls.livreur_frs.value;
        }else{
          this.artliv.livreur_frs = "Aucune";
        }
      
      if(this.article.qutStk==null || !this.article.qutStk || this.article.qutStk == 0){
        this.article.qutStk=0;
      }
      if(this.article.qutStk2==null || !this.article.qutStk2 || this.article.qutStk2 == 0){
        this.article.qutStk2=0;
      }
      if(this.article.stkGar==null || !this.article.stkGar || this.article.stkGar == 0){
        this.article.stkGar=0;
      }
      if(this.article.stkIni==null || !this.article.stkIni || this.article.stkIni == 0){
        this.article.stkIni=0;
      }
      if(this.article.analStk==null || !this.article.analStk || this.article.analStk == 0){
        this.article.analStk=0;
      }
      if(this.article.nbjStk==null || !this.article.nbjStk || this.article.nbjStk == 0){
        this.article.nbjStk=0;
      }
      if(this.article.vSstk==null || !this.article.vSstk || this.article.vSstk == 0){
        this.article.vSstk=0;
      }
      if(this.article.comStk==null || !this.article.comStk || this.article.comStk == 0){
        this.article.comStk=0;
      }
      if(this.article.xanalStk==null || !this.article.xanalStk || this.article.xanalStk == 0){
        this.article.xanalStk=0;
      }
      if(this.article.stkAtrsf==null || !this.article.stkAtrsf || this.article.stkAtrsf == 0){
        this.article.stkAtrsf=0;
      }
      if(this.article.stkTrsf==null || !this.article.stkTrsf || this.article.stkTrsf == 0){
        this.article.stkTrsf=0;
      }
      if(this.article.stkReel==null || !this.article.stkReel || this.article.stkReel == 0){
        this.article.stkReel=0;
      }
      if(this.article.stkRes==null || !this.article.stkRes || this.article.stkRes == 0){
        this.article.stkRes=0;
      }
      if(this.article.stkNp==null || !this.article.stkNp || this.article.stkNp == 0){
        this.article.stkNp=0;
      }
      this.artliv.qutStk = this.article.qutStk;
      this.artliv.qutStk2 = this.article.qutStk2;
      this.artliv.stkGar = this.article.stkGar;
      this.artliv.stkIni = this.article.stkIni;
      this.artliv.analStk = this.article.analStk;
      this.artliv.nbjStk = this.article.nbjStk;
      this.artliv.vSstk = this.article.vSstk;
      this.artliv.comStk = this.article.comStk;
      this.artliv.xanalStk = this.article.xanalStk;
      this.artliv.stkAtrsf = this.article.stkAtrsf;
      this.artliv.stkTrsf = this.article.stkTrsf;
      this.artliv.stkReel = this.article.stkReel;
      this.artliv.stkRes = this.article.stkRes;
      this.artliv.stkNp = this.article.stkNp;

      this.artliv.qutLiv = this.artliv.qutStk+this.artliv.qutStk2+this.artliv.stkGar+this.artliv.stkIni+this.artliv.analStk+this.artliv.nbjStk+
      this.artliv.vSstk+this.artliv.comStk+this.artliv.xanalStk+this.artliv.stkAtrsf+this.artliv.stkTrsf+this.artliv.stkReel+
      this.artliv.stkRes+this.artliv.stkNp;

      if(false){
        this.warningg=true;
        this.makeToast3();
        open(); {
          this.dialogService.open(ShowcaseDialogComponent, {
            context: {
              title: 'c est une notification pour corriger le saisie',
            },
          });
        }
      }
      else{



      this.artliv.typArt = this.article.marque.code;
      this.artliv.prixAch = this.article.prixAch;
      this.artliv.tva = (this.bonLivForm.controls.montTva.value*this.article.prixAch)/100;
      if(this.artliv.tva ==null || this.artliv.tva==0){
        this.artliv.tva=0;
      }
      this.artliv.prixHt = this.article.prixAch-this.artliv.tva;
      if(this.artliv.prixHt ==null || this.artliv.prixHt==0){
        this.artliv.prixHt=0;
      }
      this.artliv.totHt = this.artliv.prixHt*this.artliv.qutLiv;
      if(this.artliv.totHt ==null || this.artliv.totHt==0){
        this.artliv.totHt=0;
      }
      this.artliv.marge = 0;
      this.artliv.remExp = 0;
    

    await this.bonlivService.createArt_liv(this.artliv).subscribe( data =>{
      console.log(data);
      //this.gotoListBonliv();
    },
    error => console.log(error));


        /** end msj de prix bon livraison */

    //form for Artticle
    const now = Date.now()
    const myFormattedDate = this.datepipe.transform(now, 'yyyy-MM-dd hh:mm:ss');
    this.article.datCreat=new Date(myFormattedDate);

    this.articleService.createArticle(this.article).subscribe( data =>{
      console.log(data);
      //this.gotoListBonliv();
    },
    error => console.log(error));
  }
  this.makeToast(); 
}   

  async prixUpdateBL(){
       
  await this.bonlivService.getSumQutByBLach(this.bonLivForm.controls.numBon.value).subscribe(async data => {
        this.QutTotalAch = data;
          this.bonliv.netHt =  this.QutTotalAch;
        console.log("netHt:"+this.bonliv.netHt);

        await this.bonlivService.getSumQutByBLht(this.bonLivForm.controls.numBon.value).subscribe(data2 => {
          this.QutTotalHt = data2;
            this.bonliv.brutHt =  this.QutTotalHt;
          console.log("brutHt:"+this.bonliv.brutHt);
        });
        await this.bonlivService.getSumQutByBLAREM(this.bonLivForm.controls.numBon.value).subscribe(async data3 => {        
          this.QutTotalArem = data3;         
          this.bonliv.totTtc =  this.QutTotalArem;
          console.log("totTtc:"+this.bonliv.totTtc);

          
          await this.bonlivService.updateBonLivPrix(this.bonLivForm.controls.numBon.value,this.bonliv).subscribe( data =>{            
            console.log(data);           
          },
          error => console.log(error));
        });
    });
}


/**************test update Bl prix ********** */

async prixUpdateBLDont(){
       
  await this.bonlivService.getSumQutByBLach(this.bonLivForm.controls.numBon.value).subscribe(async data => {
        this.QutTotalAch = data;
          this.bonliv.netHt =  this.QutTotalAch;
        console.log("netHt:"+this.bonliv.netHt);
      });
        await this.bonlivService.getSumQutByBLht(this.bonLivForm.controls.numBon.value).subscribe(data2 => {
          this.QutTotalHt = data2;
            this.bonliv.brutHt =  this.QutTotalHt;
          console.log("brutHt:"+this.bonliv.brutHt);
        });
        await this.bonlivService.getSumQutByBLAREM(this.bonLivForm.controls.numBon.value).subscribe(async data3 => {        
          this.QutTotalArem = data3;         
          this.bonliv.totTtc =  this.QutTotalArem;
          console.log("totTtc:"+this.bonliv.totTtc);
        });
          
          await this.bonlivService.updateBonLivPrix(this.bonLivForm.controls.numBon.value,this.bonliv).subscribe( data =>{            
            console.log(data);           
          },
          error => console.log(error));

}

/**endddd*********** */
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
content = `Le Bon de Livraison est ajouter!`;

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



/** progression bar */

progress=0;
displayModalBarProgression: boolean;
  async showModalDialogBarProgression() {
  this.progress=0;
  this.displayModalBarProgression = true;
  this.makeToast5();
  await this.delay(1000);
  this.progress=15;
  await this.delay(1000);
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
/**toaster show start */ 

  listmarquearticle;
  ArticleListWithMarque: Article[];
  StockListWithArticle: any[] = [];

  public getAllStockByArticle(itemsArticle :any) {
    console.log(itemsArticle);  
    if(itemsArticle && itemsArticle!='0'){
    this.articleService.getArticle(itemsArticle).subscribe(data => {
      this.ArticleGeted = data;
    });
    
      this.bonlivService.getAllStockByArticle(itemsArticle).subscribe(data => {
        this.StockListWithArticle = data;
        console.log(data);
      });
    }
  }
  public getArticleOfAdd() {
    this.bonlivService.getArticleOfAdd().subscribe(data => {
      this.ArticleList = data;
    });
  }
  public getFournissList() {
    this.fournisService.getFournissList().subscribe(data => {
      this.FournisList = data;
    });
  }

  public getXcommands(){
    this.xcommandService.getXcommandBlNull().subscribe(data1 => {
      console.log(data1)
      this.listeXcommand=data1;
    }, error => console.log(error));
  }
  showFrsLivreur: boolean
  ClientFrsValue;

  onSelectionChanged(value) {
    if (value === 'false') {
      this.bonLivForm.get('fournis').disable();
      this.bonLivForm.get('numBonFrs').disable();
      this.bonLivForm.get('nomprenomCli').enable();
      this.bonLivForm.get('adresseCli').enable();
    } else {
      this.bonLivForm.get('nomprenomCli').disable();
      this.bonLivForm.get('adresseCli').disable();
      this.bonLivForm.get('fournis').enable();
      this.bonLivForm.get('numBonFrs').enable();
    }
  }

  
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
previewPhotoArticle = false;
previewPhotoAllArticle = false;
togglepreviewPhotoArticle(){
  this.previewPhotoArticle = !this.previewPhotoArticle;
}
togglepreviewPhotoAllArticle(){
  this.previewPhotoAllArticle = !this.previewPhotoAllArticle;
}
/** end Show image article */

/**cantrolle saisir  */

    
formOption_Existe = new FormGroup({
    Option_Existe: new FormControl('exist', Validators.required)
  });

/** end cantrolle saisir  */

  get f(){
    return this.formOption_Existe.controls;
  }

  submit(){

    if(this.f.Option_Existe.value == true){
    }else if(this.f.Option_Existe.value == false){
    }
  }

  counter(i: number) {
    return new Array(i);

}








/** marque model article choise */


ModelFromMarque:Model[];
MarqueList: Marque[];
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
  public getArticleOfFromMarqueAddForBonPrep(itemsModel :any) {
    console.log(itemsModel);
    if(itemsModel!=0){
      this.bonlivService.getArticleOfFromMarqueAddForBonLiv(itemsModel.id).subscribe(data => {
        this.ArticleListWithMarque = data;
        console.log(this.ArticleListWithMarque);
        });
      }
  }

  ModelSelected(itemsModel:any){
    return this.artliv.typArt=this.value1+", Model:"+itemsModel.title;
  }
  value1:String;
  MarqueSelected(itemsMarque:any){
    return this.value1="Marque:"+itemsMarque.title;
  }
/** end marque model article choise */



/***calcule sum */
sumArticles:number;
sumAllArticles:number;
CalculeValueSum(){
  this.sumArticles = this.artliv.qutStk+this.artliv.qutStk2+this.artliv.stkGar+this.artliv.stkIni+this.artliv.analStk+
  this.artliv.nbjStk+this.artliv.vSstk+this.artliv.comStk+this.artliv.xanalStk+this.artliv.stkAtrsf+this.artliv.stkTrsf+
  this.artliv.stkReel+this.artliv.stkRes+this.artliv.stkNp;

  if(!this.ArticleGeted){
    this.sumAllArticles=0;
  }else{
    this.sumAllArticles=this.sumArticles*this.ArticleGeted.prixVen;
  }
}

/***end calcule sum */

/***calcule sum DON T Exist */
sumArticlesDont:number;
sumAllArticlesDont:number;
CalculeValueSumDont(){
  if(this.article.qutStk==null || !this.article.qutStk || this.article.qutStk == 0){
    this.article.qutStk=0;
  }
  if(this.article.qutStk2==null || !this.article.qutStk2 || this.article.qutStk2 == 0){
    this.article.qutStk2=0;
  }
  if(this.article.stkGar==null || !this.article.stkGar || this.article.stkGar == 0){
    this.article.stkGar=0;
  }
  if(this.article.stkIni==null || !this.article.stkIni || this.article.stkIni == 0){
    this.article.stkIni=0;
  }
  if(this.article.analStk==null || !this.article.analStk || this.article.analStk == 0){
    this.article.analStk=0;
  }
  if(this.article.nbjStk==null || !this.article.nbjStk || this.article.nbjStk == 0){
    this.article.nbjStk=0;
  }
  if(this.article.vSstk==null || !this.article.vSstk || this.article.vSstk == 0){
    this.article.vSstk=0;
  }
  if(this.article.comStk==null || !this.article.comStk || this.article.comStk == 0){
    this.article.comStk=0;
  }
  if(this.article.xanalStk==null || !this.article.xanalStk || this.article.xanalStk == 0){
    this.article.xanalStk=0;
  }
  if(this.article.stkAtrsf==null || !this.article.stkAtrsf || this.article.stkAtrsf == 0){
    this.article.stkAtrsf=0;
  }
  if(this.article.stkTrsf==null || !this.article.stkTrsf || this.article.stkTrsf == 0){
    this.article.stkTrsf=0;
  }
  if(this.article.stkReel==null || !this.article.stkReel || this.article.stkReel == 0){
    this.article.stkReel=0;
  }
  if(this.article.stkRes==null || !this.article.stkRes || this.article.stkRes == 0){
    this.article.stkRes=0;
  }
  if(this.article.stkNp==null || !this.article.stkNp || this.article.stkNp == 0){
    this.article.stkNp=0;
  }

  this.sumArticlesDont = this.article.qutStk+this.article.qutStk2+this.article.stkGar+this.article.stkIni+this.article.analStk+
  this.article.nbjStk+this.article.vSstk+this.article.comStk+this.article.xanalStk+this.article.stkAtrsf+this.article.stkTrsf+
  this.article.stkReel+this.article.stkRes+this.article.stkNp;

  if(!this.article.prixAch){
    console.log("true baby")
    this.sumAllArticlesDont=0;
  }else{
    console.log("false baby")
    this.sumAllArticlesDont=this.sumArticlesDont*this.article.prixAch;
  }
  console.log(this.article.qutStk);
  console.log(this.article.qutStk2);
  console.log(this.sumArticlesDont)
  console.log(this.sumAllArticlesDont)
}

/***end calcule sum DON T Exist */

}
  