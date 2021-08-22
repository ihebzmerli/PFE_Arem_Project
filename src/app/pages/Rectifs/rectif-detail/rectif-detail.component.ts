import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { TokenStorageService } from '../../auth/token-storage.service';
import { PagesComponent } from '../../pages.component';
import { Rectif } from '../rectif';
import { RectifService } from '../rectif.service';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  id: bigint;
  COD_ART: string;
  DATE: Date;
  NUM_DOC: bigint;
  QUT_ART: number;
  PRIX_ACH: number;
  OBSERV: string;
  TYP_MVT: number;
  NUM_REC: number;
  CENTRE: string;
  DAT_RECLAM: Date;
  RECLAM: number; 
  CLOTURE: number; 
  OBS_RECLAM: string; 
  DAT_REPON: Date; 
  DAT_CLOTUR: Date; 
  COD_USER: bigint; 
  items?: number;
}
@Component({
  selector: 'ngx-rectif-detail',
  templateUrl: './rectif-detail.component.html',
  styleUrls: ['./rectif-detail.component.scss']
})
export class RectifDetailComponent implements OnInit {

  
  id: bigint;
  rectif: Rectif;

  ngOnInit() {
    this.rectif = new Rectif();

    this.id = this.route.snapshot.params['id'];
    
    this.rectifservice.getRectif(this.id)
      .subscribe(data => {
        console.log(data)
        this.rectif = data;
      }, error => console.log(error));
  }
  customColumn = 'id';
  defaultColumns = [ 'COD_ART', 'DATE', 'NUM_DOC', 'QUT_ART', 'PRIX_ACH', 'OBSERV', 'TYP_MVT', '	NUM_REC'
  , 'CENTRE', 'DAT_RECLAM', 'RECLAM', 'CLOTURE', 'OBS_RECLAM', 'DAT_REPON', 'DAT_CLOTUR', 'COD_USER', 'items' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private authService: TokenStorageService,private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,private route: ActivatedRoute,private router: Router,
    private rectifservice: RectifService) { }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }


  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
  Rectif_list(){
    this.router.navigate(['rectifs']);
  }
}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}

