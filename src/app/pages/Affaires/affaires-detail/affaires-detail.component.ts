import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Affaire } from '../affaire';
import { AffaireService } from '../affaire.service';
import { Table } from 'primeng/table';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
import { UtilisateurService } from '../../Utilisateurs/utilisateur.service';

@Component({
  selector: 'ngx-affaires-detail',
  templateUrl: './affaires-detail.component.html',
  styleUrls: ['./affaires-detail.component.scss']
})
export class AffairesDetailComponent implements OnInit {

  affaires: Affaire;

  statuses: any[];

  achats:any[] = [];
  suitaffs:any[] = [];

  loading: boolean = true;
  numAff: string;
  activityValues: number[] = [0, 100];

  constructor(private authService: TokenStorageService,private affaireService: AffaireService , private router : Router,private _Activatedroute :ActivatedRoute,private utilisateurService:UtilisateurService) { }

  ngOnInit() {
    
    this.affaires = new Affaire();

    this.numAff = this._Activatedroute.snapshot.params['numAff'];

    this.affaireService.getAffaires(this.numAff).subscribe(data => {
      this.affaires = data;
      console.log(data)
    });
  }


  clear(table: Table) {
      table.clear();
  }

  list(){
    this.router.navigate(['affaire']);
  }

    /**Popaps for inside table */
    displayModalUser: boolean;
    position: string;


    displayPositionNumDocAchat: boolean;
    displayPositionTypDoc: boolean;
    displayPositionDate: boolean;
    displayPositionMontHt: boolean;
    displayPositionPret: boolean;
    displayPositionValidation: boolean;
    displayPositionUserRole: boolean;

    showPositionDialogNumDocAchat(position: string) {
      this.position = position;
      this.displayPositionNumDocAchat = true;
    }
    showPositionDialogTypDoc(position: string) {
      this.position = position;
      this.displayPositionTypDoc = true;
    }
    showPositionDialogDate(position: string) {
      this.position = position;
      this.displayPositionDate = true;
    }
    showPositionDialogMontHt(position: string) {
      this.position = position;
      this.displayPositionMontHt = true;
    }
    showPositionDialogPret(position: string) {
      this.position = position;
      this.displayPositionPret = true;
    }
    showPositionDialogValidation(position: string) {
      this.position = position;
      this.displayPositionValidation = true;
    }


    showModalDialogUser(position: string) {
      this.position = position;
      this.displayModalUser = true;
    }
    showPositionDialogUserRole(position: string) {
      this.position = position;
      this.displayPositionUserRole = true;
    }

    /**table dialogue */

    displayPositionCodArt: boolean;
    displayPositionMarque: boolean;
    displayPositionQutDem: boolean;
    displayPositionDesArt: boolean;
    displayPositionPrixProf: boolean;
    displayPositionPrixAch: boolean;
    displayPositionQutConf: boolean;
    displayPositionRaison: boolean;
    displayPositionNouvPrix: boolean;
    displayPositionPrixMp: boolean;
    displayPositionPrixTrsf: boolean;
    displayPositionDatTransf: boolean;
    displayPositionStkIni: boolean;
    displayPositionQutTrsf: boolean;
    displayPositionCodTrsf: boolean;


    showPositionDialogCodArt(position: string) {
      this.position = position;
      this.displayPositionCodArt = true;
    }
    showPositionDialogMarque(position: string) {
      this.position = position;
      this.displayPositionMarque = true;
    }
    showPositionDialogQutDem(position: string) {
      this.position = position;
      this.displayPositionQutDem = true;
    }
    showPositionDialogDesArt(position: string) {
      this.position = position;
      this.displayPositionDesArt = true;
    }
    showPositionDialogPrixProf(position: string) {
      this.position = position;
      this.displayPositionPrixProf = true;
    }
    showPositionDialogPrixAch(position: string) {
      this.position = position;
      this.displayPositionPrixAch = true;
    }
    showPositionDialogQutConf(position: string) {
      this.position = position;
      this.displayPositionQutConf = true;
    }
    showPositionDialogRaison(position: string) {
      this.position = position;
      this.displayPositionRaison = true;
    }
    showPositionDialogNouvPrix(position: string) {
      this.position = position;
      this.displayPositionNouvPrix = true;
    }
    showPositionDialogPrixMp(position: string) {
      this.position = position;
      this.displayPositionPrixMp = true;
    }
    showPositionDialogPrixTrsf(position: string) {
      this.position = position;
      this.displayPositionPrixTrsf= true;
    }
    showPositionDialogDatTransf(position: string) {
      this.position = position;
      this.displayPositionDatTransf = true;
    }
    showPositionDialogStkIni(position: string) {
      this.position = position;
      this.displayPositionStkIni= true;
    }
    showPositionDialogQutTrsf(position: string) {
      this.position = position;
      this.displayPositionQutTrsf= true;
    }
    showPositionDialogCodTrsf(position: string) {
      this.position = position;
      this.displayPositionCodTrsf = true;
    }
}
