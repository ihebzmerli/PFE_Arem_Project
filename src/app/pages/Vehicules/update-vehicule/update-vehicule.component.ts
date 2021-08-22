import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbDateService, NbDialogService, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { delay } from 'rxjs/operators';
import { ArticleService } from '../../Articles/article.service';
import { AddMarqueDialogComponent } from '../../Articles/create-article/windowAjoutMarque/add-marque-dialog.component';
import { AddModelDialogComponent } from '../../Articles/create-article/windowAjoutModel/add-model-dialog.component';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Marque } from '../../Marques/marque';
import { MarqueService } from '../../Marques/marque.service';
import { Model } from '../../Model/model';
import { PagesComponent } from '../../pages.component';
import { Vehicule } from '../vehicule';
import { VehiculeService } from '../vehicule.service';

@Component({
  selector: 'ngx-update-vehicule',
  templateUrl: './update-vehicule.component.html',
  styleUrls: ['./update-vehicule.component.scss']
})
export class UpdateVehiculeComponent implements OnInit {

  vehiculeForm: FormGroup;
  submitted = false;
  vehicule: Vehicule = new Vehicule();
  matricule: string;
  min: Date;
  max: Date;
  color2: string = "#1976D2";
  vehiculemarque;
  vehiculemodel;
  constructor(private authService: TokenStorageService,private toastrService: NbToastrService,private formBuilder: FormBuilder,public datepipe: DatePipe,private route: ActivatedRoute,private router: Router,
    private vehiculeService: VehiculeService,protected dateService: NbDateService<Date>, public articleService:ArticleService, public marqueService:MarqueService) { 
      this.min = this.dateService.addDay(this.dateService.today(), -7);
      this.max = this.dateService.addDay(this.dateService.today(), 7);
    }

  ngOnInit() {
    this.getAllMarquesList();
    this.vehicule = new Vehicule();

    this.matricule = this.route.snapshot.params['matricule'];
    
    this.vehiculeService.getVehicule(this.matricule)
      .subscribe(data => {
        console.log(data)
        this.vehicule = data;
        if(this.vehicule.dt1Mc!=null){
          this.vehicule.dt1Mc=new Date(this.vehicule.dt1Mc.toLocaleString());
          this.vehicule.dt1Mc.setMinutes( this.vehicule.dt1Mc.getMinutes() + this.vehicule.dt1Mc.getTimezoneOffset());
          }else{
            this.vehicule.dt1Mc=null;
          }
          if(this.vehicule.dtAcq!=null){
            this.vehicule.dtAcq=new Date(this.vehicule.dtAcq.toLocaleString());
            this.vehicule.dtAcq.setMinutes( this.vehicule.dtAcq.getMinutes() + this.vehicule.dtAcq.getTimezoneOffset());
            }else{
              this.vehicule.dtAcq=null;
            }
            if(this.vehicule.dtFAss!=null){
              this.vehicule.dtFAss=new Date(this.vehicule.dtFAss.toLocaleString());
              this.vehicule.dtFAss.setMinutes( this.vehicule.dtFAss.getMinutes() + this.vehicule.dtFAss.getTimezoneOffset());
              }else{
                this.vehicule.dtFAss=null;
              }
              if(this.vehicule.dtFVisit!=null){
                this.vehicule.dtFVisit=new Date(this.vehicule.dtFVisit.toLocaleString());
                this.vehicule.dtFVisit.setMinutes( this.vehicule.dtFVisit.getMinutes() + this.vehicule.dtFVisit.getTimezoneOffset());
                }else{
                  this.vehicule.dtFVisit=null;
                }
                if(this.vehicule.dt1Mc2!=null){
                  this.vehicule.dt1Mc2=new Date(this.vehicule.dt1Mc2.toLocaleString());
                  this.vehicule.dt1Mc2.setMinutes( this.vehicule.dt1Mc2.getMinutes() + this.vehicule.dt1Mc2.getTimezoneOffset());
                  }else{
                    this.vehicule.dt1Mc2=null;
                  }
      }, error => console.log(error));
  }

  onSubmitVehicule() {
    this.updateVehicule();
    this.makeToast(); 
    delay(4000);
    this.prime_list();
  }

  updateVehicule(){  
    if(this.vehicule.dt1Mc!=null){
      this.vehicule.dt1Mc.setDate(this.vehicule.dt1Mc.getDate() + 1);
    }else{
      this.vehicule.dt1Mc=null ;
    }
    if(this.vehicule.dtAcq!=null){
      this.vehicule.dtAcq.setDate(this.vehicule.dtAcq.getDate() + 1);
    }else{
      this.vehicule.dtAcq=null ;
    } 
    if(this.vehicule.dtFAss!=null){
      this.vehicule.dtFAss.setDate(this.vehicule.dtFAss.getDate() + 1);
    }else{
      this.vehicule.dtFAss=null ;
    }
    if(this.vehicule.dtFVisit!=null){
      this.vehicule.dtFVisit.setDate(this.vehicule.dtFVisit.getDate() + 1);
    }else{
      this.vehicule.dtFVisit=null ;
    }
    if(this.vehicule.dt1Mc2!=null){
      this.vehicule.dt1Mc2.setDate(this.vehicule.dt1Mc2.getDate() + 1);
    }else{
      this.vehicule.dt1Mc2=null ;
    }
    this.vehicule.couleur= this.color2;
    this.vehicule.marque=this.vehiculemarque;
    this.vehicule.model=this.vehiculemodel;
    this.vehiculeService.updateVehicule(this.matricule,this.vehicule).subscribe(data => {
      console.log(data);
      this.vehicule = new Vehicule();
    }, error => console.log(error));
}
prime_list(){
    this.router.navigate(['//pages/Vehicules/vehicule-list']);
  }
  onReset() {
    this.submitted = false;
    this.vehiculeForm.reset();
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
content = `vehicule a été modifier!`;

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
MarqueList: Marque[];
ModelFromMarque:Model[];
MarqueSelected:String;
ModelSelected;
public getModeleFromMarque(itemsMarquee :any) {

  if(itemsMarquee){ 
    this.articleService.getAllModelByMarque(itemsMarquee.id).subscribe(data => {
      this.ModelFromMarque = data;
      console.log(data);
    });
  }
}
public getAllMarquesList() {
  this.marqueService.getMarquesList().subscribe(data => {
    this.MarqueList = data;
    console.log(this.MarqueList);
  });
}

/** end upload image article */


}
