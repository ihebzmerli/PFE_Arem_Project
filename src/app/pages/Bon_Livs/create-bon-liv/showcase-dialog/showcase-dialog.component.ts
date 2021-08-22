import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'showcase-dialog.component.html',
  styleUrls: ['showcase-dialog.component.scss'],
})
export class ShowcaseDialogComponent {

  @Input() title: string;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<ShowcaseDialogComponent>) {}

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}    
ngOnInit(){
  
}
  async dismiss() {
    await this.delay(10000)
    this.ref.close();
  }
}
