import { Component } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { __values } from 'tslib';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';

@Component({
  template: `
    <form class="form">

    <div *ngFor="let stk of tasks" class="p-field-checkbox">
      <p-checkbox name="group2" value="stk" [value]="stk"  [(ngModel)]="selectedStks" [inputId]="stk.key" [disabled]="stk.key === 'stkNp'"></p-checkbox>
      <label [for]="stk.key">{{stk.name}}</label>
    </div>
    
    </form>
  `,
  styleUrls: ['window-type-stock.component.scss'],
})
export class WindowTypeStockComponent {
  selectedStks: any[] = ['Technology', 'Sports'];
  constructor(private authService: TokenStorageService,public windowRef: NbWindowRef) {}

  close() {
    this.windowRef.close();
  }


  public tasks = [
    { key: 'qutStk' , description: 'QUT_STK' },
    { key: 'qutStk2' , description: 'QUT_STK2' },
    { key: 'stkGar' , description: 'STK_GAR' },
    { key: 'stkIni', description: 'STK_INI' },
    { key: 'analStk', description: 'ANAL_STK' },
    { key: 'nbjStk', description: 'NBJ_STK' },

    { key: 'vSstk', description: 'V_SSTK' },
    { key: 'comStk', description: 'COM_STK' },
    { key: 'xanalStk', description: 'XANAL_STK' },
    { key: 'stkAtrsf', description: 'STK_ATRSF' },
    { key: 'stkTrsf', description: 'STK_TRSF' },
    { key: 'stkReel', description: 'STK_REEL' },
    { key: 'stkRes', description: 'STK_RES' },
    { key: 'stkNp', description: 'STK_NP' },
  ];
  checked: boolean = false;
  ngOnInit(): void {
    
    this.selectedStks = this.tasks;
    console.log(this.selectedStks);
    console.log(this.tasks);
  }

}
