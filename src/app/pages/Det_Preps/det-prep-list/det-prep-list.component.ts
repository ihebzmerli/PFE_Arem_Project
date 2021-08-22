import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Det_prep } from '../det-prep';
import { Router } from '@angular/router';
import { DetPrepService } from '../det-prep.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDialogService , NbWindowService} from '@nebular/theme';
import { DeleteDetPrepDialogComponent } from './delete-dialog/delete-det-prep-dialog.component';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-det-prep-list',
  templateUrl: './det-prep-list.component.html',
  styleUrls: ['./det-prep-list.component.scss']
})
export class DetPrepListComponent implements OnInit {
  
  detpreps: Det_prep[];

  searchText;
    /*****************************Filtrage des donner *****************************/
    filteredDetPreps: Det_prep[];
    private _searchTermZone: string;
    private _searchTermPrepara: string;

    /**end searsh string */
  
  
  get searchTermZone(): string {
    return this._searchTermZone;
  }
  set searchTermZone(value: string){
    this._searchTermZone = value;
    this.filteredDetPreps = this.filtereDetPrepsZone(value);
  }
  get searchTermPrepara(): string {
    return this._searchTermPrepara;
  }
  set searchTermPrepara(value: string){
    this._searchTermPrepara = value;
    this.filteredDetPreps = this.filtereDetPrepsPrepara(value);
  }

  filtereDetPrepsZone(seachString: string){
    return this.detpreps.filter(Det_prep => Det_prep.zone.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereDetPrepsPrepara(seachString: string){
    return this.detpreps.filter(Det_prep => Det_prep.prepara.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  
  /****************Filtrage des donner ***************/
  constructor(private authService: TokenStorageService,private dialogService: NbDialogService, private detprepService: DetPrepService,
    private router: Router,private service: SmartTableData) {

    }


/*  affichage all detPrep ****************/

  ngOnInit(){
    
    this.getDetPreps();
  }

  private getDetPreps() {
    this.detprepService.getDet_prepsList().subscribe(data => {
      this.detpreps = data;
      this.filteredDetPreps = this.detpreps;
    });
  }

/*  affichage all detPrep ****************/

  deleteDet_prep(id: bigint) {
    this.detprepService.deleteDet_prep(id)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log('ERROR: ' + error));
  }

  det_prepDetails(id: bigint){
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

    OpenDeletePopap() {
      this.dialogService.open(DeleteDetPrepDialogComponent, {
        context: {
          title: 'This is a title passed to the dialog component',
        },
      });
    }
  /* end the popap **/  
}