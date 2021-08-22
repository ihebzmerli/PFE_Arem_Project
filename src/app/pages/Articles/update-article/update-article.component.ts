import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { DateFormatter } from 'ngx-bootstrap/datepicker';
import { delay } from 'rxjs/operators';
import { Fournis } from '../../Fourniss/fournis';
import { FournisService } from '../../Fourniss/fournis.service';
import { UtilisateurService } from '../../Utilisateurs/utilisateur.service';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { Marque } from '../../Marques/marque';
import { Model } from '../../Model/model';
import { MarqueService } from '../../Marques/marque.service';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss']
})
export class UpdateArticleComponent implements OnInit {
  articleForm: FormGroup;
  submitted = false;
  FournisList: Fournis[];
  slectedCodFrs: Fournis[];
  MarqueList: Marque[];
  selectedMarque: any;
  article: Article = new Article();
  codArt: string;
  nature: any;
  poste: any;

  constructor(private authService: TokenStorageService,private utilisateurService: UtilisateurService,private marqueService: MarqueService ,private fournisService:FournisService,private articleService: ArticleService ,private toastrService: NbToastrService,private formBuilder: FormBuilder,public datepipe: DatePipe,private route: ActivatedRoute,private router: Router) { }
  myFormattedDate;
  datz;
  
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  ngOnInit() {
    this.getFournissList();
    this.getAllMarquesList();
    this.article = new Article();

    this.codArt = this.route.snapshot.params['codArt'];
    
    this.articleService.getArticle(this.codArt)
      .subscribe(data => {
        console.log(data)
        this.article = data;

        if(this.article.derAch!=null){
          this.article.derAch=new Date(this.article.derAch.toLocaleString());
          this.article.derAch.setMinutes( this.article.derAch.getMinutes() + this.article.derAch.getTimezoneOffset());
          }else{
            this.article.derAch=null;
          }
          if(this.article.derMvt!=null){
            this.article.derMvt=new Date(this.article.derMvt.toLocaleString());
            this.article.derMvt.setMinutes( this.article.derMvt.getMinutes() + this.article.derMvt.getTimezoneOffset());
            }else{
              this.article.derMvt=null;
            }
            if(this.article.datRup!=null){
              this.article.datRup=new Date(this.article.datRup.toLocaleString());
              this.article.datRup.setMinutes( this.article.datRup.getMinutes() + this.article.datRup.getTimezoneOffset());
              }else{
                this.article.datRup=null;
              }
              if(this.article.datPAch!=null){
                this.article.datPAch=new Date(this.article.datPAch.toLocaleString());
                this.article.datPAch.setMinutes( this.article.datPAch.getMinutes() + this.article.datPAch.getTimezoneOffset());
                }else{
                  this.article.datPAch=null;
                }
                if(this.article.datCreat!=null){
                  this.article.datCreat=new Date(this.article.datCreat.toLocaleString());
                  this.article.datCreat.setMinutes( this.article.datCreat.getMinutes() + this.article.datCreat.getTimezoneOffset());
                  }else{
                    this.article.datCreat=null;
                  }
      }, error => console.log(error));
  const now = Date.now();
  this.myFormattedDate = this.datepipe.transform(now, 'short');


  }

  async onSubmitArticle() {
    this.updateArticle();
    await this.showModalDialogBarProgression();
    this.makeToast(); 
    this.article_list();
  }

  updateArticle(){    
    if(this.article.derAch!=null){
      this.article.derAch.setDate(this.article.derAch.getDate() + 1);
    }else{
      this.article.derAch=null ;
    }
    if(this.article.datRup!=null){
      this.article.datRup.setDate(this.article.datRup.getDate() + 1);
    }else{
      this.article.datRup=null ;
    } 
    if(this.article.datPAch!=null){
      this.article.datPAch.setDate(this.article.datPAch.getDate() + 1);
    }else{
      this.article.datPAch=null ;
    }
    this.articleService.updateChangeAllArticle(this.codArt,this.article).subscribe(data => {
      this.article = new Article();
      this.article.derMvt = new Date();
    }, error => console.log(error));
}
article_list(){
    this.router.navigate(['//pages/Articles/article-list']);
  }
  onReset() {
    this.submitted = false;
    this.articleForm.reset();
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

title = 'La modification faite avec succée!';
content = `Article a été modifier!`;

status2: NbComponentStatus = 'danger';

title2 = 'La modification n est pas faite avec succée!';
content2 = `Erreur de modification!`;

status3: NbComponentStatus = 'warning';

title3 = 'La modification n est pas faite stk est vide!';
content3 = `La modification n'a rien changé!`;

status5: NbComponentStatus = 'info';

title5 = 'L addition est en cours !';
content5 = `Veuillez attendre le traitement des données!`;
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
makeToast5() {
  this.showToast(this.status5, this.title5, this.content5);
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
ModelArticleList: Model[];
public getFournissList() {
  this.fournisService.getFournissList().subscribe(data => {
    this.FournisList = data;
  });
}
public getMarquesList() {
  this.articleService.getMarquesList().subscribe(data => {
    this.MarqueList = data;
  });
}
public getArticleModelByMarque(itemsMarque :Marque) {  
  if(itemsMarque){
    this.articleService.getAllModelsList().subscribe(data => {
      this.ModelArticleList = data;
      this.ModelArticleList.find(Model => Model.marque.id.toString().toLowerCase().startsWith(itemsMarque.id.toString().toLowerCase()))
    });
  }
}
MarqueSelected:String;
ModelSelected:String;
ModelFromMarque:Model[];
public getAllMarquesList() {
  this.marqueService.getMarquesList().subscribe(data => {
    this.MarqueList = data;
    console.log(this.MarqueList);
  });
}
public getModeleFromMarque(itemsMarquee :any) {

  console.log(itemsMarquee.id);    
  this.articleService.getAllModelByMarque(itemsMarquee.id).subscribe(data => {
    this.ModelFromMarque = data;
    console.log(data);
  });
}
}