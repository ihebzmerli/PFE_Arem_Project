import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { BonSortService } from '../../bon-sort.service';

@Component({
  selector: 'ngx-delete-bon-sort-dialog',
  templateUrl: 'delete-bon-sort-dialog.component.html',
  styleUrls: ['delete-bon-sort-dialog.component.scss'],
})
export class DeleteBonSortDialogComponent {

  @Input() title: string;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<DeleteBonSortDialogComponent>,private router: Router,private bonsortService: BonSortService,private _Activatedroute :ActivatedRoute) {}
  ngOnInit() {
    
  }
  cancel() {
    this.ref.close();
  }

  submitDelete() {
    this.bonsortService.deleteBon_sort(this.title)
      .subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        error => console.log('ERROR: ' + error));
  }
}
