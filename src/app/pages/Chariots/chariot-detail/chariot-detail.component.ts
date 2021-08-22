import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { Chariot } from '../chariot';
import { trigger,style,transition,animate,keyframes,query,stagger, state} from '@angular/animations';
import { ChariotService } from '../chariot.service';
import { Table } from 'primeng/table';
import { UtilisateurService } from '../../Utilisateurs/utilisateur.service';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
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
  artprep_chariot: any[] = [];
  users: Utilisateur[];
  numChar: string;
  statuses: any[];

  loading: boolean = true;
  show = false;
  activityValues: number[] = [0, 100];
  agentsPrepara:Utilisateur[];
  agentsPrep:Utilisateur[];
  constructor(private authService: TokenStorageService,private chariotService: ChariotService,private utilisateurService:UtilisateurService , private router : Router,private _Activatedroute :ActivatedRoute) { }

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
    showPositionDialogPrep(position: string) {
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
}
