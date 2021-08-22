import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuard } from '../auth-guard.service';
import { AuthGuardAdmin } from '../auth-guardRoles/auth-guardAdmin';
import { AuthGuardCaissier } from '../auth-guardRoles/auth-guardCaissier';
import { AuthGuardDecideurBp } from '../auth-guardRoles/auth-guardDecideur_Bp';
import { AuthGuardRDispatchingBp } from '../auth-guardRoles/auth-guardR_Dispatching_Bp';
import { AuthGuardAgentCab } from '../auth-guardRoles/auth-guardAgent_Cab';
import { AuthGuardAgentSaisieReg } from '../auth-guardRoles/auth-guardAgent_Saisie_Reg';
import { AuthGuardExpediteur } from '../auth-guardRoles/auth-guardExpediteur';
import { AuthGuardPreparateur } from '../auth-guardRoles/auth-guardPreparateur';
import { AuthGuardPreparateurBr } from '../auth-guardRoles/auth-guardPreparateur_Br';
import { AuthGuardClient } from '../auth-guardRoles/auth-guardClient';
import { AuthGuardUser } from '../auth-guardRoles/auth-guardUser';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'Chariots',
      loadChildren: () => import('./Chariots/chariot.module')
        .then(m => m.ChariotModule),
    },
    {
      path: 'Articles',
      loadChildren: () => import('./Articles/article.module')
        .then(m => m.ArticleModule),
    },
    {
      path: 'Bon_Preps',
      loadChildren: () => import('./Bon_Preps/bon_prep.module')
        .then(m => m.Bon_PrepModule),
    },
    {
      path: 'Bon_Livs',
      loadChildren: () => import('./Bon_Livs/bon_liv.module')
        .then(m => m.Bon_LivModule),
    },
    {
      path: 'Bon_Sorts',
      loadChildren: () => import('./Bon_Sorts/bon_sort.module')
        .then(m => m.Bon_SortModule),
    },
    {
      path: 'Achatss',
      loadChildren: () => import('./Achatss/achats.module')
        .then(m => m.AchatsModule),
    },
    {
      path: 'Affaires',
      loadChildren: () => import('./Affaires/affaire.module')
        .then(m => m.AffaireModule),
    },
    {
      path: 'Art_Achas',
      loadChildren: () => import('./Art_Achas/art-acha.module')
        .then(m => m.Art_AchaModule),
    },
    {
      path: 'Det_Embas',
      loadChildren: () => import('./Det_Embas/det_emba.module')
        .then(m => m.Det_EmbaModule),
    },
    {
      path: 'Etat_Livs',
      loadChildren: () => import('./Etat_Livs/etat_liv.module')
        .then(m => m.Etat_LivModule),
    },
    {
      path: 'Livreurs',
      loadChildren: () => import('./Livreurs/livreur.module')
        .then(m => m.LivreurModule),
    },
    {
      path: 'Marques',
      loadChildren: () => import('./Marques/marque.module')
        .then(m => m.MarqueModule),
    },
    {
      path: 'Models',
      loadChildren: () => import('./Model/model.module')
        .then(m => m.ModelModule),
    },
    {
      path: 'Expides',
      loadChildren: () => import('./Expides/expide.module')
        .then(m => m.ExpideModule),
    },
    {
      path: 'Vehicules',
      loadChildren: () => import('./Vehicules/vehicule.module')
        .then(m => m.VehiculeModule),
    },
    {
      path: 'Fourniss',
      loadChildren: () => import('./Fourniss/fournis.module')
        .then(m => m.FournisModule),
    },
    {
      path: 'Utilisateurs',
      loadChildren: () => import('./Utilisateurs/utilisateur.module')
        .then(m => m.UtilisateurModule),
    },
    {
      path: 'Primes',
      loadChildren: () => import('./Primes/prime.module')
        .then(m => m.PrimeModule),
    },
    {
      path: 'Rectifs',
      loadChildren: () => import('./Rectifs/rectif.module')
        .then(m => m.RectifModule),
    },
    {
      path: 'Profil',
      loadChildren: () => import('./Profil/profil.module')
        .then(m => m.ProfilModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
