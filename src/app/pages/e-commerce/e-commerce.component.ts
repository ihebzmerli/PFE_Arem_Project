import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../Articles/article';
import { ArticleService } from '../Articles/article.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Utilisateur } from '../Utilisateurs/utilisateur';
import { UtilisateurService } from '../Utilisateurs/utilisateur.service';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
  animations:[
    trigger('popOverState',[
        state('move', style({
          transform: 'translateX(-100%) translateY(50px)'
        })),
        state('enlarge', style({
          transform: 'scale(1.5)',
        })),
        state('spin', style({
          transform: 'rotateY(180deg) rotateZ(90deg)',
        })),
        transition('spin => move', animate('2000ms ease-out')),
        transition('* => *', animate('500ms ease')),
    ]),
    trigger('move', [
      state('in', style({transform: 'translateX(0)'})),
      state('out', style({transform: 'translateX(100%)'})),
      transition('in => out', animate('15s linear')),
      transition('out => in', animate('15s linear'))
    ]),
  ]
})
export class ECommerceComponent implements OnInit, AfterViewInit {
  info: any;
  artic: Article;
  position: string;
  authority;
  id:string;
  id_session
  utilisateur: Utilisateur = new Utilisateur();

  constructor(private router: Router,private token: TokenStorageService, private articleService: ArticleService,private utilisateurService:UtilisateurService) {

   }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities().forEach(authority => {
        console.log(authority);
        this.authority= authority;
      })
    };

    if(this.authority=="ROLE_ACHETEUR" || this.authority=="ROLE_ADMIN"){
      this.articleService.getArticlePublicité().subscribe(data => {
        console.log(data);
      this.artic = data;
      console.log(this.artic)
    });
  }
  
  this.utilisateurService.getIdUserByUsername(this.token.getUsername()).subscribe(data1 => {
    this.utilisateur = new Utilisateur();
    this.id=data1.toString()
      this.utilisateurService.getUtilisateur(this.id)
        .subscribe(data => {
          this.utilisateur = data;
          this.utilisateur.connected =1;
          console.log(this.utilisateur.connected+'////'+this.id);
      this.utilisateurService.updateUtilisateurConnected(this.id,this.utilisateur)
        .subscribe(data => {
          console.log(data);
        });
      });
    });
  }

changePosition(newPosition: string){
  this.position = newPosition;
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

  logout() {
    this.token.signOut();
    window.location.reload();
  }

  TryLogin(){
    this.goLogins();
  }
  goLogins($myParam: string = ''): void {
    const navigationDetails: string[] = ['//auth/login'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }
}
