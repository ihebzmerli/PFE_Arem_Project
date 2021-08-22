import { Component, OnInit } from '@angular/core';
import { PagesComponent } from '../../pages.component';

@Component({
  selector: 'ngx-update-rectif',
  templateUrl: './update-rectif.component.html',
  styleUrls: ['./update-rectif.component.scss']
})
export class UpdateRectifComponent implements OnInit {

  constructor(private pagesComponent: PagesComponent) { }

  ngOnInit(): void {
  }

}
