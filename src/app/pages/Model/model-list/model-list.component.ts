import { Component, OnInit } from '@angular/core';
import { Model } from '../model';
import { Observable } from 'rxjs';
import { ModelService } from '../model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartTableData } from '../../../@core/data/smart-table';

import { LocalDataSource } from 'ng2-smart-table';

import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDialogService , NbWindowService} from '@nebular/theme';
import { DeleteModelDialogComponent } from './delete-dialog/delete-model-dialog.component';
import { MarqueService } from '../../Marques/marque.service';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {
  searchText;
  models: Model[];
  marque_id: string;
  statuses: NbComponentStatus[] = ['info' ];
  shapes: NbComponentShape[] = [ 'rectangle' ];
  sizes: NbComponentSize[] = ['medium'];

      /*****************************Filtrage des donner *****************************/
      filteredModels: Model[];
      private _searchTermCode: string;
      private _searchTermTitle: string;
      private _searchTermMarque: string;
      /**end searsh string */
    
  
    get searchTermCode(): string {
      return this._searchTermCode;
    }
    set searchTermCode(value: string){
      this._searchTermCode = value;
      this.filteredModels = this.filtereModelsNom(value);
    }
  
    get searchTermTitle(): string {
      return this._searchTermTitle;
    }
    set searchTermTitle(value: string){
      this._searchTermTitle = value;
      this.filteredModels = this.filtereModelsTitle(value);
    }
    get searchTermMarque(): string {
      return this._searchTermMarque;
    }
    set searchTermMarque(value: string){
      this._searchTermMarque = value;
      this.filteredModels = this.filtereModelsMarque(value);
    }

  
    filtereModelsNom(seachBigint: string){
      return this.models.filter(Model => Model.code.toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
    }
    filtereModelsTitle(seachString: string){
      return this.models.filter(Model => Model.title.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    filtereModelsMarque(seachString: string){
      return this.models.filter(Model => Model.marque.title.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
    }
    /****************Filtrage des donner ***************/

    

  constructor(private authService: TokenStorageService,private dialogService: NbDialogService,private _Activatedroute :ActivatedRoute, private marqueService: MarqueService, private modelService: ModelService,
    private router: Router,private service: SmartTableData) {

    }


/*  affichage all model ****************/
  authority;

  ngOnInit(): void {

    this.authService.getAuthorities().forEach(authority => {
      this.authority=authority.toString();
      console.log(this.authority);
    });

    this.getModels();
    
  }

  private getModels() {

    this.marque_id = this._Activatedroute.snapshot.params['marque_id'];

    console.log(this.marque_id);
    if(this.marque_id){
    this.modelService.getAllModelByMarque(this.marque_id).subscribe(data => {
      this.models = data;
      this.filteredModels = this.models;
    });
  }else{
    this.modelService.getModelsList().subscribe(data => {
      this.models = data;
      this.filteredModels = this.models;
    });
  }
  }

  goToCharts($myParam: string = ''): void {
    const navigationDetails: string[] = ['//pages/Models/echarts-model'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }
  
  goToModifier(id: string ){
    this.router.navigate(['//pages/Models/update-model',id])
    }
/*  affichage all Model ****************/


modelDetails(id: bigint){
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
        this.dialogService.open(DeleteModelDialogComponent, {
          context: {
            title: id,
          },
        });
      }
  /* end the popap **/   
}