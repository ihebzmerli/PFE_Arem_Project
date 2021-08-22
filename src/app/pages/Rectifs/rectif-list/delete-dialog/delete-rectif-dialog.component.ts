import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';

@Component({
  selector: 'ngx-delete-rectif-dialog',
  templateUrl: 'delete-rectif-dialog.component.html',
  styleUrls: ['delete-rectif-dialog.component.scss'],
})
export class DeleteRectifDialogComponent {

  @Input() title: string;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<DeleteRectifDialogComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(name) {
    this.ref.close(name);
  }
}
