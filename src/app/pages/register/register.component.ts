import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';
import * as ɵngcc0 from '@angular/core';
import { NbAuthSocialLink } from '@nebular/auth/auth.options';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  statuses: NbComponentStatus[] = ['primary', 'success', 'info', 'warning', 'danger'  ];
  shapes: NbComponentShape[] = [ 'rectangle', 'semi-round', 'round' ];
  sizes: NbComponentSize[] = ['tiny', 'small', 'medium', 'large', 'giant'];
  
  constructor(private toastrService: NbToastrService,private authService: AuthService, cd: ChangeDetectorRef,private router: Router) { }

  ngOnInit() { }
  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.lastname,
      this.form.firstname,
      this.form.username,
      this.form.email,
      this.form.password,
      this.form.typeContrat,
      this.form.typeConge,
      this.form.authorisation,
      this.form.connected = 0,
      );

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.makeToast();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
        this.makeToast2();
      }
    );
  }











  /**template nebular  */

  protected options: {};
  protected cd: ChangeDetectorRef;
  redirectDelay: number;
  showMessages: any;
  strategy: string;
  submitted: boolean;
  errors: string[];
  messages: string[];
  user: any;
  socialLinks: NbAuthSocialLink[];
  static ɵfac: ɵngcc0.ɵɵFactoryDef<RegisterComponent, never>;
  static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<RegisterComponent, "nb-register", never, {}, {}, never, never>;


  /**end template nebular */




    /**toaster show start */
config: NbToastrConfig;

index = 1;
destroyByClick = true;
duration = 4000;
hasIcon = true;
position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
preventDuplicates = false;

status: NbComponentStatus = 'success';

title = 'inscription avec succée!';
content = `Le bienvenu!`;
status2: NbComponentStatus = 'warning';

title2 = 'inscription n est pas faite !!!';
content2 = `Utilisateur existe deja!`;


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
