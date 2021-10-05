import { Component, OnInit, Input } from '@angular/core';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbSortDirection, NbSortRequest, NbToastrConfig, NbToastrService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Bon_prep } from '../bon-prep';
import { BonPrepService } from '../bon-prep.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { Table } from 'primeng/table';
import { UtilisateurService } from '../../Utilisateurs/utilisateur.service';
import { ChariotService } from '../../Chariots/chariot.service';
import { Chariot } from '../../Chariots/chariot';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
import { ArticleService } from '../../Articles/article.service';
import { Article } from '../../Articles/article';
import { Art_Prep } from '../Art_Preps/art-prep';
import { MarqueService } from '../../Marques/marque.service';

@Component({
  selector: 'ngx-bon-prep-detail',
  templateUrl: './bon-prep-detail.component.html',
  styleUrls: ['./bon-prep-detail.component.scss']
})
export class BonPrepDetailComponent implements OnInit {
  bonprep:Bon_prep;
  artpreps:any[] = [];
  bonpreps: any[] = [];
  users: Utilisateur[];
  numBon: string;
  statuses: any[];
  statusessNonTrouve: any[];
  loading: boolean = true;

  activityValues: number[] = [0, 100];
  agentsPrep:Utilisateur[];
  agentsPrepDispatching:Utilisateur[];
  agentsPointage:Utilisateur[];
  listChariot:Chariot[];

  userPost: Utilisateur;
  buttonShowPointage:boolean=false;
  buttonShowPreparateur:boolean=false;
  codBar:string="";
  codArtPrep:string="";
  authority;
  statusess: NbComponentStatus[] = ['primary', 'success', 'info', 'warning', 'danger'  ];
  shapes: NbComponentShape[] = [ 'rectangle', 'semi-round', 'round' ];
  sizes: NbComponentSize[] = ['tiny', 'small', 'medium', 'large', 'giant'];

  constructor(private authService: TokenStorageService, private toastrService: NbToastrService,private bonprepService: BonPrepService , private router : Router,private _Activatedroute :ActivatedRoute
    ,private utilisateurService:UtilisateurService, private marqueService : MarqueService,private chariotService:ChariotService,private articleService:ArticleService) { }

  ngOnInit() {
    this.authService.getAuthorities().forEach(authority => {
      this.authority=authority.toString();
      console.log(this.authority);
    });

    this.bonprep = new Bon_prep();

    this.numBon = this._Activatedroute.snapshot.params['numBon'];
  
    this.bonprepService.getArtPrepForBonPrep(this.numBon).subscribe(data => {
      this.artpreps = data;

      this.utilisateurService.getIdUserByUsername(this.authService.getUsername()).subscribe(data1 => {
        this.utilisateurService.getUtilisateur(data1.toString()).subscribe(data => {
          this.userPost = data;
          this.showModalDialogPointeur();
          console.log(this.userPost.firstname);
          console.log(this.userPost.firstname==this.lat1);
        if(this.userPost.firstname==this.lat1 || this.userPost.firstname==this.lat2 || this.userPost.firstname==this.lat3 || this.userPost.firstname==this.lat4
          || this.userPost.firstname==this.lat5 || this.userPost.firstname==this.lat6){
            this.buttonShowPointage=true;
            console.log(this.buttonShowPointage);
        }
        }, error => console.log(error));
      }, error => console.log(error));


      this.loading = false;
      console.log(data)
    });
        
    this.bonprepService.getBon_prep(this.numBon).subscribe(data => {
      this.bonprep = data;
    });



    this.statusessNonTrouve=[
      {label: 'Pas mentionné', value: 'null'},
      {label: 'nonTrouve', value: 'true'},
      {label: 'Trouve', value: 'false'}
    ]
    this.chariotService.getChariotsList().subscribe(data => {
      this.listChariot = data
    });
    this.utilisateurService.getUtilisateursList().subscribe(data => {
      this.agentsPointage = data.filter(Utilisateur => Utilisateur.roles[0].name=='ROLE_RESPONSABLE_POINTAGE');
      this.agentsPrepDispatching = data.filter(Utilisateur => Utilisateur.roles[0].name=='ROLE_RESPONSABLE_DISPATCHING_BP');
      this.agentsPrep = data.filter(Utilisateur => Utilisateur.roles[0].name=='ROLE_PREPARATEUR');
    });

  }
   
