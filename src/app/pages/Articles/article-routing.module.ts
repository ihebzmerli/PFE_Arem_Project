import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './article.component';

import { ArticleListComponent } from './article-list/article-list.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { EchartsArticleComponent } from './echarts-article/echarts.component';
import { AuthGuardAdmin } from '../../auth-guardRoles/auth-guardAdmin';
import { AuthGuardAgentCab } from '../../auth-guardRoles/auth-guardAgent_Cab';
import { AuthGuardPreparateurBr } from '../../auth-guardRoles/auth-guardPreparateur_Br';
import { AuthGuardDecideurBp } from '../../auth-guardRoles/auth-guardDecideur_Bp';
import { AuthGuardClient } from '../../auth-guardRoles/auth-guardClient';
import { AuthGuardUser } from '../../auth-guardRoles/auth-guardUser';
import { AuthGuardRDispatchingBp } from '../../auth-guardRoles/auth-guardR_Dispatching_Bp';
import { AuthGuardAgentSaisieReg } from '../../auth-guardRoles/auth-guardAgent_Saisie_Reg';
import { AuthGuardExpediteur } from '../../auth-guardRoles/auth-guardExpediteur';
import { AuthGuardPreparateur } from '../../auth-guardRoles/auth-guardPreparateur';
import { AllGuard } from '../../auth-guardRoles/auth-guardModules.ts/AllGuard';
import { AuthGuardAcheteur } from '../../auth-guardRoles/auth-guardAcheteur';


const routes: Routes = [{
  path: '',
  data: {guards: [AuthGuardAcheteur , AuthGuardAdmin , AuthGuardAgentCab , AuthGuardDecideurBp , AuthGuardClient , AuthGuardUser , AuthGuardRDispatchingBp , AuthGuardAgentSaisieReg , AuthGuardExpediteur , AuthGuardPreparateur , AuthGuardPreparateurBr]}, canActivate: [AllGuard],
  component: ArticlesComponent,
  children: [
    {
      path: 'article-list',
      component: ArticleListComponent,
    },
    {
      path: 'create-article',
      data: {guards: [AuthGuardAdmin , AuthGuardAgentCab , AuthGuardPreparateurBr ]}, canActivate: [AllGuard],
      //data: {guards: [AuthGuardAcheteur , AuthGuardAdmin , AuthGuardAgentCab , AuthGuardAgentSaisieReg , AuthGuardCaissier , AuthGuardClient, AuthGuardDecideurBp , AuthGuardEmballeur , AuthGuardExpediteur , AuthGuardLivreur , AuthGuardPreparateur , AuthGuardPreparateurBr , AuthGuardRDispatchingBp , AuthGuardRPointage , AuthGuardRSFrsEtrager , AuthGuardRSFrsLocal , AuthGuardTransitaire , AuthGuardUser , AuthGuardValidateurDeChariot , AuthGuardVendeur ]}, canActivate: [AllGuard],
      component: CreateArticleComponent,
    },
    {
      path: 'update-article/:codArt',
      data: {guards: [AuthGuardAdmin , AuthGuardAgentCab , AuthGuardPreparateurBr ]}, canActivate: [AllGuard],
      component: UpdateArticleComponent,
    },
    {
      path: 'echarts-article',
      data: {guards: [AuthGuardAdmin , AuthGuardAgentCab , AuthGuardDecideurBp , AuthGuardRDispatchingBp , AuthGuardExpediteur , AuthGuardPreparateur , AuthGuardPreparateurBr]}, canActivate: [AllGuard],
      component: EchartsArticleComponent,
    }
  ],
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ArticleRoutingModule { }

export const routedComponents = [
  ArticlesComponent,
  CreateArticleComponent,
  ArticleListComponent
];
