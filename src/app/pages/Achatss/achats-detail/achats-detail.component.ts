import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { TokenStorageService } from '../../auth/token-storage.service';
import { PagesComponent } from '../../pages.component';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { Achats } from '../Achats';
import { AchatsService } from '../achats.service';

@Component({
  selector: 'ngx-achats-detail',
  templateUrl: './achats-detail.component.html',
  styleUrls: ['./achats-detail.component.scss']
})
export class AchatsDetailComponent implements OnInit {
  roles:string[];
  achats:Achats;
  artachas:any[] = [];
  achatss: any[] = [];
  users: Utilisateur[];
  numDocAchat: string;
  statuses: any[];
  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(private achatsService: AchatsService , private router : Router,private _Activatedroute :ActivatedRoute,private pagesComponent: PagesComponent,private authService: TokenStorageService) { }

  ngOnInit() {
      

    this.achats = new Achats();

    this.numDocAchat = this._Activatedroute.snapshot.params['numDocAchat'];
  
    this.achatsService.getArtAchaForAchats(this.numDocAchat).subscribe(data => {
      this.artachas = data;
      this.loading = false;
    });

    this.achatsService.getAchatss(this.numDocAchat).subscribe(data => {
      this.achats = data;
      console.log(data)
    });
  }


  clear(table: Table) {
      table.clear();
  }

  list(){
    this.router.navigate(['achats']);
  }

    /**Popaps for inside table */
    displayModal: boolean;
    position: string;
    displayPositionQutLiv: boolean;
    displayPositionBonise: boolean;
    displayPositionPrixAch: boolean;
    displayPositionPrixVen: boolean;
    displayPositionTva: boolean;
    displayPositionDate: boolean;
    displayPositionPrixAMp: boolean;
    displayPositionCentre: boolean;
    showModalDialog() {
      this.displayModal = true;
    }
    showPositionDialogBonise(position: string) {
      this.position = position;
      this.displayPositionBonise = true;
    }
    showPositionDialogPrixAch(position: string) {
      this.position = position;
      this.displayPositionPrixAch = true;
    }
    showPositionDialogPrixVen(position: string) {
      this.position = position;
      this.displayPositionPrixVen = true;
    }
    showPositionDialogTva(position: string) {
      this.position = position;
      this.displayPositionTva = true;
    }
    showPositionDialogPrixAMp(position: string) {
      this.position = position;
      this.displayPositionPrixAMp = true;
    }
    showPositionDialogCentre(position: string) {
      this.position = position;
      this.displayPositionCentre = true;
    }
}
