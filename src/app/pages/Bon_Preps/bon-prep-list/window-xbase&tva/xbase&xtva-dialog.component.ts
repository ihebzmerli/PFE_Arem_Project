import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { Bon_prep } from '../../bon-prep';
import { BonPrepService } from '../../bon-prep.service';

@Component({
  selector: 'ngx-xbase&xtva-dialog',
  templateUrl: 'xbase&xtva-dialog.component.html',
  styleUrls: ['xbase&xtva-dialog.component.scss'],
  animations: [
    /*
    trigger('listAnimation',[
      transition('* => *', [
        query(':entre', style({ opacity: 0}), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0,transform: 'translateY(-75px)',offset: 0}),
            style({opacity: .5,transform: 'translateY(-35px)',offset: 0.3}),
            style({opacity: 1,transform: 'translateY(-0px)',offset: 1}),
          ]))
        ]))
      ])
    ])*/
    trigger('visibilityChanged', [
      state('in', style({
        opacity: 0
      })),
      state('out',   style({
        opacity: 1
      })),
      transition('in => out', animate('100ms ease-in')),
      transition('out => in', animate('100ms ease-out'))
    ]),
    trigger('listAnimation', [
      transition(':enter', [
        style({transform: 'translateX(-100%'}),
        animate('1s')
      ]),
      transition(':leave', [
        animate('1s', style({transform: 'translateX(-100%'}))
      ])
    ])
  ]
})
export class XbaseXtvaDialogComponent {

  @Input() title: string;

  constructor(private authService: TokenStorageService, protected ref: NbDialogRef<XbaseXtvaDialogComponent>,private router: Router,private bonPrepService: BonPrepService,private _Activatedroute :ActivatedRoute) {}
  bonprep:Bon_prep;
  ngOnInit() {
    
    this.getXbaseTva();
  }
  showDiv: boolean = true;
  cancel() {
    this.ref.close();
  }


  private getXbaseTva() {
    this.bonPrepService.getBon_prep(this.title)
      .subscribe(
        data => {
          this.bonprep = data;
          console.log(data);
        },
        error => console.log('ERROR: ' + error));
  }
}
