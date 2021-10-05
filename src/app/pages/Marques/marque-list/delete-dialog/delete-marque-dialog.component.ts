import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { MarqueService } from '../../marque.service';
import { MarqueListComponent } from '../marque-list.component';

@Component({
  selector: 'ngx-delete-marque-dialog',
  templateUrl: 'delete-marque-dialog.component.html',
  styleUrls: ['delete-marque-dialog.component.scss'],
})
export class DeleteMarqueDialogComponent {

  @Input() title: string;

  private notify: MarqueListComponent;

  constructor(protected ref: NbDialogRef<DeleteMarqueDialogComponent>,private router: Router,private marqueService: MarqueService,
    private _Activatedroute :ActivatedRoute) {
    }

  cancel() {
    this.ref.close();
  }

  submitDelete() {
    this.marqueService.deleteMarque(this.title)
      .subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        error => console.log('ERROR: ' + error));
  }
}
