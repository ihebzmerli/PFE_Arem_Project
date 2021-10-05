import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { UtilisateurService } from '../../utilisateur.service';
@Component({
  selector: 'ngx-delete-utilisateur-dialog',
  templateUrl: './delete-utilisateur-dialog.component.html',
  styleUrls: ['./delete-utilisateur-dialog.component.scss']
})
export class DeleteUtilisateurDialogComponent implements OnInit {

  @Input() title: string;

  constructor(private authService: TokenStorageService, protected ref: NbDialogRef<DeleteUtilisateurDialogComponent>,private router: Router,private utilisateurService: UtilisateurService,
    private _Activatedroute :ActivatedRoute) {}

  ngOnInit() {
    
  }
  cancel() {
    this.ref.close();
  }

  submitDelete() {
      this.utilisateurService.deleteUtilisateur(this.title)
        .subscribe(
          data => {
            console.log(data);
            window.location.reload();
          },
          error => console.log('ERROR: ' + error));
    }
  }
