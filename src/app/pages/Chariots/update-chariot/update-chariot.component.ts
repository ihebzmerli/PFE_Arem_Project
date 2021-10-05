import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbDateService, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { delay } from 'rxjs/operators';
import { TokenStorageService } from '../../auth/token-storage.service';
import { PagesComponent } from '../../pages.component';
import { Chariot } from '../chariot';
import { ChariotService } from '../chariot.service';

@Component({
  selector: 'ngx-update-chariot',
  templateUrl: './update-chariot.component.html',
  styleUrls: ['./update-chariot.component.scss']
})
export class UpdateChariotComponent implements OnInit {
  chariotForm: FormGroup;
  numChar: string;
  chariot: Chariot = new Chariot();
  submitted = false;
  isDisable=false;
min: Date;
max: Date;

  constructor(private authService: TokenStorageService,private toastrService: NbToastrService,private formBuilder: FormBuilder,public datepipe: DatePipe,private route: ActivatedRoute,private router: Router,
    private chariotService: ChariotService,protected dateService: NbDateService<Date>) {
      this.min = this.dateService.addDay(this.dateService.today(), -7);
      this.max = this.dateService.addDay(this.dateService.today(), 7);
     }

    ngOnInit() {
      
      this.chariot = new Chariot();
      this.numChar = this.route.snapshot.params['numChar'];
      
      this.chariotService.getChariot(this.numChar).subscribe(data => {

        if(this.chariot.datchariot!=null){
          this.chariot.datchariot=new Date(this.chariot.datchariot.toLocaleString());
          this.chariot.datchariot.setMinutes( this.chariot.datchariot.getMinutes() + this.chariot.datchariot.getTimezoneOffset() + 120);
          }else{
            this.chariot.datchariot=null;
          }
          console.log(data)
          this.chariot = data;
        }, error => console.log(error));      
    }
    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
      async onSubmitBon() {
  
        this.updateChariot();
        this.makeToast(); 
        delay(1500);
        this.chariot_list();
  
      } 
      updateChariot(){
        console.log(this.chariot);
        this.chariotService.updateChariot(this.numChar,this.chariot).subscribe(data => {

          console.log(data);
          this.chariot = new Chariot();
        }, error => console.log(error));
      }
  
      chariot_list(){
      this.router.navigate(['//pages/Chariots/chariot-list']);
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
  content = `Le Chariot a été modifier!`;
  
  status2: NbComponentStatus = 'danger';
  
  title2 = 'La modification n est pas faite avec succée!';
  content2 = `Erreur de saisir!`;
  
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
