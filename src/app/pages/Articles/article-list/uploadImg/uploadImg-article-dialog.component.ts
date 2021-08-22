import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { Gallery } from '../../../Gallerys/gallery';
import { GalleryService } from '../../../Gallerys/gallery.service';
import { PagesComponent } from '../../../pages.component';
import { Article } from '../../article';
import { ArticleService } from '../../article.service';

@Component({
  selector: 'ngx-uploadImg-article-dialog',
  templateUrl: 'uploadImg-article-dialog.component.html',
  styleUrls: ['uploadImg-article-dialog.component.scss'],
})
export class UploadImgArticleDialogComponent {

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  uploadMarqueForm: FormGroup;
  fileInfos: Observable<any>;
  
  @Input() title: string;

  constructor(private authService: TokenStorageService,protected ref: NbDialogRef<UploadImgArticleDialogComponent>,private router: Router,private _Activatedroute :ActivatedRoute) {}

  cancel() {
    this.ref.close();
  }

  ngOnInit() {
    
  }




  /*****************UPloard image article */
/*
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  upload() {
    this.progress = 0;
  
    this.currentFile = this.selectedFiles.item(0);
    this.articleService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.articleService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
  
    this.selectedFiles = undefined;
  }
  */
}
