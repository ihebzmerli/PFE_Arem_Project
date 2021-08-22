import { Component, OnInit } from '@angular/core';
import { PagesComponent } from '../../pages.component';

@Component({
  selector: 'ngx-vehicule-detail',
  templateUrl: './vehicule-detail.component.html',
  styleUrls: ['./vehicule-detail.component.scss']
})
export class VehiculeDetailComponent implements OnInit {

  constructor(private pagesComponent: PagesComponent) { }

  ngOnInit(): void {
  }

}
