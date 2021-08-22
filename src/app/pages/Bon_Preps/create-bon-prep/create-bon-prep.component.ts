import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Bon_prep } from '../bon-prep';
import { BonPrepService } from '../bon-prep.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/delay';
import { NbDateService, NbWindowService } from '@nebular/theme';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from '@nebular/theme';
import { Chariot } from '../../Chariots/chariot';
import { Article } from '../../Articles/article';
import { Expide } from '../../Expides/expide';
import { Achats } from '../../Achatss/Achats';
import { WindowTypeStockComponent } from './window-type-stock/window-type-stock.component';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { AnyARecord } from 'dns';
import { ArticleService } from '../../Articles/article.service';
import { Art_Prep } from '../Art_Preps/art-prep';
import { DatePipe } from '@angular/common';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { ChariotService } from '../../Chariots/chariot.service';
import { UtilisateurService } from '../../Utilisateurs/utilisateur.service';
import { Console } from 'console';
import { Fournis } from '../../Fourniss/fournis';
import { FournisService } from '../../Fourniss/fournis.service';
import { Marque } from '../../Marques/marque';
import { MarqueService } from '../../Marques/marque.service';
import { Model } from '../../Model/model';
import { BonLivService } from '../../Bon_Livs/bon-liv.service';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
@Component({
  selector: 'ngx-create-bon-prep',
  templateUrl: './create-bon-prep.component.html',
  styleUrls: ['./create-bon-prep.component.scss']
})
export class CreateBonPrepComponent implements OnInit {
previewPhotoArticle = false;
previewPhotoAllArticle = false;
condition_est_remplie = true;

/**type stock */
stks: any[];
selectedStks= [];
/**type stock */
/** DROP LIST */
listmarquearticle;
SelectNatLiv;
MarqueList: Marque[];
StockListWithArticle: any[] = [];
ArticleListWithMarque: Article[];
MarqueArticleList: String[];
ArticleList: Article [];
ExpideList: Expide [];
AchatList: Achats [];
selected = null;
ArticleGeted: Article;
MarqueArticleListe:any[];
FournisList: Fournis[];
/**DROP LIST */
selectedCountry: string;

/** inisialisation de select list */
/** teamplate Ajouter */
  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';

min: Date;
max: Date;

/** ********************* 
 * 
*/
clearFilter(dropdown: Dropdown) {
  dropdown.resetFilter();
}
bonprep: Bon_prep = new Bon_prep();
artprep: Art_Prep = new Art_Prep();
bonPrepForm: FormGroup;
artPrepForm: FormGroup;
submitted = false;
submitted2 = false;
date: Date;
item: string;
items: SelectItem[];
selectedCodFrs : any;
constructor(private authService: TokenStorageService, private fournisService:FournisService,private bonlivService:BonLivService,public datepipe: DatePipe,private toastrService: NbToastrService, private formBuilder: FormBuilder,
  private bonprepService: BonPrepService, private router: Router,protected dateService: NbDateService<Date>,
  private windowService: NbWindowService,public articleService: ArticleService, public chariotService: ChariotService
  ,public utilisateurService: UtilisateurService, public marqueService: MarqueService) { 
      this.min = this.dateService.addDay(this.dateService.today(), -7);
      this.max = this.dateService.addDay(this.dateService.today(), 7);
      this.items = [];

      this.stks = [
        { value: 'qutStk' , name: 'QUT_STK' },
        { value: 'qutStk2' , name: 'QUT_STK2' },
        { value: 'stkGar' , name: 'STK_GAR' },
        { value: 'stkIni', name: 'STK_INI' },
        { value: 'analStk', name: 'ANAL_STK' },
        { value: 'nbjStk', name: 'NBJ_STK' },
    
        { value: 'vSstk', name: 'V_SSTK' },
        { value: 'comStk', name: 'COM_STK' },
        { value: 'xanalStk', name: 'XANAL_STK' },
        { value: 'stkAtrsf', name: 'STK_ATRSF' },
        { value: 'stkTrsf', name: 'STK_TRSF' },
        { value: 'stkReel', name: 'STK_REEL' },
        { value: 'stkRes', name: 'STK_RES' },
        { value: 'stkNp', name: 'STK_NP' },
      ];
    }
    myFunction(){
      this.date=new Date();
      let latest_date =this.datepipe.transform(this.date, 'yyyy-mm-dd hh:mm:ss');
      return latest_date;
     }

