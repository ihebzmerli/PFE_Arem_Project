import { Component, OnInit } from '@angular/core';
import { Marque } from '../marque';
import { MarqueService } from '../marque.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { delay } from 'rxjs/operators';
import { Prime } from '../../Primes/prime';
import { PrimeService } from '../../Primes/prime.service';
import { Model } from '../../Model/model';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-update-marque',
  templateUrl: './update-marque.component.html',
  styleUrls: ['./update-marque.component.scss']
})
export class UpdateMarqueComponent implements OnInit {
  marqueForm: FormGroup;
  submitted = false;
  marque: Marque = new Marque();
  id: string;
  nature: any;
  constructor(private authService: TokenStorageService,private toastrService: NbToastrService,private formBuilder: FormBuilder,public datepipe: DatePipe,private route: ActivatedRoute,private router: Router,
    private marqueService: MarqueService) { }

  ngOnInit() {
    this.marque = new Marque();

    this.id = this.route.snapshot.params['id'];
    
    this.marqueService.getMarque(this.id)
      .subscribe(data => {
        console.log(data)
        this.marque = data;
      }, error => console.log(error));
  }

  async onSubmitMarque() {
    this.updateMarque2();
    await this.showModalDialogBarProgression();
    this.makeToast(); 
    this.marque_list();
  }

  updateMarque2(){  
    this.marqueForm = this.formBuilder.group({
      code: [this.marque.code],
      title: [this.marque.title]
  });
  console.log(this.marqueForm.value);
    const formData = new FormData();
    const marque = this.marqueForm.value;
    formData.append('marque',JSON.stringify(marque));
    formData.append('file',this.userFile);
    
    this.marqueService.updateMarque2(this.id,formData).subscribe(data => {
      console.log(data);
    }, error => console.log(error));
}
  marque_list(){
    this.router.navigate(['//pages/Marques/marque-list']);
  }
  onReset() {
    this.submitted = false;
    this.marqueForm.reset();
  } 


 /**upload image article */
 userFile;
 imgURL: any;
 public imagePath;
 onSelectFile(event){
  if(event.target.files.length > 0){
    const file =event.target.files[0];
    this.userFile =file;
  
    var mimeType = event.target.files[0].type;
    if(mimeType.match(/image\/jpeg/) === null && mimeType.match(/image\/png/) === null){
      this.makeToast5();
    }else{
  
    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  }
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
content = `Marque a été modifier!`;

status2: NbComponentStatus = 'danger';

title2 = 'La modification n est pas faite avec succée!';
content2 = `Erreur de modification!`;

status3: NbComponentStatus = 'warning';

title3 = 'La modification n est pas faite marque existe déja!';
content3 = `La modification n'a rien changé!`;

status4: NbComponentStatus = 'info';

title4 = 'L addition est en cours !';
content4 = `Veuillez attendre le traitement des données!`;
status5: NbComponentStatus = 'warning';

title5 = 'Image doit etre de type png,jpg,jpeg!';
content5 = `Fichier de type eronée!`;
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
makeToast4() {
  this.showToast(this.status4, this.title4, this.content4);
}
makeToast5() {
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




/** progression bar */
delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

progress=0;
displayModalBarProgression: boolean;
  async showModalDialogBarProgression() {
  this.progress=0;
  this.displayModalBarProgression = true;
  this.makeToast4();
  await this.delay(1000);
  this.progress=15;
  await this.delay(1000);
  this.progress=37;
  await this.delay(1000);
  this.progress=62;
  await this.delay(1000);
  this.progress=87;
  await this.delay(1000);
  this.progress=99;
  await this.delay(500);
  this.progress=100;
  this.delay(1500);
  this.displayModalBarProgression=false;
}


/**end progression bar */
}