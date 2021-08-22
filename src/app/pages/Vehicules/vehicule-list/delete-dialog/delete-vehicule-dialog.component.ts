import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { VehiculeService } from '../../vehicule.service';

@Component({
  selector: 'ngx-delete-vehicule-dialog',
  templateUrl: 'delete-vehicule-dialog.component.html',
  styleUrls: ['delete-vehicule-dialog.component.scss'],
})
export class DeleteVehiculeDialogComponent {

  @Input() title: string;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<DeleteVehiculeDialogComponent>,private router: Router,private vehiculeService: VehiculeService,
    private _Activatedroute :ActivatedRoute) {}

  cancel() {
    this.ref.close();
  }

  submitDelete() {
    this.vehiculeService.deleteVehicule(this.title)
      .subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        error => console.log('ERROR: ' + error));
  }
}
