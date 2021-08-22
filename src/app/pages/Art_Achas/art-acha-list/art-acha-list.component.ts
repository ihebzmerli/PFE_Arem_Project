import { Component, OnInit, ViewChild ,TemplateRef } from '@angular/core';

import { Router } from '@angular/router';
import { SmartTableData } from '../../../@core/data/smart-table';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDialogService, NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

import { WindowDateFilterComponent } from './window-date-filter/window-date-filter.component';
import { Art_acha } from '../art-acha';
import { ArtAchaService } from '../art-acha.service';

@Component({
  selector: 'ngx-art-acha-list',
  templateUrl: './art-acha-list.component.html',
  styleUrls: ['./art-acha-list.component.scss']
})
export class ArtAchaListComponent implements OnInit {

  artachas: Art_acha[];
  closeResult: string;
  editForm: any;

  searchText;
  
  statuses: NbComponentStatus[] = ['info' ];
  shapes: NbComponentShape[] = [ 'rectangle' ];
  sizes: NbComponentSize[] = ['medium'];

  /*****************************Filtrage des donner *****************************/
  filteredArtAchas: Art_acha[];
  private _searchTermBonise: string;
  private _searchTermPrixAch: string;
  private _searchTermPrixVen: string;
  private _searchTermTva: string;
  private _searchTermPrixAMp: string;
  private _searchTermCentre: string;

  /**end searsh string */
  get searchTermBonise(): string {
      return this._searchTermBonise;
  }
  set searchTermBonise(value: string){
    this._searchTermBonise = value;
    this.filteredArtAchas = this.filtereAffaireBonise(value);
  }
  get searchTermPrixAch(): string {
    return this._searchTermPrixAch;
  }
  set searchTermPrixAch(value: string){
    this._searchTermPrixAch = value;
    this.filteredArtAchas = this.filtereAffairePrixAch(value);
  }
  get searchTermPrixVen(): string {
    return this._searchTermPrixVen;
  }
  set searchTermPrixVen(value: string){
    this._searchTermPrixVen = value;
    this.filteredArtAchas = this.filtereAffairePrixVen(value);
  }
  get searchTermTva(): string {
    return this._searchTermTva;
  }
  set searchTermTva(value: string){
    this._searchTermTva = value;
    this.filteredArtAchas = this.filtereAffaireTva(value);
  }
  get searchTermPrixAMp(): string {
    return this._searchTermPrixAMp;
  }
  set searchTermPrixAMp(value: string){
    this._searchTermPrixAMp = value;
    this.filteredArtAchas = this.filtereAffairePrixAMp(value);
  }
  get searchTermCentre(): string {
    return this._searchTermCentre;
  }
  set searchTermCentre(value: string){
    this._searchTermCentre = value;
    this.filteredArtAchas = this.filtereAffaireCentre(value);
  }

  filtereAffaireBonise(seachString: string){
    return this.artachas.filter(Art_acha => Art_acha.bonise.toString().toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }
  filtereAffairePrixAch(seachBigint: string){
    return this.artachas.filter(Art_acha => Art_acha.prixAch.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffairePrixVen(seachBigint: string){
    return this.artachas.filter(Art_acha => Art_acha.prixVen.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireTva(seachBigint: string){
    return this.artachas.filter(Art_acha => Art_acha.tva.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffairePrixAMp(seachBigint: string){
    return this.artachas.filter(Art_acha => Art_acha.prixAMp.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }
  filtereAffaireCentre(seachBigint: string){
    return this.artachas.filter(Art_acha => Art_acha.centre.toString().toLowerCase().indexOf(seachBigint.toLowerCase()) !== -1);
  }

    /*********end seach fot anything */


goToPage(pageName:string):void{
  this.router.navigate([`${pageName}`]);
}

  constructor(private artachaService: ArtAchaService,private dialogService: NbDialogService,private http: HttpClient,private router: Router,
    private service: SmartTableData,private windowService: NbWindowService, private fb: FormBuilder) { }
  /* afficher all achats**/

  ngOnInit() {
    this.getArtAchas();
  }

  private getArtAchas() {
    this.artachaService.getArt_achasList().subscribe(data => {
      this.artachas = data;
      this.filteredArtAchas = this.artachas;
    });
  }
 

source: LocalDataSource = new LocalDataSource();

/**filter date */

@ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
@ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;

openWindowFilterDate(contentTemplate) {
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

openWindowFormFilterDate() {
  this.windowService.open(WindowDateFilterComponent, { title: `entrer les deux dates` });
}

openWindowFilterDateWithoutBackdrop() {
  this.windowService.open(
    this.disabledEscTemplate,
    {
      title: 'Window without backdrop',
      hasBackdrop: false,
      closeOnEsc: false,
    },
  );
}
/**end filter date */
}
