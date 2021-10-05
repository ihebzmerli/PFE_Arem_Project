import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { Expide } from '../expide';
import { Vehicule } from '../../Vehicules/vehicule';
import { ExpideService } from '../expide.service';
import { LivreurService } from '../../Livreurs/livreur.service';
import { Livreur } from '../../Livreurs/livreur';
import { Livreur_Expide } from '../LivreurBonliv/Livreur_Expide';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
import { UtilisateurService } from '../../Utilisateurs/utilisateur.service';

@Component({
  selector: 'ngx-expide-detail',
  templateUrl: './expide-detail.component.html',
  styleUrls: ['./expide-detail.component.scss']
})
export class ExpideDetailComponent implements OnInit {
  expide:Expide;
  expides: Expide[];
  users: Utilisateur[];
  vehicules: Vehicule[];
  id: string;
  LivreurBonlivs:any[] = [];
  id_livreur: bigint;
  
  statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  
  constructor(private authService: TokenStorageService,public utilisateurService: UtilisateurService,private expideService: ExpideService ,private livreurservice: LivreurService ,private router : Router,private _Activatedroute :ActivatedRoute) { }

  statusessTrans_action:any;
  ngOnInit() {
    
    this.expide = new Expide();

    this.id = this._Activatedroute.snapshot.params['id'];
  
    this.expideService.getAllLivreursAndBonliv(this.id).subscribe(data => {
      this.LivreurBonlivs = data;
      console.log(data)
    });
        
    this.expideService.getExpide(this.id).subscribe(data => {
      this.expide = data;
    });


    this.statusessTrans_action =[
      {label: 'empty', value: null},
      {label: 'envoyer', value: 'envoyer'},
      {label: 'reçu', value: 'recu'}
    ]
  }
   
  clear(table: Table) {
      table.clear();
  }

  list(){
    this.router.navigate(['expide']);
  }

  /**Popaps for inside table */
  displayModal: boolean;
  displayPosition: boolean;
  displayPositionBonLivraison: boolean;
  displayPositionPrixTtc: boolean;
  position: string;
  displayPositionCentre: boolean;
  displayPositionCommand: boolean;
  displayPositionTypeCommand: boolean;
  displayPositionDateCommand: boolean;
  displayPositionTrans_action: boolean;
  displayPositionM_V: boolean;
  
  image_id: number;
  image_idString:string;
  util:Utilisateur;
  showModalDialog(clicked_id) {
    console.log(clicked_id);
    this.image_id=clicked_id;
    this.image_idString=this.image_id.toString();
    this.utilisateurService.getUtilisateur(this.image_idString).subscribe(data => {
      this.util = data;
      console.log(this.util);
    });
    this.displayModal = true;
  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  showPositionDialogM_V(position: string) {
    this.position = position;
    this.displayPositionM_V = true;
  }
  showPositionDialogBonLivraison(position: string) {
    this.position = position;
    this.displayPositionBonLivraison = true;
  }
  showPositionDialogPrixTtc(position: string) {
    this.position = position;
    this.displayPositionPrixTtc = true;
  }
  showPositionDialogCentre(position: string) {
    this.position = position;
    this.displayPositionCentre = true;
  }
  showPositionDialogCommand(position: string) {
    this.position = position;
    this.displayPositionCommand = true;
  }
  showPositionDialogTypeCommand(position: string) {
    this.position = position;
    this.displayPositionTypeCommand = true;
  }
  showPositionDialogDateCommand(position: string) {
    this.position = position;
    this.displayPositionDateCommand = true;
  } 
  showPositionDialogTrans_action(position: string) {
    this.position = position;
    this.displayPositionTrans_action = true;
  } 

  /**Popaps for inside table */


  
}

