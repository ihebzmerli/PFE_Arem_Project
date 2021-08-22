import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { ModelService } from '../../model.service';
import { ModelListComponent } from '../model-list.component';

@Component({
  selector: 'ngx-delete-model-dialog',
  templateUrl: 'delete-model-dialog.component.html',
  styleUrls: ['delete-model-dialog.component.scss'],
})
export class DeleteModelDialogComponent {

  @Input() title: string;
  private notify: ModelListComponent;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<DeleteModelDialogComponent>,private router: Router,private modelService: ModelService,
    private _Activatedroute :ActivatedRoute) {}

  cancel() {
    this.ref.close();
  }

  submitDelete() {
    this.modelService.deleteModel(this.title)
      .subscribe(
        data => {
          console.log(data);
          this.notify.ngOnInit();
        },
        error => console.log('ERROR: ' + error));
  }
}
