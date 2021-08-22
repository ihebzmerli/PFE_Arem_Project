import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { BonLivService } from '../../bon-liv.service';

@Component({
  selector: 'ngx-delete-bon-liv-dialog',
  templateUrl: 'delete-bon-liv-dialog.component.html',
  styleUrls: ['delete-bon-liv-dialog.component.scss'],
})
export class DeleteBonLivDialogComponent {

  @Input() title: string;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<DeleteBonLivDialogComponent>,private router: Router,private bonlivService: BonLivService,
    private _Activatedroute :ActivatedRoute) {}


  ngOnInit() {
    
  }
  
  cancel() {
    this.ref.close();
  }

  submitDelete() {
    this.bonlivService.deleteBon_liv(this.title)
      .subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        error => console.log('ERROR: ' + error));
  }
}
