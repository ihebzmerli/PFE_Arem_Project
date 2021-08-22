import { Component, OnInit, Input } from '@angular/core';
import { Livreur } from '../livreur';
import { ActivatedRoute, Router } from '@angular/router';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { LivreurService } from '../livreur.service';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { Table } from 'primeng/table';
import { Prime } from '../../Primes/prime';
import { trigger,style,transition,animate,keyframes,query,stagger, state} from '@angular/animations';
import { delay } from 'rxjs/operators';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
@Component({
  selector: 'ngx-livreur-detail',
  templateUrl: './livreur-detail.component.html',
  styleUrls: ['./livreur-detail.component.scss'],
  animations: [

    trigger('commeAjout',[
      transition('* => *', [
        query(':entre', style({ opacity: 0}), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0,transform: 'translateY(-75px)',offset: 0}),
            style({opacity: .5,transform: 'translateY(-35px)',offset: 0.3}),
            style({opacity: 1,transform: 'translateY(-0px)',offset: 1}),
          ]))
        ]))
      ])
    ]),
    trigger('visibilityChanged', [
      state('in', style({
        opacity: 0
      })),
      state('out',   style({
        opacity: 1
      })),
      transition('in => out', animate('100ms ease-in')),
      transition('out => in', animate('100ms ease-out'))
    ]),
    trigger('wariniw5abini', [
      state('show', style({
        opacity: 1
      })),
      state('hide',   style({
        opacity: 0
      })),
      transition('show => hide', animate('600ms ease-in')),
      transition('hide => show', animate('1000ms ease-out'))
    ]),
    trigger('jibniwimchi', [
      transition(':enter', [
        style({transform: 'translateX(-100%'}),
        animate('1s')
      ]),
      transition(':leave', [
        animate('1s', style({transform: 'translateX(-100%'}))
      ])
    ])
  ]
})
export class LivreurDetailComponent implements OnInit {

  primes: Prime;
  livreurs: Livreur;
  id_livreur: string;

  statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  livreur: Livreur;

  constructor(private authService: TokenStorageService,private livreurService: LivreurService , private router : Router,private _Activatedroute :ActivatedRoute) { }

  ngOnInit() {
    
    this.livreur = new Livreur();

    this.id_livreur = this._Activatedroute.snapshot.params['id_livreur'];

    this.livreurService.getLivreur(this.id_livreur).subscribe(data => {
      this.livreurs = data;
      console.log(data)
    });
  }


  clear(table: Table) {
      table.clear();
  }


  goList(){
    this.router.navigate(['//pages/Livreurs/livreur-list']);
  }

    /**Popaps for inside table */
    displayModal: boolean;
    position: string;
    displayPositionCategorie: boolean;
    displayPositionRaison: boolean;
    displayPositionCa: boolean;
    displayPositionCaN1: boolean;
    displayPositionDerMvt: boolean;
    displayPositionPrime: boolean;

    showModalDialog() {
      this.displayModal = true;
    }
    showPositionDialogCategorie(position: string) {
      this.position = position;
      this.displayPositionCategorie = true;
    }
    showPositionDialogRaison(position: string) {
      this.position = position;
      this.displayPositionRaison = true;
    }
    showPositionDialogCa(position: string) {
      this.position = position;
      this.displayPositionCa = true;
    }
    showPositionDialogCaN1(position: string) {
      this.position = position;
      this.displayPositionCaN1 = true;
    }
    showPositionDialogDerMvt(position: string) {
      this.position = position;
      this.displayPositionDerMvt = true;
    }
    showPositionDialogPrime(position: string) {
      this.position = position;
      this.displayPositionPrime = true;
    }

}



