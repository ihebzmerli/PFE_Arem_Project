import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';

@Component({
  selector: 'ngx-delete-det-prep-dialog',
  templateUrl: 'delete-det-prep-dialog.component.html',
  styleUrls: ['delete-det-prep-dialog.component.scss'],
})
export class DeleteDetPrepDialogComponent {

  @Input() title: string;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<DeleteDetPrepDialogComponent>) {}

  cancel() {
    
    this.ref.close();
  }

  submit(name) {
    this.ref.close(name);
  }
}
