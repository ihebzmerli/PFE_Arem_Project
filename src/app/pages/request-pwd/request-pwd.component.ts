/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as ɵngcc0 from '@angular/core';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { AuthService } from '../auth/auth.service';
import { RequestPwdInfo } from '../auth/request-pwd-info';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-request-pwd',
    templateUrl: './request-pwd.component.html',
    styleUrls: ['./request-pwd.component.scss'],
  })

export class RequestPwdComponent implements OnInit {

  requestpwdInfo: RequestPwdInfo;
  form: any = {};
  isPasswordRequested = false;
  isPasswordAsking = true;

  isPasswordBlocked2 = false;
  isPasswordBlocked3 = false;
  isPasswordBlocked4 = false;
  isPasswordBlocked5 = false;
  
  errorMessage = '';

  statuses: NbComponentStatus[] = ['primary', 'success', 'info', 'warning', 'danger'  ];
  shapes: NbComponentShape[] = [ 'rectangle', 'semi-round', 'round' ];
  sizes: NbComponentSize[] = ['tiny', 'small', 'medium', 'large', 'giant'];
  
  constructor(private toastrService: NbToastrService,private authService: AuthService, cd: ChangeDetectorRef,private router: Router) { }

  ngOnInit() { }
  onSubmit() {
    console.log(this.form);

    this.requestpwdInfo = new RequestPwdInfo(
      this.form.email
      );

    this.authService.requestpwd(this.requestpwdInfo).subscribe(
      data => {
        console.log(data);
        this.isPasswordRequested = true;
        this.isPasswordAsking = false;
        this.makeToast();
      },
      error => {
        if (error instanceof HttpErrorResponse) {
         if (error.status === 103) {
            this.isPasswordAsking = false;
            this.isPasswordBlocked2 = true;
            this.makeToast2();
          }else if (error.status === 429) {
            this.isPasswordAsking = false;
            this.isPasswordBlocked3 = true;
            this.makeToast2();
          }else if (error.status === 400) {
            this.isPasswordAsking = false;
            this.isPasswordBlocked4 = true;
            this.makeToast2();
          }else{
            this.isPasswordAsking = false;
            this.isPasswordBlocked5 = true;
            this.makeToast3();
          }
        }
      }
    );
  }
  reffrechMe() {
    window.location.reload();
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<RequestPwdComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<RequestPwdComponent, "nb-request-password-page", never, {}, {}, never, never>;


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
    
    title = 'Demande avec succée!';
    content = `Mot de passe envoyer!`;
    status2: NbComponentStatus = 'warning';
    
    title2 = 'Demande n est pas faite !!!';
    content2 = `Utilisateur est blocké!`;
    
    status3: NbComponentStatus = 'danger';
    
    title3 = 'Demande n est pas faite !!!';
    content3 = `Utilisateur n'existe pas!`;
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
    

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1wYXNzd29yZC5jb21wb25lbnQuZC50cyIsInNvdXJjZXMiOlsicmVxdWVzdC1wYXNzd29yZC5jb21wb25lbnQuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE5iQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTmJSZXF1ZXN0UGFzc3dvcmRDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCBzZXJ2aWNlOiBOYkF1dGhTZXJ2aWNlO1xuICAgIHByb3RlY3RlZCBvcHRpb25zOiB7fTtcbiAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmO1xuICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcjtcbiAgICByZWRpcmVjdERlbGF5OiBudW1iZXI7XG4gICAgc2hvd01lc3NhZ2VzOiBhbnk7XG4gICAgc3RyYXRlZ3k6IHN0cmluZztcbiAgICBzdWJtaXR0ZWQ6IGJvb2xlYW47XG4gICAgZXJyb3JzOiBzdHJpbmdbXTtcbiAgICBtZXNzYWdlczogc3RyaW5nW107XG4gICAgdXNlcjogYW55O1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2U6IE5iQXV0aFNlcnZpY2UsIG9wdGlvbnM6IHt9LCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHJvdXRlcjogUm91dGVyKTtcbiAgICByZXF1ZXN0UGFzcygpOiB2b2lkO1xuICAgIGdldENvbmZpZ1ZhbHVlKGtleTogc3RyaW5nKTogYW55O1xufVxuIl19