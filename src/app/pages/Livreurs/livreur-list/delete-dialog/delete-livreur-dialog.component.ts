import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { LivreurService } from '../../livreur.service';

@Component({
  selector: 'ngx-delete-livreur-dialog',
  templateUrl: 'delete-livreur-dialog.component.html',
  styleUrls: ['delete-livreur-dialog.component.scss'],
})
export class DeleteLivreurDialogComponent {

  @Input() title: string;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<DeleteLivreurDialogComponent>,private router: Router,private livreurService: LivreurService,
    private _Activatedroute :ActivatedRoute) {}

  cancel() {
    this.ref.close();
  }

  submitDelete() {
    this.livreurService.deleteLivreur(this.title)
      .subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        error => console.log('ERROR: ' + error));
  }
}
