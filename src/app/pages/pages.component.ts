import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './auth/token-storage.service';

import { MENU_Acheteur, MENU_Admin, MENU_Agent_CAB, MENU_Caissier, MENU_Client, MENU_Emballeur, MENU_Expediteur, MENU_ITEMS, MENU_Livreur, MENU_Preparateur, MENU_Preparateur_BR, MENU_Responsable_Dispatching_BP, MENU_Responsable_Pointage, MENU_User, MENU_Validateur_De_Chariot } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
        <nb-menu *ngIf="info.token; else loggedOut" [items]="menu"></nb-menu>
      <ng-template #loggedOut>
      </ng-template>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu : any;

  info: any;
  roles: string[];
  authority: string;
  constructor(private router: Router,private authService: TokenStorageService) {  }

  ngOnInit() {
    this.info = {
      token: this.authService.getToken(),
      username: this.authService.getUsername(),
      authorities: this.authService.getAuthorities()
    };
    console.log(this.authService.getAuthorities())

    
    if (this.authService.getToken()) {
      this.roles = this.authService.getAuthorities(); 
      console.log(this.roles)
      this.roles.every(role => {
        console.log(role);
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          //return this.menu = MENU_ITEMS;
          return this.menu = MENU_Admin;

        } else if (role === 'ROLE_ACHETEUR') {
          this.authority = 'acheteur';
          return this.menu = MENU_Acheteur;

        } else if (role === 'ROLE_TRANSITAIRE') {
          this.authority = 'transitaire';
          return this.menu = MENU_User;

        } else if (role === 'ROLE_CLIENT') {
          this.authority = 'client';
          return this.menu = MENU_Client;

        } else if (role === 'ROLE_VENDEUR') {
          this.authority = 'vendeur';
          return this.menu = MENU_User;
          
        } else if (role === 'ROLE_DECIDEUR_BP') {
          this.authority = 'decideur_bp';
          return this.menu = MENU_User;

        } else if (role === 'ROLE_AGENT_CAB') {
          this.authority = 'agent_cab';
          return this.menu = MENU_Agent_CAB;

        } else if (role === 'ROLE_PREPARATEUR_BR') {
          this.authority = 'preparateur_br';
          return this.menu = MENU_Preparateur_BR;

        } else if (role === 'ROLE_RESPONSABLE_DISPATCHING_BP') {
          this.authority = 'responsable_dispatching_bp';
          return this.menu = MENU_Responsable_Dispatching_BP;

        } else if (role === 'ROLE_PREPARATEUR') {
          this.authority = 'preparateur';
          return this.menu = MENU_Preparateur;

        } else if (role === 'ROLE_VALIDATEUR_DE_CHARIOT') {
          this.authority = 'validateur_de_chariot';
          return this.menu = MENU_Validateur_De_Chariot;

        } else if (role === 'ROLE_RESPONSABLE_POINTAGE') {
          this.authority = 'responsable_pointage';
          return this.menu = MENU_Responsable_Pointage;
          
        } else if (role === 'ROLE_EMBALLEUR') {
          this.authority = 'emballeur';
          return this.menu = MENU_Emballeur;

        } else if (role === 'ROLE_EXPEDITEUR') {
          this.authority = 'expediteur';
          return this.menu = MENU_Expediteur;

        } else if (role === 'ROLE_AGENT_SAISIE_REG') {
          this.authority = 'agent_saisie_reg';
          return this.menu = MENU_User;

        } else if (role === 'ROLE_CAISSIER') {
          this.authority = 'caissier';
          return this.menu = MENU_Caissier;

        } else if (role === 'ROLE_RESPONSABLE_SERVICE_FRS_ETRANGER') {
          this.authority = 'responsable_service_frs_etranger';
          return this.menu = MENU_User;

        } else if (role === 'ROLE_RESPONSABLE_SERVICE_FRS_LOCAL') {
          this.authority = 'responsable_service_frs_local';
          return this.menu = MENU_User;
          
        } else if (role === 'ROLE_LIVREUR') {
          this.authority = 'livreur';
          return this.menu = MENU_Livreur;
          
        }else{
          this.authority = 'user';
          return this.menu = MENU_User;
        }
      });
    }
    console.log(this.menu);
  }
  
  
}
