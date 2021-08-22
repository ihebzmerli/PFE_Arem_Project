import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { PrimeService } from '../../prime.service';

@Component({
  selector: 'ngx-delete-prime-dialog',
  templateUrl: 'delete-prime-dialog.component.html',
  styleUrls: ['delete-prime-dialog.component.scss'],
})
export class DeletePrimeDialogComponent {

  @Input() title: string;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<DeletePrimeDialogComponent>,private router: Router,private primeService: PrimeService,
    private _Activatedroute :ActivatedRoute) {}

  cancel() {
    this.ref.close();
  }

  submitDelete() {
    this.primeService.deletePrime(this.title)
      .subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        error => console.log('ERROR: ' + error));
  }
}
