import { Component, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { ChariotService } from '../../chariot.service';

@Component({
  selector: 'ngx-delete-chariot-dialog',
  templateUrl: 'delete-chariot-dialog.component.html',
  styleUrls: ['delete-chariot-dialog.component.scss'],
})
export class DeleteChariotDialogComponent {

  @Input() title: string;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<DeleteChariotDialogComponent>,private router: Router,private chariotService: ChariotService,private _Activatedroute :ActivatedRoute) {}

  ngOnInit() {
    
  }
  cancel() {
    this.ref.close();
  }

  submitDelete() {
      this.chariotService.deleteChariot(this.title)
        .subscribe(
          data => {
            console.log(data);
            window.location.reload();
          },
          error => console.log('ERROR: ' + error));
  }
  
}


