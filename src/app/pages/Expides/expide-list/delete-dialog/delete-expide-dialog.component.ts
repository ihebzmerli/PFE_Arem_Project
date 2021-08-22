import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { ExpideService } from '../../expide.service';

@Component({
  selector: 'ngx-delete-expide-dialog',
  templateUrl: 'delete-expide-dialog.component.html',
  styleUrls: ['delete-expide-dialog.component.scss'],
})
export class DeleteExpideDialogComponent {

  @Input() title: string;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<DeleteExpideDialogComponent>,private router: Router,private expideService: ExpideService,private _Activatedroute :ActivatedRoute) {}

  cancel() {
    
    this.ref.close();
  }

  submitDelete() {
    this.expideService.deleteExpide(this.title.toString())
      .subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        error => console.log('ERROR: ' + error));
}
}