  clear(table: Table) {
      table.clear();
  }

  list(){
    this.router.navigate(['bonprep']);
  }

  /**Popaps for inside table */
  displayModal: boolean;
  displayPosition: boolean;
  displayPositionCallChariot: boolean;
  displayPositionNumChar: boolean;
  position: string;
  displayPositionCentre: boolean;
  displayPositionPoste: boolean;
  displayPositionQutPoint: boolean;
  displayPositionPrepara: boolean;
  displayPositionPrep: boolean;
  displayPositionChrono: boolean;
  displayPositionDatPrep: boolean;
  displayPositionRemExp: boolean;
  displayPositionEtage2: boolean;
  displayPositionQutPrep: boolean;
  displayPositionPrixAch: boolean;
  displayPositionCumulRet: boolean;
  displayPositionMarge: boolean;
  displayPositionTotHt: boolean;
  displayPositionTva: boolean;
  displayPositionPrixHt: boolean;
  displayPositionRemise: boolean;
  displayPositionQutLiv: boolean;
  displayPositionEtatChar: boolean;
  displayPositionNonTrouve: boolean;

  image_id: number;
  image_idString:string;
  artic:Article;
  showModalDialog(clicked_id) {
    this.image_id=clicked_id;
    this.image_idString=this.image_id.toString();
    this.articleService.getArticle(this.image_idString).subscribe(data => {
      this.artic = data;
      console.log(this.artic);
    });
    this.displayModal = true;
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  showPositionDialogCallChariot(position: string) {
    this.position = position;
    this.displayPositionCallChariot = true;
  }
  showPositionDialogNumChar(position: string) {
    this.position = position;
    this.displayPositionNumChar = true;
  }
  showPositionDialogCentre(position: string) {
    this.position = position;
    this.displayPositionCentre = true;
  }
  showPositionDialogPoste(position: string) {
    this.position = position;
    this.displayPositionPoste = true;
  }
  showPositionDialogQutPoint(position: string) {
    this.position = position;
    this.displayPositionQutPoint = true;
  }
  showPositionDialogPrepara(position: string) {
    this.position = position;
    this.displayPositionPrepara = true;
  } 
  showPositionDialogPrep(position: string) {
    this.position = position;
    this.displayPositionPrep = true;
  } 
  showPositionDialogChrono(position: string) {
    this.position = position;
    this.displayPositionChrono = true;
  } 
  showPositionDialogDatPrep(position: string) {
    this.position = position;
    this.displayPositionDatPrep = true;
  } 
  Dlz1:number;
  Dlz2:number;
  showPositionDialogRemExp(position: string,event:number,event2:number) {
    this.Dlz1=event;
    this.Dlz2=event2;
    this.position = position;
    this.displayPositionRemExp = true;
  } 
  Elz1:String;
  Elz2:number;
  showPositionDialogEtage2(position: string,event:string,event2:number) {
    this.Elz1=event;
    this.Elz2=event2;
    this.position = position;
    this.displayPositionEtage2 = true;
  } 
  showPositionDialogQutPrep(position: string) {
    this.position = position;
    this.displayPositionQutPrep = true;
  } 
  showPositionDialogPrixAch(position: string) {
    this.position = position;
    this.displayPositionPrixAch = true;
  } 
  Clz1:number;
  Clz2:number;
  showPositionDialogCumulRet(position: string,event:number,event2:number) {
    this.Clz1=event;
    this.Clz2=event2;
    this.position = position;
    this.displayPositionCumulRet = true;
  } 
  showPositionDialogMarge(position: string) {
    this.position = position;
    this.displayPositionMarge = true;
  } 
  showPositionDialogTotHt(position: string) {
    this.position = position;
    this.displayPositionTotHt = true;
  } 
  showPositionDialogTva(position: string) {
    this.position = position;
    this.displayPositionTva = true;
  } 
  showPositionDialogPrixHt(position: string) {
    this.position = position;
    this.displayPositionPrixHt = true;
  } 
  Flz1:number;
  Flz2:number;
  showPositionDialogRemise(position: string,event:number,event2:number) {
    this.Flz1=event;
    this.Flz2=event2;
    this.position = position;
    this.displayPositionRemise = true;
  } 
  showPositionDialogQutLiv(position: string) {
    this.position = position;
    this.displayPositionQutLiv = true;
  } 
  showPositionDialogEtatChar(position: string) {
    this.position = position;
    this.displayPositionEtatChar = true;
  } 
  showPositionDialogNonTrouve(position: string) {
    this.position = position;
    this.displayPositionNonTrouve = true;
  }
  Hlz1:number;
  Hlz2:number;
  Hlz3:number;
  displayExpidQunatite: boolean;
  showModalDialogQutLivraison(event:string,event2:number,event3:number,event4:number) {
    this.Hlz1=event2;
    this.Hlz2=event3;
    this.Hlz3=event4;
    this.displayExpidQunatite = true;

    this.articleService.getArticle(event).subscribe(data => {
      this.article = data;  
    }), error => console.log(error);
  } 
  /**Popaps for inside table */
  article:Article;
  artPrep: Art_Prep = new Art_Prep();
  displayModalCodeABarre:Boolean;
  plz1:number;
  plz2:number;
  plz3:number;
  showModalDialogCodeABarre(event:string,event2:number,event3:number,event4:number){
    this.displayModalCodeABarre = true;
    console.log(event);
    this.plz1=event2;
    this.plz2=event3;
    this.plz3=event4;

    this.articleService.getArticle(event).subscribe(data => {
      this.article = data;  
      console.log(this.article.codBar);
    }), error => console.log(error);
  }

  lat1:string;
  lat2:string;
  lat3:string;
  lat4:string;
  lat5:string;
  lat6:string;
  showModalDialogPointeur() {
  
    if(this.bonprep.point!=null){
          if(this.bonprep.point.replace(/[^,]/g, "").length==0){
            this.lat1 = this.bonprep.point.substring(0,this.bonprep.point.length);
          }
          if(this.bonprep.point.replace(/[^,]/g, "").length==1){
            this.lat1 = this.bonprep.point.substring(0,this.bonprep.point.indexOf(','));
            this.lat2 = this.bonprep.point.substring(this.lat1.length+1,this.bonprep.point.length);
          }
          if(this.bonprep.point.replace(/[^,]/g, "").length==2){
            this.lat1 = this.bonprep.point.substring(0,this.bonprep.point.indexOf(','));
            this.lat2 = this.bonprep.point.substring(this.lat1.length+1,this.bonprep.point.indexOf(',',this.lat1.length+2));
            this.lat3 = this.bonprep.point.substring(this.lat1.length+1+this.lat2.length+1,this.bonprep.point.length);
          }
          if(this.bonprep.point.replace(/[^,]/g, "").length==3){
            this.lat1 = this.bonprep.point.substring(0,this.bonprep.point.indexOf(','));
            this.lat2 = this.bonprep.point.substring(this.lat1.length+1,this.bonprep.point.indexOf(',',this.lat1.length+2));
            this.lat3 = this.bonprep.point.substring(this.lat1.length+1+this.lat2.length+1,this.bonprep.point.indexOf(',',this.lat1.length+1+this.lat2.length+1));
            this.lat4 = this.bonprep.point.substring(this.lat1.length+1+this.lat2.length+1+this.lat3.length+1,this.bonprep.point.length);
          }
          if(this.bonprep.point.replace(/[^,]/g, "").length==4){
            this.lat1 = this.bonprep.point.substring(0,this.bonprep.point.indexOf(','));
            this.lat2 = this.bonprep.point.substring(this.lat1.length+1,this.bonprep.point.indexOf(',',this.lat1.length+2));
            this.lat3 = this.bonprep.point.substring(this.lat1.length+1+this.lat2.length+1,this.bonprep.point.indexOf(',',this.lat1.length+1+this.lat2.length+1));
            this.lat4 = this.bonprep.point.substring(this.lat1.length+1+this.lat2.length+1+this.lat3.length+1,this.bonprep.point.indexOf(',',this.lat1.length+1+this.lat2.length+1+this.lat3.length+1));
            this.lat5 = this.bonprep.point.substring(this.lat1.length+1+this.lat2.length+1+this.lat3.length+1+this.lat4.length+1,this.bonprep.point.length);
          }
          if(this.bonprep.point.replace(/[^,]/g, "").length==5){
            this.lat1 = this.bonprep.point.substring(0,this.bonprep.point.indexOf(','));
            this.lat2 = this.bonprep.point.substring(this.lat1.length+1,this.bonprep.point.indexOf(',',this.lat1.length+2));
            this.lat3 = this.bonprep.point.substring(this.lat1.length+1+this.lat2.length+1,this.bonprep.point.indexOf(',',this.lat1.length+1+this.lat2.length+1));
            this.lat4 = this.bonprep.point.substring(this.lat1.length+1+this.lat2.length+1+this.lat3.length+1,this.bonprep.point.indexOf(',',this.lat1.length+1+this.lat2.length+1+this.lat3.length+1));
            this.lat5 = this.bonprep.point.substring(this.lat1.length+1+this.lat2.length+1+this.lat3.length+1+this.lat4.length+1,this.bonprep.point.indexOf(',',this.lat1.length+1+this.lat2.length+1+this.lat3.length+1+this.lat4.length+1));
            this.lat6 = this.bonprep.point.substring(this.lat1.length+1+this.lat2.length+1+this.lat3.length+1+this.lat4.length+1+this.lat5.length+1,this.bonprep.point.length);
          }
  
          console.log(this.lat1+'.......'+this.lat2+'.......'+this.lat3+'.......'+this.lat4+'.......'+this.lat5+'.......'+this.lat6)
        }
  }
  displayModalPointeur:boolean=false;
  showModalDialogPointeur2() {
    this.displayModalPointeur= true;
    this.showModalDialogPointeur();
  }


  
  CodeABarreActivation(){ 
    console.log(this.codBar);
    if(this.article.codBar==this.codBar){
      if(this.plz1==null || !this.plz1){
        this.plz1=0;
      }
      console.log(this.plz1<this.plz2);

      this.artPrep.qutPoint=this.plz1+1;
      console.log(this.artPrep.qutPoint);
      console.log(this.artPrep.qutPoint);
      this.bonprepService.UpdateArtPrep(this.plz3,this.artPrep).subscribe(data => {
          console.log(data); 
          this.displayModalCodeABarre = false;
          this.codBar="";
          this.ngOnInit();
          this.makeToast();
      }), error => console.log(error);
    }else{
      this.displayModalCodeABarre = false;
      this.codBar="";
      this.ngOnInit();
      this.makeToast2();
    }

  }










        /** toaster show start */
config: NbToastrConfig;

index = 1;
destroyByClick = true;
duration = 4000;
hasIcon = true;
positionn: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_RIGHT;
preventDuplicates = false;

status: NbComponentStatus = 'success';

title = 'La validation de Code!';
content = `Code valier!`;

status2: NbComponentStatus = 'danger';
  
title2 = 'La validation de Code!';
content2 = `Code Non valier!`;

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
private showToast(type: NbComponentStatus, title: string, body: string) {
  const config = {
    status: type,
    destroyByClick: this.destroyByClick,
    duration: this.duration,
    hasIcon: this.hasIcon,
    position: this.positionn,
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




/**pointage de preparation */


article1:Article;
artPrep1: Art_Prep = new Art_Prep();
displayModalCodeArticle:Boolean;
Blz1:number;
Blz2:number;
Blz3:number;

displayModalNonTrouver:Boolean;
showModalDialogArticleNonTrouver(event:string,event2:number,event3:number,event4:number){
  this.displayModalNonTrouver= true;
  console.log(event);
  this.Blz1=event2;
  this.Blz2=event3;
  this.Blz3=event4;
  this.articleService.getArticle(event).subscribe(data => {
    this.article = data;  
    console.log(this.article.codArt);
  }), error => console.log(error);
}
CodeArticleNonTrouver(){
    if(this.Blz1==null || !this.Blz1){
      this.Blz1=0;
    }
    this.artPrep.nonTrouve=this.Blz1+1;
    this.bonprepService.UpdateArtPrep(this.Blz3,this.artPrep).subscribe(data => {
        console.log(data); 
        this.displayModalCodeArticle = false;
        this.codArtPrep="";
        this.ngOnInit();
        this.makeToast();
    }), error => console.log(error);
}

showModalDialogcodArticle(event:string,event2:number,event3:number,event4:number){
  this.displayModalCodeArticle = true;
  console.log(event);
  this.Blz1=event2;
  this.Blz2=event3;
  this.Blz3=event4;

  this.articleService.getArticle(event).subscribe(data => {
    this.article = data;  
    console.log(this.article.codArt);
  }), error => console.log(error);
}


CodeArticleActivation(){ 
  console.log(this.codArtPrep);
  if(this.article.codArt==this.codArtPrep){
    if(this.Blz1==null || !this.Blz1){
      this.Blz1=0;
    }
    this.artPrep.qutValider=this.Blz1+1;
    this.bonprepService.UpdateArtPrep(this.Blz3,this.artPrep).subscribe(data => {
        console.log(data); 
        this.displayModalCodeArticle = false;
        this.codArtPrep="";
        this.ngOnInit();
        this.makeToast();
    }), error => console.log(error);
  }else{
    this.displayModalCodeArticle = false;
    this.codArtPrep="";
    this.ngOnInit();
    this.makeToast2();
  }

}
/**end pointage preparateur */



/**modification des CumulRet Rem Exp Etage2 Remise*/
displayModifierCumulRet:boolean=false;
CumulRet:number;
ModifierCumulRet(){
  this.displayModifierCumulRet=true;
}
ModifierCumulRetEnter(cumulRet:number){
    if(this.Clz1==null || !this.Clz1){
      this.Clz1=0;
    }
    this.artPrep.cumulRet =cumulRet;
    console.log(this.artPrep.cumulRet);
    this.bonprepService.UpdateArtPrep(this.Clz2,this.artPrep).subscribe(data => {
        console.log(data); 
        this.displayPositionCumulRet = false;
        this.displayModifierCumulRet=false;
        this.CumulRet=0;
        this.ngOnInit();
        this.makeToast();
    }), error => console.log(error);
}


displayModifierRemExp:boolean=false;
RemExp:number;
ModifierRemExp(){
  this.displayModifierRemExp=true;
}
ModifierRemExpEnter(RemExp:number){
    if(this.Dlz1==null || !this.Dlz1){
      this.Dlz1=0;
    }
    this.artPrep.remExp =RemExp;
    this.bonprepService.UpdateArtPrep(this.Dlz2,this.artPrep).subscribe(data => {
        console.log(data); 
        this.displayPositionRemExp = false;
        this.displayModifierRemExp=false;
        this.RemExp=0;
        this.ngOnInit();
        this.makeToast();
    }), error => console.log(error);
}

displayModifierEtage2:boolean=false;
Etage2:string;
ModifierEtage2(){
  this.displayModifierEtage2=true;
}
ModifierEtage2Enter(Etage2:string){
    if(this.Elz1==null || !this.Elz1){
      this.Elz1='';
    }
    this.artPrep.etage2 =Etage2;
    this.bonprepService.UpdateArtPrep(this.Elz2,this.artPrep).subscribe(data => {
        console.log(data); 
        this.displayPositionEtage2 = false;
        this.displayModifierEtage2=false;
        this.Etage2='';
        this.ngOnInit();
        this.makeToast();
    }), error => console.log(error);
}

displayModifierRemise:boolean=false;
Remise:number;
ModifierRemise(){
  this.displayModifierRemise=true;
}
ModifierRemiseEnter(Remise:number){
    if(this.Flz1==null || !this.Flz1){
      this.Flz1=0;
    }
    this.artPrep.remise =Remise;
    this.bonprepService.UpdateArtPrep(this.Flz2,this.artPrep).subscribe(data => {
        console.log(data); 
        this.displayPositionRemise = false;
        this.displayModifierRemise=false;
        this.Remise=0;
        this.ngOnInit();
        this.makeToast();
    }), error => console.log(error);
}


displayModifierQutExpedé:boolean=false;
qutLiv:number;
codArtExp:string;
ModifierQutLiv(){
  this.displayModifierQutExpedé=true;
}
ModifierQutLivEnter(qutLiv:number){
    if(this.Hlz1==null || !this.Hlz1){
      this.Hlz1=0;
    }
    this.artPrep.qutLiv =qutLiv+1;
    this.bonprepService.UpdateArtPrep(this.Hlz3,this.artPrep).subscribe(data => {
        console.log(data); 
        this.displayExpidQunatite = false;
        this.displayModifierQutExpedé=false;
        this.codArtExp='';
        this.ngOnInit();
        this.makeToast();
    }), error => console.log(error);
}
/**modification des CumulRet Rem Exp Etage2 Remise Qut Livrais(expedition)*/

}
