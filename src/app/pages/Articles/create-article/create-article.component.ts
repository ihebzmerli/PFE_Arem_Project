import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDateService, NbDialogService, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import { Console } from 'console';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { MessageService } from 'primeng/api';
import { delay } from 'rxjs/operators';
import { BonLivService } from '../../Bon_Livs/bon-liv.service';
import { Fournis } from '../../Fourniss/fournis';
import { FournisService } from '../../Fourniss/fournis.service';
import { GalleryService } from '../../Gallerys/gallery.service';
import { Article } from '../article';
import { UploadImgArticleDialogComponent } from '../article-list/uploadImg/uploadImg-article-dialog.component';
import { ArticleService } from '../article.service';
import { Marque } from '../../Marques/marque';
import { Model } from '../../Model/model';
import { AddModelDialogComponent } from './windowAjoutModel/add-model-dialog.component';
import { AddMarqueDialogComponent } from './windowAjoutMarque/add-marque-dialog.component';
import { MarqueService } from '../../Marques/marque.service';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
import { UtilisateurService } from '../../Utilisateurs/utilisateur.service';
import { UtilisateurRoutingModule } from '../../Utilisateurs/utilisateur-routing.module';
import { Utilisateur } from '../../Utilisateurs/utilisateur';

@Component({
  selector: 'ngx-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  ArticleGeted: Article;
  FournisList: Fournis[];
  ArticleList: Article [];
  min: Date;
  max: Date;
  articleFormDont: FormGroup;
  article: Article = new Article();
  submitted = false;
  MarqueSelected:String;
  MarqueList: Marque[];
  userPost: Utilisateur;
  authority;
  constructor(private authService: TokenStorageService,private bonlivService:BonLivService,private utilisateurService:UtilisateurService,private formBuilder: FormBuilder,public datepipe: DatePipe,private toastrService: NbToastrService,private marqueService: MarqueService, private articleService: ArticleService,
    private router: Router,private dialogService: NbDialogService,private fournisService:FournisService,protected dateService: NbDateService<Date>,private windowService: NbWindowService) { 
      this.min = this.dateService.addDay(this.dateService.today(), -7);
      this.max = this.dateService.addDay(this.dateService.today(), 7);
    }

  ngOnInit() {
    
    this.getArticles();
    this.getArticleOfAdd();
    this.getFournissList();
    this.getAllMarquesList();
    this.getZone();
    this.authService.getAuthorities().forEach(authority => {
      this.authority=authority.toString();
      console.log(this.authority);
    });

    this.utilisateurService.getIdUserByUsername(this.authService.getUsername()).subscribe(data1 => {
      this.utilisateurService.getUtilisateur(data1.toString()).subscribe(data => {
        this.userPost = data;

    const now = Date.now()

    const myFormattedDate = this.datepipe.transform(now, 'yyyy-MM-dd hh:mm:ss');
    this.article.derMvt = new Date(Date.parse(myFormattedDate));

    const myFormattedDate2 = this.datepipe.transform(now, 'yyyy-MM-dd');
      this.articleFormDont = this.formBuilder.group({
        codArt: ['', Validators.compose([
            Validators.maxLength(19),
            Validators.minLength(5),
            Validators.required,
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9 ]+$')
          ])],
          datCreat: [myFormattedDate2, Validators.required],
          desArt: ['', Validators.compose([
            Validators.maxLength(49),
            Validators.minLength(8),
            Validators.required
          ])],
          refOrg: ['', Validators.compose([
            Validators.maxLength(49),
            Validators.minLength(5),
            Validators.required
          ])],
          refRem: ['', Validators.compose([
            Validators.maxLength(49),
            Validators.minLength(5),
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9 ]+$')
          ])],
          codNgp: ['', Validators.compose([
            Validators.maxLength(49),
            Validators.minLength(5),
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9 ]+$')
          ])],
          marque: [''],
          codFrs: [''],
          numCas: ['', Validators.compose([
            Validators.maxLength(49),
            Validators.minLength(5),
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9 ]+$')
          ])],
          unitVen: ['', Validators.compose([
            Validators.max(2000000),
            Validators.min(0),
            Validators.required,
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          prixMin: ['', Validators.compose([
            Validators.max(2000000),
            Validators.min(0),
            Validators.required,
            Validators.pattern('^[0-9]+(\.[0-9]{1,3})?$')
          ])],
          prixDev: ['', Validators.compose([
            Validators.max(2000000),
            Validators.min(0),
            Validators.required,
            Validators.pattern('^[0-9]+(\.[0-9]{1,3})?$')
          ])],
          derPAch: ['', Validators.compose([
            Validators.max(2000000),
            Validators.min(0),
            Validators.required,
            Validators.pattern('^[0-9]+(\.[0-9]{1,3})?$')
          ])],
          remise: ['', Validators.compose([
            Validators.max(500000),
            Validators.min(0),
            Validators.required,
            Validators.pattern('^[0-9]+(\.[0-9]{1,3})?$')
          ])],
          prixVen: ['', Validators.compose([
            Validators.max(2000000),
            Validators.min(0),
            Validators.required,
            Validators.pattern('^[0-9]+(\.[0-9]{1,3})?$')
          ])],
          prixArem: ['', Validators.compose([
            Validators.max(2000000),
            Validators.min(0),
            Validators.required,
            Validators.pattern('^[0-9]+(\.[0-9]{1,3})?$')
          ])],
          tva: ['', Validators.compose([
            Validators.max(50),
            Validators.min(0),
            Validators.required,
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          cumulVen: ['', Validators.compose([
            Validators.max(50000),
            Validators.min(0),
            Validators.required,
            Validators.pattern('^[0-9]+(\.[0-9]{1,3})?$')
          ])],
          cumulAch: ['', Validators.compose([
            Validators.max(50000),
            Validators.min(0),
            Validators.required,
            Validators.pattern('^[0-9]+(\.[0-9]{1,3})?$')
          ])],
          unitInv: ['', Validators.compose([
            Validators.max(50000),
            Validators.min(0),
            Validators.required,
            Validators.pattern('^[0-9]+(\.[0-9]{1,3})?$')
          ])],
          derAch: ['', Validators.required],
          derMvt: ['', Validators.required],
          classe: ['', Validators.compose([
            Validators.maxLength(50),
            Validators.minLength(1),
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9 ]+$')
          ])],
          typAnal: ['', Validators.compose([
            Validators.maxLength(50),
            Validators.minLength(3),
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9 ]+$')
          ])],
          codBar: [''],
          prixCEur: ['', Validators.compose([
            Validators.max(999999),
            Validators.min(0),
            Validators.required,
            Validators.pattern('^[0-9]+(\.[0-9]{1,3})?$')
          ])],
          prixIni: ['', Validators.compose([
            Validators.max(999999),
            Validators.min(0),
            Validators.required,
            Validators.pattern('^[0-9]+(\.[0-9]{1,3})?$')
          ])],
          centre: ['', Validators.compose([
            Validators.maxLength(49),
            Validators.minLength(4),
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9 ]+$')
          ])],
          derPDev: ['', Validators.compose([
            Validators.max(999999),
            Validators.min(0),
            Validators.required,
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          prixEuro: ['', Validators.compose([
            Validators.maxLength(999999),
            Validators.minLength(0),
            Validators.required,
            Validators.pattern('^[0-9]+(\.[0-9]{1,3})?$')
          ])],
          datRup: ['', Validators.required],
          datPAch: ['', Validators.required],
          qutStk: [0, Validators.compose([
            Validators.max(99999),
            Validators.min(0),
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          qutStk2: [0, Validators.compose([
            Validators.max(99999),
            Validators.min(0),
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          stkGar: [0, Validators.compose([
            Validators.max(99999),
            Validators.min(0),
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          stkIni: [0, Validators.compose([
            Validators.max(99999),
            Validators.min(0),
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          analStk: [0, Validators.compose([
            Validators.max(99999),
            Validators.min(0),
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          nbjStk: [0, Validators.compose([
            Validators.max(99999),
            Validators.min(0),
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          vSstk: [0, Validators.compose([
            Validators.max(99999),
            Validators.min(0),
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          comStk: [0, Validators.compose([
            Validators.max(99999),
            Validators.min(0),
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          xanalStk: [0, Validators.compose([
            Validators.max(99999),
            Validators.min(0),
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          stkAtrsf: [0, Validators.compose([
            Validators.max(99999),
            Validators.min(0),
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          stkTrsf: [0, Validators.compose([
            Validators.max(99999),
            Validators.min(0),
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          stkNp: [0, Validators.compose([
            Validators.max(99999),
            Validators.min(0),
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          stkRes: [0, Validators.compose([
            Validators.max(99999),
            Validators.min(0),
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          stkReel: [0, Validators.compose([
            Validators.max(99999),
            Validators.min(0),
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          controle: ['', Validators.compose([
            Validators.maxLength(49),
            Validators.minLength(4),
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9 ]+$')
          ])],
          model: [''],
          energie: ['', Validators.compose([
            Validators.maxLength(49),
            Validators.minLength(4),
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9 ]+$')
          ])],
          poids: ['', Validators.compose([
            Validators.maxLength(999999),
            Validators.minLength(0),
            Validators.pattern('^(0|[1-9][0-9]*)$')
          ])],
          poste: [this.userPost.firstname+' '+this.userPost.lastname],
          specific: [''],
          zone:['']
        });

      }, error => console.log(error));
    }, error => console.log(error));
  }

  // convenience getter for easy access to form fields
  get f1() { return this.articleFormDont.controls; }
  articles: Article[];
  private getArticles() {
    this.articleService.getArticlesList().subscribe(data => {
      this.articles = data;
      console.log(this.articles);
    });
  }
  
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  async onSubmitArticle() {
    this.submitted = true;
    console.log(this.articleFormDont.invalid.valueOf)
    // stop here if form is invalid
    if (this.articleFormDont.invalid) {
      this.makeToast2();
      delay(4000);
        return;
    }
    var target=this.articles.find(temp=>temp.codArt==this.articleFormDont.controls.codArt.value)
    if(target){
      return this.makeToast3();
    }else {      
    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.articleFormDont.value, null, 4));
    this.saveArticle();
    await this.showModalDialogBarProgression();
    delay(750);
    this.makeToast(); 
    this.gotoListArticle();
    }
  }

  //IF ARticle Existe
  async onSubmitArticleExist() { 
    if((this.article.qutStk== 0 || this.article.qutStk==null) && (this.article.qutStk2 == 0 || this.article.qutStk2==null) && (this.article.stkGar == 0 || this.article.stkGar==null) && (this.article.stkIni == 0 || this.article.stkIni==null) &&
    (this.article.analStk == 0 || this.article.analStk==null) && (this.article.nbjStk == 0 || this.article.nbjStk==null) && (this.article.vSstk == 0 || this.article.vSstk==null) && (this.article.comStk == 0 || this.article.comStk==null) &&
     (this.article.xanalStk == 0 || this.article.xanalStk==null) && (this.article.stkAtrsf == 0 || this.article.stkAtrsf==null)
     && (this.article.stkTrsf == 0 || this.article.stkTrsf==null) && (this.article.stkReel == 0 || this.article.stkReel==null) && (this.article.stkRes == 0 || this.article.stkRes==null) && (this.article.stkNp == 0 || this.article.stkNp==null)){
       return this.makeToast4();
     }else if(!this.article.marque || !this.article.codArt || !this.article.model){
       return this.makeToast2();
     } else {
     await this.delay(1000);
    this.saveArticleExiste();
    await this.showModalDialogBarProgression();
    delay(750);
    this.makeToast(); 
    this.gotoListArticle();
    }
  }

  async onResetArticleFormExist() {

    if((this.article.qutStk== 0 || this.article.qutStk==null) && (this.article.qutStk2 == 0 || this.article.qutStk2==null) && (this.article.stkGar == 0 || this.article.stkGar==null) && (this.article.stkIni == 0 || this.article.stkIni==null) &&
    (this.article.analStk == 0 || this.article.analStk==null) && (this.article.nbjStk == 0 || this.article.nbjStk==null) && (this.article.vSstk == 0 || this.article.vSstk==null) && (this.article.comStk == 0 || this.article.comStk==null) &&
     (this.article.xanalStk == 0 || this.article.xanalStk==null) && (this.article.stkAtrsf == 0 || this.article.stkAtrsf==null)
     && (this.article.stkTrsf == 0 || this.article.stkTrsf==null) && (this.article.stkReel == 0 || this.article.stkReel==null) && (this.article.stkRes == 0 || this.article.stkRes==null) && (this.article.stkNp == 0 || this.article.stkNp==null)){
       return this.makeToast4();
     }else if(!this.article.marque || !this.article.codArt || !this.article.model){
       return this.makeToast2();
     } else {
     await this.delay(1000);
     this.saveArticleExiste();
     await this.showModalDialogBarProgression();
     this.makeToast()
     this.delay(1500);
     this.article.codArt= "0";
     this.article.model.code= "0";
     this.article.marque.code= "0";
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
}
}
/** test verification des input */

resetMePlz(){
  this.article.codArt= "0";
  this.article.model.code= "0";
  this.article.marque.code= "0";
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
}

ResetForm(){
  this.articleService.dataForm.reset();
}
/** end test verification des input*/
  saveArticleExiste(){
    if(!this.article.qutStk || this.article.qutStk == 0){
      this.article.qutStk === 0;
    }
    if(!this.article.qutStk2 || this.article.qutStk2 == 0){
      this.article.qutStk2 === 0;
    }
    if(!this.article.stkGar || this.article.stkGar == 0){
      this.article.stkGar === 0;
    }
    if(!this.article.stkIni || this.article.stkIni == 0){
      this.article.stkIni === 0;
    }
    if(!this.article.analStk || this.article.analStk == 0){
      this.article.analStk === 0;
    }
    if(!this.article.nbjStk || this.article.nbjStk == 0){
      this.article.nbjStk === 0;
    }
    if(!this.article.vSstk || this.article.vSstk == 0){
      this.article.vSstk === 0;
    }
    if(!this.article.comStk || this.article.comStk == 0){
      this.article.comStk === 0;
    } 
    if(!this.article.xanalStk || this.article.xanalStk == 0){
      this.article.xanalStk === 0;
    }
    if(!this.article.stkAtrsf || this.article.stkAtrsf == 0){
      this.article.stkAtrsf === 0;
    }
    if(!this.article.stkTrsf || this.article.stkTrsf == 0){
      this.article.stkTrsf === 0;
    }
    if(!this.article.stkReel || this.article.stkReel == 0){
      this.article.stkReel === 0;
    }
    if(!this.article.stkRes || this.article.stkRes == 0){
      this.article.stkRes === 0;
    }
    if(!this.article.stkNp || this.article.stkNp == 0){
      this.article.stkNp === 0;
    }
    console.log(this.article)
    this.articleService.UpdateStkArticle(this.article.codArt,this.article).subscribe( data =>{
      console.log(data);
    },
    error => console.log(error));
  }

  gotoListArticle() {
    this.router.navigate(['//pages/Articles/article-list']);
  }

  saveArticle(){
    this.articleFormDont.patchValue({
      marque: this.MarqueSelected,
    });
     const formData = new FormData();
     const article = this.articleFormDont.value;
     formData.append('article',JSON.stringify(article));
     formData.append('file',this.userFile);
    this.articleService.createArticle2(formData).subscribe( data =>{
      console.log(data);
    },
    error => console.log(error));
  }
/**cantrolle saisir  */

    
formOption_Existe = new FormGroup({
  Option_Existe: new FormControl('exist', Validators.required)
});

/** end cantrolle saisir  */

get f(){
  return this.formOption_Existe.controls;
}

submit(){
  console.log(this.f.Option_Existe.value);
  console.log(this.f.Option_Existe.value);

  if(this.f.Option_Existe.value == true){
    console.log("aaaaaaaaa");
  }else if(this.f.Option_Existe.value == false){
    console.log("bbbbbbbbbb");
  }
}

dateSave:Date;
onReset(){
  this.submitted = false;
  this.dateSave=this.articleFormDont.controls.datCreat.value;
  this.articleFormDont.reset()
  this.articleFormDont.get('datCreat').setValue(this.dateSave);
}



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
content = `L'\Article est ajouter!`;

status2: NbComponentStatus = 'danger';

title2 = 'HI there!';
content2 = `Erreur de saisir!`;

status3: NbComponentStatus = 'warning';

title3 = 'L addition n est pas faite Article exist!';
content3 = `saisir n'est pas comptet!`;

status4: NbComponentStatus = 'warning';

title4 = 'L addition n est pas faite stk est vide!';
content4 = `saisir n'est pas comptet!`;

status5: NbComponentStatus = 'info';

title5 = 'L addition est en cours !';
content5 = `Veuillez attendre le traitement des données!`;

status6: NbComponentStatus = 'warning';

title6 = 'Image doit etre de type png,jpg,jpeg!';
content6 = `Fichier de type eronée!`;

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

/**toaster show start */ 


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
ArticleListWithMarque: Article[];
StockListWithArticle: any[] = [];
ModelFromMarque:Model[];
public getAllStockByArticle(itemsArticle :any) {
  console.log(itemsArticle);  
  if(itemsArticle!=0){
    this.articleService.getArticle(itemsArticle).subscribe(data => {
      this.ArticleGeted = data;
      console.log("babab")
      console.log(this.ArticleGeted);
    });
  }
  if(itemsArticle!=0){
    this.bonlivService.getAllStockByArticle(itemsArticle).subscribe(data => {
      this.StockListWithArticle = data;
      console.log(data);
      console.log("gaga")
    });
  }
}
public getArticleOfFromMarqueAddForBonLiv(itemsModel :any) {
  console.log(itemsModel);
  if(itemsModel!=0){
    this.bonlivService.getArticleOfFromMarqueAddForBonLiv(itemsModel.id).subscribe(data => {
      this.ArticleListWithMarque = data;
      console.log(this.ArticleListWithMarque);
      });
    }
}

public getFournissList() {
  this.fournisService.getFournissList().subscribe(data => {
    this.FournisList = data;
  });
}
public getArticleOfAdd() {
  this.bonlivService.getArticleOfAdd().subscribe(data => {
    this.ArticleList = data;
  });
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
zoneList:Article[];
public getZone() {
this.articleService.getArticlesList().subscribe(data => {
  const result = [];
  result.push(data[0]);
  data.reduce( (first,second, n) => {
    if(first.zone !== second.zone){
      result.push(second);
    }
    return second
  })
  console.log(result);
  this.zoneList = result;
});
}
/**Show image article */

previewPhotoArticle = false;
previewPhotoAllArticle = false;
selected = null;
galery: any;
togglepreviewPhotoArticle(){
  this.previewPhotoArticle = !this.previewPhotoArticle;
}
togglepreviewPhotoAllArticle(){
  this.previewPhotoAllArticle = !this.previewPhotoAllArticle;
  console.log("bbbb")
}
/** end Show image article */



/**upload image article */
userFile;
imgURL: any;
public imagePath;
onSelectFile(event){
if(event.target.files.length > 0){
  const file =event.target.files[0];
  this.userFile =file;

  var mimeType = event.target.files[0].type;
  if(mimeType.match(/image\/jpeg/) === null && mimeType.match(/image\/png/) === null){
    this.makeToast6();
  }else{

    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
}


}


/** end upload image article */


  /* ajout marque popap*/
  OpenUploadMarquePopap() {
    this.dialogService.open(AddMarqueDialogComponent, {
      context: {
        title: null,
      },
    });
  }
  
  OpenUploadModelPopap(itemsMarquee :any) {
    this.dialogService.open(AddModelDialogComponent, {
      context: {
        title: null,
      },
    });
    this.getModeleFromMarque(itemsMarquee);
  }
/* upload marque popap **/  




/***calcule sum */
sumArticles:number;
sumAllArticles:number;
CalculeValueSum(){
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
  this.sumArticles = this.article.qutStk+this.article.qutStk2+this.article.stkGar+this.article.stkIni+this.article.analStk+
  this.article.nbjStk+this.article.vSstk+this.article.comStk+this.article.xanalStk+this.article.stkAtrsf+this.article.stkTrsf+
  this.article.stkReel+this.article.stkRes+this.article.stkNp;

  if(!this.ArticleGeted){
    this.sumAllArticles=0;
    console.log(this.sumAllArticles);
  }else{
    this.sumAllArticles=this.sumArticles*this.ArticleGeted.prixVen;
    console.log(this.sumAllArticles);
  }
}

/***end calcule sum */

/***calcule sum DON T Exist */
sumArticlesDont1:number;
sumAllArticlesDont1:number;
CalculeValueSumDont(){
  if(this.articleFormDont.controls.qutStk.value==null || !this.articleFormDont.controls.qutStk.value|| this.articleFormDont.controls.qutStk.value == 0){
    this.articleFormDont.patchValue({
      qutStk: 0,
    });
  }
  if(this.articleFormDont.controls.qutStk2.value==null || !this.articleFormDont.controls.qutStk2.value || this.articleFormDont.controls.qutStk2.value == 0){
    this.articleFormDont.patchValue({
      qutStk2: 0,
    });
  }
  if(this.articleFormDont.controls.stkGar.value==null || !this.articleFormDont.controls.stkGar.value || this.articleFormDont.controls.stkGar.value == 0){
    this.articleFormDont.patchValue({
      stkGar: 0,
    });
  }
  if(this.articleFormDont.controls.stkIni.value==null || !this.articleFormDont.controls.stkIni.value || this.articleFormDont.controls.stkIni.value == 0){
    this.articleFormDont.patchValue({
      stkIni: 0,
    });
  }
  if(this.articleFormDont.controls.analStk.value==null || !this.articleFormDont.controls.analStk.value || this.articleFormDont.controls.analStk.value == 0){
    this.articleFormDont.patchValue({
      analStk: 0,
    });
  }
  if(this.articleFormDont.controls.nbjStk.value==null || !this.articleFormDont.controls.nbjStk.value || this.articleFormDont.controls.nbjStk.value == 0){
    this.articleFormDont.patchValue({
      nbjStk: 0,
    });
  }
  if(this.articleFormDont.controls.vSstk.value==null || !this.articleFormDont.controls.vSstk.value || this.articleFormDont.controls.vSstk.value == 0){
    this.articleFormDont.patchValue({
      vSstk: 0,
    });
  }
  if(this.articleFormDont.controls.comStk.value==null || !this.articleFormDont.controls.comStk.value || this.articleFormDont.controls.comStk.value == 0){
    this.articleFormDont.patchValue({
      comStk: 0,
    });
  }
  if(this.articleFormDont.controls.xanalStk.value==null || !this.articleFormDont.controls.xanalStk.value || this.articleFormDont.controls.xanalStk.value == 0){
    this.articleFormDont.patchValue({
      xanalStk: 0,
    });
  }
  if(this.articleFormDont.controls.stkAtrsf.value==null || !this.articleFormDont.controls.stkAtrsf.value || this.articleFormDont.controls.stkAtrsf.value == 0){
    this.articleFormDont.patchValue({
      stkAtrsf: 0,
    });
  }
  if(this.articleFormDont.controls.stkTrsf.value==null || !this.articleFormDont.controls.stkTrsf.value || this.articleFormDont.controls.stkTrsf.value == 0){
    this.articleFormDont.patchValue({
      stkTrsf: 0,
    });
  }
  if(this.articleFormDont.controls.stkReel.value==null || !this.articleFormDont.controls.stkReel.value || this.articleFormDont.controls.stkReel.value == 0){
    this.articleFormDont.patchValue({
      stkReel: 0,
    });
  }
  if(this.articleFormDont.controls.stkRes.value==null || !this.articleFormDont.controls.stkRes.value || this.articleFormDont.controls.stkRes.value == 0){
    this.articleFormDont.patchValue({
      stkRes: 0,
    });
  }
  if(this.articleFormDont.controls.stkNp.value==null || !this.articleFormDont.controls.stkNp.value || this.articleFormDont.controls.stkNp.value == 0){
    this.articleFormDont.patchValue({
      stkNp: 0,
    });
  }

  this.sumArticlesDont1 = this.articleFormDont.controls.qutStk.value+this.articleFormDont.controls.qutStk2.value+this.articleFormDont.controls.stkGar.value+this.articleFormDont.controls.stkIni.value+this.articleFormDont.controls.analStk.value+
  this.articleFormDont.controls.nbjStk.value+this.articleFormDont.controls.vSstk.value+this.articleFormDont.controls.comStk.value+this.articleFormDont.controls.xanalStk.value+this.articleFormDont.controls.stkAtrsf.value+this.articleFormDont.controls.stkTrsf.value+
  this.articleFormDont.controls.stkReel.value+this.articleFormDont.controls.stkRes.value+this.articleFormDont.controls.stkNp.value;

  if(!this.articleFormDont.controls.prixVen.value){
    this.sumAllArticlesDont1=0;
  }else{
    this.sumAllArticlesDont1=this.sumArticlesDont1*this.articleFormDont.controls.prixVen.value;
  }
}

/***end calcule sum DON T Exist */
}
