import { Component, OnInit } from '@angular/core';
import { Model } from '../model';
import { ModelService } from '../model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { delay } from 'rxjs/operators';
import { Prime } from '../../Primes/prime';
import { PrimeService } from '../../Primes/prime.service';
import { Marque } from '../../Marques/marque';
import { MarqueService } from '../../Marques/marque.service';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-update-model',
  templateUrl: './update-model.component.html',
  styleUrls: ['./update-model.component.scss']
})
export class UpdateModelComponent implements OnInit {
  modelForm: FormGroup;
  submitted = false;
  model: Model = new Model();
  id: string;
  nature: any;
  MarqueList: Marque[];
  selectedPrime: Prime;
  constructor(private authService: TokenStorageService,private marqueService: MarqueService ,private toastrService: NbToastrService,private formBuilder: FormBuilder,public datepipe: DatePipe,private route: ActivatedRoute,private router: Router,
    private modelService: ModelService) { }

  ngOnInit() {
    this.getMarqueOfAdd();
    this.model = new Model();

    this.id = this.route.snapshot.params['id'];
    
    this.modelService.getModel(this.id)
      .subscribe(data => {
        console.log(data)
        this.model = data;
      }, error => console.log(error));
  }

  onSubmitModel() {
    this.updateModel();
    this.makeToast(); 
    delay(4000);
    this.model_list();
  }

  updateModel(){  
    this.modelService.updateModel(this.id,this.model).subscribe(data => {
      console.log(data);
      this.model = new Model();
    }, error => console.log(error));
}
model_list(){
    this.router.navigate(['//pages/Models/model-list']);
}
  onReset() {
    this.submitted = false;
    this.modelForm.reset();
  } 

  /**toaster show start */
config: NbToastrConfig;

index = 1;
destroyByClick = true;
duration = 4000;
hasIcon = true;
position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
preventDuplicates = false;

status: NbComponentStatus = 'success';

title = 'La modification faite avec succée!';
content = `Model a été modifier!`;

status2: NbComponentStatus = 'danger';

title2 = 'La modification n est pas faite avec succée!';
content2 = `Erreur de modification!`;

status3: NbComponentStatus = 'warning';

title3 = 'La modification n est pas faite stk est vide!';
content3 = `La modification n'a rien changé!`;
types: NbComponentStatus[] = [
  'primary',
  'success',
  'info',
  'warning',
  'danger',
];

positions: string[] = [
  NbGlobalPhysicalPosition.TOP_RIGHT,
  NbGlobalPhysicalPosition.TOP_LEFT,
  NbGlobalPhysicalPosition.BOTTOM_LEFT,
  NbGlobalPhysicalPosition.BOTTOM_RIGHT,
  NbGlobalLogicalPosition.TOP_END,
  NbGlobalLogicalPosition.TOP_START,
  NbGlobalLogicalPosition.BOTTOM_END,
  NbGlobalLogicalPosition.BOTTOM_START,
];

makeToast() {
  this.showToast(this.status, this.title, this.content);
}
makeToast2() {
  this.showToast(this.status2, this.title2, this.content2);
}
makeToast3() {
  this.showToast(this.status3, this.title3, this.content3);
}
private showToast(type: NbComponentStatus, title: string, body: string) {
  const config = {
    status: type,
    destroyByClick: this.destroyByClick,
    duration: this.duration,
    hasIcon: this.hasIcon,
    position: this.position,
    preventDuplicates: this.preventDuplicates,
  };
  const titleContent = title ? `. ${title}` : '';

  this.index += 1;
  this.toastrService.show(
    body,
    `Notif ${this.index}${titleContent}`,
    config);
}
/**toaster show start */ 

public getMarqueOfAdd() {
  this.marqueService.getMarquesList().subscribe(data => {
    this.MarqueList = data;
  });
}
}