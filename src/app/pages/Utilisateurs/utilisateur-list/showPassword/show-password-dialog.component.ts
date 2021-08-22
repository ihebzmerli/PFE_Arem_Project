import { DatePipe } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbDateService, NbDialogRef, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { PagesComponent } from '../../../pages.component';
@Component({
  selector: 'ngx-show-password-dialog',
  templateUrl: 'show-password-dialog.component.html',
  styleUrls: ['show-password-dialog.component.scss'],
})
export class ShowPasswordDialogComponent {
  fileInfos: Observable<any>;
  
  @Input() title: string;

  constructor(private authService: TokenStorageService,protected dateService: NbDateService<Date>,public datepipe: DatePipe,private formBuilder: FormBuilder,
    protected ref: NbDialogRef<ShowPasswordDialogComponent>,private router: Router,private _Activatedroute :ActivatedRoute) {}

  cancel() {
    this.ref.close();
  }
  ngOnInit() {
console.log(this.title);
}

}
