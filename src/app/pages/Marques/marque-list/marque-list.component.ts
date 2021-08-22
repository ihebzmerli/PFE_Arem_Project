import { Component, OnInit } from '@angular/core';
import { Marque } from '../marque';
import { Observable } from 'rxjs';
import { MarqueService } from '../marque.service';
import { Router } from '@angular/router';
import { SmartTableData } from '../../../@core/data/smart-table';

import { LocalDataSource } from 'ng2-smart-table';

import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDialogService , NbWindowService} from '@nebular/theme';
import { DeleteMarqueDialogComponent } from './delete-dialog/delete-marque-dialog.component';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-marque-list',
  templateUrl: './marque-list.component.html',
  styleUrls: ['./marque-list.component.scss']
})
export class MarqueListComponent implements OnInit {
  searchText;
  marques: Marque[];
  
  statuses: NbComponentStatus[] = ['info' ];
  shapes: NbComponentShape[] = [ 'rectangle' ];
  sizes: NbComponentSize[] = ['medium'];

      /*****************************Filtrage des donner *****************************/
      filteredMarques: Marque[];
      private _searchTermCode: string;
      private _searchTermTitle: string;
      /**end searsh string */
    
  
    get searchTermCode(): string {
      return this._searchTermCode;
    }
    set searchTermCode(value: string){
      this._searchTermCode = value;
      this.filteredMarques = this.filtereMarquesCode(value);
    }
  
    get searchTermTitle(): string {
      return this._searchTermTitle;
    }
    set searchTermTitle(value: string){
      this._searchTermTitle = value;
      this.filteredMarques = this.filtereMarquesNumRec(value);
    }

  
    filtereMarquesCode(seachBigint: string){
      return this.marques.filter(Marque => Marque.code.toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
    }
    filtereMarquesNumRec(seachString: string){
      return this.marques.filter(Marque => Marque.title.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }

    /****************Filtrage des donner ***************/

    

  constructor(private authService: TokenStorageService,private dialogService: NbDialogService, private marqueService: MarqueService,
    private router: Router,private service: SmartTableData) {

    }


/*  affichage all marque ****************/
  authority;

  ngOnInit(): void {
    this.authService.getAuthorities().forEach(authority => {
      this.authority=authority;
      console.log(this.authority);
    });

    this.getMarques();
  }

  private getMarques() {
    this.marqueService.getMarquesList().subscribe(data => {
      this.marques = data;
      this.filteredMarques = this.marques;
    });
  }

  
  goToModifier(id: string ){
    this.router.navigate(['//pages/Marques/update-marque',id])
    }
/*  affichage all marque ****************/


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
        this.dialogService.open(DeleteMarqueDialogComponent, {
          context: {
            title: id,
          },
        });
      }
  /* end the popap **/   
}