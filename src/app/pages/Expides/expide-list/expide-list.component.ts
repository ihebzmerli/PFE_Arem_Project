import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { Expide } from '../expide';
import { Observable } from 'rxjs';
import { ExpideService } from '../expide.service';
import { ActivatedRoute, Router } from '@angular/router';

import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDialogService , NbWindowService} from '@nebular/theme';
import { DeleteExpideDialogComponent } from './delete-dialog/delete-expide-dialog.component';
import { WindowDateFilterComponent } from './window-date-filter/window-date-filter.component';
import { Utilisateur } from '../../Utilisateurs/utilisateur';
import { UtilisateurService } from '../../Utilisateurs/utilisateur.service';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-expide-list',
  templateUrl: './expide-list.component.html',
  styleUrls: ['./expide-list.component.scss']
})
export class ExpideListComponent implements OnInit {
  statuses: NbComponentStatus[] = ['info' ];
  shapes: NbComponentShape[] = [ 'rectangle' ];
  sizes: NbComponentSize[] = ['medium'];
  searchText;
  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
  expides: Expide[];

    /*****************************Filtrage des donner *****************************/

    filteredExpides: Expide[];
    private _searchTermNunExpedition: string;
    private _searchTermTransp: string;
    private _searchTermMatAgent: string;
    private _searchTermMatricule: string;
    private _searchTermTypeDoc: string;
    /**end searsh string */
  

  get searchTermNunExpedition(): string {
    return this._searchTermNunExpedition;
  }
  set searchTermNunExpedition(value: string){
    this._searchTermNunExpedition = value;
    this.filteredExpides = this.filtereExpidesNunExpedition(value);
  }
  get searchTermTransp(): string {
    return this._searchTermTransp;
  }
  set searchTermTransp(value: string){
    this._searchTermTransp = value;
    this.filteredExpides = this.filtereExpidesTransp(value);
  }
  get searchTermMatAgent(): string {
    return this._searchTermMatAgent;
  }
  set searchTermMatAgent(value: string){
    this._searchTermMatAgent = value;
    this.filteredExpides = this.filtereExpidesMatAgent(value);
  }
  get searchTermMatricule(): string {
    return this._searchTermMatricule;
  }
  set searchTermMatricule(value: string){
    this._searchTermMatricule = value;
    this.filteredExpides = this.filtereExpidesMatricule(value);
  }
  get searchTermTypeDoc(): string {
    return this._searchTermTypeDoc;
  }
  set searchTermTypeDoc(value: string){
    this._searchTermTypeDoc = value;
    this.filteredExpides = this.filtereExpidesTypeDoc (value);
  }

  filtereExpidesNunExpedition(seachBigint: string){
    return this.expides.filter(Expide => Expide.id.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereExpidesTransp(seachString: string){
    return this.expides.filter(Expide => Expide.transp.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereExpidesMatAgent(seachBigint: string){
    return this.expides.filter(Expide => Expide.matAgent.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereExpidesMatricule(seachString: string){
    return this.expides.filter(Expide => Expide.matricule.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereExpidesTypeDoc(seachString: string){
    return this.expides.filter(Expide => Expide.typeDoc.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  /****************Filtrage des donner ***************/

  constructor(private authService: TokenStorageService,private dialogService: NbDialogService, private expideService: ExpideService,private utilisateurService:UtilisateurService,
    private router: Router,private service: SmartTableData,private windowService: NbWindowService,private _Activatedroute :ActivatedRoute) {

    }




/*  affichage all expedition ****************/
statusessTypExp:any;
agents:Utilisateur[];
statusessRole:any;
authority;
  ngOnInit() {
    
    this.authService.getAuthorities().forEach(authority => {
      this.authority=authority;
      console.log(this.authority);
    });
    this.getExpides();

    this.statusessTypExp = [
      {label: 'sur_comptoir', value: 'sur_comptoir'},
      {label: 'livraison_voiture', value: 'livraison_voiture'}
    ]

    this.utilisateurService.getUtilisateursList().subscribe(data => {
      this.agents = data;
    });
    this.utilisateurService.getRoles().subscribe(data => {
      this.statusessRole = data;
      console.log(data);
    });
  }

  private getExpides() {
    this.expideService.getExpidesList().subscribe(data => {
      this.expides = data;
      console.log(data);
      this.filteredExpides = this.expides;
    });
  }

  goToCharts($myParam: string = ''): void {
    const navigationDetails: string[] = ['//pages/Expides/echarts-expide'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

  goToModifier(id: string ){
    this.router.navigate(['//pages/Expides/update-expide',id])
    }

/*  affichage all expedition ****************/

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
        this.dialogService.open(DeleteExpideDialogComponent, {
          context: {
            title: id,
          },
        });
      }
    /* end the popap **/  

    /**date filter */

@ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
@ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;

openWindow(contentTemplate) {
  this.windowService.open(
    contentTemplate,
    {
      title: 'Window content from template',
      context: {
        text: 'some text to pass into template',
      },
    },
  );
}

openWindowForm() {
  this.windowService.open(WindowDateFilterComponent, { title: `Window` });
}

openWindowWithoutBackdrop() {
  this.windowService.open(
    this.disabledEscTemplate,
    {
      title: 'Window without backdrop',
      windowClass: 'blabla',
      hasBackdrop: false,
      closeOnEsc: false,
    },
  );
}

/**date filter */
  /****************Filtrage des donner ***************/

  getAllListItemsAgents(selectedItems3: any){
    if(selectedItems3!==null){
       return this.filteredExpides = this.expides.filter(Expide => 
        Expide.user !== null && Expide.user.firstname.toString().indexOf(selectedItems3.toString()) !== -1);
      }else if(selectedItems3==null){
        console.log(selectedItems3);
        return this.filteredExpides = this.expides;
      }
  }
  getAllListItemsRoles(selectedItems2: any){
    if(selectedItems2!==null){
       return this.filteredExpides = this.expides.filter(Expide => 
        Expide.user !== null && Expide.user.roles[0].name.toString().indexOf(selectedItems2.toString()) !== -1);
      }else if(selectedItems2==null){
        console.log(selectedItems2);
        return this.filteredExpides = this.expides;
      }
  }
  getAllListTyp(selectedItems1: any){
    if(selectedItems1!==null){
       return this.filteredExpides = this.expides.filter(Expide => 
        Expide.typExp !== null &&  Expide.typExp.toString().indexOf(selectedItems1.toString()) !== -1);
      }else{
        this.getExpides();
      }
  }

  displayModalUser: boolean;
  showModalDialogUser() {
    this.displayModalUser = true;
  }
}