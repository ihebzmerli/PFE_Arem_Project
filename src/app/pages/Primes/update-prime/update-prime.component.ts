import { Component, OnInit } from '@angular/core';
import { Prime } from '../prime';
import { PrimeService } from '../prime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { delay } from 'rxjs/operators';
import { trigger,style,transition,animate,keyframes,query,stagger, state} from '@angular/animations';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
@Component({
  selector: 'ngx-update-prime',
  templateUrl: './update-prime.component.html',
  styleUrls: ['./update-prime.component.scss']
})
export class UpdatePrimeComponent implements OnInit {
  primeForm: FormGroup;
  submitted = false;
  prime: Prime;
  id: string;

  constructor(private authService: TokenStorageService,private toastrService: NbToastrService,private _Activatedroute :ActivatedRoute,private formBuilder: FormBuilder,public datepipe: DatePipe,private router: Router,
    private primeService: PrimeService) { }

  ngOnInit() {
    this.prime = new Prime();

    this.id = this._Activatedroute.snapshot.params['id'];
    
    this.primeService.getPrime(this.id).subscribe(data => {
        this.prime = data;
        console.log(this.prime)
      }, error => console.log(error));
  }

  onSubmitPrime() {
    this.updatePrime();
    this.makeToast(); 
    delay(2000);
    this.prime_list();
  }

  updatePrime(){  
    this.primeService.updatePrime(this.id,this.prime).subscribe(data => {
      console.log(data);
      this.prime = new Prime();
    }, error => console.log(error));
}
prime_list(){
    this.router.navigate(['//pages/Primes/prime-list']);
  }
  onReset() {
    this.submitted = false;
    this.primeForm.reset();
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
content = `La prime a été modifier!`;

status2: NbComponentStatus = 'danger';

title2 = 'La modification n est pas faite avec succée!';
content2 = `Erreur de modification!`;

status3: NbComponentStatus = 'warning';

title3 = 'La modification n est pas faite!';
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

}