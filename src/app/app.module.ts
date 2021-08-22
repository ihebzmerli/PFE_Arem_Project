/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { AuthGuard } from './auth-guard.service';
import { NbAuthModule, NbOAuth2AuthStrategy, NbOAuth2ResponseType } from '@nebular/auth';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './pages/auth/auth-interceptor';
import { AuthGuardAcheteur } from './auth-guardRoles/auth-guardAcheteur';
import { AuthGuardAdmin } from './auth-guardRoles/auth-guardAdmin';
import { AuthGuardCaissier } from './auth-guardRoles/auth-guardCaissier';
import { AuthGuardAgentCab } from './auth-guardRoles/auth-guardAgent_Cab';
import { AuthGuardAgentSaisieReg } from './auth-guardRoles/auth-guardAgent_Saisie_Reg';
import { AuthGuardClient } from './auth-guardRoles/auth-guardClient';
import { AuthGuardDecideurBp } from './auth-guardRoles/auth-guardDecideur_Bp';
import { AuthGuardExpediteur } from './auth-guardRoles/auth-guardExpediteur';
import { AuthGuardEmballeur } from './auth-guardRoles/auth-guardEmballeur';
import { AuthGuardPreparateurBr } from './auth-guardRoles/auth-guardPreparateur_Br';
import { AuthGuardPreparateur } from './auth-guardRoles/auth-guardPreparateur';
import { AuthGuardRPointage } from './auth-guardRoles/auth-guardR_Pointage';
import { AuthGuardRSFrsEtrager } from './auth-guardRoles/auth-guardR_S_Frs_Etranger';
import { AuthGuardTransitaire } from './auth-guardRoles/auth-guardTransitaire';
import { AuthGuardRSFrsLocal } from './auth-guardRoles/auth-guardR_S_Frs_Local';
import { AuthGuardValidateurDeChariot } from './auth-guardRoles/auth-guardValidateur_De_Chariot';
import { AuthGuardVendeur } from './auth-guardRoles/auth-guardVendeur';
import { AuthGuardUser } from './auth-guardRoles/auth-guardUser';
import { AuthGuardLivreur } from './auth-guardRoles/auth-guardLivreur';
import { AuthGuardRDispatchingBp } from './auth-guardRoles/auth-guardR_Dispatching_Bp';
import { AllGuard } from './auth-guardRoles/auth-guardModules.ts/AllGuard';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    Ng2SearchPipeModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'google',
          clientId: 'YOUR_CLIENT_ID',
          clientSecret: '',
          authorize: {
            endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            responseType: NbOAuth2ResponseType.TOKEN,
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
            redirectUri: 'http://localhost:4100/example/oauth2/callback',
          },
        }),
      ],
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    // ...
    AuthGuard,
    AllGuard,
    AuthGuardAcheteur,
    AuthGuardAdmin,
    AuthGuardAgentCab,
    AuthGuardAgentSaisieReg,
    AuthGuardCaissier,
    AuthGuardClient,
    AuthGuardDecideurBp,
    AuthGuardEmballeur,
    AuthGuardExpediteur,
    AuthGuardLivreur,
    AuthGuardPreparateurBr,
    AuthGuardPreparateur,
    AuthGuardRDispatchingBp,
    AuthGuardRPointage,
    AuthGuardRSFrsEtrager,
    AuthGuardRSFrsLocal,
    AuthGuardTransitaire,
    AuthGuardUser,
    AuthGuardValidateurDeChariot,
    AuthGuardVendeur,
    httpInterceptorProviders
  ]
})
export class AppModule {
}
