/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { TokenStorageService } from './pages/auth/token-storage.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  roles: string[];
  authority: string;
  title = 'angular-PFEArem';
  constructor(private tokenStorage: TokenStorageService,private analytics: AnalyticsService, private seoService: SeoService) {
  }

  ngOnInit() {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_ACHETEUR') {
          this.authority = 'acheteur';
          return false;
        } else if (role === 'ROLE_TRANSITAIRE') {
          this.authority = 'transitaire';
          return false;
        } else if (role === 'ROLE_CLIENT') {
          this.authority = 'client';
          return false;
        } else if (role === 'ROLE_VENDEUR') {
          this.authority = 'vendeur';
          return false;
        } else if (role === 'ROLE_DECIDEUR_BP') {
          this.authority = 'decideur_bp';
          return false;
        } else if (role === 'ROLE_AGENT_CAB') {
          this.authority = 'agent_cab';
          return false;
        } else if (role === 'ROLE_PREPARATEUR_BR') {
          this.authority = 'preparateur_br';
          return false;
        } else if (role === 'ROLE_RESPONSABLE_DISPATCHING_BP') {
          this.authority = 'responsable_dispatching_bp';
          return false;
        } else if (role === 'ROLE_PREPARATEUR') {
          this.authority = 'preparateur';
          return false;
        } else if (role === 'ROLE_VALIDATEUR_DE_CHARIOT') {
          this.authority = 'validateur_de_chariot';
          return false;
        } else if (role === 'ROLE_RESPONSABLE_POINTAGE') {
          this.authority = 'responsable_pointage';
          return false;
        } else if (role === 'ROLE_EMBALLEUR') {
          this.authority = 'emballeur';
          return false;
        } else if (role === 'ROLE_EXPEDITEUR') {
          this.authority = 'expediteur';
          return false;
        } else if (role === 'ROLE_AGENT_SAISIE_REG') {
          this.authority = 'agent_saisie_reg';
          return false;
        } else if (role === 'ROLE_CAISSIER') {
          this.authority = 'caissier';
          return false;
        } else if (role === 'ROLE_RESPONSABLE_SERVICE_FRS_ETRANGER') {
          this.authority = 'responsable_service_frs_etranger';
          return false;
        } else if (role === 'ROLE_RESPONSABLE_SERVICE_FRS_LOCAL') {
          this.authority = 'responsable_service_frs_local';
          return false;
        } else if (role === 'ROLE_LIVREUR') {
          this.authority = 'livreur';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }
}
