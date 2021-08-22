import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuard } from './auth-guard.service';
import { NbOAuth2LoginComponent } from './NbOAuth2LoginComponent';
import { NbOAuth2CallbackPlaygroundComponent } from './NbOAuth2CallbackPlaygroundComponent';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RequestPwdComponent } from './pages/request-pwd/request-pwd.component';

export const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuard], // here we tell Angular to check the access with our AuthGuard
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: RequestPwdComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
];

RouterModule.forChild([
  {
    path: '',
    component: NbOAuth2LoginComponent,
  },
  {
    path: 'callback',
    component: NbOAuth2CallbackPlaygroundComponent ,
  },
]);
const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
