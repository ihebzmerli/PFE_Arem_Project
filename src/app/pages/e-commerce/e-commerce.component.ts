import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent implements OnInit {
  info: any;

  constructor(private router: Router,private token: TokenStorageService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities().forEach(authority => {
        console.log(authority)})
    };
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
