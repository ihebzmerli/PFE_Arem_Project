import { Component, OnInit, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Det_emba } from '../det-emba';
import { ActivatedRoute, Router } from '@angular/router';
import { DetEmbaService } from '../det-emba.service';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';



interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  NUM_BON: bigint;
  NUM: string;
  COD_ART: string;
  DES_ART: string;
  QUT: string;
  items?: number;
}

@Component({
  selector: 'ngx-det-emba-detail',
  templateUrl: './det-emba-detail.component.html',
  styleUrls: ['./det-emba-detail.component.scss']
})
export class DetEmbaDetailComponent implements OnInit {

  
  id: bigint;
  det_emba: Det_emba;

  ngOnInit() {
    
    this.det_emba = new Det_emba();

    this.id = this.route.snapshot.params['id'];
    
    this.detembaservice.getDet_emba(this.id)
      .subscribe(data => {
        console.log(data)
        this.det_emba = data;
      }, error => console.log(error));
  }
  customColumn = 'id';
  defaultColumns = [ 'NUM_BON', 'NUM', 'COD_ART', 'DES_ART', 'QUT', 'items' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private authService: TokenStorageService,private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,private route: ActivatedRoute,private router: Router,
    private detembaservice: DetEmbaService) { }

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
  Det_emba_list(){
    this.router.navigate(['det_embas']);
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

