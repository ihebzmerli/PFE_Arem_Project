import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chronometer, StatusChonometer } from 'ngx-chronometer';
import { TokenStorageService } from '../../auth/token-storage.service';
import { PagesComponent } from '../../pages.component';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { Etat_liv } from '../etat-liv';
import { EtatLivService } from '../etat-liv.service';


@Component({
  selector: 'ngx-etat-liv-detail',
  templateUrl: './etat-liv-detail.component.html',
  styleUrls: ['./etat-liv-detail.component.scss']
})
export class EtatLivDetailComponent implements OnInit {

  etatliv:Etat_liv;
  artpreps:any[] = [];
  bonlivs: any[] = [];
  users: Utilisateur[];
  id: string;
  statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  chronometers: Array<Chronometer> = Array<Chronometer>();
  constructor(public datepipe: DatePipe, private authService: TokenStorageService,private etatlivService: EtatLivService , private router : Router,private _Activatedroute :ActivatedRoute) { }


  starterCrono:string;
  ngOnInit() {
    
    this.etatliv = new Etat_liv();

    this.id = this._Activatedroute.snapshot.params['id'];

    this.etatlivService.getEtat_liv(this.id).subscribe(data => {
      this.etatliv = data;
      let datetest = this.datepipe.transform(this.etatliv.date,'yyyy-MM-dd hh:mm:ss')
      this.starterCrono = datetest;
      this.etatlivService.getEtatCronometre(this.starterCrono).subscribe(data2 => {
        this.starterCrono = data2;

        if(this.etatliv.confirmation!="recu_est_verifier"){
          this.chronometers = new Array<Chronometer>(
            new Chronometer({
                id: 3,
                status: StatusChonometer.start,
                second: this.starterCrono,
            })
          );
        }else{
          this.chronometers = new Array<Chronometer>(
            new Chronometer({
                id: 3,
                status: StatusChonometer.pause,
                second: this.starterCrono,
            })
          );
        }


    })
      this.loading = false;
      console.log(data)
    });
  }

  run(chronometer: Chronometer, status: StatusChonometer) {
    chronometer.status = status;
    switch (chronometer.status) {
    case StatusChonometer.pause:
        chronometer.pause();
        break;
    case StatusChonometer.restart:
        chronometer.restart();
        break;
    case StatusChonometer.start:
        chronometer.start();
        break;
    default:
        break;
    }

}

}
