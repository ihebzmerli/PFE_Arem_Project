import { Component } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { __values } from 'tslib';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';

@Component({
  template: `
    <form class="form">

    <button class="btn btn-md btn-outline-warning">
    <i class="fa fa-user"></i>choix de stock</button>
    <nb-checkbox (change)="checkValue($event)">Show all issues</nb-checkbox>

    <igx-checkbox *ngFor="let task of tasks" [checked]="task.done">
    <nb-checkbox status="primary"  [value]="task.done" (checkedChange)="toggle($event)">{{ task.description }}</nb-checkbox>
      </igx-checkbox>

      <label>Checked:</label> {{ checked }}
    </form>
  `,
  styleUrls: ['window-type-stock.component.scss'],
})
export class WindowTypeStockComponent {
  raidoQUT_STK = false;
  raidoQUT_STK2 = false;
  raidoSTK_GAR = false;
  raidoSTK_INI = false;
  raidoANAL_STK = false;
  raidoNBJ_STK = false;
  raidoV_SSTK = false;
  raidoCOM_STK = false;
  raidoXANAL_STK = false;
  raidoSTK_ATRSF = false;
  raidoSTK_TRSF = false;
  raidoSTK_REEL = false;
  raidoSTK_RES = false;
  raidoSTK_NP = false;
  changeSelectionwww(event: any) {
  console.log(event.returnValue);
  }

  checkValue(event: any) {
    console.log(event.returnValue)
  }
  constructor(private authService: TokenStorageService,public windowRef: NbWindowRef) {}

  close() {
    
    this.windowRef.close();
  }


  public tasks = [
    { done: false, description: 'QUT_STK' },
    { done: false, description: 'QUT_STK2' },
    { done: false, description: 'STK_GAR' },
    { done: false, description: 'STK_INI' },
    { done: false, description: 'ANAL_STK' },
    { done: false, description: 'NBJ_STK' },

    { done: false, description: 'V_SSTK' },
    { done: false, description: 'COM_STK' },
    { done: false, description: 'XANAL_STK' },
    { done: false, description: 'STK_ATRSF' },
    { done: false, description: 'STK_TRSF' },
    { done: false, description: 'STK_REEL' },
    { done: false, description: 'STK_RES' },
    { done: false, description: 'STK_NP' },
  ];

  checked = false;

  toggle(checked: boolean) {
    this.checked = checked;
  }
}
