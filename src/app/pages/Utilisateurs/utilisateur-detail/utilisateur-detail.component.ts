import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { TokenStorageService } from '../../auth/token-storage.service';
import { PagesComponent } from '../../pages.component';
import { Utilisateur } from '../utilisateur';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'ngx-utilisateur-detail',
  templateUrl: './utilisateur-detail.component.html',
  styleUrls: ['./utilisateur-detail.component.scss']
})
export class UtilisateurDetailComponent implements OnInit {

  constructor(private pagesComponent: PagesComponent,private authService: TokenStorageService) { }
  user_id: bigint;
  utilisateur: Utilisateur;

  ngOnInit() {
    this.utilisateur = new Utilisateur();
  }
}


