import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
import { Article } from '../../article';
import { ArticleService } from '../../article.service';

@Component({
  selector: 'ngx-reset-article-dialog',
  templateUrl: 'reset-article-dialog.component.html',
  styleUrls: ['reset-article-dialog.component.scss'],
})
export class ResetArticleDialogComponent {

  @Input() title: string;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<ResetArticleDialogComponent>,private router: Router,private articleService: ArticleService,
    private _Activatedroute :ActivatedRoute) {}

  cancel() {
    this.ref.close();
  }

  ngOnInit() {
    
    this.article = new Article();

    this.articleService.getArticle(this.title)
      .subscribe(data => {
        console.log(data)
        this.article = data;
      }, error => console.log(error));
      
  }

  article: Article = new Article();
  
  submitresetStk() {
    this.articleService.resetArticle(this.title,this.article)
      .subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        error => console.log('ERROR: ' + error));
  }
}
