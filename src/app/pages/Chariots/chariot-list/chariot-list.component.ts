import { Component, Input, OnInit, TemplateRef,ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ChariotService } from '../chariot.service';
import { Chariot } from '../chariot';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDialogService, NbWindowService } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { DeleteChariotDialogComponent } from './delete-dialog/delete-chariot-dialog.component';
import { WindowDateFilterComponent } from './window-date-filter/window-date-filter.component';
import { PointageChariotDialogComponent } from './poitageChariot-dialog/pointage-chariot-dialog.component';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-chariot-list',
  templateUrl: './chariot-list.component.html', 
  styleUrls: ['./chariot-list.component.scss']
})
export class ChariotListComponent implements OnInit {
  statuses: NbComponentStatus[] = ['info' ];
  shapes: NbComponentShape[] = [ 'rectangle' ];
  sizes: NbComponentSize[] = ['medium'];
  searchText;
  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
  @Input() chariots: Chariot[];

/*****************************Filtrage des donner *****************************/
filteredChariots: Chariot[];
private _searchTermNumChar: string
private _searchTermCallChariot: string
private _searchTermIdArtPrep: string
/**end searsh string */


get searchTermNumChar(): string {
  return this._searchTermNumChar;
}
set searchTermNumChar(value: string){
  this._searchTermNumChar = value;
  this.filteredChariots = this.filtereChariotsNumChar(value);
}
get searchTermCallChariot(): string {
  return this._searchTermCallChariot;
}
set searchTermCallChariot(value: string){
  this._searchTermCallChariot = value;
  this.filteredChariots = this.filtereChariotsCallChariot(value);
}

filtereChariotsNumChar(seachBigint: string){
  return this.chariots.filter(Chariot => Chariot.numChar.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}
filtereChariotsCallChariot(seachBigint: string){
  return this.chariots.filter(Chariot => Chariot.callChariot.toDateString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
}

  /*********end seach fot anything */
  constructor(private authService: TokenStorageService,private chariotService: ChariotService,
    private router: Router, private windowService: NbWindowService,private dialogService: NbDialogService,
    private service: SmartTableData) {

    }
    statusessPointage:any;
    statusessEtatCha:any;
/*  affichage all chariot ****************/
authority;
    ngOnInit(): void {
      
      this.authService.getAuthorities().forEach(authority => {
        this.authority=authority;
        console.log(this.authority);
      });

      this.getChariots();



      this.statusessPointage= [
        {label: 'non_pointer', value: 'occuper'},
        {label: 'pointer', value: 'en_attente'},
        {label: 'hors_pointer', value: 'en_panne'}
    ]

      this.statusessEtatCha= [
        {label: 'occuper', value: 'occuper'},
        {label: 'en attente', value: 'en_attente'},
        {label: 'en panne', value: 'en_panne'}
    ]
    }
  
    private getChariots() {
      this.chariotService.getChariotsList().subscribe(data => {
        this.chariots = data;
        this.filteredChariots = this.chariots;
      });
    }
/*  affichage all chariot ****************/

goToCharts($myParam: string = ''): void {
  const navigationDetails: string[] = ['//pages/Chariots/echarts-chariot'];
  if($myParam.length) {
    navigationDetails.push($myParam);
  }
  this.router.navigate(navigationDetails);
}


  chariotDetails(NUM_CHAR: bigint){
    this.router.navigate(['details', NUM_CHAR]);
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
numChar:any;
  OpenDeletePopap(numChar) {
    this.dialogService.open(DeleteChariotDialogComponent, {
      context: {
        title: numChar,
      },
    });
  }
  goToModifier(numChar: string ){
    this.router.navigate(['//pages/Chariots/update-chariot',numChar])
  }
/* end the popap **/  

/** */
OpenValidationPopap(numChar) {
  console.log(numChar);
  this.dialogService.open(PointageChariotDialogComponent, {
    context: {
      title: numChar,
    },
  });
}
OpenMettreEnServicePopap(numChar) {
  console.log(numChar);
  this.dialogService.open(PointageChariotDialogComponent, {
    context: {
      title: numChar,      
    },
  });
}
/** */
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
          hasBackdrop: false,
          closeOnEsc: false,
        },
      );
    }
    
    
    /**date filter */
      /****************Filtrage des donner ***************/



      getAllListEtatCha(selectedItems1: any){
        if(selectedItems1!==null){
           return this.filteredChariots = this.chariots.filter(Chariot => 
            Chariot.etat_char !== null &&  Chariot.etat_char.toString().indexOf(selectedItems1 .toString()) !== -1);
          }else{
            this.getChariots();
          }
      }
}