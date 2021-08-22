import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Det_emba } from '../det-emba';
import { Router } from '@angular/router';
import { SmartTableData } from '../../../@core/data/smart-table';
import { DetEmbaService } from '../det-emba.service';
import { DeleteDetEmbaDialogComponent } from './delete-dialog/delete-det-emba-dialog.component';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDialogService , NbWindowService} from '@nebular/theme';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';


@Component({
  selector: 'ngx-det-emba-list',
  templateUrl: './det-emba-list.component.html',
  styleUrls: ['./det-emba-list.component.scss']
})
export class DetEmbaListComponent implements OnInit {
  
  detembas: Det_emba[];
  searchText;

  statuses: NbComponentStatus[] = ['primary', 'success', 'info', 'warning', 'danger'  ];
  shapes: NbComponentShape[] = [ 'rectangle', 'semi-round', 'round' ];
  sizes: NbComponentSize[] = ['tiny', 'small', 'medium', 'large', 'giant'];

  /*****************************Filtrage des donner *****************************/
  filteredDetEmbas: Det_emba[];
  private _searchTermIdEmba: string;
  private _searchTermNum: string;
  private _searchTermQut: string;
  private _searchTermNumBonPrep: string;
  private _searchTermIdArtLiv: string;
  /**end searsh string */


get searchTermIdEmba(): string {
  return this._searchTermIdEmba;
}
set searchTermIdEmba(value: string){
  this._searchTermIdEmba = value;
  this.filteredDetEmbas = this.filtereDetEmbasIdEmba(value);
}
get searchTermNum(): string {
  return this._searchTermNum;
}
set searchTermNum(value: string){
  this._searchTermNum = value;
  this.filteredDetEmbas = this.filtereDetEmbasNum(value);
}
get searchTermQut(): string {
  return this._searchTermQut;
}
set searchTermQut(value: string){
  this._searchTermQut = value;
  this.filteredDetEmbas = this.filtereDetEmbasQut(value);
}
get searchTermNumBonPrep(): string {
  return this._searchTermNumBonPrep;
}
set searchTermNumBonPrep(value: string){
  this._searchTermNumBonPrep = value;
  this.filteredDetEmbas = this.filtereDetEmbasNumBonPrep(value);
}
get searchTermIdArtLiv(): string {
  return this._searchTermIdArtLiv;
}
set searchTermIdArtLiv(value: string){
  this._searchTermIdArtLiv = value;
  this.filteredDetEmbas = this.filtereDetEmbasIdArtLiv(value);
}

filtereDetEmbasIdEmba(seachBigint: string){
  return this.detembas.filter(Det_emba => Det_emba.id.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereDetEmbasNum(seachBigint: string){
  return this.detembas.filter(Det_emba => Det_emba.num.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereDetEmbasQut(seachBigint: string){
  return this.detembas.filter(Det_emba => Det_emba.qut.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereDetEmbasNumBonPrep(seachString: string){
  return this.detembas.filter(Det_emba => Det_emba.bonprep_detEmbas.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
}
filtereDetEmbasIdArtLiv(seachBigint: string){
  return this.detembas.filter(Det_emba => Det_emba.artliv_detEmbas.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}

/****************Filtrage des donner ***************/

  constructor(private authService: TokenStorageService,private dialogService: NbDialogService, private detembaService: DetEmbaService,
    private router: Router,private service: SmartTableData) {

    }


/*  affichage all detail emmbalage ****************/

authority;
  ngOnInit(){
    this.authService.getAuthorities().forEach(authority => {
      this.authority=authority;
      console.log(this.authority);
    });
    this.getDetEmbas();
  }

  private getDetEmbas() {
    this.detembaService.getDet_embasList().subscribe(data => {
      this.detembas = data;
      this.filteredDetEmbas = this.detembas;
    });
  }

/*  affichage all detail emmbalage ****************/

  deleteDet_emba(id: bigint) {
    this.detembaService.deleteDet_emba(id)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log('ERROR: ' + error));
  }

  det_embaDetails(id: bigint){
    this.router.navigate(['details', id]);
  }

  source: LocalDataSource = new LocalDataSource();



  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  /* delete popap*/
  id:any;
  OpenDeletePopap(id) {
    this.dialogService.open(DeleteDetEmbaDialogComponent, {
      context: {
        title: id,
      },
    });
  }
/* end the popap **/  
}