import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { DetEmbaService } from '../../det-emba.service';

@Component({
  selector: 'ngx-delete-det-emba-dialog',
  templateUrl: 'delete-det-emba-dialog.component.html',
  styleUrls: ['delete-det-emba-dialog.component.scss'],
})
export class DeleteDetEmbaDialogComponent {

  @Input() title: bigint;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<DeleteDetEmbaDialogComponent>,private router: Router, private detembaService: DetEmbaService,private _Activatedroute :ActivatedRoute) {}


  ngOnInit() {
    
  }
  cancel() {
    this.ref.close();
  }

  submitDelete() {
      this.detembaService.deleteDet_emba(this.title)
        .subscribe(
          data => {
            console.log(data);
            window.location.reload();
          },
          error => console.log('ERROR: ' + error));
    }
}
