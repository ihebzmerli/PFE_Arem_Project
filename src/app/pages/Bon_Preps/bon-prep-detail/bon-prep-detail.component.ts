import { Component, OnInit, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
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
  constructor(private authService: TokenStorageService, private bonprepService: BonPrepService , private router : Router,private _Activatedroute :ActivatedRoute
    ,private utilisateurService:UtilisateurService,private chariotService:ChariotService) { }

  ngOnInit() {
    
    this.bonprep = new Bon_prep();

    this.numBon = this._Activatedroute.snapshot.params['numBon'];
  
    this.bonprepService.getArtPrepForBonPrep(this.numBon).subscribe(data => {
      this.artpreps = data;
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
  showModalDialog() {
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
  showPositionDialogQutPrep(position: string) {
    this.position = position;
    this.displayPositionQutPrep = true;
  } 
  showPositionDialogPrixAch(position: string) {
    this.position = position;
    this.displayPositionPrixAch = true;
  } 
  showPositionDialogCumulRet(position: string) {
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
  showPositionDialogRemise(position: string) {
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
  /**Popaps for inside table */
}

