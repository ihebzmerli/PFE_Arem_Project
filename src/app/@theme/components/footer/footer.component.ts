import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../../../pages/Articles/article';
import { ArticleService } from '../../../pages/Articles/article.service';
import { TokenStorageService } from '../../../pages/auth/token-storage.service';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created ♥ by <b>Iheb Zmerli</b> 2020to2021
    </span>

    <div class="socials">
      <a href="https://github.com/ihebzmerli" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.facebook.com/houba.zmerli" target="_blank" class="ion ion-social-facebook"></a>
<!--      <a href="https://github.com/ihebzmerli" target="_blank" class="ion ion-social-twitter"></a>       -->
      <a href="https://www.linkedin.com/in/zmerli-iheb-5499b3110/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent implements OnInit,AfterViewInit {
  artic: Article;
  info: any;
  authority;
  constructor(private router: Router,private token: TokenStorageService, private articleService: ArticleService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities().forEach(authority => {
        console.log(authority);
        this.authority=authority.toString();

      })
    };
  }
  state = 'in';
ngAfterViewInit() {
  setTimeout(() => {
    this.state = 'out';
  }, 0);
}
onEnd(event) {
  this.state = 'in';
  if (event.toState === 'in') {
    setTimeout(() => {
      this.state = 'out';
    }, 0);
  }
}
}
