import { Component, OnInit } from '@angular/core';
import { Det_prep } from '../det-prep';
import { ActivatedRoute, Router } from '@angular/router';
import { DetPrepService } from '../det-prep.service';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-update-det-prep',
  templateUrl: './update-det-prep.component.html',
  styleUrls: ['./update-det-prep.component.scss']
})
export class UpdateDetPrepComponent implements OnInit {

  id: bigint;
  detprep: Det_prep;

  constructor(private authService: TokenStorageService,private route: ActivatedRoute,private router: Router,
    private detprepService: DetPrepService) { }

  ngOnInit() {
    
    this.detprep = new Det_prep();

    this.id = this.route.snapshot.params['id'];
    
    this.detprepService.getDet_prep(this.id)
      .subscribe(data => {
        console.log(data)
        this.detprep = data;
      }, error => console.log(error));
  }

  det_prep_list(){
    this.router.navigate(['det_preps']);
  }
}