import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { delay, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { TokenStorageService } from '../../../pages/auth/token-storage.service';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../../pages/Utilisateurs/utilisateur.service';
import { Utilisateur } from '../../../pages/Utilisateurs/utilisateur';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  info: any;
  utilisateur: Utilisateur = new Utilisateur();
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: {};

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { value: 'true',title: 'Profile' }, { value: 'false',title: 'Log out' } ];

  constructor(private token: TokenStorageService,
              private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private utilisateurService:UtilisateurService,
              private userService: UserData,
              private layoutService: LayoutService,
              private router: Router,
              private breakpointService: NbMediaBreakpointsService,
              private authService: NbAuthService) {
                
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable 
      }

    });
  }
profilUser:Utilisateur;
authority;
delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.token.getAuthorities().forEach(authority => {
      this.authority=authority.toString();
      console.log(this.authority);
    });
    this.utilisateurService.getIdUserByUsername(this.token.getUsername()).subscribe(data1 => {
      let id=data1.toString()
      this.utilisateurService.getUtilisateur(id)
      .subscribe(data => {
        this.profilUser = data;
        console.log(this.profilUser);
      });
      
    });

    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  goToProfils($myParam: string = ''): void {
    this.utilisateurService.getIdUserByUsername(this.token.getUsername()).subscribe(data1 => {
      let id_profil = data1;
      const navigationDetails: string[] = ['//pages/Profil/update-profil/'+`${id_profil}`];
      if($myParam.length) {
        navigationDetails.push($myParam);
      }
    this.router.navigate(navigationDetails);
    }, error => console.log(error));
  }

  id:string;
  async changeUserM(themeName: string) {
    if(themeName=="false"){
      
      this.utilisateurService.getIdUserByUsername(this.token.getUsername()).subscribe(data1 => {
        this.utilisateur = new Utilisateur();
        this.id=data1.toString()
          this.utilisateurService.getUtilisateur(this.id)
            .subscribe(async data => {
              this.utilisateur = data;
              this.utilisateur.connected =0;
              console.log(this.utilisateur.connected+'////'+this.id);
              await this.utilisateurService.updateUtilisateurConnected(this.id,this.utilisateur)
            .subscribe(data => {
              console.log(data);
            });
          });
        });
        await this.delay(1500);
      this.token.signOut();
      window.location.reload();
    }else if(themeName=="true"){
      this.goToProfils();
    }
  }
}