     calculeTTC(){
      return this.bonprep.totTtc=this.bonprep.netHt+(this.bonprep.montTva*this.bonprep.brutHt)/100;
     }
    ngOnInit(){
      
      this.getArtPreps();
      this.getBonPreps();
      this.disableFrsDropdown = false;
      this.getArticleOfAdd();
      this.getFournissList(); 
      this.getAllMarquesList();
      const now = Date.now()
      const myFormattedDate = this.datepipe.transform(now, 'yyyy-MM-dd hh:mm:ss');
      const myFormattedDate2 = this.datepipe.transform(now, 'yyyy-MM-dd');
        this.bonPrepForm = this.formBuilder.group({
            numBon: ['', Validators.compose([
              Validators.maxLength(100),
              Validators.minLength(5),
              Validators.required,
              Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9 ]+$')
            ])],
            datBon: [ new Date(), Validators.required],
            Destination: new FormControl("false", Validators.required),
            nomprenomCli: new FormControl({ value: "", disabled: false }, Validators.compose([
              Validators.maxLength(80),
              Validators.minLength(5),
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9 ]+$')
            ])),
            codFrs: [''],
            raison:  ['', Validators.compose([
              Validators.maxLength(200),
              Validators.minLength(5),
              Validators.required,
              Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9 ]+$')
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
              Validators.minLength(5),
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9 ]+$')
            ])],
            pointage: ['', Validators.compose([
              Validators.maxLength(30),
              Validators.minLength(6),
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9 ]+$')
            ])],
            natLiv: ['', Validators.compose([
              Validators.required
            ])],
            natDoc: ['', Validators.compose([
              Validators.maxLength(30),
              Validators.minLength(5),
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9 ]+$')
            ])],
            codeTva: ['', Validators.compose([
              Validators.maxLength(30),
              Validators.minLength(4),
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9 ]+$')
            ])],
            adresse: ['', Validators.compose([
              Validators.maxLength(100),
              Validators.minLength(10),
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9_.+-]+$')
            ])],
            point: ['', Validators.compose([
              Validators.maxLength(30),
              Validators.minLength(10),
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9 ]+$')
            ])],
            aideMag: ['', Validators.compose([
              Validators.maxLength(30),
              Validators.minLength(6),
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9 ]+$')
            ])],
            embal: ['', Validators.compose([
              Validators.maxLength(30),
              Validators.minLength(6),
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9 ]+$')
            ])],
            poste: [''],
            centre: ['', Validators.compose([
              Validators.maxLength(30),
              Validators.minLength(5),
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9 ]+$')
            ])],
            plusV: ['', Validators.compose([
              Validators.min(0),
              Validators.max(999999),
              Validators.required,
              Validators.pattern('^(0|[1-9][0-9]*)$')
            ])],
            aven_tage: ['', Validators.compose([
              Validators.minLength(1),
              Validators.required,
            ])],
            xbase10: [0, Validators.compose([
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
            xbase17: [0, Validators.compose([
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
            xbase7: [0, Validators.compose([
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
            xbase29: [0, Validators.compose([
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
            xbase36: [0, Validators.compose([
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
            xbase6: [0, Validators.compose([
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
            xbase21: [0, Validators.compose([
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
            xbase12: [0, Validators.compose([
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
            xbase0: [0, Validators.compose([
              Validators.min(0),
              Validators.max(999999999999),
              Validators.required,
              Validators.pattern('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
            ])],

        });
    
        this.getListChariot();

        this.artprep.qutStk = 0;
        this.artprep.qutStk2 = 0;
        this.artprep.stkGar = 0;
        this.artprep.stkIni = 0;
        this.artprep.analStk = 0;
        this.artprep.nbjStk = 0;
        this.artprep.vSstk = 0;
        this.artprep.comStk = 0;
        this.artprep.xanalStk = 0;
        this.artprep.stkAtrsf = 0;
        this.artprep.stkTrsf = 0;
        this.artprep.stkReel = 0;
        this.artprep.stkRes = 0;
        this.artprep.stkNp = 0; 
    }
  // convenience getter for easy access to form fields
  get f() { return this.bonPrepForm.controls; }
  get f2() { return this.artPrepForm.controls; }
  QutTotalAch: any;
  QutTotalHt: any;
  QutTotalArem: any;
  QutTotal: any;
  bonPreps: Bon_prep[];
  artPrepsList: Art_Prep[];
  private getBonPreps() {
    this.bonprepService.getBon_prepsList().subscribe(data => {
      this.bonPreps = data;
    });
  }
  private getArtPreps(){
    this.bonprepService.getArt_prepsList().delay(750).subscribe(data => {
      this.artPrepsList = data;
    });
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  onSubmitBon() {
    this.submitted = true;
  
    // stop here if form is invalid
    if (this.bonPrepForm.invalid) {
      this.makeToast2();
        return;
    }

    var target=this.bonPreps.find(temp=>temp.numBon==this.bonPrepForm.controls.numBon.value)
    if(target){
      return this.makeToast4();
    }else { 
    this.saveBonprep();
    this.makeToast(); 
    this.ArticleWindow=true ;
    }
  }
  



      saveArtprep() {

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


        this.artprep.numBon = this.bonPrepForm.controls.numBon.value;
        this.artprep.poste = this.bonPrepForm.controls.poste.value;
        this.artprep.datPrep = this.bonPrepForm.controls.datBon.value;

        if(this.artprep.qutStk==null || !this.artprep.qutStk || this.artprep.qutStk == 0){
          this.artprep.qutStk=0
        }
        if(this.artprep.qutStk2==null || !this.artprep.qutStk2 || this.artprep.qutStk2 == 0){
          this.artprep.qutStk2=0
        }
        if(this.artprep.stkGar==null || !this.artprep.stkGar || this.artprep.stkGar == 0){
          this.artprep.stkGar=0
        }
        if(this.artprep.stkIni==null || !this.artprep.stkIni || this.artprep.stkIni == 0){
          this.artprep.stkIni=0
        }
        if(this.artprep.analStk==null || !this.artprep.analStk || this.artprep.analStk == 0){
          this.artprep.analStk=0
        }
        if(this.artprep.nbjStk==null || !this.artprep.nbjStk || this.artprep.nbjStk == 0){
          this.artprep.nbjStk=0
        }
        if(this.artprep.vSstk==null || !this.artprep.vSstk || this.artprep.vSstk == 0){
          this.artprep.vSstk=0
        }
        if(this.artprep.comStk==null || !this.artprep.comStk || this.artprep.comStk == 0){
          this.artprep.comStk=0
        }
        if(this.artprep.xanalStk==null || !this.artprep.xanalStk || this.artprep.xanalStk == 0){
          this.artprep.xanalStk=0
        }
        if(this.artprep.stkAtrsf==null || !this.artprep.stkAtrsf || this.artprep.stkAtrsf == 0){
          this.artprep.stkAtrsf=0
        }
        if(this.artprep.stkTrsf==null || !this.artprep.stkTrsf || this.artprep.stkTrsf == 0){
          this.artprep.stkTrsf=0
        }
        if(this.artprep.stkReel==null || !this.artprep.stkReel || this.artprep.stkReel == 0){
          this.artprep.stkReel=0
        }
        if(this.artprep.stkRes==null || !this.artprep.stkRes || this.artprep.stkRes == 0){
          this.artprep.stkRes=0
        }
        if(this.artprep.stkNp==null || !this.artprep.stkNp || this.artprep.stkNp == 0){
          this.artprep.stkNp=0
        }

        this.artprep.qutPrep = this.artprep.qutStk + this.artprep.qutStk2+this.artprep.stkGar+this.artprep.stkIni+this.artprep.analStk
        +this.artprep.nbjStk+this.artprep.vSstk+this.artprep.comStk+this.artprep.xanalStk+this.artprep.stkAtrsf+this.artprep.stkTrsf
        +this.artprep.stkReel+this.artprep.stkRes+this.artprep.stkNp;

        if(this.bonPrepForm.controls.natLiv.value=="livraison"){
          this.artprep.qutLiv=this.artprep.qutPrep;
        }
        
          if (this.ArticleGeted.prixVen > 0) {
            this.artprep.prixAch = this.ArticleGeted.prixVen*this.artprep.qutPrep;
          }
          if (this.ArticleGeted.prixVen <= 0 || this.ArticleGeted.prixVen == null || !this.ArticleGeted.prixVen || this.ArticleGeted.prixVen==NaN) {
            this.artprep.prixAch = 0;
          }

          if (this.ArticleGeted.prixArem > 0) {
            this.artprep.prixArem = this.ArticleGeted.prixArem*this.artprep.qutPrep;
          }
          if (this.ArticleGeted.prixArem <= 0 || this.ArticleGeted.prixArem == null || !this.ArticleGeted.prixArem || this.ArticleGeted.prixArem==NaN) {
            this.artprep.prixArem = 0;
          }

        
          if (this.ArticleGeted.prixAch > 0) {
            this.artprep.prixHt = this.ArticleGeted.prixAch;
          }
          if (this.ArticleGeted.prixAch <= 0 || this.ArticleGeted.prixAch == null || !this.ArticleGeted.prixAch || this.ArticleGeted.prixAch==NaN) {
            this.artprep.prixHt = 0;
          }

        this.artprep.totHt = this.artprep.prixHt*this.artprep.qutPrep;

        
        this.artprep.tva = Number(((this.bonPrepForm.controls.montTva.value*this.artprep.totHt)/100).toFixed(2));
        console.log(this.artprep.tva);
        if(this.artprep.tva <= 0 || this.artprep.tva == null || !this.artprep.tva || this.artprep.tva==NaN){
          this.artprep.tva=0;
        }

        console.log(this.artprep);
        this.bonprepService.createArt_prep(this.artprep).subscribe( data =>{
          console.log(data);
        },error => console.log(error));
        this.articleService.UpdateStkArticleOut(this.artprep.codArt,this.artprep).delay(1000).subscribe( data =>{
          console.log(data);

        },error => console.log(error));

  }

gotoListBonprep($myParam: string = ''): void {
  const navigationDetails: string[] = ['//pages/Bon_Preps/bon-prep-list'];
  if($myParam.length) {
    navigationDetails.push($myParam);
  }
  this.router.navigate(navigationDetails);
}

AutreArticle: boolean;
codArticle: any[] = [];
ArticleWindow : boolean;

  async onSubmitArtBon() {
    console.log('test2'+this.artprep.typArt)
    await this.getArtPreps();
    console.log(this.getArtPreps());
    console.log(this.artprep.codArt);
    console.log(this.bonPrepForm.controls.numBon.value);
    console.log(this.artPrepsList);
    if(this.artprep.typArt || this.artprep.codArt){
    var target=this.artPrepsList.find(temp=>temp.codArt==this.artprep.codArt && temp.numBon==this.bonPrepForm.controls.numBon.value);
    }
    console.log(target);
  if((this.artprep.typArt && this.artprep.codArt) && ((this.artprep.qutStk== 0 || this.artprep.qutStk==null) && (this.artprep.qutStk2 == 0 || this.artprep.qutStk2==null) && (this.artprep.stkGar == 0 || this.artprep.stkGar==null) && (this.artprep.stkIni == 0 || this.artprep.stkIni==null) &&
  (this.artprep.analStk == 0 || this.artprep.analStk==null) && (this.artprep.nbjStk == 0 || this.artprep.nbjStk==null) && (this.artprep.vSstk == 0 || this.artprep.vSstk==null) && (this.artprep.comStk == 0 || this.artprep.comStk==null) &&
   (this.artprep.xanalStk == 0 || this.artprep.xanalStk==null) && (this.artprep.stkAtrsf == 0 || this.artprep.stkAtrsf==null)
   && (this.artprep.stkTrsf == 0 || this.artprep.stkTrsf==null) && (this.artprep.stkReel == 0 || this.artprep.stkReel==null) && (this.artprep.stkRes == 0 || this.artprep.stkRes==null) && (this.artprep.stkNp == 0 || this.artprep.stkNp==null))){
    this.ChariotWindow=false;
    return this.makeToast3();

  }else if(target){
    return this.makeToast6();
  }else if(!this.artprep.typArt || !this.artprep.codArt){

    return this.makeToast2();
  } else if(!target){
    this.saveArtprep();
    await this.delay(3500);
    this.prixUpdateBP();
    await this.delay(1000);
    await this.showModalDialogBarProgression();
    this.makeToast();
    await this.delay(1000);
    this.ChariotWindow=true;
    this.ArticleWindow=false;
    this.lastAdd=this.lastAdd+1;
    console.log(this.lastAdd);
    this.getListArtPrepForChariot();
  }
} 
lastAdd:number = 0;
datBonSave:Date;
onReset() {
  this.submitted = false;
  this.datBonSave=this.bonPrepForm.controls.datBon.value;
  this.bonPrepForm.reset()
  this.bonPrepForm.get('datBon').setValue(this.datBonSave);
} 
  async onResetArtPrepExistForm(){
    console.log('test1'+this.artprep.typArt)
    await this.getArtPreps();
    console.log(this.getArtPreps());
    if((this.artprep.typArt || this.artprep.codArt)){
      var target=this.artPrepsList.find(temp=>temp.codArt==this.artprep.codArt && temp.numBon==this.bonPrepForm.controls.numBon.value);
    }
    console.log(target);
  if((this.artprep.typArt && this.artprep.codArt) &&((this.artprep.qutStk== 0 || this.artprep.qutStk==null) && (this.artprep.qutStk2 == 0 || this.artprep.qutStk2==null) && (this.artprep.stkGar == 0 || this.artprep.stkGar==null) && (this.artprep.stkIni == 0 || this.artprep.stkIni==null) &&
  (this.artprep.analStk == 0 || this.artprep.analStk==null) && (this.artprep.nbjStk == 0 || this.artprep.nbjStk==null) && (this.artprep.vSstk == 0 || this.artprep.vSstk==null) && (this.artprep.comStk == 0 || this.artprep.comStk==null) &&
   (this.artprep.xanalStk == 0 || this.artprep.xanalStk==null) && (this.artprep.stkAtrsf == 0 || this.artprep.stkAtrsf==null)
   && (this.artprep.stkTrsf == 0 || this.artprep.stkTrsf==null) && (this.artprep.stkReel == 0 || this.artprep.stkReel==null) && (this.artprep.stkRes == 0 || this.artprep.stkRes==null) && (this.artprep.stkNp == 0 || this.artprep.stkNp==null))){
    return this.makeToast3();

  }else if(target){
    return this.makeToast6();
  }else if(!this.artprep.typArt || !this.artprep.codArt){
    return this.makeToast2();
  } else if(!target && this.lastAdd!=9){
    await this.saveArtprep();
    await this.showModalDialogBarProgression();
    this.makeToast();
    this.artprep.qutStk = 0;
    this.artprep.qutStk2 = 0;
    this.artprep.stkGar = 0;
    this.artprep.stkIni = 0;
    this.artprep.analStk = 0;
    this.artprep.nbjStk = 0;
    this.artprep.vSstk = 0;
    this.artprep.comStk = 0;
    this.artprep.xanalStk = 0;
    this.artprep.stkAtrsf = 0;
    this.artprep.stkTrsf = 0;
    this.artprep.stkReel = 0;
    this.artprep.stkRes = 0;
    this.artprep.stkNp = 0; 
    this.ArticleWindow=true ;
    this.lastAdd=this.lastAdd+1;
    console.log(this.lastAdd);
  }else if(this.lastAdd==10){
    this.makeToast11();
  }
}

    saveBonprep() {
      if(this.bonPrepForm.controls.Destination.value==true){
        this.bonPrepForm.patchValue({
          codFrs: this.selectedCodFrs, 
        });
        this.bonPrepForm.patchValue({
          nomprenomCli: null, 
        });
      }else{
        this.bonPrepForm.patchValue({
          codFrs: null, 
        });
      }
      console.log(this.selectedCodFrs);
      console.log(this.bonPrepForm.value);
        this.bonprepService.createBon_prep(this.bonPrepForm.value).subscribe( data =>{
          console.log(data);
        },
        error => console.log(error));
      }

      prixUpdateBP(){
        this.bonprepService.getSumQutByBPach(this.bonPrepForm.controls.numBon.value).subscribe(data => {
          this.QutTotalAch = data;
          this.bonprep.netHt = this.QutTotalAch;
        console.log("netHt:"+this.bonprep.netHt);
      });
      this.bonprepService.getSumQutByBPht(this.bonPrepForm.controls.numBon.value).subscribe(data3 => {
        this.QutTotalHt = data3;
        this.bonprep.brutHt =  this.QutTotalHt;
        
      
        console.log("brutHt:"+this.bonprep.brutHt);

              
      
        this.bonprepService.getSumQutByBPAREM(this.bonPrepForm.controls.numBon.value).subscribe(data2 => {
          this.QutTotalArem = data2;
          this.bonprep.totTtc =  this.QutTotalArem;
          console.log("totTtc:"+this.bonprep.totTtc);
          
        
        
              this.bonprepService.updateBonPrepPrix(this.bonPrepForm.controls.numBon.value,this.bonprep).subscribe( data =>{ 
                this.bonprep.totTtc =  this.QutTotalArem;
                this.bonprep.brutHt =  this.QutTotalHt;
                console.log(data);
              },
              error => console.log(error));

            });
          }); 
      }
/** toaster show start */
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

/***Stock functions */


/***End Stock functions */
/** add drop lists */
public getAllStockByArticle(itemsArticle :any) {
  if(itemsArticle && itemsArticle!='0'){
    this.articleService.getArticle(itemsArticle).subscribe(data => {
      this.ArticleGeted = data;
      console.log(this.ArticleGeted);
    });

    this.bonprepService.getAllStockByArticle(itemsArticle).subscribe(data => {
      this.StockListWithArticle = data;
    });

  }
}

public getExpideOfAdd() {
  this.bonprepService.getExpideOfAdd().subscribe(data => {
    this.ExpideList = data;
  });
}

public getArticleOfAdd() {
  this.bonprepService.getArticleOfAdd().subscribe(data => {
    this.ArticleList = data;
  });
}

public getAchatOfAdd() {
  this.bonprepService.getAchatOfAdd().subscribe(data => {
    this.AchatList = data;
  });
}

public getFournissList() {
  this.fournisService.getFournissList().subscribe(data => {
    this.FournisList = data;
  });
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
galery: any;
togglepreviewPhotoArticle(){
  this.previewPhotoArticle = !this.previewPhotoArticle;
}
togglepreviewPhotoAllArticle(){
  this.previewPhotoAllArticle = !this.previewPhotoAllArticle;
}

/** end Show image article */
public count = 1;
getCount() {
  return this.count
}
incCount(){
  this.count += 1;
}

  //function to return list of numbers from 0 to n-1 
  numSequence(n: number): Array<number> { 
    return Array(n); 
  } 
  qutStk:number;

/**aaaaaaaaaaaaaaaaaaaaaaaaa */






disableFrsDropdown: boolean;

onSelectionChanged(value) {
  console.log(value);
  if (value === 'false') {
    this.disableFrsDropdown = true;
    this.bonPrepForm.get('nomprenomCli').enable();
  } else {
    this.bonPrepForm.get('nomprenomCli').disable();
    this.disableFrsDropdown = false;
  }
}





/** add of a chariot to the bon sortie */
chariot: Chariot = new Chariot();
ChariotArticleForm: FormGroup;
ListArtPrepForChariot: Art_Prep[];
PreparateurList0: Utilisateur[];
ChariotList: Chariot[];
ArticlesPrep: Article = new Article();
ZoneArticle0: string[];
ChariotWindow: boolean;
centerAdd0:any;
SelectZoneChoix0:any;
preparateurAdd0:any;
numCharAdd0:any;

public getListArtPrepForChariot() {
  this.bonprepService.getArtPrepForBonPrep(this.bonPrepForm.controls.numBon.value).subscribe(data => {
    this.ListArtPrepForChariot = data;
    console.log(this.ListArtPrepForChariot);
  });
}
public getListChariot() {
  this.chariotService.getChariotsList().subscribe(data => {
    this.ChariotList = data;
    console.log(this.ChariotList);
  });
}

isDisabled0:boolean=true;

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
    console.log(this.artprep);
    console.log(event);
    console.log(this.preparateurAdd0);
    console.log(this.SnumCharAdd0);
    console.log(this.centerAdd0);
    this.artprep.prepara=this.preparateurAdd0;
    this.artprep.artprep_chariot=this.SnumCharAdd0;
    this.artprep.centre=this.centerAdd0;
    this.bonprepService.UpdateArtPrep(event,this.artprep).subscribe(data => {
      this.artprep.prepara=this.preparateurAdd0;
      this.artprep.artprep_chariot=this.SnumCharAdd0;
      this.artprep.centre=this.centerAdd0;
      console.log(data);
    }, error => console.log(error));
    this.isDisabled0 = !this.isDisabled0;
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
  if(this.NbrTest1==4){
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
  if(this.NbrTest1==4){
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
  if(this.NbrTest1==4){
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
  if(this.NbrTest1==4){
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
    console.log(this.artprep);
    console.log(event);
    console.log(this.preparateurAdd1);
    console.log(this.SnumCharAdd1);
    console.log(this.centerAdd1);
    this.artprep.prepara=this.preparateurAdd1;
    this.artprep.artprep_chariot=this.SnumCharAdd1;
    this.artprep.centre=this.centerAdd1;
    this.bonprepService.UpdateArtPrep(event,this.artprep).subscribe(data => {
      this.artprep.prepara=this.preparateurAdd1;
      this.artprep.artprep_chariot=this.SnumCharAdd1;
      this.artprep.centre=this.centerAdd1;
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
    console.log(this.artprep);
    console.log(event);
    console.log(this.preparateurAdd2);
    console.log(this.SnumCharAdd2);
    console.log(this.centerAdd2);
    this.artprep.prepara=this.preparateurAdd2;
    this.artprep.artprep_chariot=this.SnumCharAdd2;
    this.artprep.centre=this.centerAdd2;
    this.bonprepService.UpdateArtPrep(event,this.artprep).subscribe(data => {
      this.artprep.prepara=this.preparateurAdd2;
      this.artprep.artprep_chariot=this.SnumCharAdd2;
      this.artprep.centre=this.centerAdd2;
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
    console.log(this.artprep);
    console.log(event);
    console.log(this.preparateurAdd3);
    console.log(this.SnumCharAdd3);
    console.log(this.centerAdd3);
    this.artprep.prepara=this.preparateurAdd3;
    this.artprep.artprep_chariot=this.SnumCharAdd3;
    this.artprep.centre=this.centerAdd3;
    this.bonprepService.UpdateArtPrep(event,this.artprep).subscribe(data => {
      this.artprep.prepara=this.preparateurAdd3;
      this.artprep.artprep_chariot=this.SnumCharAdd3;
      this.artprep.centre=this.centerAdd3;
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
    console.log(this.artprep);
    console.log(event);
    console.log(this.preparateurAdd4);
    console.log(this.SnumCharAdd4);
    console.log(this.centerAdd4);
    this.artprep.prepara=this.preparateurAdd4;
    this.artprep.artprep_chariot=this.SnumCharAdd4;
    this.artprep.centre=this.centerAdd4;
    this.bonprepService.UpdateArtPrep(event,this.artprep).subscribe(data => {
      this.artprep.prepara=this.preparateurAdd4;
      this.artprep.artprep_chariot=this.SnumCharAdd4;
      this.artprep.centre=this.centerAdd4;
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
    console.log(this.artprep);
    console.log(event);
    console.log(this.preparateurAdd5);
    console.log(this.SnumCharAdd5);
    console.log(this.centerAdd5);
    this.artprep.prepara=this.preparateurAdd5;
    this.artprep.artprep_chariot=this.SnumCharAdd5;
    this.artprep.centre=this.centerAdd5;
    this.bonprepService.UpdateArtPrep(event,this.artprep).subscribe(data => {
      this.artprep.prepara=this.preparateurAdd5;
      this.artprep.artprep_chariot=this.SnumCharAdd5;
      this.artprep.centre=this.centerAdd5;
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
    console.log(this.artprep);
    console.log(event);
    console.log(this.preparateurAdd6);
    console.log(this.SnumCharAdd6);
    console.log(this.centerAdd6);
    this.artprep.prepara=this.preparateurAdd6;
    this.artprep.artprep_chariot=this.SnumCharAdd6;
    this.artprep.centre=this.centerAdd6;
    this.bonprepService.UpdateArtPrep(event,this.artprep).subscribe(data => {
      this.artprep.prepara=this.preparateurAdd6;
      this.artprep.artprep_chariot=this.SnumCharAdd6;
      this.artprep.centre=this.centerAdd6;
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
    console.log(this.artprep);
    console.log(event);
    console.log(this.preparateurAdd7);
    console.log(this.SnumCharAdd7);
    console.log(this.centerAdd7);
    this.artprep.prepara=this.preparateurAdd7;
    this.artprep.artprep_chariot=this.SnumCharAdd7;
    this.artprep.centre=this.centerAdd7;
    this.bonprepService.UpdateArtPrep(event,this.artprep).subscribe(data => {
      this.artprep.prepara=this.preparateurAdd7;
      this.artprep.artprep_chariot=this.SnumCharAdd7;
      this.artprep.centre=this.centerAdd7;
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
    console.log(this.artprep);
    console.log(event);
    console.log(this.preparateurAdd8);
    console.log(this.SnumCharAdd8);
    console.log(this.centerAdd8);
    this.artprep.prepara=this.preparateurAdd8;
    this.artprep.artprep_chariot=this.SnumCharAdd8;
    this.artprep.centre=this.centerAdd8;
    this.bonprepService.UpdateArtPrep(event,this.artprep).subscribe(data => {
      this.artprep.prepara=this.preparateurAdd8;
      this.artprep.artprep_chariot=this.SnumCharAdd8;
      this.artprep.centre=this.centerAdd8;
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
    console.log(this.artprep);
    console.log(event);
    console.log(this.preparateurAdd9);
    console.log(this.SnumCharAdd9);
    console.log(this.centerAdd9);
    this.artprep.prepara=this.preparateurAdd9;
    this.artprep.artprep_chariot=this.SnumCharAdd9;
    this.artprep.centre=this.centerAdd9;
    this.bonprepService.UpdateArtPrep(event,this.artprep).subscribe(data => {
      this.artprep.prepara=this.preparateurAdd9;
      this.artprep.artprep_chariot=this.SnumCharAdd9;
      this.artprep.centre=this.centerAdd9;
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
    console.log(this.artprep);
    console.log(event);
    console.log(this.preparateurAdd10);
    console.log(this.SnumCharAdd10);
    console.log(this.centerAdd10);
    this.artprep.prepara=this.preparateurAdd10;
    this.artprep.artprep_chariot=this.SnumCharAdd10;
    this.artprep.centre=this.centerAdd10;
    this.bonprepService.UpdateArtPrep(event,this.artprep).subscribe(data => {
      this.artprep.prepara=this.preparateurAdd10;
      this.artprep.artprep_chariot=this.SnumCharAdd10;
      this.artprep.centre=this.centerAdd10;
      console.log(data);
    }, error => console.log(error));
    this.isDisabled10 = !this.isDisabled10;
  }
}

/** end liste 10  Fil chariot window   ( ) */
onSubmitChariotArticle(){
  this.gotoListBonprep();
}
/** end add of a chariot to the bon sortie */


ModelFromMarque:Model[];

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
    return this.artprep.typArt=this.value1+", Model:"+itemsModel.title;
  }
  value1:String;
  MarqueSelected(itemsMarque:any){
    return this.value1="Marque:"+itemsMarque.title;
  }
}
