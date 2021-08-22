import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { BonPrepService } from '../../bon-prep.service';
@Component({
  selector: 'ngx-delete-bon-prep-dialog',
  templateUrl: './delete-bon-prep-dialog.component.html',
  styleUrls: ['./delete-bon-prep-dialog.component.scss']
})
export class DeleteBonPrepDialogComponent implements OnInit {

  @Input() title: string;

  constructor(private authService: TokenStorageService, protected ref: NbDialogRef<DeleteBonPrepDialogComponent>,private router: Router,private bonprepService: BonPrepService,
    private _Activatedroute :ActivatedRoute) {}

  ngOnInit() {
    
  }
  cancel() {
    this.ref.close();
  }

  submitDelete() {
      this.bonprepService.deleteBon_prep(this.title)
        .subscribe(
          data => {
            console.log(data);
            window.location.reload();
          },
          error => console.log('ERROR: ' + error));
    }
  }
