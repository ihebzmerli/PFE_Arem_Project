import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import { NbAuthService } from '@nebular/auth/services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { NbAuthSocialLink } from '@nebular/auth/auth.options';
import * as ɵngcc0 from '@angular/core';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  pass2:boolean = false;
  statuses: NbComponentStatus[] = ['primary', 'success', 'info', 'warning', 'danger'  ];
  shapes: NbComponentShape[] = [ 'rectangle', 'semi-round', 'round' ];
  sizes: NbComponentSize[] = ['tiny', 'small', 'medium', 'large', 'giant'];
  
  constructor(private toastrService: NbToastrService,private authService: AuthService, private tokenStorage: TokenStorageService,cd: ChangeDetectorRef,private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      async data => {
        this.tokenStorage.saveToken("Bearer "+data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        await this.makeToast();
        await this.delay(2000);
        this.goToDashBoard();
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400) {
            this.isLoginFailed = true;
            this.makeToast3();
            //this.form.valid =true
            this.submitted= false;
          }else{
            this.isLoginFailed = true;
            this.makeToast2();
            this.submitted= false;
            //this.form.valid = true
          }
        }
      }
/*     async error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        await this.makeToast2();
        await this.delay(2000);
        this.reloadPage();
      }
      */
    );
  }

  goToDashBoard($myParam: string = ''): void {
    const navigationDetails: string[] = ['//pages/dashboard'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

  reloadPage() {
    window.location.reload();
  }

  getpassword(){
    this.pass2 = !this.pass2;
  }

//**login from template */
  protected service: NbAuthService;
  protected options: {};
  protected cd: ChangeDetectorRef;
  protected routerz: Router;
  redirectDelay: number;
  showMessages: any;
  strategy: string;
  errors: string[];
  messages: string[];
  user: any;
  submitted: boolean;
  socialLinks: NbAuthSocialLink[];
  rememberMe: boolean;
  static ɵfac: ɵngcc0.ɵɵFactoryDef<LoginComponent, never>;
  static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<LoginComponent, "nb-login", never, {}, {}, never, never>;
//**login from template */



  /**toaster show start */
config: NbToastrConfig;

index = 1;
destroyByClick = true;
duration = 4000;
hasIcon = true;
position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
preventDuplicates = false;

status: NbComponentStatus = 'success';

title = 'Connexion avec succée!';
content = `Le bienvenu!`;
status2: NbComponentStatus = 'danger';

title2 = 'Connexion n est pas faite !!!';
content2 = `Nom d'utilisateur ou mot de passe est erroné!`;


status3: NbComponentStatus = 'warning';
    
title3 = 'Demande n est pas faite !!!';
content3 = `Utilisateur est blocké!`;


types: NbComponentStatus[] = [
  'primary',
  'success',
  'info',
  'warning',
  'danger',
];

positions: string[] = [
  NbGlobalPhysicalPosition.TOP_RIGHT,
  NbGlobalPhysicalPosition.TOP_LEFT,
  NbGlobalPhysicalPosition.BOTTOM_LEFT,
  NbGlobalPhysicalPosition.BOTTOM_RIGHT,
  NbGlobalLogicalPosition.TOP_END,
  NbGlobalLogicalPosition.TOP_START,
  NbGlobalLogicalPosition.BOTTOM_END,
  NbGlobalLogicalPosition.BOTTOM_START,
];

makeToast() {
  this.showToast(this.status, this.title, this.content);
}

makeToast2() {
  this.showToast(this.status2, this.title2, this.content2);
}
makeToast3() {
  this.showToast(this.status3, this.title3, this.content3);
}
private showToast(type: NbComponentStatus, title: string, body: string) {
  const config = {
    status: type,
    destroyByClick: this.destroyByClick,
    duration: this.duration,
    hasIcon: this.hasIcon,
    position: this.position,
    preventDuplicates: this.preventDuplicates,
  };
  const titleContent = title ? `. ${title}` : '';

  this.index += 1;
  this.toastrService.show(
    body,
    `Notif ${this.index}${titleContent}`,
    config);
}

/**toaster show start */
}
