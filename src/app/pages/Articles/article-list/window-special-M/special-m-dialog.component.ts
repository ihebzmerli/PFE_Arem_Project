import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { Article } from '../../article';
import { ArticleService } from '../../article.service';
import { trigger,style,transition,animate,keyframes,query,stagger, state} from '@angular/animations';
import { PagesComponent } from '../../../pages.component';
import { TokenStorageService } from '../../../auth/token-storage.service';

@Component({
  selector: 'ngx-special-m-dialog',
  templateUrl: 'special-m-dialog.component.html',
  styleUrls: ['special-m-dialog.component.scss'],
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
export class SpecialMDialogComponent {

  @Input() title: string;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<SpecialMDialogComponent>,private router: Router,private articleService: ArticleService,private _Activatedroute :ActivatedRoute) {}
  articles:Article;
  ngOnInit() {
    
    this.SpecialM();
  }
  showDiv: boolean = true;
  cancel() {
    this.ref.close();
  }


  private SpecialM() {
    this.articleService.getArticle(this.title)
      .subscribe(
        data => {
          this.articles = data;
          console.log(data);
        },
        error => console.log('ERROR: ' + error));
  }
}
