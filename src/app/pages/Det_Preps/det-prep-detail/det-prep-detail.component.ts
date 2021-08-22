import { Component, OnInit, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

import { ActivatedRoute, Router } from '@angular/router';
import { Det_prep } from '../det-prep';
import { DetPrepService } from '../det-prep.service';


interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  id: bigint;
  NUM_BON: Date;
  NUM_CHAR: string;
  ZONE: string;
  PREPARA: string;
  items?: number;
}

@Component({
  selector: 'ngx-det-prep-detail',
  templateUrl: './det-prep-detail.component.html',
  styleUrls: ['./det-prep-detail.component.scss']
})
export class DetPrepDetailComponent implements OnInit {

  
  id: bigint;
  det_prep: Det_prep;

  ngOnInit() {
    this.det_prep = new Det_prep();

    this.id = this.route.snapshot.params['id'];
    
    this.detprepservice.getDet_prep(this.id)
      .subscribe(data => {
        console.log(data)
        this.det_prep = data;
      }, error => console.log(error));
  }
  customColumn = 'id';
  defaultColumns = [ 'NUM_BON', 'NUM_CHAR', 'ZONE', 'PREPARA', 'items' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,private route: ActivatedRoute,private router: Router,
    private detprepservice: DetPrepService) { }

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
  Det_prep_list(){
    this.router.navigate(['bon_preps']);
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

