import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { EtatLivService } from '../../etat-liv.service';

@Component({
  selector: 'ngx-delete-etat-liv-dialog',
  templateUrl: 'delete-etat-liv-dialog.component.html',
  styleUrls: ['delete-etat-liv-dialog.component.scss'],
})
export class DeleteEtatLivDialogComponent {

  @Input() title: bigint;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<DeleteEtatLivDialogComponent>,private router: Router,private etatlivService: EtatLivService,private _Activatedroute :ActivatedRoute) {}

  ngOnInit() {
    
  }
  cancel() {
    this.ref.close();
  }

  submitDelete() {

      this.etatlivService.deleteEtat_liv(this.title.toString())
        .subscribe(
          data => {
            console.log(data);
            window.location.reload();
          },
          error => console.log('ERROR: ' + error));
  }
}
