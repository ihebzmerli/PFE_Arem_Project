import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbSortDirection, NbSortRequest, NbToastrConfig, NbToastrService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { Chariot } from '../chariot';
import { trigger,style,transition,animate,keyframes,query,stagger, state} from '@angular/animations';
import { ChariotService } from '../chariot.service';
import { Table } from 'primeng/table';
import { UtilisateurService } from '../../Utilisateurs/utilisateur.service';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
import { BonPrepService } from '../../Bon_Preps/bon-prep.service';
import { Art_Prep } from '../../Bon_Preps/Art_Preps/art-prep';
@Component({
  selector: 'ngx-chariot-detail',
  templateUrl: './chariot-detail.component.html',
  styleUrls: ['./chariot-detail.component.scss'],
  animations: [
    /*
    trigger('commeAjout',[
      transition('* => *', [
        query(':entre', style({ opacity: 0}), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0,transform: 'translateY(-75px)',offset: 0}),
            style({opacity: .5,transform: 'translateY(-35px)',offset: 0.3}),
            style({opacity: 1,transform: 'translateY(-0px)',offset: 1}),
          ]))
        ]))
      ])
    ])*/
    trigger('visibilityChanged', [
      state('in', style({
        opacity: 0
      })),
      state('out',   style({
        opacity: 1
      })),
      transition('in => out', animate('100ms ease-in')),
      transition('out => in', animate('100ms ease-out'))
    ]),
    trigger('wariniw5abini', [
      state('show', style({
        opacity: 1
      })),
      state('hide',   style({
        opacity: 0
      })),
      transition('show => hide', animate('600ms ease-in')),
      transition('hide => show', animate('1000ms ease-out'))
    ]),
    trigger('jibniwimchi', [
      transition(':enter', [
        style({transform: 'translateX(-100%'}),
        animate('1s')
      ]),
      transition(':leave', [
        animate('1s', style({transform: 'translateX(-100%'}))
      ])
    ])
  ]
})
export class ChariotDetailComponent implements OnInit {
  chariot:Chariot;
  artpreps:any[] = [];
  chariots: any[] = [];
  nonTrouverType: any[];
  artprep_chariot: any[] = [];
  users: Utilisateur[];
  numChar: string;
  statuses: any[];

  loading: boolean = true;
  show = false;
  activityValues: number[] = [0, 100];
  agentsPrepara:Utilisateur[];
  agentsPrep:Utilisateur[];
  constructor(private authService: TokenStorageService, private chariotService: ChariotService,private toastrService: NbToastrService ,private bonprepService: BonPrepService ,private utilisateurService:UtilisateurService , private router : Router,private _Activatedroute :ActivatedRoute) { }

  ngOnInit() {
    
    this.show ? 'show' : 'hide';
    this.chariot = new Chariot();

    this.numChar = this._Activatedroute.snapshot.params['numChar'];
  
    this.chariotService.getArtPrepByChariot(this.numChar).subscribe(data => {
      this.artpreps = data;
      this.loading = false;
      console.log(this.artpreps)
    });
    this.chariotService.getChariot(this.numChar).subscribe(data => {
      this.chariot = data;
      console.log(this.chariot)
    });


    this.utilisateurService.getUtilisateursList().subscribe(data => {
      this.agentsPrep = data.filter(Utilisateur => Utilisateur.roles[0].name=='ROLE_VALIDATEUR_DE_CHARIOT');
      this.agentsPrepara = data.filter(Utilisateur => Utilisateur.roles[0].name=='ROLE_PREPARATEUR');
    });

    this.nonTrouverType = [
      {label: 'Trouver', value: null},
      {label: 'Non trouver', value: true}
    ]
  }


  clear(table: Table) {
      table.clear();
  }

  list(){
    this.router.navigate(['achats']);
  }

    /**Popaps for inside table */
    displayModal: boolean;
    position: string;
    displayPositionNumBon: boolean;
    displayPositionCodArt: boolean;
    displayPositionQutPrep: boolean;
    displayPositionNonTrouve: boolean;
    displayPositionDatPrep: boolean;
    displayPositionChrono: boolean;
    displayPositionCentre: boolean;
    displayPositionPrepara: boolean;
    displayPositionPrep: boolean;
    displayPositionPoste: boolean;
    showPositionDialogNumBon(position: string) {
      this.position = position;
      this.displayPositionNumBon = true;
    }
    showPositionDialogCodArt(position: string) {
      this.position = position;
      this.displayPositionCodArt = true;
    }
    showPositionDialogQutPrep(position: string) {
      this.position = position;
      this.displayPositionQutPrep = true;
    }
    showPositionDialogDatPrep(position: string) {
      this.position = position;
      this.displayPositionDatPrep = true;
    }
    showPositionDialogNonTrouve(position: string) {
      this.position = position;
      this.displayPositionNonTrouve = true;
    }
    showPositionDialogChrono(position: string) {
      this.position = position;
      this.displayPositionChrono = true;
    }
    showPositionDialogPrepara(position: string) {
      this.position = position;
      this.displayPositionPrepara = true;
    }

    Alz1:Utilisateur;
    Alz2:number;
    showPositionDialogPrep(position: string,event:Utilisateur,event2:number) {
      this.Alz1=event;
      this.Alz2=event2;
      this.position = position;
      this.displayPositionPrep = true;
    }
    showPositionDialogPoste(position: string) {
      this.position = position;
      this.displayPositionPoste = true;
    }
    showPositionDialogCentre(position: string) {
      this.position = position;
      this.displayPositionCentre = true;
    }


/**modification de validateur pointage */
artPrep: Art_Prep = new Art_Prep();
PointageChariot;
displayModifierPointageChariot:boolean=false;
  CumulRet:number;
  ModifierPointageChariot(){
    this.displayModifierPointageChariot=true;
  }
  ModifierPointageChariotEnter(cumulRet:number){
      if(this.Alz1==null || !this.Alz1){
        this.Alz1=null;
      }
      this.artPrep.prep =this.PointageChariot;
      console.log(this.artPrep.prep);
      this.bonprepService.UpdateArtPrep(this.Alz2,this.artPrep).subscribe(data => {
          console.log(data); 
          this.displayPositionPrep = false;
          this.displayModifierPointageChariot=false;
          this.PointageChariot=null;
          this.ngOnInit();
          this.makeToast();
      }), error => console.log(error);
  }

  /**modification de validateur pointage  */





         /** toaster show start */
config: NbToastrConfig;

index = 1;
destroyByClick = true;
duration = 4000;
hasIcon = true;
positionn: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_RIGHT;
preventDuplicates = false;

status: NbComponentStatus = 'success';

title = 'La validation de Preparateur chariot!';
content = `Preparateur chariot valier!`;

status2: NbComponentStatus = 'danger';
  
title2 = 'La validation de Preparateur chariot!';
content2 = `Preparateur chariot Non valier!`;

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
}
