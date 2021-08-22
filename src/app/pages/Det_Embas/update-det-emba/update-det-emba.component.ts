import { Component, OnInit } from '@angular/core';
import { Det_emba } from '../det-emba';
import { DetEmbaService } from '../det-emba.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-update-det-emba',
  templateUrl: './update-det-emba.component.html',
  styleUrls: ['./update-det-emba.component.scss']
})
export class UpdateDetEmbaComponent implements OnInit {

  id: bigint;
  detemba: Det_emba;

  constructor(private authService: TokenStorageService,private route: ActivatedRoute,private router: Router,
    private detembaService: DetEmbaService) { }

  ngOnInit() {
    
    this.detemba = new Det_emba();

    this.id = this.route.snapshot.params['id'];
    
    this.detembaService.getDet_emba(this.id)
      .subscribe(data => {
        console.log(data)
        this.detemba = data;
      }, error => console.log(error));
  }

  det_emba_list(){
    this.router.navigate(['det_embas']);
  }
}
