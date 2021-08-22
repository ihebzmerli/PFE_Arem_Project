import { Component, OnDestroy } from '@angular/core';
import { NbAuthResult } from '@nebular/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'nb-oauth2-login',
    template: `
      <button class="btn btn-success" *ngIf="!token" (click)="login()">Sign In with Google</button>
    `,
  })
  export class NbOAuth2LoginComponent implements OnDestroy {
  
    private destroy$ = new Subject<void>();
    authService: any;
  
    login() {
      this.authService.authenticate('google')
        .pipe(takeUntil(this.destroy$))
        .subscribe((authResult: NbAuthResult) => {
        });
    }
  
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }